# Blueprint

> Engineering drawings that come alive on a sheet of cyanotype paper: white technical line work on Prussian blue, drawn in drafting order, with annotations that move.
> References (grammar only, never copy): the moving technical drawings of Prologue Films' end-credit sequences, Leonardo's *Codex Atlanticus* pages, 19th-century US patent drawings (Fig. 1 / Fig. 2, part balloons, fine-line shading), the automaton drawings in *Hugo* (2011). No film-franchise elements, no real patents, no real inventor's machine or signature.

Suits films of 30–60 s.

## 1. Essence, and what it is not

- **The whole film happens on one sheet of blueprint paper** lying on a dark drafting table. The camera moves over it like an eye reading a drawing.
- **White line work on uneven Prussian blue**: centre lines, outlines, hatching, dimension lines, leader lines with numbered balloons, a title block, a notes column.
- **A 2D line-drawing language**: orthographic and oblique/isometric projection are allowed, **3D rendering never**.
- **Rigorous convention carries the tone**: the drawing is dry and exact; the notes can carry wit, warmth or gravity.
- **The designed thing is the character.** A machine, object, building or plan acts through its parts; people appear only as a hand shadow with a pen, or a signature.

Not Hologram HUD (no glowing wireframe, no 3D orbit), not Whiteboard (no marker on white), not Copperplate Engraving (no burin tonal hatching as the whole look).

## 2. Materials & rendering

- **Sheet**: cyanotype paper drawn in *sheet coordinates*, crisp at any zoom: a cloudy mix of two Prussian blues, coating streaks, fibres, fold creases (bright edge, dark edge, whitening), bleached edges, specks. Around it: dark drafting cloth with a drop shadow.
- **Lines**: pale blue-white, slightly soft, with a faint ink breakup driven by the paper grain. Four weights (outline, detail, thin, hair; in the ratio 3.2 : 2.0 : 1.25 : 0.9). **Width on screen = width on the sheet × zoom^0.65**, so close-ups don't turn into sausages and wides don't vanish.
- **Dash conventions**: centre line (long-short), hidden (short dashes), phantom / cutting plane (long-short-short), kept in sheet units so the pattern stays on the paper.
- **Occlusion by painter's order**: every solid is filled with "paper" before its outline is stroked. Oblique extrusion: stroke the outline at N depth steps at double width, then fill the same steps with paper; a clean silhouette survives.
- **Layers**: ink (the white lines); effects above it (shadow, wetness, stamp ink); the narrated-note overlay last. Shadows darken lines too: that is how a lifted object proves it has left the paper.
- **Hatching** (fine-line shading) for sections, soil, weights, at 45°, evenly spaced.
- **Cyanotype and water**: a drop blooms deeper blue with a pale tide line; white lines inside the stain go soft; ink signatures bleed.
- **The one real thing** (optional, at most once): a drawing symbol that leaves the drawing language gets soft volume, one gradient across its whole shape, glow, and a shadow falling across the lines. It leaves a pale unexposed imprint where it was drawn.

## 3. Colour logic

- **Blue and white only.** The blue varies in value (coating, stains, folds); the white varies in weight and softness, never in hue.
- **One non-blue colour, used exactly once**: a rubber-stamp ink (red is classic; a green APPROVED or black VOID work too). It carries the verdict.
- The "real" object at the climax may carry light (white glow, soft value), not a new hue.
- Example blues: `#18336B` → `#2A58A6` with lines `#E7F0F9` and table `#0D1116`; a faded sun-bleached sheet `#3A6DA8` → `#5B8CC4`; a deep over-exposed sheet `#0F2350` → `#1D3F80`.

## 4. Type & on-screen text

- **Hand lettering** for header, labels, notes and narrated lines (the kind of face Architects Daughter is); a technical sans for title-block fields (the kind B612 is); a script only for the signature. The hand lettering is the style's own and stays whatever the brand uses; a brand's sans can take the title-block fields.
- **Text is lettered on in reading order** with a glowing nib, like everything else.
- **Narrated lines are drawing notes**: a light translucent box with double white rules, a "NOTE / n" cell, the text lettered on as the voice speaks it, a small leader tick. **Placed per shot in empty sky**, never fixed to the bottom (the bottom of a drawing is ground line, base and title block). Wrap at about 45% of the frame width in 16:9 and 80% in 9:16.
- Every narrated line is also lettered into the sheet's **GENERAL NOTES** column, so the final wide shows the whole voice-over as drawing notes.
- The **title is the sheet header**; the **title block** holds status and verdict fields.

## 5. Motion quality

- **Camera and draw-on move on every frame.** Continuous moves within a section, hard cuts on the pulse between sections; tiny camera bumps only for physical impacts (paper slap, stamp).
- **One pulse**: pick a unit in frames; layers start on it, parts leave and return on its halves and quarters.
- **Draw-on** truncated by arc length with a glowing nib at the head; items staggered within a layer; each layer starts on a pulse.
- **Drafting order**: centre lines → outlines → detail → hatching → dimensions → balloons → labels.
- **Exploded views**: parts leave in sequence on subdivisions of the pulse, eased, and return a group at a time with a click.
- **Mechanisms step like an escapement**: a gear advances one tooth per subdivision with a short ease-out; meshing phases worked out so teeth really interlock; chains move with their sprockets.
- **Machine acting**: angles, droops, volumes and gauge needles are the face. Failure = slowing, sagging, winding down over about 1.5 s; joy = snapping upright, a needle overshooting and settling.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Whole sheet on the table | scale, the document as an object | establishing; a verdict; a series of sheets |
| Medium on a figure, subject about 80% of height, sky on one side | the design being drawn | drafting; explaining a part |
| Track along a path of force (chain, pipe, wire, beam) | cause and effect | how it works; a sequence of operations |
| 2× close-up cut on the pulse | the mechanism's heart | gears meshing; a valve; a joint |
| Locked-off, hold | deliberation | a hand revising; a decision |
| Oblique depth factor 0 → 0.5 | the flat drawing "turns" and gains thickness | from plan to object; a reveal of depth |
| Section line sweeping across | inside vs outside | a cutaway; hidden structure |
| Pan across Fig. 1 → Fig. 2 → Fig. 3 | versions, steps, time | revisions; stages of construction |
| Slow push-in, no voice | wonder | the one real thing |

Keep storytelling shots close; full-sheet wides are rare. Keep the main figure at least half a frame (at that shot's zoom) from any sheet edge you will frame. Transitions: cuts on the pulse, or fig-number rewrites on the sheet; no dissolves.

## 7. Sound palette

- **Paper and drafting tools**: roll crackle and slap, a T-square's wood slide, technical pen scratch (a fine grainy hiss, as long as the stroke), lettering bursts, compass squeak, hatching strokes, eraser rub, tracing-paper rustle, pen cap click.
- **Brass, wood and water**: part clicks (small bright resonances), escapement ticks, chain rattle, spring twang, wind-down ticks that slow geometrically; soft damped pats per drop of water. **The stamp** is one rubber thump, the heaviest sound in the film, used once.
- **What gets a sound**: every stroke group, every part that leaves or returns, every tooth of a stepping gear. Camera moves get a low, dull whoosh at most; a locked-off hold gets nothing.
- **Ambience bed**: paper and room only (a quiet studio, the sheet's hush under the hand, a light rain when the story has water); in the silences nothing but paper sounds remains.
- **Silence**: the mechanism winds down into true silence before the turn; the first sound after it is a single pen stroke.
- **Sound across a cut**: the pen scratch of the next figure starts a few frames before the cut to it.
- **Tonal accents**: escapement ticks may step up in pitch as an assembly completes, and one soft bell-like ring may mark the one real thing. Never a tune.
- **Voice**: dry, understated, reading design notes, a few short lines. Leave the most affecting moment voiceless.

## 8. Native moves

A menu: use the ones your story needs.

- **Drafting order.** The object draws itself as an engineer would, a layer per pulse. *Fits content like:* a bridge; a clock; a kitchen renovation.
- **Live annotations.** Dimensions measure moving parts and the numbers change; balloons fly with parts; a section line reveals the inside. *Fits content like:* a heart valve; a folding bicycle; a rocket stage separating.
- **Fig. numbers as transitions.** "FIG. 1" struck through and rewritten "FIG. 2 · EXPLODED VIEW". *Fits content like:* versions of a product; phases of a construction; a recipe's stages.
- **Projection as camera.** The oblique factor animates; exploded parts fly along the depth axis. *Fits content like:* a floor plan becoming a building; a circuit board; flat-pack furniture.
- **A symbol made real** (once, if at all). A convention leaves the drawing language: a dimension arrow flies, a hatch becomes rain, a centre line becomes a road, a weld symbol sparks. *Fits content like:* an invention finally working; a city plan becoming a street; a sketch becoming a product.
- **Cyanotype and water.** Drops bloom and soften lines. *Fits content like:* a flood-defence design; a loss remembered; a harbour wall.
- **The title block as story.** Status field = the verdict; revision rows = history. *Fits content like:* a rejected permit; REV. 1–5 of a city; an approval after years.

## 9. Pitfalls of the medium

- **Main figure near the sheet edge** → wides show the desk. Keep margins or enlarge the sheet.
- **Upward explosions hit the header** → explode sideways and flatten long parts during the explode.
- **Narrated notes placed on the sheet** scale with the zoom, slide out of frame and can't cover lines → keep the note box on a screen-space layer above the camera.
- **An object darkened by its own shadow** → cut the object's own area out of the shadow layer.
- **Per-lobe shading on a blobby shape reads as grapes** → one gradient across the whole union; fill the union as one path, or overlapping fills make bubbles.
- **A small payoff undersells the return** → the payoff object about a third of frame height, centred, drawn stroke by stroke, with the note box off it.
- **Line weights not scaled with zoom** → sausages in close-ups, vanishing wides.
- **Paper texture that swims** → the texture belongs to the sheet and moves with the camera; only the ink breakup may shimmer, and only slightly.

## 10. Building it here

- **One SVG is the sheet; one wrapper `transform` is the camera** (centre, zoom, a little roll). No 3D library: depth is oblique projection worked out in plain arithmetic (`x + k·z`, `y − k·z`), with `k` animated from 0 to 0.5.
- **Paper**: `feTurbulence` with a fixed `seed` pushed through `feColorMatrix` between the two blues, plus drawn creases and bleached edges, all in sheet coordinates so it zooms with the drawing. The table is a dark `div` with a shadow under the sheet.
- **Lines and draw-on**: keep every shape as a list of points, so arc length, the nib's position and truncation are simple sums; or use `stroke-dasharray` with `stroke-dashoffset` from `prog`. Stroke width in sheet units is `w · zoom^-0.35`, which gives the `zoom^0.65` rule on screen. The nib is a small blurred white circle at the head.
- **Occlusion**: fill each solid with the paper (the same texture through a `mask`, or the mid blue) before stroking it. Hatching is an SVG `<pattern>` clipped to the section.
- **Effects**: shadows are a layer above the ink with `mix-blend-mode: multiply`; a water stain is a `radial-gradient` in multiply with a pale ring, plus a blurred copy of the lines masked to the stain; the stamp is a text-and-frame group with a `feTurbulence` alpha mask for uneven ink, landing in 2–3 frames.
- **Motion**: camera and parts on `prog` with `ease.inOut` and `ease.out`; stepping gears use `Math.floor` on the pulse with a short ease-out; `ease.back` or `SPRING.bouncy` only for the joyful overshoot of a needle. Otherwise this style overrides the engine's springs.
- **Leave out** `Finish` (the paper already has grain; a light vignette on the table is enough), `Backdrop`, and the light sweep: `<SceneTrack sweeps={false} />`. Lettering is a clip-wipe behind the nib, not `MaskRise`. A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **The pulse lives in `timeline.ts`**; `Soundtrack.tsx` puts each pen scratch at the start of its stroke group and each click, tick and the stamp on its landing frame.

## 11. In a product video

- **Blue and white are the look; the brand's colour is the stamp ink**, used once, for the verdict or for the logo stamped onto the sheet. If the brand's colour is a blue, the sheet may lean toward it and the stamp stays red or black.
- **The product is drawn first, then made real.** Its screens are drafted as line drawings (Fig. 1, Fig. 2), with balloons naming real features and dimension lines carrying real numbers. Then, once, the drawing becomes "the one real thing": the real screenshot or a screen recording in a `Device`, with soft volume, a glow and a shadow across the lines, leaving a pale imprint where the drawing was.
- **Numbers on the sheet that say something about the product are real** and listed in `facts.md` (version in the revision rows, dates, counts as dimensions). Dimensions that are only drawing texture carry `<ExampleBadge />` on the sheet.
- **End card**: pull back to the whole sheet. The logo sits in the title block, the status field holds one line on how to get the product, and the GENERAL NOTES column holds everything the voice said.
- **Arabic**: mirror the sheet (notes column and title block change sides, figures run right to left, "شكل ١" for "FIG. 1"). Lettering is revealed **word by word** behind the nib, right to left, never letter by letter and with no letter-spacing; use a handwritten Arabic face (a ruq'ah or informal naskh hand). Wrap dimensions and ranges with `isolateNumbers`.
- **9:16**: turn the sheet to portrait and stack the figures, so the pan across figures becomes a vertical one. Note boxes go in empty sky inside the safe area: out of the top 12%, the bottom 22% and the right 12%. In the end card, lift the title block above the bottom 22%.

## 12. Variation space

You decide what is designed, its figures, the flaw or turn (if any), the voice, the one real thing (or none), the camera path, the opening, the ending and the length.

- Structures: **a city through revisions** (one site plan, REV. 1 to REV. 6, each revision a decade, the title block filling with dates); **two sheets, one table** (two designs drawn in parallel that turn out to fit together); **a teardown in reverse** (the sheet starts full and parts are erased one by one until only the centre line of the idea remains).
- Openings: **a single centre line** crossing an empty sheet on the first pulse; **the stamp first** (REJECTED lands, then we see what was rejected); **tracing paper** lifted off a finished drawing to reveal a blank sheet underneath.
- Endings: **the sheet folds up** along its creases into a pocket-sized square; **a coffee ring** lands on the title block and the tide line becomes the last circle of the design; **the lights go off** and the white lines glow faintly on the dark sheet.

---

Adapted for Halal Motion Videos from the `blueprint` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
