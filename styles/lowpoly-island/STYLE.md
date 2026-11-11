# Low-poly Isometric Island

> A tiny faceted world seen through an orthographic isometric lens: everything is a geometric block, and everything that appears arrives with a bounce and a sound of its own.
> References (grammar only): *Townscaper* (building is the performance; every piece lands with a springy bounce and a sound; pieces sprout small details by themselves); *Monument Valley* (isometric geometry, soft pastel palettes, gradient skies, calm pacing, lots of empty space). Never copy their grids, buildings, characters, UI or typography, and never name them on screen.

## 1. Essence, and what it is not

A miniature world built from **flat-shaded low-poly geometry** (hexagonal tile columns, box buildings with prism roofs, cone and twenty-sided trees) floating in a faceted sea or void, watched by an **orthographic camera** at an isometric angle. No perspective and no horizon: distance dissolves into a **sky gradient fixed to the screen**, so the world looks like a model suspended in colour. **Light, not texture, tells time**: every facet changes colour as the sun moves; in the dark only glowing blocks keep their colour.

Not a voxel game (no cubes-of-cubes, no pixel texture), not a tilt-shift photograph of a real place (no perspective, no photo detail), not a smooth-shaded 3D cartoon (no rounded shading, no soft skin).

## 2. Materials & rendering

- **Geometry** (world unit = one hex tile's corner radius): pointy-top hexagonal columns on an axial grid, `x = √3(q + r/2)`, `z = 1.5 r`. Terrain height encodes material (sand low, grass, hills, rock highest). A thin separate top cap sits over a darker side colour. Leave a small gap between tiles so a dark seam can draw itself.
- **Props** are assemblies of primitives: boxes, prisms, low-sided cylinders and cones, twenty-sided balls, pinched boxes. Glowing parts (windows, lamps) are separate pieces so they can light one by one.
- **Surfaces**: one flat colour per facet, matte, **no textures**. Jitter each tile's lightness a few percent so the ground isn't a spreadsheet.
- **Water** (if any): a mesh of small triangles moved by summed sine waves, flat-shaded so each triangle glints on its own (not too shiny, or facets flash white); a coarser sheet below for zoom-outs; a shallow tint with a faint foam rim wherever land stands; a thin pale ring at each tile's water line for surf.
- **Sky without a horizon**: distant facets blend into a vertical screen gradient; the haze starts far enough back that the horizon band stays in the top third at any zoom. Stars (scattered, twinkling) only where the haze is thick.
- **Contact darkness is mandatory**: a soft dark seam between tiles, under roofs and at the foot of every prop is what makes the blocks sit. Then a very light tilt-shift blur at the frame edges, bloom (stronger at night) and a pastel grade.
- **Light beams** (searchlight, projector, torch): a soft-edged ribbon facing the camera, bright at the root and fading with distance, plus a wider faint halo copy; the surface under it lights up too.

## 3. Colour logic

- **Pastel, low contrast, a handful of hues**: one ground family (sand/grass/earth or its equivalent), one neutral rock, and a small set of wall and roof colours repeated across buildings.
- **Time of day is a keyframed set of colours** (zenith, horizon, deep, shallow, sun colour, intensity, elevation, direction), interpolated. Day is airy and cool; dusk warms the horizon; night desaturates everything toward blue-violet.
- **At night, warm glowing blocks are the only bright things** (windows, lamps, a beam). Keep the sun sideways to the camera in key shots (a low sun behind the target turns faceted water into glare); water receives no shadows.
- No outlines, no black; shadows and contact darkness are the only darks.

Examples of world palettes: sand, grass and coral roofs under a pale-blue day; snow tiles, pine greens and red cabins under a lilac sky; terracotta mesas, sage scrub and turquoise pools under an apricot dusk.

## 4. Type & on-screen text

- Geometric sans faces: a rounded one for narrated lines (the kind Quicksand is), a geometric capitals face with wide tracking for Latin titles (the kind Josefin Sans is). A brand's own rounded or geometric sans replaces both.
- **Narrated lines**: no box; warm white with a soft dark-blue drop shadow, centred low, each phrase arriving with the voice; a small flat-shaded tile icon beside them whose top colour follows the time of day. A line never overlaps the next one or a title.
- **Titles behave like tiles**: pieces rise one by one from under a water line, overshoot and settle (letters in Latin script, whole words in Arabic).
- A text card over the world leaves a gap where the world stays visible.

## 5. Motion quality

- Smooth on every frame. The charm is in the **arrival curves**, not stepping.
- **Rise from below**: a short cubic ease up, then a damped overshoot; a splash ring and spray the moment it breaks the surface. The event time is when it settles.
- **Drop and stack** (floors, roofs, rings): a fast ease-in fall, a damped bounce, and squash-and-stretch that keeps the volume on landing.
- **Pop** (trees, lamps, details): a scale that springs past 1 by about 25% and settles.
- **Life**: mills turn, smoke puffs, birds circle, boats bob with the same wave as the water.
- **Schedule growth on a pulse grid**: at most one piece per smallest slot (a quarter of the pulse), so every event keeps its own sound; accelerate by density (one per pulse → per half → per quarter), not by speeding anything up.
- Never moves: the projection (no perspective, no lens change).

## 6. Camera grammar

An orthographic camera: **the height of the view in world units is the zoom** (a few units for a close-up, the whole world at a dozen or more, hundreds for a scale reveal). A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Turntable (sweep round the vertical axis) | the thing seen from every side | building; inspecting; a product assembled |
| Pure orthographic zoom | scale without perspective | a detail in context; smallness; a world among worlds |
| Elevation change | low (about 20–25°) widens the sky band; high (about 50°) reads as a map | night and stars; a sweep across the whole world; a plan |
| Locked 3/4 wide | the world lives on its own | lights coming on; time-lapse; waiting |
| Tight close-up on one arrival | the bounce and the splash | a key piece; a milestone; a gag |
| Side angle trailing a mover | travel across the frame, never at the lens | a delivery; a departure; a route |
| Lateral truck along a row of tiles | a list, a sequence | steps of a process; a timeline |
| Time-lapse sun sweep, camera still | light is the time machine | a day; a season; history |

Intercut wide and close on the pulse: wide shows the shape growing, close sells the bounce. In 9:16 the island sits in the middle band with more sky above and sea below, and worlds that grow upward use the height. Transitions: hard cuts on the pulse, a time-of-day change, a zoom through the sky; no dissolves, no perspective whip-pans.

## 7. Sound palette

- **Foley follows material**, all made by code: a bubble sweep and a splash with droplet ticks for rising tiles (bigger = lower); a wooden knock plus a quieter bounce knock for floors; a ceramic clack for roofs; a hollow plank knock; a heavy stone thunk; a glass tink; a low whump with an electric hum for anything switching on.
- **Every arrival has its own sound on the frame it settles**, one piece per slot. The sizes give three weights: tink and knock (details), clack and thunk (pieces), one deep thunk with a splash for the piece the film builds to.
- **Life is silent or in the bed**: turning mills, smoke, bobbing boats and the camera make no cues of their own.
- **Beds**: low-passed water with slow swells, birds as short downward chirps, creaking wood, crickets or wind at night. Quiet, never tonal.
- **One signature sound** owned by the world (a small bell-like chime, a far horn) can return once or twice, changed: a short accent, never a tune.
- **Silence**: drop to the bed alone, then a moment of digital zero before the biggest arrival.
- **Sound across a cut**: the night bed creeps in before the light has finished changing, and a splash rings on over the cut to the wide.
- **Voice**: clear and gentle, few short lines; avoid words that sound like something else in the film's subject (in a film about baking, "flour" heard as "flower").

## 8. Native moves

A menu: use the ones your story needs.

- **Building is sounding**: every piece that lands has its own knock; a later sweep can replay them in spatial order as one rippling run. *Fits content like:* a skyline rising floor by floor; a team assembling a product; a garden filling bed by bed.
- **Procedural growth**: tiles rise, floors stack, trees pop. *Fits content like:* a startup's first year; a coral reef recovering; a neighbourhood being planned.
- **Scale by pure zoom**: one object fills the frame, then the world becomes a speck (or the reverse). *Fits content like:* one user among millions; a village on a continent; a data centre inside a network.
- **Turntable**: a continuous rotation around the thing being made. *Fits content like:* a machine being assembled; a museum object; a house renovation.
- **Light as clock**: shadows sweep and facets re-colour. *Fits content like:* a day of a shop; a year of a farm; a shift at a hospital.
- **Glowing blocks in the dark**: lights coming on one by one, a beam sweeping like a clock hand. *Fits content like:* a network going live; a town at nightfall; volunteers joining a cause.

## 9. Pitfalls of the medium

- Tiles with no seam between them fuse into one flat shape → keep the gap and the contact darkness.
- A side column and its top cap sharing one edge flicker as the camera turns → let the cap overlap the column by a hair.
- A beam drawn as a hard-edged cone reads as two white lines → a soft ribbon plus a halo.
- The bottom of the frame shows under the sea on a low angle → extend the sea well past the frame at every zoom.
- Two pieces landing in one slot muddy both sounds → one piece per slot.
- Grain makes flat colour shimmer → no grain.
- Facets sorted in the wrong order pop through each other during a turntable → sort every frame, and treat each prop as one unit.

## 10. Building it here

- **No 3D renderer and no 3D library, and the look survives**: an orthographic, flat-shaded world is only flat polygons. A small function turns each corner by the camera's direction and elevation and drops the depth; every facet becomes one SVG `polygon` (or a path on a `<canvas>`), sorted far to near on every frame. A hex column is a top cap plus its two or three visible sides; a tree is a fan of triangles.
- **Light in code**: a facet's colour is its base colour scaled by how squarely it faces the sun, plus a little sky colour; time of day is a table of colours joined with `lerp`. Tile jitter comes from `noise(i, seed)`.
- **Stand-ins for what a 3D renderer gave free**: the tile gap filled with a darker under-colour, a dark band at each prop's foot and under each roof, and a soft blurred ellipse for a shadow, offset away from the sun. Bloom is the glowing facets drawn again in a blurred layer under `mix-blend-mode: screen`; tilt-shift is two blurred strips at the top and bottom edges under a `mask-image`; the sky is a CSS gradient, with far facets mixed toward its horizon colour.
- **Water** on a `<canvas>`: a coarse triangle grid, each triangle's brightness from a few summed sines of its position and the frame number.
- **Leans on the engine's springs**: `springAt(…, SPRING.bouncy)` is the rise-and-overshoot and the pop (it overshoots about 20%; a feel of `{ freq: 3, damping: 0.4 }` gives the full 25%); the squash is a vertical scale tied to the same spring. Falls use `prog(…, ease.in)`. The camera uses `prog(…, ease.inOut)`.
- **Overrides**: `<Finish grain={0} />` (flat colour shimmers with grain), no `Backdrop`, no light sweep (`<SceneTrack sweeps={false} />`), no `MaskRise` (titles rise like tiles). A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **Leave out**: shadows cast from one object onto another, reflections, and worlds of more than a few hundred tiles.
- **The growth schedule lives in `timeline.ts`** as a list of events on the pulse grid (piece, material, settle frame); the scene and `Soundtrack.tsx` both read it, so each knock lands on its settle frame.

## 11. In a product video

- **The pastel palette is the look.** The brand's colour, softened, becomes one of the repeated roof or wall colours; at full strength it is kept for the one hero piece (a flag, a sign, the lit windows at night).
- **The world is what the product builds**: a shop, a network, a team's year, each landing piece one real thing. The product itself stands in it as a sign or a screen block carrying the real screenshot, laid flat on its facet and glowing at night.
- **To read the interface**, zoom orthographically into that screen until it fills the frame as a flat `Phone` or `Device` (`float={0}`, no `moves`), hold or play the screen recording, and zoom back out to the world.
- **Counts are real**: if floors, tiles or lights stand for something, their number comes from `facts.md`; otherwise the growth is scenery and any figure shown carries `<ExampleBadge />`.
- **End card**: a text card that leaves the world visible beside it; the logo, the name rising like tiles, one line on where to get it.
- **Arabic**: title words rise whole, one word at a time, never letter by letter and with no letter-spacing (the wide-tracked capitals do not apply); a rounded Arabic sans; rows grow and trucks travel right to left.
- **9:16**: island in the middle band; titles below the top 12%, narrated lines above the bottom 22%, nothing important in the right 12%.

## 12. Variation space

You decide the world (island, town, orchard, factory floor, planet), what grows or changes, the palette within the colour logic, the opening, the ending, the camera path and the pacing.

- Structures: **erosion** (a finished world loses pieces one by one, each removal its own falling knock, until only the essential piece remains); **two worlds** side by side trading pieces across a gap until they join; **a year in four seasons** on one fixed world, the palette keyframes carrying the story.
- Openings: **mid-construction** (a busy half-built world, many pieces already dropping); **from above** (a top-down map that tilts down into isometric); **the full world first**, then a push into one tile where the story lives.
- Endings: **a close-up on one final piece** landing, no pull-back; **the world packed away** (pieces fly up and stack into a box); **daylight** (dawn floods the world and the last knock lands on the first sunlit facet).

---

Adapted for Halal Motion Videos from the `lowpoly-island` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
