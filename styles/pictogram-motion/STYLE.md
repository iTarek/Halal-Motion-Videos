# Pictogram Motion

> A pulse-locked film built from three things only: a **square-grid "core graphic"** of circles, half-discs and tiny patterned cells whose rows slide past each other; **geometric pictograms** (objects, vehicles, weather, signs, and a disc-headed figure when one is needed) made of round-capped bars, discs and capsules; and **bold type** that slides up out of masks. Every cut lands on a hit.
> References (grammar only): Otl Aicher's 1972 Munich pictograms (geometric athletes); multi-sport-games "look of the games" identity systems (a modular pattern + a colour set used for everything); Swiss sports-broadcast graphics (mono meta text, tick-bar progress). Learn the grammar; never copy any real event's pictograms, emblem, slogan, pattern artwork or colour names, and never name them in the film.

## 1. Essence, and what it is not

Either a **catalogue film**: N items (products, dishes, steps, species…) shown one card at a time, fast, on the pulse; or a **story told in pictograms**: one pictogram as the hero (an object, a vehicle, a sign as often as a person), a goal, a turn, an ending, told through the same cards, walls and transitions. Each card = **one pictogram doing one action + a huge title + a smaller second line + a mono index "07 / N"**. Cards group into chapters; each chapter owns one hue, opened by a full-bleed pattern card.

What makes a frame read as this style at a glance:

1. **The grid pattern**: big discs and half-discs spanning square cells, about half the cells carrying a small motif, all in **five tones of one hue**, with **whole rows cut and shifted sideways**: the signature that drives backgrounds and transitions.
2. **The pictogram set**: objects, vehicles, weather and signs, and a human figure only when the film needs one, all flat and built from the same geometry: round-capped bars, discs, half-discs, rings, capsules. Pictograms combine and turn into one another (a canopy is a half-disc of the pattern, a clock face is the stage disc). A figure, when used, is faceless, rounded bars and a disc head, far-side limbs mixed toward the background.
3. **Type as architecture**: a black-weight grotesque title set very large, a heavy second line under it, small mono meta text in the corners like a broadcast display.
4. **Pulse lock**: every shot starts on the pulse, every key action lands on it.

Mood: premium broadcast identity; flat colour, light grain, one soft light sweep as the only gradient.

Not an isometric infographic (no depth, no 3D), not Swiss motion graphics (the pictograms and the pattern carry as much as the type), not a cartoon (pictograms never emote, figures have no faces), not a data film (numbers are labels, not charts).

## 2. Materials & rendering

- **Flat and clean.** **One square grid** rules bands, transitions and walls: a cell is about a sixth of the frame's height in 16:9 and a sixth of its width in 9:16.
- **Pattern model**: fill with a mid-dark tone; on grid nodes place cell-radius discs in varied tones and discs with inner discs; then a fraction of cells get one motif from a library of generic geometry (quarter-discs, fish-scale waves, dot and triangle scales, concentric arcs, sun wheels, checkers, crescents…), rotated by multiples of 90°; never mascots, landmarks or logos. Make it wider than the screen so any row can shift one cell.
- **Pictogram model**: one stroke-weight family per film (round caps), solid fills, at most two tones per pictogram (a darker panel, a far side). Objects keep their silhouette at icon size; anything that cannot be read as a sign at the size of an app icon is cut.
- **Figure model** (optional): unit = body height, origin at the hip; draw far limbs (mixed about 40% toward the background), torso, near limbs, head. A second person sits behind, mixed further (about 60%). People can also appear only through their traces (footprints, a queue of feet).
- **Stage**: the hero pictogram (any object or figure) sits on a large **sun disc** in a neighbouring tone, crossed by one faint light sweep.
- **Environments** (water, nets, ramps, rails, rain) live in the hero's own layer and fade to nothing before the text column.
- **Motion blur** only inside transitions, whips and fast camera moves; a held card is perfectly sharp.

## 3. Colour logic

- **A set of five hues + one dark neutral**, each hue in **five tones** (darkest → lightest, the middle one is the base). A chapter = one hue; a multi-hue chapter rotates through the set per card.
- Under type the pattern runs at **low contrast**; on chapter cards at **full contrast**.
- **Light hues take dark type and dark figures**, and their disc uses the lighter tone; dark hues take cream. On the dark neutral, the disc uses a lighter tone or it vanishes; its accent is one warm hue.
- One cream and one ink serve every hue. No outlines, no highlights except the sweep.
- Choose the set from the topic. Examples: warm festival (red, violet, forest green, gold, ochre); coastal (navy, teal, coral, sand, sky); kitchen (tomato, basil, saffron, aubergine, flour cream). Invent names for your hues; never borrow an event's colour names.

## 4. Type & on-screen text

- **Title**: a black-weight grotesque (the kind of Inter Tight), 14–30% of the frame's short side, tight tracking in Latin script, fitted to its column. **Second line**: a heavy face under it (a descriptor, or a second language). **Meta**: a mono (the kind of DM Mono), small, wide tracking; tags as mono chips. A brand's own sans takes the title if it has a black weight; the mono stays.
- **Corner display** on every card: mono corner text and a **progress bar of N ticks** (current tall, done dimmed, rest faint), N derived from the item list. Nothing the viewer must read lives there.
- **One source for words**: every card's title and second line come from the film's copy list, never typed into a scene.
- **The card type *is* the text layer.** With narration, a spoken line that isn't a title sits on a solid band in the chapter's darkest tone (an ink band on light hues), low on the reading side, never over the title, its words appearing as they are spoken.
- A card that must be read (a spec, a number) holds longer than its neighbours: at least four pulses.

## 5. Motion quality

- **A grid of time**: pick one pulse for the film (say 12 frames); every shot starts on a pulse and every key action in a pose (release, contact, landing) lands on one.
- **Pace ladder**: normal cards last four pulses; related sub-items become half-length rapid-fire runs. A second speed comes from dividing the pulse, never from changing it.
- **Easing**: exponential ease-out for entrances, exponential in-out for whips and wipes; a back ease once at most.
- **Type enters by mask slide-up**: title first, second line two or three frames later, tag after; meta lines type on without a caret. Short cards compress all timings.
- **Pictogram assembly**: the hero pictogram and its stage arrive as horizontal bands sliding into register from alternating sides.
- **Backgrounds breathe**: rows drift in alternating directions; on chapter cards they jump a quarter-cell on each pulse.
- **Transitions** snap to the grid: sliding rows, dropping columns, a push, quarter-discs from cell corners, an iris from the last figure, a tile flip. Rotate them; each lasts a few frames around the cut.

## 6. Camera grammar

Mostly a locked flat frame; energy comes from row shifts, transitions and figure actions. When the camera moves, it moves along the grid. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Locked flat frame | clarity, the card as a poster | any item; a spec that must be read |
| Lateral track with a one-screen whip per pulse | one continuous family, momentum | a line of stations; a production line; a route |
| Slow drift along a row | calm, browsing | a gallery; a menu; a slower chapter |
| Vertical scroll by grid rows | ranking, depth, descent | a top-ten; floors of a building; ocean depths |
| Push into one motif cell until it becomes the next frame | zooming into a part | an ingredient inside a dish; a city inside a map |
| Pull back to a tiled wall of items | the whole set at once | a summary; "all of them"; a comparison |
| Tiles collapsing to one point | many become one | a merger; a shared goal; a count reaching zero |
| Split screen along a grid line | two items side by side | versus; before/after; two versions |

Framing: text and figure never overlap (one text column, one stage); horizontal poses move the stage outward. The corner display stays in the corners. Allowed transitions are the grid ones in section 5; never dissolves, 3D camera moves, handheld shake or depth of field.

## 7. Sound palette

- **Every cut gets a hit chosen by its chapter's matter**: a splash, a pok, a clank, a crack, a whoosh, a sizzle. The foley tells the ear which family it is in.
- **A second layer for the system itself**: a swish as the title slides up, a dry click as rows shift, a tiny tick as the progress bar advances.
- **Three weights**: a light tick for a rapid-fire sub-item, a medium hit for a card, a heavy one for a chapter card and the count-up's landing.
- **Tonal accents only as punctuation**: one short bright note when a count reaches its value; the progress tick may rise a step per chapter. No tune, no bed.
- **Silence as a tool**: half a pulse of nothing before a big hit, or four pulses stripped to a single ticking sound under a count.
- **Sound across a cut**: the row-slide's whoosh starts three or four frames before the cut and peaks on it.
- **Voice**: optional; calm, one or two lines per chapter. Type and hits can carry the film alone.

## 8. Native moves

A menu: use the ones your film needs.

- **One card = one item.** The count is the hook ("ALL N"). *Fits content like:* every tool in a workshop; every station of a subway line; every dish of a regional cuisine.
- **Chapter = colour.** Families become hues so the viewer always knows where they are. *Fits content like:* sections of a library; food groups; departments of a company.
- **One verb per item.** One body action readable in four pulses, or a prop action (a gear turns, a cup pours). *Fits content like:* stretching exercises; kitchen techniques; jobs on a construction site.
- **Pace ladder run.** A sub-family at double speed. *Fits content like:* four knife cuts; the bones of a hand; weekday routines.
- **Long take down a track.** Stations one screen apart, the camera whipping on each cut. *Fits content like:* the steps of a recipe; checkpoints of a marathon; stages of a rocket launch.
- **Count-up slam.** A big number rolls to its value over four pulses. *Fits content like:* tonnes recycled; members of a club; years of a company.
- **Icon wall.** All pictograms return as a grid and turn one colour. *Fits content like:* a summary of a year; a periodic table of habits; a team roster.

## 9. Pitfalls of the medium

- Figure environments spread into the text column → give the stage its own layer and fade it out with a gradient mask before the text.
- Cream on light hues fails contrast → dark type and dark figures on light hues; their disc is the lighter tone.
- The sun disc vanishes on the dark neutral → use a lighter tone for it.
- A pattern rebuilt on every frame is slow and can flicker → build each card's pattern once from its seed, then only move its rows.
- Horizontal poses (swimming, lying, crawling) cross the title → move the stage outward and narrow the text column.
- Imitating a real identity too closely → your own palette, mark and slogan from the grid motifs.
- A cut that falls between two pulses feels late even when it is one frame off → every start is a whole multiple of the pulse.

## 10. Building it here

- **React and SVG, flat.** The pattern is one SVG: a `<g>` per row holding `<circle>` and `<path>` discs and motif `<use>` copies rotated by 90° steps; choose tones and motifs with `noise(cellIndex, seed)` inside a `useMemo`, and shift a row with a `translate` on its `<g>`.
- **Pictograms are SVG**: `<line>` and `<path>` with `stroke-linecap: round`, `<circle>`, `<rect rx>`. Poses are joint angles keyed on pulses. `Icon` (lucide) is a thin-outline family: fine for a meta chip, wrong for a hero pictogram.
- **Type**: `MaskRise` is this style's slide-up, but it rides a spring: pass it a `feel` that can't overshoot (`{ freq: 3, damping: 1 }`). Meta lines are your own mono text (`Kicker` sets the theme's face, not a mono). Count-ups use fixed-width digits.
- **Motion**: no springs beyond that tamed one. `prog(frame, start, dur, Easing.out(Easing.exp))` for entrances, the in-out version for whips; `ease.back` once at most.
- **Grid transitions**: rows are bands with `clip-path: inset(…)` or a `translateX`; quarter-discs and the iris are `clip-path: circle(…)`; a tile flip is `scaleX` through zero. Use `<SceneTrack sweeps={false} />` and draw the one light sweep on the sun disc yourself. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **Motion blur**: inside a transition, draw two or three fainter copies a fraction of a frame behind (the moves are functions of the frame, so ask them for `frame - 0.33`). Leave held cards alone.
- **Leans on** `Finish` for the light grain, with any vignette kept faint. No `Backdrop` glow, no `Device` tilt, no depth of field.
- **The pulse and the item list live in `timeline.ts`** (card starts are multiples of the pulse); `Soundtrack.tsx` reads the same list and gives each card its chapter's hit.

## 11. In a product video

- **The brand's colour is one of the five hues**: the hero chapter's, in five tones. A short film can be that hue alone plus the dark neutral.
- **Features are the catalogue**: one card per real feature, one verb each, the title in the product's own words. "ALL N" is only said when N is the true count.
- **The real product takes the stage**: on the product's own cards the sun disc holds a flat `Phone` with a real screenshot (no tilt, no depth, and `style={{ boxShadow: "none" }}` to drop its default soft shadow), and one pictogram beside it performs the verb. Pictograms stand for the things the product works on, never for a fake interface.
- **Count-up slams use real numbers**, each in `facts.md`; an illustrative figure carries `<ExampleBadge />`.
- **End card**: the icon wall turns one colour, then the logo lands on the sun disc with the product's name as the title and one line on where to get it; the progress bar is full.
- **Arabic**: mirror the card: text column on the right, stage on the left, lateral tracks running right to left, the progress bar filling from the right. Titles in a black-weight Arabic grotesque (the kind of IBM Plex Sans Arabic) with no tracking; words slide up whole and meta lines appear word by word instead of typing on. The index "07 / N" goes through `isolateNumbers`.
- **9:16**: stack the card: stage above, text column below, the title fitted to the width in five words or fewer. A lateral track becomes a vertical scroll. Keep the corner display and the narrated band inside the safe area: below the top 12%, above the bottom 22%, clear of the right 12%.

## 12. Variation space

You decide the items, grouping, verbs, palette, chapter order, any long take, the pace ladder, opening, ending and voice.

- Structures: **a countdown** (items ranked from N to 1, the camera scrolling down rows, the pace speeding up as the list shortens); **a day in pictograms** (one figure, one card per hour, the palette moving from dawn to night hues); **an assembly** (each card adds one part to a single growing pictogram machine seen in the corner).
- Openings: **a single motif cell** (one cell fills the frame and splits into the grid); **mid-action** (the first pictogram is already running when the type slams in); **a blank grid** (hairlines draw the grid on the pulse before any colour appears).
- Endings: **one card held long** (the last item stays while the pattern rows stop, one by one); **the figure walks off** (the last pictogram exits the frame and the corner display ticks out); **reverse assembly** (the grid comes apart into rows that slide off-screen, leaving cream).

---

Adapted for Halal Motion Videos from the `pictogram-motion` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
