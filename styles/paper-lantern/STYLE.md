# Paper-cut Lightbox

> A layered paper-cut shadow box (纸雕灯) lit from behind: 6–9 sheets of cut card stacked in a shallow box, a warm light glowing through the paper, windows and moons burning through holes, soft shadows falling from each layer onto the next. The camera is a macro lens inside a lamp: it can show the box, or let the paper scenery fill the whole screen.
> References (grammar only): commercial paper-cut shadow-box lamps (纸雕灯 / "shadow box lightbox") for the layer stack and backlight; Lotte Reiniger's silhouette films for the cut-out, jointed figure language (when a film has figures); Chinese 剪纸 motifs (cloud scrolls, eaves, mountains) as one possible vocabulary. Do not copy any specific lamp design, film frame or character.

## 1. Essence, and what it is not

Every shot is made of **one physical object**: a shallow box (a cavity about 1.7 times as wide as it is high, and less than a third as deep as it is wide) holding parallel sheets of cut paper. Two framings are both valid, and a film may use either or both: **box framing** (the lamp's edge or frame is in the picture) and **full-bleed** (the lens is inside the box and the paper scenery fills the screen). The stack, the backlight and the shadows are the same in both. Everything on screen is one of three things:

1. **A paper layer**: a flat cut sheet, one flat colour, fibre grain, a thin warm **rim of light on its top edge** and a **dark band on its bottom edge**. Back layers lighter and cooler, the front almost black: that value ladder *is* the depth.
2. **Light through paper**: a warm, cloudy translucency (pulp mottling), strongest near the light source. Windows, lanterns, trails of light are **holes** that burn and bloom.
3. **Shadows**: a light from above casts **soft shadows** from every layer onto the layers behind. This sells "real paper in a real box"; never turn it off.

The film may step out of the box into the **real world** (the lit lamp on a table, spill light on nearby objects) to say "this is an object someone keeps"; whether, where and how often is a choice of the film.

Not flat paper-cut animation (here: depth, backlight, cast shadows), not shadow puppetry (no single screen, no rods), not a 3D diorama (every element is a flat sheet parallel to the box front).

## 2. Materials & rendering

- **The stack**: 6–9 sheets spaced evenly from the sky at the back to the front sheet, seen through a long lens (a narrow angle, so perspective is gentle). In box framing, sheets are **never larger than the cavity**. In full-bleed shots that travel, a layer may be a long strip that scrolls past, and the sky panel moves with the camera so its edge never shows.
- **A layer** is one flat drawing with holes cut clean through it. Finish on every sheet: fibre grain, a warm top rim and a dark bottom shade, each a few pixels wide.
- **Backlight**: each sheet glows with its own colour × the light's colour × its translucency × a soft falloff around the shot's light point × the pulp mottling. Translucency per layer runs from about 0.9 (far) to 0.05 (front).
- **Lit windows**: a second drawing per sheet (white = light) behind a 0 → 1 "switch on" value; bloom makes them burn. Titles, lights and curtains in front neither cast nor receive shadows.
- **Lens**: shallow depth of field, bloom, a gentle vignette; cut edges stay crisp on the layer in focus.
- **Real-world set** (when used): wood frame, black lining, a dark room, the box's spill of light on real objects.

## 3. Colour logic

- **Back layers bright and translucent, front layers dark and opaque.** Each layer is one flat colour; the ladder of values from back to front is the depth. Never break it (a pale front layer flattens the box).
- **One temperature per stack**, chosen by the scene (cool night, warm interior, violet or green elsewhere). Changing ladder is how the film says "another place".
- **Light is warm** (amber to gold) against the stack, and it is the only saturated element besides one accent.
- **One accent colour** (a seal red, or a single object's colour) marks what the story is about. A second accent only when the story has two sides (one each).
- Examples of ladders: night village: `#0a1330` sky → `#6a86c2` far → `#3f5a92` mid → `#0e1532` front, windows `#ffb862`; desert caravan: `#f0c890` dusk sky → `#c07850` dunes → `#6a3020` → `#1e0e08`, fires `#ffd080`; winter forest: `#dfe6ee` → `#9aaec4` → `#4a6078` → `#101820`, one red scarf.

## 4. Type & on-screen text

- **Text in the picture is paper**: titles, letters and captions are cut strips inside the box, revealed by growing from an anchor edge (reveal the strip, never squash its glyphs), with an optional small seal.
- **Faces**: a brush or calligraphic display face for titles, a hand for handwriting, a serif of medium weight (the kind of Cormorant) for lines. A brand's own face can be cut as paper if its strokes are sturdy; hairlines don't survive a blade.
- **Narrated lines** are quiet: warm off-white serif, soft shadow, fading in just before the line is spoken. Where they sit depends on the framing:
  - **box framing**: under the box, on the dark of the room;
  - **full-bleed**: on the darkest band at the bottom of the scene (the front layer), never over a figure, a lit window or a light. A faint dark band behind the text is allowed when something lit has to sit there.
  - One line at a time, never wrapped: a long line becomes two, split at the comma nearest the middle.
- **Words that appear as paper are not repeated as a narrated line**: never show the same words twice.

## 5. Motion quality

- **Everything moves like paper on a stick**: layers slide, rotate about a pivot, grow in from nothing along one axis ("written out"), or light up. No squash and stretch, no morphing, no bending.
- **Figures are optional.** A film can tell its story with lit windows, vehicles, lamps and objects, and have no figure at all. When it has figures, they are jointed silhouettes: a body sheet plus separate limb sheets anchored at the joint; animate rotation only.
- **Light cues are the big motion**: the source, then each layer's translucency about 12 frames apart, then windows, then a slow flicker of a few percent (two slow sine waves multiplied, so it never repeats visibly).
- **Hard action lands on spoken words**: an object slams, a character flashes, an arc of light grows on its word.
- A tiny hand-held drift on the camera keeps a locked frame alive. Every frame is new; never step.

## 6. Camera grammar

A vocabulary, not a route. The lens is small and the box is shallow: moves are short. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Slow dolly in, nearly frontal | intimacy; being drawn into a place | a memory; a detail that matters; a lit window |
| Slow dolly out | context; loneliness; scale | a figure alone; before/after; the whole place at once |
| Rack focus between layers | attention moving in depth | two people near and far; a clue behind; now and then |
| Lateral travel with depth parallax | journey; time passing | a road trip; a process in stages; a timeline |
| Top-down layer stack | a made thing seen as a craftsman sees it | a recipe; a letter; a map; a product being assembled |
| Pull out of / push into the box | the frame as object; "this is a story told" | a keepsake; a framing device; returning to the present |
| Locked frame with only light changing | waiting; the passage of a day or a night | a night watch; seasons; a city going to sleep |
| Tilt up/down the stack | climbing; falling; sky vs ground | a mountain; a well; hope and weight |
| Near-plane occluder wipe | a curtain between scenes | chapter changes; a memory; a secret revealed |
| Travelling alongside | speed; being carried along (near layers rush past, far layers drift) | a journey by train or boat; a delivery; a migration |

Framing: the story layer in focus, foreground and far layers soft; box edges fully out of frame inside, clearly in frame outside, never half. Transitions: dissolves (0.5–1.2 s), an iris, light off/on, a near-plane curtain whose halves meet exactly. No whip pans, no digital zooms.

## 7. Sound palette

- **Foley is paper and light**: a switch click and a rising shimmer when a light turns on; paper rustle and slide; a card-stock tap; a lid thud; a soft whoosh for curtains.
- **One sound per light cue**: the source gets the click, each window a small tick as it lights. Drifting layers, the flicker and the camera stay silent.
- **Beds come from the scene**: a river, rails, a city's far hum, crickets, snow wind. Quiet, and never a pitch you could name.
- **Tonal accents**: one soft chime on a reveal, a step higher for each later reveal; never two in a row.
- **Silence**: the lamp switched off. All sound but a room tone drops out, then returns with the light.
- **Sound across a cut**: the next place's bed fades in under the dissolve, a second before its picture; a curtain's whoosh runs on into the new scene.
- **Voice**: warm, a storyteller at a table, not an announcer.

## 8. Native moves

A menu: use the ones your story needs.

- **The lamp turns on.** Source, then far layers, then windows light up one by one. *Fits content like:* a shop opening at dawn; a startup's first customer; a stadium before a match.
- **Two windows, one light.** Two lit places sharing one light source (a moon, a lighthouse, a satellite). *Fits content like:* a long-distance friendship; two labs working on the same problem; a sister city pair.
- **Depth as distance.** A stack of ranges or streets makes "far away" visible; travel moves layers at speeds proportional to depth. *Fits content like:* a migration route; shipping a parcel; the history of a river.
- **Paper that writes itself.** A strip grows from its edge on the spoken word. *Fits content like:* a recipe; the terms of a treaty; a child's first word.
- **The box as keepsake.** The camera finds the real lamp in a room, real objects lit by its spill. *Fits content like:* a family heirloom; a product unboxing; a museum object's story.
- **Light burst from an opened thing.** A lid lifts and a soft glow spills out. *Fits content like:* a gift; a discovery; a new idea.
- **Silhouette in a window.** One figure inside a lit frame, or none: a lit window alone is enough. *Fits content like:* someone working late; a portrait of a craftsperson; a patient waiting.

## 9. Pitfalls of the medium

- A cut-out made with a soft or half-transparent mask is a half-cut hole → masks are pure black and white; only shadows are soft.
- Soft shadows on everything make halos → titles, lights and curtains in front get no shadow and take none.
- A glow made from a square picture shows its square edge when it is added to the frame → use a `radial-gradient` that reaches full transparency well inside its box.
- A near-plane curtain whose halves don't meet at their **front edges** leaves a slit of the old shot.
- Sheets larger than the cavity poke through the frame in outside shots.
- **Nothing may carry over from the frame before**: every light level, focus and grade value is computed from the frame number alone. Frames render in any order, so remembered state shows as pops.
- **Light over paper text**: a lamp's glow or a headlight flare over a name board or a card washes the letters out. Keep every lit point clear of text.
- **Lines over a lit window** lose their contrast: frame so the bottom band is dark, or put the faint band behind them.
- Blur and shadow on nine full-frame layers are slow to render → blur only the layers out of focus, and keep the radius modest.

## 10. Building it here

- **There is no 3D renderer here; the box is CSS 3D.** A container with `perspective` (about twice the frame's height) and `transform-style: preserve-3d` holds one `div` per sheet at its own `translateZ`. The camera is a `transform` on the container: `translate3d` for dolly and travel, a few degrees of `rotateX`/`rotateY` for a tilt.
- **A sheet** is an inline SVG in one flat fill, holes cut with `fill-rule: evenodd` or a `mask`; an SVG filter adds fibre grain (`feTurbulence`, fixed `seed`) and the inner top rim and bottom shade (`feOffset` + `feComposite`).
- **Backlight**: over each sheet, clipped to its shape, a `radial-gradient` centred on the shot's light point with `mix-blend-mode: screen`; its `opacity` is that layer's translucency times the current light level. A second low-frequency `feTurbulence` gives the pulp mottling.
- **Lit windows and bloom**: the window shapes in the light colour, their `opacity` the switch-on value, plus a blurred copy on `mix-blend-mode: screen`.
- **Shadows and focus**: `filter: drop-shadow(…)` on each sheet falls onto whatever is behind it; `filter: blur(…)` grows with a sheet's distance from the focus depth, and a rack focus animates that depth. Put filters on the sheets, never on the 3D container, or it flattens.
- **Left out**: true light bouncing between sheets, lens flares, a modelled room. The real-world shot is a flat set: a frame with an inner shadow, a dark gradient room, gradient spill on a table.
- **Motion and overrides**: `prog(…, ease.inOut)` and `ease.out` only, no springs; camera drift from `noise(frame / 40, seed)`; `<SceneTrack sweeps={false} />` with your own dissolves, iris (`clip-path: circle(…)`) and curtain; paper strips grow with `clip-path: inset(…)` instead of `MaskRise`; `Finish` with `grain={0}` and a low `vignette`, only for its vignette. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **Light cues live in `timeline.ts`** next to the scene lengths; `Soundtrack.tsx` puts the click, each window tick and the chime on the same frames.

## 11. In a product video

- **The brand's colour is the one accent**, on the object the story is about, or it sets the temperature of the ladder (a dark-to-light run of its hue). It is never the light: the light stays warm amber, and the value ladder stays.
- **The product's screen is a lit window.** Cut a phone or laptop silhouette into the story layer and let the real screenshot burn through the hole, sharp, on the layer in focus. For the hero moment, dolly in until that window fills the frame and hand over to a `Device` playing the real screen.
- **A physical product is a cut sheet** in its true silhouette and the accent colour; keep its proportions exact.
- **Numbers and claims are cut strips** that grow from their edge on the spoken word; each one is in `facts.md`. Sample data on a strip carries `<ExampleBadge />`.
- **End card**: the lamp on a table, the logo cut out of the front sheet so the light burns through it, and one quiet line under the box saying where to get it.
- **Arabic**: strips grow from their right edge and lateral travel runs right to left. Words appear whole, with no letter-spacing. Choose a face with sturdy joins that could really be cut (a bold Kufi or a heavy Naskh display for titles, a clear Naskh for lines); thin hairline scripts break in paper.
- **9:16**: turn the box upright, so the ladder stacks from sky at the top to the dark front sheet at the bottom. Lit windows and the accent stay in the middle band; narrated lines sit on the front sheet's dark, above the bottom 22%, and nothing important enters the top 12% or the right 12%.

## 12. Variation space

You decide the places, the figures (or none), the ladders, the light source, the framing, whether the real world appears, the opening, the ending and the camera path. Some directions:

- Structures: **one window, one year** (a locked lamp; the scene inside changes season by season, light the only transition); **a vertical stack** (the film tilts down through sky, city, street, underground, each a chapter); **a relay of objects** (a single object passes hand to hand across five small boxes, each a different ladder).
- Openings: **already lit, mid-scene** (a figure walking through a lit street; we learn it is paper only when the camera racks focus); **darkness and one hole** (a single pinprick of light widens into a moon, a door, a window); **top-down** (hands' view of a sheet being cut; the cut sheet slides into the stack).
- Endings: **rack focus to the front layer** until the story blurs into warm light; **a new sheet slides in** at the front, starting the next story; **pull out to the lamp on a table**, its spill on the objects around it.

---

Adapted for Halal Motion Videos from the `paper-lantern` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
