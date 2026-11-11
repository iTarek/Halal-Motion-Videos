# Data Storytelling

> A chart that tells a story: real data, drawn mark by mark on cream paper by a red–blue pencil, with handwritten notes pinned to the numbers. The chart itself is the camera, the rhythm and the plot.
> References (grammar only): Hans Rosling's *200 Countries, 200 Years, 4 Minutes* (one dot is a character), Ed Hawkins' warming stripes (a diverging ramp on a reference mean, no axes), The Pudding / NYT scrollytelling (one idea at a time, growing axes, pinned notes). Copy none of their charts, layouts or typefaces; never name them in the film.

## 1. Essence, and what it is not

**The chart is the film.** Every mark is a real number and every movement is a meaningful chart operation (a mark lands, an axis grows, the scale changes, a series morphs, a note is pinned). The data is real, traceable and free to use. You change the framing, never the numbers.

**Pick the chart the data asks for:**

| The data is about | Chart |
|---|---|
| comparing categories, rankings | bars, a ranked bar race |
| a relationship between two measures | scatter or bubble chart (one dot can be a character) |
| place | map, choropleth, dots on a map |
| parts of a whole, counts of people | unit / waffle chart, proportional squares |
| before → after | slope or dumbbell chart |
| a distribution | histogram, beeswarm |
| where things go | flow / Sankey |
| change over time | line or dot series, stripes, area |

Three layers make it a story, not an infographic: **a human scale** (handwritten notes pinned to marks), **a performer** (a physical pencil that draws every mark), and **data you can hear** (each mark is a tap whose brightness follows its value; the trend is heard before it is read).

Not a dashboard (one idea at a time), not a keynote with charts (no slides), never decoration.

## 2. Materials & rendering

- **Paper**: warm cream, fibre grain that never changes and a faint dot grid, both fixed to the sheet. **Ink**: dark warm ink for axes and series, pale warm grey for grid and zero line, monospaced tick labels.
- **Marks**: data dots carry a thin ink ring so pale values stay visible on cream. A mark lands with a short pop and a thin ripple; suppress ripples when marks arrive closer than about 3 frames apart.
- **Handwriting** in pencil: slightly uneven, with graphite grain, written on as the tip travels along the line. Leaders are wobbly curves ending in an **un-closed** ring around the mark.
- **The red–blue pencil**: a hexagonal body, blue half and red half, a sharpened wood cone. Only the tip end shows, coming in from a lower corner; its shadow drifts farther and softer as it lifts; sharp tip, soft body.
- **Layout**: a plot box fixed on the sheet, a **memory zone** for early notes, every note pinned in **data space** (a value plus a small offset) so rescales keep the layout, a band low in the frame for the caption.

## 3. Colour logic

- Colour encodes **one thing: the value**. Diverging data uses a red-to-blue ramp (the ColorBrewer RdBu family) centred on the mean of a meaningful reference period, with a symmetric span; data with no natural centre uses one sequential ramp. Everything else is ink on cream.
- **Honesty beats drama**: pale values stay pale; never stretch a ramp to make a change look bigger.
- The two pencil leads have meanings: **blue for memories and human notes, red for records and warnings**. A change of lead marks a turn.
- One accent colour may bypass the ramp for a mark that is not data (a logo, a highlight).

## 4. Type & on-screen text

- **Narrated lines are the figure caption**: a text serif (the Newsreader kind), ink colour, aligned with the chart's reading side, at most 2 lines, with a hairline rule above it and a small mono kicker for the range drawn so far. Words appear as they are spoken, over a band of paper colour.
- **The title is the chart's own headline**, set on the sheet above the plot; it fades when the camera is close and returns with the full view.
- **No caption over a signature chart operation or a silence.**
- **Faces**: a brand's own serif or sans can take the caption and headline; the handwriting (the Caveat kind) and the monospaced ticks are the style's own and stay.

## 5. Motion quality

- **The rhythm of the data is the rhythm of the film.** Map the marks to a pulse; to accelerate, **divide the pulse instead of speeding it up**. Pick a unit whose finest subdivision is a whole number of frames (at 30 fps: 12 → 6 → 3, or 16 → 8 → 4 → 2), so picture and sound never drift.
- **Pencil acting**: lift before each tap, land with the shadow meeting the tip, a tiny rebound; hurry as data densifies, tremble like a seismograph needle at a peak. It can **flinch** (recoil and freeze), **hesitate** (hover before a mark) and **exit** (hand the story to the viewer).
- **Rescale** reads as ratchet clicks (stepped, each step eased); a calm rescale is smooth.
- **Morph**: a staggered sweep, each mark easing into its new form; notes fade as it passes and return as tiny marks.
- **No fades to blank or dissolves.** Transitions are chart operations: axis growth, pull-backs, rescales, morphs, a cell widening into the next frame.

## 6. Camera grammar

A 2D camera (position, zoom, roll) over **one sheet of paper**. A film is one take; a hard cut is rare and meaningful. The moves below are a vocabulary, not a route. Opening and ending come from the topic.

| Move | Expresses | Can serve |
|---|---|---|
| Extreme close-up on one mark, following its leader | One fact, one life | a single case; a named place |
| Full view first, then dive to one mark | The pattern before the case | a familiar trend; a myth to correct |
| Pull back as axes grow out of the marks | The frame arrives with the unit | naming the measure; widening a claim |
| Track the pencil, newest mark at about 60% along the reading direction | Progress: the past behind, the future ahead | a series in time; a race; a queue |
| Pedestal with rising data, a slight tilt creeping in | Escalation, unease | runaway growth; a backlog |
| Punch-in over 2 frames, decaying shake, jolt on rescale | Surprise, a broken frame | an outlier; a crash |
| Fast pull-out, roll, small constant tremor | A rush | a boom; a cascade; a stampede of orders |
| Locked-off | The transformation is the movement | a morph; a slow reading |
| Hold on one mark, then pull back | The part inside the whole | a verdict; context |
| Pull and pan to add more real data | Scale switch | a longer record; the rest of the list |
| Lateral pan across notes in the memory zone | Recollection | a biography; a timeline of events |

Framing: subjects fill at least a third of the frame height at key moments. When the real axis scrolls off-screen, pin its tick labels to a paper strip at the frame edge (a frozen pane).

## 7. Sound palette

- **Foley is graphite, paper and wood**: tick-and-paper taps, scratches for handwriting, a ruler hiss for axes, a paper puncture for a broken frame, a wooden click for the pencil flip, ratchet teeth for a rescale, a paper sweep for a morph.
- **The data is heard as taps, never as a tune**: one short wooden "plonk" per mark. Its brightness and hardness follow the value (low values dull wood, high values bright and glassy), its spacing follows the data's density. In dense passages each tap is quieter and shorter than the gap to the next.
- **Three weights**: a light tap for an ordinary mark, a firmer one for a noted mark, one heavy hit with a paper tear for the record that breaks the frame.
- **A bed of place**: the quiet room the notes evoke (paper hush, air, a far clock), low and never tonal; it may thin or thicken with the data.
- **Silence is a tool**: every layer drops to nothing where the data should be heard alone, before a key mark, a morph or a verdict; the first sound after it matters most.
- **Sound across a cut**: a note's ambience arrives a few frames before the camera reaches it and lingers after it leaves.
- **Voice**: calm, neutral narration that never talks over a rush, a silence or a morph.

## 8. Native moves

A menu: use the ones your story needs.

- **One mark = one fact.** *Fits content like:* the first store a chain opened; the first patient of a trial; the first satellite launched.
- **Axes grow with the story.** The value axis arrives when the narration first names the unit. *Fits content like:* revenue; a city's population; vaccination rates.
- **Pinned annotations.** Their content and colour carry the arc. *Fits content like:* an athlete's season; a family's migrations; releases on a usage curve.
- **Breaking the frame.** The chart must make room; the torn edge stays as a scar. *Fits content like:* a viral spike; a price bubble; a record-breaking flood.
- **Encoding morph.** Bars into a waffle, a map into a ranking, a line into a slope: the reveal of the whole. *Fits content like:* a budget as units of people; countries as a ranking; daily steps as a year strip.
- **Scale switch.** One value → the series → a longer real record, never extrapolated. *Fits content like:* one day's energy use → a year; one species count → a region.
- **The empty next cell.** A dashed slot for the value nobody knows yet. *Fits content like:* next year's harvest; the next launch; tomorrow's reading.

## 9. Pitfalls of the medium

- Take numbers from the source by column name, never by position; list every fact the narration claims.
- Notes collide with later data → pin them in data space and keep a memory zone.
- A frame break rescaled too fast is invisible → hold the pierced state at least half a pulse.
- Notes are written in their script's direction whatever their alignment → the pencil hops to the first word.
- A group that fades child by child leaves some marks behind → fade the wrapper.
- A long tail leaking into a hard silence ruins it → end every cue before the silent frames.
- In dense passages the pencil body lies across fresh marks → steepen its angle.
- Synthesised human sounds (a laugh) are uncanny → use a soft non-human sound.
- Wobble filters that change every frame make the chart swim → the paper and the drawn marks keep one fixed seed; only the pencil moves.

## 10. Building it here

- **One SVG sheet, one camera.** Marks are SVG circles and rects placed by scale functions; the camera is a wrapper `transform` (translate, scale, rotate) moved with `prog` and `ease.inOut`. Everything is 2D.
- **Pencil line**: paths drawn on with `stroke-dashoffset`, roughened by `feTurbulence` + `feDisplacementMap` and thinned by a grain mask, all with a **fixed** `seed`. Paper is a second fixed turbulence on the sheet plus a CSS `radial-gradient` dot grid.
- **Value ramps**: a list of ramp stops (the RdBu hexes, or paper to one hue) and Remotion's `interpolateColors` between them (`lerp` only mixes numbers); compute each mark's colour from its value and the reference mean, never by hand.
- **The pencil** is a small SVG group (two-tone body, wood cone, lead), positioned each frame from the mark schedule; its lift drives a blurred shadow `ellipse` that moves away and softens. Tremble comes from `noise(frame, seed)`.
- **Notes**: positions are recomputed from data space every frame, so a rescale carries them; handwriting is revealed with a `clip-path` wipe in the reading direction; the leader is a path drawn on after it.
- **Morphs and rescales**: interpolate each mark's position and size between two encodings with a staggered `prog`; a ratchet rescale is several short eased steps. `isolateNumbers` on tick ranges.
- **Overrides**: one take, so no `SceneFrame` and `<SceneTrack sweeps={false} />`; no `Backdrop`, no `Finish` (the paper is the texture). Springs only for a mark's pop and the pencil's rebound (`SPRING.snappy`).
- **The mark schedule lives in `timeline.ts`** (one landing frame per mark, on the pulse); `Soundtrack.tsx` reads the same schedule, choosing the tap variant from the mark's value.

## 11. In a product video

- **The brand colour is the accent that bypasses the ramp**: the one mark that is "us", a highlight, the logo. For data with no natural centre it can also be the far end of the single sequential ramp. Cream paper, ink and the red–blue pencil stay: they are the look.
- **The data is the product's own real record** (usage, ratings, time saved, growth) or public data about the problem it solves. Every number and its source goes in `facts.md`; a sample series carries `<ExampleBadge />`; never extrapolate.
- **The real product appears on the sheet**: a screenshot pinned to the paper like a clipping, with a handwritten note and a leader to the mark it explains; or a pencil drawing of the product that becomes the first mark. Reach it by a camera move, not a cut; no tilted devices.
- **Notes use fictional people** unless the user supplies real, public ones; no private names or figures.
- **End card**: the headline revised into the product's own line, the logo printed in a corner of the sheet like a publisher's mark, one handwritten line on how to get it.
- **Arabic**: captions and notes align right and the pencil enters from the lower left; decide once whether time runs right to left and keep it for the whole film; handwritten words appear whole, one at a time, as the pencil taps beside them, never letter by letter, with no letter-spacing; a soft handwritten Arabic face for notes and a Naskh-style text face for the caption.
- **9:16**: turn the sheet tall: ranked bars run sideways and stack downward, time can run down the page, the memory zone moves above the plot, and the caption band sits above the bottom 22%, clear of the top 12% and right 12%.

## 12. Variation space

You decide the dataset, the chart, the human scale, the notes, the opening, the ending, the camera path, the pacing and the silences.

- Structures: **a ranked race** (bars climb and overtake; one bar is the character; a newcomer breaks the frame from below); **a map that becomes a count** (dots gather on a map as events happen, then fall into a unit chart of people in one morph); **before → after dialogue** (two years face each other as a slope chart; one line left unfinished).
- Openings: **the finished chart** (the whole pattern is already drawn; the film works backwards); **the object before the axis** (a pencil drawing of the thing measured, a ticket, a shoe, becomes the first mark); **the question first** (an empty plot with only the unit and a handwritten question; the pencil hovers).
- Endings: **one mark, close** (end on a single value and its note, never the full view); **back to the object** (the chart folds into a drawing of the thing it measured); **the headline revised** (the pencil strikes a word of the title and writes the true one).

---

Adapted for Halal Motion Videos from the `dataviz` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
