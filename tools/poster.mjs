// The thumbnail every platform shows. X, Slack, Discord, WhatsApp and most players show frame 0 of an MP4 before it
// plays, and a motion video's first frame is usually blank or mid-animation. bakePoster copies the video's poster
// frame (Video.poster: its strongest settled frame) over frame 0 — a 1/30 s flash nobody sees, with the duration,
// every other frame and the audio unchanged — and saves it as a JPG for platforms that take an uploaded cover.
// Called by tools/render.mjs after mastering. Any failure throws.
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const ff = (args) => {
  const r = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (r.error) throw new Error(`Poster: couldn't run ffmpeg (${r.error.message}).`);
  if (r.status !== 0) throw new Error(`Poster: ffmpeg failed. ${r.stderr.trim().split("\n").at(-1) ?? ""}`);
};

/** file: a finished MP4, changed in place. frame: its poster frame. jpg: where the cover image goes. */
export const bakePoster = (file, frame, jpg) => {
  const tmp = `${file.replace(/\.mp4$/i, "")}.poster.mp4`; // never the input itself
  const pick = `select=eq(n\\,${frame})`;
  try {
    ff(["-i", file, "-vf", pick, "-frames:v", "1", "-q:v", "2", jpg]);
    if (!fs.existsSync(jpg)) throw new Error(`Poster: frame ${frame} isn't in ${file}.`);
    // The same file twice: frame N of the second copy, moved to time 0, covers frame 0 of the first. Both are the
    // video's own pixels, so there's no colour conversion on the way.
    ff([
      "-i", file, "-i", file,
      "-filter_complex", `[1:v]${pick},setpts=PTS-STARTPTS[p];[0:v][p]overlay=0:0:enable='eq(n,0)'[v]`,
      "-map", "[v]", "-map", "0:a?",
      "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p",
      "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
      "-c:a", "copy", "-movflags", "+faststart", tmp,
    ]);
    fs.renameSync(tmp, file);
  } catch (e) {
    fs.rmSync(tmp, { force: true });
    throw e;
  }
  console.log(`poster: frame ${frame} is now frame 0, and ${jpg}`);
};
