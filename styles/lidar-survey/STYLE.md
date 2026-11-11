# LiDAR Survey

> Real airborne laser points of a real place, floating in the dark as a measured cloud; a scan line or a cutting plane passes through them and the points condense into a solid, raking-lit surface, which is then measured with hairline instruments. One designed camera move carries the whole film: the cloud is something you fly through, not a picture you look at.
> References (grammar only): survey and archaeology lidar visualisations (colour as height, the canopy removed); architectural section drawings (a cut, dimensioned); museum film cadence (one held reading per screen). Copy none of their layouts, ramps or typefaces, and never name them in the film.

## 1. Essence, and what it is not

- **The cloud is the data**: every point is a real return at its measured position; points appear, glow, lift away or give way to a surface, but are never moved into a shape.
- **Points become a surface**: a front (scan line, cutting plane) behind which the cloud condenses into a solid model of the same place.
- **Classification is a lever**: ground, vegetation, buildings, water are layers to peel, isolate and recolour.
- **Measurement in hairlines**: one reading at a time, in the accent, attached to what it measures; numbers from the points or an official source.
- **Dark, quiet, exact**: near-black ground, restrained colour, no glow except at the front.

Not a sci-fi hologram HUD (no invented interface: the points are real, sparse where the survey was), not a satellite briefing (photographs from above; here a 3D cloud flown through), not a blueprint, not low-poly isometric, not a glass product render.

## 2. Materials & rendering

- **Points**: small soft squares or discs sized in world units (0.12–0.3 m), never smaller than one pixel, opaque and drawn far to near (additive only for a faint echo layer); colour from height or class, value from intensity; distance fog.
- **Kept light**: positions rounded to a few centimetres, plus a small value each for height above ground, class, intensity and a seed. A few hundred thousand points carry a place.
- **Height above ground** for every return (its height minus a ground model built from the ground-class returns) drives the colour ramp, the cutting plane and the ruler.
- **The solid surface**: a 0.5–1 m grid of the ground or surface model, smoothly shaded, darker in its hollows, under a low raking sun (20–35°), with faint contours and lightened crests. Exaggerating small relief (×2–3) only with an on-screen note; measure on undistorted data.
- **The front**: one plane in the world shared by points and surface; points ahead of it brighten, a thin seam glows behind it and the surface fills in over tens of metres.
- **The cutting plane** (by height above ground): returns above it lift away and fade, a ring glows where it meets the trees, a ruler on the frame edge tracks it.
- **Marks on the surface** (traced features, section lines) stay hairline at every zoom; readings, leaders and charts are a flat overlay placed through the same world → screen function.
- **A survey window**: outside the measured area the cloud stays as dim points instead of ending in black.
- **Finish**: glow only on fronts and seams, a vignette, no grain (points are already fine detail, and grain would fight them).

## 3. Colour logic

- Background near-black with a cold tint; never pure black, never a gradient sky.
- Points: one ramp by height or class, desaturated (deep green-teal → pale; or grey → white); intensity modulates value, not hue. No rainbow elevation ramps.
- The front and seams: one cool near-white; it is light, not a colour.
- The solid surface: warm neutral (stone, clay, plaster), lit; its colour never competes with the accent.
- One accent (amber) reserved for what was found and measured: traced features, the reading, the section line. A second, cooler hue only in a comparison chart.

Example: background `#05080A`, canopy `#1F3F35` → `#5C9A7A` → `#E2F3DC`, ground returns `#C8B38C`, surface `#BDB5A6`, front `#D4FFF0`, accent `#FFB347`, chart green `#83C495`.

## 4. Type & on-screen text

- **Roles**: light condensed numerals for readings (10–12% of the frame height; the kind of face Barlow Condensed Light is); a monospace for instruments, coordinates, counts and source lines (about 2%; the kind IBM Plex Mono is); a sans for labels in the film's language (2–3.5%), which can be the brand's own.
- **Instruments** in one corner: place, coordinates, area, data source, point count, any exaggeration; they change only when the medium does.
- **Readings** in the side third beside what they measure: label, number, source/method line; a leader when the feature is in frame; a rolling counter reports its landing value.
- **Narrated lines**: a transcript strip at the bottom on the reading side (a 2 px rule, a plate fading away from it), one line at a time, split rather than wrapped, each phrase arriving with the voice.
- Nothing smaller than the instrument size.

## 5. Motion quality

- Smooth on every frame; the camera never stops. Its keys (target, distance, heading, pitch) are joined by one smooth curve with no kinks.
- The front moves on an ease, slowest where the subject is; a cutting plane steps on a pulse (eased steps, short holds) so the layers read.
- Points appear behind a front or by height, never by random fade-in across the whole frame.
- Readings land with a small pop; traced features light up along their length in order.
- Never moves: the points relative to each other (no wobble, no noise displacement), the instruments' positions.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| Locked straight-down view with slow push | "this is what a photo shows" | a claim to test; a before; an ending that returns to the map |
| Crane down with tilt to oblique | entering the data; the place has height | the switch from picture to cloud |
| Low oblique close to the cloud (10–20° pitch, 90–150 m away) | volume; things standing up | canopy, buildings, a facade, a cliff |
| Slow orbit | studying, the plane doing the work | a peel; a scan; a held reading |
| Rising pull-back | scale reveal of what was found | a network, a site plan, a corridor |
| Lateral track | travelling a feature | a wall, a road, a pipeline, a coast |
| Push to a section | the detail that proves it | a cross-section, a clearance, a height |

Subject at least a third of the frame height at key moments; readings in the side third in 16:9 and in a band under the subject in 9:16; instruments in a corner; nothing in the transcript strip. Transitions are fronts and planes, never crossfades or hard cuts inside the cloud.

## 7. Sound palette

- **Instrument sounds**: FM pings, fine crackle as points arrive, noise sweeps tied to a front, a descending blip per peeled layer, a ratchet while a counter rolls, a ping when a reading lands.
- **Ticks that divide**: one per pulse, then per half, then per quarter, to accelerate toward a reveal.
- **Weight**: a deep, dry thud for each condensation and cut; a reversed swell into the one main impact.
- **Dry and found**: electronic sounds while the subject is still points; one single woody, organic knock for the found features once the surface exists.
- **Beds**: the place's own ambience (wind in leaves, water, traffic) at the start and the end, arriving before its picture and lingering after it; a thin air bed in between. Never tonal.
- **Silent**: the flight itself, orbits, fog and held points.
- **Silence**: a near silence (air only) before the main reveal; the first sound after it is the impact.
- **Voice**: a calm, plain narrator, short declarative lines.

## 8. Native moves

- **Photo to points.** A scan line crosses an aerial photo; behind it the place is points. *Fits content like:* a site visit before a design; what the satellite misses; a quarry's real volume.
- **The canopy peel.** A plane descends by height above ground, returns above it lift away layer by layer, a ruler tracks it. *Fits content like:* archaeology under forest; a hidden trail; flood channels; landslide scars.
- **Points condense.** A front turns the remaining points into a solid surface; found features light up in order. *Fits content like:* a building scan to a model shell; a cliff to a hazard model; a street to a vehicle clearance model.
- **The section.** A plane crosses one feature; the profile glows and a dimensioned chart of the real returns hangs beside it. *Fits content like:* a levee's height; a bridge's clearance; a road cut.
- **The window.** The measured area is a stage inside the unmeasured cloud. *Fits content like:* a parcel; a corridor; a site boundary.
- **The regrowth.** The removed layer returns as a faint echo over what was found. *Fits content like:* an ending; a clearing before/after; a buried pipe under a street.

## 9. Pitfalls of the medium

- **Real data only**: the user's own scans come first (a site survey, a drone or terrestrial scan, a building model). Public sources: USGS 3DEP (US), OpenTopography (many collections, licence per dataset), AHN (Netherlands, CC0), and national portals such as England's Environment Agency LiDAR, France's IGN LiDAR HD, Spain's PNOA-LiDAR, Finland's NLS and New Zealand's LINZ; read each portal's terms. Take a subset by box, not whole tiles. Never stand in a generated or invented cloud for real evidence.
- **Licences**: public domain, CC0, CC BY and attribution-only government licences are fine, with credit. Share-alike, "no known restrictions" or non-commercial terms: name them to the user and ask first. Never commercial scans or map providers' 3D tiles.
- **Facts**: every reading goes in the video's `facts.md` (claim, source URL and quoted wording, or the measurement method).
- **Coordinates**: public copies are often in a web-map projection: convert to a local east/north/up frame first; check heights against known ground.
- **Leaf-off vs leaf-on**: leaf-off lidar reaches the ground but its canopy is sparse; say which season each layer is.
- **Classification is the provider's**: the "unclassified" class mixes vegetation, buildings and noise; drop the noise classes; finish a cut slightly below ground level or low vegetation stays as stripes.
- **A dense cloud reads as a flat carpet** from afar: go close and low for volume; let the distance fog out.
- **Scan striping** is real texture; don't frame a reveal on it at grazing angles.
- **Traced features are interpretation**: say "traced", keep the tracing in a data file, snap it to the data, leave faint candidates out.
- **Privacy**: crop out houses and yards; keep the survey window on public or uninhabited land.

## 10. Building it here

- **No 3D renderer and no 3D library: the cloud is a 2D `<canvas>` drawn from the frame number.** Load a thinned point file from the video's `public/` folder (typed arrays: x, y, z, height above ground, class, intensity; fetched once through `asset(…)` with the render held by `delayRender` until it is in), project each point with a small camera function (turn by heading and pitch, divide by depth) and draw it as a 1–3 px square, far to near, coloured from a ramp table and dimmed by fog. Up to a few hundred thousand points per frame is practical.
- **Fronts and planes are tests, not animation**: for each point, its distance to the front plane or its height against the cutting plane sets brightness, alpha and lift. The plane's position comes from `prog(frame, start, dur, ease.inOut)`. Points keep their positions.
- **The solid surface** is the ground model as a height grid, drawn as rows of small shaded quads from far to near on the same canvas; shade each cell once from its slope against the low sun and darken hollows a little. It shows only behind the front.
- **Glow**: a second canvas holding only the front and seam points, blurred, under `mix-blend-mode: screen`. Vignette from `<Finish grain={0} />`.
- **Overlay**: readings, leaders, rulers and section charts are SVG and text placed with the same projection function; counters use `fontVariantNumeric: "tabular-nums"`; the only spring in the film is the small pop of a reading (`springAt`, `SPRING.snappy`).
- **Overrides the engine defaults**: no `MaskRise`, no `Backdrop`, no grain, no light sweep (`<SceneTrack sweeps={false} />`), no cuts: one scene carries the flight.
- **What this engine does not do**: decode raw survey tiles. The cloud must arrive already cut to the site and thinned (from the user, or prepared beforehand); without a real cloud, choose another style rather than fake one. Leave out full-density clouds and soft shadows.
- **Timing lives in `timeline.ts`**: front sweeps, plane steps and reading frames are exported there, and `Soundtrack.tsx` ties each sweep and ping to them.

## 11. In a product video

- **This palette is the look**: near-black, a desaturated ramp and a cool white front stay. The brand's colour is only the **accent**, in place of the amber: what was found, the reading, the section line. Lighten a dark brand colour until it reads as light on the dark ground.
- **Fits products that make or use measured places**: surveying, drones, construction, mapping, property, a scanning app. The cloud is the product's own output or the customer's site, uploaded under Materials.
- **The product's screen is a reading**: a flat `Phone` or `Device` plate (`float={0}`, no `moves`) in the side third with a hairline leader to the feature it shows. Or open on the product's own map screenshot and let the scan line turn it into points.
- **Readings are real**: measured from the points or quoted from `facts.md`, each with its source or method line. A stand-in site says so in the instruments and carries `<ExampleBadge />`.
- **End card**: the last reading holds while the points fade to the instruments; the logo takes the reading's place with one line on where to get it.
- **Arabic**: readings move to the left third and the transcript strip starts from the right; labels appear whole, never letter by letter, with no letter-spacing; only digits roll. Coordinates and counts stay in Latin digits in the monospace. Use a light, plain Arabic sans beside the condensed numerals, and wrap ranges in `isolateNumbers`.
- **9:16**: fly features up the frame instead of across it; readings sit under the subject; instruments below the top 12%, the strip above the bottom 22%, nothing on the right 12%.

## 12. Variation space

You decide the place and dataset, which classes to peel or keep, the fronts and their directions, the camera route, the readings, the accent within the colour logic, and whether a photo or a map opens the film.

- **Structures**: a corridor flown end to end with three readings; two surveys of one place (erosion, construction) swapped by a front; one object scanned, cut and dimensioned.
- **Openings**: a black frame the scan paints in line by line; a street-level photograph that dissolves into its own returns; a top-down map that tilts up into the cloud.
- **Endings**: the cloud pulls back to show the whole survey tile; the removed layer returns as a faint echo; the last reading holds while the points fade to the instruments.

---

Adapted for Halal Motion Videos from the `lidar-survey` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
