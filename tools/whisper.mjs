// Local speech to text with word timings: Whisper.cpp, through Remotion's installer. It's for anyone who makes voice-over
// with Gemini and has no ElevenLabs key: free, and offline once installed. Nothing is installed until someone needs it;
// then the program and the model go in .director/whisper/ (git-ignored), once: built with git and make on macOS and
// Linux, downloaded on Windows. `npm run whisper` installs it ahead of time.
import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { pathToFileURL } from "node:url";
import { ROOT } from "./settings.mjs";

const VERSION = "1.5.5"; // the Whisper.cpp release Remotion recommends: plain make, and a ready build for Windows
// Multilingual. Against ElevenLabs' exact timings (5 narrated videos, 3 Arabic): "small" puts 79–92% of words within
// 0.2 s (median 0.04–0.13 s); "base" only 69–77%.
const MODEL = "small";
const DTW_LATE_MS = 120; // Whisper's DTW word times run 0.10–0.16 s late in the same test: this takes it back
const TIMEOUT_MS = 10 * 60 * 1000;
const WHISPER_DIR = path.join(ROOT, ".director", "whisper");
const CPP = path.join(WHISPER_DIR, `whisper.cpp-${VERSION}`);
const EXE = path.join(CPP, process.platform === "win32" ? "main.exe" : "main");
const MODEL_FILE = path.join(WHISPER_DIR, `ggml-${MODEL}.bin`);
const MODEL_URL = `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-${MODEL}.bin`; // where Remotion's installer gets it
const STALE_MS = 24 * 60 * 60 * 1000; // an install folder this old was left by a run that was stopped

/** Is local Whisper installed (program and model)? */
export const whisperReady = () => fs.existsSync(EXE) && fs.existsSync(MODEL_FILE);

/** The model, checked: Remotion's own download doesn't look at the answer, never ends when cut off, and renames the file
 *  while it's still open (which Windows refuses). */
const downloadModel = async (file) => {
  const r = await fetch(MODEL_URL);
  if (!r.ok || !r.body) throw new Error(`the model download failed (${r.status})`);
  const size = Number(r.headers.get("content-length"));
  await pipeline(Readable.fromWeb(r.body), fs.createWriteStream(file)); // resolves once the file is closed
  if (size && fs.statSync(file).size !== size) throw new Error("the model download was cut off");
};

/** Installs the program and the model if they're missing. Each lands in a temporary folder first and moves into place
 *  only when complete, so a broken download or two installs at once never leave a half-made one behind. */
const installWhisper = async ({ log = console.log } = {}) => {
  if (whisperReady()) return;
  fs.mkdirSync(WHISPER_DIR, { recursive: true });
  for (const n of fs.readdirSync(WHISPER_DIR)) {
    // another run may be removing its own folder right now: gone is fine
    const st = n.startsWith(".installing-") && fs.statSync(path.join(WHISPER_DIR, n), { throwIfNoEntry: false });
    if (st && Date.now() - st.mtimeMs > STALE_MS) fs.rmSync(path.join(WHISPER_DIR, n), { recursive: true, force: true });
  }
  const tmp = fs.mkdtempSync(path.join(WHISPER_DIR, ".installing-"));
  try {
    if (!fs.existsSync(EXE)) {
      log(`Installing local Whisper ${VERSION} (word timings for the voice-over), once…`);
      const { installWhisperCpp } = await import("@remotion/install-whisper-cpp"); // only when needed
      await installWhisperCpp({ version: VERSION, to: path.join(tmp, "cpp"), printOutput: false });
      try {
        fs.renameSync(path.join(tmp, "cpp"), CPP);
      } catch (e) {
        if (!fs.existsSync(EXE)) throw e; // else another run finished first: use that one
      }
    }
    if (!fs.existsSync(MODEL_FILE)) {
      log(`Downloading the Whisper "${MODEL}" model (about 470 MB), once…`);
      await downloadModel(path.join(tmp, "model.bin"));
      try {
        fs.renameSync(path.join(tmp, "model.bin"), MODEL_FILE);
      } catch (e) {
        if (!fs.existsSync(MODEL_FILE)) throw e; // else another run finished first (Windows won't replace it while in use)
      }
    }
  } catch (e) {
    // the build hint only when the program is what's missing, not when only the model download failed
    const hint = process.platform === "win32" || fs.existsSync(EXE) ? "" : " (it needs git, make and a C compiler: Xcode's command line tools on macOS, build-essential on Linux)";
    throw new Error(`Couldn't install local Whisper: ${e.message}${hint}`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
};

const r3 = (n) => Math.round(n * 1000) / 1000;
const NOT_SPEECH = /^ *[[(].*[\])] *$/; // [_TT_…], [BLANK_AUDIO], (music)

/** Whisper.cpp's items, one token each, text still as bytes (see whisperHear) → [{ text, start, end }] in seconds. A token
 *  that starts with a space starts a word. A lone space or a non-word ends the word before it, so the token after it starts
 *  the next word even without a space; an item with no text at all (only Whisper's own markers) changes nothing. */
export const whisperWords = (transcription) => {
  const utf8 = (bytes) => Buffer.from(bytes, "latin1").toString("utf8");
  const words = [];
  let cut = true; // the next token starts a word
  for (const { text, offsets, tokens } of transcription) {
    if (!text) continue;
    if (!/[^ ]/.test(text) || NOT_SPEECH.test(text)) {
      cut = true;
      continue;
    }
    const dtw = tokens?.[0]?.t_dtw > 0 ? tokens[0].t_dtw * 10 : offsets.from; // ms
    const last = words.at(-1);
    if (!cut && !text.startsWith(" ")) {
      last.bytes += text;
      last.end = Math.max(last.end, offsets.to);
    } else {
      const start = Math.max(offsets.from, dtw - DTW_LATE_MS);
      words.push({ bytes: text.replace(/^ +| +$/g, ""), start, end: Math.max(start, offsets.to) });
    }
    cut = false;
  }
  // a non-word Whisper spelled over several tokens ("[", "BL", "ANK", …) only shows once it's whole
  return words.map((w) => ({ text: utf8(w.bytes).trim(), start: r3(w.start / 1000), end: r3(w.end / 1000) })).filter((w) => w.text && !NOT_SPEECH.test(w.text));
};

/** Runs Whisper.cpp on a 16 kHz WAV, one token per item with DTW times (the arguments Remotion's transcribe() uses).
 *  Run here rather than through transcribe(), which always writes <cwd>/tmp.json: two runs at once would collide. */
const run = (wav, out, language) =>
  new Promise((resolve, reject) => {
    const json = `${out}.json`;
    const child = spawn(EXE, [
      "-f", wav, "--output-file", out, "--output-json", "-ojf", "--max-len", "1", "--dtw", MODEL, "-m", MODEL_FILE, "-l", language,
    ], { cwd: CPP, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
    let log = "";
    const watch = (d) => {
      log = (log + d.toString()).slice(-4000);
      // On Macs it can hang after writing its answer, while freeing the GPU (Remotion stops it here too). Only this
      // chunk counts: without a usable GPU it prints the same line at startup, long before the answer is complete.
      if (/ggml_metal_free: deallocating/.test(d.toString()) && fs.existsSync(json)) child.kill();
    };
    child.stdout.on("data", watch);
    child.stderr.on("data", watch);
    let timedOut = false;
    const timer = setTimeout(() => ((timedOut = true), child.kill()), TIMEOUT_MS);
    child.on("error", (e) => (clearTimeout(timer), reject(e)));
    child.on("close", (code) => {
      clearTimeout(timer);
      if (fs.existsSync(json)) resolve(json);
      else if (timedOut) reject(new Error(`Whisper was stopped after ${TIMEOUT_MS / 60000} minutes without an answer.`));
      else reject(new Error(`Whisper didn't finish (exit ${code}): ${log.trim().split("\n").slice(-2).join(" ")}`));
    });
  });

/** { text, language, words: [{ text, start, end }] } (seconds) for an audio file, heard by local Whisper. */
export const whisperHear = async (file, { language, install = true } = {}) => {
  if (!whisperReady()) {
    if (!install) throw new Error("Local Whisper isn't installed yet: `npm run whisper` installs it (`npm run voice` also does, on first use).");
    await installWhisper();
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hmv-whisper-"));
  try {
    const wav = path.join(tmp, "in.wav");
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", file, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav]); // Whisper.cpp reads only this
    // ISO 639-1 ("en", "ar"; "en-US" → "en"); anything else, Whisper detects
    const code = String(language ?? "").toLowerCase().split(/[-_]/)[0];
    const lang = /^[a-z]{2,3}$/.test(code) ? code : "auto";
    // Read as bytes: a token can hold half of a letter (often in Arabic), and only the whole word decodes cleanly. So
    // whitespace here is ASCII only: trim() and \s also take byte A0, part of letters like נ, Р, Π and ٠. Raw control
    // bytes are blanked first (JSON.parse refuses them; they're never part of a word).
    const raw = fs.readFileSync(await run(wav, path.join(tmp, "out"), lang), "latin1").replace(/[\u0000-\u001f]/g, " ");
    const { result, transcription } = JSON.parse(raw);
    const timed = whisperWords(transcription);
    return { text: timed.map((w) => w.text).join(" "), language: result?.language ?? language ?? "", words: timed };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
};

// `npm run whisper`: install it now (e.g. before an offline trip, or to see it work)
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    if (whisperReady()) console.log(`Local Whisper is installed in ${path.relative(ROOT, WHISPER_DIR)}/.`);
    else {
      await installWhisper();
      console.log(`Installed local Whisper in ${path.relative(ROOT, WHISPER_DIR)}/.`);
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
