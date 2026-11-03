// npm run shot -- <brand> --site: a whole site with no recipe, and site.json with what it says. Runs a real headless Chrome
// on a local page, in a temp copy, so nothing real is touched and nothing leaves this machine.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findChrome } from '../chrome.mjs';

const REPO = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const skip = findChrome() ? false : 'no Chrome on this machine';

const PAGE = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>منارة | تطبيق تجريبي</title>
<meta name="description" content="وصف الموقع التجريبي"><meta name="theme-color" content="#112233"><link rel="icon" href="/icon.png">
<meta property="og:image" content="/share.png">
<style>body{background:#112233;color:#F0F0F0;font-family:Georgia}h1{color:#FFCC00}.go{background:#FFCC00;color:#000;padding:8px}.gone{display:none}.tall{height:3000px}.modern{background:oklch(0.7 0.1 200)}</style></head>
<body><h1>كل صلاة في وقتها</h1><h2>القبلة   دائما</h2><h2 class="gone">عنوان مخفي</h2>
<p>يعرف التطبيق موقعك ويحسب المواقيت بدون انترنت.</p><p>قصير</p><div class="hero">نص تعريفي مكتوب داخل عنصر عام من غير <span>فقرة</span> ولا قائمة.</div><footer>نص تذييل لا يعد ادعاء من ادعاءات المنتج.</footer>
<p>${'جملة طويلة تصف ميزة من ميزات التطبيق بالتفصيل. '.repeat(14)}</p>
<button class="go">حمّل التطبيق</button><button>الدخول</button><button class="modern">جديد</button><div class="tall"></div><p>آخر الصفحة بعد التمرير الطويل هنا.</p></body></html>`;

/** Runs a tool without blocking this process, which is also the web server the tool's browser is asking. */
const node = (env, ...args) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, args, { env, windowsHide: true });
    let stdout = '', stderr = '';
    child.stdout.setEncoding('utf8').on('data', (x) => (stdout += x));
    child.stderr.setEncoding('utf8').on('data', (x) => (stderr += x));
    const limit = setTimeout(() => child.kill(), 120000);
    child.on('close', (status) => (clearTimeout(limit), resolve({ status, stdout, stderr })));
  });

const setUp = async (t) => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-site-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.cpSync(path.join(REPO, 'tools'), path.join(root, 'tools'), { recursive: true, filter: (src) => !src.includes('__pycache__') });
  fs.symlinkSync(path.join(REPO, 'node_modules'), path.join(root, 'node_modules'), 'junction');
  for (const d of ['brand', 'video01']) fs.mkdirSync(path.join(root, 'src', 'brands', 'demo', d), { recursive: true });
  let opened; // a page that never finishes loading, so a run can be stopped in the middle
  const hanging = new Promise((resolve) => (opened = resolve));
  const server = http.createServer((req, res) => {
    if (req.url === '/hang') return opened();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (req.url === '/missing') res.statusCode = 404;
    res.end(PAGE);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => (server.close(resolve), server.closeAllConnections())));
  const env = { ...process.env, HMV_TICKET: '', HMV_DASHBOARD: '' };
  const run = (...args) => node(env, path.join(root, 'tools', 'shot.mjs'), 'demo', ...args);
  return { root, run, env, hanging, url: `http://127.0.0.1:${server.address().port}/` };
};

test('--site saves the page on a phone and a desktop, and what it says', { skip }, async (t) => {
  const { root, run, url } = await setUp(t);
  const r = await run('--site', `--url=${url}`, '--fresh', '--json');
  assert.equal(r.status, 0, r.stderr);
  const out = JSON.parse(r.stdout); // stdout is the one result; the progress went to stderr
  assert.equal(out.ok, true);
  assert.deepEqual(out.shots.map((f) => path.basename(f)), ['site-mobile.png', 'site-mobile-full.png', 'site-desktop.png', 'site-desktop-full.png']);
  for (const f of out.shots) assert.ok(fs.statSync(f).size > 1000, f);
  assert.equal(path.relative(root, out.site).split(path.sep).join('/'), 'src/brands/demo/brand/site.json');

  const site = JSON.parse(fs.readFileSync(out.site, 'utf8'));
  assert.equal(site.title, 'منارة | تطبيق تجريبي');
  assert.equal(site.description, 'وصف الموقع التجريبي');
  assert.equal(site.language, 'ar');
  assert.equal(site.direction, 'rtl');
  assert.deepEqual(site.headings, ['كل صلاة في وقتها', 'القبلة دائما']); // spaces tidied, and no hidden heading
  assert.deepEqual(site.buttons, ['حمّل التطبيق', 'الدخول', 'جديد']);
  assert.ok(site.text.includes('يعرف التطبيق موقعك ويحسب المواقيت بدون انترنت.'));
  assert.ok(!site.text.includes('قصير')); // too short to be a claim
  assert.ok(site.text.some((t) => t.startsWith('نص تعريفي مكتوب داخل عنصر عام من غير فقرة ولا قائمة')), 'text in a div, with its inline span'); // sites built from divs
  assert.ok(!site.text.some((t) => t.includes('فقرة') && !t.startsWith('نص تعريفي')), 'the span is not listed again');
  assert.ok(!site.text.some((t) => t.includes('تذييل')), 'the footer is not a claim');
  const long = site.text.filter((t) => t.startsWith('جملة طويلة'));
  assert.ok(long.length >= 2 && long.every((t) => t.length <= 300 && t.endsWith('.')), 'a long paragraph is kept, in whole sentences');
  assert.equal(site.colours.theme, '#112233');
  assert.equal(site.colours.background, '#112233');
  assert.equal(site.colours.text, '#F0F0F0');
  assert.equal(site.colours.heading, '#FFCC00');
  assert.equal(site.colours.buttons[0], '#FFCC00');
  // a modern CSS colour, oklch(0.7 0.1 200), is about #40B1B7 by the OKLab formulas (and not #0100C8, its numbers read as rgb)
  const channels = site.colours.buttons[2].match(/\w\w/g).map((h) => parseInt(h, 16));
  assert.ok([0x40, 0xb1, 0xb7].every((want, i) => Math.abs(channels[i] - want) <= 2), site.colours.buttons[2]);
  assert.match(site.fonts.body, /Georgia/);
  assert.equal(site.images.share, `${url}share.png`);
  assert.deepEqual(site.images.icons, [`${url}icon.png`]);
  assert.ok(!fs.existsSync(`${out.site}.part`));
});

test('a stopped run leaves no browser behind', { skip: skip || process.platform === 'win32' }, async (t) => {
  const { root, url, hanging } = await setUp(t);
  const tmp = path.join(root, 'tmp'); // its own temp folder, so the only profile in there is this run's
  fs.mkdirSync(tmp);
  const child = spawn(process.execPath, [path.join(root, 'tools', 'shot.mjs'), 'demo', '--site', `--url=${url}hang`, '--fresh'], { env: { ...process.env, TMPDIR: tmp, HMV_TICKET: '', HMV_DASHBOARD: '' }, stdio: ['ignore', 'pipe', 'pipe'] });
  const ended = new Promise((resolve) => child.once('close', resolve));
  await hanging; // Chrome is up and asking for the page
  const [profile] = fs.readdirSync(tmp).filter((n) => n.startsWith('shot-'));
  assert.ok(profile);
  const running = () => spawnSync('ps', ['-Ao', 'command'], { encoding: 'utf8' }).stdout.includes(profile);
  assert.ok(running(), 'its Chrome should be running now');
  child.kill('SIGTERM');
  assert.equal(await ended, 143);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  assert.ok(!running(), 'a browser from this run is still running');
});

test('a page that never answers fails the shot instead of holding the run', { skip }, async (t) => {
  const { url, env, root } = await setUp(t);
  const r = await node({ ...env, HMV_SHOT_STALL_MS: '4000' }, path.join(root, 'tools', 'shot.mjs'), 'demo', '--site', `--url=${url}hang`, '--only=site-mobile', '--fresh', '--json');
  assert.equal(r.status, 1, r.stderr);
  assert.deepEqual(JSON.parse(r.stdout), { ok: false, shots: [], site: null });
  assert.match(r.stderr, /site-mobile: no answer from the page/);
});

test('a link left where a file goes is replaced, and what it points to stays as it was', { skip: skip || process.platform === 'win32' }, async (t) => {
  const { root, run, url } = await setUp(t);
  const keep = path.join(root, 'keep.txt');
  fs.writeFileSync(keep, 'the user\'s file');
  const links = [path.join(root, 'src', 'brands', 'demo', 'brand', 'site.json.part'), path.join(root, 'public', 'demo', 'brand', 'img', 'shots', 'site-desktop-full.png.part'), path.join(root, 'public', 'demo', 'brand', 'img', 'shots', 'site-mobile.png')];
  for (const link of links) {
    fs.mkdirSync(path.dirname(link), { recursive: true });
    fs.symlinkSync(keep, link);
  }
  const r = await run('--site', `--url=${url}`, '--fresh', '--json');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(fs.readFileSync(keep, 'utf8'), 'the user\'s file');
  assert.ok(!fs.lstatSync(links[2]).isSymbolicLink());
  assert.ok(!fs.existsSync(links[0]) && !fs.existsSync(links[1]));
});

test('--site uses the saved website, goes through the CLI without a server, and keeps what it has when the site is down', { skip }, async (t) => {
  const { root, run, url } = await setUp(t);
  const none = await run('--site', '--fresh');
  assert.equal(none.status, 1);
  assert.match(none.stderr, /No website saved for demo/);
  assert.deepEqual(JSON.parse((await run('--site', '--fresh', '--json')).stdout), { ok: false, error: 'No website saved for demo: pass --url=https://…' });
  assert.equal((await run('--site', '--url=file:///etc/passwd', '--fresh')).status, 1); // web addresses only
  fs.mkdirSync(path.join(root, '.director', 'demo'), { recursive: true });
  fs.writeFileSync(path.join(root, '.director', 'demo', '_brand.json'), JSON.stringify({ url }));
  const r = await node({ ...process.env, HMV_TICKET: '', HMV_DASHBOARD: '', PORT: '1' }, path.join(root, 'tools', 'video.mjs'), 'fetch-site', 'demo', '--fresh', '--json'); // PORT 1: nothing listens there
  assert.equal(r.status, 0, r.stderr);
  assert.equal(JSON.parse(r.stdout).shots.length, 4);
  const siteFile = path.join(root, 'src', 'brands', 'demo', 'brand', 'site.json');
  const good = fs.readFileSync(siteFile, 'utf8');
  const down = await run('--site', `--url=${url}missing`, '--only=site-desktop-full', '--fresh', '--json'); // an error page says nothing about the product
  assert.equal(down.status, 1);
  assert.deepEqual(JSON.parse(down.stdout), { ok: false, shots: [], site: null });
  assert.match(down.stderr, /the site answered 404/);
  assert.equal(fs.readFileSync(siteFile, 'utf8'), good);
  const unknown = await node({ ...process.env, HMV_TICKET: '', HMV_DASHBOARD: '', PORT: '1' }, path.join(root, 'tools', 'video.mjs'), 'fetch-site', 'nobody', '--json');
  assert.equal(unknown.status, 1);
  assert.match(JSON.parse(unknown.stdout).error, /No brand nobody yet: .*new nobody/);
});
