# Brick Toy

> Stop-motion toy-brick films shot like macro photography on a real desk: a world built from interlocking plastic bricks with round studs, animated a pose at a time.
> References (grammar only): brick-film stop-motion on a tabletop and the "brick movie" approach of stepping characters while the camera moves smoothly; macro toy photography (softboxes on glossy plastic, shallow focus, real objects as landscape). Copy none of their characters or sets, and never use a brand name.

## 1. Essence, and what it is not

A brick world on a **real surface** (a wooden desk, a kitchen table, a windowsill), shot with a **macro lens** and animated **in stop-motion**. The charm is the tension between the toy world and the real room.

One-glance traits: glossy plastic with clean rectangular highlights; studs on every top face; seams darkened by contact shadow; real objects out of focus behind; characters that move in held poses.

**Never** use the LEGO name, logo or minifigure silhouette (trademarks). Characters are *built from bricks* (e.g. 1×1 columns for legs, a 2×2 brick for a torso, round bricks for arms, a round 2×2 helmet). Studs carry no lettering.

Not a low-poly isometric island (no flat-shaded facets, no floating diorama), not a clay or felt stop-motion (no deformation: bricks are rigid), not a clean product render of a toy (this world is played with, handled, knocked over).

## 2. Materials & rendering

- **Plastic**: glossy ABS: a strong, clean highlight on top of the colour, faint fingerprints and scratches that dull it in places, and a bevel so every edge catches a thin line of light.
- **Geometry**: rounded box bodies with a small bevel, studs with a thin lip. Unit = 1 stud pitch; a brick is 1.2 units high, a plate 0.4. Large baseplates are **matte**, or they show the softboxes as a coloured wash.
- **Set**: a real surface with a real texture and real props at true scale (a stud is 8 mm, so a mug is a tower and a phone is a city block). Household objects become landscape. The room's light is **neutral daylight**, never warm tungsten (white bricks turn orange).
- **Light**: a toy-photography setup. A warm-white key from one upper side that casts crisp shadows; two or three **softboxes** (key front, cool rim behind, one over any big set), so glossy plastic shows clean rectangular highlights; the room's fill kept low for contrast. Add a soft contact-shadow blob behind a hero object.
- **Seam shadows are mandatory**: darken the seams between stacked bricks, the bases of studs and every contact point. Without them bricks look pasted on.
- **Edges stay clean**: thin stud lips and bevel highlights must not shimmer; draw them at whole-pixel widths and keep them out of sub-pixel motion.
- **Lens**: shallow depth of field, scaled with shot size: strongest for close-ups, less for mediums, least for a wide (too much blurs the hero at mid distance). Focus is always on a character's head or the brick being placed.
- **Effects are bricks**: fire, smoke, water, light, weather, sun and moon are all built from plates, round bricks and translucent pieces, jittered or rebuilt per pose. Nothing is a particle cloud or a soft gradient.

## 3. Colour logic

- A **toy palette**: a handful of saturated brick primaries plus white, black, greys, tan. Each built object has one dominant colour and at most one or two trim colours; characters and hero objects take the most saturated ones.
- The **real world stays natural and muted**: wood, paper, ceramic, daylight. The saturated colour belongs to the toys, which makes them pop against the room.
- **Whites must read white**: lean slightly cool so white bricks don't go cream from the room; soft contrast, saturation lifted about 10%.
- Translucent pieces (orange, yellow, clear, blue) are reserved for effects: fire, light, water, glass.
- Example palette (the classic brick primaries): red `#c91a09`, blue `#0055bf`, yellow `#f2cd37`, green `#237841`, white `#f2f2ee`, black `#1b2a34`. Others: pastels and tan; greys with one accent.

## 4. Type & on-screen text

- A rounded, friendly face (the kind Fredoka is) for titles and narrated lines. A brand's own face comes first if it is rounded and warm; otherwise it appears on the end card and the logo only.
- Narrated lines live on a **toy element**: a dark rounded pill low in the frame with a small brick icon beside the text, or a printed tile, or a sign built into the set. White on dark, two lines at most, words arriving with the voice. A second speaker type (radio, device, narrator) gets its own icon colour or tag.
- Titles pop in on stepped poses, like a piece being placed; a short sub-line in a brick colour.

## 5. Motion quality

- **Characters and bricks step**: hold each pose 2–3 frames (about 12 a second). **Camera, focus, fire and flying vehicles move on every frame.** Stepping the camera too reads as judder, not charm.
- Bricks **fly in on arcs** and **snap** with a tiny overshoot (a fraction of a stud, gone in about 5 frames). Every snap is a click on the soundtrack.
- Characters act with **big readable poses** held for several steps: a V of arms for pride, arms flung up for alarm, a bowed head for sadness, a hop for joy. Walk cycles swing the legs about 30° each way with a small bob. Arms and legs rotate at their joints; nothing bends.
- Collapses and falls obey **rigid-body rules**: tip about the base edge, then separate pieces under gravity (a lower-than-true value reads better at this scale), bounces that lose about two thirds of their height, friction, settling flat. Work them out once so every render is identical.
- Tiny imperfections are allowed. Bricks never stretch, squash or morph.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | Expresses | Can serve |
|---|---|---|
| Extreme macro on one brick or stud, real room blurred behind | The toy scale is the world | a beginning; a detail that matters; a single part |
| Low angle at the character's eye level | A tiny character made heroic | ambition; pride; standing up to something big |
| High wide over the whole surface | The scale reveal: it was a toy all along | a summing-up; irony; a finished build |
| Low, wide, lonely frame, character small in a corner | Smallness, failure | a setback; waiting; loss |
| Frontal close-up, hands and brick in focus | Intimacy, decision | a choice; a repair; a gift |
| Handheld shake on impact | Physical shock | a collapse; an arrival; a collision |
| Tracking alongside a moving object, destination ahead | Momentum toward a goal | a journey; a race; a launch |
| Top-down plan view | Order, layout, a map | a plan; sorting parts; a city from above |
| Rack focus from a real object to a brick (or back) | Two scales in one frame | "big world, small maker"; a comparison |
| Turntable around a finished build | Pride, inspection | a product; a monument; a result |

Framing: keep foreground clutter out of the frame edges (piles of parts love to block the lens); check headroom in every shot; check every real prop against every framing, because an object that suits one shot sneaks into the background of another. Cut on the pulse; a snap can be a cut point. No generic dissolves; transitions can be a hand-placed brick covering the lens, a whip along the desk, or a pull out of one set into the next.

## 7. Sound palette

- **Plastic is the sound**: a brick click (a short hard tick with two bright rings in it), a clack on wood, tiny plastic footsteps, a plastic creak before a failure, a crash made of many clacks, the rattle of a parts pile being stirred, bricks sliding over paper.
- **One click per snap, on its landing frame.** A family of three: a light tick for a plate or a stud, the full click for a brick, a deep clack for a large piece or a whole section dropping in. Clicks may step up in pitch as a build nears completion.
- **Movement**: a whoosh on throws and fly-ins, motors and engines made from filtered noise for vehicles. Slow camera moves and focus pulls are silent.
- **Ambience bed**: the real room, very quiet: room tone and one small real-world sound (a ticking clock, a fridge hum, a distant bird).
- **Silence**: cut everything dead at a failure or a surprise and leave only the room. Before the big build, drop to a slow soft thump, like a heartbeat or a countdown, then nothing for half a second.
- **Sound across a cut**: the rattle of the parts pile starts a few frames before the cut to it; a crash rings on over the wide that follows.
- **Tonal accents**: one bell "ding" for a discovery. Never a tune.
- **Voice**: a warm storyteller, few short lines with room to breathe. A second voice (a radio, a device) is marked by its beeps and its tag on the pill.

## 8. Native moves

A menu: use the ones your story needs.

- **Snap-together building.** The plot is an act of building; pieces fly in on arcs and click home. *Fits content like:* a company assembling its first product; a neighbourhood rising street by street; a recipe put together ingredient by ingredient.
- **Break without harm.** Things fall apart and the parts become something new; failure yields spare parts. *Fits content like:* a pivot after a failed plan; recycling; a team reshuffled into a better shape.
- **Toy on a real desk.** Real objects become landscape at toy scale. *Fits content like:* a laptop keyboard as a city grid; a houseplant as a jungle; a coffee spill as a flood.
- **Hand-made stop-motion.** Stepped poses, tiny imperfections, even fire and water made of bricks. *Fits content like:* a weather report; a kitchen explained with brick flames; a science demo of a volcano.
- **Rebuild into something else.** The same pieces, rearranged on screen, become a different object. *Fits content like:* one career turning into another; a before/after renovation; a word re-spelled.
- **The scale reveal.** Pull back until the whole world is a toy on a table. *Fits content like:* a big ambition that is still small; a year in review; a child's imagination.

## 9. Pitfalls of the medium

- Warm room light turns white bricks cream → keep brick shading neutral and slightly cool, whatever the room behind looks like.
- A gloss highlight on a large flat baseplate reads as a coloured wash → baseplates are matte; highlights belong to bricks.
- Flat, pasted-on first frames: even light, no seam shadows, no bevel line, stepped camera → one key side, darker seams, a highlight on every lit edge, camera on every frame.
- Too much blur softens the hero at mid distance → scale the blur with shot size.
- A fast-rising or fast-moving object becomes a dot on a blank wall → track it and keep its destination in frame.
- Studs drawn as flat circles in a three-quarter view look like stickers → ellipses with a lit lip, a shadow side and a dark base.
- Two projections in one shot (three-quarter bricks on a front-view ground) break the scale → one view per shot.
- Real props that suit one shot sit behind the hero's head in another → check props against every framing.

## 10. Building it here

- **The original was a 3D render; here bricks are pre-shaded SVG, in 2.5D.** No 3D library. A `Brick` component takes width, depth, height (in studs) and a colour, and draws three faces in one fixed projection: top (lightest, with stud ellipses and their lips), lit side, shadow side, a bevel line on lit edges, a white rounded-rectangle highlight in `mix-blend-mode: screen`. Draw back to front and bottom to top.
- **Three views, one per shot**: three-quarter (isometric or oblique) for most shots, a straight front view for eye-level heroics, a plan view for maps. The "orbit" is a **turntable in quarter turns**, stepped, by redrawing the build from each side. Leave out free camera orbits, true reflections and refraction (translucent bricks are lower opacity with a lighter inner edge).
- **Depth**: the real room is a muted, blurred layer behind (a photo the user supplies, or painted soft shapes), the desk a textured plane, clutter a blurred layer in front. The camera is a wrapper `transform` with a different parallax factor per layer; depth of field is `filter: blur(…)` per layer, and a rack focus swaps those values.
- **Stop-motion**: characters and bricks read a pose number, `pose = Math.floor(frame * 12 / fps)`, so each pose holds 2–3 frames; the camera reads the true frame. The snap's overshoot is `springAt(pose * fps / 12, start, fps, SPRING.snappy)`: the spring sampled on the stepped frame, not on the pose number. Jitter and imperfections come from `noise(pose, seed)`.
- **Falls**: closed-form arcs per piece (tip, parabola, two or three shrinking bounces, settle), with start values from `noise`; no live simulation.
- **Shadows**: darker strokes at seams, a blurred dark ellipse under each build, a soft offset shadow from the key side.
- **Leans on / overrides**: `Finish` for a light grain; a `Device` or `Phone` as a real object on the desk; `<SceneTrack sweeps={false} />`; no `MaskRise` (titles pop in on steps). A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **The pulse lives in `timeline.ts`**; every snap frame is exported from it, and `Soundtrack.tsx` puts a click on each one.

## 11. In a product video

- **The brand's colour is the hero's colour**: the main character, or the build the story is about, takes it as its one dominant brick colour. The rest of the toy palette and the muted real room stay.
- **The product is the real object on the desk.** A phone or laptop at true scale is a giant among bricks: a `Device` lying or standing on the surface with the real screenshot or screen recording on its screen, in focus when it matters, while the characters build around it, climb it or point at it. A screen can also be rebuilt as plates and tiles beside the real one.
- **Real numbers become stacks**: one brick per unit, or a tower per figure, each figure in `facts.md`. A made-up count carries `<ExampleBadge />`.
- **End card**: the logo as a printed tile or a sign that snaps into place on a finished build (don't rebuild the logo out of studs unless it survives it), with one line on the pill saying where to get the product.
- **Arabic**: the pill mirrors (icon on the right, text flush right); titles pop in whole word by whole word, never letter by letter, with no letter-spacing, in a rounded, friendly Arabic face. "A word re-spelled" uses word tiles, not single-letter tiles.
- **9:16**: build upward: towers and stacks suit the tall frame, the desk recedes toward the top, and the scale reveal pulls up, not back. Keep the pill above the bottom 22% and heads out of the top 12%, with nothing important in the right 12%.

## 12. Variation space

You decide the structure, the characters (or none), the surface and its props, the opening, the ending, the camera path, the pacing and the palette within the colour logic.

- Structures: **a catalogue** (one build per pulse, each a different object answering the same question, lined up at the end); **two builders** on opposite sides of the table whose builds grow toward each other; **a disassembly** (a finished thing is taken apart piece by piece to explain what's inside).
- Openings: **a hand pours a bin of bricks** onto the table and the pile settles into the first shape; **a real object first** (a mug, a phone), then rack focus to the tiny world at its base; **plan view** of an empty baseplate filling in like a map.
- Endings: **one piece left over** held in close-up, the question it raises unanswered; **the lights go out** in the room and only a lit brick window glows; **a real hand** reaches in and picks the character up.

---

Adapted for Halal Motion Videos from the `brick-toy` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
