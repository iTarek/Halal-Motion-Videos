import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rgba } from "../color";
import { ease, lerp, prog } from "../anim";
import { useTheme } from "../theme";

/**
 * A soft band of accent light crossing the frame in the reading direction at
 * a scene cut. It carries the eye across the hand-off.
 */
export const Sweep: React.FC<{ at: number; dur?: number; strength?: number }> = ({ at, dur = 16, strength = 0.11 }) => {
  const f = useCurrentFrame();
  const { direction, colors } = useTheme();
  const t = prog(f, at - dur / 2, dur, ease.inOut);
  if (t <= 0 || t >= 1) return null;
  const pos = direction === "rtl" ? lerp(130, -30, t) : lerp(-30, 130, t);
  const a = strength * Math.sin(Math.PI * t);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        mixBlendMode: "screen",
        background: `linear-gradient(105deg, transparent ${pos - 22}%, ${rgba(colors.accent, a)} ${pos}%, transparent ${pos + 22}%)`,
      }}
    />
  );
};
