import React from "react";
import { AudioBed, type Cue, shared, SHARED_SFX, SoundCues } from "../../../engine";
import { COPY } from "./copy";
import { POINTS } from "./scenes/Feature";
import { SCENES, TOTAL, timeline } from "./timeline";

// The shared synthesized kit (public/_shared/sfx). For the product's own sounds,
// put files in public/<brand>/brand/sfx/ (or this video's folder) and use
// brandAsset("sfx/<file>") / asset("sfx/<file>").
// `peak` makes `at` the frame where the sound is loudest, so each one lands on its moment.
const kit = (id: keyof typeof SHARED_SFX) => ({ src: shared(SHARED_SFX[id].src), peak: SHARED_SFX[id].peak });
const S = SCENES;
const [toFeature] = timeline.cuts; // the middle of the scene change, where review draws its coral line
const brandIn = S.end.from + 8; // End.tsx reveals the brand name at its frame 8: the payoff

const cues: Cue[] = [
  { at: 4, ...kit("sub-soft"), vol: 0.6 }, // the hook: a soft thump, saving the big impact for the payoff
  { at: toFeature, ...kit("whoosh-up"), vol: 0.45 },
  ...COPY.feature.points.map((_, i) => ({ at: S.feature.from + POINTS.start + POINTS.step * i, ...kit("tick"), vol: 0.4 })),
  { at: brandIn, ...kit("riser"), vol: 0.4 }, // the one riser, peaking on the payoff
  { at: brandIn, ...kit("sub-hit"), vol: 0.7 }, // the one big impact
  { at: brandIn + 6, ...kit("shimmer"), vol: 0.5 },
];

export const Soundtrack: React.FC = () => (
  <>
    <AudioBed src={shared(SHARED_SFX["air-bed"].src)} total={TOTAL} vol={0.2} />
    <SoundCues cues={cues} />
  </>
);
