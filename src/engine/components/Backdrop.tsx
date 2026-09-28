import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { rgba } from "../color";
import { useLayout } from "../layout";
import { useTheme } from "../theme";

/**
 * A neutral persistent background: theme bg, a slowly drifting accent key
 * light, and an optional hairline grid. Videos with a story-driven mood
 * (e.g. a mood that shifts colour per scene) write their own in the video's components/.
 */
export const Backdrop: React.FC<{ glow?: number; grid?: boolean }> = ({ glow = 0.16, grid = true }) => {
  const f = useCurrentFrame();
  const { W, H, portrait } = useLayout();
  const { colors } = useTheme();
  const gx = 78 - 14 * Math.sin(f / 140);
  const gy = 16 + 8 * Math.sin(f / 97 + 1);
  const big = Math.max(W, H);
  const cell = portrait ? 72 : 80;
  const shift = (f * 0.35) % cell;
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(${big * 0.62}px ${big * 0.5}px at ${gx}% ${gy}%, ${rgba(colors.accent, glow)}, transparent 68%)`,
        }}
      />
      {grid && (
        <AbsoluteFill
          style={{
            opacity: 0.55,
            backgroundImage: `linear-gradient(${rgba(colors.accent, 0.05)} 1px, transparent 1px), linear-gradient(90deg, ${rgba(colors.accent, 0.05)} 1px, transparent 1px)`,
            backgroundSize: `${cell}px ${cell}px`,
            backgroundPosition: `${-shift}px ${shift}px`,
            maskImage: "radial-gradient(circle at 62% 22%, #000, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 62% 22%, #000, transparent 70%)",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
