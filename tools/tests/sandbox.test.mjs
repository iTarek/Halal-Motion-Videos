import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { canSandbox, SANDBOX_EXEC, sandboxEnv, sandboxProfile } from '../dashboard/sandbox.mjs';
import { checkToolRequest } from '../broker.mjs';

const run = { brand: 'demo', video: 'video01' };

test('the dashboard runs voice and shot only for the run\'s own video, with known flags and web addresses', () => {
  assert.deepEqual(checkToolRequest('voice', ['demo', 'video01', '--only=intro'], run), ['demo', 'video01', '--only=intro']);
  assert.ok(checkToolRequest('shot', ['demo', '--url=https://example.com', '--id=home'], run)); // brand kit
  assert.ok(checkToolRequest('shot', ['demo', 'video01', '--only=home,settings'], run));
  for (const [tool, args] of [
    ['render', ['demo', 'video01']],
    ['voice', ['other', 'video01']],
    ['voice', ['demo', 'video02']],
    ['voice', ['demo']],
    ['shot', ['demo', 'video02']],
    ['shot', ['demo', '--url=file:///etc/passwd', '--id=x']],
    ['shot', ['demo', '--out=/tmp/x']],
    ['voice', 'demo video01'],
  ]) assert.throws(() => checkToolRequest(tool, args, run), undefined, `${tool} ${args}`);
});

test('a sandboxed engine gets no secrets in its environment but its own login', () => {
  const env = sandboxEnv({ PATH: '/bin', HOME: '/h', ELEVENLABS_API_KEY: 'x', GITHUB_TOKEN: 'x', AWS_SECRET_ACCESS_KEY: 'x', OPENAI_API_KEY: 'x' }, ['OPENAI_API_KEY']);
  assert.deepEqual(Object.keys(env).sort(), ['HOME', 'OPENAI_API_KEY', 'PATH']);
});

test('the macOS sandbox keeps writes in the repo and hides the keys, the browser profiles and the home folder', { skip: !canSandbox() && 'macOS only' }, t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-sandbox-repo-'));
  const outside = fs.mkdtempSync(path.join(os.homedir(), '.hmv-sandbox-test-')); // in the home folder, not in the allowlist
  t.after(() => {
    for (const d of [root, outside]) {
      assert.ok(/hmv-sandbox-(repo|test)-/.test(path.basename(d)));
      fs.rmSync(d, { recursive: true, force: true });
    }
  });
  for (const d of ['.git', 'out', '.director/browser']) fs.mkdirSync(path.join(root, d), { recursive: true });
  fs.mkdirSync(path.join(outside, 'project'));
  const settingsFile = path.join(root, '.director/settings.json');
  fs.writeFileSync(settingsFile, '{}');
  fs.writeFileSync(path.join(root, '.director/browser/cookie'), 'c');
  fs.writeFileSync(path.join(outside, 'secret.txt'), 's');
  fs.writeFileSync(path.join(outside, 'project/readme.txt'), 'r');
  const profile = sandboxProfile({ root, engineHome: path.join(outside, 'engine'), projectFolder: path.join(outside, 'project'), settingsFile, browserDir: path.join(root, '.director/browser') });
  const ok = (cmd, p = profile) => spawnSync(SANDBOX_EXEC, ['-p', p, '/bin/sh', '-c', cmd], { cwd: root, stdio: 'ignore' }).status === 0;
  for (const cmd of ['echo x > a.txt', 'echo x > out/frame.jpg', `cat '${outside}/project/readme.txt'`]) assert.ok(ok(cmd), `allowed: ${cmd}`);
  for (const cmd of [
    'echo x > .git/x', 'echo x > out/film.mp4', `echo x > '${outside}/x'`, `echo x > '${outside}/project/x'`,
    `cat '${outside}/secret.txt'`, `ls '${os.homedir()}'`, 'cat .director/settings.json', 'echo x > .director/settings.json', 'cat .director/browser/cookie',
  ]) assert.ok(!ok(cmd), `blocked: ${cmd}`);
  // exceptions that are the home folder or hold it are dropped, never widened into "all of home"
  const wide = sandboxProfile({ root, engineHome: os.homedir(), projectFolder: path.dirname(os.homedir()), settingsFile, browserDir: path.join(root, '.director/browser') });
  for (const cmd of [`cat '${outside}/secret.txt'`, `echo x > '${outside}/x'`]) assert.ok(!ok(cmd, wide), `still blocked: ${cmd}`);
});
