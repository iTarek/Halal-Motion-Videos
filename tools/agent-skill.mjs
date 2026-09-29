// Installs this repo's Agent Skill (.agents/skills/halal-motion-videos) for AI agents on this machine, as symlinks,
// so a `git pull` updates it everywhere:
//   ~/.agents/skills/                OpenClaw, Codex and other Agent Skills (agentskills.io) agents
//   ~/.hermes/skills/creative/       Hermes Agent (only if ~/.hermes exists)
//   ~/.openclaw/skills/              OpenClaw's own folder (only if ~/.openclaw exists)
//
// Usage: npm run agent-skill [-- --remove]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NAME = "halal-motion-videos";
const SKILL = path.join(ROOT, ".agents", "skills", NAME);
const home = os.homedir();
const remove = process.argv.includes("--remove");

const hermes = path.join(home, ".hermes", "skills");
const targets = [
  { agent: "OpenClaw, Codex, other agents", dir: path.join(home, ".agents", "skills"), always: true },
  { agent: "Hermes", dir: fs.existsSync(path.join(hermes, "creative")) ? path.join(hermes, "creative") : hermes, when: path.join(home, ".hermes") },
  { agent: "OpenClaw", dir: path.join(home, ".openclaw", "skills"), when: path.join(home, ".openclaw") },
].filter((t) => t.always || fs.existsSync(t.when));

const linkInfo = (p) => {
  try {
    const st = fs.lstatSync(p);
    return st.isSymbolicLink() ? { link: true, to: path.resolve(path.dirname(p), fs.readlinkSync(p)) } : { link: false };
  } catch {
    return null; // nothing there
  }
};

for (const t of targets) {
  const dest = path.join(t.dir, NAME);
  const now = linkInfo(dest);
  const short = dest.replace(home, "~");
  if (remove) {
    if (now?.link && now.to === SKILL) {
      fs.unlinkSync(dest);
      console.log(`✓ removed ${short}`);
    } else if (now) console.log(`– left ${short} alone (not a link to this repo)`);
    continue;
  }
  if (now && !(now.link)) {
    console.log(`✕ ${short} is a real folder, not a link: remove it first if you want this repo's skill there`);
    continue;
  }
  fs.mkdirSync(t.dir, { recursive: true });
  if (now) fs.unlinkSync(dest); // an old link, maybe to another copy of the repo
  fs.symlinkSync(SKILL, dest, "dir");
  console.log(`✓ ${short} → this repo   (${t.agent})`);
}

if (!remove)
  console.log(`
Agents can now use the "${NAME}" skill. Start a new agent session to load it.
  Try:   "${path.join(SKILL, "scripts", "video")}" doctor

Working inside this repo instead? The skill is already in .agents/skills/:
  Hermes:   hermes skills trust "${ROOT}"      (Hermes loads a repo's own skills only after this)
  OpenClaw: use this repo as the workspace, or keep the link above.

Undo: npm run agent-skill -- --remove`);
