// Gemini voice-over: who narrates, the request Google gets, the audio that comes back, and how the script's words are
// timed to what speech to text heard. ElevenLabs stays the default: nobody without a Gemini key sees a change.
import test from 'node:test';
import assert from 'node:assert/strict';
import { voiceFits, voiceProviderOf } from '../settings.mjs';
import { checkGemini, geminiSpeech } from '../gemini.mjs';
import { alignWords } from '../transcribe.mjs';

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
