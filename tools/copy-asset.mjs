// Copies assets from anywhere (e.g. the product's own project folder) into public/ — and only into public/.
// Used by the dashboard's Director, which may read the product folder but never write to it.
// Usage: npm run copy-asset -- <source file or folder> <destination under public/>
//   npm run copy-asset -- ~/Projects/MyApp/Assets/logo.png public/my-app/brand/img/logo.png
//   npm run copy-asset -- ~/Projects/MyApp/Fonts public/my-app/brand/fonts/
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const [srcArg, destArg] = process.argv.slice(2);
const fail = (m) => {
  console.error(m);
  process.exit(1);
};
if (!srcArg || !destArg) fail("Usage: npm run copy-asset -- <source> <destination under public/>");
const expand = (p) => (p.startsWith("~") ? path.join(os.homedir(), p.slice(1)) : p);

const src = path.resolve(expand(srcArg));
if (!fs.existsSync(src)) fail(`Not found: ${src}`);
const PUBLIC = path.join(ROOT, "public");
let dest = path.resolve(ROOT, expand(destArg));
if (!dest.startsWith(PUBLIC + path.sep)) fail(`Destination must be inside public/ (got ${path.relative(ROOT, dest)}).`);
if (path.relative(PUBLIC, dest).startsWith("_shared")) fail("public/_shared is the shared kit — copy into public/<brand>/ instead.");

const isDir = fs.statSync(src).isDirectory();
if (!isDir && (destArg.endsWith("/") || (fs.existsSync(dest) && fs.statSync(dest).isDirectory()))) dest = path.join(dest, path.basename(src));
fs.mkdirSync(isDir ? dest : path.dirname(dest), { recursive: true });
fs.cpSync(src, dest, { recursive: true, filter: (p) => path.basename(p) !== ".DS_Store" });
console.log(`copied ${src} → ${path.relative(ROOT, dest)}`);
