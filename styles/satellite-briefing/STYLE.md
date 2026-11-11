# Satellite Briefing

> Real satellite imagery of a real place, graded down to an analyst's grey, with thin white measurement lines drawn on the ground: a lock-on reticle, outlines, a range line, one reading. One continuous zoom built from stacked imagery plates carries the viewer from orbit to the ground and back, and time can run inside one locked frame.
> References (grammar only): open-source investigation films that annotate satellite pictures (thin lines on imagery, one claim per screen, measuring as the plot); the Eameses' *Powers of Ten* (one continuous change of scale with a readout); NASA Earth Observatory's *World of Change* (one place, time running). Copy none of their layouts, typefaces or icons; never name them in the film.

## 1. Essence, and what it is not

- **The ground is a photograph**: real, licence-clean, georeferenced satellite or aerial imagery of the actual place. Nothing on the ground is drawn, stylised or generated.
- **Two layers, two truths**: the imagery is what the satellite saw; the hairlines are what the analyst measured. Marks are thin, white, sparse, and sit on real coordinates.
- **The grade moves with the story**: orbit in true colour, the analysis layer in grey, colour back only where the story turns.
- **Scale is the camera**: one zoom from orbit to the ground built from nested plates, with an altitude readout and a scale bar from the same camera.
- **One finding per screen**, in the single accent colour.

Not Data Storytelling (a chart on paper), not Sci-fi Hologram HUD (no glowing wireframes or invented chrome), not Blueprint, not Isometric Infographic (real nadir or oblique views, no diorama), not a keynote (no slides, header bars or chapter numbers).

## 2. Materials & rendering

- **Plates**: georeferenced images, each with its longitude/latitude box, nested by resolution (world → region → detail) with feathered edges so finer plates dissolve in as the camera descends.
- **Globe**: at orbit only, the world plate as a disc with a thin atmosphere rim and limb shading. Below orbit the ground is flat plates.
- **Time**: dated plates share one grid. A soft scan front (a satellite pass, never a hairline) swaps them: north → south forward, south → north for a rewind. Growth can run outward from the old edge, ordered by distance from it.
- **The analyst's grade** (one dial from colour to grey): luminance with local contrast and clarity, a shoulder so salt, snow and cloud stay below white, toned blue-black → cool silver up to about 65% grey, a fifth of the chroma. White belongs to the marks.
- **Marks**: an overlay drawn through the same world → screen function as the plates: hairlines of about 0.1–0.25% of the frame's short side (never under 2 px) with a dark halo, dashes for history and claims, brackets, ticks, leader lines. Lines draw on; outlines print behind the scan.
- **Screen space only for instruments** (altitude, scale bar, imagery credit) and the transcript strip. Everything else is anchored to the ground.
- **The claim layer** is a printed map built from the old outline: fine paper grain at any zoom, halftone ink, coast and waterlines, graticule, the name in a serif.
- **Post**: light grain, a vignette, directional blur only on whip pans.

## 3. Colour logic

- Neutral ground: grey, roughly 3–65% in value. White means *measured*.
- One accent (warm, e.g. amber) for the single reading on screen, never decoration.
- A second hue may mark the **claim** the imagery tests (a map, a plan, a promise): flat, cartographic, never used for anything measured.
- True colour is evidence: at orbit, and again only where the story turns (the field that greened, the water that returned).
- No false-colour ramps over the imagery.

Example: ground `#070B0E` → `#A1A7A9`, marks `#F2F5F6`, reading `#FFBE55`, map blue `rgb(46, 112, 206)`.

## 4. Type & on-screen text

- **Roles**: a light condensed grotesque for the reading (the kind of Barlow Condensed, about 9–12% of the frame height); a monospace for instruments and dates (the kind of IBM Plex Mono); a sans for labels in the film's language; a serif only for the claim layer and the title. A brand's own sans can take the label role; the reading and the instruments keep their kind of face, because they are the instrument look.
- **Labels attach to the ground** with a leader line. The reading sits in a third of the frame beside what it measures, label above, source note below ("Landsat, measured").
- **Narrated lines are a transcript strip** low on the reading side: a thin white rule (about 0.2% of the frame's short side), a dark plate fading away from it, flush to the rule, each line on one line (split a long sentence into two). Words arrive with the voice-over's word timings.
- Nothing smaller than about 2% of the frame height in 16:9 (3% of the width in 9:16), the imagery credit included.
- A rolling counter is read at its landing value: give it its hold after it lands, not while it rolls.

## 5. Motion quality

- The camera never stops: distance interpolates in log space, segments ease, holds keep a 2–5% creep or a slow rotation. No frozen ground for longer than a second; the reading and the strip hold still while they are read.
- Marks arrive by being made: a line grows, an outline prints behind the scan, a counter rolls and lands with a small pop, a reticle snaps with overshoot.
- Time changes are scans, never dissolves; their spacing tells the speed, and the camera moves with them (accelerating as the steps shorten, braking on the last).
- Never moves: the ground under its annotations, the instrument positions.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| Oblique orbit, limb in frame | scale, context, distance | an opening; a return; a title card |
| Dive (log zoom, tilt to nadir) | going to look for yourself | a reveal; checking a claim |
| Locked nadir frame, slow creep | evidence, comparison | time running in one place; a measurement |
| Push-in on a point | singling out | one town, one dam, one field |
| Track along a line | travelling a distance | measuring; a river, a road, a route |
| Whip pan with blur | a new subject at the same altitude | the counter-example; "meanwhile" |
| Climb back to orbit | consequence, perspective | an ending; a summary |

At key moments the subject fills a third of the frame height; the reading beside it, the strip low on the reading side, instruments in the corners. In 9:16 the dive is the natural move: the subject takes the middle band, the reading sits under it instead of beside it, and instruments move in from the corners to the safe area. Transitions: scan-line swaps, a map layer switched off, zooming through plates, whip pans, the reticle opening into a title card. No crossfades between unrelated places, no hard cuts inside a zoom.

## 7. Sound palette

- **Telemetry**: FM pings (a lock-on ping worth bringing back), dry ticks on the grid that divide to accelerate, noise scans (rising for a rewind, falling forward), servo whines, a ratchet for a range line.
- **Weight**: every measurement lands on a hit with a short low tone in it. Three sizes: a tick for a label, a thump for a reading, a deep boom with a metallic swell for the finding; the swell is reversed when time runs backwards.
- **What stays silent**: the creep of a locked frame and the ground itself. Sound belongs to the instruments and to what is being measured.
- **Ambience bed**: radio hiss, data chatter and a low orbit rumble, very quiet and never tonal; the place's own air (wind, water, a far ship's horn) sparingly.
- **One wet sound marks the turn**: keep the palette dry (electronics, skin, metal) and let one wet sound (water, glass, ringing metal) arrive where colour returns.
- **Silence**: everything stops and only the thin bed stays; the first sound after it is the turn. A short suck-out (a quarter to half a second) before the heaviest impact makes it land.
- **Sound across a cut**: the place's ambience begins during the dive, before the ground is sharp, and the riser of a dive runs over the whip pan before it.
- **Voice**: a calm analyst, short declarative lines.

## 8. Native moves

- **The map against the photograph.** The camera falls into the printed map of the claim; a scanner bar tears it away and the ground is underneath; the name outlives the page. *Fits content like:* a lake still on maps but gone; a cleared concession forest; a planned city never built.
- **Time rings in a locked frame.** Dated plates scan in one by one; each leaves its outline, the band lost between two rings flashes. *Fits content like:* a glacier's retreat; a city's sprawl; a fire scar season after season.
- **The range line.** Mark the destination, grow a ticked line from A to B, chase the tip while the reading counts up, land on the number, pull back to show the whole distance. *Fits content like:* how far a shore moved; a village to its well; a warehouse to a customer's door.
- **The dive and the climb.** One zoom from orbit to the ground, or back. *Fits content like:* locating anything; a scale reveal; an ending that returns one place to the planet.
- **Colour returns where the story turns.** Only the subject regains true colour inside the grey. *Fits content like:* an irrigated field; a refilled reservoir; a regrown forest.
- **The reticle becomes the frame**: the lock-on brackets open out to frame a title card or the last reading.

## 9. Pitfalls of the medium

- **Licences**: not usable: Google Earth/Maps, Bing, Esri World Imagery, Mapbox Satellite, Planet, Maxar, news photos, AI-generated imagery. EOX Sentinel-2 cloudless is CC BY 4.0 only for 2016 (2018 onward is non-commercial). Raw Copernicus Sentinel data need "Contains modified Copernicus Sentinel data [year]". Public domain or free with credit: USGS Landsat (1972 on, worldwide), USGS NAIP (US, about 1 m), NASA Blue Marble, MODIS, VIIRS. Put a readable credit in the picture and list every image with its source in `facts.md`.
- **Finding imagery for a new place**: search by bounding box and date in a public catalogue (Landsat, Sentinel-2, NASA GIBS for MODIS, VIIRS and Blue Marble); coastlines, lakes and rivers from Natural Earth. OSM (ODbL), CC BY-SA and "no known restrictions" are not public domain: name the terms and ask the user first. Ask for the user's own surveys or map layers when the place is theirs. Never fill a gap with generated imagery presented as evidence.
- **Borders**: draw none unless the story needs them, and ask the user before showing a disputed one.
- **Seams**: strips imaged on other days disagree. One date per strip, each scene gain-matched on stable land, feathered overlaps, holes filled from the same year only.
- **Old sensors**: early Landsat (to 1992) has no blue band and drops scan lines; fill the gaps from same-year scenes and inspect every year at full contrast.
- **Plumes and haze** cross water as bright diagonal bands: swap the scene for another date of the same year rather than painting it out.
- **Edges**: scene rims darken where they were resampled; trim them. Real straight edges (dikes, polders) can read as seams: frame them out or label them.
- **Grey mush at close range**: raise local contrast for that altitude only and dim outside the measured corridor.
- **Water and cloud**: clouds read as features in grey, so use the dry season; measure only the basin you show.
- **People and homes**: this is about places. Never push in on a private home, a face or a number plate.
- **Facts**: every claim goes in the video's `facts.md` (the claim, its source address and quoted wording, or the measurement method with scene names and dates). Measure on the date you show.

## 10. Building it here

- **The plate stack is nested images**: each plate an absolutely positioned image placed by its longitude/latitude box inside one wrapper; the camera (centre, log distance, heading) becomes that wrapper's single `transform`. Feather each plate with `mask-image` and fade it in by distance.
- **No 3D library, so no true globe.** Orbit is the world plate in a circular clip with a radial-gradient limb and a thin rim, turning slowly by sliding the image inside the clip. The tilt to nadir is `perspective` plus `rotateX` on the wrapper during the first part of the dive. Leave out a spinning sphere and real atmosphere.
- **Marks are one SVG overlay** using the same world → screen function as the plates: draw-on with `stroke-dasharray`, the halo as the same path wider and dark underneath. Keep the overlay in screen space, outside the camera's wrapper, so hairlines keep their width at any altitude (`vector-effect: non-scaling-stroke` does not undo a CSS `transform` on a wrapper).
- **Grade and scans**: the grade is a CSS `filter` (greyscale, contrast, brightness) plus a blue-black tint layer, its amount animated; colour returns through a masked ungraded copy of the subject. A time scan is the next plate revealed by a moving soft `mask-image` gradient. Whip blur is an SVG `feGaussianBlur` with a horizontal-only deviation.
- **Motion**: the camera uses `prog` and `ease.inOut` on the log of the distance, plus a constant creep; reticle snaps and counter landings lean on `springAt` with `SPRING.snappy`. Counters use `tabular-nums`.
- **Engine parts**: `Finish` kept light for grain and vignette; `<SceneTrack sweeps={false} />` (the scan is the only sweep); `isolateNumbers` around any range in a label; `ExampleBadge` for anything illustrative. It is one take: no `SceneFrame` entry or exit, and if the take is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.
- **Imagery is prepared before the build**: downloaded, cropped and saved under the video's `public/…/img/`, each plate's box and date written beside it and in `facts.md`. Nothing here stitches, gain-matches or reprojects scenes: fetch each plate as one finished picture for its box and date (a public catalogue's map request for that box), or ask the user for prepared mosaics.
- **Camera keys and readings live in `timeline.ts`**, so `Soundtrack.tsx` lands each ping and hit on the frame its mark arrives.

## 11. In a product video

- **The brand's colour is the one accent**: the reading, and nothing else. If it does not read on grey (too dark, too cool), keep a warm accent for the reading and hold the brand colour for the end card.
- **The grey ground and white marks are the look** and stay, whatever the brand palette.
- **The product appears as an instrument**: the reticle opens into a `Device` showing the real screen recording of the product looking at the same place, or a screenshot sits in screen space like a readout. Keep it flat and unglowing.
- **"Real material" means** public imagery with its credit, what the user uploads, and the product's own screens. Every number is measured or quoted and listed in `facts.md` with its source; illustrative values carry `<ExampleBadge />`; no real customer names or addresses on the ground.
- **End card**: the lock-on brackets open into a frame for the logo and one line on how to get it, over the climb back to orbit.
- **Arabic**: mirror the screen-space layout (reading on the left third, strip low on the right with its rule on the right), never the ground: north stays up. Labels appear whole, never letter by letter, with no letter-spacing, in a light modern Arabic sans; instruments keep monospace Western digits.
- **9:16**: dive rather than pan; reading under the subject; instruments, strip and credit inside the safe area, clear of the top 12%, the bottom 22% and the right 12%.

## 12. Variation space

You decide the place or places, whether there is a claim layer, which dates, the structure, the camera path, the accent hue and where colour comes back.

- **Structures**: a locked time-lapse of one place ending in a push-in; a river followed from source to mouth with a reading at each stop; two places compared at one scale with whip pans.
- **Openings**: a ground-level detail that climbs to reveal its scale; a black frame a scan line paints in; an oblique orbit with a searching reticle.
- **Endings**: the climb back to orbit; a last measurement that lands and holds in silence; the claim layer redrawn to match the ground.

---

Adapted for Halal Motion Videos from the `satellite-briefing` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
