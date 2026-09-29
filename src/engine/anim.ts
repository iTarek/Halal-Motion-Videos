import { Easing, interpolate } from "remotion";

export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // expo-out: fast arrival, long settle
  inOut: Easing.bezier(0.83, 0, 0.17, 1), // quint in-out: camera moves
  in: Easing.bezier(0.7, 0, 0.84, 0), // expo-in: exits
  soft: Easing.bezier(0.33, 1, 0.68, 1), // cubic-out
  back: Easing.bezier(0.34, 1.56, 0.64, 1), // slight overshoot
};

/** Clamped 0→1 progress of `frame` across [start, start + dur]. */
export const prog = (frame: number, start: number, dur: number, easing = ease.out) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Deterministic pseudo-noise in [-1, 1] — for waveform bars and jitter. */
export const noise = (x: number, seed = 0) => {
  const s = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453;
  const a = s - Math.floor(s);
  const s2 = Math.sin((x + 1) * 12.9898 + seed * 78.233) * 43758.5453;
  const b = s2 - Math.floor(s2);
  const t = x - Math.floor(x);
  const k = t * t * (3 - 2 * t);
  return (a + (b - a) * k) * 2 - 1;
};

// ---------- springs: motion with weight (speeds up, overshoots a hair, settles)
// Closed-form, so any frame can be computed on its own — renders stay deterministic.

export type SpringFeel = { freq: number; damping: number };
/** Ready-made feels. freq = oscillations per second, damping 0–1 (lower = more bounce). */
export const SPRING = {
  snappy: { freq: 4, damping: 0.72 }, // UI that clicks into place
  bouncy: { freq: 3, damping: 0.45 }, // playful pop with a visible overshoot
  soft: { freq: 1.6, damping: 0.85 }, // big, heavy things; camera moves
} satisfies Record<string, SpringFeel>;

/** Damped spring from 0 to 1, `tau` seconds after it starts. Overshoots slightly past 1, then settles. */
export const springStep = (tau: number, { freq, damping }: SpringFeel = SPRING.snappy) => {
  if (tau <= 0) return 0;
  const z = Math.min(damping, 0.999);
  const w = 2 * Math.PI * freq;
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * tau) * (Math.cos(wd * tau) + ((z * w) / wd) * Math.sin(wd * tau));
};

/** Spring progress (0 → ~1) at `frame`, starting at frame `start`. Use it instead of prog() for things with mass. */
export const springAt = (frame: number, start: number, fps: number, feel: SpringFeel = SPRING.snappy) =>
  springStep((frame - start) / fps, feel);

/**
 * A value that springs to new targets over time: begins at `base`, and at each [startFrame, target]
 * springs onward from wherever it is. e.g. springTo(f, fps, 0, [[10, 400], [60, 250]]) for an x position.
 */
export const springTo = (
  frame: number,
  fps: number,
  base: number,
  changes: Array<[number, number]>,
  feel: SpringFeel = SPRING.snappy,
) => {
  let v = base;
  let prev = base;
  for (const [start, to] of changes) {
    v += (to - prev) * springAt(frame, start, fps, feel);
    prev = to;
  }
  return v;
};
