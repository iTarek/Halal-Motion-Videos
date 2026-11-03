// Finds a headless-capable Chrome on Windows, macOS or Linux, for screenshots (shot.mjs) and review sheets (review.mjs).
// Order: $CHROME_PATH → $REMOTION_CHROME_BIN → Remotion's bundled chrome-headless-shell (npx remotion browser ensure)
// → a system Chrome/Chromium/Edge. Remotion itself (renders, stills, review frames) only gets remotionChrome() below.
// Also what a render may ask of it (renderBudget) and what to say when it crashes (crashAdvice).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT } from "./settings.mjs";

/** Remotion downloads it under node_modules/.remotion/chrome-headless-shell/<platform>/…; the folder name varies by OS/CPU. */
const bundled = () => {
  const base = path.join(ROOT, "node_modules", ".remotion", "chrome-headless-shell");
  if (!fs.existsSync(base)) return null;
  const stack = [base];
  while (stack.length) {
    const dir = stack.pop();
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, d.name);
      if (d.isDirectory()) stack.push(p);
      else if (/^(chrome-headless-shell|headless_shell)(\.exe)?$/.test(d.name)) return p;
    }
  }
  return null;
};

/**
 * Extra flags for the Chrome we start ourselves (review sheets, screenshots). On Linux, servers and containers often run
 * as root (Chrome's sandbox refuses) and have a tiny /dev/shm (Chrome crashes). Inside the Director's macOS sandbox
 * (tools/dashboard/sandbox.mjs; HMV_TICKET is set) Chrome can't start a sandbox of its own, as macOS allows no nesting.
 * Remotion already adds --no-sandbox for renders.
 */
export const CHROME_ARGS = [
  ...(process.platform === "linux" ? ["--no-sandbox", "--disable-dev-shm-usage"] : []),
  ...(process.platform === "darwin" && process.env.HMV_TICKET ? ["--no-sandbox"] : []),
];

const GB = 1024 ** 3;

/**
 * What a render may use, so a long one isn't killed for running out of memory. On real films each extra Chrome tab took
 * about 0.35 GB, and 4 tabs were only 1.5–1.8× as fast as 1, so 1 GB a tab costs little speed and leaves room for bigger
 * images. Video frames get a limit too: Remotion's own is half the free memory, on top of the tabs. macOS reports only a
 * sliver as free (0.1 to 2.5 GB on a 16 GB Mac) and swaps rather than kills, so half its RAM stands in. Asking for a
 * number of tabs (concurrency) overrides the memory, not the cores: Remotion refuses more than those.
 */
export const renderBudget = ({ concurrency, cores = os.availableParallelism(), room = process.platform === "darwin" ? os.totalmem() / 2 : process.availableMemory() } = {}) => {
  const videoCache = Math.round(Math.max(GB / 4, Math.min(GB, room / 4)));
  const fits = concurrency ?? Math.min(8, Math.floor((room - videoCache) / GB));
  return { tabs: Math.max(1, Math.min(fits, cores)), videoCache };
};

/**
 * How a tab, Chrome or Remotion's video helper dying mid-render shows up: on a busy machine, that means out of memory. A
 * killed helper says "with signal", or on Windows, which has no signals, a ten-digit crash code. Any other exit of the helper
 * is a real error (a missing library, say), and fewer tabs wouldn't help.
 */
const CRASHED = /Target closed|Page crashed|Session closed|has disconnected|Compositor (quit|exited) with signal|Compositor exited with code \d{10}/i;

/** A plain next step for a render that crashed, or null for any other error. args: the render's own arguments. */
export const crashAdvice = (error, tabs, args) => {
  const message = String(error?.message ?? "");
  if (!CRASHED.test(message)) return null;
  const what = `The render crashed (${message.split("\n")[0]})`;
  if (tabs === 1) return `${what}, even with 1 tab. This machine is most likely out of memory for this video: close other apps and render again.`;
  const again = [...args.filter((a) => !a.startsWith("--concurrency")), `--concurrency=${Math.floor(tabs / 2)}`].join(" ");
  return `${what}, most likely out of memory with ${tabs} tabs.\nClose other apps, or render with fewer tabs:\nnpm run render -- ${again}`;
};

const onPath = (name) => {
  try {
    return execFileSync(process.platform === "win32" ? "where.exe" : "which", [name], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim().split(/\r?\n/)[0] || null;
  } catch {
    return null;
  }
};

/**
 * The browser for Remotion: $REMOTION_CHROME_BIN or its own chrome-headless-shell, never a system Chrome (Remotion starts
 * it in old headless mode, which regular Chrome dropped). null lets Remotion download its own.
 */
const exists = (p) => !!p && fs.existsSync(p);
export const remotionChrome = () => [process.env.REMOTION_CHROME_BIN, bundled()].find(exists) ?? null;

/** System browsers, looked at only when nothing above is there (the PATH lookups spawn a process each). */
const systemChrome = () => {
  if (process.platform === "win32")
    return [
      path.join(process.env.PROGRAMFILES || "C:\\Program Files", "Google/Chrome/Application/chrome.exe"),
      path.join(process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)", "Microsoft/Edge/Application/msedge.exe"),
      process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
    ].find(exists);
  const app = process.platform === "darwin" && [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ].find(exists);
  if (app) return app;
  for (const name of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "microsoft-edge"]) {
    const p = onPath(name);
    if (exists(p)) return p;
  }
};

export const findChrome = () => [process.env.CHROME_PATH, process.env.REMOTION_CHROME_BIN].find(exists) ?? bundled() ?? systemChrome() ?? null;
