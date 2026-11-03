import React from "react";
import { Img, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ease, lerp, prog, SPRING, springTo, type SpringFeel } from "../anim";
import { useTheme } from "../theme";
import { Phone, phoneSize } from "./ui";

/** A pose of the device: degrees of turn, its size, and the point of the screen a zoom lands on (0–1). */
export type DeviceMove = { at: number; rx?: number; ry?: number; rz?: number; scale?: number; focus?: [number, number] };
/** A tap on the screen at frame `at`, at (x, y) from 0 to 1. Give it a sound cue on the same frame. */
export type DeviceTap = { at: number; x: number; y: number };

const TAP_FRAMES = 22;

/** What's on the screen: a screenshot, maybe scrolling, a recording, or anything else, with the taps on top. */
const Screen: React.FC<{
  height: number;
  src?: string;
  video?: string;
  videoAt: number;
  trim: number;
  scroll?: Array<[number, number]>;
  fit: "cover" | "contain";
  taps: DeviceTap[];
  feel: SpringFeel;
  children?: React.ReactNode;
}> = ({ height, src, video, videoAt, trim, scroll, fit, taps, feel, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors } = useTheme();
  const fill: React.CSSProperties = { width: "100%", height: "100%", display: "block", objectFit: fit, objectPosition: fit === "cover" ? "top" : "center" };
  // how far down a tall screenshot is: 0 its top, 1 its bottom edge at the bottom of the screen. The spring's overshoot
  // stops at the edges: past them there's no picture left to show.
  const down = scroll?.length ? clamp01(springTo(f, fps, scroll[0][1], scroll.slice(1), feel)) : 0;
  return (
    <>
      {children ??
        (video ? (
          <Sequence from={videoAt} layout="none">
            <OffthreadVideo src={video} muted trimBefore={trim || undefined} style={fill} />
          </Sequence>
        ) : src && scroll ? (
          <Img src={src} style={{ width: "100%", height: "auto", display: "block", transform: `translateY(calc(${-down} * (100% - ${height}px)))` }} />
        ) : src ? (
          <Img src={src} style={fill} />
        ) : null)}
      {taps.map((t, i) => {
        const age = f - t.at;
        if (age < -4 || age > TAP_FRAMES) return null;
        const ring = prog(f, t.at, TAP_FRAMES, ease.out);
        const size = height * 0.07;
        return (
          <React.Fragment key={i}>
            {/* the fingertip presses, then lifts */}
            <span
              style={{
                position: "absolute",
                left: `${t.x * 100}%`,
                top: `${t.y * 100}%`,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                borderRadius: "50%",
                background: "rgba(120,120,125,.42)", // shows on a light screen and a dark one
                opacity: prog(f, t.at - 4, 4) * (1 - prog(f, t.at + 6, 8)),
                transform: `scale(${lerp(1.15, 0.9, prog(f, t.at - 4, 4))})`,
              }}
            />
            <span
              style={{
                position: "absolute",
                left: `${t.x * 100}%`,
                top: `${t.y * 100}%`,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                borderRadius: "50%",
                border: `${Math.max(2, size * 0.05)}px solid ${colors.accent}`,
                opacity: age < 0 ? 0 : 1 - ring,
                transform: `scale(${lerp(0.8, 2.3, ring)})`,
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

/** The side of a device: copies of its outline stepping back, so it has thickness when it turns. */
const Edge: React.FC<{ radius: number; depth: number; color: string }> = ({ radius, depth, color }) => {
  const steps = Math.max(2, Math.ceil(depth / 2.5));
  return (
    <>
      {Array.from({ length: steps }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            background: color,
            filter: `brightness(${lerp(1.15, 0.7, i / (steps - 1))})`,
            transform: `translateZ(${-(i + 1) * (depth / steps)}px)`,
          }}
        />
      ))}
    </>
  );
};

/**
 * The product in use: a phone, laptop or browser that turns in 3D, zooms to a point of its screen and shows taps.
 * `src` is a screenshot, `video` a screen recording, or `children` anything else (a rebuilt screen, the film itself). `moves`
 * are poses that spring into each other, the first being the start:
 * `[{ at: 0, ry: -28, rx: 12, scale: 0.85 }, { at: 40, ry: 0, rx: 0, scale: 1 }, { at: 90, scale: 2.1, focus: [0.5, 0.22] }]`.
 * All frames count like useCurrentFrame(). It takes up the size of its front, so leave room under a laptop for its base. A
 * laptop's rx stays under about 20: past that, its base lifts over the screen.
 */
export const Device: React.FC<{
  kind?: "phone" | "laptop" | "browser";
  width: number;
  src?: string;
  video?: string;
  children?: React.ReactNode;
  /** The frame the recording starts on, and how many of its own frames to skip. */
  videoAt?: number;
  trim?: number;
  /** A tall screenshot moving inside the screen: [frame, 0 (its top) to 1 (its bottom)]. */
  scroll?: Array<[number, number]>;
  moves?: DeviceMove[];
  taps?: DeviceTap[];
  /** The address shown in a browser's bar. */
  url?: string;
  feel?: SpringFeel;
  /** The slow drift that keeps it alive between moves: 0 holds it still. */
  float?: number;
  fit?: "cover" | "contain";
  /** What shows where the picture doesn't reach. The video's background by default. */
  screenColor?: string;
  dim?: number;
  /** A phone only: see Phone. */
  topFade?: string;
  /** The colour of its body. */
  metal?: string;
  style?: React.CSSProperties;
}> = ({ kind = "phone", width, src, video, children, videoAt = 0, trim = 0, scroll, moves = [], taps = [], url = "", feel = SPRING.soft, float = 1, fit = "cover", screenColor, dim = 0, topFade, metal, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors, fonts } = useTheme();
  const screen = screenColor ?? colors.bg;

  const track = (read: (m: DeviceMove) => number | undefined, rest: number) => {
    const [first, ...later] = moves;
    const changes = later.flatMap((m): Array<[number, number]> => {
      const v = read(m);
      return v === undefined ? [] : [[m.at, v]];
    });
    return springTo(f, fps, (first && read(first)) ?? rest, changes, feel);
  };
  const scale = track((m) => m.scale, 1);
  const fx = track((m) => m.focus?.[0], 0.5);
  const fy = track((m) => m.focus?.[1], 0.5);
  const seconds = f / fps;
  const rx = track((m) => m.rx, 0) + Math.sin(seconds * 0.8) * 1.1 * float;
  const ry = track((m) => m.ry, 0) + Math.sin(seconds * 0.6 + 1.3) * 1.6 * float;
  const rz = track((m) => m.rz, 0);

  const content = (height: number) => (
    <Screen height={height} src={src} video={video} videoAt={videoAt} trim={trim} scroll={scroll} fit={fit} taps={taps} feel={feel}>
      {children}
    </Screen>
  );
  // a sheen on the glass that slides as the device turns
  const glare: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `linear-gradient(${112 + ry * 0.6}deg, rgba(255,255,255,${0.1 + clamp01(Math.abs(ry) / 35) * 0.12}) 0%, rgba(255,255,255,0) 42%)`,
  };

  let front: React.ReactNode;
  let height: number;
  let screenTop = 0; // where the screen starts: focus is a point of the screen, like a tap, and a browser's bar is above it
  if (kind === "phone") {
    const { height: h, radius, screenHeight } = phoneSize(width);
    height = h;
    front = (
      <>
        <Edge radius={radius} depth={width * 0.09} color={metal ?? "#332d28"} />
        <Phone width={width} screenColor={screen} dim={dim} topFade={topFade} style={{ position: "absolute", top: 0, left: 0 }}>
          {content(screenHeight)}
          <div style={glare} />
        </Phone>
      </>
    );
  } else if (kind === "laptop") {
    height = width * 0.645;
    const bezel = width * 0.013;
    const base = width * 0.66;
    const body = metal ?? "#c4c6cb";
    const screenHeight = height - bezel * 2.4;
    front = (
      <>
        {/* the base, swung forward from the hinge past square, as a lid leans back: its keyboard shows with the screen facing you */}
        <div
          style={{
            position: "absolute",
            top: height,
            left: -width * 0.035,
            width: width * 1.07,
            height: base,
            transformOrigin: "top",
            transform: "rotateX(68deg)",
            borderRadius: `0 0 ${width * 0.02}px ${width * 0.02}px`,
            background: `linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.5)), ${body}`,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.25)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "7%",
              left: "9%",
              right: "9%",
              height: "50%",
              borderRadius: width * 0.006,
              background: "#16171a",
              backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,.14) 0 1px, transparent 1px ${width * 0.052}px), repeating-linear-gradient(0deg, rgba(255,255,255,.14) 0 1px, transparent 1px ${base * 0.082}px)`,
            }}
          />
          <div style={{ position: "absolute", top: "61%", left: "33%", right: "33%", bottom: "6%", borderRadius: width * 0.008, background: "rgba(0,0,0,.09)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.14)" }} />
        </div>
        <Edge radius={width * 0.02} depth={width * 0.008} color={body} />
        <div style={{ position: "absolute", inset: 0, borderRadius: width * 0.02, background: "#0a0a0c", padding: `${bezel}px ${bezel}px ${bezel * 1.4}px`, boxSizing: "border-box" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: width * 0.004, background: screen }}>
            {content(screenHeight)}
            {dim > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(8,7,6,${dim})` }} />}
            <div style={glare} />
          </div>
          <div style={{ position: "absolute", top: 0, left: "50%", width: width * 0.14, height: bezel * 1.5, marginLeft: -width * 0.07, borderRadius: `0 0 ${bezel}px ${bezel}px`, background: "#0a0a0c" }} />
        </div>
      </>
    );
  } else {
    height = width * 0.65;
    const bar = width * 0.052;
    const r = width * 0.018;
    screenTop = bar;
    front = (
      <>
        <Edge radius={r} depth={width * 0.006} color={metal ?? "#8c8d91"} />
        <div style={{ position: "absolute", inset: 0, borderRadius: r, overflow: "hidden", background: screen, boxShadow: `0 ${width * 0.04}px ${width * 0.1}px rgba(0,0,0,.45)` }}>
          <div style={{ height: bar, display: "flex", alignItems: "center", gap: bar * 0.16, padding: `0 ${bar * 0.32}px`, background: "#ecedef", direction: "ltr", boxSizing: "border-box" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} style={{ width: bar * 0.24, height: bar * 0.24, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ flex: 1, minWidth: 0, margin: `0 ${bar}px`, textAlign: "center", fontFamily: fonts.ui, fontSize: bar * 0.34, lineHeight: `${bar * 0.62}px`, height: bar * 0.62, borderRadius: bar * 0.16, background: "#fff", color: "#4a4b50", clipPath: "inset(-1em 0)", whiteSpace: "nowrap" }}>
              {url}
            </span>
          </div>
          <div style={{ position: "relative", width: "100%", height: height - bar, overflow: "hidden" }}>
            {content(height - bar)}
            {dim > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(8,7,6,${dim})` }} />}
          </div>
          <div style={glare} />
        </div>
      </>
    );
  }

  // the zoom lands on its point: at twice the size or more that point is in the middle
  const pull = scale * clamp01(scale - 1);
  return (
    <div style={{ position: "relative", width, height, perspective: width * 3.2, ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transform: `translate(${(0.5 - fx) * width * pull}px, ${(height / 2 - (screenTop + fy * (height - screenTop))) * pull}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`,
        }}
      >
        {front}
      </div>
    </div>
  );
};
