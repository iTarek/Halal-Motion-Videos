// Speech to text with word timings (ElevenLabs Scribe), so the Director knows what is said, and when: in a recorded
// voice-over (`npm run voice`, a line with "file") and in the finished mix (`npm run review` hears it back). Uses the
// ElevenLabs key from the dashboard's Settings (or ELEVENLABS_API_KEY), like voice.mjs; never prints it. Without one,
// someone who makes voice-over with Gemini gets local Whisper instead (tools/whisper.mjs): free, on this machine.
// Inside the Director's sandbox the key is hidden, so the dashboard hears the file instead (broker.mjs checks it).
import fs from "node:fs";
import path from "node:path";
import { askDashboard, inSandbox } from "./broker.mjs";
import { readSettings } from "./settings.mjs";
import { whisperHear } from "./whisper.mjs";

const STT_MODEL = "scribe_v2";
const TIMEOUT_MS = 10 * 60 * 1000; // a long recording takes a while; a stalled call must not freeze review
const r3 = (n) => Math.round(n * 1000) / 1000;

/** { text, language, words: [{ text, start, end }] } (seconds) for an audio file. language: ISO 639 code, or detected.
 *  install: may local Whisper be installed now, if it's the one needed (not inside a dashboard request: it takes minutes). */
export const transcribe = async (file, { language, install = true } = {}) => {
  if (inSandbox()) return askDashboard("hear", { file: path.resolve(file), language });
  const st = readSettings();
  const key = st.elevenlabs.apiKey;
  if (!key && st.gemini.apiKey) return whisperHear(file, { language, install });
  if (!key) throw new Error("Speech to text needs an ElevenLabs API key, or a Gemini one (then local Whisper hears it): add one in the dashboard's Settings.");
  const form = new FormData();
  form.append("model_id", STT_MODEL);
  form.append("timestamps_granularity", "word");
  form.append("tag_audio_events", "false");
  if (language) form.append("language_code", language);
  form.append("file", new Blob([fs.readFileSync(file)]), path.basename(file));
  const r = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
    method: "POST", headers: { "xi-api-key": key }, body: form, signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (r.status === 401) {
    // an old key that stopped working mustn't stop someone who narrates with Gemini
    if (st.gemini.apiKey) return whisperHear(file, { language, install });
    throw new Error("ElevenLabs rejected the API key (Settings).");
  }
  if (!r.ok) throw new Error(`ElevenLabs speech to text failed (${r.status}): ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  return {
    text: String(j.text ?? "").trim(),
    language: j.language_code ?? language ?? "",
    words: (j.words ?? [])
      .filter((w) => w.type === "word" && String(w.text ?? "").trim() && Number.isFinite(w.start) && Number.isFinite(w.end))
      .map((w) => ({ text: w.text.trim(), start: r3(w.start), end: r3(w.end) })),
  };
};

const MAX_CELLS = 4e6; // letters written × letters heard: about two minutes of speech in one line, far beyond a scene
const TAGS = /<[^>]*>|\[[^\]]*\]/g; // <short pause>, [warm]: directions, not spoken
// no diacritics, punctuation or tatweel (ـ, a letter to Unicode, but only stretches the line)
const letters = (s) => [...s.normalize("NFKD").toLowerCase().replace(/[^\p{L}\p{N}]|\u0640/gu, "")];

/**
 * Times the words of a known script from what speech to text heard. The words stay as written, so word i is the script's
 * word i (as with ElevenLabs' own timings). Their times come from matching the written letters to the heard ones in
 * order (edit distance): a misheard word still lines up, and a word heard but never written (Whisper's "Thank you." on
 * silence) costs only itself. Tags (<…>, […]) aren't spoken, so they're dropped. [] when nothing lines up.
 * found: whether anything lined up with the word. Its length can't say: Whisper can give a word it heard no length at all.
 */
const lineUp = (script, heard) => {
  const words = String(script).replace(TAGS, " ").split(/\s+/).filter(Boolean);
  const S = words.flatMap((w, i) => letters(w).map((ch) => ({ ch, word: i })));
  // every heard letter with when it's said (its word's span, shared evenly) and which heard word it's in
  const H = heard.flatMap((w, word) => {
    const ls = letters(w.text), step = Math.max(0, w.end - w.start) / (ls.length || 1);
    return ls.map((ch, k) => ({ ch, word, from: w.start + step * k, to: w.start + step * (k + 1) }));
  });
  const n = S.length, m = H.length, W = m + 1;
  if (!n || !m || (n + 1) * W > MAX_CELLS) return [];
  const cost = (i, j) => (S[i].ch === H[j].ch ? 0 : 1);
  const d = new Uint32Array((n + 1) * W);
  for (let j = 0; j <= m; j++) d[j] = j;
  for (let i = 1; i <= n; i++) {
    d[i * W] = i;
    for (let j = 1; j <= m; j++) d[i * W + j] = Math.min(d[(i - 1) * W + j - 1] + cost(i - 1, j - 1), d[(i - 1) * W + j] + 1, d[i * W + j - 1] + 1);
  }
  // walk back: each written letter gets the heard letter it lines up with (a misheard one counts), or none
  const match = new Array(n).fill(-1);
  for (let i = n, j = m; i > 0 && j > 0; ) {
    if (d[i * W + j] === d[(i - 1) * W + j - 1] + cost(i - 1, j - 1)) match[--i] = --j;
    else if (d[i * W + j] === d[(i - 1) * W + j] + 1) i--;
    else j--;
  }
  let last = H[0].from; // a word nothing lines up with (or no letters, like "—") sits where the one before it ended
  return words.map((text, w) => {
    const mine = S.flatMap((l, i) => (l.word === w && match[i] >= 0 ? [i] : []));
    // a letter heard as written places the word; a misheard one counts only inside the heard words those are in (or when
    // none was heard as written): otherwise a letter missed next to "Thank you." pairs with it and stretches the word there
    const exact = mine.filter((i) => S[i].ch === H[match[i]].ch).map((i) => match[i]);
    const hits = mine.map((i) => match[i]).filter((j) => !exact.length || (H[j].word >= H[exact[0]].word && H[j].word <= H[exact.at(-1)].word));
    const start = hits.length ? H[hits[0]].from : last;
    const end = hits.length ? H[hits.at(-1)].to : start;
    last = end;
    return { text, start: r3(start), end: r3(end), found: hits.length > 0 };
  });
};
export const alignWords = (script, heard) => lineUp(script, heard).map(({ found, ...word }) => word);

// What speech to text makes up on silence or music (Whisper, mostly): sign-offs it learned from video subtitles.
const PHANTOMS = [
  "اشترك في القناة", "اشتركوا في القناة", "نانسي قنقر", "شكرا للمشاهدة", "شكرا على المشاهدة",
  "thanks for watching", "thank you for watching", "subscribe to my channel", "subtitles by", "amara.org",
];
const wordKey = (w) => letters(w).join("");
const LOOP_WORD = 4, LOOP_PHRASE = 3, LOOP_MAX_WORDS = 8, MISSING_WORDS = 3;

/**
 * Where speech to text is probably wrong, or the voice isn't there. `script` is what should be said, when it's known.
 * [{ kind, start, end, text, times? }], in time order:
 *   repeat  — one word 4+ times or one phrase 3+ times in a row (Whisper's loop), unless the script says it that way
 *   phantom — a sign-off it invents on silence or music, unless the script says it
 *   missing — 3+ written words in a row nothing lines up with: left out of the mix, or drowned by it
 */
export const heardProblems = (words, script = "") => {
  const said = words.map((w) => wordKey(w.text));
  const written = String(script).replace(TAGS, " ").split(/\s+/).map(wordKey).filter(Boolean);
  const inScript = (phrase) => ` ${written.join(" ")} `.includes(` ${phrase.join(" ")} `);
  const out = [];
  for (let i = 0; i < said.length; ) {
    let best = null;
    for (let n = 1; n <= LOOP_MAX_WORDS && said[i] && i + n <= said.length; n++) {
      const phrase = said.slice(i, i + n);
      let times = 1;
      while (phrase.every((w, k) => said[i + n * times + k] === w)) times++;
      if (times >= (n === 1 ? LOOP_WORD : LOOP_PHRASE) && (!best || n * times > best.n * best.times)) best = { n, times };
    }
    if (!best || inScript(said.slice(i, i + best.n * best.times))) {
      i++;
      continue;
    }
    const last = i + best.n * best.times - 1;
    out.push({ kind: "repeat", start: words[i].start, end: words[last].end, times: best.times, text: words.slice(i, i + best.n).map((w) => w.text).join(" ") });
    i = last + 1;
  }
  for (const phantom of PHANTOMS) {
    const keys = phantom.split(" ").map(wordKey);
    if (inScript(keys)) continue;
    for (let i = 0; i + keys.length <= said.length; i++)
      if (keys.every((k, j) => said[i + j] === k))
        out.push({ kind: "phantom", start: words[i].start, end: words[i + keys.length - 1].end, text: words.slice(i, i + keys.length).map((w) => w.text).join(" ") });
  }
  let run = [];
  const closeRun = () => {
    if (run.length >= MISSING_WORDS) out.push({ kind: "missing", start: run[0].start, end: run[0].start, text: run.map((w) => w.text).join(" ") });
    run = [];
  };
  for (const w of written.length ? lineUp(script, words) : []) {
    if (w.found) closeRun();
    else if (wordKey(w.text)) run.push(w); // a mark with no letters ("—") doesn't end a run
  }
  closeRun();
  return out.sort((a, b) => a.start - b.start);
};

/** One heardProblems item, in words for the Director. take: it was heard from one voice line on its own, not the mix. */
export const problemLine = (p, { take = false } = {}) => {
  const at = `${p.start.toFixed(1)} s`;
  if (p.kind === "repeat") return `${at}  "${p.text}" ${p.times} times in a row: speech to text probably made this up. Check before changing the video for it.`;
  if (p.kind === "phantom") return `${at}  "${p.text}": speech to text often invents this on silence or music. Check before changing the video for it.`;
  if (take) return `${at}  "${p.text}" wasn't heard: this take may have skipped it, or speech to text missed it.`;
  return `${at}  "${p.text}" wasn't heard: is the line in Soundtrack.tsx, or is the sound drowning it?`;
};

/** Words → phrases a viewer hears as one: split after a sentence end, or at a pause longer than `gap` seconds. */
export const phrasesOf = (words, gap = 0.45) => {
  const out = [];
  let cur = null;
  for (const w of words) {
    if (cur && w.start - cur.end > gap) {
      out.push(cur);
      cur = null;
    }
    cur = cur ? { text: `${cur.text} ${w.text}`, start: cur.start, end: w.end } : { ...w };
    if (/[.!?؟。]$/.test(w.text)) {
      out.push(cur);
      cur = null;
    }
  }
  if (cur) out.push(cur);
  return out;
};
