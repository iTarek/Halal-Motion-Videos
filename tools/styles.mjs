// The video-style library: named, reusable descriptions of look, motion and pacing.
// Any video of any brand can pick one in the dashboard; the Director passes it to Claude.
// Stored in styles/library.json on this machine (git-ignored). Until you save one, the built-in
// STARTERS below are the library.
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./settings.mjs";

const FILE = path.join(ROOT, "styles", "library.json");

const STARTERS = [
  {
    id: "calm-cinematic",
    name: "Calm & cinematic",
    text: "Slow, confident pacing. Long eased camera pushes, soft depth blur between scenes, warm glows and film grain. One idea per scene, lots of breathing room, large quiet type. Sound: airy bed, soft whooshes, no hard hits.",
  },
  {
    id: "bold-punchy",
    name: "Bold & punchy",
    text: "Fast cuts on the beat, snappy overshoot easing, big heavy type that slams in word by word, high contrast, quick zooms. Short scenes (1.5–3 s). Sound: tight hits and risers on every cut.",
  },
  {
    id: "clean-product-demo",
    name: "Clean product demo",
    text: "Minimal and clear. Real app screens in device frames, gentle slides and fades, UI highlights and cursor-like focus rings on the feature being shown. Short captions under each screen. Neutral, friendly pacing.",
  },
  {
    id: "studio-showreel",
    name: "Studio showreel",
    text: "Premium, high-energy flagship piece — like a top Dribbble/Behance motion designer's portfolio showreel, not a standard promo. Cinematic, crisp, modern and memorable; every transition intentionally designed. Look: bold, confident typography; clean contemporary visual language; layered depth with subtle 3D perspective; the product's own UI is the hero, beautifully animated. Motion: fast, fluid, highly polished kinetic type; smooth UI transitions and seamless match cuts; dynamic camera moves (pushes, orbits, rack-focus depth); refined micro-interactions (taps, highlights, cursors, toggles); audio-reactive waveforms. Arc: build momentum the whole way — striking brand reveal → fast transition into the product → feature showcase → accelerating montage of UI interactions → a powerful, clean hero shot of the product/URL with a clear 'Try it now' call to action. Tone: premium, technological, contemporary. No generic stock imagery, excessive ornament or clichés — let the interface, typography, sound and motion carry the identity, and stay respectful of sacred subject matter. Sound: tight, designed hits and whooshes locked to cuts, rising energy toward the end.",
  },
];

const slug = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48) || `style-${Date.now()}`;

export const listStyles = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return STARTERS;
  }
};

const write = (list) => {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2) + "\n");
};

export const getStyle = (id) => (id ? listStyles().find((s) => s.id === id) ?? null : null);

/** Creates or updates a style by name (same name → same style). Returns it. */
export const saveStyle = ({ name, text }) => {
  name = String(name ?? "").trim().slice(0, 60);
  text = String(text ?? "").trim().slice(0, 2000);
  if (!name) throw new Error("Give the style a name.");
  if (!text) throw new Error("Describe the style first.");
  const list = listStyles();
  const id = slug(name);
  const i = list.findIndex((s) => s.id === id);
  const style = { id, name, text };
  if (i >= 0) list[i] = style;
  else list.push(style);
  write(list);
  return style;
};

export const deleteStyle = (id) => {
  const list = listStyles();
  if (!list.some((s) => s.id === id)) throw new Error("No such style.");
  write(list.filter((s) => s.id !== id));
};
