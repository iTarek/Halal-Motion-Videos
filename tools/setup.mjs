// One-command setup for a fresh clone: `npm run setup`.
// Installs what's safe to install inside the project (npm packages, Remotion's headless Chrome,
// a Python .venv with numpy + scipy), then prints exact fixes for anything system-wide
// (Node, ffmpeg, Python, Claude Code) — it never installs global software itself.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { checks, MIN_NODE, pythonBin, ROOT } from "./doctor.mjs";

const step = (msg) => console.log(`\n▸ ${msg}`);
const sh = (cmd, args, opts = {}) => spawnSync(cmd, args, { cwd: ROOT, stdio: "inherit", ...opts }).status === 0;

if (Number(process.versions.node.split(".")[0]) < MIN_NODE) {
  console.error(`Node.js ${MIN_NODE}+ is required (you have v${process.versions.node}). Install it from nodejs.org or \`brew install node\`, then run \`npm run setup\` again.`);
  process.exit(1);
}

step("npm packages");
if (!fs.existsSync(path.join(ROOT, "node_modules", "remotion"))) sh("npm", ["install"]);
else console.log("  already installed");

step("Remotion's headless Chrome (rendering, stills, screenshots)");
sh("npx", ["remotion", "browser", "ensure"]);

step("Python + numpy + scipy (sound design)");
const hasDeps = (py) => spawnSync(py, ["-c", "import numpy, scipy"], { stdio: "ignore" }).status === 0;
const py = pythonBin();
if (spawnSync(py, ["--version"], { stdio: "ignore" }).error) {
  console.log("  python3 not found — install Python 3 (python.org or `brew install python`) and run setup again.");
} else if (hasDeps(py)) {
  console.log(`  ready (${py.includes(".venv") ? ".venv" : "system python3"})`);
} else {
  console.log("  creating .venv with numpy + scipy…");
  if (sh("python3", ["-m", "venv", ".venv"]) && sh(pythonBin(), ["-m", "pip", "install", "--quiet", "--upgrade", "pip"]) && sh(pythonBin(), ["-m", "pip", "install", "--quiet", "-r", "requirements.txt"])) {
    console.log("  done");
  } else
    console.log(
      "  couldn't create the .venv." +
        (process.platform === "linux" ? " On Debian/Ubuntu: `sudo apt install python3-venv`, then run setup again." : "") +
        " Or install numpy + scipy yourself: `python3 -m pip install -r requirements.txt`.",
    );
}

step("System check");
const list = checks();
for (const c of list) console.log(`  ${c.ok ? "✓" : c.required ? "✕" : "○"} ${c.label} — ${c.detail}${c.ok ? "" : `\n      → ${c.fix}`}`);
const missing = list.filter((c) => c.required && !c.ok);
console.log(missing.length ? `\nAlmost there: fix the ✕ items above, then run \`npm run doctor\`.` : "\nAll set. Run `npm start` → http://localhost:4000");
process.exit(missing.length ? 1 : 0);
