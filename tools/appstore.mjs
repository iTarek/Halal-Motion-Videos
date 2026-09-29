// App Store assets for a brand — for iOS apps with no website to screenshot (npm run shot needs a live URL).
// Asks Apple's public iTunes Lookup API, then:
//   public/<brand>/brand/img/store/   icon.png (1024×1024), iphone-01.png …, ipad-01.png … (full size)
//   src/brands/<brand>/brand/BRAND.md an "App Store listing" section: name, seller, link, the app's own description
//                                     and release notes (quote copy from here), and every file with its source
//   the brand's website setting        set to the App Store page if it was empty
// Re-run it any time to refresh; it replaces the store/ folder and that BRAND.md section.
//
// Usage: npm run appstore -- <brand> <app id | App Store URL> [--country=sa] [--no-ipad] [--json]
//   e.g. npm run appstore -- my-app 6474693547
//        npm run appstore -- my-app https://apps.apple.com/sa/app/my-app/id6474693547
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Storefronts to try when the app isn't in the first one (lookups are per country).
const STOREFRONTS = ["us", "sa", "ae", "eg", "gb", "tr", "id", "my", "pk", "fr", "de"];

const argv = process.argv.slice(2);
const flags = Object.fromEntries(argv.filter((a) => a.startsWith("--")).map((a) => {
  const [k, ...v] = a.slice(2).split("=");
  return [k, v.length ? v.join("=") : true];
}));
const [brand, app] = argv.filter((a) => !a.startsWith("--"));
const JSON_OUT = !!flags.json;
const fail = (msg) => {
  if (JSON_OUT) console.log(JSON.stringify({ ok: false, error: msg }));
  else console.error(msg);
  process.exit(1);
};
const log = (msg) => { if (!JSON_OUT) console.log(msg); };

if (!brand || !app) fail("Usage: npm run appstore -- <brand> <app id | App Store URL> [--country=sa] [--no-ipad]");
const brandMd = path.join(ROOT, "src", "brands", brand, "brand", "BRAND.md");
if (!/^[a-z][a-z0-9-]*$/.test(brand) || !fs.existsSync(path.dirname(brandMd))) fail(`No brand "${brand}" — create it first: npm run new -- ${brand}`);
const id = String(app).match(/(?:^|id)(\d{5,})/)?.[1];
if (!id) fail(`"${app}" isn't an App Store app id (e.g. 6474693547) or an apps.apple.com link.`);
const urlCountry = String(app).match(/apps\.apple\.com\/([a-z]{2})\//)?.[1];
const first = typeof flags.country === "string" ? flags.country.toLowerCase() : urlCountry ?? "us";

// ---------- lookup

const lookup = async (country) => {
  const r = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=${country}&entity=software`);
  if (!r.ok) throw new Error(`App Store lookup failed (${r.status}).`);
  return (await r.json()).results?.find((x) => x.wrapperType === "software" || x.kind === "software") ?? null;
};
let info = null;
let country = first;
for (const c of [first, ...STOREFRONTS.filter((s) => s !== first)]) {
  info = await lookup(c).catch((e) => fail(e.message));
  if (info) {
    country = c;
    break;
  }
  if (flags.country) break; // the caller named the country: don't wander
}
if (!info) fail(`App ${id} wasn't found in the App Store (${flags.country ? first : "tried " + STOREFRONTS.join(", ")}). Check the id, or pass --country=<its store>.`);
log(`${info.trackName} — ${info.sellerName} (App Store ${country.toUpperCase()})`);

// ---------- download (into a temp folder, swapped in only when everything worked)

// mzstatic serves any size up to the original: .../<w>x<h>bb.png
const full = (u, size) => u.replace(/\/[^/]+$/, `/${size}.png`);
const pngSize = (buf) => (buf.subarray(1, 4).toString() === "PNG" ? { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) } : null);

const want = [
  { name: "icon.png", what: "app icon", url: full(info.artworkUrl512 ?? info.artworkUrl100, "1024x1024bb") },
  ...(info.screenshotUrls ?? []).map((u, i) => ({ name: `iphone-${String(i + 1).padStart(2, "0")}.png`, what: "iPhone screenshot", url: full(u, "9999x9999bb") })),
  ...(flags["no-ipad"] ? [] : (info.ipadScreenshotUrls ?? []).map((u, i) => ({ name: `ipad-${String(i + 1).padStart(2, "0")}.png`, what: "iPad screenshot", url: full(u, "9999x9999bb") }))),
];
const dest = path.join(ROOT, "public", brand, "brand", "img", "store");
const tmp = `${dest}.downloading`;
fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp, { recursive: true });
const files = [];
for (const f of want) {
  const r = await fetch(f.url);
  if (!r.ok) {
    fs.rmSync(tmp, { recursive: true, force: true });
    fail(`Couldn't download ${f.name} (${r.status}) from ${f.url}`);
  }
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(path.join(tmp, f.name), buf);
  const size = pngSize(buf);
  files.push({ ...f, file: path.join(dest, f.name), width: size?.w ?? null, height: size?.h ?? null });
  log(`  ✓ ${f.name}${size ? `  ${size.w}×${size.h}` : ""}`);
}
fs.rmSync(dest, { recursive: true, force: true });
fs.renameSync(tmp, dest);

// ---------- BRAND.md: one section between markers, replaced on every run

const link = String(info.trackViewUrl ?? `https://apps.apple.com/app/id${id}`).replace(/\?.*$/, "");
const quote = (s) => String(s ?? "").trim().split("\n").map((l) => `> ${l}`.trimEnd()).join("\n");
const rel = (p) => path.relative(ROOT, p);
const section = `<!-- app-store:start — written by \`npm run appstore\`; re-run it to refresh, edits here are replaced -->
## App Store listing

- **Name:** ${info.trackName}
- **Seller:** ${info.sellerName}
- **Link:** ${link}
- **Category:** ${(info.genres ?? [info.primaryGenreName]).join(", ")}
- **Version:** ${info.version ?? "?"}${info.currentVersionReleaseDate ? ` (${info.currentVersionReleaseDate.slice(0, 10)})` : ""}
- **Languages:** ${(info.languageCodesISO2A ?? []).join(", ") || "?"}
- **Rating:** ${info.userRatingCount ? `${Number(info.averageUserRating).toFixed(1)} from ${info.userRatingCount} rating${info.userRatingCount === 1 ? "" : "s"} (${country.toUpperCase()} store)` : "no ratings yet"}
- **Price:** ${info.formattedPrice ?? "?"}

**Files** in \`${rel(dest)}/\`, fetched ${new Date().toLocaleDateString("sv")} from the App Store (${country.toUpperCase()}), each from its mzstatic.com URL:

${files.map((f) => `- \`${f.name}\`: ${f.what}${f.width ? `, ${f.width}×${f.height}` : ""}`).join("\n")}

Use them like \`brandAsset("img/store/iphone-01.png")\`, e.g. in \`<Phone />\`.

### Description (the app's own words: quote copy from here)

${quote(info.description)}
${info.releaseNotes ? `\n### What's new in ${info.version}\n\n${quote(info.releaseNotes)}\n` : ""}<!-- app-store:end -->`;

const md = fs.existsSync(brandMd) ? fs.readFileSync(brandMd, "utf8") : `# ${brand}\n`;
const block = /<!-- app-store:start[\s\S]*?<!-- app-store:end -->/;
fs.writeFileSync(brandMd, block.test(md) ? md.replace(block, section) : `${md.trimEnd()}\n\n${section}\n`);
log(`  ✓ ${rel(brandMd)}: App Store listing section`);

// ---------- the brand's website: the App Store page, if none is set (the dashboard and the Director read it)

const brandJson = path.join(ROOT, ".director", brand, "_brand.json");
let settings = {};
try { settings = JSON.parse(fs.readFileSync(brandJson, "utf8")); } catch {}
const setUrl = !settings.url;
if (setUrl) {
  fs.mkdirSync(path.dirname(brandJson), { recursive: true });
  fs.writeFileSync(brandJson, JSON.stringify({ folder: "", ...settings, url: link }, null, 2));
  log(`  ✓ website setting → ${link}`);
}

if (JSON_OUT)
  console.log(JSON.stringify({
    ok: true, brand, id, country, name: info.trackName, seller: info.sellerName, link, brandMd, websiteSet: setUrl,
    files: files.map(({ name, what, file, width, height }) => ({ name, what, file, width, height })),
  }, null, 2));
else log(`\n${files.length} files in ${rel(dest)}/`);
