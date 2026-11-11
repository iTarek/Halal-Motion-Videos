# One-line Drawing

> A single ink line that never leaves the paper. Everything on screen is that one line being drawn; scenes don't cut, they morph.
> References (grammar only): Osvaldo Cavandoli's *La Linea* (1971): one line is both the world and the character, and transformations of the line are the jokes and the transitions; Gjon Mili's 1949 photographs of Picasso drawing with light: the confidence and speed of a single gesture. Do not copy La Linea's character, its gibberish voice, or any specific continuous-line illustration.

## 1. Essence, and what it is not

- **One continuous line** on warm white paper. The pen never lifts: in code the whole film can literally be one list of points, from the first touch of the nib to the last frame.
- **Everything is a line**: characters, places, objects, even time. No fills, no shading, no second line weight, no background art.
- **We watch the line being drawn**: the camera follows the nib with a little lag and anticipation.
- Besides ink there is only the paper and a soft **shadow of the pen** (the real world above the paper). One accent colour at most, used once.

Not a whiteboard explainer (no hand, no marker, no erasing, no text-heavy boards), not ink wash (no tones, no brush bloom as a look), not a line-art animation with cuts and many strokes.

## 2. Materials & rendering

- **Paper**: warm white (around `#F4EFE4`), soft mottling in large patches, long fibres that fade out when zoomed out (or they shimmer), a sparse paper-tooth speckle over the ink at close zoom, light vignette. All textures are anchored to the paper; they move with the camera.
- **Ink** is a filled shape around the path, not a stroke of constant width, in one opaque tone.
  - Width = base width of the current "voice" of the line × pen pressure × fine noise (±8%); pressure comes from speed: fast is thin, slow is fat (about 0.66 at full speed, rising towards 1.5 as the pen slows to a stop).
  - The line's character can change along the path (base width, opacity, tremble, dryness); blend over a short stretch at boundaries.
  - Ink bleed: the same shape slightly wider and blurred, laid under the line at about 20%.
  - Pooling: extra round dots where speed drops low.
  - Tremble (noise across the line) and dry-brush gaps (slow noise plus thin bristle strands) for age, fear or fatigue.
  - A stop leaves a teardrop-shaped blot: tip at the nib, belly sagging downward as it spreads, a dark tide line at the rim.
  - **A minimum width on screen**: widths scale with zoom like a line under a macro lens, but clamp the zoom used for width during pull-backs so a wide view keeps its weight.
- **The pen is never drawn**: a soft blurred wedge of shadow from the nib and a tiny contact dot. Hands, if any, appear only as shadows, each hand as one flat layer.
- **Path design**: chapters written as SVG path strings, sampled by distance along the path, joined by connectors that keep the direction smooth; time assigned per point, weighted by curvature.

## 3. Colour logic

- **Ink on paper.** A warm black (around `#1D1A17`) on warm white; nothing else fills the frame.
- **One accent at most, used once**, on a stretch of the line that means something; it returns to ink afterwards and stays visible in the final picture if the picture is revealed.
- Examples of an accent's job: red for warmth or danger; blue for water or cold; gold for a prize. Never a second accent.

## 4. Type & on-screen text

- **Text is written, like the line**: a handwriting face (the kind of Caveat) for narrated lines, ink at about 84%, no box, centred low in the frame, **written on** in its reading direction (about 6 frames plus half a frame per character) behind a soft paper-coloured halo so passing lines never cross the letters; it fades out in about 13 frames. Each line starts with the voice and stays until it has been read.
- **Titles** in a monoline connected script (the kind of Sacramento: itself a one-line drawing), written on in empty paper away from the drawing, gone before the camera moves into them.
- **These two faces are the look**: a brand's own typeface would be the only printed thing on a hand-drawn page. Keep it for the logo.

## 5. Motion quality

- **Every frame is new**: the appeal is the continuous act of drawing; stepping breaks it.
- **Timing = chapter windows + curvature**: within a window, time per point is weighted by how sharply the line turns (sharp turns get more time, smoothed so speed never jumps). Pin key moments with marks: by fraction of the path's length or by position ("the second time the pen passes here"). A stop is two marks at the same place.
- **Corners are the pulse**: the frames where the pen slows into a sharp turn are where ticks, taps and spoken key words can land.
- Speeds: travelling lines cross a quarter to a third of the frame's width in a second; small details move at a fifth of that. The most important stroke is usually the slowest.
- **Retracing** over an existing line is legal and invisible (it only thickens slightly).

## 6. Camera grammar

A vocabulary, not a route. The camera is one continuous move: composition centre, zoom, a few degrees of roll, and a follow weight (0 = composed, 1 = locked to the nib). The follow point averages the nib from about 16 frames behind to 12 frames ahead (lag and anticipation), with a soft clamp keeping the nib inside the central 70% of the frame. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Follow the nib (high follow weight) | travel; momentum; a thread of time | a journey; a process; a timeline |
| Composed frame, low follow weight | a scene that must read as a whole | a vignette; a joke; a diagram |
| Macro on the nib | intimacy; the act of making | a first touch; a signature; a detail |
| Hold with a slow push-in | weight; a stop | a loss; a doubt; a decision |
| Mirrored framing | rhyme across time | parent and child; before/after |
| Continuous pull-back | everything was one picture | a reveal; a map; a word |
| Scroll along the line as it runs ahead | a horizon; a graph; a race | a sales chart; a heartbeat; a road |
| Roll with the line | vertigo; play | a loop-the-loop; a fall; a spin |

No cuts. Transitions are morphs: the last stroke of one image is the first stroke of the next.

## 7. Sound palette

- **The pen on paper is the sound of the film**, shaped by the pen's speed: band-passed noise that is brighter when fast and duller when slow, paper-fibre ticks that crowd together as the pen speeds up, placed left or right with the nib; broken up by dry gaps; lighter and jerkier for a young hand.
- **Small events**: a wooden tap on the first touch, a faint wet swell for a blot, a tiny rub for a handoff, a page lift.
- **Everything else is silent**: the camera, the paper, the morphs. A very quiet room is the only bed, and it has no pitch.
- **One tonal accent at most**: a single soft struck note on the most important touch, or a short glide while the accent colour is being drawn. Never two notes in a row.
- **Silence is literal**: when the nib stops, the pen's sound ends within a frame and the room drops out too, for 1.5–3 s. The first scratch after it is the loudest thing in the film.
- **No cuts to bridge**: the pen's sound runs unbroken through every morph, and that is what joins the scenes. A spoken line may start a few frames before the line reaches the thing it names.
- **Voice**: warm, few short lines that leave space for the line; key words land on marks.

## 8. Native moves

A menu: use the ones your story needs.

- **The pen never lifts.** Anything that is one continuous thing. *Fits content like:* a river from source to sea; a relay race; a production line.
- **The line is time.** The stroke's character changes with age, mood or strain. *Fits content like:* a building aging; a runner tiring; a machine wearing out.
- **Transformation.** One image morphs into the next. *Fits content like:* a seed becoming a tree becoming a table; a sketch becoming a product; a word becoming its object.
- **Stopping is an event.** The nib stops, ink pools, every sound cuts to silence (1.5–3 s). *Fits content like:* a power cut; a held breath before good news; a hesitation before a signature.
- **Reverse-designed scale reveal.** Every vignette is secretly part of one big picture seen at the end. *Fits content like:* a city's landmarks forming its skyline; a company's milestones forming its emblem; a recipe's steps forming the dish.
- **Handoff.** The pen passes to another hand (as a shadow) and a new line begins. *Fits content like:* a teacher and a student; a founder and a successor; one generation to the next.
- **Line as graph.** The line becomes a chart while staying a drawing. *Fits content like:* a heartbeat; a temperature record; a football match's momentum.

## 9. Pitfalls of the medium

- **Stray connectors ruin a reveal**: every extra line reads as a wrinkle, beard or mask. Fix the route (where each chapter enters and leaves), not the drawing. Plan it like a walk that uses every street once: a closed motif is a loop (you leave where you came in); retrace or reorder chapters.
- Each region of a final picture is drawn exactly once; connectors must fall on natural lines of that picture.
- **Test the reveal early and often**: render a still of the whole path at final scale after every change.
- Lines drawn too close braid together once width is applied; keep a gap.
- A round blot reads as a mole → a sagging teardrop.
- Thin lines at wide zoom → clamp the zoom used for width.
- Translucent hand shadows double-darken where they overlap → one layer per hand.
- Titles collide with the drawing as the camera moves → check every frame of the title's window.
- Speech to text mishears very short lines → rephrase the line rather than fight it.

## 10. Building it here

- **The whole film is one list of points**, built once in a `useMemo`: each chapter's SVG path string sampled by distance (an unattached SVG `<path>` element's `getPointAtLength`, or your own curve maths), connectors added, a frame number assigned to every point. Each frame shows the points whose frame number has passed.
- **The line is one SVG `<path>`**: build the outline of the ribbon (left edge out, right edge back) from the points drawn so far and set it as `d` with a fill. A second copy under it with `feGaussianBlur` at 20% opacity is the bleed; blots and pools are extra `<circle>` and `<path>` shapes. A `<canvas>` redrawn from the frame number works too if the path is very long.
- **Wobble and dryness without `Math.random`**: `noise(i, seed)` per point for width and tremble; dry gaps are a mask of thin strands over the ink.
- **Paper**: a large `div` inside the camera wrapper with an SVG `feTurbulence` texture (fixed `seed`) blended with `mix-blend-mode: soft-light`; the fibre layer's opacity falls as the camera zooms out.
- **Camera**: one wrapper `div` with `transform` (translate, scale, rotate) from composition keys blended with the averaged nib position; ease the keys with `ease.inOut`. The pen's shadow is a blurred wedge `div` at the nib, outside the paper's texture.
- **Overrides**: no springs, no `MaskRise`, no `Backdrop`, no `Finish` (the paper is the texture; add only a light vignette), one scene with no `SceneTrack` cuts or sweeps. Written text is revealed with a moving `mask-image` gradient. It is one take: no `SceneFrame` entry or exit, and if the take is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.
- **Chapter windows and marks live in `timeline.ts`**. The pen track is one long designed sound: a function in `sfx_custom.py` shaped by a list of the pen's speeds copied from the timing, with the left-right placement built in; `Soundtrack.tsx` starts it on frame 0 and lands the tap, the blot and the struck note on their marks.

## 11. In a product video

- **The brand's colour is the one accent**, used once: on the stretch of line that draws the product, or the stretch that arrives at the logo. Ink and paper stay; a second brand colour stays out.
- **The line draws the device, the real screen fills it.** The outline of the phone or laptop is part of the path; when it closes, the real screenshot fades in inside it, flat, multiplied lightly onto the paper. That screen is the only filled thing in the film, so show it once, at the hero moment.
- **The line can be the product's own data**: a real series drawn as a horizon. Every value comes from `facts.md`; an invented curve carries `<ExampleBadge />`.
- **Never redraw the logo by hand.** The line ends by underlining the real logo, placed as an image, or by writing the product's name in script; one written line says where to get it.
- **Arabic**: the line travels right to left, and so does every write-on. Set words in a real handwriting face (the kind of Aref Ruqaa for titles, a casual Arabic hand for lines) and wipe each word on whole with a soft mask; never trace Arabic letters with the line itself, and add no letter-spacing.
- **9:16**: let the line travel down the page instead of across it, and compose the final picture upright. Keep the nib's clamp inside the safe middle: clear of the top 12%, the bottom 22% and the right 12%; written lines sit just above the bottom 22%.

## 12. Variation space

You decide what the line draws, whether it reveals one final picture, where it stops, the accent (or none), the opening and the ending.

- Structures: **a line that is a graph** (a data series drawn as a horizon; each peak and trough becomes a scene); **two lines** that start in opposite corners and are drawn in alternation until they meet; **a loop** (the line draws a scene and then retraces its way back to the start, which now means something else).
- Openings: **mid-line at speed**, the pen already running across the paper; **a finished drawing** whose line then unravels into the story; **a word written in script** whose last stroke becomes the first scene.
- Endings: **the line runs off the edge** of the paper and keeps going; **the ink runs out** and the last stroke fades into dry scratches; **the pen stops in mid-air** over the paper before the last stroke.

---

Adapted for Halal Motion Videos from the `one-line` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
