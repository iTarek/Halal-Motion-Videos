# Swiss Motion Graphics

> International Typographic Style in motion: a modular grid, one typeface, one signal colour, and movement as exact as a printing press.
> References (grammar only): 1950s–70s Zurich posters (Müller-Brockmann, Hofmann, Gerstner, Crouwel) for the grid, flush-left type, scale contrast and "designing programmes"; modern identity systems in motion (Experimental Jetset, Pentagram) for exact snaps. Never copy a specific historical poster's composition (no concentric-circle or fan layouts lifted from Müller-Brockmann), never use Helvetica or Akzidenz font files, never name a real institution on a poster.

## 1. Essence, and what it is not

- **Pure 2D graphic design animated on a grid**: flat paper, black type and bars, a very light grey and **one** saturated signal colour.
- **Every element snaps to the grid, every move lands on the pulse, nothing bounces.**
- **Rigor with one exception**: the whole frame obeys a system, so the one element that doesn't becomes the protagonist.
- **Extreme scale contrast**: a giant numeral next to tiny technical notes.

Not a keynote (no gradients, no glow, no device renders), not kinetic typography (words don't fly, spin or bounce), not data visualisation (bars have mass as graphic form, not as charted quantities, unless the grid gives them that meaning), not a Bauhaus pastiche of primary shapes.

## 2. Materials & rendering

- **Frame grid**: 12 columns in 16:9, 6 columns in 9:16, with side margins of about 5% of the width, gutters of about 1.25% and a baseline grid of the same size. The frame can act as a **spread**: one page for the programme (numeral, rule text, notes) and one for the artifact; side by side in 16:9, stacked in 9:16.
- **Artifact grid** derived from the content (Gerstner): what the columns and rows *mean* is a design decision. **Choose module sizes that give the elements mass**; too many thin columns make a layout look like a chart.
- **Surfaces**: page, paper, ink, signal colour, grid lines in two or three light greys (on page, while building, on paper). No gradients, no shadows, no particles, no grain.
- **Bars and blocks** are flat rects; consecutive cells of one unit merge into one bar, overdrawn 1 px at seams (antialiasing shows hairlines, especially when rotated or scaled).
- **A secondary voice** can be light-grey elements under the black ones: depth without a second colour.
- **A 2D camera** (centre, scale, rotation) for all moves.

## 3. Colour logic

- **Paper, ink, greys, and one signal colour.** Only one thing carries the signal colour; that makes it the protagonist. It is the only thing allowed to be inexact.
- Overprint is allowed: black type on the signal colour.
- The signal colour can be red, orange, ultramarine or green; choose it for the topic, then never add a second.
- Examples: `#EAE9E5` page, `#FFFFFF` paper, `#111111` ink, signal `#E30613`; or `#F2F0EA` / `#141414` / signal `#FF5A00`; or `#E9ECEF` / `#0B0B0B` / signal `#1F3FFF`.

## 4. Type & on-screen text

- **One family for the whole film**, a neo-grotesque (Archivo, Inter, Schibsted Grotesk, Instrument Sans…), several weights. In Latin script, letter-spacing about −2% at large sizes; headlines can be lowercase.
- **Flush to the reading side, ragged on the other**; everything on a grid line; big white space is part of the layout. Giant numerals are **optically** flush (subtract the glyph's side bearing).
- **Narrated lines are part of the layout**, not a bar at the bottom: each line sits at a column start in the current composition (a small grey lead-in and a large bold statement, or a caption like a museum label), each word clip-revealed as it is spoken.
- **Caption rows**: small medium-weight notes with a hairline rule above (about 0.2% of the frame's short side, so it survives a phone); technical notes in a corner (module sizes, counts, a step counter).

## 5. Motion quality

- **Two curves only**: a precise ease `cubic-bezier(.7,0,.2,1)` for snaps; linear for lines being drawn, playheads and the exception. No overshoot, no spring, no bounce.
- **Durations come from one pulse**: pick a unit (say 15 frames) and make every duration one, a half or a quarter of it. A snap starts one duration early and **lands on the pulse**.
- **Entrances are wipes or clip-reveals, never fades**: words rise out of a clip rect from below the baseline and leave upward; lines grow along their length; paper appears by a wipe; big numerals climb in eased steps ("one module at a time").
- **Deletions are knife cuts**: a thin line crosses the element, then the element collapses to its midline.
- **Ripples are ordered by distance** from their cause, a couple of units per sub-pulse.
- **The exception moves differently**: linear, unsnapped, perhaps pausing mid-flight; a coordinate readout beside it can turn from "on grid" to "off grid".
- Smooth motion on every frame, no stepping: digital precision, not hand-made.

## 6. Camera grammar

A vocabulary, not a route. The camera moves only with the precise ease and only on the pulse. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Locked spread | cause → effect | a rule applied; a before/after; a comparison |
| Hard pan by one page or column | the next step in a system | a sequence; a catalogue; a timeline |
| Rotate 90° and stop | the same thing read another way | a poster as a timetable; a chart as a map |
| Pull out to a wall of artifacts | one programme, many outputs | a brand system; a product range; a series |
| Push into one module | detail; the unit of the system | a pixel; a letter; a single data point |
| Grid extends past the page | the system is bigger than the artifact | scale; ambition; a break from constraints |
| Split frame into equal cells | parallel cases | options; variants; team members |
| Vertical scroll through a column | reading; a list | a manifesto; a spec sheet; a timetable |

Framing: everything on the grid; the signal element may sit off-grid only when it is being the exception. Transitions are wipes, knife cuts, camera moves and re-flows; never dissolves.

## 7. Sound palette

- **Sounds follow the materials of print**, dry and close, no reverb: letterpress clack, ruling pen "tss", guillotine snick, paper slap and slide, numeral thunk, block snap, felt thump for a landing, rubber stamp, typewriter carriage.
- **One sound per snap, on its landing frame.** A family of three or four short hits (light, medium, heavy) covers a whole film; the weight of the sound matches the size of the element.
- **Ripples tick**: each element of a re-flow gets a very light tick, falling in level with distance from the cause.
- **The exception sounds different**: one soft, sustained tone that glides as it moves, the only sustained sound in the film.
- **Silence**: everything stops dead for half a second before the reveal; the next snap then reads as an event.
- **Sound across a cut**: the paper slide of the next page begins a few frames before the hard pan.
- **Voice**: cool, crisp, rule-like sentences; prefer a voice with bright consonants.

## 8. Native moves

A menu: use the ones your story needs.

- **The grid means something.** Columns and rows become a quantity (hours, floors, years, seats). *Fits content like:* a building's floors and rooms; a week's timetable; a city's districts.
- **Snap = sound.** Every arrival is a hit. *Fits content like:* a product's feature list; the steps of a recipe; a countdown.
- **Programme.** Rules applied one by one to one artifact, then the same programme generating many. *Fits content like:* a brand identity; a typeface family; a set of stamps.
- **Extreme scale contrast.** A giant element as chapter card beside tiny notes. *Fits content like:* a record statistic; a year; a price.
- **The exception.** One element breaks the grid, linear and unsnapped. *Fits content like:* an inventor; an outlier in the data; the one feature that changes everything.
- **Knife cut.** An element deleted by a line. *Fits content like:* budget cuts; editing a text; removing a step.
- **Re-flow.** Everything else rearranges around a change, nearest first. *Fits content like:* a team reorganised; traffic after a road closes; a layout adapting to a phone.

## 9. Pitfalls of the medium

- Too many thin columns look like a chart → fewer, wider modules.
- A "better" composition that isn't obviously better → one strong diagonal with long/short rhythm, a larger signal element, bleeds, type over colour. Merely tilting is not enough.
- Rotating and labelling at once reads as noise → rotate, hold, then add labels.
- Merged bars show seams after rotation → overdraw 1 px.
- Elements that share the camera leak into other shots → render them only while on screen.
- A snap that lands between two frames flickers → put every landing on a whole frame.

## 10. Building it here

- **Plain React and CSS**: every element is an absolutely positioned `div` or SVG rect on a grid computed from `useLayout()`; one wrapper with a CSS `transform` is the camera.
- **Motion**: `prog(frame, start, dur, Easing.bezier(0.7, 0, 0.2, 1))` for snaps and `prog(…, (t) => t)` for linear moves. No `springAt`, no `SPRING` feel: this style overrides the engine's default of springs.
- **Clip-reveals**: build the word reveal yourself, each whole word in its own inline box clipped at its bottom edge only (so Arabic marks and tails aren't cut), its `translateY` from the same `prog`. `MaskRise` looks alike but rides a spring that overshoots, so it stays out. For bars and paper, animate `clip-path: inset(…)`.
- **Leave out** `Finish` (no grain, no vignette), `Backdrop` glow and the light `Sweep` at cuts: use `<SceneTrack sweeps={false} />`. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **Knife cut**: a thin line `div` (about 0.2% of the frame's short side) whose width grows, then `scaleY` to 0 on the element.
- **The pulse lives in `timeline.ts`**: export the unit in frames and derive every start and duration from it, so `Soundtrack.tsx` lands each cue on the same frames.

## 11. In a product video

- **The brand's main colour is the signal colour.** If the brand has several, pick the one that means "us" and keep the rest out of the film.
- **The brand's own typeface** if it is a grotesque; otherwise one of the families above for the film, and the brand's face only in the logo.
- **The product appears as an artifact on the paper page**: a screenshot cropped flat to a rectangle of modules, no device frame and no shadow. Zoom into one module of it instead of tilting it.
- **Real numbers become the giant numerals**; each one is in `facts.md`, and a figure that only illustrates carries `<ExampleBadge />`.
- **End card**: the logo flush on the grid, one line saying where to get it, and the signal colour used once.
- **Arabic**: flush right, with the programme page on the right; words clip-reveal whole, never letter by letter, with no letter-spacing; choose a geometric Arabic face of matching weight.
- **9:16**: stack the spread, keep the giant numeral and the exception in the middle band, and keep everything that must be read clear of the top 12%, the bottom 22% and the right 12%.

## 12. Variation space

You decide the system, what the grid means, the exception (or none), the signal colour, the opening and the ending.

- Structures: **a timetable** (a 24-row grid of hours fills with the topic's day, one row per pulse); **an alphabet** (A to Z, each letter a module of the topic, the grid completing as a specimen sheet); **a comparison** (two systems side by side on a split spread until one element crosses the gutter).
- Openings: **a single dot** placed on the page, then the grid growing from it; **the finished artifact** that is then dismantled into its rules; **a giant numeral** filling the frame, which turns out to be a detail of a small layout.
- Endings: **the empty grid** after every element has been cut away; **a single word** flush in the corner; **the exception leaves the frame** and the system closes over the space it left.

---

Adapted for Halal Motion Videos from the `swiss-motion` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
