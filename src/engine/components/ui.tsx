import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { rgba } from "../color";
import { ease, lerp, noise, prog } from "../anim";
import { useTheme } from "../theme";

/** One whole word arriving: rise + unblur + fade. Never splits Arabic letters. */
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  dy?: number;
  scaleFrom?: number;
  blur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, dur = 18, dy = 0.4, scaleFrom = 1, blur = 12, style, children }) => {
  const f = useCurrentFrame();
  const t = prog(f, at, dur, ease.out);
  return (
    <span
      style={{
        display: "inline-block",
        opacity: t,
        transform: `translateY(${(1 - t) * dy}em) scale(${lerp(scaleFrom, 1, t)})`,
        filter: t < 0.999 ? `blur(${(1 - t) * blur}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export type HeadLine = { words: string[]; accent?: boolean };

/** Headline pattern: text-colour line(s), then the payoff line (`accent: true`) in the accent colour. */
export const Headline: React.FC<{
  lines: HeadLine[];
  size: number;
  start: number;
  stagger?: number;
  align?: "start" | "center";
  lineHeight?: number;
  weight?: number;
}> = ({ lines, size, start, stagger = 3, align = "start", lineHeight = 1.28, weight = 700 }) => {
  const { direction, fonts, colors } = useTheme();
  let i = 0;
  return (
    <div
      style={{
        fontFamily: fonts.ui,
        fontWeight: weight,
        fontSize: size,
        lineHeight,
        textAlign: align === "center" ? "center" : direction === "rtl" ? "right" : "left",
        direction,
      }}
    >
      {lines.map((line, li) => (
        <div key={li} style={{ color: line.accent ? colors.accent : colors.text, whiteSpace: "nowrap" }}>
          {line.words.map((w, wi) => {
            const at = start + i++ * stagger;
            return (
              <React.Fragment key={wi}>
                <Reveal at={at}>{w}</Reveal>
                {wi < line.words.length - 1 ? " " : null}
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Section kicker: optional number chip, label, and a hairline drawing out after it. */
export const Kicker: React.FC<{
  at: number;
  num?: string;
  text: string;
  size?: number;
  align?: "start" | "center";
}> = ({ at, num, text, size = 30, align = "start" }) => {
  const f = useCurrentFrame();
  const { direction, fonts, colors } = useTheme();
  const rtl = direction === "rtl";
  const t = prog(f, at, 16);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: align === "center" ? "center" : "flex-start",
        direction,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: size * 0.5,
          opacity: t,
          transform: `translateX(${(1 - t) * (rtl ? 40 : -40)}px)`,
          fontFamily: fonts.ui,
          fontWeight: 600,
          fontSize: size,
          color: rgba(colors.accent, 0.8),
        }}
      >
        {num && (
          <span
            style={{
              fontSize: size * 0.8,
              padding: `${size * 0.08}px ${size * 0.34}px`,
              border: `2px solid ${rgba(colors.accent, 0.32)}`,
              borderRadius: size * 0.36,
              color: colors.accent,
              direction: "ltr",
            }}
          >
            {num}
          </span>
        )}
        <span>{text}</span>
        <span
          style={{
            width: lerp(0, size * 2.4, prog(f, at + 6, 20)),
            height: 2,
            background: `linear-gradient(${rtl ? 90 : 270}deg, transparent, ${rgba(colors.accent, 0.6)})`,
          }}
        />
      </div>
    </div>
  );
};

/** Glass card: accent-tinted edge and sheen over the surface colour. */
export const Card: React.FC<{ style?: React.CSSProperties; radius?: number; children: React.ReactNode }> = ({
  style,
  radius = 40,
  children,
}) => {
  const { direction, colors } = useTheme();
  return (
    <div
      style={{
        position: "relative",
        borderRadius: radius,
        border: `2px solid ${rgba(colors.accent, 0.17)}`,
        background: `linear-gradient(165deg, ${rgba(colors.accent, 0.1)}, rgba(255,255,255,.02)), ${rgba(colors.surface, 0.82)}`,
        boxShadow: `0 40px 90px rgba(0,0,0,.55), inset 0 1px 0 ${rgba(colors.accentLight, 0.08)}`,
        direction,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Voice line: bars breathing with a live amplitude (0–1). */
export const Waveform: React.FC<{
  width: number;
  height: number;
  bars?: number;
  amp: number;
  color?: string;
  seed?: number;
}> = ({ width, height, bars = 34, amp, color, seed = 1 }) => {
  const f = useCurrentFrame();
  const { colors } = useTheme();
  const barW = (width / bars) * 0.5;
  return (
    <div style={{ width, height, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {Array.from({ length: bars }).map((_, i) => {
        const center = 1 - Math.abs(i / (bars - 1) - 0.5) * 1.3;
        const n = Math.abs(noise(f * 0.22 + i * 0.73, seed + i * 0.01));
        const h = Math.max(barW, height * (0.1 + 0.9 * amp * center * (0.35 + 0.65 * n)));
        return (
          <span
            key={i}
            style={{
              width: barW,
              height: h,
              borderRadius: barW,
              background: color ?? colors.accent,
              opacity: 0.35 + 0.65 * amp * center,
            }}
          />
        );
      })}
    </div>
  );
};

/** Pulsing "live" dot in the positive colour. */
export const LiveDot: React.FC<{ size: number }> = ({ size }) => {
  const f = useCurrentFrame();
  const { colors } = useTheme();
  const pulse = 0.55 + 0.45 * Math.sin(f / 5);
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: colors.positive,
        boxShadow: `0 0 ${size * 1.6 * pulse}px ${colors.positive}`,
        display: "inline-block",
        flex: "none",
      }}
    />
  );
};

/** iPhone shell (bronze-black) around a screenshot. `src` is a resolved URL, e.g. asset("img/screen.jpg"). */
export const Phone: React.FC<{
  width: number;
  src: string;
  style?: React.CSSProperties;
  dim?: number;
  /** "contain" for a screenshot whose ratio differs — never stretch Quran text. */
  fit?: "cover" | "contain";
  screenColor?: string;
  /** The screenshots were cropped without a status bar: fade the top into the
   *  screen's own colour so the island sits on a clean band, not a clipped line. */
  topFade?: string;
}> = ({ width, src, style, dim = 0, fit = "cover", screenColor = "#f6f0e6", topFade }) => {
  const { colors } = useTheme();
  const height = width * (2796 / 1290) + width * 0.06;
  const pad = width * 0.03;
  const r = width * 0.15;
  return (
    <div
      style={{
        width,
        height,
        padding: pad,
        borderRadius: r,
        background: "linear-gradient(145deg, #413a34, #171411 38%, #0b0907 72%, #302a25)",
        boxShadow: `0 ${width * 0.12}px ${width * 0.26}px rgba(0,0,0,.6), 0 0 0 2px ${rgba(colors.accentLight, 0.18)}, 0 0 ${width * 0.2}px ${rgba(colors.accent, 0.12)}`,
        boxSizing: "border-box",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: r - pad,
          overflow: "hidden",
          position: "relative",
          background: screenColor,
        }}
      >
        <Img
          src={src}
          style={{ width: "100%", height: "100%", objectFit: fit, objectPosition: fit === "cover" ? "top" : "center" }}
        />
        {topFade && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: width * 0.2,
              background: `linear-gradient(180deg, ${topFade} 0%, ${topFade} 52%, transparent 100%)`,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: width * 0.025,
            left: "50%",
            width: width * 0.3,
            height: width * 0.085,
            marginLeft: -width * 0.15,
            borderRadius: width,
            background: "#060504",
          }}
        />
        {dim > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(8,7,6,${dim})` }} />}
      </div>
    </div>
  );
};
