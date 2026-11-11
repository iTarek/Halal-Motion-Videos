// The move bank: named motion moves, and a palette for each video, so videos don't all move alike.
// A palette is 3 core moves the whole video is built around (words, a scene change, a camera or card move), plus accents
// for its special moments. It's saved as src/brands/<brand>/<video>/moves.json, and those files are the memory: a new
// palette avoids what the brand's other videos just used.
// The moves come from majedphotos/video-ad-editor (MIT, (c) 2026 Majed Alzaabi), described anew for this engine. Left out:
// two that need a real person on camera (sitting on a sofa, holding things on a palm), and one that takes Arabic words apart.
//
// Usage: npm run moves -- <brand> <video> [--cues=number,list,…] [--family=calm|punch|editorial|onetake] [--rtl|--ltr] [--again] [--json]
//        npm run moves -- --list [--json]
//   Runs again without --again: shows the video's palette as it is. --again: a new one, unlike this one.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { readJson, ROOT } from "./settings.mjs";
import { getStyle, listStyles, OWN_MATERIAL } from "./styles.mjs";

export const FAMILIES = ["calm", "punch", "editorial", "onetake"];
export const CUES = ["number", "list", "price", "cta", "contrast", "emphasis", "reveal", "tech", "hit", "captions"];

const move = (id, name, role, families, cues, how, more = {}) => ({ id, name, role, families, cues, how, ...more });
const ARABIC = { arabic: true }; // right-to-left videos only
const SPLITS = { splits: true }; // takes a word apart: not for a brand whose rules forbid that
// manual: true — never chosen by chance, only by name

export const MOVES = [
  // ---------- words on screen
  move("caption", "Karaoke caption", "caption", [], ["captions"], "The word being said sits in a pill that slides from word to word, timed from VO.<id>.words. Reads with the sound off."),
  move("blurIn", "Blur to sharp", "text", ["calm"], [], "Each word comes out of a blur, sharpens and settles (Reveal). For quiet lines."),
  move("riseUp", "Mask rise", "text", ["editorial", "punch", "onetake"], [], "Words rise from behind a hidden line one after another (MaskRise), and leave upward at the end."),
  move("wordSwap", "Swapping word", "text", ["punch"], ["contrast"], "The sentence holds still and its last word rolls to the next on a spring. Strong in a hook."),
  move("focus", "Focus lens", "text", ["calm", "editorial"], [], "The sentence is blurred except one word, and corner brackets travel between the words that matter."),
  move("decrypt", "Decrypt", "text", ["punch"], ["reveal", "tech"], "Random letters flicker and settle into the word in reading order. In Arabic, keep the letters joined.", SPLITS),
  move("counter", "Rolling counter", "text", ["punch", "editorial"], ["number"], "Each digit rolls on its own and stops in turn with a small bounce, in fixed-width digits so they don't jitter. For a strong, real number."),
  move("typewriter", "Typewriter", "text", ["calm", "editorial", "onetake"], ["tech"], "Text types out behind a blinking caret, about 0.035 s per character. In Arabic, reveal it with a moving clip so the letters stay joined."),
  move("kashida", "Kashida stretch", "text", ["editorial", "punch"], ["emphasis"], "The key word stretches wide through a kashida, then springs back. addKashida puts it only where Arabic allows; a word with no place for it pulses instead. Never on sacred text.", ARABIC),
  move("scrollReveal", "Read-along", "text", ["calm", "onetake", "editorial"], [], "The sentence sits dim and each word wakes (sharpens, straightens) as it's spoken, timed from VO.<id>.words."),
  move("wordDrop", "Falling words", "text", ["punch", "onetake"], [], "Each word falls from above, bounces and settles; at the end they all drop out below."),
  move("rubberPop", "Rubber pop", "text", ["punch"], ["hit", "emphasis"], "One word pops and stretches like rubber, with impact lines. For the key word."),
  move("strokeFill", "Outline and fill", "text", ["editorial", "calm"], ["emphasis", "reveal"], "The word's outline draws itself, then fills from the bottom on a wave. The whole word: letters never come apart."),
  move("versus", "Versus", "text", ["punch", "editorial"], ["contrast"], "Two words enter from opposite sides and face off with an × between them, then one wins."),
  move("wordPath", "Word path", "text", ["onetake"], ["list"], "Words sit along a path and the camera travels from word to word in one shot, the line colouring behind it."),
  move("glassType", "Glass type", "text", ["calm", "onetake"], ["emphasis"], "A big word in frosted glass bends what's behind it, a glass panel beneath holds one line, and a shine crosses both."),
  move("ijamDrop", "Falling dots", "text", ["calm", "editorial"], ["reveal", "emphasis"], "The line appears without its dots, like the earliest manuscripts, then they fall in one by one from the right with an ink tap, and the last colours the key word. Never on Quran text.", ARABIC),
  move("qalamWrite", "Reed pen", "text", ["calm", "editorial"], ["emphasis", "reveal"], "Each connected part of the word is written by a slanted pen edge, which lifts between parts; the ink starts light and dries, and the dots land after their part.", ARABIC),
  move("videoText", "Footage in letters", "text", ["punch", "onetake"], ["emphasis", "hit", "reveal"], "A huge word with live footage playing only inside its letters; on exit the camera flies into a letter until the footage fills the screen."),
  move("kufiGrid", "Square Kufic", "text", ["editorial", "punch"], ["emphasis", "tech"], "The word builds as tiles on a grid, like square Kufic, column by column from the right, then resolves into sharp text in the same place.", ARABIC),
  move("redact", "Redacted line", "text", ["editorial", "punch"], ["reveal", "contrast"], "The line is written with words covered by ink bars; each bar lifts as its word is spoken, showing it in the accent colour, and a stamp lands on the last."),
  move("ayahCalm", "Calm verse", "text", ["calm"], [], "A verse in Uthmani script inside a thin geometric frame that draws itself; the words appear quietly, ending on the verse mark. Never chosen by a palette, only when someone asks for it. Verses only, exact text from a trusted source, no sound effects.", { ...ARABIC, manual: true }),
  move("morphWord", "Melting word", "text", ["calm", "editorial"], ["contrast"], "The first word blurs and melts, the second forms out of the same liquid, and the colour travels from ink to accent."),
  move("echoStack", "Echo stack", "text", ["punch"], ["emphasis", "hit"], "The hook word repeated in 7 rows: the middle one filled in the accent colour, the rest fading outlines. They spread from the middle and fold away."),
  move("warpWave", "Wave", "text", ["calm"], [], "The line enters on a wave crossing it, calming until it's sharp. For lines about the sea, calm or flow."),

  // ---------- scene changes
  move("crossZoom", "Cross zoom", "transition", ["onetake", "punch"], [], "Two scenes merge through a zoom and a blur that peak in the middle. Feels like one shot."),
  move("softWipe", "Soft wipe", "transition", ["calm", "editorial"], [], "The new scene wipes across in reading direction with a feathered edge."),
  move("iris", "Iris", "transition", ["onetake"], [], "A dot grows and swallows the screen, revealing the next scene."),
  move("whip", "Whip pan", "transition", ["punch"], [], "A fast sideways whip with motion blur, and no visible cut."),
  move("zoomWipe", "Zoom wipe", "transition", ["punch"], [], "The shot rushes forward, and at the peak of the zoom the next scene wipes in."),
  move("dotZoom", "Into the dot", "transition", ["onetake"], [], "The full stop ending a line: the camera flies into it until it's the whole screen, which becomes the next scene."),
  move("dipFade", "Dip", "transition", ["calm", "editorial"], [], "The scene dips through the background colour for a moment, with a breath of zoom. A quiet break between two ideas."),
  move("slideOver", "Card over", "transition", ["calm", "editorial", "onetake"], [], "The new scene rises from below as a rounded card and covers the old one, which recedes and darkens."),
  move("clockWipe", "Clock wipe", "transition", ["editorial", "punch"], [], "The next scene is revealed by a clock hand sweeping from the top. For time and stages."),
  move("slices", "Slices", "transition", ["punch", "editorial"], [], "The new scene arrives in vertical slices widening in reading direction, edged in the accent colour."),
  move("glitch", "Glitch", "transition", ["punch"], ["tech", "hit"], "Blocks of the picture shift and flash for half a second, and the scene flips. For tech, updates, a hit."),
  move("flip", "Card flip", "transition", ["punch", "editorial"], ["contrast"], "The frame flips like a card in perspective, the next scene on its back. For comparisons: front and back."),
  move("lightLeak", "Light leak", "transition", ["calm", "onetake"], [], "Warm blobs of light in the brand's colours cross the screen while the scene changes under them."),
  move("nuqtaCurtain", "Pen-dot curtain", "transition", ["punch", "editorial"], [], "Slanted diamonds shaped like a reed pen's dot grow and spread until the new scene covers the screen, with accent-coloured edges.", ARABIC),
  move("pageTurnRTL", "Arabic page turn", "transition", ["calm", "editorial"], ["reveal"], "A page turns like an Arabic book, spine on the right: a slanted fold travels across, with a pale page back and a shadow on the new scene.", ARABIC),
  move("scanLine", "Scan line", "transition", ["editorial", "punch"], ["tech", "contrast"], "A bright line descends: the new scene above it, the old one frozen below, a stretched slit-scan just under it. For before and after, or checking."),
  move("bentoCut", "Bento cut", "transition", ["editorial", "onetake"], ["list"], "The scene shrinks into a cell of a bento grid, others appear around it, and the camera slides to the next cell, which grows to fill the screen."),
  move("doorway", "Doorway", "transition", ["punch"], ["reveal", "hit"], "The scene splits into two doors opening in perspective, light pours through the gap, and the next scene comes through."),
  move("glassLens", "Glass lens", "transition", ["calm", "onetake"], [], "A glass lens enters and settles, showing the next scene magnified inside with a sheen and a colour fringe, then grows to fill the screen."),
  move("lumaMelt", "Light melt", "transition", ["calm", "onetake"], [], "The new scene appears first in the brightest parts of the old one, so the light melts into the next shot."),

  // ---------- camera
  move("pushIn", "Push in", "camera", ["calm", "onetake", "editorial"], [], "Zoom from 1 to 1.12 over 1.6 s on the line that matters, the background softening slightly."),
  move("pullOut", "Pull out", "camera", ["onetake"], ["reveal"], "Start tight on one element, then the camera pulls back and reveals what's around it."),
  move("handheld", "Handheld", "camera", ["calm", "onetake", "editorial"], [], "A small continuous drift, as if someone holds the camera (noise). Gives still shots life."),
  move("kenBurns", "Ken Burns", "camera", ["calm", "editorial"], [], "A slow zoom and pan from one point to another on a still or screenshot, never showing an empty edge."),
  move("snapZoom", "Snap zoom", "camera", ["punch"], ["hit", "emphasis"], "A quick zoom jump on the key word that rebounds and holds, returning later."),
  move("shake", "Shake", "camera", ["punch"], ["hit"], "A strong camera shake on the hit, fading away in under a second."),
  move("rackFocus", "Rack focus", "camera", ["calm", "onetake", "editorial"], ["reveal"], "Sharpness moves from the front layer to the back, or the reverse. Reveals the bigger picture."),
  move("parallax", "Parallax", "camera", ["onetake", "editorial"], [], "Layers move at different speeds, the near ones faster, so one shot has depth."),
  move("dollyZoom", "Dolly zoom", "camera", ["onetake", "punch"], ["reveal"], "The subject keeps its size while the background opens behind it. For the moment of realising."),
  move("orbit", "Orbit", "camera", ["onetake", "punch"], ["reveal", "hit"], "The camera circles the phone inside a ring of words: those behind pass behind it, those in front pass in front, and the background turns with depth."),
  move("phoneMockup", "Film in a phone", "camera", ["onetake", "editorial"], ["tech", "cta"], "The film shrinks until it's the screen of a phone, and the phone sways in 3D (Device)."),
  move("tilt3D", "Chapter tilt", "camera", ["editorial", "onetake"], ["reveal"], "The film becomes a panel tilting in perspective and shrinking, a chapter title floats in front, and it returns. The same move for each chapter."),
  move("craneUp", "Crane up", "camera", ["onetake", "editorial"], ["reveal", "list"], "The camera starts tight, rises and tilts above a table of cards, then descends into the next card until it's the screen."),
  move("punchCut", "Second camera", "camera", ["punch", "editorial"], ["emphasis", "hit"], "A straight cut to a tighter crop with the subject on a third, held to the end of the sentence and back, like a second camera."),
  move("bodyFollow", "Lagging follow", "camera", ["onetake", "calm"], [], "A slight crop follows the moving element with a small lag, tilting with its motion."),
  move("swishSettle", "Swish and settle", "camera", ["punch", "onetake"], ["hit"], "The scene starts offset and tilted with motion blur and settles fast. A scene start with no transition."),
  move("motionEcho", "Motion echo", "camera", ["punch", "onetake"], ["hit"], "Delayed ghost copies trail the motion at the hit, tinted in the accent colour."),

  // ---------- cards and graphics
  move("notifs", "Notifications", "card", ["editorial", "punch"], ["list"], "Each point drops in as a phone notification, pushing the last one down."),
  move("highlight", "Highlighter", "card", ["editorial", "calm"], ["emphasis"], "A marker stroke behind the word, in reading direction, and an underline under another."),
  move("shine", "Shine", "card", ["punch", "editorial"], ["price", "cta"], "A slanted shine crosses the price or button every 2 s."),
  move("lowerThird", "Name bar", "card", ["editorial", "calm"], [], "An accent bar grows, and the name then the title emerge from it, low inside the safe area."),
  move("checklist", "Checklist", "card", ["editorial", "onetake"], ["list"], "For each point a circle fills and a check draws itself, and the line between points advances."),
  move("priceTag", "Price tag", "card", ["punch", "editorial"], ["price"], "A swinging tag: the old price is struck through and the new one counts down and stops. Real prices only."),
  move("ctaPulse", "Pulsing button", "card", ["punch", "calm", "onetake"], ["cta"], "An accent button with pulse rings and a finger tapping it. For the end of the film."),
  move("compare", "Before and after", "card", ["editorial", "onetake"], ["contrast", "reveal"], "A dividing line sweeps across revealing the after, swinging like a comparison slider."),
  move("ringStat", "Percentage ring", "card", ["editorial", "calm", "onetake"], ["number"], "A ring fills to the percentage with a counter in the middle, and what it means below."),
  move("barChart", "Growing bars", "card", ["editorial", "punch"], ["number", "contrast"], "Bars rise in turn with counting numbers; the one that matters is in the accent colour, the rest fade."),
  move("uiWorld", "World of cards", "card", ["editorial", "punch"], ["tech"], "App cards (search, a number, a button, a message) float around the phone at different depths: blurred behind, larger in front."),
  move("frameBreak", "Frame break", "card", ["punch", "editorial"], ["emphasis", "reveal"], "The phone sits in a card, then the card's edge drops until the phone bursts out of the frame, with a big word behind it."),
  move("headlineWall", "Headline wall", "card", ["editorial"], ["list", "contrast"], "A board where headlines stick on one by one as torn paper, with a pin and a string between them; the camera jolts with each. Real claims only."),
  move("doodleBoil", "Boiling doodles", "card", ["punch", "calm"], ["emphasis", "hit"], "A handwritten circle, arrow and stars draw themselves around the subject, the line boiling (redrawn 12 times a second)."),
  move("coverStory", "Cover story", "card", ["editorial", "punch"], ["reveal"], "A flash, and it's a magazine cover: the name behind the product, an issue line, cover lines and a barcode. No real magazine's name."),
  move("sourceScroll", "Source scroll", "card", ["editorial"], ["tech", "contrast"], "An article or shot as a full page moving slowly, a highlighter marking the line. Real sources only."),
  move("paperSticker", "Paper sticker", "card", ["calm", "punch"], ["reveal", "hit"], "The product becomes a paper sticker, with a torn white edge, texture and a shadow, and sticks on in 12 fps stop motion."),
  move("stickerFreeze", "Freeze sticker", "card", ["punch", "editorial"], ["hit", "emphasis", "contrast"], "A flash, and the frame freezes as a white-edged photo that peels over the brand colour with halftone dots, as a word sticker slaps on."),
  move("beamConnect", "Connecting beam", "card", ["editorial", "onetake"], ["tech", "list"], "Icons around a centre, curved paths between them, and a beam of light travelling along them, each node pulsing as it's reached. Real integrations only."),
  move("lightRays", "Light rays", "card", ["calm", "onetake"], ["reveal", "emphasis"], "Rays of light rise from behind the product, turning slowly."),
  move("dynamicIsland", "Expanding pill", "card", ["calm", "punch", "editorial"], ["cta", "number", "reveal"], "A black pill at the top expands on a spring into a card with an icon, two lines and a counting number, then shrinks back."),
  move("trio", "Trio", "card", ["punch", "editorial"], ["contrast", "list"], "Two more copies of the phone pop up behind it, left and right, on a clap, each with its own label. For three kinds of something."),
  move("dotMap", "Dot map", "card", ["editorial"], ["number", "reveal"], "A dot map spreads out from one point, a pin pulses, arcs fly to cities with a counter at each, and the total sits below. Real data only."),
  move("rimOutline", "Rim line", "card", ["punch", "calm"], ["emphasis"], "An accent line draws around the product's edge from the top in both directions, then a glowing dot circles it."),
  move("terminalType", "Terminal", "card", ["editorial", "punch"], ["tech"], "A terminal window: the command types out, the output streams, a spinner, a check."),
  move("lineChartDraw", "Drawn line chart", "card", ["editorial", "punch"], ["number", "contrast"], "The axes rise, the line draws itself with a glowing pen, the area fills, numbers count, and a pin marks the peak."),
  move("girihBloom", "Girih bloom", "card", ["calm", "editorial"], ["emphasis", "reveal"], "A pattern of octagons and eight-pointed stars draws outward from the centre, turning slowly, then settles to a faint texture."),
  move("speechBubble", "Speech bubble", "card", ["punch", "calm"], ["emphasis", "hit"], "A comic bubble pops up with its tail on the subject, the words type inside it, and it leaves with a pop."),
  move("postCard", "Post card", "card", ["editorial"], ["contrast", "reveal"], "A public post with no platform's logo comes out of a blur: its text types, the numbers count, a heart pulses. A real post or your own words only."),
  move("receiptPrint", "Printed receipt", "card", ["editorial", "punch"], ["price", "number", "list"], "Paper prints in jumps: the items and prices, the total counting and shaded, then it tears off and tilts."),
  move("searchBar", "Search and answer", "card", ["editorial"], ["tech", "cta"], "A glass search bar: the question types out, suggestions drop down, a pointer clicks one, and the bar turns into the answer card."),
  move("pointerCursor", "Pointer", "card", ["editorial"], ["tech", "cta"], "A mouse arrow moves on a smooth path, the button grows as it hovers, and the click sends a ripple. For explaining an app."),

  // ---------- timing rules, not things on screen
  move("jcut", "Sound leads", "rule", FAMILIES, [], "The next shot's sound starts 4–12 frames before its picture, so the cut disappears."),
  move("matchCut", "Match cut", "rule", FAMILIES, [], "A shape carries on in the same place and size in the next shot, its motion unbroken."),
  move("ramp", "Slow the hit", "rule", ["punch"], ["hit"], "Normal speed, 25% at the moment of the hit, then back."),
];

const hash = (s) => {
  let h = 2166136261;
  for (const c of String(s)) h = Math.imul(h ^ c.codePointAt(0), 16777619);
  return h >>> 0;
};
const seeded = (seed) => {
  let x = hash(seed) || 1;
  return (n) => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) % n;
  };
};
const idsOf = (list) => list.map((m) => m.id);
const brief = ({ id, name, role, how }) => ({ id, name, role, how });

/**
 * A palette. seed: what makes this video's different from another's. history: the brand's other palettes, oldest first.
 * rtl: Arabic moves are in, and one is always among the accents; otherwise they're out. noSplit: the brand forbids splitting
 * words. cues: the special moments this video has (CUES). styleId: the video's style, whose families it keeps to; without
 * one, a style is suggested, from `styles`: a film style or a starter that needs nothing but the product.
 */
export const planMoves = ({ seed, history = [], rtl = false, noSplit = false, family, cues = [], styleId = null, styles = [] }) => {
  const pick = seeded(seed);
  const usable = MOVES.filter((m) => !m.manual && (rtl || !m.arabic) && !(noSplit && m.splits));
  // when each move was last used: higher is more recent, -1 never
  const lastUse = new Map();
  history.forEach((p, i) => [...idsOf(p.core), ...idsOf(p.accents)].forEach((id) => lastUse.set(id, i)));
  const used = (id) => lastUse.get(id) ?? -1;
  const recentCore = new Set(history.slice(-3).flatMap((p) => idsOf(p.core)));

  // Any it can, then the one used longest ago (a random one of those)
  const freshest = (list, avoid = new Set()) => {
    const open = list.filter((m) => !avoid.has(m.id));
    const from = open.length ? open : list;
    if (!from.length) return null;
    const oldest = Math.min(...from.map((m) => used(m.id)));
    const ties = from.filter((m) => used(m.id) === oldest);
    return ties[pick(ties.length)];
  };

  const lastFamily = history.at(-1)?.family;
  const picked = styles.find((s) => s.id === styleId);
  const allowed = picked?.families ?? FAMILIES; // a style you wrote yourself suits any
  const unlike = allowed.filter((f) => f !== lastFamily);
  const chosenFamily = FAMILIES.includes(family) ? family : (unlike.length ? unlike : allowed)[pick((unlike.length ? unlike : allowed).length)];
  const inFamily = usable.filter((m) => m.families.includes(chosenFamily));

  const core = [];
  const take = (roles) => {
    const list = inFamily.filter((m) => roles.includes(m.role) && !core.includes(m));
    const m = freshest(list, recentCore);
    if (m) core.push(m);
  };
  take(["text"]);
  take(["transition"]);
  take(["camera", "card"]);

  // Accents: one for each moment asked for, from this family when it has one; otherwise a spread of roles.
  const accents = [];
  const taken = () => new Set([...idsOf(core), ...idsOf(accents), ...recentCore]);
  for (const cue of cues) {
    if (accents.length >= 4) break;
    const fits = usable.filter((m) => m.cues.includes(cue) && !idsOf(core).includes(m.id) && !accents.some((a) => a.id === m.id));
    const near = fits.filter((m) => m.families.includes(chosenFamily));
    const m = freshest(near.length ? near : fits, taken());
    if (m) accents.push({ ...m, cue });
  }
  if (!cues.length)
    for (const roles of [["card"], ["text"], ["camera", "transition"]]) {
      const m = freshest(inFamily.filter((x) => roles.includes(x.role) && !idsOf(core).includes(x.id) && !accents.some((a) => a.id === x.id)), taken());
      if (m) accents.push(m);
    }
  // What no one else does: an Arabic-only move in every Arabic video.
  if (rtl && ![...core, ...accents].some((m) => m.arabic)) {
    const m = freshest(usable.filter((x) => x.arabic), taken());
    if (m) accents.push(m);
  }

  const recentStyles = new Set(history.slice(-3).map((p) => p.style?.id));
  const suits = styles.filter((s) => s.families?.includes(chosenFamily) && !OWN_MATERIAL.includes(s.category));
  const fresh = suits.filter((s) => !recentStyles.has(s.id));
  const suggested = picked ? null : (fresh.length ? fresh : suits)[pick((fresh.length ? fresh : suits).length || 1)];
  const style = picked ?? suggested;

  return {
    family: chosenFamily,
    // a style the user picked reaches the Director with its text anyway; a suggested one only reaches it from here
    style: style ? { id: style.id, name: style.name, suggested: !picked, ...(picked ? {} : { text: style.text, ...(style.file ? { file: style.file } : {}) }) } : null,
    core: core.map(brief),
    accents: accents.map((m) => ({ ...brief(m), ...(m.cue ? { cue: m.cue } : {}) })),
    always: MOVES.filter((m) => m.id === "jcut" || m.id === "matchCut").map(brief),
  };
};

/** The palette file of a video. */
const fileOf = (brand, video) => path.join(ROOT, "src", "brands", brand, video, "moves.json");
/** The palette in a file, or null: a file edited out of shape counts as no palette, not as a crash. */
const readPalette = (file) => {
  const p = readJson(file);
  return [p?.core, p?.accents, p?.always].every(Array.isArray) ? p : null;
};

/** The palettes of a brand's other videos, oldest first. */
const historyOf = (brand, video) => {
  const dir = path.join(ROOT, "src", "brands", brand);
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== video && d.name !== "brand")
    .map((d) => path.join(dir, d.name, "moves.json"))
    .filter((f) => fs.existsSync(f))
    .sort((a, b) => fs.statSync(a).mtimeMs - fs.statSync(b).mtimeMs)
    .map(readPalette)
    .filter(Boolean);
};

// Arabic script, not just right to left: Hebrew has no kashida, dots or joined letters for the Arabic-only moves to work on
const ARABIC_SCRIPT = /arab|عرب|urdu|اردو|persian|farsi|فارسی/i;
const isRtl = (brand, saved, flags) => {
  if (flags.rtl) return true;
  if (flags.ltr) return false;
  if (saved.videoLanguage) return ARABIC_SCRIPT.test(saved.videoLanguage);
  try {
    // the first one is the brand's own: a file can go on to define a variant for another language
    return /direction:\s*["'](\w+)/.exec(fs.readFileSync(path.join(ROOT, "src", "brands", brand, "brand", "theme.ts"), "utf8"))?.[1] === "rtl";
  } catch {
    return false;
  }
};

const printPlan = (brand, video, plan) => {
  const line = (m) => `  • ${m.name}${m.cue ? ` (for: ${m.cue})` : ""}: ${m.how}`;
  console.log(`${brand}/${video}: this video's palette (${plan.family})`);
  if (plan.style) console.log(`Style: ${plan.style.name}${plan.style.suggested ? ` (suggested, as this video has none: use it, or pick another in the Style card or with \`npm run video -- set … --style=\`)\n  ${plan.style.text}${plan.style.file ? `\n  Read its full style sheet first: ${plan.style.file}` : ""}` : ""}`);
  console.log(`\nCore: build the whole video around these three\n${plan.core.map(line).join("\n")}`);
  if (plan.accents.length) console.log(`\nAccents: for its special moments\n${plan.accents.map(line).join("\n")}`);
  console.log(`\nAlways:\n${plan.always.map(line).join("\n")}`);
  console.log(`\nThis is a base, not a limit: the strongest moment may be one you invent from the script. BRAND.md wins over any move, and none of them goes on Quran or other sacred text.`);
  console.log(`Saved: ${path.relative(ROOT, fileOf(brand, video))}`);
};

const NAME = /^[a-z][a-z0-9-]*$/; // as everywhere: also keeps a palette out of the tracked _starter, which every new video copies

// by its real path: run through a symlinked folder, the two spell it differently, and nothing would happen
if (process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href) {
  const argv = process.argv.slice(2);
  const pos = argv.filter((a) => !a.startsWith("--"));
  const flags = Object.fromEntries(argv.filter((a) => a.startsWith("--")).map((a) => {
    const [k, ...v] = a.slice(2).split("=");
    return [k, v.length ? v.join("=") : true];
  }));
  const fail = (msg) => {
    if (flags.json) console.log(JSON.stringify({ ok: false, error: msg }));
    else console.error(msg);
    process.exit(1);
  };
  const [brand, video] = pos;
  if (flags.list) {
    if (flags.json) console.log(JSON.stringify({ ok: true, moves: MOVES }, null, 2));
    else
      for (const role of ["caption", "text", "transition", "camera", "card", "rule"]) {
        console.log(`\n${role}`);
        for (const m of MOVES.filter((x) => x.role === role)) console.log(`  ${m.id}: ${m.name}. ${m.how}`);
      }
  } else {
    if (!NAME.test(brand ?? "") || !NAME.test(video ?? "")) fail("Usage: npm run moves -- <brand> <video> [--cues=number,list,…] [--family=calm|punch|editorial|onetake] [--rtl|--ltr] [--again] [--json]");
    if (!fs.existsSync(path.join(ROOT, "src", "brands", brand, video, "index.ts"))) fail(`No video ${brand}/${video}.`);
    if (typeof flags.family === "string" && !FAMILIES.includes(flags.family)) fail(`No family "${flags.family}". They are: ${FAMILIES.join(", ")}.`);
    const cues = typeof flags.cues === "string" ? flags.cues.split(",").map((c) => c.trim()).filter(Boolean) : [];
    const unknown = cues.filter((c) => !CUES.includes(c));
    if (unknown.length) fail(`No cue "${unknown[0]}". They are: ${CUES.join(", ")}.`);

    const file = fileOf(brand, video);
    const current = readPalette(file);
    let plan = current;
    if (!current || flags.again) {
      const saved = readJson(path.join(ROOT, ".director", brand, `${video}.json`)) ?? {};
      const brandDoc = fs.existsSync(path.join(ROOT, "src", "brands", brand, "brand", "BRAND.md"))
        ? fs.readFileSync(path.join(ROOT, "src", "brands", brand, "brand", "BRAND.md"), "utf8")
        : "";
      plan = planMoves({
        seed: `${brand}/${video}/${current ? JSON.stringify(current) : ""}`,
        history: [...historyOf(brand, video), ...(current ? [current] : [])],
        rtl: isRtl(brand, saved, flags),
        noSplit: /\bsplit/i.test(brandDoc),
        family: typeof flags.family === "string" ? flags.family : undefined,
        cues,
        styleId: getStyle(saved.styleId)?.id ?? null,
        styles: listStyles(),
      });
      // whole or not at all: the Director builds on this file
      const part = `${file}.part`;
      fs.writeFileSync(part, `${JSON.stringify(plan, null, 2)}\n`);
      fs.renameSync(part, file);
    } else if (flags.family || flags.cues || flags.rtl || flags.ltr)
      console.error("This video's palette is already chosen, so those flags changed nothing: --again chooses a new one.");
    if (flags.json) console.log(JSON.stringify({ ok: true, file, ...plan }, null, 2));
    else printPlan(brand, video, plan);
  }
}
