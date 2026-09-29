// The Director: a chat per video that runs Claude Code headless in this repo.
// Claude follows CLAUDE.md, writes the brief first and waits for approval,
// then builds the scenes, typechecks, and checks its own work with temporary
// stills (.director/tmp/, deleted after every run).
// State lives in .director/<brand>/<video>.json (git-ignored).
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { readSettings, SETTINGS_FILE } from "../settings.mjs";
import { getStyle, listStyles } from "../styles.mjs";
import { fixAudio } from "../audiofix.mjs";

const MAX_MESSAGES = 400;

// Always Opus 5.5 (runs on the user's Claude subscription via the logged-in CLI).
// Needs Claude Code CLI 2.1.280+ (`claude update`).
export const MODEL = { id: "claude-opus-5-5", label: "Opus 5.5" };
export const EFFORTS = { medium: "Medium", high: "High", xhigh: "Extra high" };
const DEFAULT_EFFORT = "high";
export const DEFAULT_VIDEO_LANGUAGE = "English";
export const DEFAULT_LENGTH = 30; // seconds
export const DEFAULT_VOICE_LANGUAGE = "English — American accent";

// Tools Claude may use without asking. Everything else is denied in headless mode.
const ALLOWED_TOOLS = [
  "Read", "Glob", "Grep", "Edit", "Write", "MultiEdit", "NotebookEdit", "TodoWrite", "WebFetch", "WebSearch", "Skill",
  "Bash(npm run typecheck)", "Bash(npm run stills:*)", "Bash(npm run copy-asset:*)", "Bash(npm run voice:*)", "Bash(npm run sfx:*)", "Bash(npm run shot:*)", "Bash(npm run review:*)", "Bash(npm install:*)", "Bash(npx tsc:*)",
  "Bash(curl:*)", "Bash(unzip:*)",
  "Bash(ls:*)", "Bash(mkdir:*)", "Bash(cp:*)", "Bash(file:*)", "Bash(sips:*)", "Bash(ffprobe:*)",
];

export const createDirector = ({ root, brandsDir }) => {
  const stateDir = path.join(root, ".director");
  const runs = new Map(); // "<brand>/<video>" → { proc, started, step }

  const fileOf = (brand, video) => path.join(stateDir, brand, `${video}.json`);
  const brandFileOf = (brand) => path.join(stateDir, brand, "_brand.json");
  const readJson = (f, fallback) => {
    try {
      return JSON.parse(fs.readFileSync(f, "utf8"));
    } catch {
      return fallback;
    }
  };
  const writeJson = (f, data) => {
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, JSON.stringify(data, null, 2));
  };

  const load = (brand, video) => readJson(fileOf(brand, video), { sessionId: null, phase: "brief", messages: [] });
  const save = (brand, video, s) => {
    s.messages = s.messages.slice(-MAX_MESSAGES);
    writeJson(fileOf(brand, video), s);
  };
  const brandSettings = (brand) => ({ url: "", folder: "", ...readJson(brandFileOf(brand), {}) });
  /** The saved project folder, only if it still exists. */
  const projectFolder = (brand) => {
    const f = brandSettings(brand).folder;
    return f && fs.existsSync(f) && fs.statSync(f).isDirectory() ? f : "";
  };

  /** Files already in public/<brand>/brand and public/<brand>/<video>, for Claude's context and the page. */
  const materials = (brand, video) => {
    const walk = (dir) => {
      if (!fs.existsSync(dir)) return [];
      return fs
        .readdirSync(dir, { recursive: true, withFileTypes: true })
        .filter((d) => d.isFile() && !d.name.startsWith("."))
        .map((d) => path.relative(path.join(root, "public"), path.join(d.parentPath ?? d.path, d.name)))
        .sort();
    };
    return { brand: walk(path.join(root, "public", brand, "brand")), video: walk(path.join(root, "public", brand, video)) };
  };

  /** True once BRIEF.md differs from the untouched starter template. */
  const briefWritten = (brand, video) => {
    const brief = path.join(brandsDir, brand, video, "BRIEF.md");
    if (!fs.existsSync(brief)) return false;
    const template = path.join(brandsDir, "_starter", "video01", "BRIEF.md");
    const blank = fs.existsSync(template)
      ? fs.readFileSync(template, "utf8").replaceAll("__BRAND__", brand).replaceAll("__VIDEO__", video)
      : "";
    return fs.readFileSync(brief, "utf8").trim() !== blank.trim();
  };

  // ---- formats live in the video's index.ts (`formats: [VERTICAL, HORIZONTAL]`) — the single source of truth
  const FORMAT_SETS = { vertical: "[VERTICAL]", horizontal: "[HORIZONTAL]", both: "[VERTICAL, HORIZONTAL]" };
  const indexOf = (brand, video) => path.join(brandsDir, brand, video, "index.ts");
  /** "vertical" | "horizontal" | "both" | "custom" (e.g. square or 4:5 added by hand). */
  const formatsOf = (brand, video) => {
    const m = (fs.readFileSync(indexOf(brand, video), "utf8").match(/formats:\s*\[([^\]]*)\]/) ?? [])[1] ?? "";
    const names = m.split(",").map((x) => x.trim()).filter(Boolean).sort().join(",");
    return { VERTICAL: "vertical", HORIZONTAL: "horizontal", "HORIZONTAL,VERTICAL": "both" }[names] ?? "custom";
  };
  const setFormats = (brand, video, which) => {
    if (!FORMAT_SETS[which]) throw new Error("Pick 9:16, 16:9 or both.");
    if (runs.has(`${brand}/${video}`)) throw new Error("Claude is working on this video — wait or stop it first.");
    const file = indexOf(brand, video);
    let src = fs.readFileSync(file, "utf8");
    if (!/formats:\s*\[[^\]]*\]/.test(src)) throw new Error("Couldn't find the formats line in index.ts.");
    src = src.replace(/formats:\s*\[[^\]]*\]/, `formats: ${FORMAT_SETS[which]}`);
    // make sure both constants are imported from the engine
    src = src.replace(/import \{([^}]*)\} from "(\.\.\/)+engine";/, (all, names) => {
      const set = new Set(names.split(",").map((n) => n.trim()).filter(Boolean));
      set.add("HORIZONTAL");
      set.add("VERTICAL");
      const sorted = [...set].sort((a, b) => a.replace("type ", "").localeCompare(b.replace("type ", "")));
      return all.replace(names, ` ${sorted.join(", ")} `);
    });
    fs.writeFileSync(file, src);
  };
  const formatLine = (brand, video) => {
    const f = formatsOf(brand, video);
    return {
      vertical: "- FORMAT: 9:16 vertical only (1080×1920). The user set this in index.ts — don't change it. Design every scene for a tall frame.",
      horizontal: "- FORMAT: 16:9 horizontal only (1920×1080). The user set this in index.ts — don't change it. Design every scene for a wide frame.",
      both: "- FORMATS: both 9:16 and 16:9 from one source. The user set this in index.ts — don't change it. Every scene must work in both (use p(vertical, horizontal)); self-check stills in both.",
      custom: "- FORMATS: as listed in index.ts (set by hand). Keep them.",
    }[f];
  };

  /** Voice-over for this video: on by default; the voice can be overridden per video. */
  const voiceOf = (s) => {
    const el = readSettings().elevenlabs;
    return {
      enabled: !!el.apiKey && s.voiceover !== false, // no key → always off
      configured: !!el.apiKey,
      voiceId: s.voiceId || "",
      effectiveVoiceId: s.voiceId || el.voiceId,
      defaultVoiceId: el.voiceId,
      defaultVoiceName: el.voiceName,
      model: el.model,
      videoLanguage: s.videoLanguage || DEFAULT_VIDEO_LANGUAGE,
      length: s.lengthSeconds || DEFAULT_LENGTH,
      voiceLanguage: s.voiceLanguage || DEFAULT_VOICE_LANGUAGE,
    };
  };

  const voiceBlock = (brand, video, s) => {
    const v = voiceOf(s);
    const lang = `- VIDEO LENGTH: ${v.length} seconds (the user set this). Size timeline.ts to it (±1 s) — and if there's narration, it must fit comfortably inside it.
- VIDEO LANGUAGE (all on-screen text): ${v.videoLanguage}. Set the brand theme's direction to match (rtl for Arabic, Hebrew, Urdu…).`;
    const style = getStyle(s.styleId);
    const styleLine = style
      ? `\n- VIDEO STYLE "${style.name}" (the user picked this): ${style.text}\n  Apply it to motion, pacing, typography, transitions and sound — within the brand kit's colours and fonts.`
      : "";
    const sound = `- SOUND DESIGN: you are the sound designer too. Invent sounds that fit this video's style and motion — never settle for stock.
  Build them by code (see "Sound design" in CLAUDE.md): layer built-in sounds, shape them with fx (filters, pitch, echo, reverb, drive,
  tremolo, reverse…), or write your own synthesis functions in sfx_custom.py.
  • Brand signature sounds (logo sting, UI tap, the house whoosh — reused by every ${brand} video): src/brands/${brand}/brand/sfx.json →
    \`npm run sfx -- ${brand} --look\`  → public/${brand}/brand/sfx/ (use brandAsset("sfx/<id>.wav")). Add to it; don't break sounds other videos use.
  • This video's own sounds: src/brands/${brand}/${video}/sfx.json → \`npm run sfx -- ${brand} ${video} --look\` → asset("sfx/<id>.wav").
  You can't listen, so check every sound: read the printed stats (length, level, brightness, attack, tail) and Read the --look spectrograms;
  refine until each one matches your intent. Place every cue from the timeline in Soundtrack.tsx.
  Mix in the product's own UI sounds when they exist. The shared kit in public/_shared/sfx is only a fallback.`;
    return `${formatLine(brand, video)}\n${lang}${styleLine}\n${sound}\n${voiceBody(brand, video, v)}`;
  };

  const voiceBody = (brand, video, v) => {
    if (!v.configured)
      return `- VOICE-OVER: unavailable — no ElevenLabs API key. Make the video without narration. If the user asks for a voice-over, tell them to add their key in the dashboard's Settings (top right) first.`;
    if (!v.enabled)
      return `- VOICE-OVER: OFF for this video. Don't add narration unless the user asks; they can switch it on in the Director panel.`;
    return `- VOICE-OVER: ON for this video — plan and generate narration without being asked.
  Voice language / accent: ${v.voiceLanguage}. Write every spoken line in that language, set "language" in voiceover.json to its
  ISO 639-1 code, and steer the accent with Eleven v4 audio tags when it matters (e.g. "[American accent]" at the start of a line).
  ElevenLabs ${v.model} is set up. Voice: ${v.effectiveVoiceId}${!v.voiceId && v.defaultVoiceName ? ` (${v.defaultVoiceName})` : ""}. The API key is handled by the tool: never look for it.
  Brief: add a "Voice-over" column to the story table — the exact spoken line per scene, in the voice language above.
  Build: write src/brands/${brand}/${video}/voiceover.json, run \`npm run voice -- ${brand} ${video}\`, then time scenes to the
  generated durations (import { VO } from "./voiceover.gen") and place each line in Soundtrack.tsx. Keep sfx/bed quieter under the voice.
  Follow the "Voice-over" section of CLAUDE.md for the file format and Eleven v4 audio tags (emotion, pacing, non-verbal).`;
  };

  /** The 4 storyboard frames the user approves between brief and build: out/<brand>/<video>/storyboard/. */
  const storyboardDir = (brand, video) => path.join(root, "out", brand, video, "storyboard");
  const storyboardOf = (brand, video) => {
    const dir = storyboardDir(brand, video);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((f) => /\.(jpe?g|png)$/i.test(f))
      .map((f) => ({ name: f, frame: Number(f.match(/(\d+)\.\w+$/)?.[1] ?? 0), mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
      .sort((a, b) => a.name.split("-")[0].localeCompare(b.name.split("-")[0]) || a.frame - b.frame)
      .map((f) => ({ ...f, url: `/out/${brand}/${video}/storyboard/${encodeURIComponent(f.name)}?t=${Math.round(f.mtime)}` }));
  };

  const tmpDir = (brand, video) => path.join(".director", "tmp", `${brand}-${video}`);

  const systemPrompt = (brand, video, s) => {
    const m = materials(brand, video);
    const url = brandSettings(brand).url;
    const folder = projectFolder(brand);
    const common = `
You are the Director inside the MotionVideos dashboard. The user talks to you from a chat box on the page, not a terminal.
You are working on ONE video: brand "${brand}", video "${video}".
- Its code: src/brands/${brand}/${video}/  · its brand kit: src/brands/${brand}/brand/
- Its files: public/${brand}/${video}/  · brand files: public/${brand}/brand/
- Follow CLAUDE.md in the repo root (layout, engine parts, rules). Read it first if you haven't this session.
- For Remotion questions use the remotion-best-practices skill.
- Only touch this video's folders, its brand kit, and (rarely, if truly shared) src/engine. Never touch other brands or videos.
- Never run git commands. Never render MP4s.
- You may npm install a package if a video genuinely needs it; say so in your reply.
- Product URL: ${url || "(none given — ask for it if you need the product's real copy or visuals)"}
- Product source folder on this Mac (READ-ONLY): ${folder || "(none given)"}${folder ? `
  Explore it for the real thing: app icons and images (e.g. *.xcassets, assets/, public/), fonts, colour definitions, localized strings,
  feature names, and the app's own sound effects (e.g. sounds/, *.caf, *.wav, *.mp3) — copy those into public/${brand}/brand/sfx/.
  Copy what you need with \`npm run copy-asset -- "<file or folder in the product folder>" public/${brand}/brand/<img|fonts|sfx>/\`
  (or this video's folder). Plain cp can't touch that folder. Never try to edit, move or delete anything inside it.` : ""}
- Brand files: ${m.brand.length ? m.brand.join(", ") : "(none uploaded yet)"}
- Video files: ${m.video.length ? m.video.join(", ") : "(none uploaded yet)"}
- SCREENSHOTS — capture the real product first, don't rebuild what you can photograph. You have a real headless browser:
  write src/brands/${brand}/brand/shots.json (brand-wide) or src/brands/${brand}/${video}/shots.json and run
  \`npm run shot -- ${brand}\` (or \`npm run shot -- ${brand} ${video}\`) → public/${brand}/<brand|video>/img/shots/<id>.png.
  Shoot every key screen at iphone (1170×2532) and desktop sizes; use steps to click tabs, open menus, switch language, scroll,
  and "waitGone" to wait out loading screens. Read every PNG to check it before using it (show it in Phone for mobile).
  Rebuild UI in React only for moments a screenshot can't show (e.g. live recitation needing a microphone, or animating UI
  elements) — and then match the real screenshots exactly. See "Screenshots" in CLAUDE.md.
- You can download the product's real assets yourself: find image/font URLs on the product site (WebFetch), then
  \`curl -L -o public/${brand}/brand/img/<name> <url>\` (brand-wide) or public/${brand}/${video}/img/ (this video only).
  Check each download with \`file\` / \`sips -g pixelWidth -g pixelHeight\`, and list every file with its source URL in BRAND.md.
- The user can also upload files through the page; if you can't find something (e.g. app screenshots), ask for it.
${voiceBlock(brand, video, s)}
Reply style for the user: short. First line = what happened. Then a few bullets. No long prose.`;
    const quality = `QUALITY BAR — follow "Design quality (no 'mid')" in CLAUDE.md: no centered-text-on-a-gradient-fading-in;
  a new composition every scene; springs (springAt / springTo / SPRING) for anything with mass; MaskRise for headlines;
  match cuts and camera moves between scenes; "Example data" (ExampleBadge) on anything illustrative; real integrations only.
  If the user gives a reference, copy its grammar (pacing, type, transitions), never its content.`;
    if (s.phase === "brief")
      return `${common}
${quality}

PHASE 1 of 3: BRIEF (not approved yet).
- If the brand kit is still the starter default, fill in src/brands/${brand}/brand/BRAND.md and theme.ts (real colours, direction, fonts) from the product URL and files.
- Write src/brands/${brand}/${video}/BRIEF.md: goal, platform, formats, length, and the story table by seconds. Draft copy.ts from the product's own words.
- Do NOT build or change scenes yet.
- End by showing the story as a short bullet list (one line per scene with seconds) and ask the user to approve it or change it. The page has an "Approve brief" button.`;
    if (s.phase === "storyboard")
      return `${common}
${quality}

PHASE 2 of 3: STORYBOARD (the user approved BRIEF.md; they'll approve the look next).
- Capture the real product first (screenshots — see CLAUDE.md), then build the LOOK: theme, backdrop, and the scenes around
  4 key moments — the hook (first 2 s), the key feature, the climax, the end card. Other scenes can stay rough for now.
- Render exactly those 4 frames (all formats of this video) into the storyboard folder:
  \`npm run stills -- ${brand} ${video} <hook> <feature> <climax> <end> --dir=out/${brand}/${video}/storyboard\`
  (frame numbers). Read them and fix anything clipped, overlapping, hard to read or "mid" before you stop.
- No voice-over, no sound design yet.
- End with one line per frame (what it shows and why) and ask the user to approve the storyboard or say what to change.
  The page shows the 4 frames with an "Approve storyboard & build" button.`;
    return `${common}
${quality}

PHASE 3 of 3: BUILD (the user approved the brief and the storyboard — keep that look).
- Build the whole video to match the brief, the storyboard and the user's notes: copy.ts, timeline.ts, scenes/, Film.tsx,
  sound design, voice-over, Soundtrack.tsx. If the user changes the story itself, update BRIEF.md too.
- Sound: cues land on each sound's loudest moment — pass \`peak\` from sfx.gen.ts (SFX / SHARED_SFX) so \`at\` is the hit frame.
- Verify: \`npm run typecheck\` must pass.
- CRITIQUE LOOP — be a harsh motion director, not a proud author:
  \`npm run review -- ${brand} ${video}\` makes contact sheets (every 0.5 s), phone-size sheets and, with --strip=<s>,
  12-frame strips around fast moves, in ${tmpDir(brand, video)}/review/. Read every sheet and score 1–10: hook, readability
  at phone size, motion quality, variety (something new every 2–4 s), composition, data accuracy, sound sync.
  Fix the 3 biggest problems, re-run, and repeat until every score is 8+ (at most 4 rounds). Temp files are deleted after this run.
- End with the final scores in one line, what you built/changed in a few bullets, and what to look at in Studio.`;
  };

  /** One short line for a tool call, shown as a live step in the chat. */
  const describeTool = (name, input = {}) => {
    const file = (p) => (p ? path.relative(root, path.resolve(root, p)) : "");
    switch (name) {
      case "Read": return `Reading ${file(input.file_path)}`;
      case "Write": return `Writing ${file(input.file_path)}`;
      case "Edit": case "MultiEdit": return `Editing ${file(input.file_path)}`;
      case "Glob": return `Looking for ${input.pattern}`;
      case "Grep": return `Searching for “${input.pattern}”`;
      case "WebFetch": return `Reading ${input.url}`;
      case "WebSearch": return `Searching the web: ${input.query}`;
      case "Skill": return `Loading skill ${input.skill ?? ""}`;
      case "TodoWrite": return "Planning";
      case "Bash": {
        const c = String(input.command ?? "");
        if (c.includes("npm run stills")) return "Checking frames (stills)";
        if (c.includes("typecheck") || c.includes("tsc")) return "Typechecking";
        if (c.startsWith("npm install")) return `Installing ${c.replace("npm install", "").trim()}`;
        return `Running ${c.slice(0, 80)}`;
      }
      default: return name;
    }
  };

  const push = (s, msg) => s.messages.push({ ts: Date.now(), ...msg });

  const run = (brand, video, text, effortArg) => {
    const key = `${brand}/${video}`;
    if (runs.has(key)) throw new Error("Claude is already working on this video.");
    const s = load(brand, video);
    // each storyboard run starts from a clean folder, so the page only shows the new frames
    if (s.phase === "storyboard") fs.rmSync(storyboardDir(brand, video), { recursive: true, force: true });
    const effort = EFFORTS[effortArg] ? effortArg : EFFORTS[s.effort] ? s.effort : DEFAULT_EFFORT;
    s.effort = effort;
    push(s, { role: "user", text });
    save(brand, video, s);

    const args = [
      "-p", text,
      "--model", MODEL.id,
      "--effort", effort,
      "--output-format", "stream-json", "--verbose",
      "--permission-mode", "acceptEdits",
      "--allowedTools", ALLOWED_TOOLS.join(","),
      "--strict-mcp-config",
      "--append-system-prompt", systemPrompt(brand, video, s),
      ...(s.sessionId ? ["--resume", s.sessionId] : []),
    ];
    // Deny rules win over allow rules. "//abs/path" = absolute path in permission rules.
    // The settings file holds API keys: Claude never reads it (the voice tool does).
    const deny = [`Read(/${SETTINGS_FILE})`, `Edit(/${SETTINGS_FILE})`, `Write(/${SETTINGS_FILE})`, `Read(/${path.join(root, ".director", "browser")}/**)`];
    // The product's own folder: readable (--add-dir), never writable.
    const folder = projectFolder(brand);
    if (folder) {
      const abs = `/${folder.replace(/\/+$/, "")}/**`;
      args.push("--add-dir", folder);
      deny.push(...["Edit", "Write", "MultiEdit", "NotebookEdit"].map((t) => `${t}(${abs})`));
    }
    args.push("--disallowedTools", deny.join(","));
    const proc = spawn(process.env.CLAUDE_BIN || "claude", args, { cwd: root, env: process.env });
    const r = { proc, started: Date.now(), step: "Starting Claude…", gotEvents: false, stopped: false };
    runs.set(key, r);

    let buf = "";
    let errText = "";
    proc.stdout.on("data", (chunk) => {
      buf += chunk.toString();
      let nl;
      while ((nl = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (!line) continue;
        let e;
        try {
          e = JSON.parse(line);
        } catch {
          continue;
        }
        r.gotEvents = true;
        if (e.type === "system" && e.subtype === "init" && e.session_id) {
          s.sessionId = e.session_id;
          r.step = "Thinking…";
        } else if (e.type === "assistant") {
          for (const b of e.message?.content ?? []) {
            if (b.type === "text" && b.text?.trim()) push(s, { role: "claude", text: b.text.trim() });
            if (b.type === "tool_use") {
              r.step = describeTool(b.name, b.input);
              push(s, { role: "step", text: r.step });
            }
          }
        } else if (e.type === "result") {
          if (e.session_id) s.sessionId = e.session_id;
          if (e.is_error) push(s, { role: "system", text: `Claude stopped with an error: ${e.result ?? e.subtype}` });
          push(s, {
            role: "meta",
            text: `${Math.round((e.duration_ms ?? Date.now() - r.started) / 1000)}s · ${MODEL.label} · ${EFFORTS[effort]} thinking`,
          });
        }
        save(brand, video, s);
      }
    });
    proc.stderr.on("data", (c) => (errText += c.toString()));
    proc.on("error", (err) => {
      push(s, { role: "system", text: `Couldn't start Claude Code (${err.message}). Is the \`claude\` CLI installed and logged in?` });
      save(brand, video, s);
    });
    proc.on("close", (code) => {
      runs.delete(key);
      fs.rmSync(path.join(root, tmpDir(brand, video)), { recursive: true, force: true });
      fs.rmSync(path.join(root, ".director", "tmp", `${brand}-brand`), { recursive: true, force: true }); // brand sfx spectrograms
      // Sounds Claude downloaded or copied (e.g. Apple Lossless .m4a) must play in Studio and renders: convert them.
      try { fixAudio(path.join(root, "public", brand)); } catch {}
      if (r.stopped) push(s, { role: "system", text: "Stopped." });
      else if (code !== 0 && !r.gotEvents) {
        if (s.sessionId) {
          s.sessionId = null;
          push(s, { role: "system", text: "Couldn't resume the previous conversation — send your message again to start fresh." });
        } else push(s, { role: "system", text: `Claude exited (${code}). ${errText.trim().slice(0, 400)}` });
      }
      save(brand, video, s);
    });
    return r;
  };

  return {
    /** Chat + status for one video. */
    state(brand, video) {
      const s = load(brand, video);
      const r = runs.get(`${brand}/${video}`);
      return {
        phase: s.phase,
        voice: voiceOf(s),
        formats: formatsOf(brand, video),
        styleId: getStyle(s.styleId) ? s.styleId : null,
        styles: listStyles(),
        model: MODEL.label,
        effort: EFFORTS[s.effort] ? s.effort : DEFAULT_EFFORT,
        efforts: EFFORTS,
        hasSession: !!s.sessionId,
        messages: s.messages,
        running: !!r,
        step: r?.step ?? null,
        elapsed: r ? Date.now() - r.started : 0,
        url: brandSettings(brand).url,
        folder: brandSettings(brand).folder,
        folderOk: !!projectFolder(brand),
        materials: materials(brand, video),
        briefExists: briefWritten(brand, video),
        storyboard: storyboardOf(brand, video),
      };
    },
    send(brand, video, text, effort) {
      run(brand, video, text, effort);
    },
    /** Brief → storyboard → build. */
    approve(brand, video, effort) {
      const s = load(brand, video);
      if (s.phase === "brief") {
        s.phase = "storyboard";
        push(s, { role: "system", text: "Brief approved — next: the storyboard (4 key frames)." });
        save(brand, video, s);
        run(brand, video, "The brief is approved. Build the storyboard now: the 4 key frames.", effort);
      } else {
        s.phase = "build";
        push(s, { role: "system", text: "Storyboard approved." });
        save(brand, video, s);
        run(brand, video, "The storyboard is approved. Build the whole video now, then run the critique loop.", effort);
      }
    },
    reopenBrief(brand, video) {
      const s = load(brand, video);
      s.phase = "brief";
      push(s, { role: "system", text: "Back to the brief — Claude won't build scenes until you approve again." });
      save(brand, video, s);
    },
    reset(brand, video) {
      if (runs.has(`${brand}/${video}`)) throw new Error("Stop Claude first.");
      const old = load(brand, video);
      save(brand, video, { sessionId: null, phase: old.phase, effort: old.effort, messages: [] });
    },
    stop(brand, video) {
      const r = runs.get(`${brand}/${video}`);
      if (r) {
        r.stopped = true;
        r.proc.kill("SIGTERM");
      }
    },
    setFormats,
    setStyle(brand, video, styleId) {
      const s = load(brand, video);
      s.styleId = styleId || null;
      save(brand, video, s);
    },
    setVoiceover(brand, video, { enabled, voiceId, videoLanguage, voiceLanguage, length }) {
      const s = load(brand, video);
      if (length !== undefined) {
        const n = Math.round(Number(length));
        if (!(n >= 3 && n <= 600)) throw new Error("Length is in seconds, between 3 and 600.");
        s.lengthSeconds = n;
      }
      if (typeof videoLanguage === "string") s.videoLanguage = videoLanguage.trim().slice(0, 80);
      if (typeof voiceLanguage === "string") s.voiceLanguage = voiceLanguage.trim().slice(0, 80);
      if (enabled === true && !readSettings().elevenlabs.apiKey) throw new Error("Add your ElevenLabs API key in Settings first.");
      if (typeof enabled === "boolean") s.voiceover = enabled;
      if (typeof voiceId === "string") s.voiceId = voiceId.trim();
      save(brand, video, s);
    },
    setBrandSettings(brand, patch) {
      writeJson(brandFileOf(brand), { ...brandSettings(brand), ...patch });
    },
    runningCount: () => runs.size,
    /** Is Claude working on this video (or, without a video, on any video of the brand)? */
    isBusy: (brand, video) => [...runs.keys()].some((k) => (video ? k === `${brand}/${video}` : k.startsWith(`${brand}/`))),
    stopAll() {
      for (const r of runs.values()) r.proc.kill("SIGTERM");
    },
  };
};
