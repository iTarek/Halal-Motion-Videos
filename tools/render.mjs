// Renders a brand's videos to out/<brand>/<video>/<brand>-<video>-<format>.mp4 and masters the audio.
// Usage: npm run render -- <brand> [video] [format] [--frames=0-89] [--blur[=8]]
//   npm run render -- my-app                    every my-app video, every format
//   npm run render -- my-app video01 vertical   one file
//   npm run render -- my-app video01 --frames=0-89   first 3 s only (quick check)
//   npm run render -- my-app video01 --blur     "film look": motion blur from 8 sub-frames per frame (~8× slower)
import { renderMedia } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { findCompositions, outDir, parseArgs, ROOT } from "./lib.mjs";
import { describe, fixAudio } from "./audiofix.mjs";

const { pos, flags } = parseArgs(process.argv.slice(2));
const [brand, video, format] = pos;
if (!brand) {
  console.error("Usage: npm run render -- <brand> [video] [format] [--frames=a-b] [--blur[=8]]");
  process.exit(1);
}
const frameRange = typeof flags.frames === "string" ? flags.frames.split("-").map(Number) : undefined;
// Motion blur: the film is rendered `blur` times, each shifted by a fraction of a frame (180° shutter), and ffmpeg
// averages them. 8 is smooth; 4 is faster but can leave ghost copies on fast moves.
const blur = flags.blur ? Math.max(2, Math.min(16, Number(flags.blur === true ? 8 : flags.blur) || 8)) : 0;

// Pre-flight: audio Remotion's ffmpeg can't decode (e.g. Apple Lossless) would fail the render — convert it first.
for (const c of fixAudio(path.join(ROOT, "public", brand), path.join(ROOT, "public", "_shared"))) console.log(describe(c));

const { serveUrl, compositions } = await findCompositions({ brand, video, format });
for (const { composition, brand: b, video: v, format: f } of compositions) {
  const dir = outDir(b, v);
  fs.mkdirSync(dir, { recursive: true });
  const name = `${b}-${v}-${f}${blur ? "-blur" : ""}${frameRange ? `-f${frameRange.join("-")}` : ""}.mp4`;
  const final = path.join(dir, name);
  // Work on a hidden file and only reveal it when it's finished, so nobody opens a half-written video.
  const output = path.join(dir, `.${name}.rendering.mp4`);
  const finish = () => {
    fs.renameSync(output, final);
    console.log(`saved ${path.relative(ROOT, final)}`);
  };
  let last = -1;
  const progress = (label) => ({ progress }) => {
    const pct = Math.floor(progress * 10) * 10;
    if (pct !== last) console.log(`${label}: ${(last = pct)}%`);
  };
  const common = {
    serveUrl, composition, crf: 16, pixelFormat: "yuv420p", colorSpace: "bt709", imageFormat: "jpeg", jpegQuality: 95,
    concurrency: 8, overwrite: true,
    frameRange: frameRange && frameRange.length === 2 ? [frameRange[0], frameRange[1]] : frameRange?.[0],
  };
  if (blur) {
    console.log(`${composition.id}: motion blur — ${blur} sub-frame passes, then blending (this takes a while)`);
    const tmp = path.join(dir, `.blur-${f}`);
    fs.rmSync(tmp, { recursive: true, force: true });
    fs.mkdirSync(tmp, { recursive: true });
    const subs = [];
    for (let i = 0; i < blur; i++) {
      const sub = path.join(tmp, `sub-${i}.mp4`);
      last = -1;
      await renderMedia({ ...common, codec: "h264", crf: 8, muted: true, outputLocation: sub,
        inputProps: { ...composition.props, subframe: (i / blur) * 0.5 }, onProgress: progress(`${composition.id} pass ${i + 1}/${blur}`) });
      subs.push(sub);
    }
    const audio = path.join(tmp, "audio.wav");
    await renderMedia({ serveUrl, composition, codec: "wav", outputLocation: audio, inputProps: composition.props,
      overwrite: true, concurrency: 8, frameRange: common.frameRange });
    console.log(`${composition.id}: blending ${blur} passes…`);
    execFileSync("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y",
      ...subs.flatMap((s) => ["-i", s]), "-i", audio,
      "-filter_complex", `${subs.map((_, i) => `[${i}:v]`).join("")}mix=inputs=${blur}[v]`,
      "-map", "[v]", "-map", `${blur}:a`,
      "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p",
      "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
      "-c:a", "aac", "-b:a", "320k", "-shortest", "-movflags", "+faststart", output,
    ], { stdio: "inherit" });
    fs.rmSync(tmp, { recursive: true, force: true });
    execFileSync("sh", [path.join(ROOT, "tools", "master.sh"), output], { stdio: "inherit" });
    finish();
    continue;
  }
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
  finish();
}
