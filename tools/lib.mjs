// Shared helpers for the render/stills tools.
import { bundle } from "@remotion/bundler";
import { getCompositions } from "@remotion/renderer";
import os from "node:os";
import path from "node:path";

/**
 * Frames rendered in parallel: up to 8, never more than this machine's cores (Remotion refuses more — e.g. a 4-core
 * Linux server). availableParallelism() also respects CPU limits set for containers.
 */
export const CONCURRENCY = Math.max(1, Math.min(8, os.availableParallelism()));

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

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

/** Bundles once and returns the compositions matching brand / video / format (each optional). */
export const findCompositions = async ({ brand, video, format }) => {
  const serveUrl = await bundle({ entryPoint: path.join(ROOT, "src", "index.ts") });
  const all = await getCompositions(serveUrl);
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
