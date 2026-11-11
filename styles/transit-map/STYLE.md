# Transit Map

> A metro schematic printed on a physical sheet: lines held to eight directions, white stops, black-outlined interchange capsules, water as a flat blue band. The network is drawn on by glowing pen tips while a perspective camera moves over the paper: it rides a tip, drops low where a line dives under water, pulls back through levels of detail and sweeps across the densest knot at a low angle with a shallow focus.
> References (grammar only): the octilinear schematic tradition of metro diagrams (Beck's Underground diagram, Vignelli's New York map), the stamp of a printed cartouche, flatbed and macro photography of maps lying on a table. Copy none of their layouts, typefaces, icons or line bullets; never name them in the film.

## 1. Essence, and what it is not

- **Eight directions only.** Every line segment, river edge and coastline is horizontal, vertical or at 45°; every corner is one fillet radius. A line never wiggles.
- **Growth is drawing.** A line exists as far as its pen tip has travelled; stops light when the tip passes; an interchange appears only when the second line actually arrives, and it lands with weight.
- **Ink on a sheet.** The map is printed on paper with tooth and fibres, lit by one raking light, and the sheet lies on a dark table. The camera sees it as an object: in perspective, with depth of field, and with its edge in wide or low shots.
- **Words are printed.** Station names, callouts and cartouches are ink on the sheet; running numbers live on one small mechanical counter. Every text line holds one language.
- **One map, many scales.** The same sheet serves a single station and the whole network; detail appears and disappears with scale.

Not Data Storytelling (even a time chart is drawn as two lines with stops), not Blueprint (no white-on-blue linework), not Isometric Infographic (the map is flat; depth comes from the camera), not a 3D city map (no extruded buildings, no terrain), not a keynote (no slides, header bars, centred titles or page turns).

## 2. Materials & rendering

**The unit is the grid step, G.** Every coordinate and size on the sheet is given in G. Named stations sit on a 0.1 G lattice and at least 0.7 G apart along a line; a city network spans about 30 × 30 G and the sheet adds margins for the cartouche and any printed panel. **Zoom is given as how many G fit across the frame's short side** at the point the camera aims at.

| Mark | Geometry (G) |
|---|---|
| Line | 0.15 wide, round caps; corner fillet radius 0.34 |
| Thin line (a second rail mode; ferry thread) | 0.07 wide; fillet 0.30 |
| Parallel lines sharing a corridor | each offset ±0.10 from the shared axis (0.20 centre to centre, 0.05 of paper between); three or more: 0.20 steps |
| Stop | white disc r 0.085, ring 0.046 in the line colour |
| Terminus | an ordinary stop; when the end of a line matters (a destination, an end card) a white ring r 0.15 with a 0.06 ink outline |
| Minor stop (generated tick) | white disc r 0.065, ring 0.036; at most one per 0.78 G of track |
| Interchange capsule | the bounding box of every line point at the station, padded 0.13 on all sides; corner radius = half the shorter side (a stadium); white fill; ink outline 0.055 (0.07 for a major hub) |
| River | a band 0.76 wide (0.70–1.0 for a big river) with a darker edge 0.025 each side, round joins; creeks 0.15 with 0.02 edges |
| Sea, bay, harbour, lake | a closed outline on the eight directions, any size, filled with the water colour; the same darker edge, 0.025 outside the fill. Where a ferry runs, at least 0.5 G of open water so its lane keeps water on both sides |
| Tunnel under water | the line dashed 0.16 on / 0.11 off, plus two ink casing lines 0.02 at 55% opacity, 0.05 outside each edge of the line |
| Pen tip | white core r 0.11, ring 0.05 in the line colour, soft halo r 0.8 in the line colour (45% at the centre) |
| Line bullet | rail: disc r 0.25 in the line colour; bus and ferry: rounded square 0.48 with corner radius 0.12. Numeral in a heavy weight, 0.27 (one figure), 0.22 (two), 0.15 (a short word); opening year 0.17 bold ink, centred 0.30 below |
| Vehicle | white capsule 0.40 × 0.14, ink outline 0.026, three windows 0.064 × 0.056 in the line colour; trains and buses at about 2 G/s, boats at 0.85 size and about 1.2 G/s |

- **Interchange shape follows the station.** Points side by side make a horizontal stadium, stacked points a vertical one; lines that cross at one point make a circle r 0.13 with the ink outline, which reads as an interchange next to the 0.085 stop because of its black edge. A capsule never rotates to 45°; a diagonal spread becomes a rounded square.
- **Ink and paper are two layers.** The ink (water, lines, stops, labels) is printed onto the paper by multiplying, so the paper's tooth shows through every colour.
- **Paper**: warm off-white, fixed to the sheet so it never slides under the ink. Three layers: a slow cloud of value about 9 G across with fine detail, a tooth about 2.4 G across, and short fibres 0.02–0.1 G long. Paper value varies by no more than ±3% (fibres darken up to 3% more); ink multiplied by the tooth varies 7–10% and is never flat. Stronger than this and the sheet reads as plaster.
- **Light**: one raking light from one corner of the sheet (say north-west), neutral in colour and fixed for the whole film; it lifts that corner about 7% above the opposite one. A sheen (up to +10%, a narrow streak) appears only when the camera tilts more than about 30° from straight down and is full at 65°. Warmth comes from the paper and the table, never from a tinted light.
- **The sheet edge** sits on a near-black warm table (about `#1B1918`) with a contact shadow that fades over about 0.2 G. Far away the table goes into a warm dark haze so the horizon stays soft.
- **Grade**: a light vignette (up to −24% in the corners), a light film grain; no colour cast, no bloom except the pen-tip halo.
- **Screen space only for the instrument** (the counter) and objects near the lens (a station plate standing on the sheet, a tunnel before the map). Everything else is anchored to the sheet.

## 3. Colour logic

- Neutral ground: warm off-white paper; ink near-black for text and interchange outlines; secondary text in warm grey; water one pale blue with a darker edge, its labels in a mid blue.
- **Line colours carry identity and nothing else.** A real network uses its published colours; an invented one picks hues spaced around the wheel at similar weight, never two neighbours alike.
- **Mode is carried by line form, never by hue.** Each line keeps its colour whatever kind of vehicle runs on it:

| Mode | Line | Stops | Bullet |
|---|---|---|---|
| Metro, suburban rail | solid 0.15 G | stop disc | disc with a figure |
| Another rail mode (tram, light rail, maglev, people mover) | solid thin 0.07 G | stop disc; no generated ticks | disc with a short word |
| Bus, BRT | hollow: 0.15 G wide, the colour as two edges of 0.04 G with a paper core; in wide shots the line widens on screen so both edges and the core stay visible. Light colours (yellow, sand, light green) get a hairline ink rim | named stops only, stop discs | rounded square |
| Ferry, boat | a 0.07 G thread in the line colour on a paper lane 0.25 G wide (never under about 1% of the short side on screen), solid, over open water; it starts at a pier on the water's edge, with at most 0.5 G over land | pier: white rounded square 0.17 G, ring 0.04 G in the line colour | rounded square |
| Under water or underground | the line's own form, dashed, with the ink casing (section 2) | none inside the tunnel | none |
| Walking transfer, in a station complex | a white bar 0.06 G wide with a 0.055 G ink outline outside it (0.17 G overall) from capsule centre to capsule centre, under the capsules; each station keeps its own capsule (one line: the r 0.13 circle) | none | none |
| Walking transfer, through the street | ink dots of radius 0.015 G every 0.08 G between the two stations' own markers, no capsule added; the shared name is printed once, at the station the story arrives at | none | none |

  Dashes mean "below": a ferry is never dashed, a tunnel always is. The ferry's paper lane is what tells it from a tram at any distance; a tram never runs on water without a bridge, which is drawn as ordinary track.
- **Paper inside a line is never painted.** The paper of a bus core or a ferry lane is cut out of the ink layer, so the real paper shows through with its own tooth and light; a paper-coloured stroke never matches it. Cutting removes every ink beneath, so order the ink: water → surface lines (bus, ferry) → rail lines → stops and capsules → labels. A bus core over water then shows paper (correct for a printed map), and a rail line crossing a bus line stays whole on top.
- **Red (or the oldest line's colour) is the story's accent**: the first section, the "you are here" dot, the stamp of a verdict. When the accent sits on a line of the same colour, the dot is r 0.17 G (more than twice the line's width) with a 0.04 G white outline and a pulsing ring, so it never melts into the line. A second, dark neutral (navy) stands for anything compared against.
- Light colours (yellow, lilac, aqua, light green, sand) carry ink inside bullets; deep colours carry white.
- A paper wash (a veil, 60% paper over the sheet) fades the network back when one part must lead; stations under it keep about 20%; never a dark overlay.

Example: paper `#F2EEE5`, ink `#1B1C1E`, secondary text `#4A4740`, river `#BCD6EA` / `#8FB5D6`, river labels `#5F88AD`, accent `#E3002B`, comparison navy `#24346E`.

## 4. Type & on-screen text

- **Face**: one neutral grotesque for words and figures (the Inter kind); a brand's own sans can take its place if it is as plain. A film in one language prints one line per label; a bilingual film prints the video's language above and the second below, one line each, never wrapped.
- **Sizes on the sheet**, in G (main line / second line): hub label 0.30 / 0.17 bold; interchange 0.23 / 0.14 semibold; named stop 0.20 / 0.14 semibold; the second line in warm grey, 0.03 G below. Callout: date figures 0.58 heavy, main line 0.34, second line 0.24. Printed panel titles about 0.6 / 0.37. Cartouche title 0.64 / 0.30, its note 0.24 in grey. Water names 0.22 / 0.17, set along the band.
- **Labels**: a paper-coloured halo (a 0.05 G stroke at 92%) under every label. Placement is automatic: eight candidates around the station's edge (in order of preference: the reading side's far end first, i.e. east for left-to-right scripts, then west, the two east diagonals, north and south, the two west diagonals), each scored against every line of the **finished** network and against labels already placed, hubs and interchanges first. It runs once, before the first frame, so a label never jumps while lines are drawn and lines that arrive later never cross it. A hand preference may override the score for a few stations.
- **Levels of detail by zoom**: minor stops fade in between 20 and 13 G across the short side, interchange names between 17 and 12, named-stop names between 11 and 8; hubs keep their names at every scale and grow when pulled out (up to 1.75×), anchored to the station edge so they grow away from it without changing side. Which names show may also be chosen by shot, never flashed by time. While the camera rides a tip, names leave the frame before they can be read: show them in the held shots that follow, not during the ride.
- **Legibility is measured where the text lands**: size on the sheet × the zoom at that point, foreshortened by the tilt. Text the viewer must read keeps its main line at about 2% of the frame's short side or more; below that, hide it by level of detail or move the camera.
- **Narrated lines are printed callouts**: a bar 0.10 G wide in the accent (or the colour of the line being drawn), then the date in heavy figures and one or two lines; they wipe on from the bar in about 0.5 s, timed to the voice. When a callout must sit over lines it gets a paper-coloured block with a soft shadow, no border.
- **Cartouche**: in one corner of the sheet, an ink bar, the map's name and a one-line note in grey. It is furniture: the camera finds it, it is not a title card.
- **The film's title is printed on the map**: the cartouche (the map's name is the film's title), a line bullet, a station name plate by the lens, or a printed callout. Never a card or caption floating over the picture.
- **The film closes on the whole network**, in top view or a gentle tilt, every line drawn; the end title and any credit are printed on the sheet (the cartouche, or a block in a margin, in the map's own type and ink). A detail the story ends on (a terminus, a first section) comes before this view, not instead of it.
- **The counter**: a dark enamel plate in a top corner (about a third of the width in 16:9, about 60% in 9:16; rounded corners, four screws), rows with a small label, cream rolling number wheels with heavy fixed-width figures, units at the far end. Wheels land only on sourced values; in between they spin blurred so no invented figure can be read.

## 5. Motion quality

- Pen tips move on keyframes that only go forward; a tip may slow on a station and accelerate between them, never stop dead mid-segment.
- Stops pop from 0.6× with a small overshoot in about 0.28 s and a ring in the line colour that spreads from 0.10 to 0.42 G and fades in 0.6 s. Minor stops pop the same way at a smaller size.
- Interchanges scale down from 2× in 0.22 s with an ink ring spreading to 0.64 G. A major interchange falls from above in about 0.4 s (from 3.4× its size, its shadow offset and blurred, sharpening as it lands), then rings in ink and in the colours of the lines that met spread to 1.4–2.6 G in 0.9 s.
- Line bullets spring in with a back ease and carry the opening year; they fade when the story moves past their chapter.
- Vehicles (section 2): white capsules at a constant speed, one per 4 G of track in each direction, only on finished track; boats slower than trains and buses.
- A line that starts from a station already on the map makes it an interchange the moment its tip leaves; start that tip at least 0.5 s after the first line has reached the station, so the capsule's fall reads as an arrival.
- What never moves: the geometry of anything already built, label positions, the paper and its light.
- A still of the style shows the medium in motion: at least one pen tip with its halo or trains on finished track, the counter landed, and a tilted view with depth of field.

## 6. Camera grammar

A moderately long lens (about a 32° vertical view) aimed at a point on the sheet. **Tilt** is the angle from straight down (0° = top view); **heading** turns the view about the vertical; there is never any roll. Focus is always on the aim point; blur grows with distance in depth from it, up to about 2.4% of the short side at its strongest.

| Move | Tilt / zoom (G across the short side) / blur | What it expresses | Can serve |
|---|---|---|---|
| ride the pen tip, aim about 1.5 G ahead of it | tilt 15–30°, heading within ±15°, 4–8 G for a tip at 1–3 G/s, medium blur | building, one step at a time | the first section; a single new line; a route described stop by stop |
| drop low where a line meets water | tilt about 60°, 6 G, strongest blur, eased in and out over about 0.5 s | crossing, risk, a threshold | a river or strait; a border; going underground |
| continuous pull-back with level-of-detail changes | tilt 12° → 0°, 13 → 22 G, light blur → none | growth, scale arriving | years passing; a network filling in; "how big it became" |
| low oblique sweep with shallow focus | tilt 57–62°, heading swinging about 40°, about 11 G, strong blur | density, life, the present tense | the busiest core; everything running at once |
| glide across the sheet to another panel | tilt rises to about 25° mid-move and back to 0°, light blur | changing the question, same object | a comparison chart; a legend; a timeline printed in the margin |
| rise until the sheet edge and the table show | tilt about 30°, about 27 G | the whole, the object | an overview; a chapter break |
| push in to one segment under a paper veil | tilt 4° → 0°, 18 → 8 G, faint blur → none | memory, origin | where it began; "you are here" |
| locked frame | tilt 0°, no blur | reading, judging | any comparison or verdict (hold at least 2.5 s before the verdict) |

When riding a tip, the tip should cross no more than about half the short side per second on screen (a long, fast line means a wider zoom or a slower tip). The camera is never lower than about 25° above the paper (tilt ≤ 65°): lower, and the sheet stops reading as a map. Top views carry no blur; any tilt above 10° carries some.

Framing: the subject sits off-centre with room ahead of a moving tip; the counter owns its top corner and nothing important goes under it. Transitions: match cuts on round shapes (a headlight, a lamp, a coin becomes a station dot), glides across the sheet, hard cuts to a new panel. No page turns, no fades to black mid-film.

## 7. Sound palette

- **Matter first**: a felt-tip glide under every drawing tip; rail clacks in pairs for trains; ratchet ticks for the counter's wheels; a paper slide when the camera glides to another panel.
- **Stops, interchanges, hubs** are three weights of one family: a stop is a short soft pluck, an interchange a pop with a low thump, a falling hub a descending whistle and a low hit. Plucks may step up slightly along a line and settle on the terminus; they stay single plucks.
- **Under water**: everything is low-passed and muffled while a line runs through the tunnel, and opens again on the far bank.
- **The network gets busier, not louder**: each new line adds its own glide and its own trains to the bed of clacks, so density grows with the map.
- **One station chime**, a single soft note, is the film's only tonal signal; it returns at the turns of the story, three times at most.
- **Ambience**: a quiet room tone and paper hush, as if under a desk lamp; never tonal.
- **Silence and overlap**: half a second of near-silence before a verdict; the next line's felt-tip glide starts a few frames before the camera reaches it. The end thins to room tone and the chime.
- **Voice**: an even, well-informed guide in short factual sentences; never an imitation of a real operator's announcements.

## 8. Native moves

- **The pen tip.** A glowing tip draws a line at the camera's pace; stops light behind it. *Fits content like:* a product roadmap; a migration route; a career, job by job.
- **The interchange that falls.** When two lines meet for the first time (a second line arriving, or leaving from a station already drawn) the capsule drops onto the paper with its shadow, then shock rings in both colours. *Fits content like:* two teams merging; a treaty; two rivers joining.
- **The tunnel under the water.** Inside the water band a line turns dashed with a casing; the camera drops low to watch it cross. *Fits content like:* a cable under the sea; a deadline crossed; a launch day.
- **Time lines.** Two networks drawn as two lines over one year axis, stops at sourced milestones, brackets for the spans. *Fits content like:* two companies' growth; two countries' rollouts; a project against its plan.
- **Levels of detail.** Pulling back, minor stops and their names fade first, interchange names next, hubs stay. *Fits content like:* zooming from a street to a city; from a team to a company; from a gene to a genome map.
- **You are here.** The network fades under a paper veil, one segment stays lit, a red dot pulses. *Fits content like:* an origin story; a recap; a call to visit.
- **The odometer.** Rolling wheels that land only on true values: a year, a running total, a time of day, a count. Each landed value must hold for its reading time, so plan about one landing per 2 s of film; more values than that go into printed callouts. *Fits content like:* kilometres, users, stores, sensors.
- **The plate by the lens.** A station name plate stands on the sheet near the camera, out of focus, as the low sweep passes it. *Fits content like:* a place that matters; a stop someone uses every day; a product's home.

## 9. Pitfalls of the medium

- **Off-grid geometry**: any segment not at 0/45/90° breaks the style. Route between points with an automatic bend (straight then diagonal, or the reverse) and check every segment.
- **Labels over lines, or labels that jump**: give labels a paper halo and place them once against the finished network, before the first frame. Placing against what is drawn so far makes labels hop as lines arrive.
- **Parallel lines sharing a corridor** collide: offset each line by ±0.10 G and let one capsule enclose all points of the station.
- **Too much text in wide shots**: hide minor names by zoom, not by time.
- **A flat map**: a top view all the way through reads as a slideshow. Tilt, focus and the sheet edge are what make it an object.
- **Paper too loud**: tooth and fibres stronger than a few percent turn the sheet into plaster or canvas.
- **Mode by colour**: a ferry or bus line in a "ferry blue" breaks colour as identity. Use the line forms in section 3.
- **Real networks**: published colours and station names are facts, logos and branded bullets are not; the film is an unofficial tribute and says so on screen. Check every date and length against official sources; stations are renamed and opening sections are often quoted for a different span.
- **Counters that interpolate** invent numbers. Land only on sourced values; spin between them.
- **A dashed tunnel on a line that grows by dashes**: both tricks use the stroke dash, so cut the path at the tip instead and keep the dash for tunnels.
- **Blur on the tilted sheet itself** is even all over and flattens the 3D; blur in screen space, by rows.
- **Soft ink in low views**: at a steep tilt the far sheet is tiny; let the depth blur cover it and keep small text out of it.

## 10. Building it here

- **The network is data in the video's folder** (stations with names and a tier, lines as lists of stations with offsets and bends on the G lattice, water as bands and areas). Expand each route into an octilinear polyline, fillet the corners, measure its length. Work out once, at module scope or in a `useMemo`, never per frame: the frame each tip passes each station, the frame a station becomes an interchange, and every label's place on the finished network.
- **The ink is one SVG in sheet coordinates** (`viewBox` in G): lines are `<path>`s cut at the tip by length; bus cores and ferry lanes are cut out with an SVG `mask`; the halo is a `radial-gradient`. Lay it on the paper with `mix-blend-mode: multiply`.
- **Paper and light**: a warm `div` with three `feTurbulence` layers at a fixed `seed` (cloud, tooth, fibres); one fixed `linear-gradient` for the raking light; a second gradient for the sheen, its opacity following the tilt.
- **The camera is CSS 3D; there is no 3D renderer.** The sheet sits in a wrapper with `perspective` of about 1.74 × the frame height (the 32° view) and takes `rotateX(tilt) rotateZ(heading) scale(zoom) translate(−aim)`, driven by `prog` with `ease.inOut`. The table is a dark `div` behind it; the contact shadow a `box-shadow`.
- **Depth of field in rows**: on a tilted flat sheet, depth depends only on the screen row. So blur is three or four blurred layers masked by `linear-gradient`s, clear at the aim row and stronger toward the top and bottom, scaled per shot. Leave out per-pixel focus and any true sheen that follows the lens.
- **Leans on**: `springAt` with `SPRING.bouncy` and `ease.back` for stop pops, bullets and the falling capsule; `Finish` for light grain and the vignette; `isolateNumbers` for dates. **Overrides**: `<SceneTrack sweeps={false} />` (it is one sheet, mostly one shot), no `Backdrop`, no `MaskRise`: words are printed and wipe on. Scenes take no `SceneFrame` entry or exit; if the film is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.
- **Phases live in `timeline.ts`** (which path, from where to where, start and end frames, the camera keys); `Soundtrack.tsx` reads the same pass frames for plucks, pops and the counter's ticks.

## 11. In a product video

- **The brand's colour is the accent or the hero line**: the first section, the "you are here" dot, the verdict stamp. Paper, ink and water stay neutral, and the other lines take hues spaced around the wheel.
- **The product drawn as a network**: lines are plans, features or journeys; stations are real steps, screens, cities served or integrations. An invented network says what it stands for in the cartouche's note, and shows real integrations only.
- **The real product is printed on the sheet**: a screenshot as a flat panel beside its station, with a thin ink outline and a soft paper shadow, read in a locked top view. For "the plate by the lens", stand a `Phone` or `Device` with the screenshot on the sheet near the camera.
- **The counter lands only on numbers listed in `facts.md`**; so do opening years and callout dates. A metaphor network that implies quantities carries `<ExampleBadge />`.
- **End card**: the whole network, the logo printed in the cartouche, its note the one line on how to get it; the last terminus ring can be the "get it" stop.
- **Arabic**: the sheet reads right to left: the story's first line starts on the right and grows leftward, labels prefer the west side first, callout bars sit on the right and wipe leftward, the counter takes the top-right corner. Words are printed whole with no letter-spacing; water names follow horizontal bands, never stacked letter by letter. A plain monoline Arabic sans of matching weight suits the grotesque.
- **9:16**: a tilted sheet fills a tall frame well, so ride closer and tilt more; lay the network's long axis top to bottom when 9:16 is the main format. Keep the counter below the top 12% (and clear of the right 12% when an Arabic film puts it on the right), callouts in the middle band, and nothing key in the bottom 22% or the right 12%.

## 12. Variation space

You decide the network (real or invented), what a line stands for, the order of growth, the camera route, which comparison (if any) gets a printed panel, the accent colour and what the counter counts.

What does not vary, whatever the topic:

- **The network is real data, checked.** Use the user's own data first (lines, stations, opening dates, lengths, ridership). Without it, find it for the topic and cross-check every figure in at least two reliable sources: the operator and government open data first, the press next, encyclopaedias only in support. Keep the video's `facts.md`: on-screen claim, value, source, the quoted wording, date checked; plus the figures checked and not used, and why. A figure that cannot be confirmed, or whose sources disagree, never goes on the sheet as fact: drop it, print it with the definition it depends on, or ask the user when the story rests on it. An invented network is only for a topic that is itself a metaphor (a product roadmap, a career): it says so on screen, and any real fact inside it is checked the same way.
- **The map is full enough to carry the film.** One line on blank paper is not a map. The sheet carries enough lines, interchanges, geography and dated states that every shot has something new to show and the wide shots are network, not empty paper; roughly one new event (a line, an interchange, a landed value, a printed callout) every 3–5 s of film. Minimums, by kind of topic:

| Topic | Lines | Named stations | Interchanges | Geography and landmarks | Dated states |
|---|---|---|---|---|---|
| A whole network (a city, a region), 30–60 s | ≥ 5 | ≥ 40 | ≥ 8 | ≥ 1 water body, ≥ 3 named landmarks (a hub, a railway station, an airport, a printed mark) | ≥ 4 years or stages, each with a sourced value |
| One line or one route (a commute, a new line), up to about 20 s | the line + ≥ 3 lines it crosses, drawn with their interchanges | ≥ 8 on the line | ≥ 3 | as above | ≥ 2 (years, or times of day) |
| A topic drawn as a network (a roadmap, a career) | ≥ 4 | ≥ 20 | ≥ 4 | printed regions or bands standing for its domains | ≥ 3 |

  A longer film adds to these rather than holding the same picture longer. When the real network is smaller than the floor (a town with one tram line), draw what is real and widen the topic instead (its buses and ferries, the railway it meets, its history), never invent lines.

- **Structures**: a single line built stop by stop, ending on its terminus; two rival networks growing on one sheet, then compared; a network shrinking line by line (closures) and one survivor.
- **Openings** (the title is printed on the map, section 4): a lamp or coin in close-up match-cut to a station dot; a blank sheet where the first tip starts at frame one, beside the cartouche; a low sweep over a finished map that rewinds to its first stop.
- **Endings** (every one closes on the whole network, section 4): a terminus ring lands, then the camera rises to the full network with the end title printed in a margin; the camera rising until the sheet's edge and the table show; a train leaving the last station, then the full view.

---

Adapted for Halal Motion Videos from the `transit-map` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
