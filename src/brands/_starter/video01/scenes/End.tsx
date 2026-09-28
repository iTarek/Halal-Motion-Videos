import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ease, lerp, prog, Reveal, rgba, SceneFrame, useLayout, useTheme } from "../../../../engine";
import { COPY } from "../copy";
import { SCENES } from "../timeline";

const T = COPY.end;

/** Endcard: accent bloom, brand name, tagline, URL. Holds to the last frame. */
export const End: React.FC = () => {
  const f = useCurrentFrame();
  const { W, p } = useLayout();
  const { colors, fonts } = useTheme();
  const bloom = prog(f, 0, 30, ease.out);
  return (
    <SceneFrame dur={SCENES.end.dur} exit="none" drift={0.02}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            width: W * 0.9,
            height: W * 0.9,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${rgba(colors.accent, 0.25)}, transparent 62%)`,
            opacity: bloom,
            transform: `scale(${lerp(0.4, 1, bloom)})`,
          }}
        />
        <div style={{ textAlign: "center", fontFamily: fonts.ui }}>
          <div style={{ fontSize: p(170, 170), fontWeight: 800, color: colors.accentLight, lineHeight: 1.1 }}>
            <Reveal at={8} dur={20} scaleFrom={1.12} blur={16} dy={0.2}>
              {T.brand}
            </Reveal>
          </div>
          <div style={{ fontSize: p(56, 54), fontWeight: 500, color: colors.text, marginTop: 18 }}>
            <Reveal at={20}>{T.tagline}</Reveal>
          </div>
          <div style={{ fontSize: 32, color: rgba(colors.text, 0.55), marginTop: 40, opacity: prog(f, 34, 14) }}>{T.url}</div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
