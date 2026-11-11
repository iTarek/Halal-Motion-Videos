# 1930s Rubber Hose Cartoon

> Black-and-white hand-inked cartoons where every object is alive and bounces to one shared pulse.
> References (grammar only): early Fleischer Studios shorts (c. 1930–33) for a whole world that moves as one, surreal transformation, the bouncing ball that leads the eye from word to word, and ink-and-pen framing devices; *Cuphead* for how a modern team finishes the look. Never use an existing cartoon character, name or silhouette, and never copy designs or logos. **Avoid the "cup-head on a human body with a straw" design**: if your hero is an object, the *whole object is the body*.

## 1. Essence, and what it is not

Hand-inked black-and-white animation from the early sound era: characters with **rubber-hose limbs** (equal-width tubes, no elbows, no knees), **white four-finger gloves**, **pie eyes** (black oval pupils with a wedge cut out), huge round shoes, and bodies that squash and stretch like balloons. The backgrounds are soft grey watercolour paintings; the characters are flat white, grey and ink. Everything (furniture, machines, plants, the walls) **breathes on the same pulse**, and every action has its own sound on its own frame. The film looks like a worn 35 mm print projected in a 4:3 gate: flicker, scratches, dust, gate weave, vignette.

The premise here is the bounce itself: a cheerful, kind world keeping time together, with gags made of surprise and elastic physics, never of mockery.

Not a 1950s flat cartoon (no limited animation, no colour, no graphic backgrounds), not a silent film (synchronised sound is the engine), not a "retro filter" over modern animation (no joints, no rendered shading).

## 2. Materials & rendering

- **Frame**: a **4:3 gate** centred on black in 16:9 (pillarbox); a 3:4 gate across the full width in 9:16. Gate corners rounded (about 2.5% of the gate's height), soft inner shadow on the gate edge.
- **Characters**: flat fills, one hard-edged form-shadow band (light grey) on the side away from an upper-left light, ink outline **constant on screen** at any zoom (about 0.55% of the frame height), light **line boil** (about 0.1% of the frame height, 3 drawings cycling).
- **Anatomy kit**:
  - Limbs: noodle tubes of constant width (about 1/20 of the character's height), one smooth bend, round caps.
  - Gloves: palm + 3 fat fingers + thumb, flared cuff with a fold line, 3 stitch lines on the back. Outline the union only (stroke all parts thick first, then fill all).
  - Pie eyes: white oval, big black pupil (about 64% × 74% of the eye) with a wedge cut toward the upper right; blink with an eyelid in body colour and a lid line.
  - Mouths: smile with cheek ticks, open grin, "O", wavy (scared), pucker, tongue-out. Shoes: big black ovals with a white toe glint.
- **Object characters**: the face sits on the body; a **secondary feature carries the mood** (steam, a flame, a lampshade tilt, a spring). A box-shaped object is drawn as a real box seen slightly from above, the face mapped onto its front.
- **Backgrounds**: painted once, at 1.25–1.5× the frame so push-ins stay crisp: flat wash + soft blotches (±5%) + inner edge darkening + a thin dark-grey outline + paper grain. They never boil. Period motifs: patterned wallpaper, panelled furniture, checker floors, brick, clapboard.
- **Film damage** (a pass over the finished scene, not part of it): low-frequency gate weave (about 0.1% of the frame) with a rare jump; flicker ±4%; 0–3 drifting vertical scratches; 3–8 dust specks per frame; an occasional hair; strong vignette; a small jump on every cut; slight blur; film grain.

## 3. Colour logic

- **Strictly greyscale**: about 6 grey steps plus a separate character white. No hue anywhere, not even in the film damage.
- **Characters own the extremes**: character whites and ink blacks are brighter and darker than anything in the background. Backgrounds live in the middle greys (walls around mid grey, furniture one or two steps darker). Add a mild contrast boost (about 1.1–1.15) over the whole film: 1930s prints are rich black and bright white, never flat grey.
- Form shadow is one light-grey band, never a gradient.
- Examples of the grey ramp's temperature: warm paper greys; cool silver-nitrate greys; a faint sepia print. Pick one and keep it for the whole film.

## 4. Type & on-screen text

- **Narrated lines are a period title card**: a small near-black plate with a white double-rule border and dot-and-ring corner ornaments; text in an old-style small-caps serif (the kind of IM Fell English SC), paper white. It sits inside the film, so it weaves and flickers with it; it pops on and off with no fades. Low in the gate by default, high when the action is low. One card may span two short voice lines.
- **Titles**: a fat retro script (the kind of Shrikhand), white face, heavy ink outline (about 14% of the cap height), ink drop shadow down-right; words can hop in a travelling wave on the pulse. Sub-lines in deco capitals (the kind of Limelight).
- **The style needs its own period faces** whatever the brand uses; the brand's typeface stays in the logo.

## 5. Motion quality

- **Characters on held drawings**: hold each drawing 2–3 frames (about 12 a second); pick one hold for the film. The camera moves on every frame: a stepped camera reads as judder.
- **Pulse grid**: choose a pulse that is a whole number of drawings (12, 14 or 16 frames on two-frame holds; 12, 15 or 18 on three-frame holds), so every pulse lands on a new drawing.
- **Breathing**: every idle object squashes and stretches with `cos(2π · pulses)`: an extreme on every pulse (stretch on the pulse, squash halfway), sampled on the held drawings, amplitude about 5–7%, all props in phase. A peak of joy can raise the amplitude ×3 and squash the whole background painting around the floor line (about 2.5%).
- **Walk**: one step per pulse with a body bob (sad = smaller steps, limp arms). **Run**: legs as a windmill (feet orbit a circle), lean forward, speed lines.
- **Anticipation–hold–action**: before every big move, crouch (squash to about 0.8), hold (let every sound stop), then snap. Impacts get a squash with an exponential spring-back.
- **Held frames are acting**: a chain of holds, each glance on a half pulse with a wood tick, reads as thinking.
- **Freeze on a stop**: when the sound cuts out, freeze everything, background breathing included.

## 6. Camera grammar

A theatre camera: mostly locked, moving only to follow a runner or to land a gag. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Stage-wide, locked, eye level | A proscenium: the set is a stage and everything on it plays its part | introducing a place; a team at work; a routine |
| Hard cut to a face close-up | The reaction is the joke | a surprise; a taste; a realisation |
| Trucking pan beside a runner, eased start and stop | Pursuit, momentum | a chase; a race; a delivery |
| Medium follow shot (character about 1/4–1/3 of the frame height) | Every step is a sound | climbing, marching, working in step |
| Tilt with a fall or a rise | Gravity as rhythm | a tumble; a rocket; a lift |
| Slightly high angle, one unbroken shot | The hazard and the answer in one frame | a danger; a stretch; a rescue |
| Tabletop pan (flat characters in front of a set turning in depth) | The world is a real place | a street; a carousel; a factory floor |
| Pull-back from a close-up to a packed medium-full | One feeling spreads to everyone | a celebration; a crowd joining in |
| Iris in / iris out (grabbable by a character) | The film is an object | a beginning; an ending; a scene change with a gag |

Framing: faces must read, so no far-wide shot for a gag or a synced moment. The destination prop enters frame before the gag lands. Arcs and leaps stay inside the gate at the current zoom. In 9:16 stack the stage: the hero in the upper middle, the prop or the floor gag below. Transitions: iris, a hard cut on a pulse, a title card rolling up like a window shade; no dissolves.

## 7. Sound palette

- **Foley by material**, all designed in code: porcelain and glass = a hard inharmonic ping with a tiny transient; wood = a dry tock; metal = clanks and clinks; springs = "boing"; water = filtered noise with rising blips and bubbles; rubber = a creak through a band-pass.
- **Every action gets its sound on its own frame**: a tock per step, a tick per glance, a thump per landing, a short rising or falling glide for every stretch or fall. Breathing and idle bounce stay silent.
- **Three weights of hit**: tick (a look, a blink), tock (a step, a tap), thump (a landing, the point of a gag). The gag's own thump is the loudest sound in its scene.
- **Stops**: a hard silence, tails cut, before a gag or on a stare; the next sound then reads as the joke.
- **Ambience bed**: the old print itself, hiss, crackle and a steady projector clatter, very quiet and never tonal. It is the only sound allowed inside a stop.
- **Aged sound**: band-limit every effect (roughly 110 Hz to 6 kHz), add slight wow and flutter and soft saturation, so nothing sounds modern.
- **Sound across a cut**: the rubbery squeak of the iris closing runs over the cut, or the next scene's first step is heard before the iris opens.
- **Voice**: a period character (a radio announcer calling the action, a newsreel narrator), few short lines.

## 8. Native moves

A menu: use the ones your story needs.

- **Everything breathes on the pulse.** The setting is a character; at the peak the *whole world* can bounce in sync, walls included. *Fits content like:* a factory at shift change; a garden after rain; a city waking up.
- **Every step is a sound.** Actions and props keep time: each one lands on the pulse with its own material sound. *Fits content like:* stairs that tock one tread at a time; typewriter keys clacking in step; fence posts ticked by a passing stick.
- **Rubber-hose stretch.** Limbs reach any length in one unbroken shot. *Fits content like:* reaching a top shelf; a long-distance handshake; catching a falling baby bird.
- **Transformation.** Anything becomes something else mid-motion (a tail into a question mark, a hose into a telescope). *Fits content like:* an idea turning into a product; a problem into a tool; a word into an object.
- **The bouncing-ball read-along.** A line on a title card, a ball hopping from word to word as each is spoken. *Fits content like:* a slogan to remember; a safety rhyme; the steps of a recipe.
- **The film is a physical object.** Title cards roll up like window shades; the iris is grabbed and pulled shut; intertitles get bumped; the frame line slips. *Fits content like:* a brand reveal; a "the end?" twist; a character escaping the cartoon.
- **The ink bottle.** An artist's pen draws the hero, who then argues with it. *Fits content like:* a making-of; a mascot introduction; a lesson about drawing.

## 9. Pitfalls of the medium

- **Flat grey frames.** Push backgrounds to mid grey, keep pure white and ink for characters, add a contrast boost.
- **Wide shots kill gags**: a far shot makes characters tiny and step-by-step sync unreadable. Use medium shots, and a packed medium-full for crowds.
- "Sad" brows drawn as "angry": define brows by inner / outer end (inner = near the nose), not by left / right.
- A limb drawn behind a body gets hidden by the silhouette (a handle, a tail): kick and reach outward past it.
- Painted characters collide with background props at some camera positions: check every shot's last frame.
- Smoke puffs in a row read as thought bubbles: scatter and grow them.
- Short voice lines make title cards flash: merge consecutive lines into one card.
- A boiling background swims: the line boil belongs to characters only.

## 10. Building it here

- **Characters are SVG**: a limb is one `<path>` with round caps, a thick ink stroke under a thinner white one; `vector-effect: non-scaling-stroke` keeps the ink constant at any zoom, as long as the camera zooms inside the SVG (a `<g>` transform or the `viewBox`): a CSS `transform` on a wrapper `div` scales the stroke with everything else. Draw every part's outline first, then every fill, so only the union is outlined.
- **Held drawings**: pose from `Math.floor(frame / hold) * hold`, and drive the camera from `frame` itself.
- **Line boil**: `feTurbulence` plus `feDisplacementMap` on the character group only, its `seed` cycling through three values from `Math.floor(frame / hold) % 3`.
- **Breathing and squash**: `scale(1 + a·cos, 1 − a·cos)` with `transform-origin` at the floor contact, computed from the pulse. Impacts and snaps lean on the engine's springs (`springAt`, `SPRING.bouncy`): overshoot is native to this style, just sample it on the held drawings.
- **Gate and film damage**: one top layer. A rounded `clip-path` with an inset shadow is the gate; weave, flicker, scratches and dust come from `noise(x, seed)` on the frame number (never `Math.random`); `Finish` adds grain and vignette; a `filter: grayscale(1) contrast(1.12)` over the whole film keeps every hue out.
- **Iris and cards**: the iris is an animated `clip-path: circle(…)`; title cards pop on a whole frame. Use `<SceneTrack sweeps={false} />` and leave `MaskRise` out: nothing here rises from a mask. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **Tabletop pan**: there is no 3D library; a few background planes inside a `perspective` container with `transform-style: preserve-3d` turn in depth behind the flat characters. Keep it to three or four planes.
- **The pulse lives in `timeline.ts`** (the unit and the hold), and `Soundtrack.tsx` puts each tock and thump on the frame of its step.

## 11. In a product video

- **This palette is the look**: the film stays greyscale. The brand colour is only the end card's hand-tinted logo, the single touch of hue in the film.
- **The product is a prop in gloved hands**, not a face: a phone or box drawn in ink, its screen a real screenshot (`Phone`) shown in a close-up, passed through the same grey and film damage. Keep faces off the screen itself. If a screen needs its colour to be understood, show it on the end card.
- **A helper character or mascot** does the demonstrating: modestly dressed, kind, and its gags are about the task (the mess, the queue, the deadline), never at someone's expense.
- **Real numbers and claims** go on title cards, each one listed in the video's `facts.md`. Illustrative data carries `<ExampleBadge />`.
- **End card**: a period title card with the logo and one line on how to get it, then an iris out that closes on the logo.
- **Arabic**: mirror the staging (runners travel right to left, the bouncing ball hops right to left) and let title words hop whole, never letter by letter, with no letter-spacing. A Ruq'ah-flavoured display face suits the titles, a clear Naskh the cards.
- **9:16**: the 3:4 gate; medium shots only; title cards sit in the gate's lower middle, above the bottom 22% and clear of the top 12% and the right 12%.

## 12. Variation space

You decide the location (or several), the cast, the structure, the opening, the ending, the camera path, the pulse and the set of sounds.

- Structures: **a read-along** (a rhyme line by line, the bouncing ball carrying the message while the set acts out each line); **a show-and-tell** (objects take turns on a stage, the smallest wins); **a relay** (a thing passed hand to hand across a town, each hand-off adding a new sound to the chain).
- Openings: **out of the inkwell** (a pen draws the hero, who hops onto the set); **a curtain rise** (a gloved hand pulls the rope; a clapperboard starts the film); **an iris on one eye** (it blinks, the iris widens to show whose eye it is).
- Endings: **the card pulled over** (a character drags "The End" in front of itself mid-gag); **the film snaps** (the frame burns, a gloved hand splices it for one last bow); **the set packs up** (props walk off one by one until the last lamp clicks off).

---

Adapted for Halal Motion Videos from the `rubber-hose` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
