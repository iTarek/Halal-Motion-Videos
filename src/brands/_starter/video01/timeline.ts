import { buildTimeline } from "../../../engine";

// Scene lengths in frames (30 fps), in play order. Start frames are computed.
export const timeline = buildTimeline({ title: 90, feature: 150, end: 90 }, { fps: 30, overlap: 8 });

export const FPS = timeline.fps;
export const TOTAL = timeline.total;
export const SCENES = timeline.scenes;
export type SceneKey = keyof typeof SCENES;
