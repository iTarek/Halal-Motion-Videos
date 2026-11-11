# Circuit Board

> The subject is drawn as a printed circuit board seen from straight above: the world is copper under green solder mask, routes are traces, places are pads, words are white silkscreen, and what flows (power, water, signals, goods) is light running along the copper. The camera rides that light and jumps between the scale of a map and the scale of a single component.
> References (grammar only): real PCB design files and assembly drawings (layers, clearances, designators, detail callouts); macro photography of boards (shallow depth of field, gold sheen, soft key light); schematic and single-line diagrams (one symbol stands for one function). Draw your own boards: never copy a real board layout, a logo or a part marking.

## 1. Essence, and what it is not

- A top-down board in every frame: copper pour with clearances cut around everything, traces with 0/45/90° runs and mitred corners, gold pads and vias, white monoline silkscreen. Nothing is drawn in perspective.
- Information moves as light on copper. The way the light moves *is* the explanation: a pulse, a stream, a rocking dash, a pad that flashes.
- Two scales on one board: whole regions (a map, a supply chain, a city) are drawn in the same language as single components, and the camera passes between them without changing medium.
- Only real things are drawn. Every trace, pad and label stands for something in the subject; empty copper is filled with what boards really have (stitching vias, via fences, solder-mask mottling), never with decorative routing.
- Not Engineering Briefing Board (a whiteboard on which real photos are pinned and written over in marker): here there is no handwriting, and the subject itself becomes copper, pads and silkscreen, with information travelling as light along the traces. Not a blueprint (no white-on-blue linework, no paper), not a sci-fi HUD (no glass, no floating panels, no glowing UI chrome), not a 3D circuit "city" (no buildings rising, no perspective).

## 2. Materials & rendering

Layers bottom-up, all in board space under one camera:
1. **Laminate (FR-4):** dark green, a glass-weave basket texture at two sizes that crossfade, so its size on screen stays bounded at every zoom. Bottom-layer copper may show through faintly.
2. **Copper pour:** fills the board; everything is a **clearance** punched out of it (channels, lakes, sea, keep-outs around parts and traces). Drawn twice: a lighter rim pass with the plain clearance, then the fill pass with the clearance grown by a pixel or two, so every copper edge gets a bevelled rim. A soft mottling sits only on the pour (solder mask is never perfectly flat).
3. **Traces:** a rim-colour stroke plus a narrower fill stroke, round caps; a channel of bare laminate runs on both sides (the clearance). Parallel traces that are a pair keep the pour out of the gap between them.
4. **Exposed metal:** gold pads (rectangular, round, a square pin 1) with a sheen band on the top third and a dark drill hole; vias are gold rings with dark bores; bare copper (salmon with a vertical gradient and brushed streaks) only for one heavy, special part. Fiducials and mounting holes at board corners.
5. **Silkscreen:** off-white monoline strokes with a pinhole texture punched out, very slightly soft. Outlines, designators, polarity marks, component symbols, labels.
6. **Light:** an additive glow layer with two blurs (one wide, one tight) under a sharp copy. Current, water and lit pads all live here.
7. **Over the whole frame:** a soft warm key light drifting from the upper left, shallow depth of field (blur fading in at the top and bottom bands, stronger in macro shots, weak or off where text must be read), out-of-focus motes of light drifting with parallax in front of the board, a vignette, fine grain. A window's light (a soft parallelogram with a mullion shadow) may fall on the board when the whole board is on a desk.

Level of detail: textures crossfade between sizes; small features (vias, designators, rims) fade out before they go sub-pixel, so zooms never shimmer. Nested boards (a module inside a board) are separate boards placed into their footprint, so a continuous zoom can cross many orders of magnitude.

## 3. Colour logic

- Ground: green solder mask in three values (dark laminate, mid pour, light rim and trace). The film is green; never recolour the mask per scene.
- Metal: gold for pads and vias, one bare-copper accent at most.
- Ink: one off-white for all silkscreen.
- Light carries meaning and is the only saturated colour: **amber** for energy or current (with a near-white core), **silver-cyan** for a second kind of flow (water, data, goods) when the story has two. A third flow gets a third light colour only if it must be told apart; red is reserved for a fault and appears at most once.
- Dark (bare laminate, sea, holes) for what is absent.

Example: laminate `#05190F`, pour `#1C6A44`, rim `#4AA977`, gold `#D9B25B`, silk `#F2EEE1`, current `rgb(255,190,84)`, water `rgb(170,214,226)`.

## 4. Type & on-screen text

- All board type is silkscreen in one **monoline face routed like traces** (0/45/90° strokes, chamfered corners, round caps), the same stroke width everywhere. Latin labels are set in capitals. This face is the look and stays whatever the brand's fonts are.
- Text is anchored to the board and **plotted in writing order**; it stays on the board and is still there when the camera pulls back.
- Roles: labels (one line; a smaller second line only in a bilingual film), board-native text (designators, voltages, timestamps, km, values), and micro texture (notes, revision and sheet lines) that may fade below reading size.
- Reading: a label must be fully in frame, and stay there, for as long as it takes to read. Never let text sit in the depth-of-field bands; never cut text at the frame edge in a held shot. Title capitals at least 5.5% of the frame height.
- Moving camera: before plotting a label, check where the camera path takes it. Place it where the path keeps it in frame, print it once the camera settles, or let it be micro texture.
- **Narrated lines** sit on a dark translucent plate in the bottom safe area, in a clean sans (a brand's own sans fits here), appearing and leaving with the voice. The board itself prints only the voice's key words and numbers (a name, a value, a verdict), never whole sentences. Keep board text above the plate.

## 5. Motion quality

- Smooth motion on every frame, each frame a pure function of its number; a brief directional blur on fast moves, never across a cut.
- Kinds of current, told apart only by how the light moves:
  - **Alternating:** short dashes rocking back and forth along the trace over a faint energised line.
  - **One-way:** a continuous lit stream behind a travelling head, with slow streaks inside and an afterglow that dims slowly behind the head.
  - **Step-down:** the trace gets thinner and the dashes smaller.
  - **Water / a second flow:** several parallel streamlines of moving dashes at different speeds, faster in the middle, with short glints.
- Pads flash on arrival (a quick bright bloom, then a steady glow). Components "conduct": the symbol's internal edges glow while current passes.
- **One pulse** (a unit in frames) spaces the arrivals: pads in a row light one per pulse.
- Silkscreen appears only by plotting; copper and pads never pop in. What never moves: the board itself (only the camera moves).

## 6. Camera grammar

Straight-down camera always (a small rotation about the view axis is allowed). Moves:

| Move | What it expresses | Can serve |
|---|---|---|
| Ride the pulse (camera locked to a moving head, head on a third) | following one thing through a system | a delivery route; a signal path; a single order through a process |
| Rise while following (zoom out during the ride until both ends are in frame) | the whole length becomes visible | a distance; a supply chain end to end; a timeline |
| Crash zoom onto a pad | arrival, impact | a deadline met; a package delivered; a test result |
| Locked macro hold | reading, comparing, verdict | two numbers side by side; a spec; a rule |
| Whip along a trace | jump to the next station | the next stage; skipping ahead |
| Matched cut on a centred symbol (same symbol, same screen size, the world around it changes scale) | the same step repeated at every level | step-downs; repeated approvals; hand-offs |
| Plunge through a hole / via, reverse out of another hole | entering a smaller world | into a device; into a building; into a file |
| Continuous pull-out across nested boards | everything was one board | the big picture after the detail; the system behind one object |

Framing rules: the lit subject sits on a third, or dead centre for symbols; at least two layers of detail around it (background copper, vias and routes; foreground motes or depth-of-field blur); the board edge appears only when the whole board is the subject. Transitions: motion-into-motion and matched cuts; no fades, no wipes, no page turns.

## 7. Sound palette

- **Everything is electrical and made by code**: relay clicks (a two-click transient), short filtered-noise bursts, pulse-wave blips, and a faint scratch of grains while silkscreen plots.
- **The light has a voice the ear can follow**: a fluttering hum while it alternates, a steady hum while it streams one way; a component that converts one into the other is heard as the flutter smoothing out. One pitch, low in level, never a tune.
- **Arrivals**: a relay click or a noise burst on the frame a pad flashes. A step-down is a relay one step lower each time. Three weights: the plotting scratch, the relay click, and one deep contactor "thunk" for the main arrival.
- **What stays silent**: the key light, the motes, slow rises. A whip gets a short dull whoosh; a plunge through a via gets a muffled drop in the hum.
- **Ambience bed**: a low mains hum under everything. Outside sounds (water, cicadas, traffic) only dulled, as if heard through a wall.
- **Silence**: drop every tick and click before a verdict and keep only the hum; the verdict's relay then lands alone.
- **Sound across a cut**: the stream's hum runs unbroken through a matched cut while the world changes scale, or the next station's relay clicks a few frames before the whip lands.
- **Voice**: one calm, clear voice for the whole film, numbers and units spoken in full. Each spoken line has one picture action (a pad lights, a stream changes shape, a tag prints) at the moment it is said.

## 8. Native moves

- **Flow becomes current.** A second flow (silver) enters a row of pads; each pad lights on a pulse and amber leaves on its other side. *Fits content like:* raw material entering a factory and leaving as product; requests hitting servers and leaving as responses; donations becoming grants.
- **Pulse-path explainer.** Every stage of a process is a component on one trace; the way the light changes (rocking, streaming, thinning) tells what each stage does. *Fits content like:* an order's path from tap to doorstep; a parcel's sorting hubs; a message across a network.
- **The map is a board.** Geography re-routed octilinear as copper and channels; rivers, lakes and coasts are clearances with via fences; cities are test points; corridors are buses of parallel traces. *Fits content like:* a pipeline across countries; a migration route; the cables under an ocean.
- **Detail callout.** An assembly-drawing circle that shows another place of the same board (or another board) at a chosen scale next to the thing it is compared with. *Fits content like:* the same mechanism at two sizes; a lab prototype beside the plant; yesterday's version beside today's.
- **Nested boards.** A module footprint on a board is a complete board of its own; plunge into it, or pull out through every level in one move. *Fits content like:* a country → city → building → device; an organisation → team → person; a chip → core → transistor.
- **Matched step-down.** The same symbol held centred while the board around it changes scale on each cut. *Fits content like:* voltage levels; approval tiers; zoom levels of a map.
- **Timestamp tags.** Silk frames printing times at two stations, the second tag repeating the first digit-for-digit above its own. *Fits content like:* latency; a race between two routes; before and after.

## 9. Pitfalls of the medium

- **Flat pour.** A board that is all mid-green reads as an empty slide. Fill with real board texture: stitching vias that stay visible at map scale, fences along every clearance, mottling, micro silk, other unlit routes that exist in the subject.
- **Decorative routing.** Traces that mean nothing make viewers ask what they are. Draw only real routes; texture comes from vias and mask, not invented traces.
- **Lines crossing on one layer.** Two traces can't cross on the same copper: use a via to the bottom layer, or route around. A trace may cross a bare channel (a river, a street).
- **Overexposed light.** Wide traces with additive bloom turn into white bars. Cap glow widths and flash radii in screen pixels, keep the amber body and a thin core.
- **Text in the blur or under the frame edge.** Depth of field and the vignette eat the top and bottom bands: keep labels out of them, or turn the blur down in reading shots.
- **Too-fast holes.** A plunge into a hole in under 0.6 s reads only as "darkness". Hold on the hole first, then plunge; come out of another hole the opposite way.
- **One coordinate system over a huge zoom** loses precision and jitters. Nest boards, each in moderate units, and hand the camera from level to level.
- **A label face that isn't monoline** (thick-and-thin strokes, soft curves) stops reading as silkscreen. One stroke width, chamfered corners; proof every title word large.
- **The board edge by accident.** A close shot near the outline suddenly shows the desk. Keep the view well inside the outline, or make the board larger than the shot needs.

## 10. Building it here

- **One SVG board, one wrapper `transform` as the camera** (x, y, zoom, a small roll). Flat by nature: no perspective, no 3D library. SVG redraws sharply at every zoom.
- **Pour and clearance**: the pour is a rect under an SVG `<mask>` in which every trace (as a wide black stroke), pad and channel is punched out. Draw it twice: rim colour with the plain mask, fill colour with the mask strokes a few pixels wider. Laminate weave is an SVG `<pattern>`; mottling is `feTurbulence` with a fixed `seed`.
- **Traces, pads, silk**: a trace is one polyline stroked twice; route with a small helper that turns waypoints into 0/45/90° runs. Pads and vias are small groups with a `linearGradient` sheen. Silkscreen strokes share one filter that punches pinholes (`feTurbulence` → threshold) and softens slightly; plot them with `stroke-dashoffset` from `prog`.
- **Light**: a separate SVG above the board in `mix-blend-mode: plus-lighter` (or `screen`), rendered three times: two `filter: blur(…)` copies and a sharp one. Rocking dashes are `stroke-dasharray` with a `stroke-dashoffset` that follows a sine of the frame; a stream is a dash whose length grows to its head, plus a dimmer trailing copy; a second flow is three or four offset parallels at different speeds.
- **Many small things**: thousands of stitching vias as separate nodes slow every frame. Use a `<pattern>`, or one `<canvas>` layer drawn from the frame number; fade them by zoom before they go sub-pixel.
- **Frame effects**: key light is a large drifting `radial-gradient` in `soft-light`; depth of field is two `backdrop-filter: blur(…)` bands with gradient masks, turned down in reading shots; motes are blurred circles placed by `noise(i, seed)`; `Finish` adds grain and vignette.
- **Motion and overrides**: camera on `prog` with `ease.inOut`, a crash zoom on `ease.out`; pad flashes may use `SPRING.snappy` for the bloom settling. No `MaskRise`, no `Card`, no `Backdrop`, no `SceneFrame` entries, `<SceneTrack sweeps={false} />`. Matched cuts are plain cuts with the symbol at the same screen position and size. A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **The pulse lives in `timeline.ts`**: arrival frames per pad are exported from it, and `Soundtrack.tsx` puts a relay click on each.

## 11. In a product video

- **Green, gold and off-white are the look; the brand's colour is the light.** The main flow glows in it, in place of amber, if it is bright enough to bloom on green. A dark or green brand keeps amber for the flow and appears in the logo and the power LED.
- **The product is a component.** It is a module on the board with its name in silkscreen; what the customer cares about (orders, messages, requests) flows into it as one light and leaves changed. Its stages are real features, one symbol each.
- **The real product is the board's display.** A `Phone` with the real screenshot, or a `Device` kept flat (`float={0}`, no `moves`) for a screen recording, sits on the board as a mounted display module seen from straight above, lit like the rest of the light layer. Crash-zoom onto it, or plunge through a via and come out on it.
- **Silk values are real**: every time, count, distance and unit printed on the board is in `facts.md`. An illustrative figure carries `<ExampleBadge />`.
- **End card**: the board's title block prints the answer: the logo, one line on how to get the product, and a power LED that stays on.
- **Arabic**: silkscreen in a square Kufic face, whose straight strokes and right angles route like traces; words are plotted **whole, word by word**, never letter by letter and with no letter-spacing. Labels anchor on the right of their parts, and the main flow runs right to left where the layout allows. Designators, values and units stay in Latin capitals and digits, wrapped with `isolateNumbers`.
- **9:16**: turn the board: the main trace runs top to bottom, the camera rides the pulse downward, and "rise while following" shows the whole length in the tall frame. The blur bands fall on the top 12% and bottom 22%, so nothing readable sits there anyway; the narrated plate goes just above the bottom band, and nothing important in the right 12%.

## 12. Variation space

You decide the structure, the stations, the scales visited, the camera path, the pacing and which flows get which light.

- Structures: a single packet's round trip and the time it took; three routes raced side by side on parallel buses; one board revealed component by component like an exploded view, ending on the whole.
- Openings: a via drilled through in macro, light rising out of it; a whole board on a desk, the camera diving to one pad; a single silk label plotting itself in the dark, then the copper lighting under it.
- Endings: the last pad lights and the board's power LED stays on; a pull-out to many identical boards in a rack; the title block of the board printing the answer.

---

Adapted for Halal Motion Videos from the `circuit-board` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
