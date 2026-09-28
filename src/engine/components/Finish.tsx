import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { shared } from "../assets";

/** Film grain + vignette, laid over everything. */
export const Finish: React.FC<{ grain?: number; vignette?: number }> = ({ grain = 0.075, vignette = 0.55 }) => {
  const f = useCurrentFrame();
  const ox = (f * 137) % 512;
  const oy = (f * 311) % 512;
  return (
    <>
      <AbsoluteFill
        style={{
          backgroundImage: `url(${shared("img/grain.png")})`,
          backgroundSize: "512px 512px",
          backgroundPosition: `${ox}px ${oy}px`,
          opacity: grain,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,${vignette}) 100%)`,
          pointerEvents: "none",
        }}
      />
    </>
  );
};
