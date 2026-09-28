import type React from "react";

/**
 * The few colour/typography roles the shared components need. A brand keeps
 * its own richer palette for its scenes and maps it onto these roles.
 */
export type Theme = {
  /** Reading direction of the film's copy. Drives text alignment and entry directions. */
  direction: "rtl" | "ltr";
  fonts: {
    /** UI / headline face (must be loaded by the brand, or a system font). */
    ui: string;
  };
  colors: {
    bg: string; // page background
    surface: string; // card fill
    text: string; // main copy
    accent: string; // brand accent: payoff lines, kicker, sweeps, glows
    accentLight: string; // lighter accent for highlights and edges
    positive: string; // "live" / success
    warning: string; // attention
  };
};

/** One output shape. Compositions are registered as `<brand>-<video>-<format.name>`. */
export type Format = { name: string; width: number; height: number };

/**
 * Everything the machine needs to register and render one video.
 * Folders: src/brands/<brand>/<id>/ · public/<brand>/<id>/ · out/<brand>/<id>/
 */
export type Video = {
  /** Brand (app / product) folder name. Lowercase kebab-case. */
  brand: string;
  /** Video folder name inside the brand, e.g. "video01". Lowercase kebab-case. */
  id: string;
  fps: number;
  durationInFrames: number;
  formats: Format[];
  /** Usually the brand's theme; a video may override it. */
  theme: Theme;
  /** The film itself — one component for every format; scenes adapt with useLayout(). */
  Film: React.FC;
};

/** Props every composition carries, so tools can find a video's compositions. */
export type VideoMeta = { brand: string; video: string; format: string };
