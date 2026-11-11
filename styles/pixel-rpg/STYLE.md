# 16-bit Pixel RPG

> A short film that looks, sounds and *behaves* like a mid-90s console role-playing game: big square pixels, a limited indexed palette, text boxes that type, menus, save files, chip sounds with echo.
> References (grammar only): mid-90s console RPGs as a system of dialog boxes, menus, challenges, overworlds and save points; the palette tricks of indexed hardware (palette swaps, fades by steps, cycling); the colour-depth history of consoles (4 shades → 8-bit → 16-bit). Never use existing game names, characters, UI frames, fonts, logos, tunes or sound effects. Learn the grammar, not the assets.

## 1. Essence, and what it is not

- **A tiny native picture**: 320×180 pixels in 16:9, 180×320 in 9:16, scaled up six times with hard edges; everything, text included, lives in that low-resolution picture.
- **A limited, indexed palette**; gradients are **ordered dither**, never blends.
- **Sprites** around 20–34 px tall animating in a handful of frames; faces act in **portraits**.
- **Story told the way a game tells it**: dialog boxes with portraits, menus, status bars, system messages, save files, item pick-ups.
- It takes the game's systems seriously as a language for feeling.

Not HD-2D (no depth of field, bloom or real-time light), not CRT nostalgia (no scanlines, no grain), not a parody.

## 2. Materials & rendering

- **An indexed picture**: every pixel is a palette number, shown through a **lookup table** (number → colour), so a whole palette can change in one frame. Camera moves are **whole pixels**; each parallax layer rounds its own offset.
- **Master palette** of about 32 colours (a free palette such as ENDESGA-32), plus **protected duplicates** of a few entries that no palette effect touches.
- **Colour-depth tables** computed from the master palette: identity (16-bit), the nearest of about 15 early-console colours (8-bit; it needs a dark green and a dark brown), 4 fixed brightness steps (4-colour, drawn natively at half resolution and doubled), a faded set (about 7 blue-greys), and in-between subsets for a step-by-step collapse. Map by brightness, never by position in the palette.
- **Light is palette stepping**: lighter and darker tables move each colour one step along its ramp; glows are dithered rings. Firelight in a low-colour era uses a warm remap (greens → browns → rust), not generic brightening.
- **Dither**: a 4×4 ordered pattern for gradients and glows; light shafts as a flat 50% checker with a 25% edge.
- **Sprites from a rig**: capsule limbs with 3-tone shading from an upper-left light, a per-part inner line in the material's darkest tone, a 1-px ink outline all round, plus hand-placed pixel heads. One rig gives every pose; lower eras drop the highlight tone. Give the hero a **silhouette mark** (a garment tail, a hat, a hairstyle).
- **Portraits** 32×32, three-quarter view, base face + eye/brow and mouth overlays; they carry facial acting (the sprite face has one eye pixel).
- **Props** can be simple flat-shaded solids reduced to a few protected colours (e.g. a turning crystal drawn in 8 frames per quarter turn).

## 3. Colour logic

- **Palette = feeling.** Colour depth, fades and swaps are story tools; change the whole palette by table, never by transparency.
- **Colour depth can stand for time**: older = fewer colours, lower resolution.
- **Protected colours**: a few colours exempt from every effect become the thread through the film and allow match cuts between eras. Use one or two; more and they stop meaning anything.
- **Warm hues survive reductions**: keep orange, pink and plum in reduced subsets, or the first step turns a scene solid red.
- Example uses of protected colours: a red kite across a childhood; a gold coin in a grey economy; the green of one plant in a faded city.

## 4. Type & on-screen text

- **The dialog box is the on-screen text**, drawn inside the pixel picture across its lower part: a layered rounded border (ink / white / silver), a dithered dark-blue fill, a 32×32 portrait on the reading side, an **original** variable-width pixel font (capitals about 7 px) with a 1-px shadow. It types with the voice (a little over one character a frame; slower in older eras), and ▼ blinks when it is done.
- **This style needs its own face**: no brand typeface survives at seven pixels. The brand's face appears only with its logo.
- **Skins follow the era** (a light box for 4-colour, a black box with a white frame for 8-bit, blue for 16-bit).
- System messages go in a thin top window. Each box stays until its line has been read; the next box replaces the previous one.
- **Titles** in the pixel font at 2× or 3×, an ink outline on all eight sides, a gradient that changes row by row, dissolved in and out through the dither pattern.

## 5. Motion quality

- **Sprites step**: a walk holds each drawing 4 frames (about 8 a second), flames and blinks 2–3 frames (about 12 a second); camera and parallax move on every frame, in whole pixels.
- **Game-native acting**: hop forward to act, a skill pose, a recoil, a kneel, an obstacle that blinks (2–3 frames on, 2–3 off) and vanishes; breath = shoulders up 1 px.
- **UI motion**: windows slide in over about 9 frames (ease-out, whole pixels); a hand cursor bobs 1 px every 8 frames and **stops when the character hesitates**.
- **Transitions**: a thumbnail expanding through mosaic, a mosaic cross with a palette switch at its peak, the encounter swirl (a twist, mosaic and a dither dissolve to white), screen shake (3–2–1 px over 10 frames), palette fades in 4 steps. Never opacity fades.
- **One pulse** (say 15 frames) spaces the palette steps, the menu moves and the boxes, so the film ticks like a game loop.

## 6. Camera grammar

A vocabulary, not a route. Game cameras are simple and legible. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Side-scroll with parallax layers | journey; loneliness; progress | a commute; a quest; a timeline |
| Locked frame with UI on one third | a choice; a system speaking | a menu decision; a stats reveal |
| Challenge side view (the challenge / the team / windows) | a struggle as a system | an exam; a negotiation; an illness |
| Top-down overworld pan | the whole world; where things are | a city; a map of a company; a trip |
| Whole-pixel tilt up something tall | awe; scale | a tower; a door; a mountain |
| Hold while the palette changes | loss or change without motion | grief; a memory fading; nightfall |
| Back view at a threshold | resolve; the unknown ahead | a first day; a launch; a departure |
| Zoom by mosaic into a thumbnail | entering a memory or a file | a flashback; a save slot; a photo |

Framing: characters stay above the dialog box (floor line above its top edge); menus leave the action visible. The challenge is a thing, not a person: a storm, a deadline, a tangle of cables, a mountain of paperwork.

## 7. Sound palette

- **The sound chip's voices, as effects**: square-wave blips, a soft triangle thump, noise bursts, all with a short game-console echo.
- **Foley, bit-crushed to the scene's era**: cursor and select blips, text blips (one pitch per speaker), footsteps with echo, fire crackle, a sparkle shimmer, charge and release, an energy bar ticking down, an obstacle's blink, a bit-drop per palette step, save ticks, a door grind, a coin, a menu error buzz.
- **Fidelity follows colour depth** (an option): 4-colour = mono, coarse volume steps, a low sample rate; 8-bit = thin and mono; 16-bit = stereo with echo; a faded present = the same sounds muffled.
- **One pitched flourish, used as punctuation**: a three-step rising chirp for an item picked up or a level gained. Never a tune, never a bed.
- **One organic sound** (a breath, a heartbeat) can make a character human at one moment.
- **Silence**: true zero, echo tails included, in the held frame before colour floods back.
- **Sound across a cut**: footsteps keep their rhythm straight through an era shift and only their fidelity changes; a mosaic's sweep starts a few frames before its picture.
- **Voice** (optional): first person, few short lines; or text blips only, for a character who exists only in text.

## 8. Native moves

A menu: use the ones your story needs.

- **Palette collapse / flood.** Colour depth drops one level per pulse, or full colour floods back through a dither wave. *Fits content like:* a city blackout and recovery; a company in crisis; burnout and rest.
- **Protected colour match cut.** One exempt colour links two eras in the same screen position. *Fits content like:* a family heirloom; a brand colour across decades; a team jersey.
- **Save files as memory.** A list of files; choosing NEW FILE refuses to overwrite. *Fits content like:* versions of a product; chapters of a career; photo albums.
- **Game UI as narration.** A greyed-out name, an item description, a stat screen. *Fits content like:* a team member leaving; a skill learned; a budget.
- **Level up.** Stats rise with a chirp. *Fits content like:* a student's year; a startup's first hundred customers; learning a language.
- **Encounter swirl.** A crash into a challenge. *Fits content like:* a deadline; a diagnosis; a storm.
- **Era shift.** The same characters redrawn in older hardware. *Fits content like:* a town's history; grandparents' youth; the evolution of a device.

## 9. Pitfalls of the medium

- Mapping a palette by position crushes a scene to black → map by brightness, with a gentle curve.
- Reduced subsets without warm hues turn a sunset solid red → keep warm hues.
- An 8-bit set without dark green or brown turns night grass blue; generic brightening near fire turns grass neon → warm remap.
- Reducing a full-colour scene to 4 shades afterwards is mud → draw low eras natively, with known colours, at half resolution.
- Pixel hair as a smooth dome reads as a helmet; single-pixel alternation reads as noise → 2–3 big spikes. Pale clothing reads as skin. Held props cross the face in side view → back hand.
- A dark plank door reads as a jail → panels, bevels, studs.
- A negative number in a palette cycle wraps to nothing → `((n % m) + m) % m`.
- The dialog box covers the lower part of the picture → keep the floor line above it.
- Match cuts on protected colours need both screen positions worked out in advance.
- Smooth scaling blurs every pixel → hard-edged scaling by a whole number only; never a fractional zoom on the picture.

## 10. Building it here

- **One `<canvas>` at native size** (320×180, or 180×320 when `portrait`), shown six times larger with `image-rendering: pixelated`. On each frame, redraw it completely from `useCurrentFrame()`: fill a `Uint8Array` of palette numbers, pass it through the current lookup table into an `ImageData`, and put it on the canvas. Draw in a `useLayoutEffect` keyed on the frame, so the picture is there before the frame is captured. Nothing is kept from the previous frame.
- **Palettes and tables are plain arrays** in the video's folder; a palette effect is a choice of table by frame, in steps. Sprites, portraits and the pixel font are small grids of palette numbers (rows of characters are easy to edit by hand).
- **Whole pixels everywhere**: `Math.round` every camera and parallax offset; step sprites with `Math.floor(frame / hold)`; take twinkle and fire from `noise(x, seed)`, never `Math.random`.
- **Almost every engine default is off**: no `MaskRise`, `Headline`, springs, `Backdrop`, `Finish` or light sweep (`<SceneTrack sweeps={false} />`, or one scene that draws the whole film). Transitions happen inside the pixel picture. Scenes take no `SceneFrame` entry or exit, and the timeline is built with `{ overlap: 0 }`, so one picture hands over to the next on a single frame.
- **Full resolution appears once, if at all**: a `Device` or `Phone` with the real screen, reached through a mosaic that resolves from big pixels to small.
- **Text boxes take their timing from the voice-over's word timings**; shot starts, palette steps and box times live in `timeline.ts`.
- **Sounds**: design them in `sfx.json` with the `crush` effect for each era; make a line's text blips one sound (a run of blips at the typing rate) instead of a cue per letter. `Soundtrack.tsx` lands blips, ticks and the chirp on the frames from `timeline.ts`.

## 11. In a product video

- **The brand's colour is the protected colour**: the one entry no palette effect touches, in the same screen position across eras. The game palette around it stays; that contrast is the thread.
- **The real product is the last era.** 4 shades → 8-bit → 16-bit → today: a mosaic resolves into the real screen at full resolution in a `Device`. Inside the pixel world the product is an item (a pixel icon with an item description quoting its real claim) and a menu whose entries are its real features.
- **Stats are game furniture unless they are real.** HP and LV belong to the game; a number that describes the product (users, minutes saved, a price) is in `facts.md` and is shown as itself. Invented sample values carry `<ExampleBadge />`, laid over the picture.
- **Kind challenges only**: the "enemy" is the user's problem as a thing (a pile of receipts, a tangled calendar), never a person or a rival brand.
- **End card**: the save screen with the last slot written in the product's name, or a title screen whose PRESS START is the call to action; the real logo at full resolution, one line in the dialog box on where to get it.
- **Arabic**: mirror the UI: portrait on the right, cursor pointing left, bars filling from the right, the side-scroll running right to left. Use a pixel face drawn for Arabic (joined forms, room for the dots, about 11 px tall), never a Latin pixel font's fallback, and type the box word by word instead of letter by letter, with no added letter-spacing.
- **9:16**: the tall 180×320 picture. Stack it: the challenge above and the team below, menus under the action instead of beside it, more room for tilts. Lift the dialog box so it ends above the bottom 22% and let scenery fill what is under it; keep titles below the top 12% and clear of the right 12%.

## 12. Variation space

You decide which game system the topic hides, the characters, the eras, the palette plan, the opening and the ending.

- Structures: **an overworld tour** (a top-down map; each town a chapter entered by a door transition); **a shop and an inventory** (the story told entirely through items bought, used and sold); **a turn-based match** (two sides take turns; each move is a scene of the topic).
- Openings: **PRESS START**, a title screen with a short self-playing preview; **a challenge already in progress** with the energy bar low; **a boot screen** that fails to load and must be retried.
- Endings: **GAME OVER** answered by a choice (retry / give up) left open; **credits scrolling over the overworld** as characters walk home; **the save screen** where the last slot is written and the menu closes.

---

Adapted for Halal Motion Videos from the `pixel-rpg` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
