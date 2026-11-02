// Gemini voice-over: who narrates, the request Google gets, the audio that comes back, and how the script's words are
// timed to what speech to text heard. ElevenLabs stays the default: nobody without a Gemini key sees a change.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { voiceFits, voiceProviderOf } from '../settings.mjs';
import { checkGemini, geminiSpeech } from '../gemini.mjs';
import { alignWords, heardProblems, problemLine } from '../transcribe.mjs';

const settings = (el, gm, voiceProvider = 'elevenlabs') => ({ elevenlabs: { apiKey: el }, gemini: { apiKey: gm }, voiceProvider });

test('ElevenLabs narrates unless Gemini is picked or the only key', () => {
  assert.equal(voiceProviderOf(settings('el', '')), 'elevenlabs'); // today's users: unchanged
  assert.equal(voiceProviderOf(settings('', '')), ''); // no key: no voice-over, as before
  assert.equal(voiceProviderOf(settings('el', 'gm')), 'elevenlabs'); // a Gemini key alone doesn't switch anyone
  assert.equal(voiceProviderOf(settings('el', 'gm', 'gemini')), 'gemini');
  assert.equal(voiceProviderOf(settings('', 'gm')), 'gemini'); // Gemini only: Gemini
  assert.equal(voiceProviderOf(settings('el', '', 'gemini')), 'elevenlabs'); // picked without its key: the one that has one
});

test('a video keeps a voice only for the provider it belongs to', () => {
  assert.equal(voiceFits('gemini', 'kore'), 'Kore');
  assert.equal(voiceFits('gemini', 'NOpBlnGInO9m6vDvFkFC'), '');
  assert.equal(voiceFits('elevenlabs', 'NOpBlnGInO9m6vDvFkFC'), 'NOpBlnGInO9m6vDvFkFC');
  assert.equal(voiceFits('elevenlabs', 'Achernar'), ''); // a Gemini name never reaches ElevenLabs
  assert.equal(voiceFits('elevenlabs', ''), '');
});

// settings.mjs finds its file from where it lives, so a copy in a temp folder reads and writes there: never the real keys
test('saving settings keeps both keys, adds Gemini only once it is used, and reads a hand-broken file safely', async t => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-settings-'))); // macOS: /var is /private/var
  const envKey = process.env.ELEVENLABS_API_KEY;
  delete process.env.ELEVENLABS_API_KEY;
  t.after(() => {
    if (envKey !== undefined) process.env.ELEVENLABS_API_KEY = envKey;
    fs.rmSync(root, { recursive: true, force: true });
  });
  fs.mkdirSync(path.join(root, 'tools'));
  fs.copyFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'settings.mjs'), path.join(root, 'tools', 'settings.mjs'));
  const m = await import(pathToFileURL(path.join(root, 'tools', 'settings.mjs')).href);
  assert.equal(m.SETTINGS_FILE, path.join(root, '.director', 'settings.json'));
  const onDisk = () => JSON.parse(fs.readFileSync(m.SETTINGS_FILE, 'utf8'));

  // ElevenLabs only: no gemini section appears
  m.writeSettings({ elevenlabs: { apiKey: 'el-key' } });
  assert.ok(!('gemini' in onDisk()));
  if (process.platform !== 'win32') assert.equal(fs.statSync(m.SETTINGS_FILE).mode & 0o777, 0o600);
  // a partial patch, or gemini: undefined, keeps every saved key
  m.writeSettings({ gemini: { apiKey: 'gm-key', voice: 'Kore' } });
  m.writeSettings({ gemini: { voice: 'Puck' } });
  m.writeSettings({ gemini: undefined, voiceProvider: 'gemini' });
  assert.deepEqual(onDisk(), { elevenlabs: { apiKey: 'el-key' }, gemini: { apiKey: 'gm-key', voice: 'Puck' }, voiceProvider: 'gemini' });
  assert.equal(m.voiceProviderOf(), 'gemini');

  // hand-broken values fall back to the defaults instead of reaching a caller
  const broken = (gemini) => {
    fs.writeFileSync(m.SETTINGS_FILE, JSON.stringify({ gemini, voiceProvider: 'gemini' }));
    return m.readSettings();
  };
  for (const g of ['x', null, { apiKey: 1234, voice: 'Nobody', model: 'nope' }]) {
    const st = broken(g);
    assert.deepEqual(st.gemini, { apiKey: '', voice: 'Sadachbia', model: 'gemini-3.8-flash-tts' }, JSON.stringify(g));
    assert.equal(m.voiceProviderOf(st), ''); // no usable key: no voice-over
  }
  // a file holding just null reads and saves as empty (doctor and setup read it before anything else)
  fs.writeFileSync(m.SETTINGS_FILE, 'null');
  assert.equal(m.voiceProviderOf(), '');
  m.writeSettings({ voiceProvider: 'elevenlabs' });
  assert.deepEqual(onDisk(), { elevenlabs: {}, voiceProvider: 'elevenlabs' });
});

test('Gemini gets the text word for word, the style beside it, the key in a header; WAV or PCM comes back as WAV', async t => {
  const saved = globalThis.fetch;
  t.after(() => { globalThis.fetch = saved; });
  let sent;
  const reply = (inlineData) => async (url, init) => {
    sent = { url: String(url), key: init.headers['x-goog-api-key'], body: JSON.parse(init.body) };
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ inlineData }] } }] }), { status: 200 });
  };
  const wav = Buffer.concat([Buffer.from('RIFF\0\0\0\0WAVEfmt '), Buffer.alloc(32)]);
  globalThis.fetch = reply({ mimeType: 'audio/wav', data: wav.toString('base64') });
  const out = await geminiSpeech({ key: 'k', text: 'Every prayer <short pause> on time.', style: 'warm', voice: 'Kore', model: 'gemini-3.8-flash-tts' });
  assert.equal(sent.url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent');
  assert.equal(sent.key, 'k');
  assert.ok(!sent.url.includes('key='), 'the key never goes in the URL');
  assert.deepEqual(sent.body.contents[0].parts[0], { text: 'Every prayer <short pause> on time.', speech_metadata: { style: 'warm' } });
  assert.deepEqual(sent.body.generationConfig, { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { voice: 'Kore' } } });
  assert.ok(out.equals(wav), 'WAV passes through untouched');
  // raw PCM gets a WAV header at its own rate
  globalThis.fetch = reply({ mimeType: 'audio/L16;codec=pcm;rate=24000', data: Buffer.alloc(480).toString('base64') });
  const pcm = await geminiSpeech({ key: 'k', text: 'Hi.', voice: 'Kore', model: 'gemini-3.8-flash-tts' });
  assert.equal(pcm.toString('latin1', 0, 4), 'RIFF');
  assert.equal(pcm.readUInt32LE(24), 24000);
  assert.equal(pcm.length, 44 + 480);
  assert.ok(!('speech_metadata' in sent.body.contents[0].parts[0]), 'no style, no speech_metadata');
  // what goes wrong reads plainly
  globalThis.fetch = async () => new Response('{"error":{"status":"INVALID_ARGUMENT","details":[{"reason":"API_KEY_INVALID"}]}}', { status: 400 });
  await assert.rejects(geminiSpeech({ key: 'bad', text: 'Hi.', voice: 'Kore', model: 'gemini-3.8-flash-tts' }), /rejected the Gemini API key/);
  assert.deepEqual(await checkGemini('bad', 'gemini-3.8-flash-tts'), { ok: false, error: 'Google rejected the Gemini API key (Settings).' });
  globalThis.fetch = async () => new Response(JSON.stringify({ candidates: [{ finishReason: 'SAFETY', content: { parts: [] } }] }), { status: 200 });
  await assert.rejects(geminiSpeech({ key: 'k', text: 'Hi.', voice: 'Kore', model: 'gemini-3.8-flash-tts' }), /no audio \(SAFETY\)/);
});

test('every Gemini failure reads plainly: Google says why, not its JSON; no bare "fetch failed" or SyntaxError', async t => {
  const saved = globalThis.fetch;
  t.after(() => { globalThis.fetch = saved; });
  const speak = () => geminiSpeech({ key: 'k', text: 'Hi.', voice: 'Kore', model: 'gemini-3.8-flash-tts' });
  const failWith = (status, body) => { globalThis.fetch = async () => new Response(body, { status }); };
  const google = (code, status, message) => JSON.stringify({ error: { code, message, status } });
  failWith(401, google(401, 'UNAUTHENTICATED', 'Request had invalid authentication credentials.'));
  await assert.rejects(speak(), { message: 'Google rejected the Gemini API key (Settings).' });
  failWith(403, google(403, 'PERMISSION_DENIED', 'Permission denied.'));
  await assert.rejects(speak(), /isn't allowed to do that \(403\)/);
  failWith(404, google(404, 'NOT_FOUND', 'models/nope is not found.'));
  await assert.rejects(speak(), { message: "Gemini doesn't know that model (404)." });
  failWith(429, google(429, 'RESOURCE_EXHAUSTED', 'Quota exceeded.'));
  await assert.rejects(speak(), /rate limit or quota/);
  // any other status: Google's own message, not the JSON around it
  failWith(400, google(400, 'INVALID_ARGUMENT', 'Voice name is not valid.'));
  await assert.rejects(speak(), { message: 'Gemini 400: Voice name is not valid.' });
  failWith(503, google(503, 'UNAVAILABLE', 'The model is overloaded. Please try again later.'));
  await assert.rejects(speak(), { message: 'Gemini 503: The model is overloaded. Please try again later.' });
  assert.deepEqual(await checkGemini('k', 'gemini-3.8-flash-tts'), { ok: false, error: 'Gemini 503: The model is overloaded. Please try again later.' });
  failWith(502, '<html>Bad Gateway</html>'); // not JSON: the start of what came back
  await assert.rejects(speak(), { message: 'Gemini 502: <html>Bad Gateway</html>' });
  // no answer, or a 200 that isn't JSON (a proxy's page)
  globalThis.fetch = async () => { throw new TypeError('fetch failed'); };
  await assert.rejects(speak(), { message: "Couldn't reach Gemini (fetch failed)." });
  failWith(200, '<html>Sign in to the Wi-Fi</html>');
  await assert.rejects(speak(), { message: "Gemini sent a reply that isn't JSON: try again." });
});

test("the script's own words are timed to what was heard, however it was split or spelled", () => {
  const w = (text, start, end) => ({ text, start, end });
  // heard as written: each word takes its heard time
  assert.deepEqual(alignWords('Every prayer, on time.', [w('Every', 0.3, 0.6), w('prayer,', 0.6, 1.1), w('on', 1.6, 1.8), w('time.', 1.8, 2.4)]),
    [w('Every', 0.3, 0.6), w('prayer,', 0.6, 1.1), w('on', 1.6, 1.8), w('time.', 1.8, 2.4)]);
  // cues and tags aren't words; a word heard in two pieces still lands where it's said
  const split = alignWords('<short pause> Qibla [warm] finder', [w('Qib', 1, 1.2), w('la', 1.2, 1.5), w('finder', 2, 2.6)]);
  assert.deepEqual(split.map((x) => x.text), ['Qibla', 'finder']);
  assert.deepEqual(split.map((x) => [x.start, x.end]), [[1, 1.5], [2, 2.6]]);
  // Arabic: the diacritics (tashkeel) written in the script don't count as letters
  const ar = alignWords('بِسْمِ اللَّهِ', [w('بسم', 0.5, 0.9), w('الله', 1.0, 1.6)]);
  assert.deepEqual(ar.map((x) => [x.text, x.start, x.end]), [['بِسْمِ', 0.5, 0.9], ['اللَّهِ', 1, 1.6]]);
  // a word heard but never written (Whisper's "Thank you." on silence) doesn't drag the others later
  const extra = alignWords('Every prayer on time.', [w('Every', 0.3, 0.6), w('prayer', 0.6, 1.1), w('on', 1.6, 1.8), w('time.', 1.8, 2.4), w('Thank', 3, 3.4), w('you.', 3.4, 3.8)]);
  assert.deepEqual(extra.map((x) => [x.start, x.end]), [[0.3, 0.6], [0.6, 1.1], [1.6, 1.8], [1.8, 2.4]]);
  // a misheard word still lines up; a word with no letters sits where the one before ended
  const misheard = alignWords('Find the qibla — fast', [w('Find', 0, 0.3), w('the', 0.3, 0.5), w('kibla', 0.5, 1), w('fast', 1.2, 1.6)]);
  assert.deepEqual(misheard.map((x) => [x.text, x.start, x.end]), [['Find', 0, 0.3], ['the', 0.3, 0.5], ['qibla', 0.5, 1], ['—', 1, 1], ['fast', 1.2, 1.6]]);
  // nothing heard: no timings, never made-up ones
  assert.deepEqual(alignWords('Hello there', []), []);
});

test('a letter missed next to a word heard but never written stays in its own word', () => {
  const w = (text, start, end) => ({ text, start, end });
  const times = (script, heard) => alignWords(script, heard).map((x) => [x.start, x.end]);
  // "prayers" heard as "prayer", then Whisper's "Thank you." on silence: the "s" doesn't stretch the word to 2.2 s
  assert.deepEqual(times('on prayers', [w('on', 0, 0.2), w('prayer', 0.3, 0.8), w('Thank', 1.5, 1.8), w('you.', 1.8, 2.2)]), [[0, 0.2], [0.3, 0.8]]);
  // the same before the line: "every" heard as "very" doesn't start inside a stray "Okay"
  assert.deepEqual(times('every prayer', [w('Okay', 0, 0.4), w('very', 1, 1.3), w('prayer', 1.3, 1.8)]), [[1, 1.3], [1.3, 1.8]]);
  // tatweel (ـ) only stretches the written line: it isn't a letter to miss
  assert.deepEqual(times('اللـــــه', [w('الله', 0, 0.5), w('شكرا', 1, 1.5)]), [[0, 0.5]]);
  // a heard word whose end comes before its start never gives a word that ends before it starts
  assert.deepEqual(times('on time', [w('on', 1, 0.5), w('time', 1.2, 1.6)]), [[1, 1], [1.2, 1.6]]);
});

// npm run voice itself, in a copy of the tools in a temp folder (its own settings and brand), with every web call answered
// by a stand-in: no real key, no credits spent. Needs ffmpeg, as voice does.
const ffmpegMissing = (() => {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return false;
  } catch {
    return 'ffmpeg is not installed';
  }
})();

test('npm run voice with Gemini keeps paid audio when a line fails, and remakes lines changed during --only', { skip: ffmpegMissing }, async t => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-voice-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const tools = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
  fs.mkdirSync(path.join(root, 'tools'));
  for (const f of ['voice.mjs', 'settings.mjs', 'broker.mjs', 'gemini.mjs', 'transcribe.mjs', 'whisper.mjs']) fs.copyFileSync(path.join(tools, f), path.join(root, 'tools', f));
  const videoDir = path.join(root, 'src', 'brands', 'demo', 'video01');
  const vo = path.join(root, 'public', 'demo', 'video01', 'vo');
  fs.mkdirSync(videoDir, { recursive: true });
  fs.mkdirSync(path.join(root, '.director'));
  const setKeys = (s) => fs.writeFileSync(path.join(root, '.director', 'settings.json'), JSON.stringify(s));
  const writeScript = (s) => fs.writeFileSync(path.join(videoDir, 'voiceover.json'), JSON.stringify(s));
  // the stand-in for the web: Gemini says 0.1 s of silence (429 for a line containing FAIL), speech to text hears "Hello",
  // ElevenLabs answers with a few bytes; anything else fails the run. Every call is logged.
  const log = path.join(root, 'calls.log');
  const mock = path.join(root, 'mock-fetch.mjs');
  fs.writeFileSync(mock, `import fs from 'node:fs';
globalThis.fetch = async (url, init = {}) => {
  url = String(url);
  const body = typeof init.body === 'string' ? JSON.parse(init.body) : null;
  fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({ url, body }) + '\\n');
  const json = (j, status = 200) => new Response(JSON.stringify(j), { status });
  if (url.includes('generativelanguage.googleapis.com')) {
    if (body.contents[0].parts[0].text.includes('FAIL')) return json({ error: { message: 'Quota exceeded.' } }, 429);
    return json({ candidates: [{ content: { parts: [{ inlineData: { mimeType: 'audio/L16;codec=pcm;rate=24000', data: Buffer.alloc(4800).toString('base64') } }] } }] });
  }
  if (url.endsWith('/speech-to-text')) return json({ text: 'Hello', words: [{ type: 'word', text: 'Hello', start: 0, end: 0.1 }] });
  if (url.includes('api.elevenlabs.io/v1/text-to-speech/')) return json({ audio_base64: Buffer.from('mp3').toString('base64'), alignment: null });
  throw new Error('unexpected call: ' + url);
};
`);
  const env = { ...process.env };
  for (const k of ['ELEVENLABS_API_KEY', 'HMV_TICKET', 'HMV_DASHBOARD']) delete env[k];
  const run = (...args) => {
    fs.rmSync(log, { force: true });
    const r = spawnSync(process.execPath, ['--import', pathToFileURL(mock).href, path.join(root, 'tools', 'voice.mjs'), 'demo', 'video01', ...args], { env, encoding: 'utf8' });
    const calls = fs.existsSync(log) ? fs.readFileSync(log, 'utf8').trim().split('\n').map((l) => JSON.parse(l)) : [];
    return { ...r, made: calls.filter((c) => c.url.includes(':generateContent')).map((c) => c.body.contents[0].parts[0].text), calls };
  };
  const cache = () => JSON.parse(fs.readFileSync(path.join(vo, '.cache.json'), 'utf8'));
  setKeys({ elevenlabs: { apiKey: 'el-test' }, gemini: { apiKey: 'gm-test' }, voiceProvider: 'gemini' });

  // line c fails: a plain message, no stack trace, and a and b stay paid for
  writeScript({ lines: [{ id: 'a', text: 'Hello one.' }, { id: 'b', text: 'Hello two.', model: 'constructor' }, { id: 'c', text: 'Hello FAIL.' }] });
  let r = run();
  assert.equal(r.status, 1);
  assert.match(r.stderr, /Line "c": Gemini rate limit or quota reached/);
  assert.doesNotMatch(r.stderr, /\n\s+at /, 'no stack trace');
  assert.deepEqual(Object.keys(cache()).sort(), ['a', 'b']);
  assert.deepEqual(fs.readdirSync(vo).sort(), ['.cache.json', 'a.mp3', 'b.mp3'], 'no half-made MP3');
  assert.ok(r.calls.every((c) => !c.url.includes(':generateContent') || c.url.includes('/models/gemini-3.8-flash-tts:')), '"constructor" is no Gemini model');
  assert.equal(cache().a.result.words.length, 2, 'heard back and timed');

  // c fixed: only c is made
  writeScript({ lines: [{ id: 'a', text: 'Hello one.' }, { id: 'b', text: 'Hello two.', model: 'constructor' }, { id: 'c', text: 'Hello three.' }] });
  r = run();
  assert.equal(r.status, 0, r.stderr);
  assert.deepEqual(r.made, ['Hello three.']);
  assert.ok(fs.readFileSync(path.join(videoDir, 'voiceover.gen.ts'), 'utf8').includes('"c": {'));

  // a and b change, but only a is asked for: b is still made on the next full run
  writeScript({ lines: [{ id: 'a', text: 'Hello uno.' }, { id: 'b', text: 'Hello dos.' }, { id: 'c', text: 'Hello three.' }] });
  assert.deepEqual(run('--only=a').made, ['Hello uno.']);
  assert.deepEqual(run().made, ['Hello dos.']);
  assert.deepEqual(run().made, []);

  // ElevenLabs pinned: another provider's voice and model never reach it
  writeScript({ provider: 'elevenlabs', voice: 'Kore', model: 'gemini-3.8-flash-tts', lines: [{ id: 'el', text: 'Hello.' }] });
  r = run();
  assert.equal(r.status, 0, r.stderr);
  const tts = r.calls.find((c) => c.url.includes('/text-to-speech/'));
  assert.match(tts.url, /\/text-to-speech\/NOpBlnGInO9m6vDvFkFC\//);
  assert.equal(tts.body.model_id, 'eleven_v4');

  // ElevenLabs pinned without its key: no "or a Gemini API key", that wouldn't help
  setKeys({ gemini: { apiKey: 'gm-test' }, voiceProvider: 'gemini' });
  r = run();
  assert.equal(r.status, 1);
  assert.match(r.stderr, /asks for ElevenLabs/);
  assert.doesNotMatch(r.stderr, /Gemini/);
  assert.equal(r.calls.length, 0);
});

test('what speech to text makes up, or never heard, is pointed out', () => {
  const w = (text, start, end) => ({ text, start, end });
  const said = (text, from = 0) => text.split(' ').map((t, i) => w(t, from + i, from + i + 0.9));
  const kinds = (words, script) => heardProblems(words, script).map(({ kind, text, times, start }) => ({ kind, text, times, start }));
  // Whisper's loop: one phrase three times, one word four times
  assert.deepEqual(kinds(said('اشترك معنا اشترك معنا اشترك معنا')), [{ kind: 'repeat', text: 'اشترك معنا', times: 3, start: 0 }]);
  assert.deepEqual(kinds(said('go go go go')), [{ kind: 'repeat', text: 'go', times: 4, start: 0 }]);
  // not a loop: too few, or the script says it that way
  assert.deepEqual(kinds(said('go go go')), []);
  assert.deepEqual(kinds(said('الله الله الله الله'), 'الله الله الله الله'), []);
  assert.deepEqual(kinds(said('Hello world hello there')), []);
  // one sign-off, one report, even when it contains a shorter one
  assert.deepEqual(kinds(said('ترجمة نانسي قنقر')).map((p) => p.text), ['نانسي قنقر']);
  // the sign-offs it invents, with marks and case ignored, unless the script says them
  assert.deepEqual(kinds(said('Thanks for watching!', 5)), [{ kind: 'phantom', text: 'Thanks for watching!', times: undefined, start: 5 }]);
  assert.deepEqual(kinds(said('شكراً للمشاهدة')), [{ kind: 'phantom', text: 'شكراً للمشاهدة', times: undefined, start: 0 }]);
  assert.deepEqual(kinds(said('Thanks for watching'), 'Thanks for watching'), []);
});

test('script words nothing lines up with are reported, three or more in a row', () => {
  const w = (text, start, end) => ({ text, start, end });
  const script = '<short pause> Every prayer on time and the qibla always found. [warm] Open it today';
  const heard = 'Every prayer on time Open it today'.split(' ').map((t, i) => w(t, i, i + 0.9));
  // its neighbours may pair with stray letters, so it's the heart of the gap that's named
  const missing = heardProblems(heard, script);
  assert.deepEqual(missing.map((p) => p.kind), ['missing']);
  assert.match(missing[0].text, /qibla always found/);
  // a word heard with no length (Whisper can do that) was still heard
  assert.deepEqual(heardProblems('Every prayer on time always'.split(' ').map((t, i) => w(t, i, i)), 'Every prayer on time always'), []);
  // one word lost is ordinary mishearing; all of it heard is nothing to report
  assert.deepEqual(heardProblems('Every prayer time'.split(' ').map((t, i) => w(t, i, i + 0.9)), 'Every prayer on time'), []);
  assert.deepEqual(heardProblems(heard, 'Every prayer on time Open it today'), []);
  assert.deepEqual(heardProblems([], ''), []);
  // each kind reads as a sentence the Director can act on
  assert.match(problemLine({ kind: 'missing', start: 3, end: 3, text: 'and the qibla' }), /3\.0 s .*wasn't heard/);
  assert.match(problemLine({ kind: 'repeat', start: 1, end: 9, text: 'go', times: 4 }), /4 times/);
  // one take on its own has no mix to blame
  const take = problemLine({ kind: 'missing', start: 3, end: 3, text: 'and the qibla' }, { take: true });
  assert.match(take, /this take may have skipped it/);
  assert.doesNotMatch(take, /Soundtrack/);
});
