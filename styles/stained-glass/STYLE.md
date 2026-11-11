# Stained Glass

> A leaded coloured-glass window seen from inside a dark stone hall, alive only where the sun touches it: light is the clock, the camera and the story.
> References (grammar only): storybook window prologues in animated features (chapters told pane by pane, at a storyteller's pace); the first computer-animated glass figures of 1980s cinema (glass that cracks and recombines piece by piece); medieval leaded glass of the 12th–13th centuries (colour logic, grisaille, leading). Copy none of their characters, compositions or subjects.

## 1. Essence, and what it is not

- **Cut pieces of coloured glass in dark lead cames**, faces and folds **painted in brown grisaille**.
- Glass has no light of its own: it **glows only when the sun is behind it** and throws a soft coloured copy onto the stone floor; unlit, it is dark and milky.
- Figures move **piece by piece**, rigid and stepped.
- The room is always there: stone, a splayed embrasure, iron saddle bars, a floor that catches light.
- **The craft only, always secular.** The window here belongs to a library, a workshop, a market hall or a railway station, and its panels show trades, seasons, journeys and inventions: civic glass, everyday subjects.

Not vector art with black outlines, not a kaleidoscope or Voronoi filter, not Tiffany Art Nouveau, not mosaic (mosaic reflects; glass transmits).

## 2. Materials & rendering

One formula for everything, so every element sits in the same light:

```
glass   = tonemap( backlight(x, y, time) × transmittance × glass texture ) + weathering haze × room light
surface = albedo × (room ambient + glow spilled from lit panes + point lights)          // stone, lead, iron
floor   = flagstones × (ambient + projected colour patches, blurred + halo)             // perspective or top-down
+ light shafts with dust · bloom (bright glass eats into the lead: the "irradiation" effect)
```

- **Hue-preserving brightness**: pushed too far, cobalt turns pastel. Raise brightness and saturation together, and let only the very brightest thing (a sun disc) burn white while blue stays jewel blue.
- **Unlit panes**: weak sky light + room-lit weathering haze, figures faint but readable. **Lit panes**: backlight about 2–3×, a soft, slightly skewed moving band edge.
- **Pieces**: smooth curved cuts (no deep concave corners). **Every piece is textured**: streaks at a per-piece angle, hue drift (±10%), darker aged edges by the lead, ±9% thickness variation, plus seed bubbles, scratches and thickness clouds fixed to the glass; fade the small features in wide shots or they sparkle.
- **Lead**: near-black, one flat network, thinner on small pieces, round joins, faint grey flange, solder blobs; only where colours meet (one colour = one piece).
- **Grisaille**: tapered trace lines in translucent dark brown; **matting** (stippled wash, graded shade, soft band inside the lead); **scraped highlights** (a thin stroke beside each fold in the piece's own colour: the only highlight transmitted light allows). Patterns (weave, scales, planks) are grisaille arcs and bands.
- **Faces**: almond eyes, heavy upper lid, big pupils, brow flowing into the nose. **Expression lives in brows and mouth**; change it by swapping the face piece, never morphing.
- **Backgrounds**: hand-cut **lozenge quarries** (jittered lattice, shared vertices, a painted motif each); borders of a coloured band with pearls and a white fillet with a running vine.
- **Room**: warm grey ashlar, a lighter embrasure, mullions; floor of **large irregular flagstones**, never the wall's running bond.
- **Floor projection**: blurred, about 20% desaturated, modulated by the stone, haloed, mirrored (the window's top lands farthest into the room). **Shafts**: light added over the room with dust in it, near nothing at the window, peaking about 40% of the way down.

## 3. Colour logic

- Two hues **carry the picture** (one deep, one hot); three or four more only as **small touches**. Example (the medieval logic): cobalt ground, ruby, touches of gold, green, murrey.
- Greenish white glass sparingly (faces, fillets, sky). **Flesh darker than you think**, or backlit faces burn white.
- A story light (candle, lamp, screen) may take a colour no glass uses, so it reads as a source.
- **The sun's colour is the clock**: blue-white dawn, near-white brightest noon, gold afternoon, deep orange dusk (raise intensity rather than redness), weak blue moonlight. Patch length follows sun height.
- Stone and lead take colour only from spilled or projected light.

## 4. Type & on-screen text

- **Narrated lines**: a parchment **banderole** low in the frame (curled ends, gentle sag, thin rule), an old-style book serif (the kind of IM Fell English, about 4% of the frame height) in dark ink. It unfurls from the centre; the words appear only once it is three quarters open, then follow the voice-over's word timings; pad the ribbon well past the text.
- **Titles**: incised Roman capitals (the kind of Cinzel 600) in the stone, dark cut, light lower lip, gilding, revealed by a moving band of light; small lines at least 3% of the frame height. In the glass, text only as grisaille on a white-glass scroll.
- The style needs carved capitals and a book serif; a brand's own serif can take either part, a sans stays in the logo.

## 5. Motion quality

- **Figures step**: hold each pose 4 frames (about 8 a second). Light, camera, shafts and dust move on every frame: stepped light reads as flicker.
- Rigid pieces, each turning about its own joint, free to change which lies on top; long bodies are chains of banded pieces along a spine.
- **Freeze rule**: a pane's figures stop at the moment the light leaves them. Actions land on the pulse (pick a unit in frames and keep it).
- **Crack**: jagged lines race from the impact in about a quarter of a second, bright with light, a short pale flash and a 2-frame shake.
- **Re-leading**: piece groups slide one pulse each with a small outward bump along the lead, each ending in a solder spark; cracks become mending leads.
- Glass never bends or morphs; things appear by being lit, not faded in.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | Expresses | Can serve |
|---|---|---|
| Truck sideways with the band of light | Time passing, the story moving on | a sequence of steps; a day; chapters |
| Locked close-up on one pane | This panel is "now" | a line being read; a character's decision; a detail |
| Pull back to the whole window | The rule, or the whole story at once | learning the system; a summary; aftermath |
| Tilt down the shafts to the floor, then top-down | The picture leaves the glass and becomes light | an event too big for its frame; a dream; a memory |
| Hold through a crack, no cut | The event is the medium breaking | a turning point; a loss; a realisation |
| Slow push toward a small light | Attention narrowing to one source | a discovery; a surprise; hope |
| Tilt up to a wheel window or tracery | Something above the panels governs them | a clock; a cycle; an overview |
| Rack between two panes, one lit, one dark | Past and present side by side | before/after; two lives; cause and effect |
| Low angle along the embrasure, glass raking | The window as architecture, scale | awe; an institution; a long history |
| Return to an earlier framing under new light | The rhyme shows what changed | growth; nightfall; repair |

Framing: subjects big (close-ups about 1.3–2.3× a lancet's width); in a narrow lancet stack figures diagonally; a revealed thing near centre, at least an eighth of the frame width, with glow. In 9:16 one tall lancet fills the frame and is read bottom to top: the tilt replaces the sideways truck, and the floor patch lies below. Transitions: moving light, shafts, a crack, darkness; never a dissolve, wipe or flip.

## 7. Sound palette

- **Foley, material first**, all designed in code: struck glass = inharmonic partials at about 1 : 2.32 : 4.25 : 6.63 : 9.38; a crack = snap + pane thump + a rain of tinkles; lead = a stick-slip creak; glass sliding in a came = gritty band noise + a faint squeal; solder = hiss + tick; iron ticking as it cools.
- **Light has a sound**: a breath of air as the band moves, and one soft glass ring each time a pane wakes. The rings may step a little higher pane by pane and settle on the last; each stays a single short ring.
- **Three weights**: a tick for a piece stepping, a ring for a pane waking, the crack as the one heavy event of the film.
- **What stays silent**: dark panes, held figures, the dust.
- **Ambience bed**: the stone hall itself, a wide quiet air, birds under the roof, far footsteps; reverberant and never tonal.
- **Silence**: a hard stop, tails included, before the crack or the last pane; only the glass's own ring or creak inside it. A single struck-glass ring with a long tail can close it.
- **Sound across a cut**: the hall's air and the creak of lead begin under the scene before, or a pane's ring hangs on over the tilt down to the floor.
- **Voice**: a gentle, even storyteller, few short lines; heavy hits avoid the starts of words.

## 8. Native moves

A menu: use the ones your story needs.

- **Light is time, and the camera.** Only the lit pane is alive; figures freeze when the light leaves. *Fits content like:* the steps of a recipe; a factory's shifts; four seasons of one farm.
- **Glass projects onto stone.** A key scene plays in the floor patch, which stretches as the sun sinks. *Fits content like:* a memory seen larger than life; a sports play replayed as shadows; a data trend drawn by lengthening light.
- **Glass cracks, lead mends.** Pieces slide along the leads into a new picture, leaving scars. *Fits content like:* a company's reinvention; an injury and recovery; an old building restored.
- **A window holds its own light.** At night one pane glows from a source inside the story. *Fits content like:* a lighthouse keeper; a night-shift nurse; a server that never sleeps.
- **The window as a diagram.** Lancets as columns, a wheel window as a dial, the border as a timeline. *Fits content like:* a product lineup; the parts of a cycle; a family tree.

## 9. Pitfalls of the medium

- Hidden leads show through front pieces → each piece covers what lies under it before its own lead is drawn.
- Pastel glass → hue-preserving brightness; darker flesh. Red dusk × blue glass = mud → keep blue alive, raise intensity.
- Voronoi reads as a filter; flat fills read as clip-art → hand-cut lozenges, texture on every piece, heavy grisaille.
- A sharp floor patch looks like a decal → blur, desaturate, stone-modulate, halo. Shafts at full strength at the window wash out the pane.
- Top-down projection is flipped → put the wall at the frame bottom so figures stand upright (mirrored, correct).
- Carved text in a dark wide is unreadable → push in, park a light on it.
- Light that steps with the figures flickers → figures hold, light never does.
- A window that reads as anything but civic → plain architecture, everyday subjects, simple borders.

## 10. Building it here

- **The window is SVG**: one `<path>` per piece with its glass colour and a streak texture (`feTurbulence` with a fixed `seed`, stretched along a per-piece angle); the lead is a network of round-joined dark strokes drawn above; grisaille is translucent brown strokes and a stipple `<pattern>` clipped to each piece.
- **Lit and unlit are two copies of the glass**: a dark, milky one (low `brightness`, less `saturate`, a haze overlay) and a bright one revealed through a `mask-image` gradient whose soft, slightly skewed edge is the band of light. A blurred copy of the lit layer with `mix-blend-mode: screen` gives the bloom that eats into the lead and the glow spilled on the stone.
- **The floor is one CSS 3D plane**, not a 3D scene (there is no 3D library): the lit copy mirrored, laid down with `perspective` and `rotateX`, blurred, slightly desaturated and screened over the flagstones; its length follows the sun's height. Shafts are skewed gradients screened over the room, with dust specks placed by `noise(i, seed)`.
- **Figures** are groups of rigid pieces, each rotating about its own `transform-origin`, posed from `Math.floor(frame / 4) * 4` and frozen with `Math.min(frame, lightLeftFrame)`.
- **Crack and re-leading**: crack lines draw on with `stroke-dashoffset` over 7–8 frames, with a pale flash and a 2-frame shake of the wrapper; piece groups slide with `prog(…, ease.inOut)` and a small bump. No springs: glass and lead do not bounce.
- **Engine parts**: `prog` and `lerp` for the light's path and colour; `Finish` for light grain and its vignette (the hall is dark anyway); `<SceneTrack sweeps={false} />`, because the band of light is the only sweep. Words are revealed by light or by the banderole's `clip-path`, not by `MaskRise`. Scenes take no `SceneFrame` entry or exit; if the film is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.
- **The light's schedule lives in `timeline.ts`** (which pane wakes on which pulse), and `Soundtrack.tsx` puts each ring and the crack on the same frames.

## 11. In a product video

- **The brand's colour is one of the two hues that carry the picture** (the deep ground or the hot one); every other colour stays a small touch. Lead, stone and sunlight keep their own colours whatever the brand palette.
- **The product is the pane that holds its own light**: a real screenshot or screen recording leaded into the window as one clear pane (a flat `Phone` behind a lead frame), glowing from inside while the glass around it is dark, in a colour no glass uses. Keep texture and grisaille off it so it stays readable.
- **The window is the diagram, and its numbers are real**: lancets as the product's features or plans, a wheel window as its cycle, the border as its timeline. Numbers and claims are incised in the stone or painted on a white-glass scroll, each listed in the video's `facts.md`; illustrative data carries `<ExampleBadge />`.
- **Figures and subjects stay everyday**: people at work in long, modest clothes, tools, seasons, journeys; always secular.
- **End card**: the band of light crosses carved capitals in the stone: the logo, gilded, and one line on how to get it; or a last pane leaded in with the logo.
- **Arabic**: the light travels right to left and panes are read right to left. Carved titles in a square or foliate Kufi, the banderole in a clear Naskh, words appearing whole with no letter-spacing.
- **9:16**: one lancet, read bottom to top; banderole and carved lines above the bottom 22% and clear of the top 12% and the right 12%.

## 12. Variation space

You decide the window (lancets, a wheel window, a medallion, a high row of small lights), the subjects, the order of light, opening, ending, camera path and pacing.

- Structures: **a wheel window as a dial** (petals lit in turn like hours, the centre the answer); **one tall lancet read bottom to top** (a tilt up a life or a process, medallion by medallion); **two windows facing each other** (the sun lights one side in the morning, the other in the evening; the floor between them holds their meeting).
- Openings: **the floor first** (only a coloured patch on stone; tilt up to find its source); **a lit window from outside at night** (a figure passes a glowing pane, then we are inside); **the glazier's bench** (a single piece cut and leaded, becoming the first piece of the picture).
- Endings: **clouds cover the sun** (every pane fades to grey at once; one line lingers); **a new pane leaded in** (an empty lancet filled with the last scene); **the camera leaves through the door** (the window small behind, its patch still on the floor).

---

Adapted for Halal Motion Videos from the `stained-glass` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
