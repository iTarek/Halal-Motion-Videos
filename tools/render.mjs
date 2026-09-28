// Renders a brand's videos to out/<brand>/<video>/<brand>-<video>-<format>.mp4 and masters the audio.
// Usage: npm run render -- <brand> [video] [format] [--frames=0-89]
//   npm run render -- my-app                    every my-app video, every format
//   npm run render -- my-app video01 vertical   one file
//   npm run render -- my-app video01 --frames=0-89   first 3 s only (quick check)
import { renderMedia } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { findCompositions, outDir, parseArgs, ROOT } from "./lib.mjs";

const { pos, flags } = parseArgs(process.argv.slice(2));
const [brand, video, format] = pos;
if (!brand) {
  console.error("Usage: npm run render -- <brand> [video] [format] [--frames=a-b]");
  process.exit(1);
}
const frameRange = typeof flags.frames === "string" ? flags.frames.split("-").map(Number) : undefined;

const { serveUrl, compositions } = await findCompositions({ brand, video, format });
for (const { composition, brand: b, video: v, format: f } of compositions) {
  const dir = outDir(b, v);
  fs.mkdirSync(dir, { recursive: true });
  const output = path.join(dir, `${b}-${v}-${f}${frameRange ? `-f${frameRange.join("-")}` : ""}.mp4`);
  let last = -1;
  await renderMedia({
    serveUrl,
    composition,
    codec: "h264",
    outputLocation: output,
    frameRange: frameRange && frameRange.length === 2 ? [frameRange[0], frameRange[1]] : frameRange?.[0],
    crf: 16,
    pixelFormat: "yuv420p",
    colorSpace: "bt709",
    audioBitrate: "320k",
    imageFormat: "jpeg",
    jpegQuality: 95,
    concurrency: 8,
    overwrite: true,
    onProgress: ({ progress }) => {
      const pct = Math.floor(progress * 10) * 10;
      if (pct !== last) console.log(`${composition.id}: ${(last = pct)}%`);
    },
  });
  execFileSync("sh", [path.join(ROOT, "tools", "master.sh"), output], { stdio: "inherit" });
}
