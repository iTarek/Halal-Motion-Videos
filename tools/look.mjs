// Shows what's in a video file: labelled sheets of its frames, so Claude (or you) can see a clip without playing it —
// where the action is, where to trim it, and what's on screen (a real name, someone else's logo).
// Usage: npm run look -- <clip under public/<brand>/> [--every=<s>] [--from=<s>] [--to=<s>] [--json]
//   npm run look -- public/my-app/video01/video/demo.mp4                             a frame every second (fewer on a long clip)
//   npm run look -- public/my-app/brand/video/tour.mov --from=12 --to=16 --every=0.5   a close look: few frames, drawn large
// Output: .director/tmp/<brand>-<video|brand>/look/<clip>-N.png (the Director clears it after each run).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parseArgs, removeOnExit, ROOT } from "./lib.mjs";
import { chrome, sheet } from "./sheets.mjs";

const { pos, flags } = parseArgs(process.argv.slice(2));
const JSON_OUT = !!flags.json;
const fail = (message) => {
  if (JSON_OUT) console.log(JSON.stringify({ ok: false, error: message }));
  else console.error(message);
  process.exit(1);
};
if (pos.length !== 1) fail("Usage: npm run look -- <clip under public/<brand>/> [--every=<s>] [--from=<s>] [--to=<s>] [--json]");

// Only a brand's own files, wherever a link in public/ may point: this runs with more rights than the Director has.
// They're in public/<brand>/brand/ or public/<brand>/<video>/, which also names the folder the sheets go to.
const KINDS = [".mp4", ".mov", ".m4v", ".webm", ".mkv", ".gif"];
const NAME = /^[a-z][a-z0-9-]*$/;
const PUBLIC = fs.realpathSync(path.join(ROOT, "public"));
const asked = path.resolve(ROOT, pos[0]);
if (!fs.existsSync(asked)) fail(`Not found: ${pos[0]}`);
const clip = fs.realpathSync(asked);
const [brand, part, ...inside] = path.relative(PUBLIC, clip).split(path.sep);
if (!clip.startsWith(PUBLIC + path.sep) || !NAME.test(brand) || !NAME.test(part ?? "") || !inside.length || !fs.statSync(clip).isFile())
  fail("Give a video file inside public/<brand>/brand/ or public/<brand>/<video>/, e.g. public/my-app/video01/video/demo.mp4.");
if (!KINDS.includes(path.extname(clip).toLowerCase())) fail(`That isn't a video file this can open (${KINDS.join(", ")}).`);
if (!chrome) fail("No headless Chrome found — run `npm run setup`.");

const num = (flag) => {
  if (flags[flag] === undefined) return undefined;
  const n = Number(flags[flag]);
  if (flags[flag] === true || !Number.isFinite(n) || n < 0) fail(`--${flag} is a number of seconds, e.g. --${flag}=2.5.`);
  return n;
};

/**
 * ffmpeg and ffprobe open the clip as a plain video file and nothing else: a playlist or a script dressed up as one
 * could have them read other files on this machine into the frames.
 */
const AS_VIDEO = ["-format_whitelist", "mov,matroska,gif"];
const run = (bin, args, timeout) => {
  try {
    return execFileSync(bin, args, { encoding: "utf8", timeout, stdio: ["ignore", "pipe", "pipe"], windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
  } catch (e) {
    if (e.code === "ENOENT") fail(`${bin} isn't installed: \`npm run doctor\` says how to get it.`);
    if (e.code === "ETIMEDOUT") fail(`${path.relative(ROOT, clip)} took too long to read. Look at part of it: --from=<s> --to=<s>.`);
    fail(`Couldn't open ${path.relative(ROOT, clip)} as a video: ${String(e.stderr || e.message).trim().split("\n").at(-1).replaceAll(clip, path.basename(clip))}`);
  }
};

const info = JSON.parse(run("ffprobe", ["-v", "error", ...AS_VIDEO, "-show_entries", "stream=codec_type,width,height,sample_aspect_ratio,avg_frame_rate:stream_side_data=rotation:format=duration,start_time", "-of", "json", clip], 30000));
const picture = info.streams?.find((s) => s.codec_type === "video");
if (!picture) fail(`${path.relative(ROOT, clip)} has no picture to look at.`);
const seconds = Number(info.format?.duration) > 0 ? Number(info.format.duration) : null; // null: a browser's recording doesn't say
// The shape it plays in, which isn't always the shape it's stored in: a phone clip can be stored sideways, or as wide
// pixels that play back narrow (a 1280×720 file that's a 9:16 film).
const [pixelW, pixelH] = String(picture.sample_aspect_ratio ?? "").split(":").map(Number);
const stored = [pixelW > 0 && pixelH > 0 ? Math.round((picture.width * pixelW) / pixelH) : picture.width, picture.height];
const turned = Math.abs(Number(picture.side_data_list?.find((d) => d.rotation !== undefined)?.rotation ?? 0)) % 180 === 90;
const [width, height] = turned ? stored.reverse() : stored;
const [fpsUp, fpsDown] = String(picture.avg_frame_rate).split("/").map(Number);
const fps = fpsDown ? Math.round((fpsUp / fpsDown) * 100) / 100 : null;

const from = num("from") ?? 0;
const until = num("to");
if (seconds === null && until === undefined) fail(`${path.relative(ROOT, clip)} doesn't say how long it is. Say how far to look: --to=<s>.`);
const to = Math.min(until ?? seconds, seconds ?? Infinity);
if (from >= to) fail(`--from must come before --to${seconds === null ? "" : `, inside the clip (it's ${seconds.toFixed(1)} s long)`}.`);
// A frame a second, as long as that's at most 4 sheets: a long clip gets fewer, and says so.
const MOST = 96;
const asked_every = num("every");
if (asked_every === 0) fail("--every is a number of seconds above 0, e.g. --every=0.5.");
const every = asked_every ?? Math.max(1, Math.ceil(((to - from) / MOST) * 2) / 2);
const count = Math.ceil((to - from) / every - 1e-6); // from, from + every… up to, not at, --to
if (count > MOST * 2) fail(`That's ${count} frames. Look at less of it (--from, --to) or less often (--every=${Math.ceil(((to - from) / MOST) * 2) / 2}).`);

/**
 * Where reading starts, in seconds into the clip: the last key frame shown at or before --from. A screen recording stores
 * a frame only when the picture changes, so the one on screen at --from can be seconds older, and a seek to --from itself
 * can land on a key frame that's only shown later. 0 (the clip's start) when its frames can't be listed.
 */
const readFrom = () => {
  if (!from) return 0;
  try {
    const begins = Number(info.format?.start_time) || 0;
    const packets = execFileSync("ffprobe", ["-v", "error", ...AS_VIDEO, "-select_streams", "v:0", "-show_entries", "packet=pts_time,dts_time,flags", "-of", "csv=p=0", clip],
      { encoding: "utf8", timeout: 30000, stdio: ["ignore", "pipe", "ignore"], windowsHide: true, maxBuffer: 64 * 1024 * 1024 });
    let start = 0;
    for (const line of packets.split("\n")) {
      const [shown, decoded, flags] = line.split(",");
      if (flags?.startsWith("K") && shown - begins <= from && decoded - begins > start) start = decoded - begins; // a seek goes by decoding time
    }
    return start;
  } catch {
    return 0;
  }
};
const start = readFrom();

const name = path.basename(clip, path.extname(clip)).replace(/[^\w.-]+/g, "-");
const outDir = path.join(ROOT, ".director", "tmp", `${brand}-${part}`, "look");
const frameDir = path.join(outDir, `frames-${name}`);
// The Director can write in .director/tmp/: a link left there must not send the sheets to another folder.
const elsewhere = (dir) => {
  try {
    fs.mkdirSync(dir, { recursive: true });
    return fs.realpathSync(dir) !== path.join(fs.realpathSync(ROOT), path.relative(ROOT, dir));
  } catch {
    return true; // a file, or a link to nothing, in its place
  }
};
if ([path.dirname(outDir), outDir].some(elsewhere)) fail(`${path.relative(ROOT, outDir)} isn't a folder of its own: it, or a folder above it, is a link, or a file is in its place. Remove that, then look again.`);
fs.rmSync(frameDir, { recursive: true, force: true });
fs.mkdirSync(frameDir);
removeOnExit(frameDir);

// Few frames are drawn large, to read what's on the screen; many are drawn small, to see the whole clip at once.
const portrait = height > width;
const close = count <= 8;
const cellW = close ? (portrait ? 360 : 640) : portrait ? 180 : 300;
// The clip's own shape, within reason: a sliver of a picture still gets a cell that shows, on a sheet that fits.
const cellH = Math.min(cellW * 3, Math.max(Math.round(cellW / 4), Math.round((cellW * height) / width)));
const cols = close ? (portrait ? 4 : 2) : portrait ? 8 : 4;
const fit = Math.min((cellW * 2) / width, (cellH * 2) / height);
run("ffmpeg", ["-nostdin", "-v", "error", ...AS_VIDEO, "-noaccurate_seek", "-ss", start.toFixed(6), "-i", clip, "-map", "0:v:0",
  // What's on screen at each moment (from, from + every…): the last frame at or before it. Time is counted from --from,
  // and of the frames before it, read since the key frame, only the last is kept: it's the one on screen at --from.
  "-vf", `setpts=PTS-${(from - start).toFixed(6)}/TB,fps=1/${every}:start_time=0:round=up,scale=${Math.max(2, Math.round(width * fit))}:${Math.max(2, Math.round(height * fit))},setsar=1`,
  "-frames:v", String(count), "-q:v", "4", path.join(frameDir, "f-%04d.jpg")], 180000);
// Enough decimals to tell the moments apart: 3.0 s, 3.25 s.
const places = [1, 2].find((d) => [from, every].every((n) => Math.abs(n * 10 ** d - Math.round(n * 10 ** d)) < 1e-6)) ?? 3;
const frames = fs.readdirSync(frameDir).sort().map((f, i) => ({ file: path.join(frameDir, f), label: `${(from + i * every).toFixed(places)} s` }));
if (!frames.length) fail(`No frame could be read from ${path.relative(ROOT, clip)}.`);

// This clip's last sheets go now, and only those: a run that failed above left them to look at.
for (const n of fs.readdirSync(outDir)) if (n.startsWith(`${name}-`) && /^\d+\.png$/.test(n.slice(name.length + 1))) fs.rmSync(path.join(outDir, n));
const sheets = [];
try {
  for (let i = 0; i < frames.length; i += 24)
    sheets.push(sheet(frames.slice(i, i + 24), { cols, cellW, cellH, title: `${path.relative(PUBLIC, clip)} — ${from.toFixed(places)}–${to.toFixed(places)} s${seconds === null ? "" : ` of ${seconds.toFixed(1)} s`}, a frame every ${every} s` },
      path.join(outDir, `${name}-${i / 24 + 1}.png`)));
} catch (e) {
  fail(`Chrome couldn't draw the sheet (${e.code === "ETIMEDOUT" ? "it took too long" : String(e.message).split("\n")[0]}). Try again, or \`npm run doctor\`.`);
}

const result = {
  ok: true, clip, seconds: seconds === null ? null : Math.round(seconds * 100) / 100, width, height, fps, sound: info.streams.some((s) => s.codec_type === "audio"),
  from, to: Math.round(to * 100) / 100, every, frames: frames.length, sheets,
};
if (JSON_OUT) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`${path.relative(ROOT, clip)}: ${seconds === null ? "length not stated" : `${result.seconds} s`}, ${width}×${height}${fps ? `, ${fps} fps` : ""}, ${result.sound ? "with sound" : "no sound"}`);
  console.log(`${frames.length} frames, one every ${every} s${asked_every === undefined && every > 1 ? " (a long clip: fewer than one a second)" : ""}:`);
  for (const s of sheets) console.log(`  ${path.relative(ROOT, s)}`);
  console.log(`Read ${sheets.length > 1 ? "them" : "it"}. For a closer look at a moment: --from=<s> --to=<s> --every=0.5 (8 frames or fewer are drawn large).`);
}
