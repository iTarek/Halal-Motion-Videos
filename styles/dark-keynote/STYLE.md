# Dark Tech Keynote

> A software launch film where the interface itself is the star: near-black gradient, hairline grid, soft light, one brand accent, and UI that moves with snap-grid precision. Light reveals, one giant number, and a sound design as ordered as the pixels.
> References (grammar only): Apple product reveals (black stage, light sweeps, one line per screen, the lone giant number); Linear / Stripe / Vercel launch videos (snap-grid motion, 1 px lines, one accent); rapid insert cuts from film comedy (half-second close-ups in a row). Never use their names, interfaces, fonts, system controls or logos, and never name them in the film.

## 1. Essence, and what it is not

A keynote-grade product film for **software**. There is no physical product and no glass render: the protagonist is the interface (a cursor, windows, notifications, tiles, a number). It lives on a dark stage lit by soft, cool light, with **one brand accent** reserved for the single most important element.

The style is defined by **precision**: every element snaps to a grid, every motion lands on the pulse, every sound belongs to one designed family. Drama comes from contrast: disorder shown as generated UI, one decisive action, then empty space.

Not a glass product render (no physical object), not a screencast (no desktop, no system chrome, no recording left running), not a hologram HUD (no scanlines), not a chart film (one number, not a chart).

## 2. Materials & rendering

- **Stage**: a near-black base with a radial lift at the upper centre, one large cool glow at single-digit opacity off-centre, a 50–55% corner vignette. A hairline grid (white at about 3%, every fourth line about 6%) on a square module of about 1/40 of the frame's long side. No grain.
- **UI kit, drawn in code or cut from the product's real screens**: rounded windows (a title bar with only a small glyph and a title; never traffic-light buttons, menu bars or docks), notification cards, file icons with mono filenames, generated thumbnails, list rows, tabs, badges, bars, uniform tiles.
- **Surfaces**: three steps of raised dark surface, a 1 px border (about 8% white), a 1 px inner top highlight, soft shadows.
- **Depth**: a 2.5D camera; cards near the lens blur as they grow. Surfaces turn in perspective by at most about 24°.
- **Light** is the reveal tool: only pixels the light has passed turn on; unlit areas sit at a few percent.

## 3. Colour logic

- A cool neutral ladder only: near-black stage, three surface steps, text in three greys (primary, secondary, label). Neutrals are slightly blue, never warm brown.
- **One accent**, saturated and luminous, with its own glow. It is reserved for what the product *is* or *does*: the protagonist element, the call to action, confirmations, the key number. If two things are accent-coloured, one is wrong.
- **A problem colour** (typically a red for badges and warnings) may exist only while the problem exists; after the turn it never returns. Problem colour = noise, accent = the product.
- Secondary hues only as **category codes** in motion (a trail per data type), desaturated, and never on static UI.
- Example accents, pick one per film: lime `#B7F34A`, electric violet `#8B7CFF`, signal orange `#FF7A1A`.

## 4. Type & on-screen text

- **A neutral UI grotesque** (the Inter kind) for UI, captions and headlines; a tighter, heavier cut for giant numbers (in Latin script, tracking around −4.5%); a monospace (the JetBrains Mono kind) for labels, filenames and status text. A brand's own sans comes first for headlines and numbers; the mono stays.
- **One line per screen** for headlines. The big number gets its own screen and **no caption over it**: the number is the message.
- **Narrated lines are a UI component**: a toast low in the frame (a dark translucent pill, 1 px light border, soft shadow, medium weight at about 3.7% of the frame height in 16:9 and 4.5% of the width in 9:16, a small accent "speaking" dot). It enters with a small rise and fade in about 5 frames, each word arriving as it is spoken, and can turn more opaque over busy frames.
- **Typed text is its own caption**: words the cursor types in frame are not shown a second time in a toast.
- Lift product content while toasts are up so they never cover it.

## 5. Motion quality

- Smooth motion on every frame, no stepping, no boil: this is precision, not craft.
- **Everything lands on the grid and on the pulse.** Moves start early and land on it. Easing is fast-out with one small overshoot and an immediate settle. No floaty drift.
- **Spawns are short and typed** (drop and bounce, fling, slide-in, pop; 6–9 frames), one motion per element type. Tension can be a tremble of a few pixels.
- **Flights** follow curved paths with overshoot along the final tangent; same-type elements bend the same way and never cross.
- **A living element can act**: squash, stretch, anticipation (at least 10 frames of wind-up), a 2-frame contact, spring follow-through. The blink of a cursor makes a natural metronome.
- **Disappearing is designed** (retract one part per pulse, a screen-off squash into a point); nothing just fades.
- The stage and grid never move on their own; only the camera moves them.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | Expresses | Can serve |
|---|---|---|
| Locked extreme close-up on a tiny UI element | Intimacy, one thing alive on a screen | a single action; a thought forming; a quiet status |
| Continuous pull-back, keyed once per phrase, each step the same ratio | Accumulation, scale growing out of one point | spreading load; a network growing; a team joining |
| Push-in through a frozen frame | Time stopped, focus narrowing | a decision; the instant before a commit; a bug found |
| Whip pull-out in one pulse | Cause and effect seen at once | a sync completing; a deploy landing everywhere |
| Dive into a small UI element, then a match cut | Going inside the detail | a counter that matters; a log line; a setting |
| Half-second inserts expanding from their source | Overload, too much to read | notification storms; errors; choice overload |
| Near-locked frame while an object turns and light sweeps | Presentation, the product as hero | a reveal; a new version; a feature name |
| Slow lateral track across a UI plane | Order read by the eye | a timeline; a pipeline |
| Top-down plan over the grid | System view, structure | architecture; permissions; a workflow map |
| Return to an earlier framing | Rhyme: what changed | before/after; a loop closed; an echo |

Framing: generous negative space, one focal element, the accent at the focal point. Tilted horizon and wobble only for disorder.

**Transitions are UI expanding or collapsing**: every shot change is an interface element expanding into the frame or the frame collapsing into an element. No fades, no blank frames. An expansion on a pulse starts one frame early so the pulse frame is already about 80% open.

## 7. Sound palette

- **The interface's materials**, clean and dry: cursor tick, low-profile keys, notification glass, file plop, window whoosh, glitch accents, stacking thumps, a felt thump with a falling sine for a press, a light-sweep shimmer, digit grains, a screen-off zap.
- **Two sound families are the story.** Disorder sounds *scattered*: each source its own timbre, slightly off pitch, thrown left and right. The product's sounds are *one family* (felt ticks, glass taps, all on notes of one scale, centred), so many landings blur into one soft shimmer.
- **Process you can hear, with no tune**: the pulse divides to accelerate instead of speeding up; a build adds one more tick per phrase; a put-away removes one sound per pulse until a single tick is left. Picture and sound read the same cue table.
- **A bed of room**: a quiet room, a computer fan, a faint electrical hiss that grows with pressure. Keep it down until a spoken line ends.
- **Silence is a tool**: true zero on every layer when the screen freezes; a bare room for a breath. The first sound after a silence is the most important one.
- **Sound across a cut**: the shimmer arrives a few frames before the light; a landing's ring runs on over the next expansion.
- **One riser, one big hit**: both land on the snap into order (or on the number), nowhere earlier.
- **Voice**: confident and restrained, short declaratives.

## 8. Native moves

A menu: use the ones your story needs.

- **Generated accumulation.** UI spawned by rule, faster and faster, hundreds of items; you don't draw the mess, you generate it. *Fits content like:* unread tickets piling up; cloud costs creeping; a dependency tree exploding.
- **The snap grid.** A whole promise in one motion: everything flies into a grid in one pulse; the grid stays invisible until then. *Fits content like:* a CMS publishing to every channel; a scheduler filling a week; an audit turning green.
- **The living element.** The cursor (or the product's smallest live element) is the protagonist and the brand mark. *Fits content like:* a search box that grows ambitious; a progress ring that refuses to finish; a status dot.
- **Freeze.** Everything stops mid-air and the sound drops to zero; only a screen can stop time like this. *Fits content like:* a security breach caught; a failed deploy; the second before "send".
- **Light reveal.** A soft band sweeps across and only lit pixels turn on (soft front, glint at most 20%, done within about 1.3 s so nothing stays dark). *Fits content like:* a redesign; a new pricing page; an API console.
- **Number from glyph noise.** Digits scramble and lock one per quarter-pulse with a small bounce. *Fits content like:* latency cut; a count of users; a price.
- **Type streams.** Elements fly to their own rows along coloured curved trails, so categories read as streams. *Fits content like:* an inbox triaged; logs routed by severity; files synced by device.
- **Put-away.** The UI dismantles itself one part per pulse until one element is left. *Fits content like:* "less is more" features; offboarding; focus mode.

## 9. Pitfalls of the medium

- A semi-transparent surface turned in perspective shows its layers through each other → turn an *opaque* surface, then light it with an overlay.
- A hard white glint reads as a sticker reflection → soft front, glint at most 20%.
- Nearest-slot snapping looks like a flicker, not a collapse → typed destinations, curved paths, trails.
- Too few elements leave holes in a grid that read as a mistake → generate by rule, then trim or pad to exactly the slot count per group.
- A flat tinted rectangle for "closing" looks like a placeholder → squash the real surface.
- Hundreds of blurred, shadowed elements render slowly → shadows and blur only on the nearest few; the far ones are flat.

## 10. Building it here

- **This style sits closest to the engine's defaults.** `Finish` is used with `grain={0}` for the vignette only. `Backdrop` and `Card` are close but not exact: `Backdrop`'s glow is in the accent colour and its grid drifts slowly, and `Card` is tinted with the accent. So draw the stage yourself (a near-black `div`, a cool radial gradient, and two `repeating-linear-gradient`s on the module for a grid that holds still), and give `Card` a neutral `border` and `background` through its `style`, or use plain `div`s.
- **Springs are right here**: `springAt` and `springTo` with `SPRING.snappy` for snaps and landings, `SPRING.bouncy` for the living element, `ease.back` where a fixed duration must land on the pulse. Camera moves use `prog` with `ease.inOut`.
- **Camera and depth**: one wrapper with a CSS `transform` (scale and translate); near cards get `filter: blur()` that grows with their scale; turns use `perspective` and `rotateY` up to about 24°. No 3D library.
- **Light reveal**: two copies of the layer, one at a few percent opacity and one at full, the lit one behind a `mask-image: linear-gradient(…)` whose position animates; the glint is a narrow gradient band with `mix-blend-mode: screen`.
- **Generated UI**: lay out hundreds of small `div`s from `noise(i, seed)` (never `Math.random`), each with a spawn frame from the cue table; trails are SVG `path`s drawn on with `stroke-dashoffset`.
- **Text**: `MaskRise` and `Headline` for the one line per screen; digits with `fontVariantNumeric: "tabular-nums"`, scrambled with `noise` and locked on quarter-pulses; `Icon` for glyphs.
- **Overrides**: transitions are the style's own expand and collapse (`clip-path: inset(… round …)` growing from the source element), so `<SceneTrack sweeps={false} />` and no `SceneFrame` push or drop.
- **The pulse lives in `timeline.ts`**; the same cue table spawns elements and places sounds in `Soundtrack.tsx`.

## 11. In a product video

- **The brand's main colour is the one accent**, brightened if needed to glow on near-black. Everything else stays in the cool neutral ladder; a second brand colour stays out.
- **The real product is the star**: its screenshots fill the style's own windows (a `Card` with the small title bar), cropped to the part that matters; a screen recording plays inside one for the decisive action. For a phone app, `Device` with a dark body (`metal`) carries taps and scrolls. A light-themed product sits on the dark stage as one bright surface: let the light reveal turn it on.
- **The mess is generated, the product is real.** Accumulated tickets, files and notifications are illustration: fictional names, and `<ExampleBadge />` whenever they show figures.
- **The giant number is a real figure** from `facts.md`, alone on its screen, with its unit and nothing else.
- **End card**: one tile or the logo lit in the accent on the empty grid, one line on how to get it, set low on the grid.
- **Arabic**: mirror the layout, flights and slide-ins; headlines rise word by word, each word whole, never letter by letter, with no letter-spacing; the cursor "types" a word at a time; labels use a light weight of the same face instead of a mono. A clean, modern Arabic sans with even stroke weight suits it.
- **9:16**: stack what sat side by side, let windows run nearly full width, and keep the number, the toast and the call to action out of the top 12%, bottom 22% and right 12%.

## 12. Variation space

You decide the product's verb, the protagonist element (or none), the problem image, the accent, the structure, the opening, the ending, the camera path and the sound process.

- Structures: **a countdown** (a release checklist ticking through its items, each a UI moment, ending on "shipped"); **side by side** (two versions of a workflow run in split screen, the old one drowning, the new one finishing early); **a zoom ladder** (one pixel → a component → a screen → a fleet of devices, each level a new fact).
- Openings: **the number first** (a huge stat on black, its meaning revealed backwards); **a plan view of an empty grid** that fills slot by slot; **a hard insert storm** from frame one, calm arriving only later.
- Endings: **one tile left** lit in the accent on an empty grid; **the product running quietly** in a wide shot, no text; **a shipped state** (a single confirmation toast, then darkness).

---

Adapted for Halal Motion Videos from the `dark-keynote` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
