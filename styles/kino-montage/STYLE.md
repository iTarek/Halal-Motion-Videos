# Constructivist Montage

> Real footage, photographs and documents, printed as one ink-and-paper poster with a single red, and cut on a machine pulse. Diagonal bands carry the type; windows cut along the axis hold the film; people are scissored out of photographs and stacked into structures; numbers count, documents are marked in red, and two images collide to make a third idea.
> References (grammar only): Soviet montage cinema of the 1920s (city films with split screens, counting and machine rhythm; "intellectual" montage where A + B yields a concept), constructivist posters and photomontage (red / black / paper, steep diagonals, photo cut-outs with geometric blocks, type as structure). Never copy their shots, layouts, slogans or lettering, and never name them in the film.

## 1. Essence, and what it is not

1. **Evidence, recut.** Every picture is real material (film, photographs, documents, screens) about the actual subject. The film's argument comes from how they are cut and set, not from illustration.
2. **One printed sheet.** All material is converted to the same two-tone print (warm ink → paper); red is the only colour and is laid on top as a printed element.
3. **The pulse is the editor.** Cuts, slams, wipes and counts sit on one pulse of 16 frames; sections accelerate by halving shot length.
4. **Type is structure.** Words and numbers are beams: on a −18° band, as solid blocks, stacked vertically. Never floating captions.
5. **The collective over the individual.** Crowds, hands, machines and many small figures; a single face is never the protagonist.

Not data storytelling or a keynote: no centred headline with bullets, no slide transitions, no header bars; data appears as marked documents, counters and measured bars inside the composition. Not Swiss Motion Graphics: asymmetric, diagonal, no grid of white space, no thin rules as decoration. Not Art Deco or 60s spy titles: no gold, no fine lines, no lounge cool. Not a museum slideshow: real material is never shown "as is" in a neutral frame; it is cut, windowed, stacked and counted.

## 2. Materials & rendering

- **Four kinds of element only**: **bands** (red or ink, along the axis), **windows** (rectangles or parallelograms holding film or photographs), **cut-outs** (people scissored from photographs with a paper-white border), **type blocks**. Plus one paper-fibre texture over everything.
- **The print grade** (one treatment for film, photos and documents): to luminance → stretch the levels (one setting per clip, so it never pumps) → a gentle S-curve (gentler on documents, which keep their paper) → map black to ink and white to paper. Old film keeps a ±2.5% per-frame flicker inside its window; photographs and documents do not.
- **Cut-outs**: a figure with a transparent background and a paper border about 0.6% of the frame height wide, outside the figure. The border is the medium's own look and hides rough edges. Group photos rarely cut cleanly: use them whole in windows.
- **Documents**: scans or screenshots at full resolution, never retyped. They are marked: a red highlighter bar in multiply over the exact sentence, a hand-drawn red ellipse round a heading, a red circle on a map. Drawings on a document (a chart, a map) may be lifted off the page and reused, keyed from their paper.
- **Resolution ceiling**: old film at most 2.5× its source pixels on screen, modern footage at most 1.5×, photos at one source pixel per screen pixel or better where possible. A small film transfer can fill a window, not the full frame: frame it (a window, a split strip, an iris) instead of stretching it.
- **Paper fibre**: one fixed, seeded noise layer multiplied over the frame at half strength, and a light film grain on top.

## 3. Colour logic

| Role | Value | Use |
|---|---|---|
| Red | `#D52B1E` | bands, wedges, blocks, the key number, marker bars, circles and leaders, the one winner in a comparison |
| Ink | `#141210` | type, beams under each floor, window borders, dark grounds |
| Paper | `#EDE4D0` | ground, reversed type, cut-out borders |

- Everything photographic is ink-on-paper; nothing else has colour. Red is never laid on red: a red block on a red ground becomes ink.
- Alternate grounds to make cuts land: paper scene → ink scene → paper. In an acceleration the background itself alternates red / ink per cut.

## 4. Type & on-screen text

| Use | Face | Size (of frame height in 16:9; of frame width in 9:16) |
|---|---|---|
| Display, slogans | the heaviest weight of a condensed grotesque (the kind Oswald is) | 10–19%; stacked vertically about 16% per unit |
| Numbers | the same face, semibold to bold | 21–40% |
| Second lines | the same face, capitals with wide tracking in Latin script | 3–6% |
| Source and footage tags | a bold monospace (the kind Space Mono is) on an ink or red tab | about 1.6% |
| Narrated lines | the display face, bold, on an ink bar at 90% with a small red tick | about 3.7% |

- The style needs a heavy poster face whatever the brand uses; the brand's own face stays in the logo.
- **Two-language pairs** (when the film carries two): the main block, then one line in the second language directly under it or on the neighbouring band. Each language one line, measured.
- **Placement**: along the −18° axis on a band, or as an ink / red block; never centred on the frame, never a header. Numbers can be bigger than the words that explain them.
- **Tags**: every window carries its tag (`FILM · <TITLE> · <PLACE> <YEAR>`, `PHOTO · <AUTHOR> <YEAR>`, `SCREEN · <PRODUCT> <YEAR>`), every fact a source tag (`SOURCE · <PUBLISHER> <YEAR>`). If the footage is not of the subject itself, the tag says what it really is.
- **Narrated lines** sit on their bar at the bottom of the frame on the reading side, each phrase arriving with the voice; key type keeps above the bar while narration runs. A comparison holds every item at least 2.5 s before its verdict.

## 5. Edit grammar

- **Grid**: one pulse for picture and sound (16 frames; a group of four pulses lasts about 2 s). Every cut, slam, wipe and count lands on a pulse, a half or a quarter. One list of these frames drives the scenes and the sound cues.
- **Shot length**: one to four pulses for footage; one idea per shot. A section may accelerate by halving: 16 → 8 → 4 frames (never shorter than 4). Holds are reserved for reading: a text block, a freeze, a comparison.
- **Cut rule**: adjacent shots conflict in at least one of direction (left slam / right slam), value (paper / ink ground), or geometry (diagonal band / upright window). Never two paper documents in a row.
- **Nothing static for more than a second**: inside a hold something moves (film in its window, a counter, a slow push, a frame-within-the-frame). Planned exceptions only: the comparison hold, one silence, the end card.
- **Transitions inside the medium** (pick per cut, don't fade):
  - *red wipe*: a red band about 13% of the frame wide, at 72° (perpendicular to the axis), sweeps the frame in 8 frames, the next scene revealed behind it; it lands on the first pulse of a group of four;
  - *iris*: a red marker circle drawn on a map or photo becomes an aperture and opens onto footage;
  - *slam*: the next element arrives from outside along the axis in 3–6 frames, ease-out, hard stop, frame shake (a few pixels to 1.5% of the height, dying away in a quarter of a second);
  - *flash cut*: one frame of 50–80% paper over a window at a cut or freeze;
  - *hard cut on the pulse* between grounds of opposite value;
  - *jump-in*: inside a freeze, a cut to a 1.2× crop of the same frame, the annotation scaling with it.
- **Two silences**: one where every designed sound stops and only the one source remains (§7), and two full pulses of nothing (ink frame, one red dot) before the heaviest hit.

## 6. Formats

A kit of shot types. A film uses some of them, not all.

| Format | How it looks | How it is built |
|---|---|---|
| **Title package** | a red band slams along the axis; a window cut to the band's edge runs footage; digits stamp one per half-pulse, the unit in red | the window is clipped to the band's top edge; digits are measured and slammed one by one |
| **Lower third** | a red bar from the reading-side edge with the main line, an ink tab with the second line | a bar about 8.5% of the frame high in the lower third; slams in 4 frames, slides off with the next transition |
| **Map + iris** | a document map pushes in, a red circle is drawn round the place, the circle opens onto the site | the map has one scale / focus / angle over time and the circle stays on its map point; the aperture is a circular clip growing to the frame |
| **Vertical title** | words stacked top to bottom beside a tall window, a second line rotated 90° | per-unit slams a quarter-pulse apart |
| **Date on a girder** | the date in paper on a red band crossing the footage | text placed on the band's centre line, rotated by the axis |
| **Grid** | 3 × 3 windows light one per quarter-pulse in a spiral, the centre counts 1…9 and lights last in red | cells scale in with a slight overshoot, each a different clip at 1.4–1.8× speed, playing forward then back |
| **Split strips** | the frame rotated to the axis, three strips of two panels each; one panel changes per pulse; strips drift in opposite directions | panels narrow enough that the film stays under its ceiling; a red seam on the middle strip |
| **Freeze + annotation** | flash, freeze, push; a red ellipse drawn on the object, a leader to a red block with the number; a jump-in; the film keeps running in a small red-framed inset | the ellipse is placed from the zoom focus so it follows the jump; the inset is the same clip, live |
| **Document close-up** | a tilted page slams in, a red marker bar crosses the exact sentence, a red block repeats the number huge | the marker lies in multiply over the line's own position on the scan; a tall slot beside it can run footage fast to show speed |
| **Process staircase** | three windows rising along a diagonal, red triangles between them, a counter climbing to the claim | each window a pulse and a half after the last; the counter is graphic, only its end value is a fact |
| **The question** | a document heading on an ink ground, circled in red; a huge red "?" | heading cropped tight so only the words that matter show |
| **Acceleration + count** | full-frame windows tilted ±4–6°, ground alternating red / ink, a four-digit counter jumping per cut | a cut list with shrinking durations; the one source plays alone (§7) |
| **Multiple exposure** | top-down footage, a second clip screened over it at 45%, cut-outs in multiply, the answer in a block | the exposure sits in a window on a red ground, inside the resolution ceiling |
| **Chart from the document** | the page turns 90°, its drawings lift off and stand on one ground line to scale, red dimension lines, numbers, names; held; then the verdict block | outlines keyed from the scan and scaled so height = value; the winner tinted red |
| **Photomontage tower** (signature) | floors of footage strips slam in from alternate sides every quarter-pulse, an ink beam under each, a cut-out worker lands on every other; the camera climbs; a crown and a figure on top | the camera follows the eased count of built floors; the floor counter runs to a dated anchor, **rests there while its caption is up**, then runs on to the end value |
| **Silence** | ink frame, one red rivet | two pulses; every sound at zero |
| **Result composition** | huge numbers on the reading side, a tall slanted window with the finished subject (camera tilts up it), a tilted photo, a red wedge | numbers slam, the last line restamps the key number on red |

## 7. Sound palette

- **Foley for every printed action**: slam = low thump + steel clank; stamp = thump + clack; wipe and iris = whoosh; marker = filtered noise scrub; paper = band-passed rustle; floors and cells = pitched clanks.
- **The rhythm is the edit itself.** No loop runs under it: each cut carries its hit, so an acceleration is heard as the hits closing up. Three weights (tick for a count, clank for a slam, boom for a section change) cover the film.
- **Counts climb**: each lit cell or built floor steps its clank up a little and the last one settles; short accents, never a tune.
- **One source takes over once**: in one section the designed hits stop and a single source (a rivet gun, a machine, a crowd, the product's own click) carries the cut alone, each burst trimmed to its shot. Build it by code; use a real recording only when it is the user's own or the product's own sound, with no tune or singing anywhere in it. Bring it in one pulse early, before its picture.
- **Ambience**: a site or street bed made by code (wide filtered noise, far clanks), far under the voice, non-tonal, out for the silence.
- **Silence, then the heaviest hit**: two full pulses of nothing, then the film's one deep boom with a metal ring on the result.
- **Narration** (when the film has one): short declarative lines, newsreel cadence, never more than one sentence over a format; numbers spelled out in the script, digits on screen.

## 8. Native moves

1. **The document is marked, not quoted**: the actual sentence on the scan gets a red bar; the number then becomes a red block.
2. **The document becomes the chart**: drawings printed on a page are lifted off, turned and stood on a ground line to scale.
3. **A + B → idea**: two kinds of image alternate faster and faster (the machine / the hands; a heading / the people it leaves out) until a card or a number states what the collision meant.
4. **Count the many**: a counter driven by the cuts, a grid that fills cell by cell, a tower floor by floor.
5. **People build the structure**: cut-out figures stacked into the thing they made (photomontage).
6. **Silence, then the heaviest hit** into the result.

## 9. Footage

1. **Ask first.** The user's own material leads: film, video, photographs, scans of documents (reports, brochures, letters, minutes), data, all uploaded under Materials. For a product, add screenshots (`npm run shot`), screen recordings and the store listing (`npm run appstore`). Public archives only fill gaps.
2. **Public archives, and how to judge the licence**:
   - **Internet Archive**: read each item's licence field and description. Public Domain Mark / CC0 / CC BY are usable; *no licence field* is not. Avoid mirrors and re-uploads with no provenance, and colourised or "restored" versions.
   - **Wikimedia Commons**: read the file page's licence and its source institution. Public domain, CC0 and CC BY (credited in full) are usable.
   - **National archives, national libraries and space agencies**: check each item's rights statement. "No known restrictions" is **not** clear enough: name it to the user or find the same image elsewhere with a clear statement.
   - **Museums and libraries with open access**: CC0 where the object page says so; "copyright status undetermined" is not usable.
3. **Tell the user before downloading**: what (title, years), from where (URL), under which licence and why.
4. **Record every asset** in the video's `facts.md`: source page, author, licence and the seconds used.
5. Footage that is not of the subject itself (another city, another year) may stand in only with a tag that says exactly what it is.
6. **No real personal data**: names, emails, numbers and private content on screens and documents are replaced by fictional stand-ins with `<ExampleBadge />`. Ordinary people in public archive footage appear in groups, never singled out.

## 10. Facts

Every number, date and claim on screen or in the voice comes from the product itself or from an official or primary source (a contemporary report, an official brochure, a public record), kept in the video's `facts.md` with the URL and the quoted wording. Counters are graphics: only their end values and dated anchors are facts. Where two sources disagree, use one and record the conflict.

## 11. Building it here

- **Plain React and CSS**: bands, windows and type blocks are absolutely positioned `div`s inside one wrapper rotated to the axis; a parallelogram window is `overflow: hidden` plus `clip-path: polygon(…)`. Film and photos inside windows are Remotion's `OffthreadVideo` (muted) and `Img`, loaded with `asset("video/…")` or `asset("img/…")`. A clip sped up takes `playbackRate`; one that plays backwards is remapped frame by frame (the video inside `<Sequence from={frame}>` with a `trimBefore` that counts down), because `playbackRate` must stay above 0.
- **The print grade is one SVG filter** shared by every photographic element: `feColorMatrix` to grey, then `feComponentTransfer` with a `table` per channel that carries the S-curve and maps black to ink and white to paper. Levels are set by hand once per clip. Flicker is a brightness of ±2.5% from `noise(frame, seed)`.
- **Slams and wipes**: `prog(frame, at, 4, ease.out)` on a translate along the axis, then a shake of `Math.exp(-14 * seconds)` times `noise`. No `springAt`: a slam stops dead. The red wipe is a band `div` plus a moving `clip-path` on the incoming scene; the iris is `clip-path: circle(…)`.
- **Marks**: the marker bar is a red `div` in `mix-blend-mode: multiply` whose width grows; ellipses and leaders are SVG paths drawn with `stroke-dashoffset`.
- **Cut-outs**: a transparent PNG from the user, or a straight-edged `clip-path` polygon round the figure (scissors cut straight too). The paper border is an SVG `feMorphology` dilate filled with paper.
- **Paper fibre**: a full-frame `feTurbulence` with a fixed `seed` in `multiply`; on top, `<Finish vignette={0} />` for the light grain.
- **Overrides the engine defaults**: no springs, no `MaskRise`, no `Backdrop`, no vignette, no light sweep (`<SceneTrack sweeps={false} />`; the red wipe is this style's own), and no fades. Counters use `fontVariantNumeric: "tabular-nums"`. A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **The pulse lives in `timeline.ts`** as one list of events (cut, slam, stamp, count) in frames. Scenes read it, and `Soundtrack.tsx` lands a cue on every entry. Check reading time and the fastest cuts with `npm run review` and its `--strip` sheets.

## 12. Pitfalls of the medium

- **A window that hides a mark**: footage or a photo carrying a watermark, a station logo or an archive's stamp is left out, or shown whole with the mark in view; never frame, crop or cover it away.
- **Upscaled old film** turns to mush full-frame: window it; split strips into panels; keep zooms inside the 2.5× ceiling.
- **Per-frame grading pumps**: one level setting per clip.
- **Type on a band running off frame**: place it from the band's centre line, not by eye.
- **Red on red**: a red answer block on a red exposure ground disappears; switch it to ink.
- **Red and ink grounds swapping every 4 frames** is a saturated full-frame flicker, unsafe for photosensitive viewers: keep such a run to three swaps in any second and let the windows cover most of the ground.
- **A face as hero**: ordinary identifiable people appear in groups, at work, in quick cuts; no slow motion or close-up protagonist.
- **Counters read as facts**: label only the end value and dated anchors; a caption beside a counter must match the number shown at every frame (stop the count on the caption's value while it is up).
- **A number without a unit**: every counter carries its unit in the same layout as elsewhere (hours / floors / people).
- **Ink type over a window**: a line that runs past a photo's edge disappears into dark film; give it a paper tab or keep it clear of the window.
- **The verdict covering what was compared**: place it where no item is, after the hold.
- **Too many documents**: one marked sentence per document shot; a page with three highlights is a slide.
- **Short labels in an acceleration** fail reading time by design: keep text out of the quarter-pulse cuts; put the result in a held block after.

## 13. In a product video

- **This palette is the look**: ink, paper and one printed colour. The brand's colour takes the red's place if it is strong enough to hold on paper; if it is pale, keep the red and leave the brand's colour to the logo.
- **Screens are documents and screen recordings are footage**: a screenshot slams in tilted, the exact line of the interface gets the marker bar, its number is restamped huge; a recording runs fast in a window with its `SCREEN ·` tag. All of it goes through the print grade. Show the product once in its true colours, in the result composition, and nowhere else.
- **The people are the many**: customers, teams and hands in groups, cut out and stacked into the thing the product builds.
- **Counters end on real values** from `facts.md`; a sample account or made-up figure carries `<ExampleBadge />`, set as a tab in the tag style.
- **End card**: a result composition that holds: the logo on paper, the key number restamped on the colour, and one line along the band saying where to get it.
- **Arabic**: mirror the axis (the band climbs toward the top left) and bring slams in from the right. Words stamp **whole**, one per half-pulse, never letter by letter, with no letter-spacing; a vertical title stacks whole words or turns the line 90°, never single letters. Use a heavy poster Kufi. Digits may stamp one by one; wrap ranges in `isolateNumbers`.
- **9:16**: steepen the axis (−25° to −30°), make windows tall, and let the tower and vertical titles use the height. Tags and narration stay out of the top 12%, the bottom 22% and the right 12%.

## 14. Variation space

You decide per film: structure, which material and documents, which formats (not all of them in one film), the axis angle (−15° to −30°), the red's exact hue, the pulse (12, 16 or 20 frames), whether there is narration (intertitles only is valid), the signature build (a tower, a bridge span, a crowd forming a word, a map filling in).

- **Three structures:** a calendar machine (one counter runs the whole film and stops at milestones); a document that asks and footage that answers (the turn at the middle); one object's journey through a process, then the scale of the whole.
- Subjects that fit: construction and engineering histories, industrial anniversaries, mass events, labour and collective effort, infrastructure openings, a product built by many hands, any "many people, one machine rhythm" story with real film and documents behind it.

---

Adapted for Halal Motion Videos from the `kino-montage` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
