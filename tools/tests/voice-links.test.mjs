// `npm run voice` also runs outside the Director's sandbox, for it. A link the Director leaves in its folders must not make
// it write to a protected file, or read one into a file the Director can then read. The network is faked.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const SECRET = JSON.stringify({ apiKey: 'secret-key-1234' });

const setUp = (t, settings) => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-voice-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.cpSync(path.join(REPO, 'tools'), path.join(root, 'tools'), { recursive: true, filter: (src) => !src.includes('__pycache__') });
  fs.symlinkSync(path.join(REPO, 'node_modules'), path.join(root, 'node_modules'), 'junction');
  const src = path.join(root, 'src', 'brands', 'demo', 'video01');
  const vo = path.join(root, 'public', 'demo', 'video01', 'vo');
  fs.mkdirSync(src, { recursive: true });
  fs.mkdirSync(vo, { recursive: true });
  fs.mkdirSync(path.join(root, '.director'));
  fs.writeFileSync(path.join(root, '.director', 'settings.json'), JSON.stringify(settings));
  fs.writeFileSync(path.join(src, 'voiceover.json'), JSON.stringify({ language: 'en', lines: [{ id: 'a', text: 'Hello there.' }] }));
  const mock = path.join(root, 'mock.mjs');
  fs.writeFileSync(mock, `const json = (j) => new Response(JSON.stringify(j));
globalThis.fetch = async (url) => {
  url = String(url);
  if (url.includes('generativelanguage')) return json({ candidates: [{ content: { parts: [{ inlineData: { mimeType: 'audio/L16;codec=pcm;rate=24000', data: Buffer.alloc(4800).toString('base64') } }] } }] });
  if (url.endsWith('/speech-to-text')) return json({ text: 'Hello there.', words: [{ type: 'word', text: 'Hello', start: 0, end: 0.1 }, { type: 'word', text: 'there.', start: 0.1, end: 0.2 }] });
  if (url.includes('/text-to-speech/')) return json({ audio_base64: Buffer.from('mp3').toString('base64'), alignment: null });
  throw new Error('unexpected call: ' + url);
};
`);
  // something protected outside the video's folders, and a link at every path the tool writes
  const secret = path.join(root, 'protected.json');
  fs.writeFileSync(secret, SECRET);
  const links = [path.join(vo, 'a.mp3'), path.join(vo, 'a.mp3.part'), path.join(vo, 'a.part.mp3'), path.join(vo, '.cache.json'), path.join(vo, '.cache.json.part'), path.join(src, 'voiceover.gen.ts'), path.join(src, 'voiceover.gen.ts.part')];
  for (const l of links) fs.symlinkSync(secret, l);
  const env = { ...process.env, ELEVENLABS_API_KEY: '', HMV_TICKET: '', HMV_DASHBOARD: '' };
  const run = () => spawnSync(process.execPath, ['--import', pathToFileURL(mock).href, path.join(root, 'tools', 'voice.mjs'), 'demo', 'video01'], { env, encoding: 'utf8', windowsHide: true });
  return { secret, vo, src, run };
};

for (const [provider, settings] of [
  ['ElevenLabs', { elevenlabs: { apiKey: 'test-key' } }],
  ['Gemini', { elevenlabs: { apiKey: 'test-key' }, gemini: { apiKey: 'test-key' }, voiceProvider: 'gemini' }],
])
  test(`${provider}: a link left in its way is replaced, and nothing goes through it`, { skip: process.platform === 'win32' && 'links need Developer Mode' }, (t) => {
    const { secret, vo, src, run } = setUp(t, settings);
    const r = run();
    assert.equal(r.status, 0, r.stderr);
    assert.equal(fs.readFileSync(secret, 'utf8'), SECRET, 'the protected file was written');
    for (const f of [path.join(vo, 'a.mp3'), path.join(vo, '.cache.json'), path.join(src, 'voiceover.gen.ts')]) {
      const st = fs.lstatSync(f);
      assert.ok(st.isFile() && !st.isSymbolicLink(), `${path.basename(f)} is still a link`);
      assert.ok(!fs.readFileSync(f, 'utf8').includes('secret-key-1234'), `${path.basename(f)} holds what the link pointed at`);
    }
    assert.ok(JSON.parse(fs.readFileSync(path.join(vo, '.cache.json'), 'utf8')).a);
    assert.match(fs.readFileSync(path.join(src, 'voiceover.gen.ts'), 'utf8'), /export const VO/);
  });
