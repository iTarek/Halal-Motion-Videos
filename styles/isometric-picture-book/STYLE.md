# Isometric Picture Book

> A calm explainer of an everyday rule, set in one real place drawn in true isometric with flat colour: small faceless people seen from behind do the thing in order, while serif type lands on the ground, piece by piece, as if painted there. Whatever hides the action (a roof, a wall) is cut away or lifts off like a paper flap. The order of movement is the explanation.
> References (grammar only): isometric explainers about public manners (queues, platforms, crossings) and picture-book cutaways where a roof or a wall is lifted away to show the inside. Take the calm pacing, people as the diagram and type on the floor; never copy their characters, layouts or typefaces.

## 1. Essence, and what it is not

- **One real place, full bleed.** A platform, a gate, a cabin, a crossing, a counter: the ground runs off every edge of the frame. No floating board, no frame line, no vignette. A topic that travels (a parcel, a route, a production line) can still be one place: one continuous ground at one scale, with the stops along it (see §12); what breaks the look is a separate board, a map view or a change of scale for each stop.
- **People are the diagram.** Slim figures seen from behind, no faces and no hands, move only when the rule says so. Who moves first, who waits, who sits is the information.
- **Type lies on the ground.** Each idea is one key word or number painted on the floor, big and small sizes, one accent word or number, landing one piece at a time.
- **The cut-away.** Whatever stands between the camera and the action (a roof, a canopy, the top of a wall, a glass façade) is cut low or lifts off like a paper flap, so the camera always looks into the place from above.
- **Clean, always.** One place, one action, one phrase per step. Large calm areas of ground around the type, people in tidy lines and rows, few props, every object instantly recognisable. A frame that needs a second look to find its subject is wrong.

Not **Isometric Infographic**: that style builds a model on a floating board over a dot lattice and labels it with sans-serif pins, icon statistics and inset bubbles to trace a process; here there is no board edge, no pins and no icons: the place is real and full bleed, the labels are serif words lying on its floor, and the explanation is people obeying a rule. Not **Low-poly Isometric Island**: no lighting, no faceted terrain, no shadows or glow; solids are flat three-tone paper colours and the ground is a printed plane. Not a cartoon (no expressions, no gags), not a slide (no headers, no centred titles, no cards).

## 2. Materials & rendering

- True isometric (axes at 30°), drawn back to front. Every solid and every person is sorted by its **floor footprint** (x + y at floor level), never by the centre of its box: a seat back sorted by its centre height ends up drawn over the passenger sitting behind it.
- Solids are flat-shaded in **three tones per colour**: top lifted toward warm paper, the left face the base colour, the right face dropped toward a warm umber. Curved bodies (a fuselage, a column) are faceted and quantised to the same tones plus one in-between, so they read as round without gradients. No outlines on solids, no shadows, no textures, no highlight spots (a round tree crown or a ball is a flat disc or a faceted solid in the same tones, never a glint).
- **New objects** (vehicles, machines, buildings, trees) follow the same model: built from boxes, prisms and faceted solids at real size in metres, recognisable from their silhouette at a glance, simpler than the people. Vehicles read from the body (cab, cargo box, a band of the subject hue); wheels are small, low and mostly under the body in one dark tone, never thick cylinders or tyre-and-hub detail.
- Ground surfaces carry only their functional markings (painted lanes, chevrons, lead-in lines, stop bars, seat squares) and a faint tile or slab grid.
- **Cut-aways** are part of the model: the near wall is cut low and the far wall keeps its windows; a lid is its own solid with a paper-coloured underside, hinged on the far edge so it opens away from the camera; glass is a pale tint with thin mullions and is cut to a parapet whenever it would stand between the camera and type or people.
- **People** are flat figures anchored at their feet, about 1.6–1.8 m tall and modestly dressed: a round head in a hair-dark tone or a muted headscarf, a two-tone long top, separate trouser legs or a long skirt, dark shoes, perhaps a rolling case. Seated people show only shoulders and the back of the head above a low seat back. Walking scissors the legs along the screen; arms counter-swing.
- Bodies obey space: people never pass through seats, walls or each other; a queue keeps about 0.75 m between feet; someone sitting down first steps back into the row's legroom, walks sideways to the seat and sits (never sinking into or floating above it); a lifted case travels up over the open bin and is lowered in, never into a wall or a seat.
- Everything is a function of time. A crowd that queues is simulated once (deterministic) and **sampled with interpolation**, so replaying it slowed down still moves every frame.

## 3. Colour logic

- A warm paper neutral for every ground (outdoor concrete a touch cooler, indoor carpet a touch warmer), one dark ink, **one accent reserved for the rule** (the key word, the "stand here" outline, arrows, a lit sign, the winning number, a stretch of floor that matters), one **subject hue** carried by the place itself (seats, livery bands, chairs in a paler tint, sign trim), one marking colour (lead-in lines, a tug, a baggage tractor). People wear four muted tops, so a filled room reads as an even four-colour weave.
- The accent never decorates; it appears only where the rule is. It stays small because its rarity is what makes the eye go to it: many frames carry none at all. A path in the accent marks the stretch being explained now (it grows ahead of the walker or the vehicle and fades behind it), not a trail left across the whole film.
- The subject hue and the marking colour must be clearly apart, in hue and in value, from the four tops: people have to stand out from the place they move through (a blue-green place swallows fog-blue people).
- Shade toward warm umber and paper, never toward grey or violet: dirty shadows are the fastest way to lose this look.
- Example palette: paper `#F1E8D8`, concrete `#EAE2D3`, carpet `#F2E5CE`, ink `#2A2E29`, accent persimmon `#D0573A`, subject green `#3D6B59` / `#A7C2B2`, marking ginger `#E2AE3A`; tops ochre, fog blue, grey violet, oat.

## 4. Type & on-screen text

- A book serif (the kind Newsreader is) for words and numerals: bold for key words, medium for small words. The style needs a serif on the floor; a brand's sans stays in the logo and on signs.
- **Floor type**: big is about 1.5 m tall on the ground, small about 0.8 m; it reads along one ground axis (§10). One phrase per step; one line where the frame is tight. One accent word or number per phrase, never a single thin stroke (a lone "1" in the accent reads as a line, not a figure). Pieces land about 4 frames apart: fade and scale 1.22 → 1, pale tint → ink. In Latin script the pieces are characters. A painted title or a pair of numbers may scale up to ×1.6.
- Type sits on clear ground: nothing stands on it, nothing raised stands in front of it (see §9), at least 5% from every frame edge, and clear of the narration bar.
- Signs in the world (gate signs, group signs, screens) face the camera side of the room at the iso angle, never a flat card facing the lens.

### Narration & on-screen lines

When the film tells something, a narrator says it and the picture shows it at the same moment: one line per action or shot, each line starting as its action starts. The floor carries only that line's key word or number, never the sentence. If the sentence itself must be read, it sits on a pale bar in the lower safe area, one line in the video's language, switched hard with the voice, never two at once. Numbers the viewer must remember: at most three, each said with what it compares to, and held on screen at least 2.5 s.

## 5. Motion quality

- **Smooth on every frame**: crowds and walks are judged frame by frame (§9).
- People move only when the rule says so, in order; the order is the point. Walk about 1.5 m/s; nobody moves faster than about 3 m/s on screen, even in a time-lapse: when a process must be compressed, show it as places filling (people settling into their seats) rather than people zipping past.
- Everything eases; nothing pops. A step = one floor phrase + one diagram mark (an outline traced, an arrow grown ahead of the walkers, a light run along a path) + one action.
- A rewind runs the same motion backwards, faster, with a counter running down.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| slow drift and push (about 6–8% zoom) | calm attention on one rule | a call, a waiting room, a hold to read |
| follow the head of a line | the order of things | a corridor, a boarding, a school line |
| travel along the ground at the subject's pace | one place after another on the same road | a delivery, a market street, a line of workshops |
| rise to wide while a lid opens | revealing a space whole | an interior, a capacity, a grid of places |
| locked frame | judging, reading | a verdict, a comparison, the last frame |
| step back to frame one whole incident | cause and effect in one view | one person blocking, one door jamming |
| tilt down from outside to the people | arrival, cause → people | an opening, a change of place |
| scale jump (room → building → site) | the result in context | a verdict, an ending |

The angle never changes (iso is fixed); camera moves are translation and zoom. Every move is motivated by the action, and text and subject stay inside the frame at both ends of it. Transitions: a continuous move, a lid opening, a run back along the same path, or a cut at the same angle. No page turns, wipes, black or blank frames; a pull-out shows its next subject (a mark being drawn) within half a second. A lid is a reveal only while it is seen: it finishes turning, paper side up, inside the frame before it glides off away from the camera.

## 7. Sound palette

- **The place's own functional sounds**: a soft announcement chime, wheels on carpet and on metal, bin lids, a tug, a door, a seat.
- **One soft tap per piece of floor type as it lands**: key words a little louder, the accent with a brighter tick on top. Short and dry, never a tune.
- **Footsteps are the rhythm**: soft, on the surface they cross. A stuck queue is broken, uneven shuffles; an orderly one is one clean group of steps per group called.
- **Quiet place beds** (hall air, cabin air, distant engines), never tonal, overlapping every cut so no scene change drops out.
- **Silence**: the bed thins to almost nothing during the still hold before the result is marked; the mark's tick is then the loudest small sound in the film.
- **A rewind** plays the last second of sound backwards.
- **Sound across a cut**: the next place's bed and its first wheel or door arrive a few frames before the picture.
- **Voice**: a calm, quick reader in the film's language, one line per action.

## 8. Native moves

- **Floor type.** The key word lands on the ground beside the action. *Fits content like:* a hospital triage rule; a polling-station step; a library's quiet zone.
- **Domino stand-up.** The group called sits together and rises one by one from the near end into a painted lane. *Fits content like:* an exam hall emptying by row; a ferry deck released lane by lane; a classroom drill.
- **Lid off.** A roof flips open on its far hinge, paper side up, and glides away; the camera rises to see the whole inside. *Fits content like:* a bus at a depot; a lecture hall; a container being packed.
- **Order lighting.** Places light up one by one in the order they will be used, before anyone moves. *Fits content like:* seat assignments; a parking plan; a vaccination queue by number.
- **Order arrows.** A flat accent arrow grows ahead of the walkers and branches where each one turns. *Fits content like:* escalator lanes; recycling bins by type; a one-way museum route.
- **Weave fill.** Places fill in a pattern (every other, window first) so the room becomes a woven grid in four colours. *Fits content like:* a stadium by sections; a lecture hall with assigned seats; a car park by level.
- **Bars on the ground.** Two quantities painted as strips on the floor in proportion, the difference marked by a dashed bracket after a still hold. *Fits content like:* two queue times; two routes' lengths; before and after a change.
- **People as the sample.** The people of a study stand on the ground in the shape of the thing they tested. *Fits content like:* a 72-person boarding test; a class of 30 in their desk plan; a jury in their box.
- **Stand here.** An accent outline or a lit stretch of floor marks the spot that matters. *Fits content like:* where to wait for a lift; the jammed stretch of an aisle; the right queue at a counter.

## 9. Pitfalls of the medium

- Anything raised by H metres hides the floor up to H metres behind it, and a person standing there loses everything below its top edge. It holds for low objects too: a 0.8 m belt or counter covers floor type 0.8 m behind it, a 3.2 m truck side hides people's legs up to 3.2 m behind it and whole people within 1.5 m, a glass wall or a wing hides type metres away. Keep type and the people who matter on the camera side of tall objects, or cut those objects down; check every frame in which a vehicle passes.
- A path that zigzags (turning at every vehicle or doorway) reads as noise; routes run along the world axes with few right-angle turns, and the walker or vehicle on them heads away from the camera.
- A crowd folded into a serpentine reads as a solid block; one straight line reads as order. Numbers on the floor beside each person need spacing wide enough for the label (about 1 m).
- People walking toward the camera show a back view that looks wrong; route walks up-left, up-right or across.
- Seated people disappear behind high seat backs: keep backs low enough that shoulders show.
- Sorting boxes by their centre and people by their feet puts furniture over people (see §2).
- A generic "darken" shades toward black or violet and dirties the look → derive every tone toward paper and warm umber; never add a glint to a round solid.
- A simulated crowd sampled by rounding to whole frames steps on and off when replayed slowly; interpolate. Compressing a long process by moving people faster than about 6 m/s (0.2 m per frame) reads as teleporting.
- A camera move can drag a sign or a word across the frame edge, and background details (a far sign, a row of labels) can appear half-cut at the edge of another shot: anything meant to be read needs both ends of the move checked, and background text belongs only to its own shot.
- Check a crowd film frame by frame, not by eye: look at consecutive frames for jumps, stop-start stepping and people standing closer than a body width.

## 10. Building it here

- **Flat SVG from one projection, no 3D renderer and no 3D library**: world in metres, x runs down-right on screen, y down-left, z up. A small function projects points; each solid becomes its two or three visible faces as polygons in three tones; all items of a frame are sorted by floor footprint, then drawn. The camera is a world position and a zoom (pixels per metre), eased with `prog(frame, start, dur, ease.inOut)`.
- **Anything flat on a plane is one CSS `transform: matrix(…)`**: floor markings, floor type, signs, windows and screens are ordinary elements laid on the floor or on a wall by the matrix of that plane. Floor type is real text, so fonts and Arabic shaping just work.
- **Floor type**: lay out the phrase flat first (lines, big and small sizes, the accent), keep its floor rectangle as data so the scene can check nothing stands on it or in front of it, then land its pieces 4 frames apart with a fade, the 1.22 → 1 scale and the pale-to-ink colour.
- **People** are small SVG groups anchored at the feet, built from a parameter object (height, top, legs or skirt, head cover, case) and a pose (walking phase, case rolled or lifted, seated).
- **Crowds**: run the queue simulation once in a pure function with seeds from `noise(i, seed)` (never `Math.random`: frames render separately and must agree), store positions per time step, and sample with `lerp` between steps at `frame / fps`.
- **Overrides the engine defaults**: no springs (everything eases, nothing overshoots), no `MaskRise`, no `Backdrop`, no `Finish` (no grain, no vignette), no light sweep (`<SceneTrack sweeps={false} />`), no fades to black. A cut keeps the same angle.
- **Checking**: `npm run review -- <brand> <video> --strip=<second>` lays out 12 consecutive frames around any moment; use it on every crowd move and every passing vehicle.
- **Timing lives in `timeline.ts`**: each step starts where its voice line starts; the landing frames of floor type and the steps of the people are exported for `Soundtrack.tsx`.

## 11. In a product video

- **The brand's colour is the subject hue**: the place wears it like a livery (seats, a band on the vehicle, sign trim, a paler tint on chairs). The accent stays apart from it and stays reserved for the rule; if the brand has a second, brighter colour, that can be the accent.
- **The product lives in the place as a screen**: a wall display, a kiosk, or a phone lying on the ground like a painted court, each carrying the real screenshot laid on its plane. A "tap" can be a person stepping onto the button, marked with the *stand here* outline.
- **When the interface must be read straight on**, push into the in-world screen until it fills the frame as a flat `Phone` or a `Device` recording (`float={0}`, no `moves`) on the paper colour, hold, and pull back out to the same place.
- **Real numbers on the floor**: at most three, each from `facts.md`; a sample group or a made-up queue carries `<ExampleBadge />`.
- **End card**: the place empty again, the rule left on the floor, the logo on a sign in the world or painted on the ground, and one small line on where to get it.
- **Arabic**: mirror the place and the floor type (the phrase reads along the up-left ground axis; walkers head up-left); words land **whole, one word at a time**, never letter by letter and with no letter-spacing; use a Naskh book face with enough weight to read as paint. Wrap number ranges in `isolateNumbers`.
- **9:16**: the ground still runs off every edge; turn the place so lines and routes run up the frame, stack floor phrases in two short lines, and keep type and the narration bar out of the top 12%, the bottom 22% and the right 12%.

## 12. Variation space

You decide the place, its cut-aways, the cast size, the rules and their order, the narration, the camera path, the pacing and the palette within the colour logic.

- Structures: one rule shown right once; the same group doing it two ways and compared (rewind between); a day in one place as five small rules; one thing travelling through several stops, one small rule each.
- A travelling topic is one way among others to stage, not a required form. One option: lay the stops along one continuous street, yard or hall, each a cut-away building or a marked stretch of the same ground, and join them with the travelling move, a run back along the path, or a cut at the same angle; keep each stop to one action and one floor phrase.
- Openings: the place empty, then people arrive; the title painted on the ground as the first person walks over it; a tilt down from the building to the room.
- Endings: the place empty again with the rule left on the floor; a scale jump out to the building; the last person stepping onto the outlined spot.

---

Adapted for Halal Motion Videos from the `isometric-picture-book` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
