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
  if (!key) throw new Error("Speech to text needs an ElevenLabs API key: add it in the dashboard's Settings.");
  const form = new FormData();
  form.append("model_id", STT_MODEL);
  form.append("timestamps_granularity", "word");
  form.append("tag_audio_events", "false");
  if (language) form.append("language_code", language);
  form.append("file", new Blob([fs.readFileSync(file)]), path.basename(file));
  const r = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
    method: "POST", headers: { "xi-api-key": key }, body: form, signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (r.status === 401) throw new Error("ElevenLabs rejected the API key (Settings).");
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

/**
 * Times the words of a known script from what speech to text heard. The words stay as written, so word i is the script's
 * word i (as with ElevenLabs' own timings). Their times come from matching the written letters to the heard ones in
 * order (edit distance): a misheard word still lines up, and a word heard but never written (Whisper's "Thank you." on
 * silence) costs only itself. Tags (<…>, […]) aren't spoken, so they're dropped. [] when nothing lines up.
 */
export const alignWords = (script, heard) => {
  const letters = (s) => [...s.normalize("NFKD").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "")]; // no diacritics or punctuation
  const words = String(script).replace(/<[^>]*>|\[[^\]]*\]/g, " ").split(/\s+/).filter(Boolean);
  const S = words.flatMap((w, i) => letters(w).map((ch) => ({ ch, word: i })));
  // every heard letter with when it's said: its word's span, shared evenly
  const H = heard.flatMap((w) => {
    const ls = letters(w.text), step = (w.end - w.start) / (ls.length || 1);
    return ls.map((ch, k) => ({ ch, from: w.start + step * k, to: w.start + step * (k + 1) }));
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
    const hits = S.flatMap((l, i) => (l.word === w && match[i] >= 0 ? [match[i]] : []));
    const start = hits.length ? H[hits[0]].from : last;
    const end = hits.length ? H[hits.at(-1)].to : start;
    last = end;
    return { text, start: r3(start), end: r3(end) };
  });
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
