// Makes audio files playable by Remotion's bundled ffmpeg and by Chrome (Studio preview).
// Apple apps often ship sounds as Apple Lossless (ALAC) in .m4a/.caf/.aiff — neither can decode that.
//   .m4a / .mp4 / .mov / .aac with an unsupported codec → re-encoded to AAC in place (same file name, code unchanged)
//   .caf / .aif / .aiff (containers Remotion can't read)  → converted to a .wav next to it (reference the .wav)
// Uses the system ffmpeg/ffprobe (see `npm run doctor`).
//
// Usage: node tools/audiofix.mjs <file or folder> [...]   — also run automatically by copy-asset, uploads and render.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PLAYABLE = new Set(["aac", "mp3", "pcm_s16le", "pcm_s24le", "pcm_f32le", "flac", "opus", "vorbis"]);
const REENCODE_IN_PLACE = new Set([".m4a", ".mp4", ".mov", ".aac"]);
const TO_WAV = new Set([".caf", ".aif", ".aiff"]);

const codecOf = (file) => {
  try {
    return execFileSync("ffprobe", ["-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_name", "-of", "csv=p=0", file])
      .toString().trim();
  } catch {
    return null;
  }
};

const walk = (p) => {
  if (!fs.existsSync(p)) return [];
  if (fs.statSync(p).isFile()) return [p];
  return fs.readdirSync(p, { withFileTypes: true }).flatMap((d) => (d.name.startsWith(".") ? [] : walk(path.join(p, d.name))));
};

/** Fixes every audio file under the given paths. Returns [{ file, from, to, output }] for each change. */
export const fixAudio = (...paths) => {
  const changes = [];
  for (const file of paths.flatMap(walk)) {
    const ext = path.extname(file).toLowerCase();
    if (!REENCODE_IN_PLACE.has(ext) && !TO_WAV.has(ext)) continue;
    const codec = codecOf(file);
    if (!codec || (REENCODE_IN_PLACE.has(ext) && PLAYABLE.has(codec))) continue; // no audio track, or already fine
    try {
      if (REENCODE_IN_PLACE.has(ext)) {
        const tmp = `${file}.fixing${ext}`;
        execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", file, "-vn", "-c:a", "aac", "-b:a", "256k", tmp]);
        fs.renameSync(tmp, file);
        changes.push({ file, from: codec, to: "aac", output: file });
      } else {
        const wav = file.slice(0, -ext.length) + ".wav";
        execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", file, "-vn", "-c:a", "pcm_s16le", "-ar", "48000", wav]);
        changes.push({ file, from: codec, to: "pcm_s16le", output: wav });
      }
    } catch (e) {
      changes.push({ file, from: codec, to: null, error: e.message.split("\n")[0] });
    }
  }
  return changes;
};

export const describe = (c) =>
  c.error
    ? `✕ couldn't convert ${c.file} (${c.from}): ${c.error}`
    : c.output === c.file
      ? `✓ ${c.file}: ${c.from} → AAC (same name)`
      : `✓ ${c.file}: ${c.from} → ${c.output} (use the .wav)`;

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const targets = process.argv.slice(2);
  if (!targets.length) {
    console.error("Usage: node tools/audiofix.mjs <file or folder> [...]");
    process.exit(1);
  }
  const changes = fixAudio(...targets);
  console.log(changes.length ? changes.map(describe).join("\n") : "All audio is already playable.");
  process.exit(changes.some((c) => c.error) ? 1 : 0);
}
