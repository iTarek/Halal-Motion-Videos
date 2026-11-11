# Chinese Ink Wash

> Xieyi ink painting on rice paper, animated: blank paper is space, one brushstroke is a mountain, a wave, a gesture or a cut.
> References (grammar only): Shanghai Animation Film Studio's *Feelings of Mountains and Water* (1988) (blank-paper space, ink bloom, unhurried pacing, figures in a few strokes); a master calligrapher at work (weightlessness, the long stillness before one fast stroke). Copy none of their characters or compositions.

## 1. Essence, and what it is not

An ink painting (水墨) painted and unrolled before you: black ink on warm rice paper in five tones, plus **one** red, the vermilion seal. No Western outlines: forms are made by **loaded brushstrokes** whose dark edge *is* the contour (没骨, "boneless" painting), by **wet washes** that bleed into the paper, and by **dry, fast strokes** where the paper shows through the bristle tracks (飞白, "flying white").

Most of the frame is **empty paper** (留白): water, sky, mist, silence. Things are *painted into existence*, not cut to.

Not watercolour (no colour washes), not vector art with a brush texture (no flat fills or closed outlines), not a calligraphy title sequence.

## 2. Materials & rendering

- **Paper** is generated, never a photo: warm rice paper (around `#F2ECDE`), cloud mottling, long fibres, pulp flecks, grain that fades when zoomed out (or it shimmers), a light vignette; anchored to the world, so it pans with the painting.
- **Ink** is stroke opacity multiplied onto paper (never an overlay), in five tones (墨分五色):

| Tone | Opacity | Use |
|---|---|---|
| 焦 jiao (burnt) | ~.96 | calligraphy, the sharpest lines, moss dots |
| 浓 nong (thick) | ~.82 | contours, dark edge of loaded strokes |
| 重 zhong (heavy) | ~.60 | secondary lines, folds |
| 淡 dan (light) | ~.34 | mountain bodies, robe and body washes |
| 清 qing (clear) | ~.16 | far mountains, faces, mist |

- **Brushstroke model**: centreline × pressure profile × width noise, plus 4–60 **bristles** whose ink load drops along the stroke and breaks on long-scale noise. Dryness runs from a solid wet stroke to flying white (dry strokes are bristle tracks only).
- **Loaded stroke**: bristles darker on one side, so the stroke carries its own contour: this makes bodies, rocks and waves read as ink, not vectors.
- **Two layers**: the wet one bleeds (noisy blur, **pigment gathering at the edge**, granulation); the dry one only gets fibre jitter and paper tooth.
- **Masses**: soft polygons, jittered edges, a gradient; never flat fills.
- **Landscape**: mountains dissolve downward into mist bands, with 披麻皴 (hemp-fibre) texture and 苔点 moss dots on near ranges only; rocks are outline → axe-cut texture → shadow wash → dots.
- **Water is blank paper**, moved by faint dry streaks and open ink rings. Solid water: the **parallel wave lines** of classical scroll painting (dense near the edge) or a pale body with a few huge loaded strokes along its face.
- **Figures are xieyi**: one pale body mass plus two loaded strokes, burnt-ink lines for limbs; features, if ever shown, in 3–5 strokes.
- **Calligraphy**: a brush typeface is only a **skeleton**: trace centrelines in stroke order, pressure from glyph thickness, hidden-tip entry (藏锋), tapered exits.

## 3. Colour logic

- Ink only, from cool grey at low density to warm black at full density. No other hue in the world.
- **One vermilion** (around `#B02E22`), for the seal and at most one tiny accent in the story (an object the protagonist carries). The accent finds the protagonist in wide shots and can rhyme with the seal. Never a red wash, never red type.
- Values carry depth: far = pale and soft, near = dark and textured. If a frame gets busy, remove ink rather than add tone.

## 4. Type & on-screen text

- Narrated lines are **inscriptions (题跋)**: a classical italic serif (the kind Cormorant Garamond italic is), ink-coloured, no box, at most two lines, placed in each shot's empty paper. A small vermilion square marks the start of each line. Each phrase appears wet and dries in a fraction of a second, as it is spoken.
- Titles are written on the painting itself, in its empty space (vertical columns for Chinese or Japanese, lines for other scripts), with a vermilion seal drawn by code (lines knocked out of a slightly irregular red square, with ink-paste speckles). They move with the world.
- The style needs its own faces for inscriptions and titles; a brand's sans stays in the logo and the end card's small line.
- Text that is not part of the painting (a label, a legal line) sits still on the frame and does not pan with the scroll.

## 5. Motion quality

- **Figures step**: hold each drawing 2–3 frames (about 12 a second); their position, the camera, blooms, ripples and splatter move on every frame.
- **Stable strokes between drawings**: seed every stroke by its index and place bristle breaks along the stroke's *relative* length, so flying-white gaps don't crawl from drawing to drawing. Allow only a small "boil" on the width noise.
- **Painted into existence**: strokes appear in drawing order.
- **Stillness before action** (when a decisive stroke is the event): hold, with at most a slow push-in, then let the stroke cross the frame in a few frames. Consequences start only after the stroke has finished.
- Nothing is tweened like a vector shape: things are painted, bloom or dissolve into mist.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | Expresses | Can serve |
|---|---|---|
| Locked frame on the paper | The page is the stage; things are painted in | a thing forming; a line being read; a still decision |
| Right-to-left pan (handscroll) | Time and distance as one painting | a journey; a history; a process |
| Vertical tilt (hanging scroll) | Height, stages stacked | seasons; a climb; generations |
| Lateral tracking, lead room, slow far parallax | Motion through a world | travel; a race; a commute |
| High wide, a tiny figure in blank paper | Smallness, solitude | loneliness; nature's scale; one life among many |
| Low angle, dark mass towering, slow push-in with shake | Weight, pressure | an obstacle; a storm; a deadline |
| Hard cut to an extreme close-up | A break in the flow (the style's only hard cuts) | a decision; a surprise; a memory |
| Push into an ink bloom or mist | Passing between states | memory; a daydream; a season turning |
| Pull back until a mark joins the whole | The part was inside something larger | a summing-up; irony of scale |
| Return to an earlier framing | The rhyme shows what changed | aftermath; growth; before/after |

Framing: 60–80% empty paper; dark foreground may pass along the frame bottom. 16:9 is the handscroll and 9:16 the hanging scroll: the same painting is composed wide or tall, never cropped. Transitions are ink blooms, pans along the scroll or mist; never a generic dissolve or a wipe.

## 7. Sound palette

- **Foley follows the material**: ink drop (a short "tink" and a soft wet thud), brush air (band-passed noise with bristle grains, never a metal whoosh), steps on water (a small splash), splatter (wet ticks), seal (a wooden thump and paper crackle).
- **Every painted stroke has its brush air**, as long as the stroke and as loud as it is wide. Washes, mist, drifting paper and camera pans are silent.
- **Three weights**: a drop for a dot or a small mark; a brush pass for a stroke; one low, soft thud with a long tail for a mass arriving (a mountain, a wave, a dark foreground).
- **Sparse sounds suit emptiness, a steady pulse of steps suits movement, a low rumble suits mass.** Cue each sound to the picture; never loop.
- **Ambience** only where the painting has a place: wind over water, reeds, paper hush. Very quiet, never tonal.
- **Silence is literal**: everything goes to zero, tails included, with short fades. At most one sound inside it (a drip, one water ring). Place it where the story holds its breath, before the decisive stroke.
- **Sound across a change**: the brush air of the next stroke begins while the ink bloom is still opening; the seal's paper crackle runs on into the hold after it.
- **Voice**: calm, few lines, like colophons that don't explain the picture.

## 8. Native moves

A menu: use the ones your story needs.

- **One stroke is everything.** *Fits content like:* a product born from one line; a city growing from a single street; a day beginning with one bird.
- **Emptiness is matter.** Removing ink reveals paper white. *Fits content like:* a door opening in a wall; a crowd parting; an empty chair at a family table.
- **Brush = gesture = action.** Stroke order becomes movement. *Fits content like:* a skater's path that spells a word; a signature; a chef's knife work.
- **Flying white (飞白).** One fast dry stroke across the frame, strongest out of a silence. *Fits content like:* a sprint finish; a decision; a comet.
- **Ink bloom transition.** The next scene grows inside a spreading drop with a dark tide-line and a noisy edge. *Fits content like:* memories; seasons; one era giving way to the next.
- **The handscroll.** One long painting panned along its length, seen whole at last. *Fits content like:* a history; a supply chain from field to hand; a day in a street.
- **Splitting a mass.** Halves clipped either side of the cut; one rises and fades, one slumps; splatter stays. *Fits content like:* breaking a record; a barrier falling; an idea splitting in two.

## 9. Pitfalls of the medium

- Dry brush looks like dashed lines → breaks from long-scale noise and an ink load that drops along the stroke.
- Parallel semi-transparent strokes make bodies look like organ pipes → one base mass + two loaded strokes.
- Big side-brush strokes look like a hairbrush → a gradient mass + a few low-dryness strokes. Gradients built from vertical bands leave seams → draw the gradient as one smooth layer.
- A stroke body split between wet and dry layers loses density → full body in the dry layer plus a wet halo.
- Clipping calligraphy with the typeface's outline notches the junctions → typeface as skeleton only.
- Uniform hatching inside a wave turns it into a wire mesh → loaded strokes along the face.
- Paper grain that stays fixed to the screen while the painting pans reads as a dirty lens → the paper moves with the painting.

## 10. Building it here

- **A 2D `<canvas>` drawn from the frame number, under SVG filters**: each stroke is a centreline with a pressure profile, drawn as a filled shape plus its bristles (thin lines whose alpha falls along the stroke). No 3D renderer and no 3D library; every random-looking value comes from `noise(x, seed)` with the stroke's index as seed.
- **Painted into existence**: draw each stroke only up to `prog(frame, start, dur, ease.out)` of its length; strokes start in drawing order from a list in the scene.
- **Wet layer**: one SVG filter chain, `feTurbulence` (fixed `seed`) into `feDisplacementMap` for the ragged edge, `feGaussianBlur` for the bleed, and a darker rim made by subtracting an eroded copy of the wash from itself. The dry layer skips the blur. Both sit on the paper with `mix-blend-mode: multiply`.
- **Paper**: a full-frame `feTurbulence` stretched along one axis for fibres, plus a soft mottling layer, moved by the camera transform.
- **Ink bloom**: a `mask-image` radial gradient on the incoming scene, its edge roughened by the same displacement filter, its radius on `prog(…, ease.out)`.
- **Stepping and boil**: figures use `Math.floor(frame / 3)` as their drawing number; the boil is a width-noise seed that changes with that number.
- **Overrides the engine defaults**: no springs (nothing overshoots: `prog` with `ease.soft` or `ease.inOut`), no `MaskRise` (text blooms in), no `Backdrop`, no `Finish` (the paper is the grain and carries its own light vignette), no light sweep at cuts (`<SceneTrack sweeps={false} />`).
- **Leave out**: tracing a whole typeface into brush skeletons. Hand-author the centrelines of the one or two title words as paths, and set everything else as inscriptions.
- **Timing lives in `timeline.ts`**: each stroke's start and length are exported there, so `Soundtrack.tsx` gives it a brush sound of the same length on the same frame.

## 11. In a product video

- **This palette is the look**: ink and paper stay. The brand's colour is only the **vermilion's place**: the seal and at most one tiny object in the story. If the brand's colour is pale, deepen it until it holds on paper.
- **The seal is the logo.** A simple mark is knocked out of the seal square; a complex one sits beside the seal, small and still.
- **The real product arrives as a mounted leaf**: a screenshot in a thin ink border laid on the empty paper (flat `Phone`, or `Device` with `float={0}` and no `moves`), entered and left through an ink bloom. It is the only coloured thing while it is on screen, so give it one or two shots and no competing ink. The feature itself can then be repainted in ink: one stroke for the line it draws, one number as an inscription.
- **Real numbers and claims only**, each in `facts.md`, written as inscriptions; illustrative figures carry `<ExampleBadge />`.
- **End card**: mostly empty paper, the seal stamped with its wooden thump, the product's name written on the painting and one inscription line on where to get it.
- **Arabic**: the handscroll already runs right to left; inscriptions sit flush right with the vermilion square on the right. Arabic is **never traced stroke by stroke**: each word blooms in whole, wet then dry, with no letter-spacing. Use a pen-written face with real contrast (Ruqʿah, or a soft Naskh). Sacred text is set plain and still, with no bleed, split or brush effect.
- **9:16**: compose as a hanging scroll and tilt instead of panning; inscriptions and the seal stay out of the top 12%, the bottom 22% and the right 12%.

## 12. Variation space

You decide the structure, the characters (or none), the landscape, the opening, the ending, the camera path, the pacing and where the red goes.

- Structures: **one character, stroke by stroke** (no figure; each stroke of one large character opens into a vignette of the topic); **a hanging scroll** (a tilt from sky to ground through four stages, tone deepening); **two brushes in dialogue** (alternating strokes answer each other until they meet in one bloom).
- Openings: **in motion** (a figure already painted and moving; the world washes in around it); **ink first** (a fully inked frame; ink is lifted where light or a road appears); **the bristles** (a wet stroke fills the frame; only when it lifts do we see what it drew).
- Endings: **one small mark** (close on a footprint or a leaf while the ink around it dries; no pull-back); **evaporation** (the painting un-paints in reverse stroke order); **mid-gesture** (the brush stops before the last stroke lands).

---

Adapted for Halal Motion Videos from the `ink-wash` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
