// Drive the whole machine from a terminal — made for AI agents (OpenClaw, Hermes, Codex, …) and scripts.
// No browser needed: it talks to the dashboard server and starts it in the background if it isn't running.
// Every command takes --json for machine-readable output. Nothing here blocks for long unless you add --wait.
//
//   make <brand> <video|next> ["<what the video is about>"] [settings] [--stop-at=brief|storyboard] [--render[=blur]]
//        [--app-id=<App Store id or URL>]
//        The autopilot: brief → storyboard → build (→ render), approving each step itself. Returns at once;
//        poll `status`, or add --wait. Creates the brand/video if needed. Run it again to resume or continue.
//        --app-id first fetches the app's icon, store screenshots and listing (see fetch-assets).
//   fetch-assets <brand> <App Store id or URL> [--country=sa] [--no-ipad]
//                                           iOS apps with no website: icon, screenshots, listing → the brand kit
//   status <brand> <video>                  step, autopilot, Claude's latest reply, storyboard frames, render, what to do next
//   ask <brand> <video> "<message>"         talk to the Director (answers a question; revisions)
//   approve <brand> <video>                 approve the brief (→ storyboard) or the storyboard (→ build) by hand
//   stop <brand> <video>                    stop Claude and the autopilot
//   list · new <brand> [video] · styles · outputs <brand> <video> · doctor · where
//   set <brand> [video] [settings]          brand: --url= --folder=
//                                           video: --length=<s> --format=vertical|horizontal|both (or 9:16, 16:9) --language="…"
//                                                  --voice-language="…" --voiceover=on|off --voice-id=<id> --style=<name|id|none>
//   render <brand> <video> [--format=vertical] [--blur] [--frames=0-89]
//   voice-settings [--voice-id=<id>] [--model=eleven_v4|eleven_v4_turbo] [--key-stdin]   (ElevenLabs; key read from stdin)
//
// --wait makes make/ask/approve/render stay open until everything is finished — rendering and audio mastering
//   included (--timeout=<s>, default 5400). Milestones stream to stderr as they happen (also with --json, so stdout
//   stays one clean JSON object); the result ends with the MP4 path(s) (`mp4` in JSON). Good for cron jobs and scripts.
// --effort=medium|high|xhigh. Exit codes: 0 ok · 1 error or failed · 2 blocked (the Director asked: answer with `ask`).
// In scripts, call `node tools/video.mjs …` (or `npm run --silent video -- …`) so npm's banner doesn't mix into stdout.
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT ?? 4000);
const BASE = `http://127.0.0.1:${PORT}`;

const argv = process.argv.slice(2);
const flags = Object.fromEntries(argv.filter((a) => a.startsWith("--")).map((a) => {
  const [k, ...v] = a.slice(2).split("=");
  return [k, v.length ? v.join("=") : true];
}));
const [cmd, ...pos] = argv.filter((a) => !a.startsWith("--"));
const JSON_OUT = !!flags.json;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const out = (human, data, code = 0) => {
  console.log(JSON_OUT ? JSON.stringify(data, null, 2) : human);
  process.exitCode = code;
};
const fail = (msg, code = 1) => {
  if (JSON_OUT) console.log(JSON.stringify({ ok: false, error: msg }));
  else console.error(msg);
  process.exit(code);
};
const progress = (msg) => { if (!JSON_OUT) process.stderr.write(`${msg}\n`); };

// ---------- the dashboard server (started in the background when needed)

const up = async () => {
  try {
    return (await fetch(`${BASE}/api/state`)).ok;
  } catch {
    return false;
  }
};
const AGENT_API = 1; // must match the server's (tools/dashboard/server.mjs)
const ensureServer = async () => {
  if (await up()) {
    const { agentApi } = await (await fetch(`${BASE}/api/state`)).json();
    if (agentApi !== AGENT_API)
      fail(`The dashboard running on port ${PORT} is older than this tool. Stop it (close its Start.command window or press Ctrl+C), then run this again: this tool starts the new one by itself.`);
    return;
  }
  progress(`Starting the dashboard server in the background (${BASE}) …`);
  fs.mkdirSync(path.join(ROOT, ".director"), { recursive: true });
  const log = fs.openSync(path.join(ROOT, ".director", "dashboard.log"), "a");
  spawn(process.execPath, [path.join(ROOT, "tools", "dashboard", "server.mjs")], {
    cwd: ROOT, detached: true, stdio: ["ignore", log, log], env: { ...process.env, PORT: String(PORT) },
  }).unref();
  for (let i = 0; i < 75; i++) {
    if (await up()) return;
    await sleep(200);
  }
  fail("The dashboard server didn't start — see .director/dashboard.log");
};

const api = async (p, body) => {
  const r = await fetch(`${BASE}${p}`, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {});
  const j = await r.json().catch(() => ({}));
  if (!r.ok) fail(j.error || `${r.status} from ${p}`);
  return j;
};
const q = (brand, video) => `brand=${encodeURIComponent(brand)}&video=${encodeURIComponent(video)}`;
const director = (brand, video) => api(`/api/director?${q(brand, video)}`);
const needVideo = () => {
  const [brand, video] = pos;
  if (!brand || !video) fail(`Usage: npm run video -- ${cmd} <brand> <video> …`);
  return { brand, video };
};
const findVideo = async (brand, video) => (await api("/api/state")).brands.find((b) => b.brand === brand)?.videos.find((v) => v.video === video);

// ---------- status

const lastReply = (d) => {
  const i = d.messages.map((m) => m.role).lastIndexOf("user");
  return d.messages.slice(i + 1).filter((m) => m.role === "claude" || m.role === "system").map((m) => m.text).at(-1) ?? null;
};
const nextStep = (d, render) => {
  const ap = d.autopilot;
  if (d.running) return `Claude is working (${d.step}). Check again in a minute or two.`;
  if (ap?.status === "running") return "Autopilot is moving to the next step. Check again shortly.";
  if (ap?.status === "blocked") return "The Director asked something (see lastReply). Answer with `ask`; the autopilot then carries on.";
  if (ap?.status === "failed") return "Read lastReply, fix what it says if needed, then run `make` again to retry.";
  if (render && ["queued", "running"].includes(render.status)) return `Rendering (${render.progress}%). Check again shortly.`;
  if (render?.status === "failed") return "The render failed (see render.log). Fix it, then `render` again.";
  if (d.phase === "brief" && d.briefExists) return "Brief ready: read BRIEF.md, then `make` (or `approve`) to continue, or `ask` for changes.";
  if (d.phase === "storyboard" && d.storyboard.length) return "Storyboard ready: look at the frames, then `make` (or `approve`) to build, or `ask` for changes.";
  if (d.phase === "brief") return "Start it with `make`.";
  if (d.phase === "build") return "Built. `render` it, or `ask` for changes.";
  return "Run `make` to continue.";
};
const statusOf = async (brand, video) => {
  const [d, s] = await Promise.all([director(brand, video), api("/api/state")]);
  const v = s.brands.find((b) => b.brand === brand)?.videos.find((x) => x.video === video);
  const job = s.jobs.find((j) => j.brand === brand && j.video === video && j.label.startsWith("Render"));
  const render = job
    ? {
        job: job.id, status: job.status, progress: job.progress, label: job.label,
        files: job.log.map((l) => l.match(/^saved (.+\.mp4)$/)?.[1]).filter(Boolean).map((f) => path.join(ROOT, f)), // written after mastering
        lastLine: job.log.at(-1) ?? "",
        ...(job.status === "failed" ? { log: job.log.slice(-12) } : {}),
      }
    : null;
  return {
    ok: true, brand, video,
    step: d.phase, // brief → storyboard → build
    running: d.running, activity: d.step,
    waiting: !!d.waiting, // queued behind another video of the same brand (they take turns, one step each)
    autopilot: d.autopilot,
    claude: d.claude?.ok ? "ok" : d.claude?.fix ?? "unknown",
    lastReply: lastReply(d),
    brief: d.briefExists ? path.join(ROOT, "src", "brands", brand, video, "BRIEF.md") : null,
    storyboard: d.storyboard.map((f) => path.join(ROOT, "out", brand, video, "storyboard", f.name)),
    render,
    outputs: (v?.outputs.videos ?? []).map((o) => path.join(ROOT, "out", brand, video, o.rel)),
    mp4: render?.status === "done" ? render.files : [], // what the latest render made
    settings: {
      format: d.formats, length: d.voice.length, language: d.voice.videoLanguage, voiceLanguage: d.voice.voiceLanguage,
      voiceover: d.voice.enabled, voiceId: d.voice.effectiveVoiceId, style: d.styles.find((x) => x.id === d.styleId)?.name ?? null,
      website: d.url || null, folder: d.folder || null,
    },
    next: nextStep(d, render),
  };
};
const printStatus = (st, code = 0) =>
  out(
    [
      `${st.brand}/${st.video} · step: ${st.step}${st.running ? ` · working: ${st.activity}` : ""}${st.autopilot ? ` · autopilot: ${st.autopilot.status}` : ""}`,
      st.autopilot?.note ? `  ${st.autopilot.note}` : "",
      st.lastReply ? `\nClaude:\n${st.lastReply}\n` : "",
      st.brief ? `Brief: ${st.brief}` : "",
      st.storyboard.length ? `Storyboard frames:\n${st.storyboard.map((f) => `  ${f}`).join("\n")}` : "",
      st.render ? `Render: job ${st.render.job} · ${st.render.status} · ${st.render.progress}%` : "",
      st.outputs.length ? `Outputs:\n${st.outputs.map((f) => `  ${f}`).join("\n")}` : "",
      `\nNext: ${st.next}`,
      st.mp4.length ? `\n${st.mp4.map((f) => `MP4: ${f}`).join("\n")}` : "", // last, so `tail -1` finds it
    ].filter(Boolean).join("\n"),
    st,
    code,
  );

/** What changed between two status snapshots, as milestone lines. */
const milestones = (a, b) => {
  if (!a) return [`${b.brand}/${b.video} · step: ${b.step}${b.running ? ` · ${b.activity}` : ""}`];
  const m = [];
  const [from, to] = [a.step, b.step].map((x) => ["brief", "storyboard", "build"].indexOf(x));
  // in story order, even when several steps passed between two checks
  if (!a.brief && b.brief) m.push(`brief ready: ${b.brief}`);
  if (from < 1 && to >= 1) m.push("brief approved → building the storyboard");
  if (b.storyboard.length && b.storyboard.join() !== a.storyboard.join()) m.push(`storyboard ready: ${b.storyboard.length} frames in ${path.dirname(b.storyboard[0])}`);
  if (from < 2 && to >= 2) m.push("storyboard approved → building the whole video");
  if (to < from) m.push(`back to step: ${b.step}`);
  if (b.waiting && !a.waiting) m.push(b.activity);
  if (b.autopilot && b.autopilot.status !== a.autopilot?.status) m.push(`autopilot ${b.autopilot.status}${b.autopilot.note ? ` — ${b.autopilot.note}` : ""}`);
  if (b.autopilot?.status === "blocked" && a.autopilot?.status !== "blocked" && b.lastReply) m.push(`the Director asks: ${b.lastReply}`);
  if (b.render && (b.render.job !== a.render?.job || b.render.status !== a.render?.status)) m.push(`render ${b.render.status}: ${b.render.label}`);
  if (b.render?.lastLine && b.render.lastLine !== a.render?.lastLine && /\d+%$|^saved /.test(b.render.lastLine)) m.push(`render · ${b.render.lastLine}`);
  return m;
};

/**
 * Blocks until Claude, the autopilot and any render for this video are idle (rendering and mastering included).
 * Streams milestones to stderr as they happen, plus a heartbeat every minute so logs show it's alive.
 */
const waitIdle = async (brand, video) => {
  const started = Date.now();
  const limit = started + 1000 * Number(flags.timeout ?? 5400);
  const say = (msg) => process.stderr.write(`[${new Date().toTimeString().slice(0, 8)}] ${msg}\n`);
  let prev = null;
  let lastSaid = Date.now();
  while (Date.now() < limit) {
    const st = await statusOf(brand, video);
    for (const line of milestones(prev, st)) {
      say(line);
      lastSaid = Date.now();
    }
    const busy = st.running || st.autopilot?.status === "running" || ["queued", "running"].includes(st.render?.status);
    if (!busy) return st;
    if (Date.now() - lastSaid > 60000) {
      say(`… ${st.running ? st.activity : st.render ? `rendering ${st.render.progress}%` : "next step"} (${Math.round((Date.now() - started) / 60000)} min)`);
      lastSaid = Date.now();
    }
    prev = st;
    await sleep(4000);
  }
  fail("Timed out (use --timeout=<seconds>). It may still be working: check `status`.");
};
const exitCodeOf = (st) => (st.autopilot?.status === "blocked" ? 2 : st.autopilot?.status === "failed" || st.render?.status === "failed" ? 1 : 0);

// ---------- settings shared by `set` and `make`

const applySettings = async (brand, video) => {
  const saved = [];
  if (flags.url !== undefined || flags.folder !== undefined) {
    await api("/api/brand-settings", {
      brand,
      ...(flags.url !== undefined ? { url: flags.url === true ? "" : String(flags.url) } : {}),
      ...(flags.folder !== undefined ? { folder: flags.folder === true ? "" : String(flags.folder) } : {}),
    });
    saved.push("website/folder");
  }
  if (!video) return saved;
  const vo = {};
  if (flags.length !== undefined) vo.length = Number(flags.length);
  if (flags.language !== undefined) vo.videoLanguage = String(flags.language);
  if (flags["voice-language"] !== undefined) vo.voiceLanguage = String(flags["voice-language"]);
  if (flags.voiceover !== undefined) vo.enabled = flags.voiceover === true || flags.voiceover === "on";
  if (flags["voice-id"] !== undefined) vo.voiceId = flags["voice-id"] === true ? "" : String(flags["voice-id"]);
  if (Object.keys(vo).length) {
    await api("/api/director/voiceover", { brand, video, ...vo });
    saved.push(...Object.keys(vo));
  }
  if (flags.format !== undefined) {
    const f = String(flags.format).toLowerCase();
    const formats = { "9:16": "vertical", "16:9": "horizontal", "vertical,horizontal": "both", "horizontal,vertical": "both" }[f] ?? f;
    await api("/api/director/formats", { brand, video, formats });
    saved.push("format");
  }
  if (flags.style !== undefined) {
    const d = await director(brand, video);
    const want = String(flags.style).toLowerCase();
    const style = want === "none" ? null : d.styles.find((s) => s.id === want || s.name.toLowerCase() === want);
    if (want !== "none" && !style) fail(`No style "${flags.style}". See: npm run video -- styles`);
    await api("/api/director/style", { brand, video, styleId: style?.id ?? null });
    saved.push("style");
  }
  return saved;
};

/** Creates the brand and/or video when missing. video "next" = the brand's next videoNN. Returns the video name. */
const ensureVideo = async (brand, video) => {
  if (video !== "next" && (await findVideo(brand, video))) return video;
  const r = await api("/api/new", { brand, ...(video === "next" ? {} : { video }) });
  const made = r.output.match(/New video: [^/\s]+\/(\S+)/)?.[1];
  if (!made) fail(`Couldn't create the video:\n${r.output}`);
  progress(`Created ${brand}/${made}.`);
  return made;
};

/** Runs tools/appstore.mjs: the app's icon, store screenshots and listing → the brand kit. Returns its JSON result. */
const fetchStoreAssets = (brand, app) => {
  const r = spawnSync(process.execPath, [
    path.join(ROOT, "tools", "appstore.mjs"), brand, String(app), "--json",
    ...(flags.country ? [`--country=${flags.country}`] : []), ...(flags["no-ipad"] ? ["--no-ipad"] : []),
  ], { cwd: ROOT, encoding: "utf8" });
  let res;
  try {
    res = JSON.parse(r.stdout);
  } catch {
    res = { ok: false, error: (r.stderr || r.stdout || "The App Store fetch failed.").trim() };
  }
  if (!res.ok) fail(res.error);
  return res;
};
const storeSummary = (res) =>
  `App Store: ${res.name} (${res.seller}) → ${res.files.length} files in ${path.relative(ROOT, path.dirname(res.files[0]?.file ?? ""))}/, listing in ${path.relative(ROOT, res.brandMd)}`;

// ---------- commands

if (cmd === "where") {
  out(ROOT, { ok: true, root: ROOT });
  process.exit(0);
}
await ensureServer();

switch (cmd) {
  case "make": {
    const [brand, videoArg, ...words] = pos;
    if (!brand || !videoArg) fail('Usage: npm run video -- make <brand> <video|next> ["<what the video is about>"] [--length=15 --format=both --url=… …]');
    const video = await ensureVideo(brand, videoArg);
    if (flags["app-id"]) progress(storeSummary(fetchStoreAssets(brand, flags["app-id"])));
    await applySettings(brand, video);
    const st0 = await statusOf(brand, video);
    if (st0.claude !== "ok") fail(`The Director needs Claude Code: ${st0.claude}`);
    await api("/api/director/autopilot", {
      brand, video, prompt: words.join(" ").trim(),
      ...(flags["stop-at"] ? { stopAt: String(flags["stop-at"]) } : {}),
      ...(flags.render ? { render: flags.render === "blur" ? "blur" : true } : {}),
      ...(flags.effort ? { effort: String(flags.effort) } : {}),
    });
    if (!flags.wait) {
      out(
        `Autopilot started for ${brand}/${video}: it approves each step itself${flags["stop-at"] ? `, pausing at the ${flags["stop-at"]}` : ""}.\n` +
          `A full run takes about 15–30 minutes. Poll: npm run video -- status ${brand} ${video}`,
        await statusOf(brand, video),
      );
      break;
    }
    progress(`Autopilot running for ${brand}/${video} (about 15–30 minutes) …`);
    const st = await waitIdle(brand, video);
    printStatus(st, exitCodeOf(st));
    break;
  }
  case "status": {
    const { brand, video } = needVideo();
    printStatus(await statusOf(brand, video));
    break;
  }
  case "fetch-assets": {
    const [brand, appArg] = pos;
    const app = appArg ?? flags["app-id"];
    if (!brand || !app || app === true) fail("Usage: npm run video -- fetch-assets <brand> <App Store id or URL> [--country=sa] [--no-ipad]");
    if (!(await api("/api/state")).brands.some((b) => b.brand === brand)) await ensureVideo(brand, "next"); // new brand (+ video01)
    const res = fetchStoreAssets(brand, app);
    out(`${storeSummary(res)}\n${res.files.map((f) => `  ${f.name}${f.width ? `  ${f.width}×${f.height}` : ""}`).join("\n")}`, res);
    break;
  }
  case "ask": {
    const { brand, video } = needVideo();
    const text = pos.slice(2).join(" ").trim();
    if (!text) fail('Usage: npm run video -- ask <brand> <video> "<message>"');
    await api("/api/director/send", { brand, video, text, ...(flags.effort ? { effort: String(flags.effort) } : {}) });
    if (!flags.wait) {
      out("Sent. Claude is working — poll with `status`.", await statusOf(brand, video));
      break;
    }
    const st = await waitIdle(brand, video);
    printStatus(st, exitCodeOf(st));
    break;
  }
  case "approve": {
    const { brand, video } = needVideo();
    const before = (await director(brand, video)).phase;
    await api("/api/director/approve", { brand, video, ...(flags.effort ? { effort: String(flags.effort) } : {}) });
    const msg = before === "brief" ? "Brief approved → Claude is building the storyboard." : "Storyboard approved → Claude is building the whole video.";
    if (!flags.wait) {
      out(`${msg} Poll with \`status\`.`, await statusOf(brand, video));
      break;
    }
    const st = await waitIdle(brand, video);
    printStatus(st, exitCodeOf(st));
    break;
  }
  case "stop": {
    const { brand, video } = needVideo();
    await api("/api/director/stop", { brand, video });
    out("Stopped Claude and the autopilot.", { ok: true });
    break;
  }
  case "list": {
    const s = await api("/api/state");
    const brands = s.brands.map((b) => ({ brand: b.brand, videos: b.videos.map((v) => ({ video: v.video, formats: v.formats, renders: v.outputs.videos.length })) }));
    out(brands.length ? brands.map((b) => `${b.brand}: ${b.videos.map((v) => v.video).join(", ") || "(no videos)"}`).join("\n") : "No brands yet.", { ok: true, brands });
    break;
  }
  case "new": {
    const [brand, video] = pos;
    if (!brand) fail("Usage: npm run video -- new <brand> [video]");
    if (video && (await findVideo(brand, video))) fail(`${brand}/${video} already exists.`);
    const made = await ensureVideo(brand, video ?? "next");
    out(`${brand}/${made}`, { ok: true, brand, video: made });
    break;
  }
  case "set": {
    const [brand, video] = pos;
    if (!brand) fail("Usage: npm run video -- set <brand> [video] [settings]");
    const saved = await applySettings(brand, video);
    if (!saved.length) fail("Nothing to set. Brand: --url --folder · video: --length --format --language --voice-language --voiceover --voice-id --style");
    out(`Saved: ${saved.join(", ")}.`, { ok: true, saved, ...(video ? { settings: (await statusOf(brand, video)).settings } : {}) });
    break;
  }
  case "styles": {
    const s = await api("/api/state");
    const b = s.brands.find((x) => x.videos.length);
    if (!b) fail("Make a video first (npm run video -- new <brand>); styles are listed per video.");
    const { styles } = await director(b.brand, b.videos[0].video);
    out(styles.map((x) => `${x.name}  (${x.id})\n  ${x.text}`).join("\n\n"), { ok: true, styles });
    break;
  }
  case "render": {
    const { brand, video } = needVideo();
    const job = await api("/api/render", {
      brand, video,
      ...(flags.format ? { format: String(flags.format) } : {}),
      ...(flags.frames ? { frames: String(flags.frames) } : {}),
      ...(flags.blur ? { blur: true } : {}),
    });
    if (!flags.wait) {
      out(`Render queued (job ${job.id}). Poll with \`status\` — MP4s land in out/${brand}/${video}/.`, { ok: true, job: job.id });
      break;
    }
    const st = await waitIdle(brand, video);
    printStatus(st, exitCodeOf(st));
    break;
  }
  case "outputs": {
    const { brand, video } = needVideo();
    const v = await findVideo(brand, video);
    if (!v) fail(`No video ${brand}/${video}.`);
    const files = [...v.outputs.videos, ...v.outputs.stills].map((o) => ({ file: path.join(ROOT, "out", brand, video, o.rel), size: o.size }));
    out(files.length ? files.map((f) => f.file).join("\n") : "Nothing rendered yet.", { ok: true, files });
    break;
  }
  case "voice-settings": {
    const body = {};
    if (flags["voice-id"]) body.voiceId = String(flags["voice-id"]);
    if (flags.model) body.model = String(flags.model);
    if (flags["key-stdin"]) {
      const chunks = [];
      for await (const c of process.stdin) chunks.push(c);
      body.apiKey = Buffer.concat(chunks).toString().trim();
      if (!body.apiKey) fail("No key on stdin.");
    }
    const r = Object.keys(body).length ? await api("/api/settings", body) : await api("/api/settings");
    const el = r.elevenlabs;
    out(`ElevenLabs: key ${el.hasKey ? `saved (${el.keyHint})` : "not set"} · voice ${el.voiceId}${el.voiceName ? ` (${el.voiceName})` : ""} · model ${el.model}`,
      { ok: true, hasKey: el.hasKey, voiceId: el.voiceId, voiceName: el.voiceName, model: el.model });
    break;
  }
  case "doctor": {
    const { checks } = await api("/api/doctor");
    const ok = checks.every((c) => c.ok || !c.required);
    out(checks.map((c) => `${c.ok ? "✓" : c.required ? "✕" : "○"} ${c.label} — ${c.detail}${c.ok ? "" : ` → ${c.fix}`}`).join("\n"), { ok, checks }, ok ? 0 : 1);
    break;
  }
  default:
    fail("Commands: make · status · ask · approve · stop · fetch-assets · list · new · set · styles · render · outputs · voice-settings · doctor · where\n(see the top of tools/video.mjs)");
}
