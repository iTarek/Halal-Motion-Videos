// Speech to text with word timings (ElevenLabs Scribe), so the Director knows what is said, and when: in a recorded
// voice-over (`npm run voice`, a line with "file") and in the finished mix (`npm run review` hears it back). Uses the
// ElevenLabs key from the dashboard's Settings (or ELEVENLABS_API_KEY), like voice.mjs; never prints it. Inside the
// Director's sandbox the key is hidden, so the dashboard hears the file instead (broker.mjs checks it).
import fs from "node:fs";
import path from "node:path";
import { askDashboard, inSandbox } from "./broker.mjs";
import { readSettings } from "./settings.mjs";

const STT_MODEL = "scribe_v2";
const TIMEOUT_MS = 10 * 60 * 1000; // a long recording takes a while; a stalled call must not freeze review

/** { text, language, words: [{ text, start, end }] } (seconds) for an audio file. language: ISO 639 code, or detected. */
export const transcribe = async (file, { language } = {}) => {
  if (inSandbox()) return askDashboard("hear", { file: path.resolve(file), language });
  const key = readSettings().elevenlabs.apiKey;
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
  const r3 = (n) => Math.round(n * 1000) / 1000;
  return {
    text: String(j.text ?? "").trim(),
    language: j.language_code ?? language ?? "",
    words: (j.words ?? [])
      .filter((w) => w.type === "word" && String(w.text ?? "").trim() && Number.isFinite(w.start) && Number.isFinite(w.end))
      .map((w) => ({ text: w.text.trim(), start: r3(w.start), end: r3(w.end) })),
  };
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
