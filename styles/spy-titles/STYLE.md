# 60s Spy Title Sequence

> A cut-paper, four-ink opening title sequence in the 1960s manner, for a film that never existed: silhouettes move through sets built out of the credits themselves, every hard hit is a cut, and a title is assembled from the pieces.
> References (grammar only): Saul Bass's film titles of 1955–60 (flat opaque inks, abstraction down to silhouettes, type as structure); Kuntzel + Deygas's 2002 cut-paper title homage (a chase through graphic sets, lateral tracking). No tiptoeing cartoon panther, none of the genre's stock emblems, no copy of any real title's logo, lettering, characters or shots.

## 1. Essence, and what it is not

- **Flat, opaque inks on paper**: four colours, no gradients.
- **Hand-cut edges** on every shape; pieces layered with cut gaps and small paper shadows.
- **Abstraction down to silhouettes**: figures in profile, all acting in outline and timing.
- **Typography is the picture's structure**: credits are architecture, props, vehicles.
- **Sound cuts the picture**: every hard hit is an edit point.
- A title sequence is a story in itself: one goal, a few locations, one reveal.

"Spy" names the era's graphic manner, not the plot. Here the pursuit is a harmless one: a courier racing a deadline, a parcel changing hands, a lost key finding its door. Nobody is threatened, tricked or hurt; the only suspense is "will it arrive in time?".

Not flat vector motion graphics (the edges are cut, the paper is physical), not a halftone print style (no dots), not a Swiss grid (diagonals, jaunty type, playful), not a parody full of gadgets.

## 2. Materials & rendering

- **Scissor-cut edges**: every outline is broken into short steps and pushed in and out by low-frequency noise (about 0.1–0.2% of the frame height, larger for bigger shapes) plus a rare small notch. **Cut the edge once in the piece's own space and keep it**, so a moving cutout keeps the same edge, exactly like real cutout animation (edges recomputed on screen crawl).
- **Paper layering**: separate pieces are separated by a thin cut gap in the ground colour (about 0.2% of the frame height) and cast a small paper shadow (a slight offset, a soft blur, about 30% opacity). Whole figures get the gap as an outline, so a black figure reads in front of a black letter.
- **Paper texture**: one full-frame texture multiplied on top (mottling + faint fibres), a sparse "ink void" speckle on dark ink, faint squeegee streaks; light film grain.
- **Silhouette figures**: tall stylised adults (about 7 heads), identity by hat, coat cut, shoes and **one colour accent** that doubles as a motion indicator (a tie or scarf streaming back when running). Pieces **merge into one outline** inside the figure, with only thin slits at shoulder, elbow, hip and knee. Hands are sharp wedges; no faces except an eye slit in close-ups.
- **The object of the chase** sits on a black backing (an ink keyline) so it reads on any ground; it is the brightest thing in frame.
- **Type**: a condensed display face (the kind of League Gothic) for credits, **re-cut** like every other shape (edge noise, a slight rotation of under a degree and a small baseline jitter per letter in Latin script). A title in custom geometric cut glyphs (straight cuts + arcs, uneven weights, staggered baselines), never a real title's lettering.

## 3. Colour logic

- **Four inks**: ink black, paper cream, one hot colour, one warm secondary. Darker "shadow paper" variants of those inks only for depth.
- **One dominant ground colour per scene**, changing with the location; figures and type in the other inks.
- The hot colour is reserved for one accent on the hero and for urgency; the secondary marks the object of the chase.
- Background props go in a darker version of the ground, never in black, or they read as letters.
- Examples: black `#1b1714` / cream `#efe4c9` / red `#d23a22` / mustard `#e2a52a`; ink `#161a22` / bone `#ece6d6` / teal `#1f8a8a` / orange `#f07a28`; black / pale pink `#f3d6cc` / cobalt `#2a46b8` / lemon `#f0d23a`.

## 4. Type & on-screen text

- **Credits live in the set**, never in the caption strip: one line per location, fully readable at some moment. Credits are roles, features or facts, never real people's names unless the user supplies them.
- **Narrated lines** sit on a narrow paper strip (scissor-cut ends, slightly tilted) low on the reading side, with a small glyph from the film as bullet, in a geometric sans (the kind of League Spartan 600). Light strip on dark scenes, dark strip on light scenes; it slides in from the reading side in about 0.18 s, and its words arrive with the voice-over's word timings.
- Hold each credit long enough to read alongside a narrated line.
- The style needs a condensed display face for the sets; a brand's own condensed or heavy face can play that part, otherwise the brand's typeface appears in the assembled title only.

## 5. Motion quality

- **Puppets on held drawings**: poses and positions of figures, hands, letters landing and vehicles hold 2–3 frames (about 12 a second). **Camera, credit slides and grid growth move on every frame**: a stepped camera judders.
- **One pulse times everything**: pick a unit in frames. Run cycles of about 8 drawings, one step per pulse, a strong lean, the accent flying back. Walks one step per pulse, coats swinging.
- Credits slide in along grid lines and **stop dead on the pulse** (short ease-out); letters land with a paper slap.
- **Stop-time**: at a hit the whole picture freezes (background scroll included) for a couple of pulses in total silence, then resumes.
- Shattering: a scene sliced into strips parallel to a cut line that slide off alternately along the diagonal.

## 6. Camera grammar

A vocabulary, not a route. Graphic, flat, decisive. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Wide on a full credit line, then truck in | reading, then action | any location built from type |
| Lateral tracking, one screen direction | pursuit; momentum | a chase; a race; a delivery |
| Hard cut on a hit | punch; a new location | montage; a reveal; a gag |
| Graphic match cut (same shape, same position) | rhyme; acceleration | wheel → coin → pupil → moon |
| Locked single shape on a flat ground | mystery; an icon | a cold open; a clue; a logo |
| Silhouette against a giant circle | the hero moment | a catch; a triumph; a finish line |
| Diagonal split into a grid | fragmentation; many at once | a split screen; a network; a team |
| Vertical pan down a column of type | descent; a list | a building; a roster; a countdown |
| Push into a letter until it fills frame | a letter becomes a place | a door; a tunnel; a window |

Framing: strong diagonals (about 30°), big flat grounds, figures small against type. Match cuts keep circle centres and sizes identical across the cut. In 9:16 the vertical pan and the diagonal take over from the lateral track, and a credit line stacks in two. No dissolves.

## 7. Sound palette

- **The hit is the edit point**: a card slap, a dry thump and a short crack of noise stacked into one staccato sound, its loudest instant exactly on the cut frame. Three weights: a slap for a letter landing, a thud for a credit stopping, the full hit for a cut.
- **Foley follows the material**: paper (a cut "shh", slides, card slaps, blind flips, a tear), metal (keys, chains, locks, clicks), tape (a click, hiss).
- **Places are only hinted**: a jet pass moving across, train wheels on the pulse, a bicycle wheel's ticks slowing, wind, a phone ring, footsteps on stairs, one step per pulse.
- **What stays silent**: flat grounds, held credits, the camera. No bed under the action except a faint tape hiss, never tonal.
- **Techniques, as options**: a cut interval that shrinks as the chase accelerates; one big hit for the title followed by a small click as a button; a single sound alone for a quiet scene.
- **Silence**: stop-time is true zero, tails included; a single tape click or hiss may remain. The hit that restarts the picture is the loudest so far.
- **Sound across a cut**: the train wheels start under the last frames of the scene before, and the paper tear of the diagonal split runs on over the grid.
- **Voice**: a dispatcher's briefing, as if played from a tape recorder: calm, clipped, a few very short lines.

## 8. Native moves

A menu: use the ones your story needs.

- **Type is the set.** Each location is one line of credits and that line is its architecture (letters as pillars, words as carriages, a letter as a lock). *Fits content like:* a conference programme as a city; a menu as a restaurant; team names as a stadium.
- **Credits are rhythm.** Credits land on the pulse; hits are cuts. *Fits content like:* a product's features; a conference line-up; an award's nominees.
- **Graphic match cuts.** Shape rhymes, the interval shrinking as tension rises. *Fits content like:* a coin → a planet → a clock; a gear → a wheel → a sun.
- **The diagonal grid.** A diagonal cut multiplies into a grid, and the pieces later fly back along it to assemble something. *Fits content like:* a puzzle solved; a team forming; a logo assembled.
- **Silhouette puppets.** Profile cut-outs whose acting is outline and timing. *Fits content like:* a parcel's journey; a courier on a deadline; a detective looking for a lost cat.
- **Stop-time gag.** Freeze on a hit, silence, resume. *Fits content like:* a near miss; a double take; a price reveal.
- **The object of the chase is the title.** What everyone pursues becomes the last thing assembled. *Fits content like:* a product launch; a book's name; a birthday name.

## 9. Pitfalls of the medium

- Every internal piece outlined with a gap looks like a mannequin diagram → merge the pieces, cut only joint slits, outline the whole figure.
- A figure fully hidden behind a letter reads as "nobody there" → let hat, nose and accent stick out. A stiff streamer reads as a tongue → a multi-segment ribbon with a travelling sine.
- A credit only ever seen partially is uncomfortable → always open wide on the full line.
- Black background props read as letters → darker ground colour.
- An object in the same ink as its ground vanishes → black backing.
- Circular props dropped into a word cover neighbouring letters → lay the word out around a gap.
- Match cuts fail if circle centres move across the cut.
- Edges recut on every frame shimmer like heat → one cut per piece, kept for the whole film.
- A hit that peaks a frame late makes the cut feel soft → place each cue by its peak.

## 10. Building it here

- **Pieces are SVG polygons** whose points are displaced once with `noise(i, seed)` inside a `useMemo`, then moved by a `transform` on their group: the cut edge travels with the piece. Never `Math.random`, never a filter recomputed in screen space.
- **Gaps and shadows**: a figure is one group of same-ink pieces with thin ground-coloured slits at the joints; the gap ring is that group's silhouette grown a little (`feMorphology` dilate) in the ground colour underneath; the paper shadow is a `drop-shadow` on the group.
- **Credits** are real text in the brand's or the style's condensed face, each letter (each whole word in Arabic) in its own inline box with a fixed tilt and baseline shift from `noise`, under one light `feDisplacementMap` for the cut edge.
- **Motion**: figures read `Math.floor(frame / hold) * hold`; the camera is one wrapper `transform` reading `frame`. Stops use `prog(…, ease.out)` over a few frames. No springs and no overshoot: paper stops dead. Stop-time is the same scene rendered with the frame number held.
- **The diagonal split** is the scene repeated in strips, each a `clip-path: polygon(…)`, sliding alternately; match cuts share one circle centre and radius exported from `timeline.ts`.
- **Finish**: a full-frame `feTurbulence` paper texture (fixed `seed`) with `mix-blend-mode: multiply`, and `Finish` kept to light grain. Use `<SceneTrack sweeps={false} />`; every scene change is a hard cut, a match cut or the split. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **The pulse and every hit live in `timeline.ts`**; `Soundtrack.tsx` places each hit by its `peak`, so the loudest instant is the cut frame.

## 11. In a product video

- **Four inks stay four.** The brand's main colour takes the role of the secondary: the ink of the object of the chase, the brightest thing in frame. Choose the hot colour to contrast with it, or use a second brand colour there.
- **The product is the object of the chase**: a flat card on a black backing passed from scene to scene. At the reveal it turns out to be the real screen: a flat `Phone` with a cut-paper border, its screenshot or screen recording shown clean, then a push into the one detail that matters.
- **Credits are the product's features and facts**, one line per location, each listed in the video's `facts.md`. Illustrative data carries `<ExampleBadge />`. No real people's names in the credits.
- **The pursuit stays harmless and kind**: a deadline, a delivery, a lost thing returned; figures in hats and long coats; nobody is tricked or hurt.
- **End card**: the pieces fly back along the diagonal grid and assemble the logo; one line on how to get it on the paper strip.
- **Arabic**: the chase runs right to left and strips slide in from the right. Credits are cut word by word, each word whole, with no letter-spacing and no tilting of single letters, in a heavy condensed Kufi. Pillars and doors come from whole words and their tall strokes, not from letters pulled apart.
- **9:16**: pan down columns of type and run the chase along the diagonal; keep the full credit line and the strip clear of the top 12%, the bottom 22% and the right 12%.

## 12. Variation space

You decide what is pursued, by whom, the locations (as credits), the inks, the opening and the ending.

- Structures: **no chase: a countdown** (ten credits, ten locations, a departure-board number built from type in each); **a return** (a lost object is carried back, location by location, to where it belongs); **two couriers, one frame** (split diagonally, each side a different ground colour, until they meet).
- Openings: **a full-frame title** that shatters into the sequence (the reveal moved to the start); **a telephone rings** in a single cut-out room; **the hero already falling** through a column of type.
- Endings: **the title never assembles**, one piece missing, the hero walking off with it; **a slow pull-out** showing every location was one giant credit page; **a stop-time freeze** on the final hit, held.

---

Adapted for Halal Motion Videos from the `spy-titles` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
