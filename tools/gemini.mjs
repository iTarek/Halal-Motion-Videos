// Gemini text to speech (Gemini 3.8 Flash TTS): the optional second voice-over provider, for anyone who'd rather use a
// Google AI Studio key than ElevenLabs. Delivery goes in a "style" next to the text and in <angle-bracket> cues inside it,
// not in ElevenLabs' [square-bracket] tags. The audio comes without word timings: tools/voice.mjs gets them by speech
// to text (tools/transcribe.mjs). The key comes from the dashboard's Settings.
const API = "https://generativelanguage.googleapis.com/v1beta";

const errorOf = (status, body) => {
  if (status === 401 || /API_KEY_INVALID|API key not valid/i.test(body)) return new Error("Google rejected the Gemini API key (Settings).");
  if (status === 403) return new Error("This Gemini API key isn't allowed to do that (403): check it in Google AI Studio.");
  if (status === 404) return new Error("Gemini doesn't know that model (404).");
  if (status === 429) return new Error("Gemini rate limit or quota reached: try again later, or check your Google AI Studio plan.");
  // Google's errors are JSON ({ error: { message } }): show the message, not the JSON around it
  let said;
  try {
    said = JSON.parse(body).error.message;
  } catch {}
  return new Error(`Gemini ${status}: ${(typeof said === "string" && said ? said : body).slice(0, 300)}`);
};

const isWav = (b) => b.length > 12 && b.toString("latin1", 0, 4) === "RIFF" && b.toString("latin1", 8, 12) === "WAVE";

/** Raw 16-bit mono PCM (little-endian, as Gemini sends it) → a WAV file. */
const wavOf = (pcm, rate) => {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0, "latin1");
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write("WAVEfmt ", 8, "latin1");
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); // PCM
  h.writeUInt16LE(1, 22); // mono
  h.writeUInt32LE(rate, 24);
  h.writeUInt32LE(rate * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write("data", 36, "latin1");
  h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
};

/** One spoken line as WAV audio. text: word for word, with inline <cues>; style: how it's said ("warm, unhurried"). */
export const geminiSpeech = async ({ key, text, style, voice, model }) => {
  const r = await fetch(`${API}/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": key, "Content-Type": "application/json" }, // in a header, so it's never in a logged URL
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text, ...(style ? { speech_metadata: { style } } : {}) }] }],
      generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { voice } } },
    }),
    signal: AbortSignal.timeout(5 * 60 * 1000),
  }).catch((e) => {
    throw new Error(`Couldn't reach Gemini (${e.message}).`); // not a bare "fetch failed" or timeout in the dashboard
  });
  if (!r.ok) throw errorOf(r.status, await r.text());
  const j = await r.json().catch((e) => {
    throw new Error(e instanceof SyntaxError ? "Gemini sent a reply that isn't JSON: try again." : `Couldn't reach Gemini (${e.message}).`);
  });
  const part = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part) {
    const why = j.promptFeedback?.blockReason ?? j.candidates?.[0]?.finishReason;
    throw new Error(`Gemini sent no audio${why ? ` (${why})` : ""}.`);
  }
  const audio = Buffer.from(part.inlineData.data, "base64");
  // A normal request returns WAV; raw PCM ("audio/L16;…;rate=24000") gets a WAV header
  return isWav(audio) ? audio : wavOf(audio, Number(/rate=(\d+)/.exec(part.inlineData.mimeType ?? "")?.[1]) || 24000);
};

/** Checks a key against a model without making audio (no cost). Returns { ok, error }. */
export const checkGemini = async (key, model) => {
  try {
    const r = await fetch(`${API}/models/${encodeURIComponent(model)}`, { headers: { "x-goog-api-key": key }, signal: AbortSignal.timeout(30000) });
    return r.ok ? { ok: true } : { ok: false, error: errorOf(r.status, await r.text()).message };
  } catch (e) {
    return { ok: false, error: `Couldn't reach Gemini (${e.message}).` };
  }
};
