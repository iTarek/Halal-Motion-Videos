# Projection on White Model

> A pure white massing model of a real place stands on a plinth in a dark room, and a projector paints data onto it as light: one layer at a time, falling on the surfaces that face it, spilling a little past the plate. The model never changes; only the light on it does.
> References (grammar only): projection-mapped planning models in city galleries (the dark room, the soft throw, colour only on white surfaces); macro model photography (shallow focus at rooftop height); editorial data graphics (one figure, one label, one source per layer). Copy none of their layouts, typefaces or colours, and never name them in the film.

## 1. Essence, and what it is not

- **The model is real geometry of a real place**: building footprints and heights from the user's own data or open data (section 2), extruded at a stated scale (1:1000, 1:2000…). Nothing on the model is invented or "representative", and no generated image ever stands in for the place.
- **The model is white; data is light.** Colour is never painted into the material: it is projected, so it brightens surfaces that face the projector, fades on walls turned away, stops at the edge of the throw and reaches a little onto the plinth.
- **Layers arrive one at a time**, each with its own gesture of light (a wash, a pop-on, a rising level, a moving sun), and each answers the question the last one raised.
- **A physical room**: house lights, a projector that strikes and switches, a plinth, darkness around it. Lights out is where the data starts; lights up is where it ends.
- **Every number on screen is computed from the same buildings** that are on the table.

Not Isometric Infographic (no diorama or icons), not Low-poly Island (no invented terrain), not Sci-fi Hologram HUD (no wireframes; light lands on matter), not Satellite Briefing (no imagery), not a laser-scan or point-cloud film (no scan lines; light is projected, not measured).

## 2. Materials & rendering

- **Model**: matte white (about `#F3F3F1`), crisp edges; water a darker satin inlay in the base plate; bridges low white slabs; a thin base plate on a dark satin plinth.
- **Light model**: house light = one soft neutral key that gives roofs and walls three or four tones of white, with soft darkening at wall bases on close shots. Projection = light added on top: `colour × (0.42 + 0.58 × how much the surface faces the projector) × throw mask`, weaker on water. Never a picture pasted on the model.
- **Building data is the material.** Ask the user for their own data first (a plan, a city model, survey heights). Then look for the place's open 3D or footprint-with-height data: 3DBAG (Netherlands, CC BY 4.0), PLATEAU (Japan, CC BY 4.0-compatible), city open-data portals (footprints with heights or floors, zoning, plans). Fine: CC0, public domain, CC BY (credited on the end card). OpenStreetMap and Overture (ODbL), CC BY-SA and "no known restrictions" are not CC0: name the terms to the user and ask first.
- **Layers depend on what exists.** Construction years per building are rare; elsewhere they are often missing. Substitute what the data does hold and the medium can still project: heights or floor counts, footprint area, zoning or plan status, a boundary, sun and shadow (always computable). Never invent a year layer.
- **A layer is state, not a picture**: each building carries its attributes (year, height, rank, flags), and every frame decides what colour the projector gives them.
- **The sun is a real direction**, computed from the place's latitude and a real date and time. The projector can trace what the sun does (a shadow footprint) but never fakes a shadow.
- **Finish**: depth of field (stronger on close shots), a soft bloom only on the projection highlights, vignette, light grain.
- **Screen space only for the 2D layer**: readouts, pins, measured lines and narrated lines are placed through the same camera as the model, so they stay pinned to it.
- **Keep the video's `facts.md`** (claim, source, quoted wording, or the measurement method); every number on screen is computed from the same data as the model, never typed by hand.

## 3. Colour logic

- Neutral ground: white model, dark room (near black), dark plinth. The projector's black level is a cool near-black on the plate.
- **One hue family per layer**, chosen for the data: a single categorical accent for "the old / the exception" (e.g. warm amber), a sequential ramp for continuous data (blue → cyan → white for time, violet → magenta → peach for height).
- **A colour may return** only with the same meaning (the "before" colour reused later marks the same set of buildings).
- The sun is warm, its shade is a projected deep blue; data colours are put away when the sun arrives.
- Never colour the model in the house light; never use more than two layer palettes on screen at once.

## 4. Type & on-screen text

- **Roles**: a very light grotesque for the figure (the Inter Tight 200 kind, 11–13% of the frame's short side), a sans for labels (2–3.3%), a monospace for instruments, years and coordinates (the IBM Plex Mono kind, about 2%). A brand's own sans can take the labels; the light figure and the mono stay.
- **Readout**, one per layer: index + layer name, one figure, one label, one source line, a legend bar. It owns the third of the frame on the reading side in 16:9, and the band above the model in 9:16.
- **Pins**: a hairline from a roof or a ground point up to a tag on a dark plate (a title and one smaller line).
- **Identity label** in the top corner, quiet: place, scale, data sources.
- **Narrated lines** sit at the bottom on a soft dark gradient, no box, one line at a time, each word timed to the voice.
- Nothing smaller than about 1.7% of the short side.

## 5. Motion quality

- The camera moves continuously and slowly; it changes speed with the layers, never stops dead.
- **Light is the actor.** Each layer arrives by a soft-edged gesture of light: a wash spreading from the projector's axis, buildings switching on one by one with a short flash, a level climbing every facade, the sun's clock running. No hard line sweeping the table.
- House lights cut fast (a relay, 0.25 s) and return slowly (1 s); the projector strikes with a brief flicker.
- Counters roll while the light moves and land when it lands; measured lines grow from A to B with ticks.
- What never moves: the model, the plinth, the pins' anchors on the model.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| Macro glide at rooftop height, shallow focus | the model is a real object | an opening; a detail that matters |
| Crane up and back | the whole pattern only seen from above | revealing a hole, a cluster, an edge |
| Slow orbit with a rise | the city as a whole, layers accumulating | growth over time; comparisons across the model |
| Boom down to a low angle against black | height, skyline | tall buildings, heights, a single tower |
| Side-on track along a line | a measured distance on the model | a shadow, a corridor, a route, a view line |
| Pull back as the house lights return | the data stops; the object remains | an ending; a reset between topics |

At key moments the subject fills a third of the frame height; pins never sit over the readout. Transitions are light changes on one take (lights out, a layer replacing another, the projector going dark), not cuts, fades or wipes.

## 7. Sound palette

- **The room**: room tone, the projector's fan (a hum with filtered air) rising when the lamp strikes, relays for the house lights, the lamp strike itself (a zap and a thump), the air of a light wash (band-passed noise sliding across).
- **Light as sound**: a short glass tick for each building that switches on, stepping up a little across a layer; an air riser under a climbing level, ending as the tallest roof is reached; a faint steady lamp hiss while a layer is held.
- **Weight**: one deep, soft boom for the heaviest fact and a smaller one for the turn. They are the two loudest moments of the film.
- **What stays silent**: the camera, the orbit, the model.
- **Silence**: the projector goes dark and everything stops but a thin fan hum before the turn; a short suck-out before the heaviest hit. The first sound after the silence is the turn.
- **Sound across a change**: the relay clicks a few frames before the lights go out, and the fan carries unbroken under every layer change.
- **Voice**: calm, short declarative lines, numbers spoken plainly.

## 8. Native moves

- **Lights out, lamp on.** House light, a relay, darkness, the lamp strikes, the first layer arrives. *Fits content like:* a site before and after; a district before a plan is shown; any "now look closer".
- **The hole.** Light only the set that answers a question (built before a date, owned by one party, inside a zone) and let the absence draw the shape. *Fits content like:* an old centre rebuilt after a fire; a flood plain with no housing; land a company owns; a protected zone.
- **Layers by time.** Buildings switch on in the decade they were built, each layer faster than the last, a year counter rolling. *Fits content like:* a new town's growth; a campus master plan by phase; a port's expansion; a developer's portfolio by year.
- **The rising level.** A soft level of light climbs every facade at once; low buildings finish first, the tallest last, the reading rides up with it. *Fits content like:* building heights; sea-level or flood depth; floor counts; a height limit being tested.
- **The sun clock.** A real sun at a real date sweeps the shadows; the projector then traces one shadow and measures it. *Fits content like:* a new tower's shadow on a park; winter light in a courtyard; solar panels' best roofs; a street's daylight hours.
- **The pick-out.** One building or set lights alone while the rest stay dark, with a pin. *Fits content like:* a listed building; the plot for sale; the hospital in an evacuation plan.
- **Lights up.** The data stops, the white model comes back. An ending or a reset.

## 9. Pitfalls of the medium

- **Walls shaded from the wrong side** look hollow: take each wall's outward direction from the way its footprint is wound. **Walls shared by touching parts** flicker in the depth order: skip the stretch hidden below the lower neighbour.
- **A warm room light turns the white model beige**: keep the house light neutral.
- **Contact shading on wide grazing views** bands into dark wedges; keep it for close shots.
- **A low sun lights facades, not roofs**: shoot from the sunlit side or side-on. **Narrow shadows vanish** among all the others: trace the one that matters (fill + edge) and measure it.
- **Hairline scan lines read as laser scanning**: give every projection front a wide soft edge or switch buildings individually.
- **Floating labels**: anchor pins on the tallest part of a building, not on the centre of its footprint.
- **Numbers from mixed sources** (official height vs measured roof): say which on screen ("roof", "measured").
- **Depth order breaks on an orbit** when long buildings are sorted by one point: sort every frame and split long footprints into parts.

## 10. Building it here

- **There is no 3D library; the model is projected by a few lines of maths.** Footprints and heights sit as JSON in the video's folder. Nothing here converts city-model formats: fetch data the film can import as it is (GeoJSON footprints with a height or floor field, or a JSON service for the box you need), or ask the user for it, and keep to the buildings in view. Each frame, one camera function (orbit angle, pitch, height, zoom) turns every roof and wall into a 2D polygon; sort far to near and draw them on a `<canvas>` in a `useLayoutEffect` keyed on the frame (SVG is enough under a couple of hundred buildings).
- **Shading is per polygon**: a white tone from how the face meets the house light, plus the projector term from section 2, with the throw mask as a soft falloff around the plate. The rising level is the lit part of each wall below a height; a pop-on is one building's flag.
- **The sun** comes from a standard solar-position formula. Shadows are footprints pushed along the sun's direction by height ÷ tan(elevation), multiplied onto the plate. That is exact on flat ground; shadows climbing neighbouring walls are left out, so shoot the sun clock from above.
- **Depth of field** is blur in rows: `backdrop-filter: blur()` layers over the picture, masked by `linear-gradient`s, clear at the focus row, strongest in the macro glide. Bloom is a blurred copy of the projection layer under `mix-blend-mode: screen`. Left out: per-pixel focus, soft global shading, reflections.
- **Readouts, pins and measured lines are DOM** over the canvas, placed with the same camera function; counters use fixed-width digits; dates and coordinates go through `isolateNumbers`.
- **Leans on** `prog` with `ease.inOut` for the camera and `ease.out` for light, `Finish` for grain and vignette, `useLayout()` and `p()` for the two formats. **Overrides**: no springs (light eases, nothing bounces), no `Backdrop`, and `<SceneTrack sweeps={false} />`: it is one take, with no `SceneFrame` entry or exit, and if the take is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.
- **Layer cues live in `timeline.ts`**; `Soundtrack.tsx` puts the relay, the lamp strike, the ticks and the booms on the same frames.

## 11. In a product video

- **The white model and the dark room are the look.** The brand's colour is the light of the one layer that means "ours" (our sites, our coverage, the set that answers the question); other layers take the ramps of section 3.
- **It suits products about places** (property, planning, energy, logistics, city services), with real geometry from the user's own site data or open data. With no real place to model, pick another style rather than invent a city.
- **The real product appears as projected light too**: the screenshot thrown onto a white card standing on the plinth, in full colour with a soft edge, read in a held frame; or a pin's tag that opens into a flat `Phone`.
- **Numbers are computed from the model's own data** and listed in `facts.md` with the method. A layer that is only an illustration (sample customers, a possible route) carries `<ExampleBadge />`; never project real people's addresses.
- **End card**: lights up on the white model, the logo projected on the plate or the plinth's front, and one line on how to get it where the readout was.
- **Arabic**: the readout moves to the right third, pin tags open leftward and measured lines grow from the right. Words arrive whole with the light, with no letter-spacing; years and coordinates stay left to right in the mono. A light, plain Arabic sans suits the figure and labels.
- **9:16**: readout above the model (below the top 12%), the model in the middle band, narrated lines above the bottom 22%, pins kept out of the right 12%. Low booms and towers suit the tall frame; wide orbits need a higher camera.

## 12. Variation space

Decide per film: place and scale, which layers in what order, their colours, the opening, the camera path, the ending, the pace.

- **Structures**: a question answered layer by layer; a plan versus today (the plan's buildings switching on in a second colour); one building's story told by its neighbours.
- **Openings**: a macro glide over white roofs; darkness and a single pick-out; the plinth from across the room as the house lights fall.
- **Endings**: lights up on the white model; one last layer left on alone; the camera rising until the model is an object on a table in a dark room.

---

Adapted for Halal Motion Videos from the `white-model` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
