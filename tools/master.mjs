// Two-pass EBU R128 loudnorm audio mastering in Node.
// Replaces master.sh for cross-platform Windows/Mac/Linux support.
import { spawnSync, execFileSync } from "node:child_process";
import fs from "node:fs";

export const masterAudio = (file) => {
  const tmp = file.replace(/\.mp4$/, ".mastering.mp4");
  const target = "I=-16:TP=-1.5:LRA=11";
  try {
    const res = spawnSync("ffmpeg", [
      "-hide_banner", "-nostats", "-i", file,
      "-af", `loudnorm=${target}:print_format=json`,
      "-f", "null", "-"
    ], { encoding: "utf8" });

    const jsonMatch = (res.stderr || "").match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      console.log(`mastered (passthrough) ${file}`);
      return;
    }
    const stats = JSON.parse(jsonMatch[0]);
    const af = `loudnorm=${target}:measured_I=${stats.input_i}:measured_TP=${stats.input_tp}:measured_LRA=${stats.input_lra}:measured_thresh=${stats.input_thresh}:offset=${stats.target_offset}:linear=true,aresample=48000`;
    
    execFileSync("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", file, "-c:v", "copy",
      "-af", af, "-c:a", "aac", "-b:a", "320k",
      "-movflags", "+faststart", tmp
    ], { stdio: "inherit" });

    fs.renameSync(tmp, file);
    console.log(`mastered ${file}`);
  } catch (e) {
    if (fs.existsSync(tmp)) fs.rmSync(tmp, { force: true });
    console.log(`mastering note: ${e.message}`);
  }
};
