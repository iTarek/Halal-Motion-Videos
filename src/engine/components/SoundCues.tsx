import React, { createContext, useContext } from "react";
import { Sequence, interpolate, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";

/** Sound is muted in motion-blur sub-frame renders; the render tool adds it once at the end. See register.tsx. */
export const MuteSound = createContext(false);

/**
 * One sound at an absolute frame. `src` is a resolved URL: asset("sfx/x.wav") or shared("sfx/x.wav").
 * With `peak` (seconds from the file's start to its loudest moment — `SFX.<id>.peak` from sfx.gen.ts,
 * or `SHARED_SFX.<id>.peak`), `at` is where that loudest moment lands: the sound starts early to hit it.
 */
export type Cue = { at: number; src: string; vol: number; peak?: number };

/** Plays each cue once at its frame. Place cues from the timeline so retiming a scene moves its sound. */
export const SoundCues: React.FC<{ cues: Cue[] }> = ({ cues }) => {
  const { fps } = useVideoConfig();
  if (useContext(MuteSound)) return null;
  return (
    <>
      {cues.map((c, i) => {
        const from = c.at - Math.round((c.peak ?? 0) * fps);
        return (
          <Sequence key={i} from={Math.max(0, from)} layout="none">
            {/* a peak that would land before frame 0 trims the sound's start instead */}
            <Audio src={c.src} volume={c.vol} trimBefore={from < 0 ? -from : undefined} />
          </Sequence>
        );
      })}
    </>
  );
};

/** A continuous bed (air, music) under the whole film, faded in and out. */
export const AudioBed: React.FC<{ src: string; total: number; vol: number; fade?: number }> = ({
  src,
  total,
  vol,
  fade = 30,
}) => {
  if (useContext(MuteSound)) return null;
  return (
    <Audio
      src={src}
      volume={(f) =>
        interpolate(f, [0, fade, total - fade, total], [0, vol, vol, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      }
    />
  );
};
