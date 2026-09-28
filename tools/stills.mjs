// Renders chosen frames to out/<brand>/<video>/stills/<format>-<frame>.jpg for inspection.
// Usage: npm run stills -- <brand> <video> <frame> [frame ...] [--format=vertical] [--dir=<folder>]
//   --dir writes somewhere else instead (the Director's self-check uses .director/tmp/, deleted after each run).
import { renderStill } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
import { findCompositions, outDir, parseArgs, ROOT } from "./lib.mjs";

const { pos, flags } = parseArgs(process.argv.slice(2));
const [brand, video, ...framesArg] = pos;
if (!brand || !video) {
  console.error("Usage: npm run stills -- <brand> <video> <frame> [frame ...] [--format=vertical]");
  process.exit(1);
}
const frames = framesArg.length ? framesArg.map(Number) : [0];
const format = typeof flags.format === "string" ? flags.format : undefined;

const { serveUrl, compositions } = await findCompositions({ brand, video, format });
for (const { composition, brand: b, video: v, format: f } of compositions) {
  const dir = typeof flags.dir === "string" ? path.resolve(ROOT, flags.dir) : path.join(outDir(b, v), "stills");
  fs.mkdirSync(dir, { recursive: true });
  for (const frame of frames) {
    const output = path.join(dir, `${f}-${String(frame).padStart(3, "0")}.jpg`);
    await renderStill({ serveUrl, composition, frame, output, imageFormat: "jpeg", jpegQuality: 85 });
    console.log(output);
  }
}
