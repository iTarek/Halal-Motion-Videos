# Art Deco

> Black lacquer, engraved gold line and airbrushed geometry: a 1930s poster that moves. Every composition has a centre axis, transitions open or close along it, and light arrives as bulbs switching on one by one.
> References (grammar only): **A. M. Cassandre** posters (giant geometry, steep perspective, airbrush inside hard edges); **Chrysler Building / Rockefeller Center ornament** (setbacks, sunbursts, chevrons); **1930s exposition displays seen from above** (mirrored, rotating kaleidoscope layouts); **engraved gold-on-black title cards** (a gold line drawing itself on black). Never copy a poster layout, a real building, a character or a typeface design.

## 1. Essence, and what it is not

A world built from **gold keylines on warm black**, filled with **airbrushed hard-edged volumes** (Cassandre), organised around **one vertical axis**. Ornament *is* the picture: sunbursts are backgrounds, stepped arches are frames, a dial is a progress bar, a bulb marquee is a reveal. Motion is **mechanical and symmetrical**: things unfold from the centre, doors split along the seam, lights switch on in counted order. Native register: elegance with a clock ticking (an event, a deadline, a launch).

Not a gold-foil slideshow (things move and have volume), not Art Nouveau (no whiplash curves, no flowers), not a flat vector poster (volumes are airbrushed and rimmed), not a 60s title sequence (no silhouettes on flat colour).

## 2. Materials & rendering

- **Ground**: warm lacquer black, never neutral grey-black; a night sky may drift toward a deep emerald near the horizon.
- **Gold is a banded metal gradient** (dark – light – hot – light – dark); slide its offset for a light sweep.
- **The signature stroke**: a dark engraved underline a touch wider than the line (about 1.6 px at 1080 wide), the gold gradient line, and a hairline highlight on top. Optional glow and a parallel twin. Nothing gets a black cartoon outline.
- **Volumes**: hard edge + airbrush: a directional gradient from shade to light inside the shape, one consistent light direction (upper left by default), a thin gold rim on the lit side.
- **Motifs** (sunburst, stepped arch / ziggurat, fish-scale, chevrons, fan, four-point sparkle, speed lines, clock face, dial) are structural (a background, a frame, a transition), not stickers.
- **Perspective is real**: true one-point floors and two-point façades seen through one camera, so dolly, tilt and pan change perspective instead of scaling flats.
- **Characters are deco too**: about 7 heads tall, tapered streamline bodies in long coats, capes and uniforms, faceted lacquer planes, almond or arc eyes, a one-stroke nose, airbrush + gold rim. Give each lead one or two silhouette marks readable at a quarter of frame height.

## 3. Colour logic

- Three constants: **warm black ground, gold line and metal, ivory** for paper, gloves, light and type.
- **One saturated accent reserved for the protagonist** (or the one object the story follows). It is the only large saturated area, so the eye finds it in any wide shot. A cooler jewel tone may carry secondary surfaces, never competing in area.
- **The one-colour exception**: any single element can be drawn in its own colour through the same fill + keyline + glow while everything else stays gold.
- Always write hex colours with six digits (the engine's `rgba()` helper reads only six-digit hex).
- Examples of the triad (accent / jewel / metal): burgundy / emerald / gold; coral / sapphire / pale gold; jade / plum / rose gold.

## 4. Type & on-screen text

- **Faces**: a geometric deco display face for titles (the kind Limelight is), a thin monoline for numbers, sign skeletons and plaques (Poiret One), a geometric sans for labels and narrated lines (Josefin Sans), a high-contrast roman for numerals (Italiana). The style needs its own display face whatever the brand uses; the brand's face can take the labels and narrated lines if it is a clean sans.
- **Titles are architecture**: a stepped gold title bar over an arch or sunburst, optional badge and wings; drawn on in gold, then a sheen sweep.
- **Narrated-line card**: a lacquer bar (about 88% black) with stepped ends like the title bar, a double gold keyline, semibold ivory sans, an optional small speaker icon per voice. It **unfolds from the centre** like every other title, so titles, narrated lines and transitions are one system; the words then appear as they are spoken.
- Numbers carry plot without narration: dials, clock faces, floor medallions, badges.

## 5. Motion quality

- **Characters step**: hold each pose 2–3 frames (about 12 a second); camera, light, bulbs, gold draw-on and sheen move on every frame. A stepped camera reads as stutter.
- **Everything unfolds from the centre**: a point → a hairline → bars open symmetrically → text rises → wings and sparkle.
- **Draw-on follows the pulse**: pick a unit in frames; a gold line grows across a counted number of units and lands on the hit.
- **Bulbs have an ignition overshoot** (about 1.6× flash settling in about 0.18 s) and a relay "chunk"; once a sign is lit, a fast chase may run across it.
- **Mechanical easing**: doors, dials and hands move with firm ease-in-out and a small settle, like machinery; nothing floats.
- **Acted moments get anticipation** and escalation in threes (once, twice, many).
- What never moves: the centre axis of a composition. Symmetry may rotate or open, but it never drifts off-centre.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Symmetric split (two door leaves hinged at the edges; or a revolving-door wipe) | a threshold crossed | a new place; a new chapter; a reveal behind a façade |
| Leaves sliding shut over the live shot | a door closing on a moment | leaving; a decision made; the end of an era |
| Extreme low-angle Cassandre tilt | scale and aspiration | a goal far above; a tower, a rocket, a monument |
| Architectural section (pull out to a cutaway of the whole building) | progress through a structure | climbing, descending, a process in stages; a company's floors |
| Overhead kaleidoscope, mirrored and rotating | parts become pattern | a team, a release, an opening day, a system of parts |
| Push-in on a dial, medallion or clock | the number is the plot | a deadline; a count; a milestone |
| Match-cut on shape (circle → circle, ray → ray) | two places, one rhyme | jumping between departments, cities, eras |
| Low oblique along a sign or marquee | light travelling letter by letter | a name revealed; a launch; a tally being counted |
| Pull back from detail to skyline | where the moment sits in the world | aftermath; a city-wide effect; scale |

Framing: the centre axis is sacred; an asymmetric frame must resolve to it within the shot. At an emotional peak the protagonist fills at least a third of frame height (smaller, the face reads as a prop in the ornament). Transitions: splits, revolves, arch openings, shape matches; never a generic dissolve or slide.

## 7. Sound palette

- **Sounds follow the materials of a 1930s hall**: brass clicks, a bronze clang with chain, iron treads, heels on marble, silver trays, wooden doors with a spring twang, paper flutter, a knife-switch "chunk" with filament hum, relay ticks, an elevator ding.
- **One hit per unit of counted light**: each bulb or letter gets its relay tick on its ignition frame; to accelerate, halve the pulse. A light tick for a bulb, a "chunk" for a whole sign, one heavy bronze hit for the reveal.
- **What stays silent**: the sheen, the drifting sky, slow camera moves. Doors, dials, hands and bulbs always sound.
- **Ambience bed**: a large hall's room tone and the filament hum of lit signs, quiet and unpitched. Something far away is dull and low; it opens up as the camera approaches.
- **Silence**: before the most important sound, drop to one small sound in the scene (a clock tick, wind) and come back with that sound alone.
- **Sound across a cut**: the next room's air and machinery enter a few frames before its doors open.
- **Tonal accents** are short and few: the elevator ding, a soft bell on the payoff, relay ticks that step up in pitch as a count nears its end. Never a tune.
- **Voice**: an announcer of the period, crisp, ceremonial and unhurried; kept clean so every word reads.

## 8. Native moves

A menu: use the ones your story needs.

- **Counted light.** A bulb sign lights one letter per pulse or per event, so the audience can count. *Fits content like:* the countdown to a product launch; the letters of a city name lighting as a train arrives; votes tallied into a winner.
- **Threshold doors.** Every scene change is a door split along the seam. *Fits content like:* the departments of a company; the rooms of a museum; stages of a career.
- **Machine kaleidoscope.** People or objects become a mirrored, rotating pattern that locks into a symbol. *Fits content like:* a team becoming a logo; gears of a supply chain; a crew becoming a clock.
- **Dials carry the plot.** A floor indicator, a clock or a gauge moves instead of narration. *Fits content like:* a fundraising thermometer; the altitude of a climb; a visitor counter on opening day.
- **The architectural cutaway.** Pull out until a building is a section and the protagonist a coloured dot with speed lines. *Fits content like:* data moving through a server stack; a letter through a post office; a skier down a resort.
- **Sheen sweep / draw-on.** Light crosses a gold object on a hit; a gold line engraves itself at the speed of the glide under it. *Fits content like:* unveiling a trophy; a map route; a signature on a treaty.
- **The one colour.** One element keeps its own colour in a gold world. *Fits content like:* the one product among competitors; the patient among doctors; the new idea in an old firm.

## 9. Pitfalls of the medium

- Bulbs spaced along a letter's outline clump on curves (G, S, R) → run them along one centreline per stroke, spaced evenly by length, and join stroke ends that nearly touch.
- A generic cartoon character looks pasted in → characters are deco (§2).
- Fish-scale reads as brickwork → lower half-circles row by row, each overlapping the previous row, plus an inner arc.
- Door leaves over a flat "interior" read as a blank frame → draw only the leaves, closing over the live shot.
- A single gold point on pure black reads as a dead frame → lift the background wedges and the glow slightly.
- Gold everywhere flattens into brown → keep large areas black; gold is line and rim, with one metal object per shot.
- A gradient that bands on a big sweep → add fine grain over the gold, or shorten the gradient.

## 10. Building it here

- **SVG does the drawing.** The gold is one `<linearGradient>` with five stops; a sheen sweep animates its `gradientTransform`. The signature stroke is the same path drawn three times (dark underline, gold, hairline highlight); draw-on is `stroke-dasharray` with `stroke-dashoffset` from `prog`.
- **Airbrushed volumes**: a hard-edged SVG shape or a `clip-path` `div` filled with a directional gradient, plus a thin gold stroke on the lit side. Keep the light direction in one constant.
- **Perspective without a 3D library**: floors and façades are flat planes under one CSS `perspective`, turned with `rotateX` / `rotateY` (`transform-style: preserve-3d`). Dolly, tilt and pan change the stage's transform, so the perspective really changes. Door leaves are two planes hinged at the frame edges with `transform-origin`. Leave out anything that needs true solids seen from all sides; a tower is two or three shaded faces.
- **Bulbs**: circles placed along hand-made centreline paths, each lit by its own start frame; the ignition overshoot is a flash that decays in closed form, `1 + 0.6 * Math.exp(-(frame - start) / (0.06 * fps))` on brightness and radius from the ignition frame on (a 1.6× flash, settled in about 0.18 s; `SPRING.bouncy` would overshoot only about 1.2× and ring for about half a second), the glow a blurred copy.
- **Motion**: doors, dials and hands on `prog` with `ease.inOut` plus a small settle (`SPRING.snappy`); this style leans on the engine's springs only for those settles. Characters hold a pose with `Math.floor(frame / 3) * 3`.
- **Leans on / overrides**: `Finish` for a light grain (it also stops gold banding); `<SceneTrack sweeps={false} />`, because scene changes are doors and shape matches, and the only sweep is the gold sheen. `MaskRise` suits text rising after a bar opens. A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **The pulse lives in `timeline.ts`**: one unit in frames, with every bulb, door and draw-on derived from it; `Soundtrack.tsx` puts each relay tick and "chunk" on the same frames.

## 11. In a product video

- **The brand's colour is the one saturated accent**: the product, or the one thing the story follows. Warm black, gold and ivory are the look and stay; a brand whose colour is already gold takes the gold role and leaves the accent to the product.
- **The product appears framed as architecture**: a real screenshot in a `Device` or `Phone` standing on the centre axis under a stepped arch, with a gold keyline around the frame; or the app's icon as the medallion a push-in lands on. Don't airbrush or gild the screenshot itself.
- **Real numbers go on the dials, clocks and medallions**; each one is in `facts.md`. A dial showing made-up progress carries `<ExampleBadge />`.
- **End card**: the bulb sign spells the product's name letter by letter (in Latin script), the logo sits in a sunburst on the axis, and a stepped title bar carries one line on where to get it.
- **Arabic**: the layout is symmetric, so little mirrors; anything that travels (a chase, a draw-on, a low oblique along a sign) runs right to left. Bulbs light **word by word**, never letter by letter, and titles keep normal spacing. Use a geometric Kufic-style display face for titles and a clean Arabic sans for labels.
- **9:16**: the axis suits the tall frame: stack arch, product and title bar down the centre, turn wide sunbursts into tall stepped arches, and keep the title bar and the narrated-line card out of the top 12% and bottom 22%, with nothing important in the right 12%.

## 12. Variation space

You decide the structure, the characters (or none), the settings, the opening, the ending, the camera path, the pacing, the accent colour and what gets counted.

- Structures: **the exhibition** (five pavilions of a world's fair, one idea of the topic behind each door); **the ocean liner** (three decks from engine room to bridge, a horn per stage); **the trophy night** (nominees as sunburst panels, the winner revealed in light).
- Openings: **the machine room** (gold gears and pistons building to the first hit); **the engraved map** (a gold route crosses a continent before anyone appears); **the telegram** (ticker tape types the premise).
- Endings: **the lights go out** (letters switch off in reverse until one bulb remains); **the dawn** (lacquer black warms to a pale sky); **the poster** (the last shot flattens into a printed poster with a date).

---

Adapted for Halal Motion Videos from the `art-deco` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
