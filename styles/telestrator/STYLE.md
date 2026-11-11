# Sports Telestrator

> The TV sports analysis segment: play the clip at full speed, rewind, freeze it, and draw on the picture: rings under players' feet, marker arrows for the ball, a red patch for the space nobody covered. Then play on, switch angles, count the frames, and flatten the pitch into a board. Real footage is the ground; every line is drawn on top of it and moves with it. A studio show's packaging (sting, corner bug, score bar, a yellow wipe) holds it together.
> References (grammar only): touch-screen analysis segments in televised football (the "telestrator" pundit's board), and explainer channels that annotate real match footage. Never copy a broadcaster's or channel's logo, fonts, colours, idents or graphics, and never name them in the film.

## 1. Essence, and what it is not

1. **Watch it, then take it apart.** Every piece of action is seen moving before it is explained. A freeze always follows play; the explanation never comes first.
2. **One freeze, one finding.** Each freeze says one thing (the ball wasn't cleared; nobody stepped out; he struck it from outside the box) with one label and at most two groups of lines. The same few seconds of footage are reused, each pass going one layer deeper.
3. **Drawn on the real picture.** Rings sit under feet, arrows follow the ball's real path, the box line is traced over the real line. Nothing floats in an abstract diagram until the film deliberately flattens the pitch.
4. **Data counted from the footage.** Times come from frame counts (a stopwatch that runs on source frames), distances from the pitch markings (a perspective transform). What the footage can't measure (ball speed, sprint distance) is not stated.
5. **Studio energy.** Bright marker lines, a white flash and a punch on every freeze, the sound stopping with the picture.

Not **Visual Investigation** (that is restrained, synchronised multi-camera evidence where the timeline is the protagonist; this is a pundit's show with packaging and enthusiasm). Not a **highlight reel** (no montage of goals; each clip is analysed). Not **Data Storytelling** or an infographic: charts are not the film; the top-down board appears once, as a summary, and is reached by flattening the real picture.

## 2. Frame and layout

- **16:9: full-frame footage** most of the time. The packaging lives in the corners, each block about 2% in from the frame edges:
  - **Corner bug**, top right, about 22% of the width and 7% of the height: show name on a yellow block + a mode line in the mode's colour: LIVE (red dot) / ANALYSIS (yellow) / REPLAY (cyan). It is in every footage frame from frame 1.
  - **Score bar**, bottom right, about 25% of the width: HOME n – n AWAY + minute. A number flips on the frame the ball crosses the line (a 0.5 s roll with a yellow flash).
  - **Source clock**, top left, about 17% of the width, on every analysis shot: `❚❚ 04.20s F106` (source seconds and frame number); ▶ ½ in slow motion, ◀◀ in a rewind. Hidden in live play.
- **9:16: the footage is a full-width band** in the upper-middle of the frame (a 16:9 clip fills about a third of the height) on the show board, or a vertical slice of the source at 1:1 that follows the action. The bug sits on the band's top edge, the score bar and clock on its bottom edge, labels and the narrated line on the board below. Never stretch or over-zoom a wide clip to fill the tall frame.
- **Labels** (black card, coloured bar on the reading side, a heavy main line + a small second line) sit in empty grass or crowd, never over the action they describe.
- **Narrated-line bar** at the bottom, kept clear of the score bar.
- **Split screen**: two vertical windows side by side in 16:9, two bands stacked in 9:16. Each is a slice of its source at 1:1 (no extra scaling), a thin yellow divider between them, a camera label at each window's top corner (A MAIN CAMERA / B HIGH REVERSE).
- **Board pages** (shot map, data card): dark board `#0C1411` with a faint grid (cells about 5% of the short side); text column on the reading side, drawing on the other. No headers, no centred title-and-bullets.

## 3. Editing grammar

- **Order inside one piece of action:** live at 1× (original sound) → rewind (0.6 s, reversed with tracking bars and ◀◀) → freeze ① → slow play (0.6–0.85×, frame-blended) → freeze ② → slow play with a stopwatch → freeze ③ → ball flight with a comet trail → another angle (replay), possibly one more freeze.
- **Lighter variants** for secondary pieces of action, so the deep breakdown stays special:
  - **Freeze-in-play**: no rewind; play at 1× up to the decisive pass, freeze, draw, then play on to the goal.
  - **Dual-angle freeze**: both angles play side by side and each arrives at the same instant (each at its own speed) where both freeze together; the same player is ringed in both.
- **Freeze length** 1.8–2.4 s; a freeze longer than about 2.5 s needs a second action inside it. Two to four freezes per piece of action; more than four, split with a replay.
- **Cuts between segments**: only the packaging wipe, a yellow slanted band with dark edges crossing the frame in about a third of a second. Inside a segment, hard cuts. No dissolves, no page turns.
- **Comparison frames** (the shot map, the data card) are fully drawn early and held at least 2.5 s before the next cut.

## 4. Colour identity (the one rule that matters)

| Role | Colour |
|---|---|
| The team/player we follow, the ball, main marker lines | `#FFD400` fluorescent yellow |
| Opponents (rings, block arrows, link lines) | `#3FD8FF` cyan |
| Space (a patch nobody covers) | `#FF3B30` red, fill 0.34–0.38 + dashed edge |
| Pitch lines traced, neutral marks, stamps | `#F4F1E8` chalk |
| Show board | `#0C1411` ink green-black |
| Label / bug background | `rgba(8,12,14,0.9)`; opaque `#080C0E` where it must hide what is under it |

One colour, one identity, throughout the film: a label's bar takes the colour of what it names. Change the hues if the show needs to, never the three roles.

## 5. Type & on-screen text

- **Labels**: a very heavy sans (the Archivo Black or Inter 900 kind), about 3.7% of the frame's short side (a name slightly smaller); the small second line in a condensed sans (the Barlow Condensed kind), in the role colour.
- **Packaging numbers** (score, minute, stopwatch, big data): a condensed heavy italic, with fixed-width digits.
- **Clock / frame numbers**: a monospace (the IBM Plex Mono kind), about 2.2% of the short side.
- **Board pages**: a heavy title at about 6% of the short side, rows at 3–4% with a grey note under each, numbers in the condensed italic at 6–14% in yellow; text appears from the reading side with a clip reveal.
- **No handwriting fonts** anywhere: printed type on a dark card belongs to the same packaging; handwriting reads as a school notebook.
- **Narrated lines**: one line in a black bar (about 0.64 opacity) with a thin yellow edge, each word timed to the voice-over's word timings. Never wrapped: shorten the line instead of shrinking it.
- A brand's own fonts come first when they are a sturdy sans; the condensed italic numerals and the mono clock are the show's packaging and stay.

## 6. Motion and drawing

- **Freeze entry**: white flash 0.1 s (0.55) + punch 1.035 → 1.0 in 0.35 s (ease-out) + desaturate 42% + a cool cast + heavier vignette; then a slow 1.2% creep. Overlays use the same transform as the picture, or they slide off the players.
- **Spotlight**: everything outside a focus ellipse darkens to 0.42 (an even-odd hole), 0.3 s fade.
- **Marker line**: a dark outline a little wider than the line (black 0.55) + a coloured core with a soft glow + a thin white highlight about a quarter of its width; drawn along its length; an arrowhead pops in over the last 10%; a small deterministic wobble at the vertices so it feels hand-drawn. Dashed for intended or future paths (a cross, a run), solid for what happened.
- **Ring**: a perspective ellipse (height about 0.36 of its width) under the feet, drawn clockwise, an outer dashed ring turning slowly; a vertical light beam while the player moves.
- **Draw order inside a freeze**: ring (who) → area or link (what happened) → label (the one-line finding), 0.3–0.6 s apart.
- **Slow motion**: source frames at 0.6–0.85×, neighbours cross-blended (no stutter).
- **Rewind**: the clip reversed in 0.6 s (ease-in-out), a horizontal jitter of about 0.7% of the width, four white tracking bars, a big ◀◀ and the word REWIND.
- **Trails**: in screen space keep only the last 0.6 s or so (ball 0.24 s). The camera pans, so long trails land in the wrong place.
- **Stamp** (e.g. a VAR decision): a framed card that drops from 1.7× to 1× with overshoot, slightly rotated, with a small flash. Once per film.
- **Perspective flatten**: see Native moves 7.

## 7. Grade and image quality

- **One grade for every clip**: saturation about 0.9, contrast about 1.04, slightly cool shadows; a mild sharpen at most. Scale footage up no more than 1.5×. Film grain is added once, over the whole frame.
- **A logo or URL burned into the upload** means the footage belongs to someone else: ask the user for a clean copy they have the right to use. Never crop it out or cover it with the packaging.
- Ask for the clip at its native resolution rather than an "AI-upscaled" copy.

## 8. Sound palette

- **The marker and the desk make every sound**, each one built by code: a marker squeak (band-passed noise at 2–5 kHz with flutter) for each line, a pop for each ring, a tick per landed label, a whoosh on every wipe, a tape-motor whine on a rewind, a stopwatch tick every 0.2 s, a thump for the stamp, a long whoosh over a low rumble under the flatten.
- **The freeze hit**: a camera shutter + a low thump + a short bright noise stab, all on the freeze frame. Three weights cover the film: light (label tick), medium (ring pop), heavy (freeze, stamp).
- **The footage's own sound** (crowd, commentary) plays at full level in live segments, if the upload has it and it carries no background track. Under a freeze only a low-passed crowd hush remains, looped or built from filtered noise; the goal roar returns on the goal frame.
- **The sound freezes with the picture.** Every freeze cuts the live sound dead; and once per film, drop even the hush for half a second before the decisive strike.
- **Sound across a cut**: the wipe's whoosh starts a few frames before the band enters, and the goal roar runs on over the cut into the replay.
- **Score-bar flip**: a mechanical clack with one short bright ping, on the frame the number changes. The only tonal accent in the film.
- **Voice**: an energetic pundit, one short finding per freeze (about 2.5–3 s). Everything else drops to about half while it speaks.

## 9. Native moves (and how to do them)

1. **Freeze and draw**: a freeze segment is one source frame + flash + punch + desaturate + spotlight; the overlays draw in by progress.
2. **Tracked ring**: hand keyframes of the feet point in source pixels every 3–6 frames, linearly interpolated. Check them with a debug still that paints every tracked point in magenta.
3. **Frame-counting stopwatch**: starts at the receiving frame and counts source frames ÷ the clip's frame rate; stops and turns yellow on the strike.
4. **Score-bar flip on the goal frame**, one entry per goal.
5. **Packaging from frame 1**: corner bug and score bar are positioned once and never fade in over footage.
6. **Dual-angle freeze**: two windows, each its own clip and frame range, both reaching their freeze frame on the same film frame; overlays are drawn in each window's source coordinates.
7. **Perspective flatten into a shot map**: for each shot, mark 6–8 known pitch points in its own frame (box and six-yard corners, where the penalty arc meets the box line; official pitch dimensions) and fit a ground-plane perspective transform. The strike frame then warps from its camera view to a top-down board; the picture fades out as the chalk board takes over, and the other shots' feet points, converted with their own frames' transforms, drop onto the same board.
8. **Data card**: the counted numbers re-stated on a board page: label on the reading side, big yellow number opposite, a red marker circle on the key one.
9. **Commentary transcript**: original-language words with timecodes and a translation, in a small box during live play; inaudible words become an ellipsis, never a guess.

## 10. Material

1. **Ask the user first** for their own footage (club or academy video, their own camera, a licensed clip), line-ups, event data or photos, and whether they hold the rights. Their uploads come first; in a product film the "match" is a screen recording of the product.
2. **Public material**, judged file by file on its own page: CC0, public domain and CC BY are fine; CC BY-SA, "no known restrictions" and unclear licences are not used. A rights holder's official channel that marks a video as reusable is fine; re-uploads, fan mirrors, colourised or "restored" versions never are.
3. **Facts** (scores, minutes, how a goal was scored): the league's or club's own match page first, then established newspapers. Each goes in the video's `facts.md` with its source. When sources disagree, use the official record and leave the disputed detail out.
4. **Before downloading anything, tell the user** what you will fetch, from where and under which licence, and note licence, author and page in `facts.md`.
5. **People on screen**: players, referees and staff in the event are fine; never slow down or freeze on an identifiable spectator.

## 11. Building it here

- **Footage is an uploaded clip** (`public/<brand>/<video>/video/`) played with Remotion's `<OffthreadVideo>`. One function per segment maps the film frame to a source frame; wrapping the video in `<Freeze frame={…}>` then gives live play, slow play, rewind and freeze from the same clip. `Freeze` counts in the film's own frames (source seconds × 30, fractions allowed), whatever the clip's frame rate. Cross-blend two neighbouring source frames with opacity for slow motion.
- **The clip's sound is a separate layer.** Anything inside `Freeze` is silent, so keep the picture `muted` and play the same file as an `<Audio>` (from `@remotion/media`) in a `<Sequence>` for each live segment, trimmed to that segment's source range; it ends on the freeze frame.
- **Overlays are one SVG inside the same wrapper as the footage**, so the punch and creep (`prog` with `ease.out` on a CSS `transform`) move both. Marker lines are `<path>`s drawn with `stroke-dashoffset`; the glow is a CSS `drop-shadow`; the wobble comes from `noise(x, seed)`, never `Math.random`.
- **Tracking** is a small table of keyframes in the video's folder, read with `lerp`. Paint the points in magenta behind a debug flag and check them with `npm run stills` on full-size frames.
- **Spotlight** is an SVG path with `fill-rule="evenodd"`; the desaturate and cool cast are a CSS `filter` on the footage only.
- **The flatten needs no 3D library**: a CSS `matrix3d` computed from four pitch points warps the frozen frame, interpolated from the identity to the top-down view while the board fades in.
- **Leans on**: `springAt` with `SPRING.bouncy` for the stamp and the score flip only; `MaskRise` or a `clip-path` wipe for board text; `Finish` for the one layer of grain; `ExampleBadge`.
- **Overrides**: `<SceneTrack sweeps={false} />` (the yellow wipe is the only transition), no `Backdrop` behind footage, no springs on lines or labels. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **Segments live in `timeline.ts`** (clip, source range, speed, freeze frames); `Soundtrack.tsx` places the shutter, squeaks and voice on the same frames.

## 12. Pitfalls of the medium

- **Wrong tracking points** are the biggest risk: coordinates read off a scaled contact sheet are easily 20–50 source pixels off. Read them on full-resolution crops, then check with the magenta debug still.
- **Overlays not under the punch transform** slide off the players during a freeze.
- **Balls vanish**: in long shots the ball is a few pixels with motion blur; frames where it is invisible are interpolated and the number says "≈".
- **Numbers the footage can't support** (ball speed, distance run) are not written. Distances only from a perspective transform fitted to visible markings, each shot in its own frame (the camera zooms and pans between shots).
- **Packaging late by one frame** shows what it was meant to cover: bugs never fade in over footage.
- **Split-screen windows sliding in** reveal what's outside them: clip each window to its slice in source coordinates, not only to its half of the screen.
- **Score state must match the moment**: before the 67th-minute goal it is 3–2, not 3–3.
- **Names in the voice-over**: spell them phonetically for the voice and keep the real spelling on screen; check what `npm run review` hears back.
- **Freeze labels echo the narration** and live only about a second; anything the viewer must read (scores, board rows, the data card) holds at least 2.5 s.
- **A wide clip in 9:16** over-zoomed to fill the frame turns to mush and loses the play: keep it a band.

## 13. In a product video

- **The brand's colour takes the "one we follow" role** (rings, main lines, the bug's block). A second hue marks the other side (the old way, the obstacle), red stays the gap. The three roles are the look; the hues may change.
- **The product's screen recording is the match.** Play it live (full-frame, or in a `Device` held flat to the camera with `float={0}`, the recording and the SVG overlay passed together as its `children` so the lines stay on the screen), rewind, freeze, then ring the button, draw the finger's path, and patch in red the step that cost time. A screen holds still, so tracking is easy and the lines can be exact.
- **The stopwatch counts the recording's real frames** ("3 taps, 4.2 s"); never speed the recording up and then time it. Every number and claim is in `facts.md`; anything illustrative carries `<ExampleBadge />`, and real names or messages in the recording are swapped for fictional stand-ins.
- **The score bar becomes a real counter** (steps done, items found) or is left out. No invented score against a named competitor.
- **End card**: a board page with the logo, one line on how to get it, and the film's key number circled in red marker.
- **Arabic**: mirror the packaging (bug top left, score bar bottom left, clock top right), put each label's colour bar on the right, and reveal whole words from the right, with no letter-spacing and no slanted Arabic; only the numerals keep the italic. A heavy, compact Arabic sans suits it. The ◀◀ and ▶ transport marks keep their direction.
- **9:16**: the band layout from section 2; bug, score bar and labels hug the band, clear of the top 12%, the bottom 22% and the right 12%.

## 14. Variation space

You decide per film: the sport (football, a basketball pick-and-roll with screens drawn as bars, tennis rallies with landing zones, F1 overtakes with racing lines: anything with a wide camera that shows the whole play), the moments, the show's fictional name and colours (keeping the three roles), how many freezes.

- **Three structures:** a chronological build-up to the deep breakdown (secondary moments get light treatments, the decisive one the full rewind-and-freeze); one moment taken apart from three angles; a "what went wrong" defensive breakdown ending on the space map.
- **Three openings:** the show sting into a match-record card; the goal frame frozen in the first second, then rewind; the stopwatch running over live play.
- **Three endings:** the top-down board that sums up the moments; the data card with one number circled; the hero shot slowed with the minute and name.

---

Adapted for Halal Motion Videos from the `telestrator` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
