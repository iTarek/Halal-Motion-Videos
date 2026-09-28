import React from "react";
import { AbsoluteFill } from "remotion";
import { Headline, Kicker, SceneFrame, useLayout } from "../../../../engine";
import { COPY } from "../copy";
import { SCENES } from "../timeline";

const T = COPY.title;

/** Cold open: kicker, then the headline word by word, payoff line in the accent colour. */
export const Title: React.FC = () => {
  const { p } = useLayout();
  return (
    <SceneFrame dur={SCENES.title.dur} enter="none" exit="push" drift={0.035}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: p(36, 30) }}>
        <Kicker at={4} text={T.kicker} size={p(36, 32)} align="center" />
        <Headline lines={[{ words: T.l1 }, { words: T.l2, accent: true }]} size={p(150, 140)} start={10} align="center" />
      </AbsoluteFill>
    </SceneFrame>
  );
};
