import { HORIZONTAL, VERTICAL, type Video } from "../../../engine";
import { BRAND_ID } from "../brand/assets";
import { theme } from "../brand/theme";
import { VIDEO_ID } from "./assets";
import { Film } from "./Film";
import { FPS, SCENES, TOTAL, timeline } from "./timeline";

/** See BRIEF.md in this folder for what this video is and what it's built from. */
const video: Video = {
  brand: BRAND_ID,
  id: VIDEO_ID,
  fps: FPS,
  durationInFrames: TOTAL,
  formats: [VERTICAL, HORIZONTAL], // also available: SQUARE, PORTRAIT (4:5)
  theme,
  Film,
  cuts: timeline.cuts, // review checks each scene change frame by frame
  poster: SCENES.title.from + 60, // the thumbnail: the strongest settled frame — pick it once the film is built
};

export default video;
