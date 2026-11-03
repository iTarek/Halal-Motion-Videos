// Shared helpers for the render/stills tools.
import { bundle } from "@remotion/bundler";
import { getCompositions } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { remotionChrome } from "./chrome.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Remotion's browser override, if any (see remotionChrome); undefined lets Remotion use or download its own. */
export const browserExecutable = () => remotionChrome() || undefined;

/** Splits argv into positional args and --key=value flags. */
export const parseArgs = (argv) => {
  const pos = [];
  const flags = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) flags[m[1]] = m[2] ?? true;
    else pos.push(a);
  }
  return { pos, flags };
};

/** Deletes a folder when this process ends, stopped or not. */
export const removeOnExit = (dir) => {
  process.once("exit", () => {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {} // still in use on Windows: the system clears its temp folder in the end
  });
  // a stopped render ends on a signal, which skips "exit" unless it's handled
  for (const [signal, code] of [["SIGINT", 130], ["SIGTERM", 143]]) process.once(signal, () => process.exit(code));
};

/**
 * Ends a tool that rendered. After a crash Remotion starts a new Chrome, but at the end closes only the first one: the new
 * one would keep this process open for good, and with it a dashboard job and the queue behind it. Exiting takes it along.
 */
export const quit = async (code) => {
  if (code !== undefined) process.exitCode = code;
  await Promise.all([process.stdout, process.stderr].map((s) => new Promise((done) => s.write("", done)))); // pipes on Windows are async
  process.exit();
};

/** Bundles once and returns the compositions matching brand / video / format (each optional). */
export const findCompositions = async ({ brand, video, format }) => {
  const serveUrl = await bundle({ entryPoint: path.join(ROOT, "src", "index.ts") });
  removeOnExit(serveUrl); // about 500 MB in the temp folder, and every run makes a new one
  const browser = browserExecutable();
  const all = await getCompositions(serveUrl, browser ? { browserExecutable: browser } : {});
  const meta = (c) => c.props ?? c.defaultProps ?? {};
  const hits = all.filter((c) => {
    const m = meta(c);
    return (!brand || m.brand === brand) && (!video || m.video === video) && (!format || m.format === format);
  });
  if (!hits.length) {
    const known = [...new Set(all.map((c) => `${meta(c).brand}/${meta(c).video}`))].join(", ");
    throw new Error(`No composition for ${[brand, video, format].filter(Boolean).join("/")}. Known videos: ${known}`);
  }
  return { serveUrl, compositions: hits.map((c) => ({ composition: c, ...meta(c) })) };
};

/** out/<brand>/<video>/ */
export const outDir = (brand, video) => path.join(ROOT, "out", brand, video);
