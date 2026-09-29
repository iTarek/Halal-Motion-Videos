// Local dashboard for the video machine: browse brands → videos, create new ones,
// direct Claude from a chat box, upload materials, preview in Remotion Studio,
// render with live progress, watch the outputs.
// Usage: npm start  →  http://localhost:4000   (PORT=… to change)
// Node built-ins only; binds to 127.0.0.1.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn, execFile } from "node:child_process";
import { createDirector } from "./director.mjs";
import { deleteStyle, saveStyle } from "../styles.mjs";
import { checks as systemChecks, claudeStatus } from "../doctor.mjs";
import { fixAudio } from "../audiofix.mjs";

// Is the Director usable (Claude Code installed + logged in)? Cached: `claude auth status` spawns a process.
let claudeCache = { at: 0, value: null };
const claudeReady = (fresh = false) => {
  if (fresh || !claudeCache.value || Date.now() - claudeCache.at > 30000) claudeCache = { at: Date.now(), value: claudeStatus() };
  return claudeCache.value;
};
import { checkVoice, DEFAULT_VOICE_ID, readSettings, VOICE_MODELS, writeSettings } from "../settings.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const HERE = path.join(ROOT, "tools", "dashboard");
const BRANDS = path.join(ROOT, "src", "brands");
const OUT = path.join(ROOT, "out");
const PUBLIC = path.join(ROOT, "public");
const PORT = Number(process.env.PORT ?? 4000);
const STUDIO_PORT = Number(process.env.STUDIO_PORT ?? 3000);
const NAME = /^[a-z][a-z0-9-]*$/;
const director = createDirector({ root: ROOT, brandsDir: BRANDS });

// Uploaded files are sorted into folders by type.
const KIND = [
  [/\.(png|jpe?g|webp|gif|svg|avif)$/i, "img"],
  [/\.(ttf|otf|woff2?)$/i, "fonts"],
  [/\.(wav|mp3|m4a|aac|ogg|flac)$/i, "sfx"],
  [/\.(mp4|mov|webm|m4v)$/i, "video"],
];
const kindOf = (name) => KIND.find(([re]) => re.test(name))?.[1] ?? "misc";
const MAX_UPLOAD = 500 * 1024 * 1024;

// ---------- reading the machine from disk

const FORMAT_NAMES = { VERTICAL: "vertical", HORIZONTAL: "horizontal", SQUARE: "square", PORTRAIT: "portrait" };

const dirs = (p) =>
  fs.existsSync(p) ? fs.readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : [];

const readIf = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

/** Formats as declared in the video's index.ts (`formats: [VERTICAL, HORIZONTAL]`). */
const formatsOf = (videoDir) => {
  const src = readIf(path.join(videoDir, "index.ts")) ?? "";
  const m = src.match(/formats:\s*\[([^\]]*)\]/);
  const names = (m?.[1] ?? "").split(",").map((s) => FORMAT_NAMES[s.trim()]).filter(Boolean);
  return names.length ? names : ["vertical", "horizontal"];
};

/** Rendered files in out/<brand>/<video>/ (and stills/), newest first. */
const outputsOf = (brand, video) => {
  const dir = path.join(OUT, brand, video);
  const list = (sub, re) => {
    const d = path.join(dir, sub);
    if (!fs.existsSync(d)) return [];
    return fs
      .readdirSync(d)
      .filter((f) => re.test(f) && !f.startsWith(".")) // hidden = still rendering
      .map((f) => {
        const st = fs.statSync(path.join(d, f));
        const rel = `${sub ? sub + "/" : ""}${f}`;
        // ?v= changes with every new version, so the browser never plays a stale or half-written copy
        return { name: f, rel, url: `/out/${brand}/${video}/${rel}?v=${Math.round(st.mtimeMs)}`, size: st.size, mtime: st.mtimeMs };
      })
      .sort((a, b) => b.mtime - a.mtime);
  };
  return { videos: list("", /\.mp4$/), stills: list("stills", /\.(jpe?g|png)$/) };
};

const listVideos = () =>
  dirs(BRANDS)
    .filter((b) => !b.startsWith("_"))
    .sort()
    .map((brand) => {
      const brandDir = path.join(BRANDS, brand);
      return {
        brand,
        brandDoc: readIf(path.join(brandDir, "brand", "BRAND.md")),
        videos: dirs(brandDir)
          .filter((v) => v !== "brand" && v !== "components")
          .sort()
          .map((video) => {
            const vd = path.join(brandDir, video);
            return {
              video,
              formats: formatsOf(vd),
              doc: readIf(path.join(vd, "README.md")) ?? readIf(path.join(vd, "BRIEF.md")),
              outputs: outputsOf(brand, video),
            };
          }),
      };
    });

// ---------- jobs (renders, stills) — one at a time, FIFO

const jobs = [];
let nextId = 1;

const addJob = (label, args, brand, video) => {
  const job = { id: nextId++, label, args, brand, video, status: "queued", log: [], progress: 0, started: null, ended: null, proc: null };
  jobs.unshift(job);
  if (jobs.length > 30) jobs.pop();
  pump();
  return job;
};

const pump = () => {
  if (jobs.some((j) => j.status === "running")) return;
  const job = [...jobs].reverse().find((j) => j.status === "queued");
  if (!job) return;
  job.status = "running";
  job.started = Date.now();
  const proc = spawn(process.execPath, job.args, { cwd: ROOT, env: process.env });
  job.proc = proc;
  const onData = (buf) => {
    for (const line of buf.toString().split(/\r?\n/)) {
      if (!line.trim()) continue;
      job.log.push(line);
      if (job.log.length > 400) job.log.shift();
      const m = line.match(/: (\d+)%$/);
      if (m) job.progress = Number(m[1]);
    }
  };
  proc.stdout.on("data", onData);
  proc.stderr.on("data", onData);
  proc.on("close", (code) => {
    job.proc = null;
    job.ended = Date.now();
    if (job.status === "running") job.status = code === 0 ? "done" : "failed";
    if (job.status === "done") job.progress = 100;
    pump();
  });
};

const publicJob = ({ proc, ...j }) => j;

// ---------- deleting (to the Trash, so a mistake can be undone from Finder)

/** Removes `import x from "./<name>";` and its `x,` / `...x,` entry from a registry file. */
const unregister = (file, name) => {
  const src = fs.readFileSync(file, "utf8");
  const m = src.match(new RegExp(`^import (\\w+) from "\\./${name.replace(/[-]/g, "\\-")}";\\n`, "m"));
  if (!m) return;
  const id = m[1];
  fs.writeFileSync(file, src.replace(m[0], "").replace(new RegExp(`^\\s*(\\.\\.\\.)?${id},\\n`, "m"), ""));
};

/**
 * Moves existing paths into one folder "MotionVideos <label> <time>" in the system Trash, recoverable from the file
 * manager: ~/.Trash on macOS, the freedesktop Trash on Linux (with a .trashinfo so "Restore" works).
 */
const trash = (paths, label) => {
  const existing = paths.filter((p) => fs.existsSync(p));
  if (!existing.length) return;
  const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
  const name = `MotionVideos ${label} ${stamp}`;
  let bin;
  if (process.platform === "darwin") bin = path.join(os.homedir(), ".Trash", name);
  else {
    const home = process.env.XDG_DATA_HOME || path.join(os.homedir(), ".local", "share");
    bin = path.join(home, "Trash", "files", name);
    const info = path.join(home, "Trash", "info");
    fs.mkdirSync(info, { recursive: true });
    fs.writeFileSync(path.join(info, `${name}.trashinfo`),
      `[Trash Info]\nPath=${encodeURI(path.join(ROOT, "restored-from-trash", name))}\nDeletionDate=${new Date().toISOString().slice(0, 19)}\n`);
  }
  fs.mkdirSync(bin, { recursive: true });
  for (const p of existing) {
    const rel = path.relative(ROOT, p).replaceAll(path.sep, "__");
    try {
      fs.renameSync(p, path.join(bin, rel));
    } catch {
      fs.cpSync(p, path.join(bin, rel), { recursive: true });
      fs.rmSync(p, { recursive: true, force: true });
    }
  }
};

// ---------- Remotion Studio (started on demand, stopped with the dashboard)

let studio = null;
const studioState = () => ({ running: !!studio, url: `http://localhost:${STUDIO_PORT}` });
const startStudio = () => {
  if (studio) return;
  studio = spawn(
    process.execPath,
    [path.join(ROOT, "node_modules", "@remotion", "cli", "remotion-cli.js"), "studio", "--no-open", `--port=${STUDIO_PORT}`],
    { cwd: ROOT, stdio: "ignore" },
  );
  studio.on("close", () => (studio = null));
};
const stopAll = () => {
  studio?.kill();
  director.stopAll();
  for (const j of jobs) j.proc?.kill();
  process.exit(0);
};
process.on("SIGINT", stopAll);
process.on("SIGTERM", stopAll);

// ---------- http

const send = (res, code, body, type = "application/json") => {
  // Never answer twice (e.g. an error after a video stream already started): just close.
  if (res.headersSent) return res.writableEnded ? undefined : res.end();
  res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
};

const readBody = (req) =>
  new Promise((resolve) => {
    let s = "";
    req.on("data", (c) => (s += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(s || "{}"));
      } catch {
        resolve({});
      }
    });
  });

const MIME = {
  ".mp4": "video/mp4", ".mov": "video/quicktime", ".webm": "video/webm", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml",
  ".wav": "audio/wav", ".mp3": "audio/mpeg", ".m4a": "audio/mp4",
};

/** Serves a file under `base` (out/ or public/) with Range support so <video> can seek. */
const serveFile = (req, res, base, rel) => {
  const file = path.resolve(base, rel);
  if (!file.startsWith(base + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return send(res, 404, { error: "not found" });
  const size = fs.statSync(file).size;
  const type = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const stream = (opts) => {
    const rs = fs.createReadStream(file, opts);
    rs.on("error", () => res.destroy()); // file vanished mid-stream etc.
    res.on("close", () => rs.destroy()); // the player cancelled (seeking, closing)
    rs.pipe(res);
  };
  const range = req.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
  if (range && (range[1] || range[2])) {
    let start, end;
    if (!range[1]) {
      // suffix range "bytes=-N": the last N bytes
      start = Math.max(0, size - Number(range[2]));
      end = size - 1;
    } else {
      start = Number(range[1]);
      end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    }
    if (size === 0 || start >= size || start > end) {
      res.writeHead(416, { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" });
      return res.end();
    }
    res.writeHead(206, {
      "Content-Type": type,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Cache-Control": "no-store",
    });
    stream({ start, end });
  } else {
    res.writeHead(200, { "Content-Type": type, "Content-Length": size, "Accept-Ranges": "bytes", "Cache-Control": "no-store" });
    stream({});
  }
};

const validVideo = (brand, video) =>
  NAME.test(brand ?? "") && NAME.test(video ?? "") && fs.existsSync(path.join(BRANDS, brand, video, "index.ts"));

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const p = url.pathname;
  try {
    if (req.method === "GET" && p === "/") return send(res, 200, fs.readFileSync(path.join(HERE, "index.html")), "text/html");
    if (req.method === "GET" && p.startsWith("/out/")) return serveFile(req, res, OUT, decodeURIComponent(p.slice(5)));
    if (req.method === "GET" && p.startsWith("/public/")) return serveFile(req, res, PUBLIC, decodeURIComponent(p.slice(8)));

    // ---- Settings (ElevenLabs). The key never goes back to the browser — only a hint.
    if (p === "/api/settings") {
      const pub = (extra = {}) => {
        const el = readSettings().elevenlabs;
        return {
          elevenlabs: {
            hasKey: !!el.apiKey,
            keyHint: el.apiKey ? `…${el.apiKey.slice(-4)}` : "",
            voiceId: el.voiceId,
            voiceName: el.voiceName,
            model: el.model,
            models: VOICE_MODELS,
            defaultVoiceId: DEFAULT_VOICE_ID,
          },
          ...extra,
        };
      };
      if (req.method === "GET") return send(res, 200, pub());
      if (req.method !== "POST") return send(res, 404, { error: "not found" });
      const b = await readBody(req);
      const cur = readSettings().elevenlabs;
      const apiKey = typeof b.apiKey === "string" && b.apiKey.trim() ? b.apiKey.trim() : b.clearKey ? "" : cur.apiKey;
      const voiceId = typeof b.voiceId === "string" && b.voiceId.trim() ? b.voiceId.trim() : cur.voiceId;
      if (!/^[A-Za-z0-9]{8,64}$/.test(voiceId)) return send(res, 400, { error: "A voice ID is letters and numbers, like NOpBlnGInO9m6vDvFkFC." });
      const model = VOICE_MODELS[b.model] ? b.model : cur.model;
      let voiceName = voiceId === cur.voiceId ? cur.voiceName : "";
      if (apiKey) {
        const check = await checkVoice(apiKey, voiceId);
        if (!check.ok) return send(res, 400, { error: check.error });
        voiceName = check.name;
      }
      writeSettings({ elevenlabs: { apiKey, voiceId, voiceName, model } });
      return send(res, 200, pub({ saved: true }));
    }

    // System check (same as `npm run doctor`)
    if (req.method === "GET" && p === "/api/doctor") return send(res, 200, { checks: systemChecks() });

    // Plays a short sample in the browser (uses a few ElevenLabs credits).
    if (req.method === "POST" && p === "/api/voice/test") {
      const b = await readBody(req);
      const el = readSettings().elevenlabs;
      if (!el.apiKey) return send(res, 400, { error: "Add your ElevenLabs API key first." });
      const voiceId = /^[A-Za-z0-9]{8,64}$/.test(b.voiceId ?? "") ? b.voiceId : el.voiceId;
      const text = String(b.text || "[warm, friendly] Hi! This is the voice for your Halal Motion Videos narration.").slice(0, 500);
      try {
        const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
          method: "POST",
          headers: { "xi-api-key": el.apiKey, "Content-Type": "application/json" },
          body: JSON.stringify({ text, model_id: el.model }),
        });
        if (!r.ok) return send(res, 400, { error: `ElevenLabs ${r.status}: ${(await r.text()).slice(0, 200)}` });
        res.writeHead(200, { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" });
        return res.end(Buffer.from(await r.arrayBuffer()));
      } catch (e) {
        return send(res, 500, { error: `Couldn't reach ElevenLabs (${e.message}).` });
      }
    }

    // ---- Director (Claude chat per video)
    if (p.startsWith("/api/director")) {
      const q = req.method === "GET" ? Object.fromEntries(url.searchParams) : await readBody(req);
      if (!validVideo(q.brand, q.video)) return send(res, 400, { error: "Unknown video." });
      const { brand, video } = q;
      const action = p.slice("/api/director".length);
      if (req.method === "GET" && action === "") return send(res, 200, { ...director.state(brand, video), claude: claudeReady() });
      if ((action === "/send" || action === "/approve") && !claudeReady(true).ok)
        return send(res, 409, { error: `The Director needs Claude Code: ${claudeReady().fix}` });
      if (req.method !== "POST") return send(res, 404, { error: "not found" });
      try {
        if (action === "/send") {
          const text = String(q.text ?? "").trim();
          if (!text) return send(res, 400, { error: "Write something first." });
          director.send(brand, video, text, q.effort);
        } else if (action === "/approve") director.approve(brand, video, q.effort);
        else if (action === "/formats") director.setFormats(brand, video, q.formats);
        else if (action === "/style") director.setStyle(brand, video, q.styleId);
        else if (action === "/style-save") director.setStyle(brand, video, saveStyle({ name: q.name, text: q.text }).id);
        else if (action === "/style-delete") {
          deleteStyle(String(q.styleId ?? ""));
          director.setStyle(brand, video, null);
        } else if (action === "/voiceover") {
          if (typeof q.voiceId === "string" && q.voiceId.trim() && !/^[A-Za-z0-9]{8,64}$/.test(q.voiceId.trim()))
            return send(res, 400, { error: "A voice ID is letters and numbers, like NOpBlnGInO9m6vDvFkFC." });
          director.setVoiceover(brand, video, { enabled: q.enabled, voiceId: q.voiceId, videoLanguage: q.videoLanguage, voiceLanguage: q.voiceLanguage, length: q.length });
        }
        else if (action === "/reopen") director.reopenBrief(brand, video);
        else if (action === "/stop") director.stop(brand, video);
        else if (action === "/reset") director.reset(brand, video);
        else return send(res, 404, { error: "not found" });
      } catch (e) {
        return send(res, 409, { error: e.message });
      }
      return send(res, 200, director.state(brand, video));
    }

    // ---- brand settings: product website + product folder on this Mac (both optional)
    if (req.method === "POST" && p === "/api/brand-settings") {
      const body = await readBody(req);
      const { brand } = body;
      if (!NAME.test(brand ?? "") || !fs.existsSync(path.join(BRANDS, brand))) return send(res, 400, { error: "Unknown brand." });
      const patch = {};
      if (typeof body.url === "string") {
        const u = body.url.trim();
        if (u && !/^https?:\/\/\S+$/.test(u)) return send(res, 400, { error: "That doesn't look like a web address." });
        patch.url = u;
      }
      if (typeof body.folder === "string") {
        let f = body.folder.trim().replace(/^["']|["']$/g, "");
        if (f.startsWith("~")) f = path.join(os.homedir(), f.slice(1));
        if (f) {
          f = path.resolve(f);
          if (!fs.existsSync(f) || !fs.statSync(f).isDirectory()) return send(res, 400, { error: "That folder doesn't exist on this Mac." });
          if (f === "/" || f === os.homedir()) return send(res, 400, { error: "Pick the product's own folder, not the whole disk or home folder." });
          if (f === ROOT || f.startsWith(ROOT + path.sep)) return send(res, 400, { error: "That's this video machine itself — pick the product's folder." });
        }
        patch.folder = f;
      }
      director.setBrandSettings(brand, patch);
      return send(res, 200, { ok: true });
    }

    // ---- uploads: raw body → public/<brand>/brand/<kind>/ or public/<brand>/<video>/<kind>/
    if (req.method === "POST" && p === "/api/upload") {
      const { brand, video, scope } = Object.fromEntries(url.searchParams);
      const name = path.basename(String(url.searchParams.get("name") ?? "")).replace(/[^\w.\- ]+/g, "_").trim();
      if (!validVideo(brand, video) || !["brand", "video"].includes(scope) || !name || name.startsWith("."))
        return send(res, 400, { error: "Bad upload." });
      const dir = path.join(PUBLIC, brand, scope === "brand" ? "brand" : video, kindOf(name));
      fs.mkdirSync(dir, { recursive: true });
      const dest = path.join(dir, name);
      const tmp = `${dest}.uploading`;
      const out = fs.createWriteStream(tmp);
      let size = 0;
      req.on("data", (c) => {
        size += c.length;
        if (size > MAX_UPLOAD) req.destroy();
      });
      req.pipe(out);
      out.on("finish", () => {
        if (size > MAX_UPLOAD) return fs.rmSync(tmp, { force: true });
        fs.renameSync(tmp, dest);
        fixAudio(dest); // e.g. Apple Lossless .m4a → AAC, so Remotion and Chrome can play it
        send(res, 200, { path: path.relative(PUBLIC, dest) });
      });
      req.on("error", () => fs.rmSync(tmp, { force: true }));
      return;
    }

    if (req.method === "POST" && p === "/api/files/delete") {
      const { file } = await readBody(req);
      const abs = path.resolve(PUBLIC, String(file ?? ""));
      const top = path.relative(PUBLIC, abs).split(path.sep)[0];
      if (!abs.startsWith(PUBLIC + path.sep) || top.startsWith("_") || !fs.existsSync(abs) || !fs.statSync(abs).isFile())
        return send(res, 400, { error: "Can't delete that." });
      fs.rmSync(abs);
      return send(res, 200, { ok: true });
    }
    if (req.method === "GET" && p === "/api/state")
      return send(res, 200, { brands: listVideos(), jobs: jobs.map(publicJob), studio: studioState(), directing: director.runningCount() });

    if (req.method === "POST" && p === "/api/new") {
      const { brand, video } = await readBody(req);
      if (!NAME.test(brand ?? "") || (video && !NAME.test(video)))
        return send(res, 400, { error: "Names are lowercase letters, numbers and dashes, starting with a letter." });
      const args = [path.join(ROOT, "tools", "new.mjs"), brand, ...(video ? [video] : [])];
      return execFile(process.execPath, args, { cwd: ROOT }, (err, stdout, stderr) =>
        err ? send(res, 400, { error: (stderr || err.message).trim() }) : send(res, 200, { output: stdout.trim() }),
      );
    }

    if (req.method === "POST" && p === "/api/render") {
      const { brand, video, format, frames, blur } = await readBody(req);
      if (!validVideo(brand, video)) return send(res, 400, { error: "Unknown video." });
      if (format && !NAME.test(format)) return send(res, 400, { error: "Bad format." });
      if (frames && !/^\d+-\d+$/.test(frames)) return send(res, 400, { error: "Frames look like 0-89." });
      const args = [path.join(ROOT, "tools", "render.mjs"), brand, video, ...(format ? [format] : []), ...(frames ? [`--frames=${frames}`] : []), ...(blur ? ["--blur"] : [])];
      const job = addJob(`Render ${brand}/${video}${format ? " · " + format : " · all formats"}${frames ? ` · frames ${frames}` : ""}${blur ? " · film look" : ""}`, args, brand, video);
      return send(res, 200, publicJob(job));
    }

    if (req.method === "POST" && p === "/api/stills") {
      const { brand, video, format, frames } = await readBody(req);
      if (!validVideo(brand, video)) return send(res, 400, { error: "Unknown video." });
      const list = String(frames ?? "").split(/[\s,]+/).filter(Boolean);
      if (!list.length || !list.every((f) => /^\d+$/.test(f))) return send(res, 400, { error: "Frames look like 0, 60, 120." });
      const args = [path.join(ROOT, "tools", "stills.mjs"), brand, video, ...list, ...(format ? [`--format=${format}`] : [])];
      return send(res, 200, publicJob(addJob(`Stills ${brand}/${video} · ${list.join(", ")}`, args, brand, video)));
    }

    const cancel = p.match(/^\/api\/jobs\/(\d+)\/cancel$/);
    if (req.method === "POST" && cancel) {
      const job = jobs.find((j) => j.id === Number(cancel[1]));
      if (!job) return send(res, 404, { error: "No such job." });
      if (job.status === "queued") job.status = "cancelled";
      if (job.status === "running") {
        job.status = "cancelled";
        job.proc?.kill();
      }
      return send(res, 200, publicJob(job));
    }

    if (req.method === "POST" && p === "/api/studio") {
      startStudio();
      return send(res, 200, studioState());
    }

    // ---- delete a video or a whole brand: unregister first, then move every folder to the system Trash
    if (req.method === "POST" && (p === "/api/delete-video" || p === "/api/delete-brand")) {
      const { brand, video } = await readBody(req);
      const whole = p === "/api/delete-brand";
      if (!NAME.test(brand ?? "") || !fs.existsSync(path.join(BRANDS, brand))) return send(res, 400, { error: "Unknown brand." });
      if (!whole && !validVideo(brand, video)) return send(res, 400, { error: "Unknown video." });
      if (director.isBusy(brand, whole ? undefined : video)) return send(res, 409, { error: "Claude is working on this — stop it first." });
      if (jobs.some((j) => ["running", "queued"].includes(j.status) && j.brand === brand && (whole || j.video === video)))
        return send(res, 409, { error: "A render is running for this — cancel it first." });
      try {
        if (whole) {
          trash([path.join(BRANDS, brand), path.join(PUBLIC, brand), path.join(OUT, brand), path.join(ROOT, ".director", brand)], brand);
        } else {
          unregister(path.join(BRANDS, brand, "index.ts"), video);
          trash(
            [path.join(BRANDS, brand, video), path.join(PUBLIC, brand, video), path.join(OUT, brand, video), path.join(ROOT, ".director", brand, `${video}.json`)],
            `${brand}-${video}`,
          );
        }
      } catch (e) {
        return send(res, 500, { error: `Couldn't delete: ${e.message}` });
      }
      return send(res, 200, { ok: true });
    }

    // ---- delete one output (render or still) → system Trash
    if (req.method === "POST" && p === "/api/outputs/delete") {
      const { brand, video, file } = await readBody(req);
      if (!validVideo(brand, video)) return send(res, 400, { error: "Unknown video." });
      const base = path.join(OUT, brand, video);
      const abs = path.resolve(base, String(file ?? ""));
      if (!abs.startsWith(base + path.sep) || path.basename(abs).startsWith(".") || !fs.existsSync(abs) || !fs.statSync(abs).isFile())
        return send(res, 400, { error: "Can't delete that." });
      trash([abs], `${brand}-${video}-${path.basename(abs)}`);
      return send(res, 200, { ok: true });
    }

    if (req.method === "POST" && p === "/api/reveal") {
      const { brand, video, where } = await readBody(req);
      if (!validVideo(brand, video)) return send(res, 400, { error: "Unknown video." });
      const target = {
        out: path.join(OUT, brand, video),
        src: path.join(BRANDS, brand, video),
        public: path.join(ROOT, "public", brand, video),
        project: director.state(brand, video).folderOk ? director.state(brand, video).folder : null,
      }[where];
      if (!target) return send(res, 400, { error: "Bad target." });
      fs.mkdirSync(target, { recursive: true });
      execFile(process.platform === "darwin" ? "open" : "xdg-open", [target], () => {}); // Finder / Linux file manager
      return send(res, 200, { ok: true });
    }

    send(res, 404, { error: "not found" });
  } catch (e) {
    send(res, 500, { error: String(e?.message ?? e) });
  }
});

// Safety net: one bad request must never take the whole dashboard down.
process.on("uncaughtException", (e) => console.error("[dashboard] error (kept running):", e));
process.on("unhandledRejection", (e) => console.error("[dashboard] error (kept running):", e));

server.listen(PORT, "127.0.0.1", () => console.log(`Halal Motion Videos dashboard → http://localhost:${PORT}`));
