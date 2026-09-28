import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ease, lerp, prog } from "../anim";
import { useTheme } from "../theme";

/** Frames on either side of a cut that the hand-off takes. */
export const HANDOFF = 7;

/**
 * Every scene arrives from depth and leaves toward (push) or away from (drop)
 * the camera. The exit is late and fast (expo-in across the cut) and the entry
 * becomes readable only as the exit clears, so two sets of words are never
 * legible on screen at once — the hand-off reads as one move, not a dissolve.
 */
export const SceneFrame: React.FC<{
  dur: number;
  enter?: "depth" | "none";
  exit?: "push" | "drop" | "none";
  drift?: number;
  children: React.ReactNode;
}> = ({ dur, enter = "depth", exit = "push", drift = 0.03, children }) => {
  const f = useCurrentFrame();
  const { direction } = useTheme();
  const e = enter === "none" ? 1 : prog(f, 0, 20, ease.out);
  const eOpacity = enter === "none" ? 1 : prog(f, 3, 12, ease.soft);
  const x = exit === "none" ? 0 : prog(f, dur - HANDOFF, HANDOFF * 2, ease.in);

  const scaleIn = lerp(0.88, 1, e);
  const scaleOut = exit === "push" ? lerp(1, 1.28, x) : lerp(1, 0.86, x);
  const push = 1 + drift * (f / dur);
  const blur = (1 - e) * 12 + x * 24;

  return (
    <AbsoluteFill
      style={{
        direction,
        opacity: eOpacity * (1 - x),
        transform: `translateY(${exit === "drop" ? x * 90 : 0}px) scale(${scaleIn * scaleOut * push})`,
        filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
