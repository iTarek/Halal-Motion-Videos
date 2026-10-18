// Health check: is everything this project needs installed? Used by `npm run doctor` (--json for agents),
// `npm run setup` and the dashboard's Settings → System check. Node built-ins only.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { remotionChrome } from "./chrome.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const MIN_NODE = 22;
export const MIN_CLAUDE = "2.1.280"; // first version that runs Opus 5.5

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { encoding: "utf8", timeout: 15000, windowsHide: true, env: cliEnvironment() });
  return r.error ? null : { code: r.status, out: `${r.stdout ?? ""}${r.stderr ?? ""}`.trim() };
};
export const cliEnvironment = () => ({ ...process.env, HOME: process.env.HOME || os.homedir(), CODEX_HOME: process.env.CODEX_HOME || path.join(os.homedir(), ".codex") });
const newer = (a, b) => {
  const [x, y] = [a, b].map((v) => v.split(".").map(Number));
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) > (y[i] ?? 0);
  return true;
};

/** Python to use: the project's .venv if present, else python3. */
export const pythonBin = () => {
  const venv = path.join(ROOT, ".venv", process.platform === "win32" ? "Scripts/python.exe" : "bin/python");
  return fs.existsSync(venv) ? venv : (process.platform === "win32" ? "python" : "python3");
};

const settingsHaveKey = () => {
  if (process.env.ELEVENLABS_API_KEY) return true;
  try {
    return !!JSON.parse(fs.readFileSync(path.join(ROOT, ".director", "settings.json"), "utf8")).elevenlabs?.apiKey;
  } catch {
    return false;
  }
};

/**
 * Is Claude Code working here? Installed, new enough, and logged in (however the user chose to set it
 * up). Uses `claude auth status` — no tokens spent. Never returns the email or org.
 */
export const claudeStatus = () => {
  const v = run("claude", ["--version"]);
  const version = v?.out.match(/(\d+\.\d+\.\d+)/)?.[1];
  if (!version) return { ok: false, reason: "missing", detail: "not installed", fix: "Install and set up Claude Code (claude.com/claude-code)." };
  if (!newer(version, MIN_CLAUDE)) return { ok: false, reason: "old", detail: `v${version} (needs ${MIN_CLAUDE}+)`, fix: "Run `claude update`." };
  let auth = {};
  try {
    auth = JSON.parse(run("claude", ["auth", "status"])?.out || "{}");
  } catch {}
  if (!auth.loggedIn && !process.env.ANTHROPIC_API_KEY)
    return { ok: false, reason: "logged-out", detail: `v${version} · not logged in`, fix: "Log in to Claude Code (run `claude auth login`)." };
  const plan = auth.subscriptionType ? ` (Claude ${auth.subscriptionType[0].toUpperCase()}${auth.subscriptionType.slice(1)})` : "";
  return { ok: true, reason: "ok", detail: `v${version} · logged in${plan}`, fix: "" };
};

export const codexBin = () => {
  const custom = process.env.CODEX_BIN;
  if (custom && fs.existsSync(custom)) return custom;
  const standard = path.join(process.env.USERPROFILE || "", ".codex", "plugins", ".plugin-appserver", "codex.exe");
  if (fs.existsSync(standard)) return standard;
  return "codex";
};

export const codexStatus = () => {
  const bin = codexBin();
  const v = run(bin, ["--version"]);
  if (!v || v.code !== 0) return { ok: false, reason: "missing", detail: "not installed", fix: "Install Codex CLI." };
  const auth = run(bin, ["login", "status"]);
  if (!auth || auth.code !== 0) return { ok: false, reason: "logged-out", detail: `${v.out.split("\n")[0]} · not logged in`, fix: "Run `codex login` (use CODEX_BIN if Codex is not on PATH).", bin };
  return { ok: true, reason: "ok", detail: `${v.out.match(/codex-cli[^\r\n]*/)?.[0] || "Codex CLI"} · logged in`, fix: "", bin };
};

export const antigravityBin = () => {
  if (process.env.ANTIGRAVITY_BIN) return process.env.ANTIGRAVITY_BIN;
  const native = process.platform === "win32"
    ? path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local"), "agy", "bin", "agy.exe")
    : path.join(os.homedir(), ".local", "bin", "agy");
  return fs.existsSync(native) ? native : "agy";
};

export const antigravityStatus = () => {
  const bin = antigravityBin();
  const version = run(bin, ["--version"]);
  if (!version || version.code !== 0)
    return { ok: false, reason: "missing", detail: "not installed", fix: "Install Antigravity CLI from antigravity.google/download, then run `agy` once to sign in. The IDE alone is not the CLI.", bin };
  // The documented CLI has no non-interactive auth-status command. Do not infer
  // authentication from credential files or make a billable prompt during doctor.
  return { ok: true, reason: "installed", authVerified: false, detail: "installed · sign-in checked on first run", fix: "Run `agy` once to sign in.", bin };
};

/** Where each Director engine looks for skills, in the home folder or this repo. */
const SKILL_DIRS = {
  "Claude Code": [".claude/skills"],
  Codex: [".agents/skills", ".codex/skills"],
  Antigravity: [".gemini/config/skills", ".gemini/antigravity-cli/skills"],
};
/** The engines that can see Remotion's best-practices skill. */
export const remotionSkillFor = (home = os.homedir()) =>
  Object.entries(SKILL_DIRS)
    .filter(([, dirs]) => dirs.some((d) => [home, ROOT].some((base) => fs.existsSync(path.join(base, d, "remotion-best-practices", "SKILL.md")))))
    .map(([engine]) => engine);

/** Every check: { id, label, ok, required, detail, fix, needs } */
export const checks = () => {
  const out = [];
  const add = (c) => out.push(c);

  const nodeMajor = Number(process.versions.node.split(".")[0]);
  add({
    id: "node", label: "Node.js", required: true, ok: nodeMajor >= MIN_NODE,
    detail: `v${process.versions.node}`, needs: "everything",
    fix: `Install Node.js ${MIN_NODE} or newer (nodejs.org, \`brew install node\` on macOS, or your Linux package manager / nvm).`,
  });

  const deps = fs.existsSync(path.join(ROOT, "node_modules", "remotion")) && fs.existsSync(path.join(ROOT, "node_modules", "@remotion", "renderer"));
  add({ id: "deps", label: "npm packages", required: true, ok: deps, detail: deps ? "installed" : "missing", needs: "everything", fix: "Run `npm install`." });

  const browser = !!remotionChrome(); // Remotion's own, or $REMOTION_CHROME_BIN
  add({
    id: "browser", label: "Remotion's headless Chrome", required: true, ok: browser, detail: browser ? "installed" : "missing",
    needs: "rendering, stills, screenshots", fix: "Run `npx remotion browser ensure`.",
  });

  const ff = run("ffmpeg", ["-version"]);
  const fp = run("ffprobe", ["-version"]);
  add({
    id: "ffmpeg", label: "ffmpeg + ffprobe", required: true, ok: !!(ff && fp && ff.code === 0 && fp.code === 0),
    detail: ff?.out.split("\n")[0]?.replace(/ Copyright.*/, "") ?? "not found", needs: "audio mastering, voice-over timing",
    fix: process.platform === "win32" ? "Install FFmpeg for Windows from ffmpeg.org and add its bin folder to PATH (ffmpeg + ffprobe)." : "Install ffmpeg: `brew install ffmpeg` (macOS) or `sudo apt install ffmpeg` (Linux).",
  });

  const py = pythonBin();
  const pyv = run(py, ["--version"]);
  const pyDeps = pyv ? run(py, ["-c", "import numpy, scipy; print(numpy.__version__, scipy.__version__)"]) : null;
  add({
    id: "python", label: "Python 3 + numpy + scipy", required: true, ok: !!(pyDeps && pyDeps.code === 0),
    detail: pyv ? `${pyv.out}${pyDeps?.code === 0 ? ` · numpy ${pyDeps.out.split(" ")[0]} · scipy ${pyDeps.out.split(" ")[1]}` : " · numpy/scipy missing"}${py.includes(".venv") ? " (.venv)" : ""}` : "python3 not found",
    needs: "sound design (npm run sfx)",
    fix: process.platform === "win32" ? "Install Python 3 from python.org with Add Python to PATH enabled, then run `npm run setup`." : pyv ? "Run `npm run setup` (creates .venv with numpy + scipy; on Debian/Ubuntu first `sudo apt install python3-venv`)." : "Install Python 3 (`brew install python` on macOS, `sudo apt install python3 python3-venv` on Debian/Ubuntu), then `npm run setup`.",
  });

  const cl = claudeStatus();
  add({
    id: "claude", label: "Claude Code CLI", required: false, ok: cl.ok,
    detail: cl.detail, needs: "the Director chat (Claude engine)",
    fix: cl.fix,
  });

  const cdx = codexStatus();
  add({
    id: "codex", label: "Codex CLI (ChatGPT)", required: false, ok: cdx.ok,
    detail: cdx.detail, needs: "the Director chat (Codex engine)",
    fix: cdx.fix,
  });
  const agy = antigravityStatus();
  add({ id: "antigravity", label: "Antigravity CLI", required: false, ok: agy.ok, detail: agy.detail, needs: "the Director chat (Antigravity engine)", fix: agy.fix });

  // The Director's prompt points every engine at Remotion's own best-practices skill, which isn't part of this repo.
  const ready = [["Claude Code", cl.ok], ["Codex", cdx.ok], ["Antigravity", agy.ok]].filter(([, ok]) => ok).map(([name]) => name);
  const has = remotionSkillFor();
  const lacking = ready.filter((name) => !has.includes(name));
  add({
    id: "remotion-skill", label: "Remotion skill (remotion-best-practices)", required: false, ok: has.length > 0 && !lacking.length,
    detail: has.length ? `for ${has.join(", ")}${lacking.length ? ` · missing for ${lacking.join(", ")}` : ""}` : "not installed",
    needs: "the Director's Remotion know-how",
    fix: "Run `npx skills add remotion-dev/skills --skill remotion-best-practices -g` (it installs for every agent it finds).",
  });

  add({
    id: "elevenlabs", label: "ElevenLabs API key", required: false, ok: settingsHaveKey(), detail: settingsHaveKey() ? "saved" : "not set (optional)",
    needs: "voice-over", fix: "Add it in the dashboard → Settings (or set ELEVENLABS_API_KEY).",
  });

  return out;
};

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const list = checks();
  if (process.argv.includes("--json")) {
    // for agents and scripts: { ok, checks: [{ id, label, required, ok, detail, needs, fix }] }
    console.log(JSON.stringify({ ok: list.every((c) => c.ok || !c.required), checks: list }, null, 2));
    process.exit(list.some((c) => c.required && !c.ok) ? 1 : 0);
  }
  const width = Math.max(...list.map((c) => c.label.length));
  console.log("\nHalal Motion Videos — system check\n");
  for (const c of list) {
    const mark = c.ok ? "✓" : c.required ? "✕" : "○";
    console.log(`  ${mark} ${c.label.padEnd(width)}  ${c.detail}${c.ok ? "" : `\n      → ${c.fix}  (needed for ${c.needs})`}`);
  }
  const missing = list.filter((c) => c.required && !c.ok);
  console.log(missing.length ? `\n${missing.length} required item(s) missing — run \`npm run setup\` or follow the → hints.\n` : "\nAll set. Start with `npm start` → http://localhost:4000\n");
  process.exit(missing.length ? 1 : 0);
}
