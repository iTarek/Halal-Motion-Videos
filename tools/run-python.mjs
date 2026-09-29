// Runs a Python tool with the project's .venv if it exists (made by `npm run setup`), else python3.
import { spawnSync } from "node:child_process";
import { pythonBin } from "./doctor.mjs";

// no __pycache__ folders next to a video's sfx_custom.py
const r = spawnSync(pythonBin(), process.argv.slice(2), { stdio: "inherit", env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" } });
if (r.error) {
  console.error("Python 3 not found — run `npm run setup` (or install Python 3 with numpy + scipy).");
  process.exit(1);
}
process.exit(r.status ?? 1);
