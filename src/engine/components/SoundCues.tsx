import React from "react";
import { Sequence, interpolate } from "remotion";
import { Audio } from "@remotion/media";

/** One sound at an absolute frame. `src` is a resolved URL: asset("sfx/x.wav") or shared("sfx/x.wav"). */
export type Cue = { at: number; src: string; vol: number };

/** Plays each cue once at its frame. Place cues from the timeline so retiming a scene moves its sound. */
export const SoundCues: React.FC<{ cues: Cue[] }> = ({ cues }) => (
  <>
    {cues.map((c, i) => (
      <Sequence key={i} from={c.at} layout="none">
        <Audio src={c.src} volume={c.vol} />
      </Sequence>
    ))}
  </>
);

/** A continuous bed (air, music) under the whole film, faded in and out. */
export const AudioBed: React.FC<{ src: string; total: number; vol: number; fade?: number }> = ({
  src,
  total,
  vol,
  fade = 30,
}) => (
  <Audio
    src={src}
    volume={(f) =>
      interpolate(f, [0, fade, total - fade, total], [0, vol, vol, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    }
    durationInFrames={1817}
    from={4}
  />
);
