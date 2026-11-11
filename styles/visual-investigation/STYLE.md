# Visual Investigation

> A cold investigation desk: footage, photographs, documents, sound and maps from one real event, laid out on one shared clock so they check each other. The clock lives inside the picture: timestamps on the evidence, a playhead on a data chart, a stopwatch over the decisive seconds. Frozen frames are circled and magnified; quotes are highlighted on the page they come from; a plan shows where cameras stood and where they looked; what is known and what is not are kept apart; at the end every piece of evidence is pulled into one map.
> References (grammar only): newspaper visual-investigation videos, architectural reconstructions of events, broadcast verification units. Never copy them, quote their names or use their branding.

## 1. Essence, and what it is not

1. **Sources meet at one moment.** The payoff of every section is two or more independent sources (a frame, a photo, a statement, a report line, a sound) pointing at the same place or the same second. Cut points are sync points.
2. **One clock, read in the picture.** Time is carried by large readouts that belong to the layout: the timestamp on each message card, a playhead with its clock on the data chart, a `T+xx.x` stopwatch over the decisive seconds, a frozen "32 s". The scale changes with the story (hours → minutes → seconds → days) at section cuts. A permanent timeline band under every shot is **optional and usually wrong**: it eats the bottom of the frame, adds a layer of small labels and goes empty once the story leaves the clock.
3. **One finding per layout.** Each section says one thing; a heading is part of the layout, never a page header.
4. **Uncertainty is drawn, not apologised for.** `≈`, *inferred*, *schematic*, dashed boxes. Known and unknown are separate columns. A source that does not cover a stretch simply is not on screen yet (it lights up late in its column); never an empty "no footage" box, which reads as a broken render.
5. **Restraint.** Real events and real people: no slow motion of an accident, no sound that tells you to feel; fire or damage only inside evidence frames; people as counted dots and numbers.

Not **Satellite Briefing** (no orbital imagery, no zoom from space). Not **Archive Light Table** (no paper on glass, loupes or hands: documents are flat evidence frames). Not **Halftone Dossier** (no print texture, stamps or collage). Not a newsreel package (no channel bug, ticker or anchor voice). Not a keynote: no centred title slides, no page turns.

## 2. Materials & rendering

- **Three kinds of source at least**: moving image (archive film, a fixed camera, phone video, a screen recording), documents (a statement, memo, message log, report page), photographs. Add sound (original commentary, radio, recordings), data (weather, telemetry, counts) and maps whenever they exist.
- **Real material here** is what the user uploads, screenshots and screen recordings of the product, and public data. Nothing is generated to stand in for a real image.
- **Documents**: a scanned page is shown as a strip or a page, never re-drawn; only the decisive line is highlighted (red, multiplied, about 0.6 opacity, wiped in reading order). Text that exists only as a transcription (a report, a message log) is re-typeset and labelled as a transcription.
- **Scale limits**: old archive film is enlarged no more than about 2.5×, modern footage no more than 1.5×. Never colourised or "restored" copies.
- **One grade**: footage and photos `grayscale(1) contrast(1.22) brightness(0.94)`; paper `grayscale(1) contrast(1.05) brightness(0.86)` (white pages pressed to light grey); maps greyscale, inverted, `brightness(.62)` so they read as dark line drawings.
- **One grain**, moving every frame, only on sources: about 0.22 on footage and photos, 0.10 on paper. Never on type or lines.
- **Drawn evidence** (plan, side schematic, charts, dot matrix) is thin line work on the panel colour, marked *schematic* when it is not measured.
- A channel bug or watermark is never cropped out, blurred or covered: a source that carries one is shown as it is, with its credit, when there is the right to use it, or it stays out. The source's own title cards are cut away in time, not hidden.

## 3. Colour logic

| Use | Value |
|---|---|
| Ground | `#0B0C0E` |
| Panels | `#141619` |
| Hairlines, frames | `#2E3238` |
| Text | `#ECEAE4` |
| Secondary text | `#8B9097` |
| Ticks, *uncertain* | `#4A4F57` |
| **The one accent: here / now / match** | `#FF4A2E` |
| Paper cards (typeset messages) | `#E4E0D4` with ink `#1D1D1B` |

Sources are greyscale; red is the only colour and it only ever points: circles, the chart playhead, sync lines, highlights, ✓ badges (a drawn tick in a red box, no words), the zone everything converges on, the *unresolved* column, a strike-through on a wrong claim.

## 4. Type & on-screen text

- **Faces**: a bold sans for headings and findings (3–11% of the frame's short side); a monospace for tags, timecodes and ticks (the IBM Plex Mono kind); a serif italic for a quote's original wording (the Source Serif kind), with a translation underneath in the secondary colour only when the narrated line doesn't already give it. A brand's own sans can take the headings; the mono stays, because the clock is the look.
- **Few words per frame.** Each frame keeps only what this moment needs: the main readout or heading, the quoted original (the highlighted line), and one short source tag per piece of evidence. No eyebrow labels, no second-language twin under every label, no archive numbers, dates or "estimate / schematic / not to scale" footnotes unless the moment is about them, nothing the voice is saying at the same time.
- **Source tag**: a small chip + `type · source` in mono, about 12 characters at most (`photo · site camera 2`, `log · 2026-05-08`), sitting just above its frame. Full credits go on the end card, not on the panels.
- **Lower third**: a red bar + place name in bold + one mono line (a place code).
- **Narrated lines**: one line in bold at the bottom of the layout, on the reading side or centred, with a soft black shadow, each word timed to the voice; a long sentence becomes two lines shown one after the other. Original sound gets its words on screen too, marked `[original sound]`.
- **Verdict and comparison frames** hold at least 2.5 s with every item fully in frame. Counters (timecode readouts, the stopwatch) and tick labels are exempt from reading time.

## 5. Motion quality

- Elements **cut in** (opacity in 3 frames at most) with a 3–4-frame white flash, as if pulled from the evidence locker; nothing flies, bounces or scale-pops.
- Only things that are *drawn* are progressive: circles drawn clockwise in 0.5 s (ease-out), leaders and links 0.4–0.8 s, plans stroke by stroke, highlights wiped, typewriter text for message cards.
- Inside a frame: a slow push (at most 1.9× on a map, 1.06× on a photo) is allowed; the "camera" itself never moves. Layouts change on cuts.
- The event clock (chart playhead, stopwatch) eases between keyframes and moves at constant speed inside a timed run (each tick = one real second).
- Scale changes (minutes → seconds → days) happen on section cuts, carried by the readout changing form (clock → `T+` stopwatch → date), not by a zooming band.
- Something changes at least every second; holds are for verdicts only.

## 6. Shot & layout grammar

- **Margins** of about 5.5% of the short side. In 16:9, content uses the top five-sixths of the height and the narrated line sits below it; in 9:16, content sits between the top 12% and the bottom 22%, columns become rows, and the narrated line is the last row. Layouts use the full height they have; no strip is reserved for a timeline.
- Panels are hard-edged rectangles with hairline frames; footage panels keep the source's aspect.
- Typical layouts: **map → plan** on one side with a reference photo and a footage panel on the other; **one big statement + one quote + one wide schematic**; **five-source board** (three evidence frames on top, sound and report below, schematic beside, red links converging); **three-column sync grid** (report / photo / video under one stopwatch, each column lighting up when its source begins); **document strip + two-column verdict**; **claim card + fact-check card + dot matrix**; **evidence map** (plan, broken-axis mini timeline, schematic, thumbnails with links).
- Avoid centred layouts, page headers and slide-like page turns. Transitions are hard cuts on a half-second grid (the film's pulse: 15 frames), white flashes and the rewind; no dissolves.

## 7. Sound palette

- **Clockwork**: a pendulum tick every half second in the minute-scale sections, louder in the waiting minutes; in a timed run one tick per **event** second, with an accent every fifth. It is the audible stopwatch.
- **The desk's materials**, all made by code: paper for documents, a shutter for photos, Morse "dits" and keystrokes for messages, teletype chatter, a rewind sweep, pencil scratches for plans, a soft wooden tick for each ✓ badge.
- **One deep thump** for the decisive moment, and then near-silence. No effect sounds on harm to people.
- **Bed**: a filtered room tone, far under the voice; never tonal.
- **Original sound** (archive commentary, radio, a recording from the upload, in stretches with no background track): played as it was recorded (nothing here filters a recording, and evidence is not dressed up), shown as a waveform with a red play-line and words lighting as they are heard. Everything else drops away under it.
- **Silence**: half a second of nothing before a verdict frame cuts in.
- **Sound across a cut**: the clock's tick runs on over every cut inside a section, and original sound starts a moment before its waveform panel appears.
- **Voice**: calm and flat, stating what the evidence shows and no more.

## 8. Native moves (and how to do them)

- **Freeze, circle, magnify.** Freeze a frame with a white flash; draw a thin red circle clockwise; at 60% a leader and a bold label appear; a ×2 loupe opens beside it, cropped from the same source pixels (never beyond one source pixel per screen pixel). *Fits:* a serial number on a part; a crack in a weld.
- **Hard sync point.** Pick one instant every source can recognise (an impact, a flash, a public clock, a horn blast) and align each source to it. A source that starts late just appears late; if the gap matters, say it in the voice. *Fits:* which phone started filming first; when the launch camera lost the vehicle.
- **Three-column sync grid.** Document / photo / video side by side under one big stopwatch; each column cuts in (white flash) at the moment its source begins, so the grid fills in reading order as the clock runs; freeze on the sync point with a red dashed line across the pictures. *Fits:* a doorbell camera, a courier's scan and a delivery log.
- **Readouts change scale.** The time readout changes form at each section cut: card timestamps and a chart playhead (minutes), a `T+` stopwatch (seconds), dates (days), as the story narrows or widens. *Optional:* a bottom timeline band with tracks per source kind, only for a film that stays on one clock throughout; keep it free of labels and drop it when the clock stops. *Fits:* a website outage from the week to the minute.
- **Rewind cold open.** Start on the decisive frozen frame, slam the other sources into a grid, sweep a sync line, then rewind (footage playing backwards, scan lines) to the start. *Fits:* any reconstruction.
- **Messages on the clock.** Typeset radiograms or messages land at their timestamps with Morse and keystrokes; red dashed leaders tie each card to a pin at its time on the data chart's axis. *Fits:* control-tower calls, support tickets, status updates.
- **Data chart with a playhead.** A chart (wind, speed, temperature) across the lower part of the frame with a time axis, event bands (storm, outage) labelled with one word, the message pins, and a red playhead carrying the clock. *Fits:* power-grid load before a blackout.
- **Map → plan.** A real survey map pushes in to the site, then cuts to a measured plan with the subject's position, a bearing, a distance ring, a camera point and an inferred view cone; the map stays as a locator inset. *Fits:* where each camera stood.
- **Evidence → model links.** Every circle in every source sends a red dashed link to the same zone of one schematic; ✓ badges land 0.12 s apart, each with its tick. *Fits:* which valve a leak started at.
- **Then vs. record.** Play a period claim as original sound, then a fact-check card; strike through the wrong words in the claim. *Fits:* a press release against the filed numbers.
- **Known / unresolved.** Two columns, ticked vs. dashed boxes, every item held whole for at least 2.5 s, one source tag for the board. *Fits:* any inquiry's conclusion.
- **Dots for people.** One dot per person; those affected turn into red open rings one by one; a single large number. *Fits:* passengers on a stranded train; households in a blackout; users in an outage.
- **Evidence map.** Plan, broken-axis mini timeline, schematic and thumbnails of every source, all links converging; the poster frame. *Fits:* the end of any investigation.

## 9. Pitfalls of the medium

- **Inference passed off as fact.** Camera positions, photo times and offsets need `≈ / inferred / unlocated` on screen and in `facts.md`.
- **Early reports as facts.** The first-night memo and the period newsreel often disagree with the final report; use them as images or as claims to check, never as the source of a number.
- **Faking a multi-camera event.** With one usable film, do not borrow clips of unclear origin; cross-check film + photos + documents + sound instead. The structure still holds.
- **Seams in "continuous" shots.** An exposure jump or splice breaks timing; time durations from the official record and state the alignment error.
- **Time zones and clocks.** Old reports may use standard time while the place ran on daylight time; pick one and state it once on screen (`18:25:00 EST` on the first readout).
- **Too much at once.** One layout, one finding; at most five sources on a board, and the narrated line never repeats the heading word for word.
- **Too many words on screen.** Eyebrows, twins of every label, archive numbers, footnotes and translations the voice already gives turn the frame into noise.
- **Empty placeholder boxes for missing material.** A grey "no footage" panel looks like a render error. Fill the slot with real material, change the layout, or let the source appear when it starts.
- **A strip reserved at the bottom** (timeline band, caption rail) leaves an empty band when it has nothing to show.
- **An accident as spectacle.** No slow motion of fire or impact, no full-screen flames, no effect sounds on harm to people.

## 10. Material

1. **Ask the user first.** Before searching: does the user have their own footage, photos, documents, recordings or data (dashcam files, a report PDF, a spreadsheet of readings, logs and screen recordings of the product)? Their own material always comes first.
2. **Public material, judged item by item.** Read each item's own rights statement: archive film is usable only when its page says public domain; on Wikimedia Commons read the file page (author, source, licence); national space and survey agencies often publish public-domain images and maps; "no known restrictions" is **not** a licence. Allowed: public domain, CC0, CC BY (credited in full on the end card). Not allowed: CC BY-SA, unclear origin, colourised or restored copies.
3. **Tell the user before downloading**: what (title, length or pages), from where and under which licence; note the same in `facts.md`.
4. **No private person's details on screen**: names, faces, number plates, messages and account data in the material are cropped out or swapped for fictional stand-ins with `<ExampleBadge />`.

## 11. Facts

Keep the video's `facts.md` (claim on screen or in the voice → source → quoted wording), list every inference separately, and check the final script and every on-screen line against it before calling the film finished.

## 12. Building it here

- **Plain React and CSS, no camera**: each layout is a set of absolutely positioned panels sized from `useLayout()`, with `p()` turning columns into rows for 9:16.
- **Sources** are images or `<OffthreadVideo>` in a panel with `object-fit: cover` and the grade as a CSS `filter`. A freeze or a rewind is the same video inside `<Freeze frame={…}>`, fed a source frame worked out from the film frame; what is inside `Freeze` is silent, so original sound is its own `<Audio>` (from `@remotion/media`) in a `<Sequence>`. The grain is an overlay inside each source panel (`mix-blend-mode: overlay`), shifted every frame from the frame number.
- **Cut-ins**: opacity over 2–3 frames plus a white `div` for 3–4 frames. **No springs**: this style overrides the engine's default; `prog` with `ease.out` is only for things being drawn.
- **Drawn evidence is SVG**: circles and links draw with `stroke-dashoffset`; a highlight is a red `div` under `mix-blend-mode: multiply` opened with `clip-path`; the loupe is a second, clipped copy of the same image at ×2.
- **One clock function** maps the frame to event time; the stopwatch (fixed-width digits), the chart playhead and the tick sounds all read it. Use `Waveform` with `src` and `at` so the wave follows the real recording.
- **Leave out** `Finish` over the frame (grain belongs to sources only), `Backdrop`, `MaskRise`, and the sweep: `<SceneTrack sweeps={false} />`. Nothing is 3D. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **Sections sit on the 15-frame grid in `timeline.ts`**, with the sync frame exported; `Soundtrack.tsx` places ticks, the thump and the voice from the same numbers.

## 13. In a product video

- **This palette is the look**: near-black ground, greyscale sources, one accent that points. The accent may be the brand's colour if it is vivid enough on black; otherwise keep the red, and the brand colour appears only in the logo.
- **A claim about the product, tested on one clock.** Screen recordings, photos of the product in use, a log line and a page of the docs are the sources; the stopwatch counts the recording's real frames; the three-column grid can be phone / laptop / log under one `T+`.
- **The product's screen is evidence like the rest**, greyscale in its panel, until the verdict: there, that one panel returns to full colour. It is the film's one hero moment.
- **Only measured numbers**, each in `facts.md` with how it was measured; `≈` and *inferred* where they apply. Never stage a chat, a review or a log as if it were real: anything illustrative carries `<ExampleBadge />`, and real names in recordings are swapped for stand-ins.
- **End card**: the evidence map as the poster frame, then the logo on the ground colour with one line on how to get it, and the source credits small beneath.
- **Arabic**: mirror every layout (the first column on the right, the grid filling leftward as the clock runs) and wipe highlights from the right. Timecodes and `T+` readouts stay left to right in the mono (`isolateNumbers`). Message cards type on a whole word at a time, never letter by letter, with no letter-spacing. A sturdy Arabic sans for headings and a naskh for quotes suit it.
- **9:16**: the stopwatch on top (below the top 12%), sources as rows beneath, the narrated line above the bottom 22%, tags and badges out of the right 12%.

## 14. Variation space

You decide per film: the event, the sources, the sync point, which time scales the clock passes through, the layouts, the opening and the ending.

- **Three structures:** a cold open on the decisive frame, then rewind and rebuild; one question ("where did it start?") answered source by source; a strict clock (T−10 min → T+1 h) with findings dropping in where they happen.
- **Three sync points:** an impact or flash frame; a sound peak heard in several recordings; a public clock or broadcast time signal.
- **Three endings:** the evidence map; the known/unresolved board left on screen; back to the opening frame, now fully annotated.
- **Other subjects:** a parcel's journey (door camera, scans, delivery log), a storm's landfall (weather data, phone videos, maps), a disputed call in sport (camera angles, rulebook), a launch failure (tracking cameras, telemetry, accident report).

---

Adapted for Halal Motion Videos from the `visual-investigation` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
