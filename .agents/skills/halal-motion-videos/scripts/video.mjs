import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const here = path.dirname(fs.realpathSync(fileURLToPath(import.meta.url)));
let root = path.resolve(here, '../../../..');
if (!fs.existsSync(path.join(root,'tools/video.mjs'))) root = process.env.HALAL_MOTION_VIDEOS || '';
if (!root || !fs.existsSync(path.join(root,'tools/video.mjs'))) { console.error('Set HALAL_MOTION_VIDEOS to the repo folder.'); process.exit(1); }
const r = spawnSync(process.execPath, [path.join(root,'tools/video.mjs'), ...process.argv.slice(2)], {cwd:root,stdio:'inherit'});
process.exit(r.status ?? 1);
