# Live Countdown Split-screen

> An edit style, not a look. Real footage of one event with a known zero (a launch, a store opening, a final whistle, polls closing), shown in real time: screen time equals event time, a clock ticks every second, and the screen splits into more and more cells as the moment nears, every cell showing the same second. At zero the cells merge into one picture and the clock flips.
> References (grammar only): live sport and election-night coverage for the clock that never leaves the screen and the multi-box split; the multi-camera archive panels and mission-time codes of the documentary *Apollo 11* (2019). Never copy their type, colours, sounds, graphics or shots, and never name them in the film.

## 1. Essence, and what it is not

1. **Real time.** One continuous stretch of the event, never cut, never re-ordered, never sped up. Slow-motion sources are played back at real speed. The clock and the picture can be checked against each other at any frame.
2. **The clock is the lead.** It ticks every whole second (a sound and a falling digit), it says who is in control, and it changes state at zero.
3. **Cells show the same second.** Every video cell is synced to the clock, or says plainly that it is not (§8, "sync badge").
4. **The layout is the edit.** Cuts are layout changes, and every layout change lands on a real spoken call or a visible event, never on a decorative rhythm.
5. **More cells, closer to zero; one picture at zero.** The number of cells is the tension curve.

Not a montage (time jumps), not a security wall (the layout never moves), not a flashback structure (real time cannot go back), not a slide deck (cells that don't follow events, text filling the cells, centred titles with page turns).

## 2. Materials & rendering

- **Three kinds of material at once**: video of the same moment from 2–8 viewpoints (cameras, or screen recordings of several devices), documents (a fact sheet, a schedule, a release note: shown as paper or as the real page, never retyped as a slide), and photographs (the people of the day). Our own type explains them; type printed in the material is only picture.
- **Data drawn by us**: checklists, bars, a process profile, a second countdown to the next milestone. Every number comes from an official source (§10).
- **Cells**: hard rectangles on near-black `#06080A`, an outer margin of about 1.25% of the frame width, gutters a third of that, a 1 px border `rgba(222,232,238,.16)`, a light radial vignette (to 36% black) on video cells. No rounded corners, no drop shadows, no 3D.
- **Camera chip** in the top reading-side corner of every cell: a dark plate at 84%, a square dot (orange = synced video, grey = unsynced or still), a code (`CAM 4`, `DOC`, `LIST`) and a short name.
- **Burned-in text in the sources** (camera IDs, timers, readouts) is framed out by a per-shot usable region, or blurred out after it has been used for syncing. Never shown as if it were ours. A broadcaster's bug, a logo or a watermark is different: that source is left out, or shown whole with the mark in view when the user has the right to use it. Never crop, blur or cover someone else's mark.
- **One grade for every source**: contrast up about 7%, saturation down about 10%, shadows a touch cool and highlights a touch warm, then a light film grain over the whole frame. Control rooms and launch pads look like one film.
- **Resolution**: footage at most 1.5× its source pixels; for a punch-in, use a higher-resolution copy of that stretch instead of enlarging a small frame. Documents at one source pixel per screen pixel or better.

## 3. Colour logic

| Role | Value |
|---|---|
| Ground | `#06080A`; panels `#0B0E11` |
| Main text | `#F2F5F7`; secondary `#7C878D` |
| Accent: the T− sign, synced dots, ticks done, event flags, the active control segment | `#FF5B1F` |
| Speaking light, "heard" tags | `#FF3B30` |
| Plates over full-screen footage | `rgba(6,8,10,.80)` |
| After zero, the clock block | ground `#FF5B1F`, text `#0A0B0C` (inverted) |

Orange means "now / synced / done". Grey means "pending / not synced". Nothing else is coloured; colour belongs to the footage.

## 4. Type & on-screen text

- **Clock digits**: a condensed sans with fixed-width digit slots (the Barlow Condensed kind), so the clock never jitters; up to about 12% of the frame height in 16:9 (about 16% of the width in 9:16), the T−/T+ sign at 0.85×, tenths at 0.41× in grey, a ten-segment sub-second bar under it.
- **Text**: a clean, sturdy grotesque for names and lines; a monospace for labels, codes and small print. A brand's own sans can take the text role; the clock keeps a condensed fixed-width face regardless.
- **The live transcript is the caption.** A fixed box (a bottom corner, or a cell in the grid): a speaking light and the speaker type (commentary / loop / narrator; the narrator, our own voice, is marked in orange so it is never mistaken for the event's audio), the line appearing word by word at the spoken times (a 2–3 frame fade per word, a block cursor). **One line, never wrapped**: a long sentence becomes two lines in turn. Show only what is said; note doubtful words in `facts.md`.
- **A comparison** (two bars, two numbers) stays fully on screen at least 2.5 s.

## 5. Motion quality

- **Clock**: on each whole second the new digits drop about 1.3% of the frame height in 4 frames, easing out; the sub-second bar empties one segment every 3 frames (and fills after zero).
- **Re-layout**: 10 frames, eased in and out. Cells that stay interpolate their rectangles; new cells open from their leading edge; leaving cells close to it; a new cell flashes a thin orange border for about 6 frames when it lands. A grid filling up pops one cell per spoken count in 9 frames.
- **Swaps** (one source replaces another in the same rectangle) wipe in from the leading edge. Hard cuts only between full-screen sources.
- **Photographs** push in at most 6% over their whole stay; names pop one by one 5 frames apart. Documents move their window down a row in about 14 frames; the highlight sweeps along the row in 10.
- **Never**: slow push-ins on video to fake motion, page-turn transitions, centred pop-up words, speed ramps.

## 6. Edit grammar

- **Screen time = event time.** One mapping for the whole film: event time is the frame number minus the zero frame, over 30. Each source has its own offset to that clock, measured once.
- **Cut points are calls.** Each layout change starts on the first word of a real call ("ten", "go for…", "ignition", a name) or on an event visible in the footage. Sound design follows; it never sets a cut.
- **Cell count rises toward zero**: 1 → 2 → 3–4 → many (6–9, the clock itself becomes the centre cell, the transcript a cell) → **one** at zero → a few again after zero (the event's consequences) → one under the title. The shortest layouts are nearest to zero.
- **Inside a cell, the source may cut itself** (a broadcast switching cameras): keep it; we only cut the layout.
- **Silence before zero**: every designed sound drops out a quarter-second before zero; only the event's own sound and the clock remain.
- **Full-screen moments** carry the clock and transcript as plates at the bottom, over a gradient (0 → 75% black).

## 7. Sound palette

- **The clock is the pulse**: a tick on every whole second (two alternating small bright ticks, set slightly left and right), louder in the last ten seconds, one soft single tick after zero. One second is 30 frames, and every other sound lands on a tick or on a call.
- **Interface foley for the layout**: a short whoosh and a metallic snap on a re-layout, a snap as a cell pops, a wooden tock for a checklist tick, a swish for an event flag, a low thump for a full-screen cut.
- **Tension without a tune**: a low, wide bed of room air (filtered noise, never tonal) that opens up toward zero, and a soft low thud on each of the last ten seconds, one per spoken count.
- **Silence**: the bed and every effect drop out a quarter-second before zero; the tick and the call stand alone.
- **Zero is the one big hit**: the film's single riser peaks on it and its one heavy impact lands on it, under the event's own climax sound if there is one. After zero the texture changes: a lighter tick, no thuds.
- **Sound across a cut**: the tail of the zero impact runs on under the first layouts after it; a re-layout's whoosh starts a few frames before the call it lands on.
- **The event's own sound** comes only from the user's own or cleared recordings, with no tune or jingle in it (a stadium's loudspeakers, a broadcast's theme): mute any source that carries some and let the code-made bed stand in.
- **Voice**: the event's own speech, when the user supplies a clean recording, sits on top and is never ducked. A narrator speaks sparingly, only in its gaps, clean and close, and clearly different from the event's voices.

## 8. Native moves

- **Many into one.** At zero, every cell moves to its tile of the full frame (a 3×3 grid becomes nine equal tiles) while each tile cross-fades to the same full-screen shot, chips and borders vanish in the first half, a warm white flash peaks and decays in a few frames, and the clock and transcript slide from their grid cells back to the bottom. About 13 frames. *Fits:* a result read out; the goal at the final whistle; the moment a sale opens.
- **Clock inversion.** At zero the clock block flips from dark with an orange T− to orange with dark T+, and its header changes (countdown → elapsed). *Fits:* polls closing, a store opening.
- **Control strip.** Segments in the clock header (who has control: ground → vehicle → mission control; kitchen → courier → customer); the active one fills orange on the call that hands it over, with a short flash. The story's turns live here.
- **The grid fills on the count.** Empty grid slots show as dashed "standby" frames; each spoken number opens one viewpoint. *Fits:* "three, two, one" before a premiere.
- **Sync badge.** In the far top corner of each video cell: `● LIVE SYNC` (synced), `○ SAME WINDOW · NOT FRAME-SYNCED` (hatched, grey: footage from the same minutes without a usable clock), `1× REAL-TIME` (slow motion re-timed). Honesty is part of the look.
- **Planned against heard checklist.** Official milestones with their planned times tick as the clock passes them; when the recording actually says one, a red "heard −32.1" tag with a small waveform appears beside it. *Fits:* a train timetable against the platform announcement; a release plan against the real deploy.
- **Second countdown.** After zero, a smaller clock counts to the next official milestone along a schematic profile drawn by time, not distance. *Fits:* the next race split; the next ballot count; delivery after an order.
- **Event flag.** An orange bar with black type slides in at the bottom of the relevant cell on its call (`ENGINE START · T−6.36`), held for its reading time.
- **Punch-in on a call.** A hard punch-in on the relevant detail when the commentary names it, from a higher-resolution copy of the same source.
- **Document by rows.** A paper close-up shows two or three rows; a highlight bar and a note band below the paper explain the row; the window moves only between rows (its edges in the white space).

## 9. Pitfalls of the medium

- **Unsyncable footage** (an edited reel with no clock or event to align on). Never fake it: label the cell "same window · not frame-synced", keep it out of the countdown's key seconds or use it only where nothing it shows contradicts the time, and say so in `facts.md`. Look first for a source with a burned-in timer, a visible flash or whistle, or the same audio.
- **Measuring zero.** Never trust metadata. Combine two independent marks: a visible event (an ignition flash, a broadcast clock's flip, a button changing state) and the spoken word's timing. Re-measure on the file you actually use.
- **Audio and picture of one file can disagree** (a switched feed whose audio lags its video by a second). Sync each source on its picture.
- **Slow-motion sources**: measure the factor from two events with a known gap and play the clip back faster by that factor.
- **Burned-in text**: camera numbers, timers, readouts. Define per-shot usable regions (they change when the source cuts) or blur them. A broadcast bug or a watermark is not handled this way: choose another source.
- **A static wide shot for ten seconds** reads as flat. Give every 1–2 seconds a new element (a cell, a tick on the list, a flag, a punch-in), not a fake camera move.
- **Spoilers in the caption**: a whole sentence shown at once reveals the end of a count early. Split counts into separate lines, one number each.
- **The clock jitters** if digits are proportional: draw them in fixed slots.
- **Zero clips**: the impact, the event's own roar and speech all peak together. Keep the impact as the loudest designed sound and pull everything else down around it.
- **Logos.** No agency insignia as a graphic; trim slates off the ends of a clip; never crop, blur or cover a bug or a watermark; the film says it is unofficial unless it is the brand's own event.

## 10. Materials, sources, facts

**Materials: ask first.** Before searching, ask the user whether they have their own material of the event: footage from several angles, screen recordings, a recording of the audio, photos, documents (schedules, release notes, results), data. What they give comes first and is credited as they say.

**If not, where to look** (each item's own page decides; record it):
- **NASA**: U.S. federal government works, public domain in the U.S. Don't use insignia as graphics or imply endorsement; check each item for third-party material.
- **Other U.S. federal agencies** (NOAA, National Archives): public domain, same check for third-party material.
- **Internet Archive**: only items whose own record shows public domain or CC0 / CC BY; skip re-uploads and anything of unclear origin.
- **Wikimedia Commons**: read each file page; CC0, public domain and CC BY are fine (credit CC BY in full); share-alike and "no known restrictions" are not fine without the user's explicit agreement.
- **Library of Congress**: check each item's rights statement; "no known restrictions" is not CC0.
- Not usable: re-uploads without a source, restored or colourised versions, news-agency footage, anything whose licence is not stated.

**Before downloading, tell the user** what you will fetch, from where and under which licence, in one message. Fetch only the seconds you need.

**Facts**: the video's `facts.md` covers every number, time, name and call on screen and in the narration (claim, source page, quoted wording, or the measurement); official sources only; planned times and actual (heard) times are kept apart. No real private person's name, face or data on screen: fictional stand-ins with `<ExampleBadge />`.

## 11. Building it here

- **One scene, one clock.** The whole film is a single continuous scene; event time is derived from `useCurrentFrame()` and the zero frame in `timeline.ts`. List the layout changes as `cuts` so the review strips look at them.
- **Cells are clipped `div`s** holding a muted `<OffthreadVideo>` with `trimBefore` set to that source's offset, `object-fit: cover`, and `object-position` / scale for its usable region. Slow-motion sources take `playbackRate`. Mount a source only while its cell is on screen.
- **Layouts are keyframes of rectangles** (as fractions of `W` and `H` from `useLayout()`); a re-layout interpolates each rectangle with `prog(frame, start, 10, ease.inOut)`. New cells open with `clip-path: inset(…)`.
- **The clock**: digits in equal-width slots with `fontVariantNumeric: "tabular-nums"`, each new digit dropped in with `prog(…, ease.out)`; the sub-second bar is ten `div`s. The inversion is a colour swap on one frame.
- **Blur patches** over burned-in timers and readouts (never over a logo or a watermark) are small `div`s with `backdrop-filter: blur()`; the grade is one CSS `filter` on the cell wrapper; `Finish` adds the grain.
- **The event's speech** comes in as a recorded voice line (`"file"` in `voiceover.json`), which gives the word timings the transcript box and the "heard" tags use; the small waveform is `Waveform` with that `src`.
- **Overrides**: no springs, no `SceneFrame` entries or exits, `<SceneTrack sweeps={false} />`, no `Backdrop`, no `Device` tilt. Leans on `Finish`.
- **Sound cues in `Soundtrack.tsx`** come from the same table: one tick every 30 frames, one cue per layout change, the riser's peak and the impact on the zero frame.

## 12. In a product video

- **Find the product's own zero**: the release going live, a sale or booking window opening, an order arriving, a timer the app runs down. The video's length is the real stretch around it (a 30 s film is T−20 to T+10).
- **The brand colour takes the orange role** ("now / synced / done") if it is bright enough on near-black; then nothing else is coloured. The dark ground and grey text stay: they are the look.
- **The real product fills the cells**: screen recordings of the same seconds on several screens (the customer's phone, the dashboard, the map), each cropped flat into its cell, or played in a `Device` held flat (`float={0}`, no `moves`); the release note or the schedule as the document cell. Recordings made at different times carry the "same window" badge.
- **Real numbers and times only**, each in `facts.md`; a re-enacted or sample session carries `<ExampleBadge />`, and names in it are fictional.
- **End card**: after zero, the grid closes to one cell under the inverted clock; the logo and one line on how to get it sit where the transcript was.
- **Arabic**: mirror the layout (chips, transcript box, wipe direction); the clock's digits stay left to right; lines appear word by word, each word whole, never letter by letter, no letter-spacing; a sturdy, plain Arabic sans beside the condensed clock digits.
- **9:16**: cells stack instead of sitting side by side (1 → 2 → 3 rows → a 2×4 grid), the clock is a full-width band in the middle, and the transcript sits above the bottom 22%. Keep the clock and flags out of the top 12% and the right 12%.

## 13. Variation space

You decide per film: the event, where real time starts and ends, the number of viewpoints, which documents and data, the control segments, the narrator's lines (or none), the closing layout.

- **Clocks**: T−/T+; a match clock; a wall clock (HH:MM:SS) for a news day; a countdown to a deadline that then counts up as "overtime".
- **Three structures**: rising cells to a merge; one cell that splits outward after zero (results arriving from many places); two parallel countdowns side by side that meet at zero (two teams, two cities).
- **Three openings**: a single wide shot and the first call; the clock alone on black, then the first cell opens; a document (the schedule) with the first item ticking.
- **Three endings**: the inverted clock over one full-screen shot; the grid refilling with consequences, then one title; the second countdown reaching its own zero.

---

Adapted for Halal Motion Videos from the `countdown` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
