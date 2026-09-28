// Voice-over with ElevenLabs (Eleven v4). The API key comes from the dashboard's Settings
// (.director/settings.json) or ELEVENLABS_API_KEY — it is never passed on the command line.
//
// Usage:
//   npm run voice -- <brand> <video>                  generate every line in <video>/voiceover.json (unchanged lines are skipped)
//   npm run voice -- <brand> <video> --only=intro,end regenerate just these lines
//   npm run voice -- <brand> <video> --force          regenerate everything
//   npm run voice -- <brand> <video> --id=test --text="[warm] Hello there."   one ad-hoc line (not added to voiceover.json)
//
// voiceover.json (in src/brands/<brand>/<video>/):
//   {
//     "voice": "optional voice id (default: Settings, then the video's Director setting)",
//     "model": "eleven_v4" | "eleven_v4_turbo",
//     "language": "ar",                      // optional ISO 639-1 code
//     "stability": 0.5, "similarity": 0.75,  // optional defaults for every line (0–1)
//     "lines": [
//       { "id": "intro", "text": "[warm, unhurried] ..." , "stability": 0.35 },
//       ...
//     ]
//   }
//
// Output:
//   public/<brand>/<video>/vo/<id>.mp3                      the audio
//   src/brands/<brand>/<video>/voiceover.gen.ts             VO.<id> = { src, seconds, words[] } — time scenes to it
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { readSettings, ROOT } from "./settings.mjs";

const API = "https://api.elevenlabs.io/v1";
const NAME = /^[a-z][a-z0-9-]*$/;
const LINE_ID = /^[a-zA-Z][a-zA-Z0-9_]*$/;

const fail = (m) => {
  console.error(m);
  process.exit(1);
};
const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => {
  const [k, ...v] = a.slice(2).split("=");
  return [k, v.length ? v.join("=") : true];
}));
const [brand, video] = args.filter((a) => !a.startsWith("--"));
if (!NAME.test(brand ?? "") || !NAME.test(video ?? "")) fail("Usage: npm run voice -- <brand> <video> [--only=a,b] [--force] [--id=x --text=\"...\"]");

const srcDir = path.join(ROOT, "src", "brands", brand, video);
if (!fs.existsSync(srcDir)) fail(`No video at src/brands/${brand}/${video}`);
const outDir = path.join(ROOT, "public", brand, video, "vo");
const cacheFile = path.join(outDir, ".cache.json");

const settings = readSettings().elevenlabs;
if (!settings.apiKey) fail("No ElevenLabs API key. Add it in the dashboard → Settings (or set ELEVENLABS_API_KEY).");

// Per-video voice override saved by the dashboard (Director → Voice-over).
const directorState = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, ".director", brand, `${video}.json`), "utf8"));
  } catch {
    return {};
  }
})();

// ---- the script
const scriptFile = path.join(srcDir, "voiceover.json");
let script;
if (flags.text) {
  const id = typeof flags.id === "string" ? flags.id : "test";
  if (!LINE_ID.test(id)) fail("--id must be letters, digits, underscore (starting with a letter).");
  script = { lines: [{ id, text: String(flags.text) }], adHoc: true };
} else {
  if (!fs.existsSync(scriptFile)) fail(`Write src/brands/${brand}/${video}/voiceover.json first (see the header of tools/voice.mjs).`);
  try {
    script = JSON.parse(fs.readFileSync(scriptFile, "utf8"));
  } catch (e) {
    fail(`voiceover.json isn't valid JSON: ${e.message}`);
  }
}
const lines = script.lines ?? [];
if (!lines.length) fail("voiceover.json has no lines.");
for (const l of lines) {
  if (!LINE_ID.test(l.id ?? "")) fail(`Line id "${l.id}" must be letters, digits, underscore (starting with a letter).`);
  if (!String(l.text ?? "").trim()) fail(`Line "${l.id}" has no text.`);
  if (l.text.length > 10000) fail(`Line "${l.id}" is over Eleven v4's 10,000-character limit.`);
}

const voiceId = script.voice || directorState.voiceId || settings.voiceId;
const model = script.model || settings.model;
const clamp = (v, d) => (typeof v === "number" && v >= 0 && v <= 1 ? v : d);

// ---- ElevenLabs calls
const post = async (url, body) => {
  const r = await fetch(url, {
    method: "POST",
    headers: { "xi-api-key": settings.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const t = await r.text();
    const err = new Error(`ElevenLabs ${r.status}: ${t.slice(0, 300)}`);
    err.status = r.status;
    throw err;
  }
  return r;
};

/** Returns { mp3: Buffer, alignment | null }. Prefers the timestamps endpoint; falls back if a field or endpoint isn't supported. */
// 192 kbps needs ElevenLabs Creator tier or above; lower plans get 128 kbps.
let outputFormat = "mp3_44100_192";
const synth = async (body) => {
  try {
    return await synthAs(body, `?output_format=${outputFormat}`);
  } catch (e) {
    if (e.status !== 403 || !/output_format/.test(e.message) || outputFormat === "mp3_44100_128") throw e;
    outputFormat = "mp3_44100_128";
    console.log("  (plan doesn't allow 192 kbps — using 128 kbps)");
    return synthAs(body, `?output_format=${outputFormat}`);
  }
};

const synthAs = async (body, q) => {
  const attempts = [body];
  if (body.previous_text || body.next_text) attempts.push({ ...body, previous_text: undefined, next_text: undefined });
  let last;
  for (const b of attempts) {
    try {
      const r = await post(`${API}/text-to-speech/${voiceId}/with-timestamps${q}`, b);
      const j = await r.json();
      return { mp3: Buffer.from(j.audio_base64, "base64"), alignment: j.alignment ?? j.normalized_alignment ?? null };
    } catch (e) {
      last = e;
      if (e.status === 401) throw new Error("ElevenLabs rejected the API key (Settings).");
      if (e.status === 429) throw new Error("ElevenLabs rate limit or quota reached — try again later or check your plan.");
      if (![400, 404, 422].includes(e.status)) throw e;
    }
  }
  // Timestamps unsupported for this request: plain audio.
  for (const b of attempts) {
    try {
      const r = await post(`${API}/text-to-speech/${voiceId}${q}`, b);
      return { mp3: Buffer.from(await r.arrayBuffer()), alignment: null };
    } catch (e) {
      last = e;
      if (![400, 422].includes(e.status)) throw e;
    }
  }
  throw last;
};

const durationOf = (file) => {
  try {
    return Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());
  } catch {
    return 0;
  }
};

/** Characters → spoken words with start/end seconds. Bracketed audio tags are dropped. */
const wordsOf = (al) => {
  if (!al?.characters?.length) return [];
  const out = [];
  let cur = null;
  let inTag = false;
  al.characters.forEach((ch, i) => {
    if (ch === "[") inTag = true;
    if (inTag) {
      if (ch === "]") inTag = false;
      return;
    }
    if (/\s/.test(ch)) {
      if (cur) out.push(cur);
      cur = null;
      return;
    }
    const s = al.character_start_times_seconds[i];
    const e = al.character_end_times_seconds[i];
    if (!cur) cur = { text: ch, start: s, end: e };
    else {
      cur.text += ch;
      cur.end = e;
    }
  });
  if (cur) out.push(cur);
  const r3 = (n) => Math.round(n * 1000) / 1000;
  return out.filter((w) => w.text.trim()).map((w) => ({ text: w.text, start: r3(w.start), end: r3(w.end) }));
};

// ---- run
fs.mkdirSync(outDir, { recursive: true });
const cache = (() => {
  try {
    return JSON.parse(fs.readFileSync(cacheFile, "utf8"));
  } catch {
    return {};
  }
})();
const only = typeof flags.only === "string" ? new Set(flags.only.split(",").map((s) => s.trim())) : null;

const results = {};
for (const [i, line] of lines.entries()) {
  const body = {
    text: line.text,
    model_id: line.model || model,
    ...(line.language || script.language ? { language_code: line.language || script.language } : {}),
    voice_settings: {
      stability: clamp(line.stability, clamp(script.stability, 0.5)),
      similarity_boost: clamp(line.similarity, clamp(script.similarity, 0.75)),
    },
    ...(typeof line.seed === "number" ? { seed: line.seed } : {}),
    ...(lines[i - 1] ? { previous_text: lines[i - 1].text } : {}),
    ...(lines[i + 1] ? { next_text: lines[i + 1].text } : {}),
  };
  const hash = crypto.createHash("sha1").update(JSON.stringify({ voiceId, body })).digest("hex");
  const file = path.join(outDir, `${line.id}.mp3`);
  const cached = cache[line.id];
  const skip = !flags.force && (only ? !only.has(line.id) : cached?.hash === hash) && fs.existsSync(file) && cached;
  if (skip) {
    results[line.id] = cached.result;
    console.log(`= ${line.id} (unchanged, ${cached.result.seconds}s)`);
    continue;
  }
  process.stdout.write(`… ${line.id}: generating with ${body.model_id} … `);
  const { mp3, alignment } = await synth(body);
  fs.writeFileSync(file, mp3);
  const words = wordsOf(alignment);
  const seconds = Math.round((durationOf(file) || words.at(-1)?.end || 0) * 1000) / 1000;
  results[line.id] = { src: `vo/${line.id}.mp3`, seconds, words };
  cache[line.id] = { hash, result: results[line.id] };
  console.log(`${seconds}s${words.length ? `, ${words.length} words timed` : ""}`);
}

fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));

if (script.adHoc) {
  console.log(`\nWrote public/${brand}/${video}/vo/${lines[0].id}.mp3 (${results[lines[0].id].seconds}s) — not added to voiceover.gen.ts.`);
} else {
  // Keep only lines still in the script; typed data the video imports.
  const gen = `// Generated by \`npm run voice\` from voiceover.json — don't edit by hand.
// src is relative to public/${brand}/${video}/ → use asset(VO.<id>.src). seconds → frames: Math.ceil(seconds * fps).
export const VO = ${JSON.stringify(Object.fromEntries(lines.map((l) => [l.id, results[l.id]])), null, 2)} as const;

export type VoId = keyof typeof VO;
`;
  fs.writeFileSync(path.join(srcDir, "voiceover.gen.ts"), gen);
  const total = lines.reduce((t, l) => t + (results[l.id]?.seconds ?? 0), 0);
  console.log(`\nWrote src/brands/${brand}/${video}/voiceover.gen.ts — ${lines.length} lines, ${total.toFixed(1)}s of voice, voice ${voiceId}.`);
}
