import type { Theme } from "../../../engine";

export { rgba } from "../../../engine";

// Brand palette. Replace with the product's real tokens (site CSS, brand guide).
export const C = {
  bg: "#0b0b0f",
  card: "#16161d",
  text: "#f4f4f6",
  muted: "#9a9aa6",
  accent: "#7c9cff",
  accentLight: "#c7d3ff",
  good: "#4ade80",
  warn: "#fbbf24",
} as const;

// Fonts. A system stack works with no files; to use brand fonts, drop them in
// public/<brand>/brand/fonts/ and load them in fonts.ts.
export const F = {
  ui: "Inter, 'Helvetica Neue', Arial, sans-serif",
} as const;

/** The palette mapped onto the engine's roles, for the shared components. */
export const theme: Theme = {
  direction: "ltr", // "rtl" for Arabic / Hebrew copy
  fonts: { ui: F.ui },
  colors: {
    bg: C.bg,
    surface: C.card,
    text: C.text,
    accent: C.accent,
    accentLight: C.accentLight,
    positive: C.good,
    warning: C.warn,
  },
};
