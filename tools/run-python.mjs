// Runs a Python tool with the project's .venv if it exists (made by `npm run setup`), else python3.
import { spawnSync } from "node:child_process";
import { pythonBin } from "./doctor.mjs";

const r = spawnSync(pythonBin(), process.argv.slice(2), { stdio: "inherit" });
if (r.error) {
  console.error("Python 3 not found — run `npm run setup` (or install Python 3 with numpy + scipy).");
  process.exit(1);
}
process.exit(r.status ?? 1);
