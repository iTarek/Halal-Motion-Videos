# 1920s Newsreel

> A sound newsreel of the late 1920s, cut from real archive material: a searchlight-and-globe ident, a newspaper that spins into the lens, a fast and cheerful announcer over a rattling projector, place-and-date cards, maps, magazine pages and documents, wipes, flips and irises, and a soundtrack that can stop dead for the punchline.
> References (grammar only): **Fox Movietone News** and **Universal Newspaper Newsreel** (1927–1930s) for the ident ritual, the announcer's patter, one story per location and the stinger after the last story; **Pathé News** for the item title card; Hollywood's **spinning newspaper** montage. Never copy a real newsreel's name, logo, globe design, typeface or ident sound.

## 1. Essence, and what it is not

An edit style: the look is in **how real material is arranged, cut, captioned and carried by sound**, not in a drawing technique.

- **Archive in a projected gate**: a 1.37:1 picture with rounded corners, black outside; everything inside it shares one silver grade, gate weave, flicker, scratches and dust.
- **News objects** do the explaining: newspapers, magazine pages, books, telegrams, maps. They are filmed (spun, slammed, panned, turned, underlined), never typeset as slides.
- **A voice talks over everything**: short exclamations, half joking, never a lecture.
- **The pulse edits**: cuts land on one quick, steady pulse; every sound stops dead to let a line land.

Not 1920s Silent Film: that style is a drawn, inked comedy projected between velvet curtains, with intertitles instead of voices. Here nothing is drawn but the packaging; the footage and print are real; somebody always speaks; titles are news captions (place · date), not dialogue cards; there are no curtains and no theatre.
Not a documentary with a "vintage filter" either: no talking heads, no slow drifts over photographs, no modern lower-third bars.

## 2. Materials & rendering

- **Gate**: in 16:9, a 1.37:1 picture at full height, centred, corner radius about 2.4% of its height, pure black outside. In 9:16, one tall rounded gate: a landscape clip sits full width in its upper half, and the lower half belongs to the news object (the page, the map, the still) and the narrated line. Nothing is ever drawn outside the gate.
- **Two layers**: the picture layer (footage, print, maps, cards) gets the film look; the type layer (place cards, labels, narrated lines) stays sharp and steady. Grease-pencil marks belong to the picture (they weave with it).
- **Base grade** for every source, before anything else: greyscale → stretch the levels (the darkest 0.6% to black, the brightest 0.4% to white; for print, lift the black a little, like newsprint) → a mild S-curve → output just inside pure black and white. **Moving footage uses one level set per clip**, never per frame.
- **Projection look** (picture layer only): warm silver (a `#efe7d6` multiply and a `#17140f` screen), a vignette from 0.42 to 0.95 of the gate's height, flicker of ±3.5% per frame with a slow drift, gate weave of about ±0.15% of the gate's height, up to three vertical scratches that live for about 11 frames, up to four one-frame dust specks, and grain added once, last.
- **Archive film**: enlarge it at most about 2.5×; old transfers are 4:3, so crop them to 1.37 from the centre. Prefer a wider framing to a crop.
- **Print**: newspapers, magazines and books at their scan resolution; crop pages to the relevant fold so unrelated (and sometimes ugly) old stories never come into view.
- **Code-drawn packaging only**: the ident (sunburst, two searchlights, wire globe), item title cards, maps, the end card. Never generate "archive" pictures.

## 3. Colour logic

- **Monochrome warm silver** for the picture; values do the work (check every shot as a thumbnail).
- Type is cream on near-black (`#f3eee4` / `#d6cfc0` on `rgba(12,11,10,.8)`), framed by a thin cream rule; marks are a slightly warm white grease pencil; underlines on printed pages are dark soft lead.
- Packaging silver: Art Deco gradient lettering `#fff → #d9d4ca | #9e978a → #efebe2` with a hard "metal" break at the middle and a black outline (0.12 em).
- No colour accents, no sepia wash on top of the silver, no colourised archive.

## 4. Type & on-screen text

| Use | Face | Spec |
|---|---|---|
| Ident, item cards, end title | an Art Deco display face (the kind of Limelight) | about 10% of the gate's height, silver gradient, black outline |
| Place card, labels | a condensed sans in semi-bold (the kind of Oswald) | about 3% of the gate's height, upper case and letter-spaced in Latin script: "PLACE · DATE" |
| Narrated lines | the same condensed sans, regular to semi-bold | about 4% of the gate's height, cream with a black stroke |

- **These faces are the period**: keep them whatever the brand uses; the brand's own face appears in its logo only.
- **Place card** (the newsreel's segment title, instead of a full-screen card for every story): a top corner of the gate, on the reading side; a dark box with an inset thin cream frame, "PLACE · DATE" over one short line. It is pulled out in the reading direction in 7 frames and fades 5 frames before it leaves. Keep both lines short enough to read in the shot.
- **Item title card** (one per film at most, to turn to a new story): black, a double Art Deco frame drawn in 10 frames with quarter-fan corners, one display line and one small line, slow push; 2.5 s or more.
- **Labels inside split screens**: one per panel, top centre, same box style, entering one pulse apart.
- **Caption strip**: narrated lines sit on a dark strip across the bottom of the gate (transparent at its top edge, nearly solid `#0a0908` below), on every shot. It fades in 8 frames before the first line of a run and holds through gaps under a second, so it never blinks; print and pale footage would otherwise swallow the letters.
- **One line at a time, never wrapped**, each word appearing as it is spoken. Print in shot is never re-typed as a caption: the announcer carries its meaning, an underline points at it.

## 5. Editing grammar

- **The pulse is the clock**: pick a quick unit (8 or 9 frames, the step of a brisk walk); every cut, landing, slam and label entrance sits on it, most cuts on every fourth pulse, quick inserts on the third.
- **One story = one place + one kind of material + one line of voice.** Stories get shorter towards the end (eight to twelve pulses → four → single pulses), then one held button.
- **Shot lengths**: archive shots 1–2.5 s; print and documents 2.5–4 s (they must be read); comparisons 2.5 s or more fully in frame before the verdict; never a static frame longer than about a second without something moving (push, roll, pencil, the flicker of a counter).
- **Transitions are the newsreel's own, each used once, as punctuation**: iris close/open, diagonal hard wipe with a bright edge, vertical-axis flip, venetian blinds (12 slats turning), clock wipe from 12 o'clock, spinning paper, page turn, panel push-over, freeze. No cross-dissolves between stories, no modern whip pans, no zoom blur.
- **Overlaps**: the announcer may run 10–15 frames over a cut; the sound of the next shot may start one pulse before its picture.

## 6. Camera on stills and archive

| Move | What it does | Typical use |
|---|---|---|
| Spin-and-slam | the paper arrives as news | a headline; a telegram; a poster |
| Slow push then punch-in on the pulse | from the whole page to the one detail | a headline → a photo in it |
| Pan across a wide print | a crowd, a parade, a skyline | panoramas, group photos |
| Tilt to reveal | the landmark behind the subject | a building, a bridge |
| Map push | from the country to one city, into the next story | travel, spread, campaigns |
| Grid deal | many related stills land one per pulse | step-by-step, collections, "all of them" |
| Flip-book | a series of stills played on the pulse becomes motion | exercise steps, assembly stages, before/after |
| Freeze + jolt | stop the archive on the telling frame | the punchline, the evidence |
| Split / quad | two or four places at once, side by side | comparisons, "everybody's doing it" |

Archive footage is not reframed with fake camera moves bigger than about 6% (it already has its own camera); stills always get a move with a purpose.

## 7. Sound palette

- **Foley for every move**: a carbon-arc snap for the searchlights, a rising whoosh with flutter for the spinning paper, a thump and paper slap for the slam, telegraph clicks under a map line, a camera shutter per still, paper flicks per flip-book page, slat flutter, a page turn, a grease-pencil squeak, a soft-lead scratch.
- **Bed**: the projector (claw clatter, motor whirr, optical hiss) from the first frame to the last, low and without a pitch you could name.
- **The ident is sound effects only**: the arc snap, a bright rising shimmer as the globe grows, one heavy hit as the name lands.
- **Hits in three weights**: a shutter click for a still, a slap for a page, a thump for a slam; the heaviest is kept for the name and the punchline.
- **Two silences**: a dead stop of everything before the turn of the story, and the projector alone before the button.
- **Sound across a cut**: the announcer runs over the cut; the whoosh of the next paper starts one pulse before it appears. In a split screen each side has its own foley, set left and right.
- **Voice**: a bright, energetic announcer with a mid-Atlantic tinge, fast, 6–12 words per line, exclamations and rhetorical questions. The voice stays clean; the period colour comes from the projector around it.

## 8. Native moves

A menu; use the ones the story needs, each once.

- **The ident ritual.** Searchlights snap on with a flash in the first 6 frames, the globe grows and turns, the name lands with overshoot, the iris closes on the globe. *Fits:* the opening of any news-shaped film; the reprise is the sign-off.
- **The spinning paper.** It grows on a steep curve (progress to the power 2.3) while its rotation dies away over 2.5 turns, with three fainter ghost copies a frame apart as motion blur, a vertical jolt and a 3% bounce on the slam, then a push and a punch-in on the next pulse. *Fits:* a headline, an announcement, a press release.
- **The map spread.** A projected outline, dotted arcs from the source city drawn on the pulse with telegraph clicks, star pulses on arrival, place labels in screen space, an odometer of years in a corner; push into the city of the next story. *Fits:* a craze, a product launch, a migration, a campaign.
- **Grid deal → flip-book.** Stills land one per pulse (a shutter click each), then the camera dives into the first cell and the series plays on the pulse as stop motion. *Fits:* a how-to, the stages of a process, a collection.
- **Document underline.** Slam a book or letter, turn the page, push to the paragraph, draw soft-lead underlines exactly under the words. *Fits:* a quote, a rule, a contract clause.
- **Grease-pencil freeze.** Freeze the telling frame, jolt it, ring the detail with a hand-drawn loop, add an arrow. *Fits:* the evidence, the punchline, "look here".
- **Split-screen contest → push-over.** Two panels slide in, each labelled, each with its own sound on its own side; the winner pushes the loser out of frame. *Fits:* old vs new, two ways of doing a job, two cities.
- **Dead stop + button.** One hit, silence with only the projector, one short line from the announcer. *Fits:* the last word of any story.

## 9. Material: where it comes from

1. **Ask the user first** whether they have their own material: film or video, photographs, newspapers, letters, documents, data. Their archive beats anything found online. For a product, that includes its own history: first sketches, old packaging, launch-day pictures, press clippings, early screenshots.
2. **If not, use sources whose licence is clear**, and judge each file on its own page:
   - **U.S. National Archives** and **Library of Congress** films and print: federal works are public domain; donated collections need their own rights note.
   - **Internet Archive**: check every item's licence field and provenance; skip re-uploads, colourised or "restored" versions and anything with no stated source.
   - **Wikimedia Commons**: public domain, CC0 or CC BY only. "No known restrictions" is **not** enough; CC BY-SA is not used.
   - **Print**: anything published in the US before 1931 (newspapers, magazines, books) is public domain in the US.
   - **Maps**: Natural Earth (public domain) for outlines drawn in code. Borders are a claim: ask the user before showing a disputed one.
3. **Before downloading, tell the user** what you will fetch, from where, under which licence, and how big it is.
4. **Every fact** in the voice and on screen goes into the video's `facts.md` with its source and the quoted wording, and so does every file used (title, author, date, licence, page). Read the catalogue description of each film before using it: it may say what is really happening in the shot.
5. **People**: historical public figures and people in news events may appear; ordinary people's faces are never slowed down or made the close-up subject. No real personal data from a letter or a screenshot: a fictional stand-in with `<ExampleBadge />`.

## 10. Pitfalls

- Catalogue descriptions matter: a factory film can show both the old line and the new one; use only the shots that match the claim.
- Archive transfers start and end with slates and white flashes; cut inside them. A clip that carries a watermark or an archive's logo isn't cleared for this: leave it out, never crop or cover the mark.
- Newspaper pages hold unrelated, sometimes offensive stories next to yours: crop to the fold you need.
- Films and pages of the period are full of what these videos never show (drinking, smoking, betting, dance halls, swimwear): watch every clip to its end and read every page before using it, and leave those shots out.
- Levels that change frame by frame make footage pump; set them once per clip.
- An iris cut with a mask leaves transparent corners that turn grey under the silver `screen` layer → keep a black layer behind the picture, inside the gate.
- Captions that leave before they can be read: shorten the words, not the hold.
- A fast announcer outruns the caption strip: 6–12 words per line.
- A synthetic voice mispronounces names ("Bessie" → "Bestie"); rephrase until what `npm run review` prints under "Heard:" is right.
- Old sources are soft: never enlarge past about 2.5×, and don't sharpen them into halos.
- Grain goes on once, at the end; a plate that already has grain baked in gets none.

## 11. Building it here

- **The gate** is a `div` with `aspect-ratio`, `border-radius` and `overflow: hidden` over a black fill, sized from `useLayout()`; inside it, a picture layer and, above it, a type layer.
- **Footage and stills**: Remotion's `<OffthreadVideo>` (trimmed by frame) and `<Img>`; uploads land in the video's `public/…/video/` and `img/` folders. The grade is one SVG filter per source (`feColorMatrix` to grey, then a `feComponentTransfer` table for the levels and the S-curve), so a clip can't pump. Nothing here measures a histogram: set each source's levels by eye from a still of the scene (`npm run stills`).
- **Projection look**: two blend layers (`mix-blend-mode: multiply` and `screen`), a `radial-gradient` vignette, flicker as an overlay whose opacity is `noise(frame, seed)`, weave as a `translate` on the picture layer from `noise`, scratches and dust as small `div`s placed by `noise(Math.floor(frame / 11), i)`. Put `Finish` inside the gate, under the type layer, for the grain.
- **Transitions**: iris = `clip-path: circle(…)`; diagonal wipe = `clip-path: polygon(…)` plus a bright edge; flip = `rotateY` under `perspective`; blinds = 12 strips with `rotateX`; clock wipe = `mask-image: conic-gradient(…)`; page turn = `rotateY` about the spine. Use `<SceneTrack sweeps={false} />`. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **The spinning paper** is `rotate()` and `scale()` on one `<Img>`, with three copies a frame behind at lower opacity; the slam's jolt is a damped sine on `translateY`.
- **Pencil marks and underlines** are SVG paths drawn on with `stroke-dashoffset`, roughened by a `feTurbulence` displacement with a fixed `seed`; place them by measuring the scan as fractions of the page.
- **Overrides**: no `Backdrop`, no `MaskRise`, no springs except the overshoot of the name and the slam (`ease.back` or `SPRING.bouncy`); everything else is a cut on the pulse.
- **The pulse lives in `timeline.ts`**; `Soundtrack.tsx` lands every click, slap and thump on the same frames, and the caption strip takes its words from the voice-over's timings.

## 12. In a product video

- **The silver is the look; the brand's colour stays out of the gate.** One break is allowed, as the button: the projector stops, the gate opens, and the product appears in full colour with its logo.
- **The product is the news.** Its real launch, release or milestone gets the place card (PLACE · DATE), and its real press mentions or announcement are the papers that spin in. Never invent a headline or a newspaper: a made-up page is a false claim.
- **Screenshots are filmed as print**: a screen laid on the table like a magazine page, in the silver grade, pushed, underlined and ringed in grease pencil. For the colour button, a `Device` with a screen recording.
- **Real numbers and dates only**, each in `facts.md` with its source; the odometer on a map counts real years. Sample names in a screenshot become fictional ones with `<ExampleBadge />`.
- **End card**: the ident reprise with the brand's name in the Deco silver, or the colour button; one line on where to get it, held 2 s or more.
- **Arabic**: the place card moves to the top right and is pulled out from the right; "PLACE · DATE" keeps its order of place then date but loses upper case and letter-spacing; words appear whole. A geometric Kufi display face takes the Deco role (the kind of Reem Kufi) and a sturdy Arabic sans the cards. Printed pages stay in the language they were printed in.
- **9:16**: the tall gate of section 2. The place card sits under the top 12%, the caption strip ends above the bottom 22%, and labels and underlined words stay out of the right 12%; a split screen stacks top and bottom.

## 13. Variation space

- **Era**: late silent newsreel (no voice, title cards only) ↔ early sound newsreel (this style) ↔ a 1940s newsreel (deeper voice, maps with arrows, a slower pulse).
- **Tone**: a comic stinger ↔ straight reportage (no jokes, still fast). Not for disasters and deaths, where the jaunty grammar is wrong.
- **Material balance**: all footage, or print-heavy when film is scarce (maps, pages and flip-books carry the motion).
- **Sound**: the projector throughout, or the projector only under archive and a dry room under print.
- **Packaging**: invent your own ident name and emblem; keep the grammar (searchlights, globe, place cards), change the shapes.

---

Adapted for Halal Motion Videos from the `newsreel` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
