// `npm run look` (tools/look.mjs): sheets of a clip's frames, so the Director can see a video file. It opens only a
// brand's own video files, and only as plain video. Runs on a temp copy with clips made here: no real brand is touched.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findChrome } from '../chrome.mjs';

const REPO = fileURLToPath(new URL('../../', import.meta.url));
const has = (bin) => spawnSync(bin, ['-version'], { windowsHide: true }).status === 0;
const skip = !has('ffmpeg') || !has('ffprobe') ? 'needs ffmpeg and ffprobe' : !findChrome() ? 'needs a headless Chrome (npm run setup)' : false;

/** A copy of the tools with one brand, and clips made by ffmpeg: [name under public/, seconds, size, frames a second]. */
const box = (t, clips = []) => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-look-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.cpSync(path.join(REPO, 'tools'), path.join(root, 'tools'), { recursive: true, filter: (src) => !src.includes('__pycache__') });
  fs.symlinkSync(path.join(REPO, 'node_modules'), path.join(root, 'node_modules'), 'junction');
  for (const [name, seconds, size, rate] of clips) {
    const file = path.join(root, 'public', name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const made = spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', `testsrc2=size=${size}:rate=${rate}:duration=${seconds}`, '-pix_fmt', 'yuv420p', file], { encoding: 'utf8', windowsHide: true });
    assert.equal(made.status, 0, made.stderr);
  }
  const look = (...args) => {
    const r = spawnSync(process.execPath, [path.join(root, 'tools', 'look.mjs'), ...args, '--json'], { encoding: 'utf8', windowsHide: true, timeout: 120000 });
    return { code: r.status, ...JSON.parse(r.stdout.trim().split('\n').slice(r.status ? -1 : 0).join('\n')) };
  };
  const made = () => {
    const tmp = path.join(root, '.director', 'tmp');
    return fs.existsSync(tmp) ? fs.readdirSync(tmp, { recursive: true }).map(String).filter((f) => /\.(png|jpg|html)$/.test(f)).sort() : [];
  };
  return { root, look, made };
};
/** A PNG's width and height in pixels, from its header. */
const pngSize = (file) => {
  const head = fs.readFileSync(file).subarray(0, 24);
  assert.equal(head.subarray(1, 4).toString(), 'PNG', file);
  return [head.readUInt32BE(16), head.readUInt32BE(20)];
};
const pngWidth = (file) => pngSize(file)[0];

test('a clip is shown as labelled sheets of its frames, small for the whole clip and large for a close look', { skip }, (t) => {
  const { root, look, made } = box(t, [['demo/video01/video/demo.mp4', 12, '320x180', 30], ['demo/brand/video/tall tour.mp4', 3, '180x320', 30]]);
  const whole = look(path.join('public', 'demo', 'video01', 'video', 'demo.mp4'));
  const sheet = path.join(root, '.director', 'tmp', 'demo-video01', 'look', 'demo-1.png');
  assert.deepEqual(whole, {
    code: 0, ok: true, clip: path.join(root, 'public', 'demo', 'video01', 'video', 'demo.mp4'), seconds: 12, width: 320, height: 180, fps: 30, sound: false,
    from: 0, to: 12, every: 1, frames: 12, sheets: [sheet],
  });
  assert.equal(pngWidth(sheet), 16 * 2 + 4 * 300 + 3 * 8); // 12 frames: 4 across, 300 px each
  const close = look(path.join(root, 'public', 'demo', 'video01', 'video', 'demo.mp4'), '--from=1', '--to=3', '--every=0.5'); // a whole path works too
  assert.deepEqual([close.from, close.to, close.every, close.frames, close.sheets], [1, 3, 0.5, 4, [sheet]]); // the same sheet, drawn again
  assert.equal(pngWidth(sheet), 16 * 2 + 2 * 640 + 8); // 8 frames or fewer: 2 across, 640 px each, large enough to read a screen
  const eight = look(path.join('public', 'demo', 'video01', 'video', 'demo.mp4'), '--from=4', '--to=8', '--every=0.5'); // 4.0, 4.5 … 7.5: up to --to, not at it
  assert.equal(eight.frames, 8);
  assert.equal(pngWidth(sheet), 16 * 2 + 2 * 640 + 8); // the close look the guide gives is drawn large
  // a brand's own clip, upright, with a space in its name
  const tall = look(path.join('public', 'demo', 'brand', 'video', 'tall tour.mp4'));
  assert.deepEqual([tall.width, tall.height, tall.frames], [180, 320, 3]);
  assert.deepEqual(tall.sheets, [path.join(root, '.director', 'tmp', 'demo-brand', 'look', 'tall-tour-1.png')]);
  assert.deepEqual(made(), [path.join('demo-brand', 'look', 'tall-tour-1.png'), path.join('demo-video01', 'look', 'demo-1.png')]); // the frames and pages it worked from are gone
});

test('a long clip gets fewer frames than one a second, on at most 4 sheets; asking for too many is refused', { skip }, (t) => {
  const { look, made } = box(t, [['demo/video01/video/long.mp4', 200, '64x36', 5]]);
  const clip = path.join('public', 'demo', 'video01', 'video', 'long.mp4');
  const whole = look(clip);
  assert.deepEqual([whole.every, whole.frames, whole.sheets.length], [2.5, 80, 4]);
  assert.equal(made().length, 4);
  const many = look(clip, '--every=0.5');
  assert.equal(many.code, 1);
  assert.match(many.error, /That's 400 frames\. Look at less of it \(--from, --to\) or less often \(--every=2\.5\)/);
  assert.equal(made().length, 4); // and the sheets it had stay
});

test('only a video file inside a brand\'s public folder is opened', { skip }, (t) => {
  const { root, look, made } = box(t, [['demo/video01/video/demo.mp4', 2, '64x36', 5]]);
  const pub = (...p) => path.join(root, 'public', ...p);
  fs.mkdirSync(pub('_shared', 'img'), { recursive: true });
  fs.mkdirSync(path.join(root, '.director'), { recursive: true });
  fs.writeFileSync(path.join(root, '.director', 'settings.json'), '{"elevenlabs":{"apiKey":"secret-key"}}');
  fs.copyFileSync(pub('demo', 'video01', 'video', 'demo.mp4'), path.join(root, 'elsewhere.mp4'));
  fs.copyFileSync(pub('demo', 'video01', 'video', 'demo.mp4'), pub('_shared', 'img', 'kit.mp4'));
  fs.copyFileSync(pub('demo', 'video01', 'video', 'demo.mp4'), pub('top.mp4'));
  fs.copyFileSync(pub('demo', 'video01', 'video', 'demo.mp4'), pub('demo', 'loose.mp4'));
  fs.mkdirSync(pub('demo', 'v%03d'));
  fs.copyFileSync(pub('demo', 'video01', 'video', 'demo.mp4'), pub('demo', 'v%03d', 'odd.mp4'));
  fs.writeFileSync(pub('demo', 'video01', 'video', 'notes.txt'), 'not a video');
  for (const [arg, why] of [
    ['elsewhere.mp4', /inside public\/<brand>\//], [path.join('.director', 'settings.json'), /inside public\/<brand>\//], [path.join('tools', 'look.mjs'), /inside public\/<brand>\//],
    [path.join('public', '_shared', 'img', 'kit.mp4'), /inside public\/<brand>\//], [path.join('public', 'top.mp4'), /inside public\/<brand>\//],
    // not in the brand's kit or one of its videos: the sheets would land in a folder no Director run clears
    [path.join('public', 'demo', 'loose.mp4'), /inside public\/<brand>\//], [path.join('public', 'demo', 'v%03d', 'odd.mp4'), /inside public\/<brand>\//],
    [path.join('public', 'demo', 'video01', 'video'), /inside public\/<brand>\//], [path.join('public', 'demo', 'video01', 'video', 'notes.txt'), /isn't a video file/],
    [path.join('public', 'demo', 'video01', 'video', 'gone.mp4'), /^Not found/],
  ]) {
    const r = look(arg);
    assert.equal(r.code, 1, arg);
    assert.equal(r.ok, false, arg);
    assert.match(r.error, why, arg);
  }
  // a link in the brand's folder to a file outside it: the Director could plant one
  let linked = true;
  try {
    fs.symlinkSync(path.join(root, 'elsewhere.mp4'), pub('demo', 'video01', 'video', 'link.mp4'));
  } catch {
    linked = false; // Windows without the right to make links
  }
  if (linked) assert.match(look(path.join('public', 'demo', 'video01', 'video', 'link.mp4')).error, /inside public\/<brand>\//);
  assert.deepEqual(made(), []);
});

// The Director can write in .director/tmp/, and `unzip` or `cp -R` can leave a link there. look runs with more rights
// than the Director has, so it must not follow one: to the keys (written over), or to a folder outside.
test('a link left where the sheets go is never followed', { skip }, (t) => {
  const { root, look } = box(t, [['demo/video01/video/demo.mp4', 2, '64x36', 5]]);
  const clip = path.join('public', 'demo', 'video01', 'video', 'demo.mp4');
  const tmp = path.join(root, '.director', 'tmp', 'demo-video01');
  const keys = path.join(root, '.director', 'settings.json');
  const outside = path.join(root, 'outside');
  fs.mkdirSync(path.join(tmp, 'look'), { recursive: true });
  fs.mkdirSync(outside);
  fs.writeFileSync(keys, '{"elevenlabs":{"apiKey":"secret-key"}}');
  const link = (target, at, type) => {
    fs.rmSync(at, { recursive: true, force: true });
    try {
      fs.symlinkSync(target, at, type);
      return true;
    } catch {
      return false; // Windows without the right to make links
    }
  };
  // the page a sheet is photographed from, and the sheet itself
  for (const name of ['demo-1.html', 'demo-1.png']) {
    if (!link(keys, path.join(tmp, 'look', name), 'file')) return;
    assert.equal(look(clip).ok, true, name);
    assert.equal(fs.readFileSync(keys, 'utf8'), '{"elevenlabs":{"apiKey":"secret-key"}}', `${name} was followed to the keys`);
    assert.equal(fs.lstatSync(path.join(tmp, 'look', 'demo-1.png')).isFile(), true); // a sheet of its own now
  }
  // the folder the sheets go to, or the one above it
  for (const at of [path.join(tmp, 'look'), tmp]) {
    link(outside, at, 'junction');
    const r = look(clip);
    assert.match(r.error, /isn't a folder of its own/, at);
    assert.deepEqual(fs.readdirSync(outside), [], at);
  }
});

test('a playlist or a script dressed up as a video is never followed to another file', { skip }, (t) => {
  const { root, look, made } = box(t, [['demo/video01/video/demo.mp4', 2, '64x36', 5]]);
  const dir = path.join(root, 'public', 'demo', 'video01', 'video');
  const real = path.join(dir, 'demo.mp4');
  fs.writeFileSync(path.join(dir, 'list.mp4'), `ffconcat version 1.0\nfile '${real}'\n`);
  fs.writeFileSync(path.join(dir, 'playlist.mp4'), `#EXTM3U\n#EXT-X-TARGETDURATION:2\n#EXTINF:2,\n${real}\n#EXT-X-ENDLIST\n`);
  fs.writeFileSync(path.join(dir, 'words.mp4'), 'just some text');
  for (const name of ['list.mp4', 'playlist.mp4', 'words.mp4']) {
    const r = look(path.join('public', 'demo', 'video01', 'video', name));
    assert.equal(r.code, 1, name);
    assert.match(r.error, /^Couldn't open .+ as a video/, name);
  }
  // A QuickTime file can say its picture is kept in another file. This one is all white, and stands outside the brand;
  // the copy inside it has its own picture blanked and points at the white one.
  const white = path.join(root, 'white.mov');
  const made1 = spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'color=white:size=64x36:rate=5:duration=2', '-c:v', 'rawvideo', '-pix_fmt', 'uyvy422', white], { windowsHide: true });
  assert.equal(made1.status, 0, String(made1.stderr));
  fs.writeFileSync(path.join(dir, 'points.mov'), pointingAt(fs.readFileSync(white), white));
  const brightness = (...read) => spawnSync('ffmpeg', ['-v', 'quiet', ...read, '-i', path.join(dir, 'points.mov'), '-vf', 'scale=1:1', '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], { windowsHide: true }).stdout[0];
  if (brightness('-enable_drefs', '1', '-use_absolute_path', '1') > 200) { // told to, ffmpeg does follow it: the file is a real one
    const r = look(path.join('public', 'demo', 'video01', 'video', 'points.mov'));
    if (r.ok) assert.ok(shade(r.sheets[0], 0, 2, 640, 360) < 200, 'the picture of a file outside the brand was shown');
    fs.rmSync(path.join(root, '.director', 'tmp'), { recursive: true, force: true });
  }
  assert.deepEqual(made(), []);
  // and every time ffmpeg or ffprobe opens the clip, it's told to open plain video only, whatever this machine's would do on its own
  const source = fs.readFileSync(path.join(root, 'tools', 'look.mjs'), 'utf8');
  assert.equal(source.match(/\.\.\.AS_VIDEO/g).length, source.match(/"ff(mpeg|probe)", \[/g).length);
  assert.equal(source.match(/"ff(mpeg|probe)", \[/g).length, 3);
});

test('times that make no sense are refused with what to give', { skip }, (t) => {
  const { look, made } = box(t, [['demo/video01/video/demo.mp4', 2, '64x36', 5]]);
  const clip = path.join('public', 'demo', 'video01', 'video', 'demo.mp4');
  for (const [flag, why] of [['--every=0', /above 0/], ['--every=abc', /number of seconds/], ['--every', /number of seconds/], ['--from=-1', /number of seconds/], ['--from=9', /--from must come before --to/], ['--from=1', null], ['--to=0.5', null]]) {
    const r = look(clip, flag);
    if (why) assert.match(r.error, why, flag);
    else assert.equal(r.ok, true, flag);
  }
  assert.equal(look().code, 1); // no clip named
  assert.equal(made().length, 1);
});

/** How bright the middle of frame `i` is on a sheet of cells `cols` across (0 black – 255 white). */
const shade = (sheet, i, cols, cellW, cellH) => {
  const x = 16 + (i % cols) * (cellW + 8) + cellW / 2 - 20, y = 56 + Math.floor(i / cols) * (cellH + 26 + 8) + cellH / 2 - 20;
  const r = spawnSync('ffmpeg', ['-v', 'error', '-i', sheet, '-vf', `crop=40:40:${x}:${y},scale=1:1`, '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], { windowsHide: true });
  assert.equal(r.status, 0, String(r.stderr));
  return r.stdout[0];
};
/**
 * A copy of a QuickTime file (its picture data before its index, as ffmpeg writes it) that says the picture is kept in
 * the file at `target`, with its own picture data blanked.
 */
const pointingAt = (movie, target) => {
  const boxAt = (kind, from, to) => {
    for (let at = from; at + 8 <= to; at += movie.readUInt32BE(at)) if (movie.toString('latin1', at + 4, at + 8) === kind) return at;
    throw new Error(`no ${kind} in the movie`);
  };
  const chain = [];
  for (let from = 0, to = movie.length, kind; (kind = ['moov', 'trak', 'mdia', 'minf', 'dinf', 'dref'][chain.length]); ) {
    const at = boxAt(kind, from, to);
    chain.push(at);
    [from, to] = [at + 8, at + movie.readUInt32BE(at)];
  }
  const where = Buffer.from(target.length % 2 ? `${target}\0` : target);
  const ints = (bytes, ...n) => {
    const b = Buffer.alloc(bytes * n.length);
    n.forEach((v, i) => b.writeIntBE(v, i * bytes, bytes));
    return b;
  };
  const alias = Buffer.concat([Buffer.alloc(130), ints(2, -1, -1), Buffer.alloc(16), ints(2, 2, where.length), where, ints(2, -1, 0)]); // a Mac alias: no volume, an absolute path
  const dref = Buffer.concat([ints(4, 16 + 12 + alias.length), Buffer.from('dref'), ints(4, 0, 1), ints(4, 12 + alias.length), Buffer.from('alis'), ints(4, 0), alias]);
  const old = chain.at(-1), grown = dref.length - movie.readUInt32BE(old);
  const out = Buffer.concat([movie.subarray(0, old), dref, movie.subarray(old + movie.readUInt32BE(old))]);
  for (const at of chain.slice(0, -1)) out.writeUInt32BE(out.readUInt32BE(at) + grown, at);
  const data = boxAt('mdat', 0, movie.length);
  assert.ok(data < chain[0], 'the picture data comes first');
  out.fill(0, data + 8, data + movie.readUInt32BE(data));
  return out;
};
/** Runs ffmpeg with the first set of arguments this machine's version accepts. */
const ffmpegAny = (...tries) => tries.some((args) => spawnSync('ffmpeg', ['-v', 'error', '-y', ...args], { windowsHide: true }).status === 0);

// Real uploads aren't steady, upright or square-pixelled. Each of these once put the wrong picture under a time, or drew
// the clip in the wrong shape.
test('a clip is shown as it plays: a still stretch holds its frame, and a sideways or wide-pixel clip stands upright', { skip }, (t) => {
  const { root, look } = box(t, [['demo/video01/video/flat.mp4', 2, '320x180', 30]]);
  const dir = path.join(root, 'public', 'demo', 'video01', 'video');
  const clip = (name) => path.join('public', 'demo', 'video01', 'video', name);

  // A screen recording stores a frame only when the picture changes: black for 2 s, nothing stored until 6 s, then white.
  const gap = ['-f', 'lavfi', '-i', 'color=black:size=320x180:rate=30:duration=10', '-vf', "drawbox=color=white:t=fill:enable='gte(t,2)',select='not(between(t,2,6))'"];
  assert.ok(ffmpegAny([...gap, '-fps_mode', 'vfr', '-pix_fmt', 'yuv420p', path.join(dir, 'gap.mp4')], [...gap, '-vsync', 'vfr', '-pix_fmt', 'yuv420p', path.join(dir, 'gap.mp4')]));
  const held = look(clip('gap.mp4'));
  assert.equal(held.frames, 10);
  const at = (second) => shade(held.sheets[0], second, 4, 300, 169);
  assert.ok(at(1) < 60, `1 s is black, got ${at(1)}`);
  for (const second of [3, 4, 5]) assert.ok(at(second) < 60, `${second} s still shows the black frame, got ${at(second)}`); // not the white one from 6 s
  assert.ok(at(7) > 200, `7 s is white, got ${at(7)}`);
  // Looking from the middle of the still stretch: the frame on screen there was stored before it.
  const from3 = look(clip('gap.mp4'), '--from=3', '--to=9');
  assert.equal(from3.frames, 6); // 3, 4 … 8 s: 8 or fewer, so drawn large
  const later = (second) => shade(from3.sheets[0], second - 3, 2, 640, 360);
  for (const second of [3, 4, 5]) assert.ok(later(second) < 60, `from 3 s, ${second} s still shows the black frame, got ${later(second)}`);
  assert.ok(later(7) > 200, `from 3 s, 7 s is white, got ${later(7)}`);

  // A phone clip stored sideways, with a note to turn it.
  if (ffmpegAny(['-display_rotation', '90', '-i', path.join(dir, 'flat.mp4'), '-c', 'copy', path.join(dir, 'turned.mp4')])) {
    const turned = look(clip('turned.mp4'));
    assert.deepEqual([turned.width, turned.height], [180, 320]);
    assert.equal(pngWidth(turned.sheets[0]), 16 * 2 + 4 * 360 + 3 * 8); // laid out as a tall clip
  }

  // A 9:16 film stored as 1280×720 with narrow pixels.
  assert.ok(ffmpegAny(['-f', 'lavfi', '-i', 'testsrc2=size=1280x720:rate=5:duration=2', '-vf', 'setsar=81/256', '-pix_fmt', 'yuv420p', path.join(dir, 'narrow.mp4')]));
  const narrow = look(clip('narrow.mp4'));
  assert.deepEqual([narrow.width, narrow.height], [405, 720]);
  assert.equal(pngWidth(narrow.sheets[0]), 16 * 2 + 4 * 360 + 3 * 8);

  // A sliver of a picture gets a cell that shows, on a sheet that fits a screen.
  assert.ok(ffmpegAny(['-f', 'lavfi', '-i', 'testsrc2=size=64x2000:rate=5:duration=2', '-pix_fmt', 'yuv420p', path.join(dir, 'tower.mp4')]));
  const tower = look(clip('tower.mp4'));
  assert.deepEqual([tower.width, tower.height], [64, 2000]);
  assert.deepEqual(pngSize(tower.sheets[0]), [16 * 2 + 4 * 360 + 3 * 8, 16 * 2 + 40 + 3 * 360 + 26]); // a cell at most 3 times as tall as wide

  // A browser's recording doesn't say how long it is: the caller says how far to look.
  if (ffmpegAny(['-f', 'lavfi', '-i', 'testsrc2=size=320x180:rate=30:duration=3', '-c:v', 'libvpx', '-b:v', '300k', '-f', 'webm', '-live', '1', path.join(dir, 'live.webm')])) {
    const unknown = look(clip('live.webm'));
    if (unknown.code) { // (an ffmpeg that works the length out anyway is fine too)
      assert.match(unknown.error, /doesn't say how long it is\. Say how far to look: --to=<s>/);
      const told = look(clip('live.webm'), '--to=3');
      assert.deepEqual([told.ok, told.seconds, told.to, told.frames], [true, null, 3, 3]);
    }
  }
});
