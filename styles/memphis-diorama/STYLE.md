# Memphis Diorama

> A place built as a tabletop model: on warm white paper an organic, grainy frame grows open, and inside it a small world in flat Memphis colours, ink outlines, hard purple shadows and tiny patterns, full of small motions under a slow camera. Calm, bright and warm; a place you watch, not a story you follow.
> References (grammar only): the Memphis Group, Ettore Sottsass, Nathalie Du Pasquier (saturated primaries next to pastels, dots, zigzags and terrazzo flecks on every surface); architectural and railway-layout models (a whole place seen from above, at once); children's picture-book towns (every window has a flower box, every corner has something going on); risograph halftone (shadow as a field of dots). Use none of their objects, layouts or palettes.

## 1. Essence, and what it is not

- **Paper and a grainy frame.** A warm white ground; the picture lives in a rounded, organic frame whose edge dissolves into grain. It grows open from the centre at the start and draws back in at the end.
- **Memphis flat colour.** Saturated primaries plus pastels, flat fills, no gradients; a deep-indigo ink outline; small patterns tiled on surfaces (dots, stripes, zigzags, terrazzo flecks, halftone).
- **The eye of a model-maker.** High three-quarter, top-down or cutaway views. The film always looks at a *place*, never at a person.
- **Small motions everywhere.** Water, wind in trees, cloud shadows, birds, boats, walkers, lights coming on one by one. The place is alive because of them, not because of a protagonist.
- **Three lines of type under the frame**: title / one sentence / small data, under three Memphis marks (a yellow dot, a pink triangle, a blue zigzag). A film in two languages gives them the first two lines (§4).

Not character animation: nobody acts. Code-made faces, gestures, getting in and out of cars always look stiff, so this style never shows them. Not an isometric infographic (that one is cool and diagrammatic; this one has weather, seasons and sound). Not tilt-shift (no photograph, no depth of field: everything is flat and sharp). Not low-poly (no faceted shading or plastic highlights: flat fills, outlines and patterns do the work).

## 2. Materials & rendering

- **Three tones only**: the top face is the brightest, sun-facing sides keep the base colour, the faces turned away drop to about ×0.5–0.95. Hard edges between faces, never smooth shading.
- **Hard shadows**, never blurred, tinted cool purple (shadow ≈ base × (0.70, 0.58, 0.90)); the sun direction never changes within a film.
- **Halftone in the shade**: inside shadows, a staggered grid of lighter dots fixed to the ground, like a print. It turns dark areas into texture instead of dirt.
- **Outline**: deep indigo `#25214A`, about 0.2% of the frame height thick, on silhouettes and where faces meet. Light pools, markings, particles (rain, snow, petals, smoke) and thin stems carry no outline; a thin object that is all outline reads as an ink scribble.
- **Patterns belong to the world**: dots and stripes are fixed to the object and stay on it as it moves. Pattern scale grows with distance so far surfaces do not buzz.
- **Detail is built, not textured**: a house is a plinth, plank-striped walls, white corner trims, two roof slabs and a ridge, a gable with a round window, framed windows with shutters and flower boxes, a door with a step, awning and lamp. A tree is a trunk with a branch and a cluster of lobes, plus lighter lobes on the sun side. Water is layered: bank, shallows, a deeper channel, white foam lines at the edges, small white squiggles drifting with the current.
- **Outside the world there are only three things**: the grainy frame, the bottom type, explainer callouts.
- **Never**: depth of field, real reflections, bloom, motion blur, light shafts. A lit lamp is a flat warm colour plus a hard-edged pool of warm light on the ground.
- **Hero objects do not receive shadows** when they pass through shade, or they turn dirty.

## 3. Colour logic

- The ground outside the frame is always warm white `#FFFCF6`; nothing else is drawn there.
- **5–7 saturated hues + 2–3 pastels** carry the picture. Ink `#25214A` is only for outlines, type, tyres and window frames.
- **Cluster colour by area**: neighbouring blocks differ in hue; one colour's share is controlled (a field type at about a third of the ground, not sprinkled at random). Leave large calm areas of one colour (water, a field, a square) so the picture can breathe.
- **Day is bright and warm.** When it gets dark, darken by the scene: a night scene may be dark, but never grey all over.
- **Night is a luminance shift toward violet**, not a general darkening, so yellows don't go olive; every light is the same warm yellow (about `#FFD36E`). **Dusk** adds an orange-pink layer (about `#FF9E7A`) on the way to night.
- **Time and season change the large areas only** (ground, crowns, roofs, water), never the whole palette. Each changing material carries one colour per state; a wave (§8) swaps them.
- **Night and day by area is also a wave.** When the dark falls or lifts street by street (dawn spreading from one landmark, a district losing power), night and day are two states like two seasons: each changing material carries its night colour and its day colour, and the ring swaps them. Lights belong to the night state: a lit window or lamp head is warm yellow on the night side and plain glass or metal on the day side; a lamp's pool is a flat disc on the ground, warm on the night side and the ground's own colour on the day side, so it goes out exactly as the ring passes. Keep the rest of the picture's light unchanged during such a wave: a global darkening on top of it turns the day side grey.
- Winter does not mean all white: crowns go to pastel lilac, ice blue and mint with white dots, paths stay swept, houses keep their colours.
- Example palette (an example only): yellow `#FFD234`, pink `#FF7EB3`, sky `#5CC8FF`, mint `#5EDFB0`, lilac `#B9A0FF`, peach `#FF9C6B`, cobalt `#2F5BFF`, coral `#FF5A5F`, green `#2FCB7A`.

## 4. Type & on-screen text

- **Three centred lines under the frame**: line 1, the title, semibold and dark, about 4% of the frame height in 16:9 (4.5% of the width in 9:16); line 2, one sentence, regular and grey, about three quarters of that; line 3, small data (time, season, place, coordinates) in a monospace, light grey, about half. Line 3 may change with the picture.
- **Line 3 is optional, and so is line 2.** An empty line leaves its place empty; the others never move up to fill it. A film in two languages puts one on line 1 and the other on line 2, each on one line, never wrapped; both then change together, as one pair.
- The lines fade in and out with the frame and never move. When a line changes, the old one fades away and the new one fades in (about 12 frames out and 12 in); line 1 stays unless the pair changes. The three marks stay at full strength through every change: only the words fade.
- Typefaces: a tight, friendly grotesque (the kind Inter Tight is) and a monospace for data (the kind IBM Plex Mono is); the brand's own sans can take lines 1 and 2.
- Usually no voice: the type is the narration. With a voice, each narrated sentence is line 2, changing with the voice; no styled caption boxes.
- **Callouts** for explainers: a rounded pill with a leader line and a dot, popping out of the model with a back-ease and fading when done.

## 5. Motion quality

- **Every frame moves**; no stepping, no jitter. The frame's grain boils on a slower step (a new grain every 2–3 frames), which is the only stepped thing.
- **Shapes may be simple; motion may not.** Everything eases. Vehicles accelerate, brake and nod; turns follow smooth curves, never polylines.
- All natural motion is procedural and looping: water, trees, cloud shadows, leaves, snow, smoke, flocks. Every object has its own phase; nothing marches in step.
- **People are distant decoration**: small, walking a cycle, flying a kite, rowing. No close-ups, no acting, no hand business.
- Things never pop into being: they grow from nothing or bounce in with a back-ease; a change of state is announced by an object **squashing down and springing back** (anticipation, then overshoot).
- What never moves: the frame's position, the type's position, the paper, the sun direction.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| High slow orbit or drift | the whole place breathing | time passing; day and night; seasons; a loop |
| Straight-down, slowly turning | a map; order | road networks; fields; coverage; data on a grid |
| Locked three-quarter frame | calm; comparable | before and after; data; several places side by side |
| Lateral move along a cutaway | above and inside at once | how a thing works; underground; under water; inside a building |
| Slow push to one detail | something is happening here | a lit window; a stall; a bird on a roof |
| Following one vehicle | flow; a route | a delivery; a commute; one line joining places |

- **Prefer one continuous take**, slow enough that the viewer can stop and look at any corner. When a long take must hold a composition, ease the camera speed down instead of letting the place drift out of frame.
- **The frame** takes about 80% of the width and 70% of the height in 16:9, a little above centre; in 9:16 it is a tall shape about 86% of the width and half the height, in the upper middle. The type sits under it and never covers the subject.
- **Transitions**: only three — the frame draws in and grows out again; a wave sweeps across (colour, light, season); the ground is cut open (the Cutaway of §8: the same move, whether the cut goes into the ground, a building or water). No white flash, spin or fast hard cut.
- The camera never passes through an object; to get around something, move in two steps (rise, then travel).

## 7. Sound palette

- **Foley is the sound of small things**, soft and close: birds, ducks, water, a bicycle bell, raindrops, leaves, geese, wind, snow, the click or *ting* of a light coming on.
- **The place's air is the bed**: warm, gentle and continuous, never tonal. When the place changes (a season, day to night) the bed crossfades slowly; a bed that stops and a new one that starts sounds broken.
- **The same event always makes the same sound**: if every change of state starts with a squash, every squash gets the same thump, spring and short rising glide.
- **Three weights**: a ting for one light, the thump-and-spring for a squash, and one soft, wide swell for a wave or for a slab of ground sliding away.
- **Lights coming on one by one** may sit on two or three related pitches: accents, never a tune. Drifting clouds, turning trees and the camera stay silent.
- **Silence** is allowed, with a faint room tone under it: one held breath between the squash and the wave it starts.
- **Sound across a change**: the bed fades up as the frame grows open and lingers a moment after it draws in; the next season's sound arrives with the front of the ring, before its colour has crossed the picture.
- **Voice**: none by default. If there is one: gentle, unhurried, a few short lines.

## 8. Native moves

A menu: use the ones your story needs.

- **Wave.** A ring spreads from one point; everything it passes takes its next state (colours swap inside the radius; objects grow, open, fall or light up as the ring reaches them). *Fits content like:* night falling street by street; a change of season; a delivery or signal coverage map; power coming back after an outage. Night falling or day breaking by area follows §3 (night and day as two states); how to build it is in §10.
- **Squash and spring.** One landmark squats, springs back, and the change starts from it. Use it to say "this causes that" without a person. *Fits content like:* a fountain that starts the morning; a factory chimney that starts a shift; a station clock that starts the rush hour.
- **Cutaway.** Cut along a line; the near part sinks and slides away to show the section underground, inside a wall or under water. *Fits content like:* how a metro and its pipes work; a tree's roots; what each floor of a building is doing; fish under a pond. What is revealed is built, not implied: floors with their rooms and furniture, soil in layers, pipes and tunnels, water with what lives in it; every cut face is drawn as a section (flat colour with section hatching), never left hollow. The near part leaves in two steps (a lid rises, then slides back; a wall or a slab of ground sinks straight down), so nothing passes through anything, and it comes back the same way in reverse.
- **Grow the frame.** The organic frame grows from the centre to open, draws back in to close, and can close and reopen as a chapter break. *Fits content like:* an opening; a change of chapter; an ending.
- **Living loop.** Every small motion is periodic, so a passage loops seamlessly. *Fits content like:* a website hero; a waiting screen; a background for a live broadcast.
- **Callout.** A pill label with a leader line pops out of the model. *Fits content like:* explaining a mechanism; labelling data; naming places.

## 9. Pitfalls of the medium

| Pitfall | Fix |
|---|---|
| Code-made people look stiff close up | keep them small and far; no acting |
| Day looks grey, not warm | raise saturation, warm it; shadows go purple, not grey |
| Yellows turn olive at night | shift by luminance toward violet; give warm objects their own night colour |
| Colours sprinkled at random look dirty | cluster by area, control each hue's share |
| Every tree looks the same | at least five crown shapes (round, cone, egg, cloud, column…), lighter lobes on the sun side |
| Thin objects turn into black scribbles | thicker stems, or no outline and a brighter colour |
| Large shadows look like dirt | halftone dots in the shade |
| Far outlines and patterns buzz | less detail far away; pattern scale grows with distance |
| A long take drifts until the subject leaves the frame | ease the camera speed down over time |
| A state change happens "by itself" and feels arbitrary | anticipate it: a squash on one landmark, then the wave from there |
| The camera passes through an object | move in two steps, or remove the blocking tree for that shot |
| The frame is crowded and has no air | keep large quiet areas of colour (water, field, square) |

## 10. Building it here

- **No 3D renderer and no 3D library: the model is flat polygons in a fixed three-quarter view.** A small projection function (no perspective) places every corner; each face is an SVG `polygon` in one of its three tones with an ink `stroke` and round joins; faces are sorted far to near. A slow drift, a straight-down turn and a small orbit (about a sixth of a turn) work by re-projecting every frame. **Leave out** full orbits and perspective.
- **Patterns**: SVG `pattern` fills (dots, stripes, zigzag, hatch) whose `patternTransform` is the face's own projection, so they stay on the object. **Shadows**: each object's footprint pushed along the fixed sun direction on the ground, drawn in `mix-blend-mode: multiply` with a lilac fill and the halftone pattern on top; never blurred.
- **The grainy frame**: the whole world sits under one organic mask whose edge is roughened by `feTurbulence` and `feDisplacementMap`; change the filter `seed` every 2–3 frames for the boil, and scale the mask from the centre to grow or draw in. The paper outside is a plain `div` in `#FFFCF6`.
- **Wave**: every changing material holds two colours. Ground-level areas are drawn twice and the second state is revealed by a growing ellipse (`clip-path`), which is the ring seen in projection; each object switches when the ring's radius passes its own spot, with a squash from `springAt(…, SPRING.bouncy)`. Night colours come from a small function (shift by luminance toward violet), never from a dark overlay.
- **Cutaway**: build the near part (a lid, a front wall, a thick slab of ground) as its own group and what lies behind it as real pieces; move the group in two eased steps and stop drawing it once away; cut faces take the hatch pattern one step darker.
- **Small motions**: sines of the frame number with a phase per object from `noise(i, seed)`; pick whole numbers of cycles over the passage for a seamless loop. Vehicles travel smooth paths with `prog(…, ease.inOut)`; callouts pop with `ease.back`.
- **Overrides the engine defaults**: no `Finish` (no vignette; grain lives only in the frame's edge), no `Backdrop`, no blur or glow anywhere, no light sweep (`<SceneTrack sweeps={false} />`), no `MaskRise` (the lines only fade). Leans on springs for squashes.
- **Timing lives in `timeline.ts`**: the frame's open and close, each squash and each ring's start; `Soundtrack.tsx` puts the thump on the squash frame and the swell on the ring.

## 11. In a product video

- **The Memphis palette is the look.** The brand's colour joins it as the hue of the **hero landmark** (the shop, the van, the sign, the building the wave starts from) and of one of the three marks; it never takes over the whole place.
- **The film shows the place the product serves**: a delivery crossing town, coverage spreading as a wave, a shop street lighting up, a building cut open to show what happens inside.
- **The real interface comes in two ways**: as a callout that grows into a small card holding a flat `Phone` with the real screenshot, tied by its leader to a spot in the model; or as a chapter, where the frame draws in and grows open again on a `Device` showing the screen recording on the same paper.
- **Real numbers** go on line 3 and in callouts, each from `facts.md`; invented city data carries `<ExampleBadge />`.
- **End card**: the frame draws back in to a small shape; on the paper, the logo, and the three lines become name / one sentence / where to get it.
- **Arabic**: the centred lines stay centred and the three marks run from the right; callout pills and leaders mirror; words fade whole (never letter by letter), with no letter-spacing; a friendly rounded or geometric Arabic sans. Keep line 3's numbers in the monospace and wrap ranges in `isolateNumbers`.
- **9:16**: paper only in the top 12%, the tall frame in the upper middle, the three lines under it and above the bottom 22%; callouts open toward the left, away from the right 12%.

## 12. Variation space

You decide the place, the season and time, the camera route, the pace, which native moves, and the palette within §3.

- Structures: **one take that loops** (a square at the same hour every day, ten seconds that join end to start); **the same place in four states** (a market at dawn, noon, dusk, night); **whole view → cutaway → whole view** (a building, then its floors, then the building again with one thing changed).
- Openings: **the frame grows open**; **a place in the dark before dawn lights up**; **a wave sweeps into an already open frame**.
- Endings: **the frame draws back in**; **the lights go out one by one**; **the camera rises until the place is one dot on a map**.

**Use cases** and the order in which information arrives:

1. **A looping scene for a web page** (a hero, a waiting page): first the whole calm place, then one or two small motions that lead the eye; loopable. Nothing is laid over it, so the video's Safe area can be off.
2. **Ambient loops** (broadcast backgrounds, waiting screens): no type or a single line; the camera almost still; a seamless loop; sound mostly ambience.
3. **Seasonal series**: one place, one season or month per part; the colours and small motions change; line 3 carries the season and the date.
4. **How things work**: the whole place → cut open → callouts one step at a time → back to the whole place with the result visible.
5. **City data maps**: map or locked three-quarter view → the data grows out as a wave or as columns → callouts read the values.

---

Adapted for Halal Motion Videos from the `memphis-diorama` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
