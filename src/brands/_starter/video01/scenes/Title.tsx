import React from "react";
import { AbsoluteFill } from "remotion";
import { Headline, SceneFrame } from "../../../../engine";
import { COPY } from "../copy";
import { SCENES } from "../timeline";

const T = COPY.title;

/** Cold open and poster: only the headline, word by word, payoff line in the accent colour. Smaller text wouldn't read in a profile grid. */
export const Title: React.FC = () => {
  return (
    <SceneFrame dur={SCENES.title.dur} enter="none" exit="push" drift={0.035}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {/* 140 px reads in a profile grid; on 9:16 a line must stay under about 10 letters to clear the right 12% TikTok, Reels and Shorts cover */}
        <Headline lines={[{ words: T.l1 }, { words: T.l2, accent: true }]} size={140} start={10} align="center" />
      </AbsoluteFill>
    </SceneFrame>
  );
};
