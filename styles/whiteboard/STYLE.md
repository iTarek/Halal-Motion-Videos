# Whiteboard Explainer

> An explainer drawn live on one glossy dry-erase board: single-line handwriting that is actually *written* stroke by stroke, floating markers with no hand, magnets that can move, an eraser that can rewind, and a camera that travels across the board instead of cutting.
> References (grammar only): RSA Animate / Cognitive Media (one continuous board, the camera travels instead of cutting, a full-board view); minutephysics (one sentence = one drawing, the simplest geometry that carries the idea); phasing as a structure (two copies of one figure drawn at two speeds, drifting apart and meeting again). Never copy their drawings, characters or hands.

Suits explainers, usually science or "how does X work"; the length follows how many ideas the board has to hold.

## 1. Essence, and what it is not

- **One physical whiteboard.** Everything the viewer learns is drawn in dry-erase marker in front of them, in real handwriting order.
- **The board is a map**: each idea lives in its own region; the camera travels between regions, often led by the pen. Distance on the board = distance in the argument.
- **Real marker, not animated text**: ink pools where the nib lands, dry streaks and speckle, strokes overshoot and don't quite close, faint traces of old lessons remain, a glossy sheen drifts slower than the board, and **every stroke makes a sound**.
- **No hands.** Markers float with a real cast shadow that grows when they lift, park outside the frame between phrases and fly back in. Magnets and the eraser move on their own. Never draw a hand, an arm or a cursor.

Not Blueprint (no blue sheet, no drafting conventions), not Crayon Picture Book (no wax texture, no children's story), not a kinetic-type explainer (text is handwritten stroke by stroke, never animated as blocks).

## 2. Materials & rendering

- **Board**: a warm white gradient, a faint scuff and micro-scratch texture, a few dozen **leftover marks** (old words, circles, arrows) at 5–10% in grey or pale blue, and a soft diagonal **window sheen** (white, 10–16%) moving at about 0.35× the camera: this one detail sells "glossy".
- **Ink**: about 0.94 opacity, **multiplied** so overlaps darken like real marker. Width 0.55–1% of the frame's short side for drawing at normal zoom, about 13% of the cap height for lettering.
- **Stroke character**: a slow hand wobble across the line (small, long wavelength) plus a finer tremor; a chisel tip whose width changes with direction; a pressure ramp at the start and a small taper at the end; circles start at an angle and **overlap past closure**; rectangles are four strokes with small corner overshoot; a darker pooled dot *inside* the start of long strokes.
- **Dry-marker texture**: speckle and streaks knocked out of the ink, fixed to the board, faded out when the camera is wide.
- **Lettering**: a single-line (single-stroke) hand written in stroke order, each glyph with small rotation, baseline and scale jitter. Missing symbols (μ ≈ → × − ✓ ² ° ±) are drawn by hand.
- **Props**: dry-erase markers (white barrel, colour band and cap in the ink colour, felt nib), a felt eraser, magnets (glossy, with a highlight and a soft cast shadow). Frame, tray and wall appear only if the camera ever goes past the board edge.

## 3. Colour logic

- **Three marker colours at most**, each with a meaning held for the whole film: one dark ink for things and structure, one for signals / measurement / process, one accent for the thing that matters (one accent per region).
- **Monochrome variant**: everything in the dark ink, one element in the accent (the "only colour").
- Leftover marks and board stay neutral; the accent never appears on props except its own marker cap and the hero magnet.
- Example sets: black `#23262c` / blue `#2a5cb3` / orange `#d97757`; black / green `#2e8b57` / red `#c8363a`; navy `#1f2a44` / teal `#1f8a8a` / purple `#7a4fb3`.

## 4. Type & on-screen text

- **Handwriting only**: a single-line hand (the EMS Tech kind) for all board text; titles large (cap height 11–18% of the short side at normal zoom), labels 3–6.5%. The hand is the look: a brand's typeface appears only inside its logo.
- **Title and end card are written on the board** in the same hand.
- **Narrated lines**: an off-white rounded label (about 90% opaque) in a handwriting-like face (the Architects Daughter kind, about 4% of the short side), dark text, a short marker dash in the accent colour. Split at clauses, one short line at a time. A band is kept free for it in every shot: the bottom 12% in 16:9, the strip just above the bottom 22% in 9:16.
- **Writing finishes on the word**: a term appears exactly when the narrator says it.
- A label is fully in or fully out of every shot it appears in.

## 5. Motion quality

- **Hand speed**: every stroke follows a slow-fast-slow curve. Strokes are given a **time window** and their speed is solved from it, so writing always finishes on time.
- **Pen hops** between strokes lift in proportion to distance (the shadow slides and blurs); long gaps send the pen off-frame to park, and back shortly before its next stroke.
- **Magnet**: drops with a shrinking shadow; slides with a small lift; can lift off and sink.
- **Eraser**: constant speed along a path, a wide band at about 90% strength (a faint trace always remains).
- **Speed**: faster than real hands (a sped-up lesson) but never so fast the stroke order is lost: a label 0.3–0.8 s, a title about 3 s.
- The camera moves on every frame, with real motion blur when it moves fast.

## 6. Camera grammar

A 2D camera over a board four or so frames wide and tall: position, a zoom eased so pushes feel like dollies, a little roll. A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Pull back from a tiny drawing | scale | a surprising size; context |
| Ride the line the pen is drawing | one idea leads to the next | a transition; a process; a path |
| Hold still | read now | an equation; a definition; a list |
| Whip to a new region | a new idea after a pause | a twist; a "but" |
| Return to an earlier region | a callback, for free | reusing a result; a comparison |
| Split view of two regions (zoomed out enough for both) | two things at once | a pair; before/after |
| Slow push into one symbol | this term is the point | a unit; a variable; a name |
| Track along a long diagram | sequence, time | a timeline; a pipeline; a journey |
| Pull back past the board edge to the wall | the whole lesson as one picture | a summary; a scale jump |

When the camera crosses more than about 1.3% of the short side per frame, blur it along its path. No cuts on the board; if a cut is needed, it is a whip.

## 7. Sound palette

- **Every stroke sounds**: band-passed felt-on-gloss noise (a hiss at about 2–7.5 kHz over a body at 0.5–1.5 kHz) shaped by the stroke's own speed curve, a tiny nib tick at the start, stick-slip grains, and on some long strokes the **dry-erase squeak** (a short wavering tone at 1.5–2.6 kHz). Each colour sounds slightly different, so two pens can be told apart. Left or right follows where the stroke is on screen; a closer camera is louder.
- **Props**: magnet on steel = a click with a metallic ring and a low board thump; eraser = a felt rub that follows its zig-zag; cap off and on; a marker bouncing in the tray.
- **Three weights**: the nib tick, the cap click, the magnet's clack; the magnet is the heaviest sound on the board.
- **Room**: low room tone; a single ticker in the room (a wall clock, a fridge hum, a projector fan) can own a silence.
- **Silence**: a full stop, strokes and room both, for half a second before the surprise; the first sound after it is the stroke that draws the answer.
- **Sound across a move**: the next region's first stroke is heard a few frames before the whip lands; for a rewind, the eraser's rub plays reversed and squeezed.
- **Tonal accents**, one at a time: a short rising glide for growth, a ping for a signal. Never a tune.
- **Voice**: a clear, friendly teacher at a brisk pace; strokes drop to about half under speech.

## 8. Native moves

A menu: use the ones your story needs.

- **Writing in stroke order.** The reveal is the explanation: a formula term by term as it is spoken. *Fits content like:* the area of a circle; the Drake equation; a recipe's ratios.
- **The pen leads the camera.** Transitions are drawn lines the camera rides. *Fits content like:* a nerve signal; a supply chain; the water cycle.
- **Magnets.** The only things allowed to move on a board: give the hero to a magnet; slide, lift, drop, sink it. *Fits content like:* a delivery truck on a route; a cell in a bloodstream; a player on a pitch.
- **The eraser rewinds.** Wiping a trail backwards reads as undoing time. *Fits content like:* an undo in software; reversing a chemical reaction; "what if we hadn't…".
- **Two pens at once.** A live side-by-side of two quantities, drifting apart or meeting. *Fits content like:* two delivery routes; two runners; a population vs its food supply.
- **Traces of the old lesson.** A faint previous drawing becomes relevant. *Fits content like:* a theory replaced; last year's forecast; a first draft.
- **The full-board view.** Every region seen at once as one picture. *Fits content like:* a system diagram; a history; a map of a field.

## 9. Pitfalls of the medium

- **One pen, too many jobs** drifts later and later → give each drawing a deadline window and let overlapping jobs go to another pen.
- **A minimum stroke time × many dashes** makes a dashed line take seconds → dashes need their own, shorter floor.
- **A pooled-ink dot bigger than the stroke start** leaves halos on every letter → keep it inside.
- **Punctuation vanishes** (a period is a stroke with no length) → draw very short strokes as dots.
- **Labels half-cut by a push-in** look sloppy.
- **A fast whip with no blur** strobes the text.
- **Eraser paths** crossing labels you want to keep.
- **A term written early or late** breaks the lesson → take each deadline from the voice-over's word timings, never from a guess.
- **Text that fades or pops in as a block** reads as software → everything is written.

## 10. Building it here

- **Ink is SVG on a big board `div`**: a small hand function turns each shape into `<path>`s (wobble from `noise(x, seed)`, overshoot, overlap past closure) with round caps, drawn by `stroke-dashoffset`, and the ink layer uses `mix-blend-mode: multiply`. For the chisel tip, build long strokes as filled ribbons; small lettering can keep one width.
- **Lettering**: best from a single-line SVG font read as centre-line paths, written glyph by glyph. Otherwise set the text in a handwriting face and uncover it with a `mask` that travels along the line, the pen riding its edge.
- **Windows, not durations**: each drawing has a start and an end frame; its strokes share the window by length, each on the slow-fast-slow curve. Take the end frame from the word timings (`wordAt`) so writing lands on the word.
- **Board and gloss**: a warm `linear-gradient`, a scuff texture from `feTurbulence` at a fixed `seed`, leftover marks as faint SVG, and the sheen as a diagonal gradient that moves at 0.35× the camera. The dry texture is an SVG `mask` on the ink; the eraser is a wide stroke in that same mask.
- **Props are DOM**: a marker follows the tip of its stroke with an offset, blurred shadow that grows as it lifts; magnets use a `radial-gradient` highlight and land with `springAt` and `SPRING.bouncy`.
- **Camera**: one `transform` on the board (`prog` with `ease.inOut`); a whip adds a one-axis SVG blur for its few frames. Nothing is 3D.
- **Overrides**: no `MaskRise`, `Headline` or `Kicker` (words are written), no `Finish` (a glossy board has no grain), no `Backdrop`, and `<SceneTrack sweeps={false} />`: the board never cuts. It is one take: no `SceneFrame` entry or exit, and if the take is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.
- **Windows live in `timeline.ts`**; `Soundtrack.tsx` gives each drawn stroke, and each written word, its marker sound on the same frames.

## 11. In a product video

- **The brand's colour is the accent marker** and the hero magnet; the dark ink and one process colour do the rest. Three markers is the limit.
- **The product is a magnet, and its screen is pinned up.** The app icon makes a natural hero magnet. A real screenshot is a printed sheet held by two small magnets: flat, clean, with a soft shadow, landing with a clack. The marker then circles and arrows the real parts of it.
- **Written figures are real**, each one listed in `facts.md`. A sketched chart with made-up values says "example" in the hand and carries `<ExampleBadge />`.
- **End card**: written on the board in the same hand: the name, one line on how to get it, an accent underline, and the logo as a magnet beside it.
- **Arabic**: the argument runs right to left: the first region is on the right and a timeline is ridden leftward. Each word is uncovered whole from the right behind the pen, its letters always joined, never built from separate letter shapes, with no letter-spacing. Formulas and numbers keep their left-to-right order (`isolateNumbers`). Use an informal Arabic marker hand.
- **9:16**: stack the regions and let the camera travel down the board. Keep drawings in the middle band, titles below the top 12%, the narrated label above the bottom 22%, and nothing key in the right 12%.

## 12. Variation space

You decide the topic's object, the board layout, the colours within the logic, the voice, the camera route, the opening, the ending and the length.

- Structures: **a proof** (one claim at the top, the board fills downward step by step, each step boxed when proven); **a debate** (two pens, two halves of the board, each drawing its side until the drawings meet in the middle); **a timeline** (one long horizontal line ridden from its start, with events hanging off it).
- Openings: **a question mark** drawn huge in the centre, then shrunk to become a dot in the first diagram; **an erased board** where the faint trace of a wrong answer is still visible; **a magnet dropping** onto an empty board with a clack.
- Endings: **the answer circled** twice and the pen capped; **the board wiped** except for one line that survives; **a push into the smallest symbol** on the board, which becomes the title.

---

Adapted for Halal Motion Videos from the `whiteboard` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
