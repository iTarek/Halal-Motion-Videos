# Isometric Infographic

> A system diagram comes alive: an isometric diorama of flat three-tone blocks, thin ink labels and Isotype numbers, where things open up to show their insides and the numbers are drawn, not stated.
> References (grammar only): *Monument Valley* (true-isometric architecture, flat colour blocks, three fixed tones per face, a camera that pans and zooms but never breaks the projection); *SimCity 2000*-style cutaway dioramas (a floating board with soil strata, the whole system visible at once); Kurzgesagt (a question, a steady push forward, one clear visual metaphor per step, a change of scale when a number is too big to feel); Isotype, Otto Neurath / Gerd Arntz (repeated identical icons stand for quantity); *Powers of Ten* (a continuous dive through nested scales). Use none of their characters, buildings, icons or palettes.

## 1. Essence, and what it is not

- **Flat, true isometric.** No perspective, no outlines on solids; shapes are separated only by the three tones of each face. The projection never rotates or tilts.
- **Infographic furniture is part of the picture**: leader lines, label pins, dashed cut lines, hatched section faces, tracking rings, a legend, a route line all live in the world.
- **Numbers are built from icons** (Isotype), and they add up.
- **A diorama**: the system sits on a floating board or plinth with a visible cross-section at its edges, on a pale ground.

Not low-poly 3D (no perspective, no lighting beyond three face tones), not a flat 2D explainer (everything has isometric depth), not a blueprint (colour blocks, not line drawings on blue).

## 2. Materials & rendering

- **Projection**: axes at 30°. `sx = (x − y)·cos30°·k`, `sy = ((x + y)·½ − z)·k`; x runs down-right, y down-left, z up; draw order = x + y + z, far to near. Everything is collected, depth-sorted, then drawn.
- **Three tones per face** chosen from the way it faces: top light, left mid, right dark. Derive tones from one base colour: mix toward warm white about 20% for the top and toward a cool dark (e.g. `#231A2C`) about 22% for the dark side, so shadows are slightly cool.
- **Ink lines** (2 px at 1080 wide) only for infographic elements: leaders, pins, cut lines, rings, routes, labels.
- **The board**: floats on a pale background with a faint isometric dot lattice and a soft blurred shadow; its front faces show strata (soil, water column, floors, pipes) where the section meets the edge.
- **Composites** (a terraced hill with shrubs, a crane over a ship) are drawn as one ordered item or nudged in the draw order; plain depth sorting fails on them.
- **People**: minimal flat figures facing the viewer (round head, tapered two-tone body, a thick arm stroke, a cap or hair shape for identity, no faces), stepping: each drawing held 2–3 frames.
- **Close-ups** of hands or objects: flat faceted shapes in three tones, same logic as the blocks.
- **Level of detail by zoom**: skip small world detail when zoomed far in, fade tall objects in by zoom so a pull-out never sweeps a giant shape through the frame.

## 3. Colour logic

- **A pale neutral ground** (cream, paper grey or pale blue) and **5–7 flat hues**, each with its three tones; one ink colour.
- **Colour codes meaning**, the way a legend does: one hue per material or role (water is always the same blue, the subject always its hue). Never reuse a hue for two meanings.
- **The subject's hue is reserved**: when the story needs "this one", everything else desaturates toward warm grey and only the subject keeps its colour (focus + context).
- Stations that must be found in a wide shot get a pale plate with a dashed ink outline plus one accent hue.
- Examples: a recycling chain — bottle green, kraft brown, can silver-blue, compost umber, mustard on cream; a hospital — teal, coral, lavender, steel grey on pale grey; a data centre — electric blue, amber, graphite, mint on off-white.

## 4. Type & on-screen text

- One geometric sans (the kind Jost is), or the brand's own sans: titles semibold, all caps with about 0.12 em tracking in Latin script; numbers regular and large, units at half size. All text has a halo in the ground colour so it reads over any block.
- **Label pins**: dot (ink ring, pale fill) → vertical leader → horizontal rule → text. Pins point up or down, left or right, chosen per station so labels never cover the subject.
- **Titles** can be isometric type on a world plane, extruded as blocks.
- **A narrated line is a map label**: a pale card with a small radius and an ink border, a tiny iso cube as legend chip, bottom-centre; the border draws first, then the words wipe in as they are spoken. Keep that zone clear of the world; lines never overlap titles or other lines.
- **An end frame can be the legend**: title, totals, the Isotype key, credits, "NOT TO SCALE".

## 5. Motion quality

- **Nothing moves without a line leading it**: a route line is drawn slightly ahead, a leader grows before an inset opens, a cut line draws before a skin slides away.
- **Cutaway**: cut line (about 9 frames) → the near skin slides out along the way it faces and fades (about 10 frames, ease-out) → hatched section rims fade in over the last part.
- **One pulse** (say 16 frames, so its half and quarter are whole frames) under the film. **Isotype fill**: icons pop with a back-ease (overshoot), one per half or quarter of the pulse; count-up numbers run over the same span.
- **Accumulation = acceleration**: arrivals on every pulse, then every half, then in waves; the eye feels the system taking over. Solids arrive by motion, never by alpha (semi-transparent blocks look hollow and weightless).
- **Objects perform**: squash on landing (about 18%) and small bounces; colour changes that show a process (raw → cooked, empty → full).
- **Vehicles** follow polylines with ease-in-out and face the way they travel.

## 6. Camera grammar

A vocabulary, not a route. The camera is a world centre plus a zoom that is **interpolated on a log scale** (so a dive feels even all the way down); the projection never changes. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Follow along a route | process; cause → effect | a supply chain; a journey; a signal |
| Hold wide + circular inset | the system and the individual together | one worker in a factory; one cell in an organ |
| Push through nested cutaways | a fall into scale; finding one thing among millions | a needle in a haystack; inside a machine |
| Fast log pull-out | release; the big picture after a detail | scale reveal; a statistic made physical |
| Locked frame while things accumulate | a system filling up; overload | a queue; traffic; data growing |
| Lateral follow over emptiness | a breath; distance | an ocean; a wait; a quiet phase |
| Top-to-bottom tilt through strata | layers; depth; history | geology; a city's underground; a software stack |
| Switch boards (a second diorama) | before/after; here vs there | two cities; two eras; two designs |

Framing: the subject is at least a third of the frame height at key moments; labels never cover it; the map-label zone stays clear. In 16:9 the board sits wide; in 9:16 turn the system so its route runs down the frame along one iso axis, and let strata and towers use the height. One continuous take is one option; a cut to a new board or an inset is another.

## 7. Sound palette

- **Foley by material**: fibre snap, soft thud, grains pouring, granular rattles, a clang of steel for containers, paper tear, ceramic plink, liquid pour with rising pitch, servo whine, keyboard clicks.
- **One sound per icon** as a number fills: a short pop, the run rising a little in pitch and settling on the total. Short accents, never a tune.
- **Lines are faint, solids land**: a faint pen scratch for a cut line or a leader; a block landing gets a thud sized to it (light for an icon, medium for a machine, one heavy one for the hero arrival). Camera moves are silent.
- **Ambience beds per station**, crossfaded: wind and birds, harbour, sea, city hum, machine room, crowd murmur. Quiet, never tonal; they close in and muffle as the camera dives inside something.
- **Silence**: digital zero or one faint sound before the main reveal; the first sound after it should be one of the most important in the film.
- **Sound across a cut**: the next station is heard about half a second before it enters the frame.
- **Final pull-back**: one soft tick or short chime per station as its label comes on screen.
- **Voice**: clear, friendly explainer; short lines.

## 8. Native moves

A menu: use the ones your story needs.

- **Cutaway.** Cut line, skin slides away, hatched rims remain. *Fits content like:* a heart's chambers; a server rack; a beehive.
- **Isotype number.** Identical icons in a new arrangement each time (a calendar, a bar, a silhouette formed by the icons themselves). *Fits content like:* votes in an election; litres of water per product; users of an app.
- **Focus + context.** Everything greys except the subject. *Fits content like:* one patient in a hospital; one packet in a network; one tree in a forest.
- **Frame within the frame.** A leader grows into a circular inset with a close-up. *Fits content like:* a chip on a circuit board; a worker's hands; a crack in a bridge.
- **Scale reveal.** Pull back until every label is on screen and the last frame is a finished infographic. *Fits content like:* how a city is powered; a school's day; a trade-fair site.
- **Tracked subject.** One object followed with a "you are here" ring. *Fits content like:* a letter through the post; a drop through a water plant; a vaccine dose.
- **Strata cross-section.** The board's edge becomes the story (layers added or removed). *Fits content like:* a mine; an archaeological dig; a building's floors.

## 9. Pitfalls of the medium

- A face that seems to point away gets skipped and leaves a hole → decide each face's outward side explicitly instead of trusting the order of its corners.
- Depth sorting breaks on composites → draw them as one ordered item; nudge overhangs forward.
- Semi-transparent moving solids look hollow and weightless → motion only, no alpha.
- A hull or wheel touching the wrong surface reads as an accident → leave visible clearance.
- World geometry behind a close-up becomes giant discs → skip detail above a zoom threshold, paint a flat backdrop behind hero layers.
- A pull-out through a tall object gives one ugly frame → fade tall objects in by zoom.
- Hidden jumps (a time or place change during a dive) must be drawn in screen space anchored on the tracked subject, so the frame doesn't reveal the jump.
- An object drawn with the wrong silhouette reads as something else (a white box with a red roof is a house) → give machines their tell-tale parts.

## 10. Building it here

- **It was never 3D**: a small projection function (the two formulas in §2) turns world points into screen points. Each solid becomes two or three SVG polygons in its three tones; collect all items for the frame, sort by `x + y + z`, and render them in that order. No 3D renderer and no 3D library.
- **Tones from one colour**: a helper that mixes a base hue toward warm white and toward the cool dark returns the top, mid and dark fills; focus + context is the same helper with saturation pulled down for everything but the subject.
- **Camera**: world centre and zoom as two numbers; zoom is `Math.exp(lerp(Math.log(k0), Math.log(k1), t))` with `t` from `prog(frame, start, dur, ease.inOut)`.
- **Lines draw themselves** with SVG `stroke-dasharray` / `stroke-dashoffset`; hatching is an SVG `pattern`; a cutaway skin is its own group that translates along its face direction; an inset is a `clip-path` circle holding a second, zoomed copy of the world.
- **Leans on the engine's springs**: `springAt(…, SPRING.bouncy)` for icon pops and landings (scale the solid on its vertical axis for the squash), `SPRING.snappy` for pins. Routes and camera use `prog`. Count-ups use `fontVariantNumeric: "tabular-nums"`; `Icon` holds only a handful of line glyphs, so most Isotype icons are small flat SVG shapes of your own.
- **Overrides**: no `Finish` (no grain, no vignette), no `Backdrop`, no light sweep (`<SceneTrack sweeps={false} />`), and nothing fades in: solids arrive by motion. Text halo is `paint-order: stroke` with a stroke in the ground colour.
- **A screenshot on a face**: any flat image can lie true on an iso plane with one CSS `transform: matrix(…)` built from the same projection.
- **The pulse lives in `timeline.ts`**; each icon's pop frame is derived from it, and `Soundtrack.tsx` places one cue on each.

## 11. In a product video

- **The brand's colour is the subject's reserved hue**: the tracked object, the one station, the thing that keeps its colour when everything else greys. The other hues come from the topic and never repeat it.
- **The product is a station in the system**: show what goes in, what it does and what comes out, with the app as a block (a phone slab, a kiosk, a building with its sign) whose face carries the real screenshot, laid true on the iso plane.
- **To read the interface**, a leader grows into an inset holding a flat `Phone` or a `Device` screen recording (`float={0}`, no `moves`); the wide world stays visible around it.
- **Isotype numbers are real numbers**: each icon stands for a stated amount, the icons add up to a figure in `facts.md`, and the key says what one icon equals. Illustrative counts carry `<ExampleBadge />`.
- **End card**: the finished infographic as a legend: logo, the totals, the Isotype key and one line on where to get it.
- **Arabic**: routes run right to left and the legend sits on the right; pins put their rule and text on the side that keeps a right-aligned label clear. Words wipe or pop in whole, never letter by letter, with no letter-spacing (the all-caps tracking does not apply); a geometric Kufi-style sans matches the blocks. Wrap ranges in `isolateNumbers`.
- **9:16**: the route runs down the frame, pins point left or into the board rather than into the right 12%, the title sits below the top 12% and the map-label card above the bottom 22%.

## 12. Variation space

You decide the system, the board (or several), whether there is a tracked subject, the numbers, the camera path, the opening and the ending.

- Structures: **one building, floor by floor** (a tilt down through a cutaway tower, each floor a step); **two boards compared** (the same system in two places or eras, alternating, then side by side); **a cycle** (a loop route that returns to its start with one number changed each lap).
- Openings: **the finished infographic**, which then comes apart into its moving parts; **one icon** that multiplies until it becomes the landscape; **a question written as an isometric title** on an empty board.
- Endings: **an unanswered station** (the route stops at an empty plate with a question mark); **the legend alone**, the board faded out; **a close-up of a single icon**, the whole number behind it out of focus.

---

Adapted for Halal Motion Videos from the `iso-infographic` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
