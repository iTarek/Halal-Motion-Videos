// Local Whisper: how its one-token items become timed words. Offline: Whisper itself isn't run (nor installed) here.
import test from 'node:test';
import assert from 'node:assert/strict';
import { whisperWords } from '../whisper.mjs';

// an item as Whisper.cpp writes it with --max-len 1 -ojf, its text as the bytes whisperHear reads (latin1)
const bytes = (s) => Buffer.from(s, 'utf8').toString('latin1');
const item = (text, from, to, t_dtw = -1) => ({ text, offsets: { from, to }, tokens: [{ text, t_dtw }] });

test('a token with a space starts a word; one without continues it', () => {
  assert.deepEqual(whisperWords([item(' Hello', 0, 400), item(' wor', 400, 600), item('ld', 600, 900)]), [
    { text: 'Hello', start: 0, end: 0.4 },
    { text: 'world', start: 0.4, end: 0.9 },
  ]);
});

test('DTW times start a word 120 ms earlier, never before its own segment', () => {
  assert.deepEqual(whisperWords([item(' Hi', 1000, 1500, 130)]), [{ text: 'Hi', start: 1.18, end: 1.5 }]);
  assert.deepEqual(whisperWords([item(' Hi', 1000, 1500, 105)]), [{ text: 'Hi', start: 1, end: 1.5 }]);
});

test('a letter split over two tokens decodes once the word is whole', () => {
  const [a, b] = [bytes('سلام').slice(0, 3), bytes('سلام').slice(3)]; // cuts "ل" in half
  assert.deepEqual(whisperWords([item(` ${a}`, 0, 300), item(b, 300, 700)]).map((w) => w.text), ['سلام']);
  // byte A0 is half of "נ", not a space
  const nun = bytes('נ');
  assert.deepEqual(whisperWords([item(` ${nun[0]}`, 0, 200), item(nun[1], 200, 400)]).map((w) => w.text), ['נ']);
});

test('a non-word is dropped and ends the word before it', () => {
  // before: "HelloOh", its end stretched over the music
  assert.deepEqual(whisperWords([item(' Hello', 0, 400), item(' (music)', 400, 3000), item('Oh', 3000, 3300)]), [
    { text: 'Hello', start: 0, end: 0.4 },
    { text: 'Oh', start: 3, end: 3.3 },
  ]);
  // a lone space ends the word too
  assert.deepEqual(whisperWords([item(' Hi', 0, 300), item(' ', 300, 320), item('there', 320, 600)]).map((w) => w.text), ['Hi', 'there']);
  // spelled over several tokens, it's still not a word
  const blank = [' [', 'BL', 'ANK', '_', 'AUD', 'IO', ']'].map((t, i) => item(t, 500 + i * 10, 510 + i * 10));
  assert.deepEqual(whisperWords([item(' Go', 0, 400), ...blank, item(' now', 600, 900)]).map((w) => w.text), ['Go', 'now']);
});

test('an item with no text changes nothing; nothing heard is no words', () => {
  assert.deepEqual(whisperWords([item(' wor', 0, 300), item('', 300, 300), item('ld', 300, 600)]).map((w) => w.text), ['world']);
  assert.deepEqual(whisperWords([]), []);
  assert.deepEqual(whisperWords([item('', 0, 0)]), []);
});
