import React from "react";
import { AudioBed, type Cue, shared, SoundCues } from "../../../engine";
import { COPY } from "./copy";
import { POINTS } from "./scenes/Feature";
import { SCENES, TOTAL } from "./timeline";

// The shared synthesized kit (public/_shared/sfx). For the product's own sounds,
// put files in public/<brand>/brand/sfx/ (or this video's folder) and use
// brandAsset("sfx/<file>") / asset("sfx/<file>").
const kit = (name: string) => shared(`sfx/${name}`);
const S = SCENES;

const cues: Cue[] = [
  { at: 4, src: kit("sub-hit.wav"), vol: 0.7 },
  { at: S.feature.from - 6, src: kit("whoosh-up.wav"), vol: 0.45 },
  ...COPY.feature.points.map((_, i) => ({ at: S.feature.from + POINTS.start + POINTS.step * i, src: kit("tick.wav"), vol: 0.4 })),
  { at: S.end.from - 34, src: kit("riser.wav"), vol: 0.4 },
  { at: S.end.from + 2, src: kit("shimmer.wav"), vol: 0.5 },
  { at: S.end.from + 4, src: kit("sub-hit.wav"), vol: 0.7 },
];

export const Soundtrack: React.FC = () => (
  <>
    <AudioBed src={kit("air-bed.wav")} total={TOTAL} vol={0.2} />
    <SoundCues cues={cues} />
  </>
);
