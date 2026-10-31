// Machine-wide settings (API keys, defaults), stored in .director/settings.json — git-ignored,
// never shown to Claude. Edited from the dashboard's Settings dialog.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const SETTINGS_FILE = path.join(ROOT, ".director", "settings.json");

export const DEFAULT_VOICE_ID = "NOpBlnGInO9m6vDvFkFC";
export const VOICE_MODELS = { eleven_v4: "Eleven v4 (best quality)", eleven_v4_turbo: "Eleven v4 Turbo (fast)" };

// Gemini text to speech: the optional second voice-over provider (tools/gemini.mjs).
export const GEMINI_MODELS = { "gemini-3.8-flash-tts": "Gemini 3.8 Flash TTS (best quality)", "gemini-3.8-flash-lite-tts": "Gemini 3.8 Flash-Lite TTS (fast)" };
export const GEMINI_VOICES = [
  "Zephyr", "Puck", "Charon", "Kore", "Fenrir", "Leda", "Orus", "Aoede", "Callirrhoe", "Autonoe", "Enceladus", "Iapetus", "Umbriel",
  "Algieba", "Despina", "Erinome", "Algenib", "Rasalgethi", "Laomedeia", "Achernar", "Alnilam", "Schedar", "Gacrux", "Pulcherrima",
  "Achird", "Zubenelgenubi", "Vindemiatrix", "Sadachbia", "Sadaltager", "Sulafat",
];
export const DEFAULT_GEMINI_VOICE = "Sadachbia";

export const readSettings = () => {
  let s = {};
  try {
    s = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
  } catch {}
  const el = s.elevenlabs ?? {};
  const gm = s.gemini ?? {};
  return {
    ...s,
    elevenlabs: {
      apiKey: process.env.ELEVENLABS_API_KEY || el.apiKey || "",
      voiceId: el.voiceId || DEFAULT_VOICE_ID,
      voiceName: el.voiceName || "",
      model: VOICE_MODELS[el.model] ? el.model : "eleven_v4",
    },
    // Saved in Settings only: GEMINI_API_KEY is set by many other tools, and mustn't switch anyone's voice-over on.
    gemini: {
      apiKey: gm.apiKey || "",
      voice: GEMINI_VOICES.includes(gm.voice) ? gm.voice : DEFAULT_GEMINI_VOICE,
      model: GEMINI_MODELS[gm.model] ? gm.model : "gemini-3.8-flash-tts",
    },
    voiceProvider: s.voiceProvider === "gemini" ? "gemini" : "elevenlabs", // picked in Settings; ElevenLabs by default
  };
};

/** Who makes the voice-over: the provider picked in Settings if its key is saved, else whichever has a key; "" when
 *  neither does. ElevenLabs stays first, so anyone with an ElevenLabs key and no Gemini key sees no change. */
export const voiceProviderOf = (st = readSettings()) => {
  const has = { elevenlabs: !!st.elevenlabs.apiKey, gemini: !!st.gemini.apiKey };
  if (has[st.voiceProvider]) return st.voiceProvider;
  return has.elevenlabs ? "elevenlabs" : has.gemini ? "gemini" : "";
};

/** A voice for this provider (a Gemini voice name, or an ElevenLabs voice ID), or "" when it's the other provider's:
 *  a video's saved voice can outlive a switch of provider. */
export const voiceFits = (provider, voice) => {
  const v = String(voice ?? "").trim();
  const gemini = GEMINI_VOICES.find((g) => g.toLowerCase() === v.toLowerCase());
  if (provider === "gemini") return gemini ?? "";
  return gemini ? "" : v; // ElevenLabs: as before, anything but a Gemini name
};

export const writeSettings = (patch) => {
  const cur = (() => {
    try {
      return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    } catch {
      return {};
    }
  })();
  const next = { ...cur, ...patch, elevenlabs: { ...(cur.elevenlabs ?? {}), ...(patch.elevenlabs ?? {}) } };
  if (cur.gemini || patch.gemini) next.gemini = { ...(cur.gemini ?? {}), ...(patch.gemini ?? {}) };
  fs.mkdirSync(path.dirname(SETTINGS_FILE), { recursive: true });
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(next, null, 2), { mode: 0o600 });
  return readSettings();
};

/** Looks a voice up — doubles as an API key check. Returns { ok, name, error }. */
export const checkVoice = async (apiKey, voiceId) => {
  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/voices/${encodeURIComponent(voiceId)}`, { headers: { "xi-api-key": apiKey } });
    if (r.status === 401) return { ok: false, error: "ElevenLabs rejected the API key." };
    if (r.status === 404 || r.status === 400) return { ok: false, error: "The key works, but that voice ID wasn't found." };
    if (!r.ok) return { ok: false, error: `ElevenLabs answered ${r.status}.` };
    const v = await r.json();
    return { ok: true, name: v.name ?? "" };
  } catch (e) {
    return { ok: false, error: `Couldn't reach ElevenLabs (${e.message}).` };
  }
};
