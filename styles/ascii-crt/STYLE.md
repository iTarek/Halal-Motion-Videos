# ASCII / CRT Terminal

> Everything on screen is a real character on a monospace grid, lit by the phosphor of an old monochrome CRT.
> References (grammar only): 1970s–80s monochrome terminals and teletype logs (typed output, cursor, status lines); ASCII art and demoscene text-mode pictures (images from glyph density). Copy no film's interface text, fonts or logos, and use no real agency names.

## 1. Essence, and what it is not

A single monochrome terminal screen: **P3 amber** (or P1 green) phosphor glowing on dark glass, curved at the edges, with scanlines. Every image, including title, landscape, face, room and narrated lines, is made of **real glyphs placed on a character grid** and chosen by ink density. The film has one camera, the screen itself. It moves only by changing the **font size of the grid**: bigger characters push in, smaller characters pull out.

The mood is cold, patient and machine-calm: typed text, a blinking cursor as suspense, and one warm surprise.

**Never** fake it with an image plus an "ASCII filter". Characters must be drawn as characters on a grid. Not a hacker-movie green rain, not a pixel-art game (no sprites, no free pixels), not a sci-fi HUD (no vector lines, no free-floating panels).

## 2. Materials & rendering

- **Font**: one monospace bitmap-style font (the kind VT323 is); cell 0.4 em × 0.8 em (1:2). Glyphs carry a slight stroke for beam spread and must stay sharp at every size of a zoom.
- **Grids**: column count per shot and per format: title about 20 columns in 16:9 and 12 in 9:16; terminal 80 and 40; picture 200+ and 110+. A push-in can go until one cell holds a sub-grid of its own.
- **Density ramp**: each glyph's ink coverage × dim / normal / bold → about 20 levels, near-duplicates dropped; a small ordered-plus-hash dither per cell; cells below a threshold stay blank. **Negative space makes ASCII art readable.**
- **Picture pipeline**: paint a greyscale "negative" aligned exactly to the grid (several samples per cell; separate channels for phosphor, second colour and a flag), average per cell, pick a glyph. Interiors get local contrast (`m + 0.9·(m − mean)`) to keep outlines.
- **Recognisable subjects**: silhouettes, not noise (real coastline polygons, a face from a few planes); dark = sparse dim glyphs, bright = dense bold, shadow sides sparse `.` only; an angle with a clear silhouette.
- **Depth on a grid**: far = darker and sparser, near = brighter and denser; a thin bright rim separates planes.
- **The tube**:
  - **Phosphor colour**: brightness maps along the phosphor's ramp (dim deep orange → amber → overexposed near-white for P3).
  - **Glow**: bloom at several radii plus a faint halo.
  - **Glass**: fine scanlines (narrower on bright areas), slight barrel curvature, rounded mask, warm near-black unlit glass, faint reflection, about 1% flicker, fine noise. **No RGB grille: monochrome tubes have none.**
- **Afterglow**: text that disappears decays over about 0.1 s, computed from the frame number so every frame is deterministic. Moving glyphs get one faint trail sample.

## 3. Colour logic

- **One phosphor** carries everything: amber, green or white, in its own brightness ramp. No second hue for decoration.
- **At most one soft second colour**, used for one thing only (the emotional object), switched on at a single moment, on a pulse, and never taken back casually.
- Examples: amber screen with an ice blue-white for something far away; green screen with a warm pink for a living thing; white P4 screen with a pale gold for a memory.
- Brightness is the only other tool: dim / normal / bold and inverse video.

## 4. Type & on-screen text

- **The monospace face is the look**: it stays whatever the brand's fonts are. A brand's own type appears only in its logo, or not at all if the logo is redrawn in glyphs.
- **Narrated lines are terminal output.** A reserved **LOG strip** at the bottom: a dim separator, an inverse-video tag, then a prompt and the line (uppercase in Latin script) at caption size. It is **typed word by word in sync with the voice**. It lives outside the zooming grid, like a status line, with the same scanlines and glow. When nobody speaks it can show system state (a progress bar, a waiting message).
- **Text that the story shows on the screen** is picture, not narration: a log, a command, a message being typed.
- **Titles** are typed with key clicks, as a filename, a command or a header.

## 5. Motion quality

- **Characters never move off-grid, except in a declared transformation moment.** Typing, scrolling and counters jump from cell to cell. A roller flips digits discretely, fast then slowing.
- **Only three things move continuously**: grid scale (the camera), CRT physics, and particles in a transformation.
- **Typing speed is performance**: machine output is even and fast (one to three characters a frame); dramatic lines slow to the film's pulse (one character or one word per unit); human typing is hand-timed, uneven, with pauses and bursts.
- **Particles** spawn from scattered points inside source glyphs, start small, fade in, ease to their cell, and flash briefly on landing, so they never stack into bright bars.
- **Push to a character**: hold where the whole glyph reads, then push until its inner text reads; inner text full brightness, outside text a few percent, neighbours dimmed, so the shape reads before the text.

## 6. Camera grammar

The only camera is the grid scale, plus CRT power states and one possible shot outside the screen.

| Move | What it expresses | Can serve |
|---|---|---|
| Static terminal | Waiting, procedure, machine time | a countdown; a queue; a log being read |
| Push in (cells grow) | Attention, intimacy | one line of dialogue; a name; a decision typed |
| Pull out (cells shrink) | Context, scale | a title becoming line 1 of a list; one entry among thousands |
| Push into a single glyph | Hidden depth; what a symbol is made of | a letter made of messages; a pixel made of people |
| Scroll (the buffer moves) | Accumulation, time passing | years of records; a changelog; a feed |
| Clear screen / hard redraw | A cut; a new state | a reboot; a new chapter; a crash |
| Text becomes image (grid shrinks as glyphs fall) | Words turning into world | a letter becoming a face; data becoming a map |
| Power on / off, degauss | Waking, sleeping, a jolt | a machine starting its day; an ending; a restart |
| Pull back off the glass into a drawn room | The screen is an object in a world | who is reading; where the machine is |

Opening and ending come from the topic. Framing: text stays in the safe area inside the curvature; keep the LOG strip clear. Transitions happen on the screen (clear, redraw, scroll, power), never a crossfade between two screens.

## 7. Sound palette

- **The machine is the sound**, all of it synthesised: relay click and degauss hum (mains hum plus harmonics with a thump); buckling-spring keys (plastic click, spring ping, key-cap thock; a duller space bar, a heavier Enter); teletype ticks for remote text; a dot-matrix printer or a tape drive as options.
- **What gets a sound**: every typed character or word (a click light enough to repeat), every clear and redraw (a relay), every counter step, power on and off. Particles get clusters of tiny high ticks. The glow, the flicker and the scanlines are silent.
- **Weights**: a key click for a character, the heavier Enter for a line, the degauss thump for the one big moment.
- **Ambience bed**: room tone only (a fan, a low hum, a **very quiet** flyback whine). It is the film's floor, never a note.
- **Silence is the main tool**: room tone alone under typing and blinking cursors; a short near-silence before a transformation; on a shock, cut everything to nothing, tails included.
- **Sound across a cut**: the teletype ticks or line tones of the next screen start a few frames before the clear.
- **Tonal accents**, short and plain: square-wave error beeps and a terminal bell; line tones (an answer tone, a burst of data noise); one soft held tone that opens on the colour change. Never a tune.
- **Voice**: few short lines, level and machine-calm. Choose a voice that already sounds even and a little synthetic; every word must stay clear.

## 8. Native moves

A menu: use the ones your story needs.

- **The picture is made of words.** A sentence breaks apart and its letters, sorted by ink density, become an image containing only those letters. *Fits content like:* a manifesto becoming a crowd; a recipe becoming the dish; a poem becoming a landscape.
- **Font size = camera.** Push until one character fills the screen and is itself made of smaller text. *Fits content like:* a company name made of employee names; a year made of its headlines; a star made of customer messages.
- **Typing rhythm = editing rhythm.** Even machine typing against uneven human typing; a blinking cursor is a performance. *Fits content like:* a job application; an apology; a password remembered.
- **CRT physics.** Power on as dot → line → frame, off to a dot; afterglow, bloom, curved glass. *Fits content like:* a control-room monitor; a night shift ending; an old archive reopened.
- **A single colour change.** One soft second colour appears once. *Fits content like:* a first green leaf in a data log; a blood-orange sunset in a weather report; a child's drawing in a server room.
- **The log file.** Timestamps, error codes, progress bars tell the story. *Fits content like:* a product launch day; a rescue; a migration.

## 9. Pitfalls of the medium

- **Negative not aligned to the grid** drifts across hundreds of columns → derive sample positions from the cell size exactly.
- **Wrong cell centre**: cells are twice as tall as wide, so the centre of row `j` is `(j + 0.5) · 2 · cellWidth`.
- **Every dark pixel becomes a character** (`-+-+` walls) → threshold, gamma about 1.25, local contrast.
- **Noise-textured subjects read as textured blobs** → silhouettes, a dark sparse background, a dot-only shadow side.
- **Particles from letter centres stack into bars** → scattered points inside the glyph, small, faded in.
- **A beam stroke thick enough to close counters** (`M`, `B`) → keep the stroke thin at small sizes; build masks from the unstroked glyph.
- **Cells on half pixels blur and shimmer** → at rest, round the cell width to whole pixels; only a zoom in progress may sit between.
- **The cell size taken before the font has loaded** is wrong for the whole film → derive it from the font size, never from measured text. 0.4 em × 0.8 em fits the bitmap-style face above; for any other monospace, take its advance width from the font once and keep it in one constant.
- **A power state at zero that still draws the centre dot** → before power-on the glass shows nothing at all.

## 10. Building it here

- **Real text on a grid, no 3D library and no shaders.** A terminal is rows of `<div style={{ whiteSpace: "pre" }}>` in the monospace font; a picture of thousands of cells is a `<canvas>` whose `fillText` calls are a pure function of the frame number, redrawn in a `useLayoutEffect` keyed on the frame, with the face loaded through the brand's `fonts.ts` first. The camera is the font size: one number from `prog(…, ease.inOut)`, with the cell derived from it.
- **Image → cells**: brightness per cell comes from a function of (column, row, frame) for drawn scenes, or from a small prepared greyscale image with one pixel per sample, read once into an array (under `delayRender`). Never a CSS filter over a picture.
- **Phosphor and glow**: map each brightness level to a colour on the phosphor ramp; glow is the same layer duplicated two or three times with `filter: blur(…)` at growing radii and `mix-blend-mode: screen`.
- **Glass**: scanlines are a `repeating-linear-gradient` overlay; curvature is suggested by a rounded mask, a vignette, an inner shadow and a faint reflection gradient (leave out true barrel distortion); flicker is about 1% opacity from `noise(frame)`; tube noise is `feTurbulence` with its `seed` taken from the frame.
- **Afterglow and typing**: opacity of removed text is `Math.exp(-(frame - off) / (0.1 * fps))`; typed text is `text.slice(0, n)` with `n` from the frame; particles get their paths from `noise(i, seed)`, never `Math.random`.
- **Overrides**: no springs, no `MaskRise`, no `Card`, no `Backdrop`; `<SceneTrack sweeps={false} />`; leave out `Finish` (the noise lives in the tube). On the grid, movement is stepped with `Math.floor`. A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **Timing**: typing starts, clears and the pulse live in `timeline.ts`; `Soundtrack.tsx` lands key clicks and relays on the same frames. Design one click and repeat it at varied levels, not hundreds of files.

## 11. In a product video

- **The phosphor palette is the look; the brand's colour is the one second colour**, switched on once for the product or the logo. Pick the phosphor (amber, green, white) that sits best beside it; never tint the tube to the brand.
- **The product appears twice.** First as terminal matter: its real log lines, commands, counters, or a glyph picture built from a simplified silhouette of its screen. Then once for real, as the warm surprise: the glyph picture resolves into the real screenshot or screen recording in a `Device`, or the camera pulls back off the glass to show it.
- **Real numbers are the log**: counts, versions, timings and progress come from the product and are in `facts.md`. Invented log lines or sample accounts carry `<ExampleBadge />`; no real names, emails or keys in any typed text.
- **End card**: the product's name typed as a header on the title grid, one command-like line saying where to get it, a blinking cursor after it, and the logo in the second colour.
- **Arabic**: the screen mirrors (prompt and tag on the right, lines flush right). Arabic letters join, so text is typed **word by word**, never cell by cell, in a monospace Arabic face with no letter-spacing; digits and codes stay left to right (`isolateNumbers`). "The picture is made of words" breaks a sentence into whole words, and glyph pictures are built from dots, digits and box characters, not from split Arabic letters.
- **9:16**: use the narrow grids (12, 40, 110+ columns) so words stay readable on a phone, wrap the LOG strip to two lines and lift it above the bottom 22%; keep typed text out of the top 12% and the right 12%.

## 12. Variation space

You decide who types, what the screen is for, the grids, the opening, the ending, the camera (grid) path, the pacing and whether the second colour appears at all.

- Structures: **a chat log** (two users typing to each other across one night, timestamps as scene headers); **a system manual** (chapter headers, diagrams in ASCII, one page going wrong); **a boot-to-shutdown day** (one machine's day as a sequence of scheduled jobs, each drawing a picture of what it does).
- Openings: **mid-scroll** (a buffer already racing past; it stops on one line); **a printout** (a dot-matrix sheet feeding up, then the screen takes over); **an error first** (a crash dump, then we rewind to what caused it).
- Endings: **the buffer fills** (the story's text scrolls up and away until only the prompt remains); **the screen saver** (after the last line, a slow drifting pattern takes over the idle screen); **the cursor stops blinking** (no power-off, just a final state held).

---

Adapted for Halal Motion Videos from the `ascii-crt` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
