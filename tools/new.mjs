// Scaffolds a new brand or a new video from src/brands/_starter.
// Usage:
//   npm run new -- <brand>            new brand, with its first video (video01)
//   npm run new -- <brand> [video]    new video in an existing brand (default: next videoNN)
// Creates src/brands/<brand>/<video>/ and public/<brand>/<video>/; Studio and the dashboard find it automatically.
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const [brand, videoArg] = process.argv.slice(2);
const NAME = /^[a-z][a-z0-9-]*$/;
const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};
if (!brand || !NAME.test(brand) || brand === "brand") fail("Usage: npm run new -- <brand> [video]   (lowercase kebab-case names)");
if (videoArg && (!NAME.test(videoArg) || videoArg === "brand")) fail(`Bad video name "${videoArg}" (lowercase kebab-case, not "brand").`);

const BRANDS = path.join(ROOT, "src", "brands");
const STARTER = path.join(BRANDS, "_starter");
const brandDir = path.join(BRANDS, brand);
const pub = (...p) => path.join(ROOT, "public", ...p);
const ident = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const copyDir = (from, to) =>
  fs.cpSync(from, to, { recursive: true, filter: (src) => path.basename(src) !== ".DS_Store" });
const edit = (file, fn) => fs.writeFileSync(file, fn(fs.readFileSync(file, "utf8")));
const keep = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, ".gitkeep"), "");
};
/** Inserts `line` above the marker comment in a registry file. */
const register = (file, marker, line) =>
  edit(file, (s) => s.replace(new RegExp(`^(\\s*)(// ${marker})`, "m"), (_, indent, m) => `${indent}${line}\n${indent}${m}`));
const fillDocs = (dir, video) => {
  for (const f of fs.readdirSync(dir, { recursive: true })) {
    if (f.endsWith(".md")) edit(path.join(dir, f), (s) => s.replaceAll("__BRAND__", brand).replaceAll("__VIDEO__", video));
  }
};
const setVideoId = (dir, video) =>
  edit(path.join(dir, "assets.ts"), (s) => s.replace(/VIDEO_ID = "[^"]*"/, `VIDEO_ID = "${video}"`));

const nextVideo = () => {
  const nums = fs
    .readdirSync(brandDir)
    .map((d) => d.match(/^video(\d+)$/)?.[1])
    .filter(Boolean)
    .map(Number);
  return `video${String((nums.length ? Math.max(...nums) : 0) + 1).padStart(2, "0")}`;
};

let video;
if (!fs.existsSync(brandDir)) {
  // New brand: brand kit + first video.
  video = videoArg ?? "video01";
  copyDir(STARTER, brandDir);
  edit(path.join(brandDir, "brand", "assets.ts"), (s) => s.replace(/BRAND_ID = "[^"]*"/, `BRAND_ID = "${brand}"`));
  if (video !== "video01") {
    fs.renameSync(path.join(brandDir, "video01"), path.join(brandDir, video));
    edit(path.join(brandDir, "index.ts"), (s) =>
      s.replace('import video01 from "./video01";', `import ${ident(video)} from "./${video}";`).replace("  video01,", `  ${ident(video)},`),
    );
  }
  setVideoId(path.join(brandDir, video), video);
  fillDocs(brandDir, video);
  for (const d of ["fonts", "img", "sfx"]) keep(pub(brand, "brand", d));
  // no registration needed: src/brands/index.ts discovers brand folders automatically
  console.log(`New brand: ${brand}`);
} else {
  // New video in an existing brand, using that brand's kit.
  video = videoArg ?? nextVideo();
  const videoDir = path.join(brandDir, video);
  if (fs.existsSync(videoDir)) fail(`${path.relative(ROOT, videoDir)} already exists.`);
  copyDir(path.join(STARTER, "video01"), videoDir);
  setVideoId(videoDir, video);
  fillDocs(videoDir, video);
  register(path.join(brandDir, "index.ts"), "new-video:import", `import ${ident(video)} from "./${video}";`);
  register(path.join(brandDir, "index.ts"), "new-video:entry", `${ident(video)},`);
}
keep(pub(brand, video));

console.log(`New video: ${brand}/${video}
  code    src/brands/${brand}/${video}/   (start with BRIEF.md, then copy.ts)
  files   public/${brand}/${video}/
  brand   src/brands/${brand}/brand/  +  public/${brand}/brand/
  studio  npm run studio  →  ${brand} / ${video}
  render  npm run render -- ${brand} ${video}  →  out/${brand}/${video}/`);
