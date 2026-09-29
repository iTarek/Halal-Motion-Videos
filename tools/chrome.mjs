// Finds a headless-capable Chrome on macOS or Linux, for screenshots (shot.mjs) and review sheets (review.mjs).
// Order: $CHROME_PATH → Remotion's bundled chrome-headless-shell (npx remotion browser ensure) → a system Chrome/Chromium.
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
      else if (/^(chrome-headless-shell|headless_shell)$/.test(d.name)) return p;
    }
  }
  return null;
};

const onPath = (name) => {
  try {
    return execFileSync("which", [name], { encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
};

export const findChrome = () =>
  [
    process.env.CHROME_PATH,
    bundled(),
    // macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    // Linux
    onPath("google-chrome"),
    onPath("google-chrome-stable"),
    onPath("chromium"),
    onPath("chromium-browser"),
    onPath("microsoft-edge"),
  ].find((p) => p && fs.existsSync(p)) ?? null;
