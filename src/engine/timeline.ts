export type SceneSpan = { from: number; dur: number };

/**
 * Builds a film's master timeline from scene lengths (frames), in play order.
 * Each scene's sequence runs `overlap` frames past its cut so its exit plays
 * under the next entrance — no hard cuts, no dead frames. The last scene
 * doesn't overlap.
 */
export const buildTimeline = <K extends string>(
  durations: Record<K, number>,
  { fps = 30, overlap = 8 }: { fps?: number; overlap?: number } = {},
) => {
  const keys = Object.keys(durations) as K[];
  const scenes = {} as Record<K, SceneSpan>;
  let at = 0;
  for (const k of keys) {
    scenes[k] = { from: at, dur: durations[k] };
    at += durations[k];
  }
  const last = keys[keys.length - 1];
  return {
    fps,
    overlap,
    total: at,
    keys,
    scenes,
    /** Sequence span for a scene, including the tail that overlaps the next one. */
    span: (k: K) => ({ from: scenes[k].from, durationInFrames: scenes[k].dur + (k === last ? 0 : overlap) }),
  };
};

export type Timeline<K extends string = string> = ReturnType<typeof buildTimeline<K>>;
