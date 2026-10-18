import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { canSandbox, SANDBOX_EXEC, sandboxEnv, sandboxProfile } from '../dashboard/sandbox.mjs';
import { checkHearRequest, checkToolRequest } from '../broker.mjs';

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
    ['review', ['demo', 'video01']], // stays in the sandbox: it bundles the Director's code
  ]) assert.throws(() => checkToolRequest(tool, args, run), undefined, `${tool} ${args}`);
});

test('the dashboard hears only a real WAV in the run\'s own review folder, with no link out of it', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-hear-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const wav = Buffer.concat([Buffer.from('RIFF\0\0\0\0WAVEfmt '), Buffer.alloc(32)]);
  const mine = path.join(root, '.director/tmp/demo-video01/review');
  for (const d of [mine, path.join(root, '.director/tmp/demo-video02'), path.join(root, 'elsewhere')]) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(mine, 'soundtrack.wav'), wav);
  fs.writeFileSync(path.join(mine, 'fake.wav'), '{"elevenlabs":{"apiKey":"x"}}');
  fs.writeFileSync(path.join(root, '.director/tmp/demo-video02/soundtrack.wav'), wav);
  fs.writeFileSync(path.join(root, 'elsewhere/private.wav'), wav);
  fs.symlinkSync(path.join(root, 'elsewhere/private.wav'), path.join(mine, 'link.wav'));
  fs.linkSync(path.join(root, 'elsewhere/private.wav'), path.join(mine, 'hard.wav'));
  fs.symlinkSync(path.join(root, 'elsewhere'), path.join(root, '.director/tmp/demo-video01/linked'));
  assert.equal(checkHearRequest('.director/tmp/demo-video01/review/soundtrack.wav', run, root), fs.realpathSync(path.join(mine, 'soundtrack.wav')));
  for (const file of [
    path.join(mine, 'fake.wav'), path.join(mine, 'link.wav'), path.join(mine, 'hard.wav'), '.director/tmp/demo-video01/linked/private.wav',
    '.director/tmp/demo-video02/soundtrack.wav', '.director/tmp/demo-video01/review/../../demo-video02/soundtrack.wav', 'elsewhere/private.wav',
    path.join(mine, 'missing.wav'), '', undefined, 42,
  ]) assert.throws(() => checkHearRequest(file, run, root), undefined, String(file));
});

test('speech to text: words become phrases at sentence ends and pauses', async t => {
  const { phrasesOf, transcribe } = await import('../transcribe.mjs');
  const w = (text, start, end) => ({ text, start, end });
  assert.deepEqual(phrasesOf([w('Every', 0.36, 0.4), w('prayer,', 0.48, 1.1), w('on', 1.2, 1.3), w('time.', 1.4, 1.8), w('Find', 2.0, 2.2), w('qibla', 2.3, 2.6), w('fast', 3.4, 3.7)]),
    [{ text: 'Every prayer, on time.', start: 0.36, end: 1.8 }, { text: 'Find qibla', start: 2.0, end: 2.6 }, { text: 'fast', start: 3.4, end: 3.7 }]);
  // the API's answer is reduced to spoken words (no spacing, no audio events), times rounded
  const saved = { fetch: globalThis.fetch, key: process.env.ELEVENLABS_API_KEY };
  t.after(() => { globalThis.fetch = saved.fetch; if (saved.key === undefined) delete process.env.ELEVENLABS_API_KEY; else process.env.ELEVENLABS_API_KEY = saved.key; });
  process.env.ELEVENLABS_API_KEY = 'test-key';
  let sent;
  globalThis.fetch = async (url, init) => { sent = { url, model: init.body.get('model_id'), key: init.headers['xi-api-key'] };
    return new Response(JSON.stringify({ text: ' Hi there. ', language_code: 'en', words: [
      { text: 'Hi', start: 0.1234, end: 0.3, type: 'word' }, { text: ' ', start: 0.3, end: 0.35, type: 'spacing' },
      { text: '(laughs)', start: 0.35, end: 0.5, type: 'audio_event' }, { text: 'there.', start: 0.5, end: 0.9, type: 'word' }] }), { status: 200 }); };
  const file = path.join(os.tmpdir(), `hmv-stt-${process.pid}.wav`);
  fs.writeFileSync(file, 'RIFF');
  t.after(() => fs.rmSync(file, { force: true }));
  const heard = await transcribe(file, { language: 'en' });
  assert.equal(sent.url, 'https://api.elevenlabs.io/v1/speech-to-text'); assert.equal(sent.model, 'scribe_v2'); assert.equal(sent.key, 'test-key');
  assert.deepEqual(heard, { text: 'Hi there.', language: 'en', words: [{ text: 'Hi', start: 0.123, end: 0.3 }, { text: 'there.', start: 0.5, end: 0.9 }] });
  // inside the sandbox it never touches the key: it asks the dashboard, with the run's ticket
  const env = { ticket: process.env.HMV_TICKET, dashboard: process.env.HMV_DASHBOARD };
  t.after(() => { for (const [k, v] of [['HMV_TICKET', env.ticket], ['HMV_DASHBOARD', env.dashboard]]) if (v === undefined) delete process.env[k]; else process.env[k] = v; });
  Object.assign(process.env, { HMV_TICKET: 't1', HMV_DASHBOARD: 'http://127.0.0.1:4000' });
  globalThis.fetch = async (url, init) => { sent = { url: String(url), body: JSON.parse(init.body) }; return new Response(JSON.stringify({ text: 'Hi.', language: 'en', words: [] }), { status: 200 }); };
  assert.deepEqual(await transcribe(file, { language: 'en' }), { text: 'Hi.', language: 'en', words: [] });
  assert.deepEqual(sent, { url: 'http://127.0.0.1:4000/api/director/hear', body: { file, language: 'en', ticket: 't1' } });
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
