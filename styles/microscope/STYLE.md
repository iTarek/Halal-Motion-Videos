# Microscope Story

> Real, licence-clean microscopy of a real specimen, seen as it is, and one continuous change of scale that carries the viewer from the glass slide in the hand to a single cell. Focus breathes when the magnification changes, a focal plane sweeps when the camera lands, and every scale bar, field of view and reading comes from the image's own metadata.
> References (grammar only): Charles and Ray Eames' *Powers of Ten* (one continuous change of scale with a readout riding along); premium microscope launch films (dark bench, glass catching light, restrained marks, clean instrument sound); digital-pathology viewers' instruments (scale bar, field of view, magnification). Copy none of their layouts, interfaces, typefaces or sounds; never name them in the film.

## 1. Essence, and what it is not

- **The specimen is a photograph**: a real micrograph or whole-slide scan of the actual sample, either the user's own or CC0, public domain or CC BY. Nothing on the specimen is drawn, retouched or generated. A whole-slide scan is the ideal source: one sample, one registered set of levels from millimetres to microns, with the pixel size in its metadata.
- **Scale is the camera**: one log-space dive (and, when the story wants it, the climb back) through nested plates of the same sample. The scale bar shortens and jumps in a 1-2-5 sequence, the field-of-view readout rolls, the magnification steps.
- **Focus has a grammar**: a rack-in from soft at the start, a short breath (blur + a hint of field change) each time the magnification changes, a focal-plane sweep across the frame when the camera lands.
- **Readings are measured**: every number is computed from the image (pixel size × pixels) or supplied by the lab that measured it, and the screen says how it was measured. Describe what was measured; never diagnose. Every reading goes in the video's `facts.md` with its source or its method.
- **One reading per screen**, in the single accent colour.

Not Satellite Briefing (no grey grade; the stain keeps its colour), not Sci-fi HUD (no glowing wireframes or crosshairs), not Data Storytelling (no chart paper), not a keynote (no slides or header bars).

## 2. Materials & rendering

- **Plates**: the scan's levels as plates in one world frame (finest-level pixels), the coarse levels whole and feathered at the scan edge, the fine levels as crops around where the camera lands. Each frame shows the finest plate that is shrunk by no more than about 1.45×, and blends the next level in between 2.2× and 1.45×: no seams and no visible upsampling, because every level is the same sample, already registered.
- **The naked-eye plate**: a photo of the whole slide (many scanners save one), placed in the world frame so the tissue lines up with the scan. Cut the glass out of the scanner tray and remove sensor streaks; a manufacturer's printed logo on the slide stays as it is, never painted over. Below about 30 mm of field the photo would be upsampled: let the cover glass become clean glass (its dust leaves the focal plane).
- **One grade for every plate**: glass normalised to a warm white, a little density and chroma in the stain, nothing else. No false colour, no film emulation.
- **The bench**: graphite under a slow pool of light; a soft shadow under the slide.
- **Focus**: a Gaussian blur over a picture drawn larger than the frame (so edges never go dark); the focal sweep is a tilted sharp front crossing a softened frame. A light illumination vignette, nothing more.
- **Marks** in screen space but anchored to the specimen through one world → screen function: hairlines of about 0.2% of the frame's short side with a dark or light halo, circles drawn on as arcs with cardinal ticks, dimension lines with end ticks, leader lines with one elbow. Counted pixels are shown as a mask revealed behind a scan front, then kept as a faint trace.
- **Frosted panels** (dark translucent glass over a blurred copy of the frame) for readings, instruments, narrated lines and the credit: white type reads on glass and stain alike, nothing switches colour mid-shot.

## 3. Colour logic

- Glass: warm paper white. Bench: graphite. The stain is evidence and keeps its true colour (e.g. trichrome red and blue, H&E pink and purple).
- One accent, cool and away from the stain's hues (mint against red and blue; amber against a green or purple stain), only for the measured reading and the counted pixels.
- Ink on glass is near-black; type on stain sits on a frosted panel in warm white.
- Example: glass `#F4F1EC`, bench `#0B0D0F` → `#2A3036`, ink `#181B1F`, panel `rgba(12,14,17,0.74)`, accent mint `rgb(120,240,205)` on stain and `rgb(0,122,99)` on glass.

## 4. Type & on-screen text

- **Roles**: a light condensed grotesque for readings and the scale bar (the kind of Barlow Condensed, 4–7% of the frame's short side); a monospace for instruments and pixel counts (the kind of IBM Plex Mono); a sans for labels; a serif only for the title. The brand's own face takes the labels and the title; readings and instruments keep the condensed face and the monospace, with fixed-width digits so a rolling number doesn't jitter.
- **Instruments** live in one frosted panel in a corner: scale bar with its value, field of view, magnification with a small nosepiece glyph that turns a quarter on every change. The source credit in a small panel in the opposite corner.
- **Readings** sit in a frosted panel beside what they measure, joined by a leader: a small label above ("collagen share of tissue area"), the number large in the accent, the method or the raw counts below.
- **Narrated lines**: a frosted strip low in the frame, one short line at a time, each word appearing as it is spoken. If the film is bilingual, one line per language with the film's language on top, never wrapped; split a long line into two.
- Nothing smaller than about 2% of the frame's short side. A reading that rolls is reported by its landing value, and the landing value is what stays up to be read.

## 5. Motion quality

- The camera is zoom, roll and position interpolated as a log spiral between keys (about the fixed point of the two frames), so every push is a true dive towards one point and the roll is part of it. Ease the moves, creep 2–5% during holds; never a frozen frame longer than a second.
- Magnification changes happen where the plates actually change, each with a breath of focus, a turret click and the new magnification said once, large.
- Marks arrive by being made: a dimension line grows from its centre, a circle is drawn as an arc, a scan front counts pixels while the reading rolls, the reading lands with a small spring.
- Never moves: the specimen under its marks, the instrument positions.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| The dive (log zoom with roll) | going to look for yourself | an opening; from the slide to the cell |
| Locked frame, slow creep | evidence, a measurement | a reading; a comparison |
| Truck at one magnification | a second sample of the same thing | the counter-example; "meanwhile, nearby" |
| Pull back to frame two marks | comparison | the verdict |
| Focal-plane sweep | arriving; depth | a landing; a reveal inside one frame |
| The climb (reverse dive, scale bar jumping back) | consequence, scale | an ending; a return to the eye's scale |

At key moments the measured structure fills a third of the frame height or more; instruments in a corner, narrated lines low and centred, readings beside their marks. Transitions are scale changes, trucks and focus, never cuts or crossfades between samples.

## 7. Sound palette

- **Instrument foley**: the objective turret (a click, a detent, a small metal ring), a focus servo, pen on glass for each line drawn, a band-passed scan travelling left to right with counter ticks that speed up, a soft filtered sweep for the focal plane.
- **What gets a sound**: every change of magnification, every mark being made, every reading landing. The dive itself and the creep stay silent apart from the servo.
- **A reading lands on a glass tap**: one short, clear note of struck glass, the only tonal sound in the film, higher for each later reading.
- **Bed**: a quiet lab room (a fan, air moving), low and without a pitch you could name.
- **Silence** before the verdict and before the climb; the first sound after it is the reading or the turret.
- **Sound across a change**: the focus servo starts a few frames before the magnification changes and runs on until the new plate is sharp.
- **Voice**: a calm, exact narrator; numbers spelled out in the script for the voice, digits on screen.

## 8. Native moves

- **The dive.** From the slide in the hand to a cell in one camera, the turret clicking at each real change of level. *Fits content like:* a biopsy to its cells; a coated surface to its crystals; a hair or skin section to its layers.
- **Counting the colour.** Draw a circle, let a scan front cross it, light up every counted pixel and roll the share up to its landing value; show the raw counts underneath. *Fits content like:* collagen in tissue; porosity in a ceramic; coverage of a coating; pigment in a sample.
- **Two circles, one verdict.** Measure one place, truck to another at the same scale, then frame both and say what differs. *Fits content like:* treated against untreated; edge against centre; before against after.
- **The focal sweep and the ring.** Land, sweep the focal plane across the frame, ring one structure and give its size. *Fits content like:* a nucleus; a grain; a fibre's diameter.
- **The climb back.** Pull out to the eye's scale with the scale bar jumping backwards; a title card written on the glass.

## 9. Pitfalls of the medium

- **Licences**: most microscopy on the web is CC BY-NC or all rights reserved. Usable: the user's own scans, CC0 whole-slide scans (e.g. the OpenSlide test data: check each file's licence line), public-domain government micrographs (NIH, CDC PHIL, NASA, USGS), CC BY collections (Cell Image Library, Wellcome Collection), with every file, its licence and its credit listed in `facts.md`. Not usable: CC BY-SA without agreement, NC images, journal figures, AI images.
- **Finding material for a new topic**: for a product, a lab or a brand, ask the user for their own scans first, with a scale. Otherwise search by organ, stain or material plus "whole slide" in the collections above, NCI Imaging Data Commons (licence per collection) and Wikimedia Commons (filter by licence); prefer a file whose metadata carries its pixel size. CC BY-SA, ODbL or "no known restrictions" are not CC0: name the terms to the user and ask before using them. Never stand in a generated image for a real specimen.
- **Different samples never zoom into each other**: two micrographs of "the same thing" at two scales are two specimens. Use one scan; if you must join sources, cut on a focus breath and say so.
- **Pixel size**: take it from the file's metadata or the scanner's export, not from a guess; a slide photo's resolution tag can be trusted only after checking against the scan.
- **Upsampling** shows as mush beyond about 1.6×: end the dive at the scan's real resolution.
- **Tile seams**: some scanners overlap tiles; frame out visible seams.
- **Labels and logos** on the slide: a manufacturer's logo is left as it is, never filled, covered or cropped out. A patient's name or ID is never shown: cover the label with a fictional one and `<ExampleBadge />`, and blur the barcode.
- **Claims**: a stain's colour means what the stain protocol says, nothing more; measured shares are of the drawn region and the stated threshold, never a clinical score.

## 10. Building it here

- **Plates are image files** in the video's `public/…/img/` folder, each an `<Img>` placed by its real position and size inside one world `div`. The camera is one CSS `transform` (translate, rotate, scale) on that `div`; interpolate the logarithm of the scale between keys with `prog(…, ease.inOut)` and keep the target point fixed.
- **This repo cannot open whole-slide formats.** Ask the user for exported pictures of each level (the whole slide, then crops at each magnification) with the pixel size or field width of each, and keep every plate under about 4,000 px a side.
- **Plate blending**: each plate's `opacity` comes from the current scale, so the finer one fades in before the coarser one is stretched.
- **Focus**: `filter: blur()` on a world wrapper drawn about 5% larger than the frame. The focal sweep is a sharp copy over a soft copy, revealed by a tilted `mask-image: linear-gradient(…)` band that crosses the frame.
- **Frosted panels**: `backdrop-filter: blur()` with a dark translucent fill.
- **Marks** are one SVG overlay in screen space, positioned by the same world → screen function as the camera; lines and arcs draw on with `stroke-dasharray` and `stroke-dashoffset`; a reading lands with `springAt(…, SPRING.snappy)`. The counted-pixel mask is an uploaded mask image in the accent colour, revealed with `clip-path: inset(…)` behind the scan front. Nothing here counts pixels for you: a share, its threshold and its mask come from the user or their lab; a scale bar or a field of view is arithmetic from the pixel size.
- **Overrides**: one scene and no cuts, so no `SceneTrack` sweep; no `Finish` grain (the picture is evidence; draw the light vignette yourself); no `Backdrop`; springs only on a landing reading, everything else is eased. It is one take: no `SceneFrame` entry or exit, and if the take is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.
- **Camera keys and magnification changes live in `timeline.ts`**; `Soundtrack.tsx` puts the turret click, the pen and the glass tap on the same frames.

## 11. In a product video

- **The specimen is the product itself**, or what it is made of or acts on: a fabric's weave, a coating, a ground coffee bean, a screen's sub-pixels, a grain of flour. The user supplies the pictures; a stock micrograph of "something similar" is a different specimen and a false claim.
- **The brand's colour is the accent**, when it sits away from the specimen's own hues. If it doesn't, the accent stays mint or amber and the brand colour appears only on the end card. The specimen's colour is never changed to match a brand.
- **Readings are real**: measured by the user's lab or computed from the image by a stated rule, each in `facts.md` with its method. Say what was measured and stop there: no health claim, no "clinically proven".
- **An app or a device belongs at the end of the climb**: the camera returns to the eye's scale and finds the pack, or the screen in a `Device`, on the same graphite bench.
- **End card**: the product name written on the glass, the logo on a frosted panel, one line on where to get it.
- **Arabic**: the instrument panel and the credit swap corners, readings sit on the other side of their marks, leaders mirror. Labels in a clean, low-contrast Arabic sans, whole words, no letter-spacing; numbers and units keep their left-to-right order (`isolateNumbers`).
- **9:16**: the dive is centred, so it holds. Instruments go under the top 12%, the narrated strip sits above the bottom 22%, and a reading goes above or below its mark instead of beside it, clear of the right 12%.

## 12. Variation space

You decide the specimen, the stain or imaging method, what is counted, the camera path, the accent, the ending.

- **Structures**: a single dive ending in one measurement; a comparison of two regions or two samples at one scale; a climb that starts on a cell and reveals the object.
- **Openings**: the slide on the bench under moving light; a cell already in focus, the climb revealing what it belongs to; a blurred field racking into focus.
- **Endings**: the title written on the glass; a last reading held in silence; the slide lifted out of frame.
- A further example: a coated steel sample: one electron-microscope scan, a dive to one crack, a circle counting coverage, a ring around one grain.

---

Adapted for Halal Motion Videos from the `microscope` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
