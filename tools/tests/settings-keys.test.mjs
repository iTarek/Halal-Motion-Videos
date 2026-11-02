// A saved key that stopped working must block nothing else: Settings saves what changed, the key can be removed, and
// speech to text falls back to local Whisper. Runs a real dashboard on a temp copy with the network faked.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));

/** A temp copy of the tools, with a fake ElevenLabs and Google that log each call. Only "good-key" works at ElevenLabs. */
const sandbox = (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-keys-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.cpSync(path.join(REPO, 'tools'), path.join(root, 'tools'), { recursive: true, filter: (src) => !src.includes('__pycache__') });
  fs.symlinkSync(path.join(REPO, 'node_modules'), path.join(root, 'node_modules'), 'junction');
  fs.mkdirSync(path.join(root, 'src', 'brands'), { recursive: true });
  fs.mkdirSync(path.join(root, '.director'));
  const log = path.join(root, 'calls.log');
  const mock = path.join(root, 'mock-fetch.mjs');
  fs.writeFileSync(mock, `import fs from 'node:fs';
const local = globalThis.fetch;
globalThis.fetch = async (url, init = {}) => {
  url = String(url);
  if (url.includes('127.0.0.1')) return local(url, init);
  fs.appendFileSync(${JSON.stringify(log)}, url + '\\n');
  const reply = (j, status = 200) => new Response(JSON.stringify(j), { status });
  if (url.includes('api.elevenlabs.io')) return init.headers?.['xi-api-key'] === 'good-key' ? reply({ name: 'Rachel' }) : reply({}, 401);
  if (url.includes('generativelanguage.googleapis.com')) return reply({});
  throw new Error('unexpected call: ' + url);
};
`);
  const settingsFile = path.join(root, '.director', 'settings.json');
  return {
    root, mock,
    write: (s) => fs.writeFileSync(settingsFile, JSON.stringify(s)),
    read: () => JSON.parse(fs.readFileSync(settingsFile, 'utf8')),
    calls: () => (fs.existsSync(log) ? fs.readFileSync(log, 'utf8').trim().split('\n') : []),
    forget: () => fs.rmSync(log, { force: true }),
  };
};

const startDashboard = async (t, box, env = {}) => {
  const port = await new Promise((resolve) => { const s = net.createServer().listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => resolve(p)); }); });
  const proc = spawn(process.execPath, ['--import', pathToFileURL(box.mock).href, path.join(box.root, 'tools', 'dashboard', 'server.mjs')],
    { env: { ...process.env, PORT: String(port), ELEVENLABS_API_KEY: '', ...env }, windowsHide: true });
  t.after(() => proc.kill());
  let out = '';
  proc.stdout.setEncoding('utf8');
  proc.stderr.setEncoding('utf8');
  proc.stderr.on('data', (x) => (out += x));
  await new Promise((resolve, reject) => {
    proc.stdout.on('data', (x) => { out += x; if (out.includes('dashboard →')) resolve(); });
    proc.on('close', () => reject(new Error(out)));
  });
  const save = async (body) => {
    const r = await fetch(`http://127.0.0.1:${port}/api/settings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return { status: r.status, ...(await r.json()) };
  };
  return { port, save };
};

test("a saved ElevenLabs key that stopped working doesn't block saving anything else", async (t) => {
  const box = sandbox(t);
  box.write({ elevenlabs: { apiKey: 'dead-key' }, gemini: { apiKey: 'gemini-key' } });
  const { save } = await startDashboard(t, box);
  // what the screen sends: every field, the ElevenLabs ones untouched
  const r = await save({ apiKey: '', voiceId: 'NOpBlnGInO9m6vDvFkFC', model: 'eleven_v4', geminiKey: '', geminiVoice: 'Kore', geminiModel: 'gemini-3.8-flash-tts', voiceProvider: 'gemini' });
  assert.equal(r.status, 200, r.error);
  assert.equal(r.provider, 'gemini');
  assert.equal(box.read().gemini.voice, 'Kore');
  assert.equal(box.read().elevenlabs.apiKey, 'dead-key');
  assert.deepEqual(box.calls(), []); // nobody asked
});

test('a new key, or a new voice on a saved key, is still checked', async (t) => {
  const box = sandbox(t);
  box.write({ elevenlabs: { apiKey: 'dead-key' } });
  const { save } = await startDashboard(t, box);
  let r = await save({ apiKey: 'wrong-key' }); // a typed key that's wrong is refused, and nothing is written
  assert.equal(r.status, 400);
  assert.match(r.error, /rejected the API key/);
  assert.equal(box.read().elevenlabs.apiKey, 'dead-key');
  r = await save({ voiceId: 'AnotherVoice123' }); // a new voice can't be confirmed with a dead key
  assert.equal(r.status, 400);
  r = await save({ apiKey: 'good-key' });
  assert.equal(r.status, 200, r.error);
  assert.equal(r.elevenlabs.voiceName, 'Rachel');
  box.forget();
  r = await save({ voiceId: 'AnotherVoice123' });
  assert.equal(r.status, 200, r.error);
  assert.equal(box.calls().length, 1);
});

test('either key can be removed, and the other then narrates', async (t) => {
  const box = sandbox(t);
  box.write({ elevenlabs: { apiKey: 'dead-key' }, gemini: { apiKey: 'gemini-key' } });
  const { save } = await startDashboard(t, box);
  let r = await save({ clearKey: true });
  assert.equal(r.status, 200, r.error);
  assert.equal(r.elevenlabs.hasKey, false);
  assert.equal(r.gemini.hasKey, true);
  assert.equal(r.provider, 'gemini');
  assert.deepEqual(box.calls(), []); // removing asks nobody
  await save({ apiKey: 'good-key' });
  r = await save({ clearGeminiKey: true });
  assert.equal(r.status, 200, r.error);
  assert.equal(r.gemini.hasKey, false);
  assert.equal(r.provider, 'elevenlabs');
});

test('agents can remove a key too', async (t) => {
  const box = sandbox(t);
  box.write({ elevenlabs: { apiKey: 'dead-key' }, gemini: { apiKey: 'gemini-key' } });
  const { port } = await startDashboard(t, box);
  const cli = (...args) => spawnSync(process.execPath, [path.join(box.root, 'tools', 'video.mjs'), 'voice-settings', ...args, '--json'],
    { env: { ...process.env, PORT: String(port) }, encoding: 'utf8', input: 'some-key', windowsHide: true });
  const both = cli('--clear-key', '--key-stdin');
  assert.equal(both.status, 1);
  assert.match(both.stdout + both.stderr, /Replace a key or remove it/);
  const r = cli('--clear-key');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(JSON.parse(r.stdout).hasKey, false);
  assert.equal(box.read().elevenlabs.apiKey, '');
});

test('a key from the environment says where to remove it', async (t) => {
  const box = sandbox(t);
  box.write({});
  const { save } = await startDashboard(t, box, { ELEVENLABS_API_KEY: 'env-key' });
  const r = await save({ clearKey: true });
  assert.equal(r.status, 400);
  assert.match(r.error, /ELEVENLABS_API_KEY in your environment/);
});

test('speech to text falls back to Whisper when ElevenLabs rejects the key, if Gemini is set up', (t) => {
  const box = sandbox(t);
  const audio = path.join(box.root, 'line.mp3');
  fs.writeFileSync(audio, 'audio');
  // install: false, so reaching Whisper shows as "not installed" rather than a 500 MB download
  const hear = () => spawnSync(process.execPath, ['--import', pathToFileURL(box.mock).href, '--input-type=module', '-e',
    `import { transcribe } from ${JSON.stringify(pathToFileURL(path.join(box.root, 'tools', 'transcribe.mjs')).href)};
     await transcribe(${JSON.stringify(audio)}, { install: false });`], { env: { ...process.env, ELEVENLABS_API_KEY: '', HMV_TICKET: '', HMV_DASHBOARD: '' }, encoding: 'utf8', windowsHide: true }).stderr;
  box.write({ elevenlabs: { apiKey: 'dead-key' }, gemini: { apiKey: 'gemini-key' } });
  assert.match(hear(), /Local Whisper isn't installed yet/);
  box.write({ elevenlabs: { apiKey: 'dead-key' } });
  assert.match(hear(), /ElevenLabs rejected the API key/);
});
