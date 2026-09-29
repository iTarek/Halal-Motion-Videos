// Health check: is everything this project needs installed? Used by `npm run doctor` (--json for agents),
// `npm run setup` and the dashboard's Settings → System check. Node built-ins only.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const MIN_NODE = 22;
export const MIN_CLAUDE = "2.1.280"; // first version that runs Opus 5.5

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { encoding: "utf8", timeout: 15000 });
  return r.error ? null : { code: r.status, out: `${r.stdout ?? ""}${r.stderr ?? ""}`.trim() };
};
const newer = (a, b) => {
  const [x, y] = [a, b].map((v) => v.split(".").map(Number));
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) > (y[i] ?? 0);
  return true;
};

/** Python to use: the project's .venv if present, else python3. */
export const pythonBin = () => {
  const venv = path.join(ROOT, ".venv", process.platform === "win32" ? "Scripts/python.exe" : "bin/python");
  return fs.existsSync(venv) ? venv : "python3";
};

const remotionBrowser = () => {
  const dir = path.join(ROOT, "node_modules", ".remotion", "chrome-headless-shell");
  return fs.existsSync(dir) && fs.readdirSync(dir).length > 0;
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

  const browser = remotionBrowser();
  add({
    id: "browser", label: "Remotion's headless Chrome", required: true, ok: browser, detail: browser ? "installed" : "missing",
    needs: "rendering, stills, screenshots", fix: "Run `npx remotion browser ensure`.",
  });

  const ff = run("ffmpeg", ["-version"]);
  const fp = run("ffprobe", ["-version"]);
  add({
    id: "ffmpeg", label: "ffmpeg + ffprobe", required: true, ok: !!(ff && fp && ff.code === 0 && fp.code === 0),
    detail: ff?.out.split("\n")[0]?.replace(/ Copyright.*/, "") ?? "not found", needs: "audio mastering, voice-over timing",
    fix: "Install ffmpeg: `brew install ffmpeg` (macOS) or `sudo apt install ffmpeg` (Linux).",
  });

  const py = pythonBin();
  const pyv = run(py, ["--version"]);
  const pyDeps = pyv ? run(py, ["-c", "import numpy, scipy; print(numpy.__version__, scipy.__version__)"]) : null;
  add({
    id: "python", label: "Python 3 + numpy + scipy", required: true, ok: !!(pyDeps && pyDeps.code === 0),
    detail: pyv ? `${pyv.out}${pyDeps?.code === 0 ? ` · numpy ${pyDeps.out.split(" ")[0]} · scipy ${pyDeps.out.split(" ")[1]}` : " · numpy/scipy missing"}${py.includes(".venv") ? " (.venv)" : ""}` : "python3 not found",
    needs: "sound design (npm run sfx)",
    fix: pyv ? "Run `npm run setup` (creates .venv with numpy + scipy; on Debian/Ubuntu first `sudo apt install python3-venv`)." : "Install Python 3 (`brew install python` on macOS, `sudo apt install python3 python3-venv` on Debian/Ubuntu), then `npm run setup`.",
  });

  const cl = claudeStatus();
  add({
    id: "claude", label: "Claude Code CLI", required: false, ok: cl.ok,
    detail: cl.detail, needs: "the Director chat only — everything else works without it",
    fix: cl.fix,
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
