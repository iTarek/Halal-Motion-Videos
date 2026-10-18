// Finds a headless-capable Chrome on Windows, macOS or Linux, for screenshots (shot.mjs) and review sheets (review.mjs).
// Order: $CHROME_PATH → $REMOTION_CHROME_BIN → Remotion's bundled chrome-headless-shell (npx remotion browser ensure)
// → a system Chrome/Chromium/Edge. Remotion itself (renders, stills, review frames) only gets remotionChrome() below.
import fs from "node:fs";
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
