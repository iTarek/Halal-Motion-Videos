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
