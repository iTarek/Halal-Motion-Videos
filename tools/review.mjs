// Review sheets for the self-critique loop — so Claude (or you) can judge a whole video at a glance.
// Renders frames, then lays them out as labelled sheets:
//   contact-<format>-N.png  a frame every 0.5 s (2 per second), 24 per sheet — pacing, variety, composition
//   phone-<format>-N.png    a frame every 2 s at real phone size (360 px wide) — can you read it on a phone? Red
//                           marks the unsafe edges: on 9:16, where TikTok, Reels and Shorts lay their UI over the video
//   strip-<format>-<t>.png  12 frames in a row around every scene change (the video's `cuts`) and every --strip
//                           second t — muddy crossfades, fast moves, glitches, blur, overlaps
//   wave.png                the soundtrack as a waveform, with every scene change marked, plus its loudness — does
//                           each hit land on its moment? (it's the same in every format)
//
// Usage: npm run review -- <brand> <video> [--format=vertical] [--strip=12.5,31] [--safe-area=on|off] [--out=<dir>]
//   Default output: .director/tmp/<brand>-<video>/review/ (the Director clears it after each run).
import { renderFrames, renderMedia } from "@remotion/renderer";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { browserExecutable, CONCURRENCY, findCompositions, parseArgs, ROOT } from "./lib.mjs";
import { CHROME_ARGS, findChrome } from "./chrome.mjs";

const { pos, flags } = parseArgs(process.argv.slice(2));
const [brand, video] = pos;
if (!brand || !video) {
  console.error("Usage: npm run review -- <brand> <video> [--format=vertical] [--strip=12.5,31] [--safe-area=on|off] [--out=<dir>]");
  process.exit(1);
}
const format = typeof flags.format === "string" ? flags.format : undefined;
// The video's Safe area switch (dashboard → Video settings, or `npm run video -- set … --safe-area=on|off`): on unless
// switched off. --safe-area=on|off overrides it for this run.
const savedSafeArea = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, ".director", brand, `${video}.json`), "utf8")).safeArea !== false;
  } catch {
    return true;
  }
})();
const safeArea = flags["safe-area"] === undefined ? savedSafeArea : flags["safe-area"] !== "off";
const strips = typeof flags.strip === "string" ? flags.strip.split(",").map(Number).filter((n) => n >= 0) : [];
const outDir = path.resolve(ROOT, typeof flags.out === "string" ? flags.out : path.join(".director", "tmp", `${brand}-${video}`, "review"));
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const chrome = findChrome(); // lays out the sheets
if (!chrome) {
  console.error("No headless Chrome found — run `npm run setup`.");
  process.exit(1);
}
const browser = browserExecutable(); // Remotion's, for the frames

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const PAGE_CSS = "body{margin:0;background:#141210;color:#f3ede4;font:15px Helvetica,Arial,sans-serif}";

/** Screenshots an HTML page of W×H into out (a PNG). */
const shoot = (html, W, H, out) => {
  const htmlFile = out.replace(/\.png$/, ".html");
  fs.writeFileSync(htmlFile, html);
  execFileSync(chrome, [
    "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--allow-file-access-from-files", ...CHROME_ARGS,
    `--window-size=${W},${H}`, `--screenshot=${out}`, pathToFileURL(htmlFile).href,
  ], { stdio: "ignore", timeout: 120000 }); // a hung Chrome must not freeze the critique loop
  fs.rmSync(htmlFile);
  return out;
};

/**
 * The unsafe edges of a frame, in % of its size. 9:16 is posted to TikTok, Reels and Shorts, which cover the top
 * (header), the bottom (caption, username, music) and the right (like, comment, share): key text stays out of
 * those. Other shapes keep a 5% margin.
 */
const unsafeEdges = (width, height) =>
  height / width > 1.7 ? { top: 12, bottom: 22, left: 6, right: 12 } : { top: 5, bottom: 5, left: 5, right: 5 };

/** Lays out images in a labelled grid page and screenshots it. items: [{ file, label }]. zone: unsafeEdges() to tint. */
const sheet = (items, { cols, cellW, cellH, title, zone }, out) => {
  const gap = 8, pad = 16, labelH = 26, titleH = 40;
  const rows = Math.ceil(items.length / cols);
  const W = pad * 2 + cols * cellW + (cols - 1) * gap;
  const H = pad * 2 + titleH + rows * (cellH + labelH) + (rows - 1) * gap;
  const tint = zone
    ? `<i style="top:0;left:0;right:0;height:${zone.top}%"></i><i style="bottom:0;left:0;right:0;height:${zone.bottom}%"></i>` +
      `<i style="top:${zone.top}%;bottom:${zone.bottom}%;left:0;width:${zone.left}%"></i><i style="top:${zone.top}%;bottom:${zone.bottom}%;right:0;width:${zone.right}%"></i>`
    : "";
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${PAGE_CSS}
    .t{padding:${pad}px ${pad}px 0;height:${titleH}px;font-size:18px;font-weight:bold}
    .g{display:grid;grid-template-columns:repeat(${cols},${cellW}px);gap:${gap}px;padding:0 ${pad}px ${pad}px}
    .f{position:relative;width:${cellW}px;height:${cellH}px}
    .f img{display:block;width:100%;height:100%;object-fit:contain;background:#000}
    .f i{position:absolute;background:rgba(255,40,40,.28)}
    .c>div:last-child{height:${labelH}px;line-height:${labelH}px;color:#e0a860;font-weight:bold}
  </style></head><body><div class="t">${esc(title)}</div><div class="g">${items
    .map((it) => `<div class="c"><div class="f"><img src="${esc(pathToFileURL(it.file).href)}">${tint}</div><div>${esc(it.label)}</div></div>`)
    .join("")}</div></body></html>`;
  return shoot(html, W, H, out);
};

/**
 * The soundtrack as a sheet: waveform (peak, and RMS brighter), a seconds ruler, a coral line at every scene change,
 * and the mix's loudness and true peak. It's the raw mix: `npm run render` masters it to -16 LUFS.
 */
const waveSheet = (wav, { fps, total, cuts, title }, out) => {
  const W = 1600, H = 300, pad = 16, titleH = 40, rulerH = 26;
  const pcm = execFileSync("ffmpeg", ["-v", "error", "-i", wav, "-ac", "1", "-ar", "8000", "-f", "s16le", "-"], { maxBuffer: 256 * 1024 * 1024 });
  const s = new Int16Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.length / 2));
  const per = Math.max(1, Math.ceil(s.length / W));
  const cols = Array.from({ length: W }, (_, x) => {
    let peak = 0, sum = 0, n = 0;
    for (let i = x * per; i < Math.min(s.length, (x + 1) * per); i++, n++) {
      const v = Math.abs(s[i]) / 32768;
      peak = Math.max(peak, v);
      sum += v * v;
    }
    return { peak, rms: n ? Math.sqrt(sum / n) : 0 };
  });
  const mid = H / 2, xOf = (sec) => (sec / (total / fps)) * W;
  const bars = (key, color) => `<path fill="none" stroke="${color}" stroke-width="1" d="${cols
    .map((c, x) => `M${x + 0.5} ${(mid - c[key] * mid).toFixed(1)}V${(mid + c[key] * mid).toFixed(1)}`).join("")}"/>`;
  const seconds = Array.from({ length: Math.floor(total / fps) + 1 }, (_, t) => t);
  const step = seconds.length > 40 ? 5 : seconds.length > 20 ? 2 : 1;
  const svg = `<svg width="${W}" height="${H + rulerH}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#0b0a09"/>
    ${seconds.map((t) => `<line x1="${xOf(t)}" x2="${xOf(t)}" y1="0" y2="${H}" stroke="#fff" stroke-opacity=".07"/>`).join("")}
    ${bars("peak", "#6b665e")}${bars("rms", "#d8d2c6")}
    ${cuts.map((c) => `<line x1="${xOf(c / fps)}" x2="${xOf(c / fps)}" y1="0" y2="${H}" stroke="#ff7a59" stroke-width="2"/>`).join("")}
    ${seconds.filter((t) => t % step === 0).map((t) => `<text x="${xOf(t) + 3}" y="${H + 18}" fill="#9a948a" font-size="13">${t} s</text>`).join("")}
  </svg>`;
  // loudness of the raw mix (EBU R128): integrated LUFS and true peak
  const r = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", wav, "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const summary = r.stderr.slice(r.stderr.lastIndexOf("Summary"));
  const lufs = Number(summary.match(/I:\s+(-?[\d.]+|-inf) LUFS/)?.[1]);
  const peak = Number(summary.match(/Peak:\s+(-?[\d.]+|-inf) dBFS/)?.[1]);
  const notes = [
    Number.isFinite(lufs) ? `${lufs} LUFS` : "silent",
    Number.isFinite(peak) ? `true peak ${peak} dBFS` : "",
    peak > -0.5 ? "TOO HOT: the mix may distort, lower the loudest cues" : "",
    lufs < -30 ? "very quiet: is the sound there?" : "",
  ].filter(Boolean).join(" · ");
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${PAGE_CSS}
    .t{padding:${pad}px ${pad}px 0;height:${titleH}px;font-size:18px;font-weight:bold}.w{padding:0 ${pad}px ${pad}px}
  </style></head><body><div class="t">${esc(`${title} — raw mix: ${notes}`)}</div><div class="w">${svg}</div></body></html>`;
  shoot(html, W + pad * 2, titleH + H + rulerH + pad * 2, out);
  return { out, lufs, peak };
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
  // strips: every scene change, then every --strip second (one strip when two land within 2 frames)
  const centres = [
    ...(comp.props.cuts ?? []).map((at) => ({ at, title: `scene change at ${(at / fps).toFixed(1)} s` })),
    ...strips.map((t) => ({ at: Math.round(t * fps), title: `12 frames around ${t} s` })),
  ].filter((c, i, all) => c.at >= 0 && c.at < total && all.findIndex((o) => Math.abs(o.at - c.at) <= 2) === i);
  const stripOf = (at) => Array.from({ length: 12 }, (_, i) => at - 5 + i).filter((x) => x >= 0 && x < total);
  const frames = [...new Set([...sampled, ...centres.flatMap((c) => stripOf(c.at))])].sort((a, b) => a - b);

  const frameDir = path.join(outDir, `frames-${f}`);
  fs.mkdirSync(frameDir, { recursive: true });
  process.stdout.write(`${comp.id}: rendering ${frames.length} frames at phone size… `);
  // One browser for all frames (a renderStill per frame would launch Chrome every time).
  await renderFrames({
    serveUrl, composition: comp, inputProps: comp.props, frames, outputDir: frameDir,
    imageFormat: "jpeg", jpegQuality: 85, scale, concurrency: Math.min(4, CONCURRENCY),
    imageSequencePattern: "f-[frame].[ext]", onStart: () => {}, onFrameUpdate: () => {},
    ...(browser ? { browserExecutable: browser } : {}),
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

  // phone sheets: every 2 s, real phone size, with the unsafe edges tinted red (when the Safe area switch is on)
  const phone = sampled.filter((fr) => fr % (every * 4) === 0);
  const zone = safeArea ? unsafeEdges(width, height) : undefined;
  const zoneNote = !zone ? "" : zone.bottom > 5 ? "red = under TikTok/Reels/Shorts buttons and captions" : "red = outside the 5% safe margin";
  chunk(phone, portrait ? 4 : 6).forEach((group, i, all) => {
    made.push(sheet(group.map((fr) => ({ file: fileOf(fr), label: secs(fr, fps) })),
      { cols: portrait ? 4 : 3, cellW, cellH, zone, title: `${comp.id} — phone size ${i + 1}/${all.length} (360 px wide, every 2 s): can you read everything? ${zoneNote}` },
      path.join(outDir, `phone-${f}-${i + 1}.png`)));
  });

  for (const c of centres)
    made.push(sheet(stripOf(c.at).map((fr) => ({ file: fileOf(fr), label: `#${fr} · ${(fr / fps).toFixed(2)} s` })),
      { cols: 6, cellW: portrait ? 180 : 300, cellH: portrait ? 320 : 169, title: `${comp.id} — ${c.title}` },
      path.join(outDir, `strip-${f}-${(c.at / fps).toFixed(2)}.png`)));
}

// the soundtrack: the same in every format, so rendered once
if (compositions.length) {
  const { composition: comp } = compositions[0];
  const wav = path.join(outDir, "soundtrack.wav");
  process.stdout.write(`${comp.id}: rendering the soundtrack… `);
  await renderMedia({
    serveUrl, composition: comp, inputProps: comp.props, codec: "wav", outputLocation: wav, overwrite: true,
    concurrency: Math.min(4, CONCURRENCY), ...(browser ? { browserExecutable: browser } : {}),
  });
  const w = waveSheet(wav, { fps: comp.fps, total: comp.durationInFrames, cuts: comp.props.cuts ?? [],
    title: `${brand}/${video} — soundtrack (${comp.props.cuts?.length ? "coral = scene change" : "add cuts: timeline.cuts to index.ts to mark scene changes"})` },
    path.join(outDir, "wave.png"));
  fs.rmSync(wav, { force: true });
  console.log(`done (${Number.isFinite(w.lufs) ? `${w.lufs} LUFS, true peak ${w.peak} dBFS` : "silent"})`);
  made.push(w.out);
}

console.log(`\nReview sheets (${made.length}):`);
for (const m of made) console.log(`  ${m.startsWith(ROOT + path.sep) ? path.relative(ROOT, m) : m}`);
console.log(`
Now be a harsh motion director, not a proud author. Read every sheet, then score each 1–10:
  • hook — does the first 2 s grab you?
  • readability — can you read every word on the phone sheets, and does each line stay up ~0.3 s per word?
  • motion quality — springs and eased moves, nothing robotic or floaty (check strips around fast moves)
  • variety — something new every 2–4 s; no two scenes with the same layout
  • composition — clear focal point, nothing clipped, overlapping or crowded; no muddy double exposure in the scene-change
    strips${safeArea ? "; no key text or button in the red edges of the phone sheets" : " (safe area off: edge to edge is fine)"}
  • data accuracy — every claim comes from the product; illustrative numbers carry "Example data"; no real personal data
  • sound sync — in wave.png every whoosh and hit peaks on its moment (the coral lines are scene changes), no long dead
    gaps, nothing marked TOO HOT; then Soundtrack.tsx against the timeline for the taps and reveals
  • clarity — after one viewing, would a stranger know what it is, who it's for and how to get it?
List the 3 biggest problems with timestamps. Fix them, then re-run (add --strip=<s> around fast moves).
Repeat until every score is 8 or more.`);
