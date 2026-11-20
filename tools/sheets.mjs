// Labelled sheets of pictures: a web page of them, photographed by headless Chrome. review.mjs lays out a film's frames
// with it, look.mjs a clip's.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { CHROME_ARGS, findChrome } from "./chrome.mjs";

/** The Chrome that photographs the sheets, or null when there's none (`npm run setup` installs one). */
export const chrome = findChrome();

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export const PAGE_CSS = "body{margin:0;background:#141210;color:#f3ede4;font:15px Helvetica,Arial,sans-serif}";

/** Screenshots an HTML page of W×H into out (a PNG). */
export const shoot = (html, W, H, out) => {
  const htmlFile = out.replace(/\.png$/, ".html");
  // The Director can write where the sheets go: a link left under either name would be followed, and another file
  // written over. So the names are cleared first, and the page is only ever made new.
  for (const file of [htmlFile, out]) fs.rmSync(file, { force: true });
  fs.writeFileSync(htmlFile, html, { flag: "wx" });
  try {
    execFileSync(chrome, [
      "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--allow-file-access-from-files", ...CHROME_ARGS,
      `--window-size=${W},${H}`, `--screenshot=${out}`, pathToFileURL(htmlFile).href,
    ], { stdio: "ignore", timeout: 120000, windowsHide: true }); // a hung Chrome must not freeze the critique loop
  } finally {
    fs.rmSync(htmlFile, { force: true });
  }
  return out;
};

/** Lays out images in a labelled grid page and screenshots it. items: [{ file, label }]. zone: edges to tint red, in % of the frame ({ top, bottom, left, right }).
 *  labelLines: room for longer labels (e.g. a spoken phrase). */
export const sheet = (items, { cols, cellW, cellH, title, zone, labelLines = 1 }, out) => {
  const gap = 8, pad = 16, labelH = labelLines > 1 ? 4 + 18 * labelLines : 26, titleH = 40; // multi-line: 4 px + 18 px lines
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
    .c>div:last-child{height:${labelH}px;color:#e0a860;font-weight:bold;${labelLines > 1
      ? `box-sizing:border-box;padding-top:4px;line-height:18px;font-size:14px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${labelLines};overflow:hidden`
      : `line-height:${labelH}px`}}
  </style></head><body><div class="t">${esc(title)}</div><div class="g">${items
    .map((it) => `<div class="c"><div class="f"><img src="${esc(pathToFileURL(it.file).href)}">${tint}</div><div>${esc(it.label)}</div></div>`)
    .join("")}</div></body></html>`;
  return shoot(html, W, H, out);
};
