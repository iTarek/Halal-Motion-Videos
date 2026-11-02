// The video-style library: named, reusable descriptions of look, motion and pacing.
// Any video of any brand can pick one in the dashboard; the Director passes it to Claude.
// Stored in styles/library.json on this machine (git-ignored). Until you save one, the built-in
// STARTERS below are the library. BANK is added to any library, old or new: a library saved before
// these came along gets them too, and one you delete stays deleted.
// BANK's looks come from majedphotos/video-ad-editor (MIT, (c) 2026 Majed Alzaabi), described anew for this engine.
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

const BANK = [
  {
    id: "keynote",
    name: "Keynote",
    text: "A keynote stage: near-white (#F5F5F7), dark ink, huge empty space, one word or number carrying each scene, one accent colour only. A style, not an imitation: no Apple logo or icons. Few moves, precisely eased with no bounce, long holds. Best for a reveal, a number, a launch. Sound: restrained, one clean hit on the reveal. Mixes well with News explainer, Tool card, Product studio.",
  },
  {
    id: "glass-ui",
    name: "Glass UI",
    text: "Notifications, cards and widgets in frosted glass floating over the product, as if the screen itself is talking. Dark base (#0E1116), white text, translucent blurred panels with a thin light edge and a soft shadow, no grain. Soft overshoot: panels slide in and stack like real notifications. Best for apps, chat, lists. Signature: a notification stack, a search bar turning into an answer. Mixes well with Keynote, Terminal.",
  },
  {
    id: "news-explainer",
    name: "News explainer",
    text: "Documented journalism: cream paper (#EDE5D3) with pinned clippings (#FBF7EE), yellow highlighter strokes behind key words (#FFE14D), a red string joining the facts (#C8382B), a calligraphic display face, 5% grain. This palette is part of the look: brand colours only on the logo and the product. Organic soft overshoot, a slow camera drift across the board. Best for news, comparisons, anything with a source. Every clipping quotes the product's own claims; never invent a source. Mixes well with Keynote, Paper cut, Documentary.",
  },
  {
    id: "paper-cut",
    name: "Paper cut",
    text: "Everything is a paper cut-out: kraft background (#E7D7B5), torn edges, white sticker borders, hard offset shadows; the product screen becomes a sticker too. Stop motion at 12 fps: hold each pose 2–3 frames, with a tiny jitter. Snappy overshoot, things slap on. Heavy display type, a red accent (#E2482B) and a yellow (#F2C230). Best for hits, lists, fun. Sound: paper slaps and snips. Mixes well with News explainer, Documentary, Hand-drawn.",
  },
  {
    id: "documentary",
    name: "Documentary",
    text: "An archive file: sepia, heavy film grain, a strong vignette, manila folders (#D9C59A) on dark (#2A231A), typewriter text, one red rubber stamp (#B3261E), slow Ken Burns moves across stills. This palette is part of the look: brand colours only on the logo and the product. Calm eased motion, long holds, no bounce. Best for a story, a history, a secret, a date. Sound: low room tone, typewriter ticks, one stamp thud. Mixes well with News explainer, Paper cut, Newspaper.",
  },
  {
    id: "magazine",
    name: "Magazine",
    text: "A magazine cover: an enormous headline behind the product, hairline rules, a masthead, small numbers in the corners. Warm paper (#F1ECE3), near-black ink, one accent, generous margins, light grain. Clean fast-out easing, nothing bounces. Best for a quote, a profile, a story, a title. Mixes well with Swiss, Keynote.",
  },
  {
    id: "swiss",
    name: "Swiss",
    text: "A strict grid in red, black and white only (#E30613, #111111, #FFFFFF): this palette is part of the look, brand colours only on the logo and the product. Solid bars, huge numbers, flush type, no decoration, no rotation. Clean fast-out easing; everything snaps to grid lines. Best for numbers, steps, data. Mixes well with Magazine, Brutalist.",
  },
  {
    id: "hand-drawn",
    name: "Hand-drawn",
    text: "Pen arrows, circles and underlines that draw themselves as the voice reaches them, with a boiling line: redrawn 12 times a second with a small wobble. Off-white (#FBFAF6) or directly over the product, dark ink and one accent. Organic soft overshoot. Best for emphasis, tips, explaining. Sound: pen scratches. Mixes well with Paper cut, News explainer.",
  },
  {
    id: "terminal",
    name: "Terminal",
    text: "A dark code window (#0D1117), a blinking cursor, commands typing out and results streaming; green for success (#3FB950), purple (#D2A8FF), orange for warnings (#F0883E). This palette is part of the look: brand colours only on the logo and the product. Monospace for code, and every code line stays left to right on its own, even in an Arabic video. Mechanical stepped motion, no overshoot. Best for developer tools and AI. Sound: key ticks, a confirm blip. Mixes well with Glass UI, Tool card.",
  },
  {
    id: "riso-print",
    name: "Riso print",
    text: "Two fluorescent inks printed slightly out of register: pink (#FF48B0) and teal (#00A9B5), with indigo text (#2B2B6B) on off-white (#F4F0E8). Halftone dots, visible misregistration on type and images, 5% grain. This palette is part of the look: brand colours only on the logo and the product. Snappy overshoot. Best for a hook or a title, in moments more than a whole film. Mixes well with Paper cut, Newspaper.",
  },
  {
    id: "newspaper",
    name: "Newspaper",
    text: "Newsprint (#E9E5DC) with grain, a huge headline, narrow columns, hairlines, and red (#C8102E) only for what's breaking. This palette is part of the look: brand colours only on the logo and the product. Clean easing; pages roll or slap in. Never imitate a real paper's masthead or logo. Best for news and sources. Mixes well with Documentary, News explainer.",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    text: "Blueprint blue (#1E4C8F) with a measuring grid: white lines draw themselves, dimension arrows and callouts point at parts, orange (#FF9F43) marks the one thing that matters. This palette is part of the look: brand colours only on the logo and the product. Calm eased line drawing. Best for how it works, parts, anything technical. Sound: a soft pencil, small ticks. Mixes well with Terminal, Swiss.",
  },
  {
    id: "vhs",
    name: "VHS",
    text: "For moments only, 1–3 s, never a whole film. An old TV: scanlines, colour bleed, a tracking glitch, an on-screen display in mono green (#33FF66) with a timestamp. Stepped motion. Best for a flashback or the old way of doing things. Never over Arabic captions: the effect breaks the letters. Sound: tape hiss, a click. Mixes well with Documentary.",
  },
  {
    id: "brutalist",
    name: "Brutalist",
    text: "For moments only, a hook or a call to action, 1–3 s. Screaming yellow (#FFE600), black, orange-red (#FF3B00); thick black borders, hard offset shadows, boxed labels, a hit and a shake. Snappy overshoot. Mixes well with Swiss, Sticker cartoon.",
  },
  {
    id: "product-studio",
    name: "Product studio",
    text: "A soft-lit cream studio (#EFE7DA) with a gentle light falloff and vignette; the product's name raised like a matte 3D object, a small black tag with a check mark. Calm, slow and premium, with the brand's accent. Best for a launch, a tool's name, a free offer. Mixes well with Keynote, Tool card.",
  },
  {
    id: "sticker-cartoon",
    name: "Sticker cartoon",
    text: "Pastel backgrounds (#F7C6D9, #CFE6FF), one constant-thickness black outline on everything, speech bubbles and pills, a bouncing mascot you draw yourself (never an existing character). Bouncy springs, stop motion at 12 fps. Best for fun, explaining a tool, younger audiences. Mixes well with Hand-drawn, Paper cut.",
  },
  {
    id: "tool-card",
    name: "Tool card",
    text: "Cream (#F4EFE6) with a fine grid and soft rays, one white card, a breadcrumb on top, chips below, one accent word in a calligraphic face. Clean fast-out easing, very little movement. Best for a skill, a tool, a fact, a launch. Mixes well with Keynote, Terminal, Product studio.",
  },
];

/** Which family of moves suits each built-in style (tools/moves.mjs). A style you wrote yourself suits any. */
export const STYLE_FAMILIES = {
  __proto__: null, // so a style you named "Constructor" isn't found in here
  "calm-cinematic": ["calm", "onetake"], "bold-punchy": ["punch"], "clean-product-demo": ["editorial", "calm"], "studio-showreel": ["onetake", "punch"],
  keynote: ["calm", "onetake"], "glass-ui": ["editorial", "punch"], "news-explainer": ["editorial"], "paper-cut": ["punch", "editorial"],
  documentary: ["calm", "editorial"], magazine: ["editorial", "calm"], swiss: ["punch", "editorial"], "hand-drawn": ["calm", "editorial"],
  terminal: ["punch", "editorial"], "riso-print": ["punch"], newspaper: ["editorial"], blueprint: ["editorial", "calm"],
  "product-studio": ["calm", "onetake"], "sticker-cartoon": ["punch"], "tool-card": ["calm", "editorial"],
};
/** Styles for a few seconds of a film, not all of it: never suggested for a whole video. */
export const MOMENT_STYLES = ["vhs", "brutalist"];

const slug = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48) || `style-${Date.now()}`;

/** The library as saved, with the marks of deleted built-ins: { id, deleted: true }. No file: the starters. */
const saved = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return STARTERS;
  }
};

export const listStyles = () => {
  const list = saved();
  const known = new Set(list.map((s) => s.id));
  return [...list.filter((s) => !s.deleted), ...BANK.filter((s) => !known.has(s.id))];
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
  const list = saved();
  const id = slug(name);
  const i = list.findIndex((s) => s.id === id);
  const style = { id, name, text };
  if (i >= 0) list[i] = style;
  else list.push(style);
  write(list);
  return style;
};

export const deleteStyle = (id) => {
  if (!listStyles().some((s) => s.id === id)) throw new Error("No such style.");
  const list = saved().filter((s) => s.id !== id);
  write(BANK.some((s) => s.id === id) ? [...list, { id, deleted: true }] : list);
};
