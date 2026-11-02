// A render bundle is about 500 MB in the temp folder: it goes when the run ends, however it ends.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const LIB = pathToFileURL(fileURLToPath(new URL('../lib.mjs', import.meta.url))).href;
const folder = (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-bundle-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(path.join(dir, 'bundle.js'), 'x');
  return dir;
};
const script = (dir, then) => `import { removeOnExit } from ${JSON.stringify(LIB)}; removeOnExit(${JSON.stringify(dir)}); ${then}`;

test('the folder goes when the run ends normally, or with an error', (t) => {
  for (const [then, code] of [['', 0], ['process.exit(3);', 3], ['throw new Error("render failed");', 1]]) {
    const dir = folder(t);
    const r = spawnSync(process.execPath, ['--input-type=module', '-e', script(dir, then)], { encoding: 'utf8', windowsHide: true });
    assert.equal(r.status, code, r.stderr);
    assert.equal(fs.existsSync(dir), false, `still there after: ${then || 'a normal end'}`);
  }
});

test('the folder goes when a run is stopped', { skip: process.platform === 'win32' }, async (t) => {
  for (const [signal, code] of [['SIGTERM', 143], ['SIGINT', 130]]) {
    const dir = folder(t);
    const child = spawn(process.execPath, ['--input-type=module', '-e', script(dir, 'console.log("ready"); setInterval(() => {}, 1000);')], { stdio: ['ignore', 'pipe', 'inherit'] });
    await new Promise((resolve) => child.stdout.once('data', resolve));
    const ended = new Promise((resolve) => child.once('close', resolve));
    child.kill(signal);
    assert.equal(await ended, code);
    assert.equal(fs.existsSync(dir), false, `still there after ${signal}`);
  }
});
