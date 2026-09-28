import { useVideoConfig } from "remotion";

/** One source, many frames: every scene asks the layout instead of hard-coding a shape. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return {
    W: width,
    H: height,
    portrait,
    /** Pick a value by frame shape: portrait (9:16, 4:5) first, landscape/square second. */
    p: <T,>(vertical: T, horizontal: T): T => (portrait ? vertical : horizontal),
  };
};
