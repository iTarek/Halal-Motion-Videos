# Sci-fi Hologram HUD

> An object is scanned into a glowing wireframe. Target boxes lock onto its parts; each opens in a local exploded view, a leader pulls out, and its number rolls from garbage glyphs into the real value. It may light up, once, into a solid hologram.
> References (grammar only): the *Iron Man* / *Avengers* HUDs (target boxes, callouts, rolling numbers, layered depth); the *Oblivion* interfaces (one colour, hairlines, space); CAD exploded views. Copy none of their layouts, icons, fonts or colours.

A **scene style**: it does a practical job (a spec walkthrough, a teardown, a loop screen) for any object with parts. See §12 for the jobs.

## 1. Essence, and what it is not

The subject is always a **line wireframe made of light** above a round projector pad on a near-black stage, never a rendered object. Everything reads as *scanned data*: a scan plane grows the model, parts pull apart along their assembly axes, numbers are *computed* on screen.

Three depth layers are always present: a **background dot grid** (slow parallax), the **subject** with its pad and floor, and the **foreground HUD** (corner brackets, rulers that parallax faster, status text).

Not a type-driven keynote, not a drafting sheet, not a product render. The subject stays a wireframe; it may gain translucent faces once, and even then the lines stay on top.

## 2. Materials & rendering

- **Stage**: near-black tinted by the hue, a radial lift behind the subject, a fading dot grid, a strong vignette.
- **Projector pad** in true perspective: concentric rings (one bright, one dashed), ticks, faint rays; it rotates slowly and spins with any turntable move.
- **Wireframe**: additive hairline strokes (a little over 1 px at 1080 wide) in a few alpha levels set by **depth fog** (near bright, far about 25%), plus two soft glow layers under them.
- **Hot edges** (near-white of the hue) only for what matters now: the scan front, inner pieces when their part is opened, a light wave, a part being pinged.
- **Real CAD topology**: tubes are rings plus longitudinal lines. **Every part is physically connected**: a floating piece is noticed first.
- **Solid hologram**: faces filled by a **Fresnel** falloff (edges of a form brighter than what faces the lens) × a scrolling **interlace**; lines thicken as it ignites; a light wave climbs the model. A **beam** from the pad (one shape) with faint rays and dust.
- **HUD furniture**: corner brackets, parallaxing rulers, subject // mode on the reading side at the top, a live status line opposite, telemetry at the bottom.
- **Text never sits on the wireframe**: every text block has its own **dark plate** (translucent near-black, 1 px border, corner ticks); the camera still keeps the subject clear of text.

## 3. Colour logic

- **One cold hue plus one warm accent**, both parameters (e.g. mint/orange, violet/lime, ice-blue/red; choose from the subject).
- The hue carries lines, HUD and fills. The **accent is spent on locked values only**: a number turns accent-coloured at the frame it becomes true. Nothing else ever uses it.
- White is heat: near-white edges and one-frame flashes mark what is active. Everything at rest sits in the hue's alpha levels.
- One object may keep its own colour (the single-colour exception), for a brand mark or a real screen, never for decoration.

## 4. Type & on-screen text

- A squared, condensed technical sans (the kind of face Rajdhani is), all caps in Latin script: a light weight for big numbers and the product name (wide tracking), medium or semibold for labels. A monospace (Share Tech Mono's kind) for micro data: coordinates, counters, zoom. The brand's own face may set the product name; the numbers need tabular digits whatever the face.
- Numbers are **monospaced** so rolls never jitter; the decimal point is a small square (a glowing "." reads as a comma).
- **Narrated lines are HUD**: a dark plate with corner brackets and "voiceprint" bars moving with the real voice, near-white medium weight, bottom centre, each phrase appearing as it is spoken.
- The title is part of the scene (no title card): the name rolls in like a value, then code, category and tagline.

## 5. Motion quality

- **Smooth on every frame.** Only glyph scrambling steps: a new glyph every frame or two.
- **One pulse** (say 15 frames) sets the film: every lock, every value turning true and every dock lands on it.
- **Target lock**: oversized, rotated 45°, faint; snaps to fit in about 6 frames (cubic ease-out), flashes white for 3 frames on the pulse.
- **Explode** along each piece's assembly axis: the shell slides *along its own axis*, the contents stay in place and glow. Open over one or two pulses, close fast.
- **Leader**: anchor ring → diagonal → horizontal to the card in about half a second. **Rolling value**: characters lock one by one from the last digit to the first and turn accent on the pulse with a one-frame flash.
- **Chip dock**: a finished value slides into a side rail and stays until the end.
- **The camera follows the box**: cubic ease, starting *before* the next lock, **real motion blur** only inside the whip (a few ghosted sub-frames); HUD stays sharp.
- **No cuts or fades inside the scene**: only the scan plane (scanning in or erasing) and a loupe iris. A **glitch** of three frames at most once, on the biggest change.

## 6. Camera grammar

An orbit camera (yaw, pitch, distance, narrow field of view) with a screen position for the target, so the subject can sit beside text. A vocabulary, not a route. Opening and ending come from the topic.

| Move | Expresses | Can serve |
|---|---|---|
| High 3/4, slow orbit craning down | Examination; a scan plane reads as an ellipse | a scan-in; a survey |
| Top-down plan view | Layout, order | a parts inventory; an assembly sequence |
| Eye-level profile, locked | The object as it stands in use | a height; a before/after |
| Push-in, then drift, 3/4 | This part matters; internals come towards the lens | the key spec; a flaw |
| Whip following the target box | Attention jumps to the next part | a list of parts |
| Orbit around a part's own axis | Axial structure only reads in rotation | rotors, stacks, hinges, lenses |
| Lateral dolly along a long part | Length, a path | a beam; a cable run |
| Pull back + loupe (frame in frame) | Where (wide) and what (loupe) | small parts; a sensor |
| Crane to eye level or back up | Status change: the object stands up or settles | a transformation; scale |
| Turntable 360° | Every side | a whole object; a symmetry |
| Nearly static, slow dolly | Reading time without a dead frame | a spec sheet; a checklist |

Framing: the subject is at least a third of the frame height at every key moment. In 16:9, cards on one side, the chip rail on the other, narration bottom centre, a loupe above it: never colliding. In 9:16 the subject takes the middle band, cards open below it and chips dock in a row under them. Shorten explode vectors rather than fly a piece into text.

## 7. Sound palette

- **Foley follows the material.** Light = short sine and FM blips; machines = servo slides, pneumatic puffs, hydraulic hiss, metal tinks; a lock = thump + clack + a two-tone beep; a rolling value ticks every frame or two until it locks.
- **Every information event has a sound on its frame**: scan front, lock, explode, leader, value turning true, chip dock. The orbiting camera, the pad's turn and the parallaxing rulers stay silent.
- **Three weights of lock**: a tick for a minor callout, the thump-and-clack for a part, and one deep downward glide with a wide noise swell for the solid hologram, used once.
- **Density follows information**: sparse during reading holds, a layer more per part opened, everything thinning as the last value docks.
- **Ambience**: a low projector hum and room tone, felt more than heard.
- **Silence**: one pulse of **true digital silence** before the biggest change, with nothing in it, not even a UI blip or the hum.
- **Sound ahead of the picture**: the servo slide of an explode begins a few frames before its lock box lands, and the whip's swish starts while the last value is still docking.
- **Voice**: calm, confident, a little cool. Blips and foley drop to about half under it; the lock transients may poke through.

## 8. Native moves

Each move serves information, not story. A menu: use the ones your film needs.

- **Scan growth = "this is real data."** *Fits content like:* a coffee machine; a satellite; an architectural model.
- **Target lock = "look here now."** The box is the camera. *Fits content like:* a car's sensors; a laptop's ports; a robot arm's joints.
- **Local explode = "why the number is true."** *Fits content like:* the burr set of a grinder; the layers of a running shoe sole; the elements of a camera lens.
- **Rolling digits = the payoff.** *Fits content like:* a brew temperature; a tolerance in microns; a price.
- **Chip accumulation = reading time.** *Fits content like:* 3–5 facts that must all be read.
- **Loupe = two scales at once.** *Fits content like:* a screw inside a watch; a chip on a board; a valve in an engine.
- **Solid hologram + beam = "the whole is ready."** Once, if at all. *Fits content like:* a launch reveal; a finished assembly; a v2 replacing v1.

## 9. Pitfalls of the medium

- Target boxes balloon → fit the box to the part's rest pose, leave inner pieces out of it, and give long attachments (cables, antennas) no box.
- Long diagonal leaders point at the wrong part → anchor the ring on the part's body and flash the part.
- Two parallel boxes moving don't read as an explode → the shell slides on its axis, the contents stay and glow.
- A part built from generic boxes doesn't read as that part → give it its characteristic silhouette.
- Voice masked by foley → drop the foley under the voice too, and hold the drop through the gaps between words.
- UI blips inside a silence break it → check every cue against the silent window.
- A whip that starts on the frame of the next lock plays as a hard cut → start it during the previous hold.
- Lines turn to mush where many overlap → the glow is additive, so lower the alpha of far lines before adding glow.

## 10. Building it here

- **No 3D renderer and no 3D library, and none is needed**: the model is a list of 3D points and edges in a data file. A small function rotates them by the camera's yaw and pitch and divides by depth; the result is drawn as SVG `<line>`s (or on a `<canvas>` from the frame number). Depth fog is the stroke opacity from each edge's depth.
- **Glow**: the same lines again, blurred (`filter: blur()` or `feGaussianBlur`) under `mix-blend-mode: screen`. Solid faces are SVG polygons whose opacity comes from how far each face turns from the lens, under a `mask-image` of moving stripes for the interlace.
- **Scan plane**: a `clip-path` on the wireframe that rises with `prog(…, ease.inOut)`, plus a bright ellipse at its edge. Explode: add `axis × amount` to a part's points before projecting.
- **Motion**: `prog` with `ease.out` for locks and whips. No `springAt` on boxes, leaders or the camera: a lock snaps and stops. Motion blur in a whip is three or four copies of the wireframe at fractional frames, each at low opacity.
- **Rolling values**: glyphs chosen by `noise(frame + i, seed)` until each digit's lock frame; `fontVariantNumeric: "tabular-nums"`. The voiceprint is `Waveform` with the voice line's `src` and `at`, so the bars follow the real audio.
- **Engine defaults**: keep the vignette (`<Finish grain={0} />` or a very light grain); leave out `Backdrop` (the stage draws its own dot grid) and the light sweep (`<SceneTrack sweeps={false} />`); one scene carries the whole film, so there is little for `SceneTrack` to cut.
- **The pulse lives in `timeline.ts`**: lock frames, value frames and the silent window are exported from it, and `Soundtrack.tsx` places each cue on the same frame.

## 11. In a product video

- **The brand's colour takes one of the two roles**: the hue if it is cold (blue, green, violet), the accent if it is warm. Choose the other to contrast, and keep the logo as the single-colour exception.
- **A physical product** is the wireframe itself, modelled from its real silhouette and parts.
- **An app or a website** is a wireframe phone or laptop above the pad whose screen is the **real screenshot**, kept in its own colours as the exception. Target boxes lock onto real parts of that screen (a button, a total, a list row); the "explode" pulls the interface's layers apart in depth; leaders carry out the real values. A `Device` screen recording can play on that plane for one hero interaction.
- **Every rolled number is a real one** from `facts.md`, with its unit. A number that only illustrates carries `<ExampleBadge />` on its card.
- **End card**: the wireframe dims, chips stay docked, the logo ignites on the pad in its own colours and one line on a plate says where to get it.
- **Arabic**: cards on the left of the subject and the chip rail on the right in 16:9; labels and the product name wipe in whole (never scrambled or locked letter by letter), with no letter-spacing; only digits roll. Use a squared Kufi-style sans with tabular digits.
- **9:16**: subject in the middle band, cards and chips below it; status text under the top 12%, narration plate above the bottom 22%, nothing docked on the right 12%.

## 12. Variation space

You decide the object, its model, which parts and in what order, the opening, the ending, the camera path, the colours and the pacing. Use cases are **grammar for the order and duration of information**; build your own timeline from the user's facts.

| Use case | Information order | Hold per layer | Length |
|---|---|---|---|
| **Spec walkthrough** | Name + tagline → one spec per part (label, value, unit, detail) → weight / price → call to action | Title ≥ 4 s; value ≥ 2.5 s, then docked; final sheet ≥ 3 s | 30–40 s, 2–5 parts |
| **Loop screen** | Name → 3–5 specs → call to action, no voice; last frame = first | 3 s per spec, 5 s final | 20–30 s loop |
| **Teardown** | Part → what it does → one number; internals only when opened | 4–6 s per part | 40–60 s |
| **Upgrade** | Part → old value (dim) → new value (accent); old part scan-erased, new one scanned in | 3 s per upgrade | 20–30 s |
| **Assembly order** | Step number → part name; parts snap home one by one | four pulses per part | 20–40 s |

- Structures: **a loop screen** that never names a product and cycles five sensors; **a teardown** one layer deeper per shot until the core is a single hot piece; **an upgrade** where two versions share the pad and every number rolls from old to new.
- Openings: **a part first** (one component locked in close-up; the rest scans out from it); **a flat outline** (a 2D silhouette extrudes into the wireframe); **plan view** (top-down, the pad as a dial, the object arriving as its footprint).
- Endings: **one value at eye level** (the wireframe dims around the single number that matters); **knolling** (parts fly into a labelled top-down layout); **power-down** (edges cool, HUD panels switch off until only the pad glows).

---

Adapted for Halal Motion Videos from the `hologram-hud` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
