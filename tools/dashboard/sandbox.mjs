// A macOS sandbox (sandbox-exec) for Codex, a Director engine that brings no guardrails of its own.
// It gives it what Claude's permission rules give Claude:
//   • writes only inside this repo (never .git, .director/settings.json, the browser profiles, or MP4s in out/), plus
//     temp folders, the npm cache and the engine's own data folder — the product folder stays read-only
//   • no reading .director/settings.json (API keys), .director/browser/ (logins) or anything in the home folder except
//     this repo, the product folder and the tools it runs (node, npm, Python packages, the engine itself)
//   • network on: websites, downloads, the engine's own API
// `npm run voice` and `npm run shot` need the key or a browser profile, so inside the sandbox they ask the dashboard to
// run them for this run (tools/broker.mjs). Linux and Windows have no such sandbox: there Codex runs unrestricted.
// Antigravity runs unrestricted everywhere: it reads its sign-in from the Keychain through the `security` tool, and
// letting the sandbox do that would let it read other tools' saved tokens too (e.g. GitHub CLI's).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const SANDBOX_EXEC = "/usr/bin/sandbox-exec";
export const canSandbox = () => process.platform === "darwin" && fs.existsSync(SANDBOX_EXEC);

/** The real path, also for a file that doesn't exist yet (e.g. settings.json before the first save): its folder's real path. */
const real = (p) => {
  try {
    return fs.realpathSync(p);
  } catch {
    const parent = path.dirname(path.resolve(p));
    return parent === path.resolve(p) ? parent : path.join(real(parent), path.basename(p));
  }
};
const str = (p) => `"${p.replace(/["\\]/g, "\\$&")}"`; // an SBPL string
const anyOf = (paths) => `(require-any ${[...new Set(paths)].map((p) => `(subpath ${str(p)})`).join(" ")})`;

/** Each folder a program on PATH lives in under the home folder: ~/.local/bin → ~/.local, ~/.nvm/…/node/bin → …/node. */
const homeTools = (home, pathVar) =>
  (pathVar ?? "").split(path.delimiter).filter(Boolean).flatMap((d) => [d, real(d)])
    .filter((d) => d.startsWith(home + path.sep))
    .map((d) => (path.basename(d) === "bin" && path.dirname(d) !== home ? path.dirname(d) : d));

/** The profile for one run. engineHome: the engine's data folder (e.g. ~/.codex), which it must read and write. */
export const sandboxProfile = ({ root, engineHome, projectFolder, settingsFile, browserDir, home = os.homedir(), env = process.env }) => {
  const R = real(root);
  const H = real(home);
  // An exception that is the home folder or holds it (e.g. node at ~/bin/node gives "~") would undo the home rules.
  const narrow = (paths) => paths.filter((p) => p && p !== H && !H.startsWith(p + path.sep));
  const node = path.dirname(path.dirname(real(process.execPath))); // …/node for …/node/bin/node
  const readable = narrow([
    R, real(engineHome), projectFolder && real(projectFolder), node, ...homeTools(H, env.PATH),
    ...[".npm", ".npmrc", ".local", ".gitconfig", ".gitignore_global", ".config/git", "Library/Python", "Library/Fonts"].map((p) => path.join(H, p)),
  ]);
  const writable = narrow([R, real(engineHome), path.join(H, ".npm"), real(os.tmpdir()), "/private/tmp", "/private/var/folders", "/dev"]);
  return [
    "(version 1)",
    "(allow default)",
    `(deny file-read-data (require-all (subpath ${str(H)}) (require-not ${anyOf(readable)})))`,
    `(deny file-write* (require-not ${anyOf(writable)}))`,
    `(deny file-write* (subpath ${str(path.join(R, ".git"))}))`,
    `(deny file-write* (require-all (subpath ${str(path.join(R, "out"))}) (regex #"\\.mp4$")))`,
    `(deny file-read* file-write* (literal ${str(real(settingsFile))}) (subpath ${str(real(browserDir))}))`,
  ].join("\n");
};

/** Environment for a sandboxed engine: no secrets except the engine's own login (and no ElevenLabs key: voice goes through the dashboard). */
export const sandboxEnv = (env, keep = []) =>
  Object.fromEntries(Object.entries(env).filter(([k]) => keep.includes(k) || !/KEY|TOKEN|SECRET|PASSWORD|CREDENTIAL/i.test(k)));
