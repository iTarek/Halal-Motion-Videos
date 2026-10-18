// Masters the soundtrack of a rendered film in place: two-pass EBU R128 loudnorm to -16 LUFS integrated,
// -1.5 dBTP true peak. The video stream is copied untouched. Called by tools/render.mjs (Windows, macOS, Linux).
// Any failure throws, so a render never reports success with unmastered audio. A silent soundtrack (e.g. a quick check
// of the first seconds, before any sound) has nothing to master and is left as rendered.
import { spawnSync, execFileSync } from "node:child_process";
import fs from "node:fs";

export const masterAudio = (file) => {
  const tmp = `${file.replace(/\.mp4$/i, "")}.mastering.mp4`; // never the input itself
  const target = "I=-16:TP=-1.5:LRA=11";

  const measure = spawnSync("ffmpeg", [
    "-hide_banner", "-nostats", "-i", file,
    "-af", `loudnorm=${target}:print_format=json`,
    "-f", "null", "-",
  ], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (measure.error) throw new Error(`Mastering ${file}: couldn't run ffmpeg (${measure.error.message}).`);
  if (measure.status !== 0) throw new Error(`Mastering ${file}: ffmpeg failed. ${measure.stderr.trim().split("\n").at(-1) ?? ""}`);
  const json = measure.stderr.match(/\{[^{}]*"input_i"[^{}]*\}/);
  if (!json) throw new Error(`Mastering ${file}: ffmpeg printed no loudness stats (no audio track?).`);
  const st = JSON.parse(json[0]);
  if (!Number.isFinite(Number(st.input_i))) return console.log(`silent soundtrack, nothing to master: ${file}`);

  try {
    execFileSync("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", file, "-c:v", "copy",
      "-af", `loudnorm=${target}:measured_I=${st.input_i}:measured_TP=${st.input_tp}:measured_LRA=${st.input_lra}:measured_thresh=${st.input_thresh}:offset=${st.target_offset}:linear=true,aresample=48000`,
      "-c:a", "aac", "-b:a", "320k", "-movflags", "+faststart", tmp,
    ], { stdio: "inherit" });
    fs.renameSync(tmp, file);
  } catch (e) {
    fs.rmSync(tmp, { force: true });
    throw e;
  }
  console.log(`mastered ${file}`);
};
