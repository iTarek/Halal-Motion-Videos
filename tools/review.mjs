// Review sheets for the self-critique loop — so Claude (or you) can judge a whole video at a glance.
// Renders frames, then lays them out as labelled sheets:
//   contact-<format>-N.png  a frame every 0.5 s (2 per second), 24 per sheet — pacing, variety, composition
//   phone-<format>-N.png    a frame every 2 s at real phone size (360 px wide) — can you read it on a phone?
//   strip-<format>-<t>.png  12 frames in a row around second t — fast moves, glitches, blur, overlaps
//
// Usage: npm run review -- <brand> <video> [--format=vertical] [--strip=12.5,31] [--out=<dir>]
//   Default output: .director/tmp/<brand>-<video>/review/ (the Director clears it after each run).
import { renderFrames } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { findCompositions, parseArgs, ROOT } from "./lib.mjs";
import { findChrome } from "./chrome.mjs";

const { pos, flags } = parseArgs(process.argv.slice(2));
const [brand, video] = pos;
if (!brand || !video) {
  console.error("Usage: npm run review -- <brand> <video> [--format=vertical] [--strip=12.5,31] [--out=<dir>]");
  process.exit(1);
}
const format = typeof flags.format === "string" ? flags.format : undefined;
const strips = typeof flags.strip === "string" ? flags.strip.split(",").map(Number).filter((n) => n >= 0) : [];
const outDir = path.resolve(ROOT, typeof flags.out === "string" ? flags.out : path.join(".director", "tmp", `${brand}-${video}`, "review"));
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const chrome = findChrome();
if (!chrome) {
  console.error("No headless Chrome found — run `npm run setup`.");
  process.exit(1);
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Lays out images in a labelled grid page and screenshots it. items: [{ file, label }] */
const sheet = (items, { cols, cellW, cellH, title }, out) => {
  const gap = 8, pad = 16, labelH = 26, titleH = 40;
  const rows = Math.ceil(items.length / cols);
  const W = pad * 2 + cols * cellW + (cols - 1) * gap;
  const H = pad * 2 + titleH + rows * (cellH + labelH) + (rows - 1) * gap;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#141210;color:#f3ede4;font:15px Helvetica,Arial,sans-serif}
    .t{padding:${pad}px ${pad}px 0;height:${titleH}px;font-size:18px;font-weight:bold}
    .g{display:grid;grid-template-columns:repeat(${cols},${cellW}px);gap:${gap}px;padding:0 ${pad}px ${pad}px}
    .c img{display:block;width:${cellW}px;height:${cellH}px;object-fit:contain;background:#000}
    .c div{height:${labelH}px;line-height:${labelH}px;color:#e0a860;font-weight:bold}
  </style></head><body><div class="t">${esc(title)}</div><div class="g">${items
    .map((it) => `<div class="c"><img src="${esc(pathToFileURL(it.file).href)}"><div>${esc(it.label)}</div></div>`)
    .join("")}</div></body></html>`;
  const htmlFile = out.replace(/\.png$/, ".html");
  fs.writeFileSync(htmlFile, html);
  execFileSync(chrome, [
    "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--allow-file-access-from-files",
    `--window-size=${W},${H}`, `--screenshot=${out}`, pathToFileURL(htmlFile).href,
  ], { stdio: "ignore" });
  fs.rmSync(htmlFile);
  return out;
};

const chunk = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));
const secs = (frame, fps) => `${(frame / fps).toFixed(1)} s`;

const { serveUrl, compositions } = await findCompositions({ brand, video, format });
const made = [];
for (const { composition: comp, format: f } of compositions) {
  const { fps, durationInFrames: total, width, height } = comp;
  const portrait = height > width;
  const scale = 360 / width; // phone size: 360 px wide
  const cellW = 360, cellH = Math.round(height * scale);

  // frames every 0.5 s, plus the last one
  const every = Math.max(1, Math.round(fps / 2));
  const sampled = [...new Set([...Array.from({ length: Math.ceil(total / every) }, (_, i) => i * every), total - 1])].filter((x) => x < total);
  const stripFrames = strips.flatMap((t) => Array.from({ length: 12 }, (_, i) => Math.round(t * fps) - 5 + i).filter((x) => x >= 0 && x < total));
  const frames = [...new Set([...sampled, ...stripFrames])].sort((a, b) => a - b);

  const frameDir = path.join(outDir, `frames-${f}`);
  fs.mkdirSync(frameDir, { recursive: true });
  process.stdout.write(`${comp.id}: rendering ${frames.length} frames at phone size… `);
  await renderFrames({
    serveUrl, composition: comp, inputProps: comp.props, frames, outputDir: frameDir,
    imageFormat: "jpeg", jpegQuality: 85, scale, concurrency: 4,
    imageSequencePattern: "f-[frame].[ext]", onStart: () => {}, onFrameUpdate: () => {},
  });
  console.log("done");
  const fileOf = (fr) => {
    const hit = fs.readdirSync(frameDir).find((n) => Number(n.match(/(\d+)/)?.[1]) === fr);
    return hit ? path.join(frameDir, hit) : null;
  };

  // contact sheets: 24 per page, small
  const thumbW = portrait ? 180 : 300;
  const thumbH = Math.round(thumbW * height / width);
  chunk(sampled, 24).forEach((group, i, all) => {
    made.push(sheet(group.map((fr) => ({ file: fileOf(fr), label: secs(fr, fps) })),
      { cols: portrait ? 8 : 4, cellW: thumbW, cellH: thumbH, title: `${comp.id} — contact sheet ${i + 1}/${all.length} (a frame every 0.5 s)` },
      path.join(outDir, `contact-${f}-${i + 1}.png`)));
  });

  // phone sheets: every 2 s, real phone size
  const phone = sampled.filter((fr) => fr % (every * 4) === 0);
  chunk(phone, portrait ? 4 : 6).forEach((group, i, all) => {
    made.push(sheet(group.map((fr) => ({ file: fileOf(fr), label: secs(fr, fps) })),
      { cols: portrait ? 4 : 3, cellW, cellH, title: `${comp.id} — phone size ${i + 1}/${all.length} (360 px wide, every 2 s): can you read everything?` },
      path.join(outDir, `phone-${f}-${i + 1}.png`)));
  });

  // strips: 12 consecutive frames around each requested second
  for (const t of strips) {
    const group = Array.from({ length: 12 }, (_, i) => Math.round(t * fps) - 5 + i).filter((x) => x >= 0 && x < total);
    made.push(sheet(group.map((fr) => ({ file: fileOf(fr), label: `#${fr} · ${(fr / fps).toFixed(2)} s` })),
      { cols: 6, cellW: portrait ? 180 : 300, cellH: portrait ? 320 : 169, title: `${comp.id} — 12 frames around ${t} s` },
      path.join(outDir, `strip-${f}-${t}.png`)));
  }
}

console.log(`\nReview sheets (${made.length}):`);
for (const m of made) console.log(`  ${m.startsWith(ROOT + path.sep) ? path.relative(ROOT, m) : m}`);
console.log(`
Now be a harsh motion director, not a proud author. Read every sheet, then score each 1–10:
  • hook — does the first 2 s grab you?
  • readability — can you read every word on the phone sheets?
  • motion quality — springs and eased moves, nothing robotic or floaty (check strips around fast moves)
  • variety — something new every 2–4 s; no two scenes with the same layout
  • composition — clear focal point, nothing clipped, overlapping or crowded
  • data accuracy — every claim is real; illustrative numbers carry "Example data"
  • sound sync — each cut, reveal and tap has its cue on the right frame (compare Soundtrack.tsx with the timeline)
List the 3 biggest problems with timestamps. Fix them, then re-run (add --strip=<s> around fast moves).
Repeat until every score is 8 or more.`);
