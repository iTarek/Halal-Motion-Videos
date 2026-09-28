// Machine-wide settings (API keys, defaults), stored in .director/settings.json — git-ignored,
// never shown to Claude. Edited from the dashboard's Settings dialog.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const SETTINGS_FILE = path.join(ROOT, ".director", "settings.json");

export const DEFAULT_VOICE_ID = "NOpBlnGInO9m6vDvFkFC";
export const VOICE_MODELS = { eleven_v4: "Eleven v4 (best quality)", eleven_v4_turbo: "Eleven v4 Turbo (fast)" };

export const readSettings = () => {
  let s = {};
  try {
    s = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
  } catch {}
  const el = s.elevenlabs ?? {};
  return {
    ...s,
    elevenlabs: {
      apiKey: process.env.ELEVENLABS_API_KEY || el.apiKey || "",
      voiceId: el.voiceId || DEFAULT_VOICE_ID,
      voiceName: el.voiceName || "",
      model: VOICE_MODELS[el.model] ? el.model : "eleven_v4",
    },
  };
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
