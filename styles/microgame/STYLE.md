# Microgame Frenzy

> A rapid-fire party-game film: one command word, a few seconds, one action. Every microgame is drawn in a completely different art style, and the film keeps getting faster.
> References (grammar only): the WarioWare series, for the command → action → result unit and the acceleration. Never use its name, characters, UI, microgames or sounds.

The format suits short films; once the frenzy stops building, end it.

## 1. Essence, and what it is not

- **A microgame = a shouted command word + 2.5–4 s + one action + one result** (success, or a funny failure).
- **Each microgame uses a different visual medium** (crayon, ink wash, terminal, risograph, pixel, blueprint, Swiss type, clay, cut paper, woodcut…). The jolt of each switch is both the joke and the hit.
- **One fixed home look** holds the film together: a show stage with a host, a lives counter and a stage number, which the film returns to between games.
- **It keeps accelerating**: every few games the pulse, game length, dwell, command hold and animation step rate tighten together.
- **The hero survives every medium** by keeping two or three silhouette marks.

Not Game Show Flat (one art style, rounds of bars, call-and-response), not a style sampler reel (every game has stakes; lives connect them), not a montage (each game has a rule grasped in under a second).

## 2. Materials & rendering

- **Home stage**: flat toon, thick near-black outline (about 0.65% of the frame's short side), flat fills, **one hard-edged shadow** (fill in the shade colour, clip to the shape, refill shifted up-left). Fixed furniture: a frame-within-the-frame where games play (a TV, an arcade cabinet, a phone, a window), the lives board, a stage badge, a trigger prop (button, lever, bell).
- **Each medium is a simplified re-drawing**, small enough to be one component, built around one trick that makes it read at a glance:
  - drawn media treat **pressure or wetness as opacity** (crayon: opacity = pressure against paper tooth; ink: a wet layer under a dry layer);
  - print media are **one layer per plate** (riso: a layer per ink, multiplied where they overprint, halftone dots, a little misregistration);
  - screen media are **low-res pictures** scaled up with hard pixels (pixel: a fixed palette, an automatic outline, dither; terminal: hand-authored glyph art with a phosphor glow);
  - technical media are **line systems** (blueprint: line weights and dimensions; Swiss: a strict grid, one sans, one signal colour).
- **Hero translation**: the hero is redrawn from scratch in each medium, but the same marks always survive (e.g. a hat shape, one coloured dot, a number on the chest). Make a model sheet of the hero in every medium before animating.
- **Mixed-media frames**: drawn media sit over a base with their gaps showing it, paper media are multiplied, screen media stay flat and clipped to a panel.
- **A short film needs three to five media, not ten.** Choose the ones the tasks call for and draw each well.

## 3. Colour logic

- **The home stage owns a saturated party palette**: a deep ground behind a rotating sunburst, two or three loud accents, plus a fixed success colour and a fixed fail colour used by stamps and the lives board only.
- **Each medium brings its own palette** from its tradition (wax colours, one-ink-plus-vermilion, amber phosphor, three riso plates, a limited pixel palette, white-on-blue, black-white-red). Never tint a medium with the home palette.
- **One accent follows the hero across media** where the medium allows (a single vermilion dot in ink, an inverse glyph in a terminal, a signal-red circle in Swiss type): it is how the eye finds the hero after a switch.
- Example home palettes: violet `#2a0f5c` with magenta `#ff2e88`, gold `#ffc928`, cyan `#1fd1d1`; teal ground with coral and lemon; black stage with hot orange and electric blue.

## 4. Type & on-screen text

- **The command word is the on-screen line**: a heavy, rounded display face (the kind of Titan One), white with a thick ink outline, a coloured drop and a burst behind it, skewed a few degrees. It slams in over about 4 frames (overshoot → settle), holds, then **shrinks into a corner tag before the first action**, so the result is never covered. One-off banners fly out instead of tagging, so tags never pile up.
- **The command needs its own face** whatever the brand uses: a brand's text face is too quiet for a shout. The brand's face can set the other lines.
- **Other lines**: a rounded card in the home palette with the home outline and hard shadow, a friendly rounded face (the kind of Lilita One, about 4.5% of the frame's short side), a small speaker icon; placed above the timer in games, never under a big banner. Each card appears with the voice line it carries and stays long enough to read.
- Inside a game, any text (replay captions, labels) uses **that medium's own typography**.
- The command word is shown once, as the banner; no card repeats it.

## 5. Motion quality

- **The step rate is part of the ladder**: early on, characters hold each drawing 3–4 frames (8–10 drawings a second); later 2 frames; at the climax every frame is new. Camera moves, transitions and the timer spark always move on every frame.
- **Five things tighten together** at each speed-up: the pulse, game length, stage dwell, command hold, character step rate. The pulse is a unit in frames (say 18, then 15, 12, 10); every duration and landing is a multiple of it.
- **The timer is visible and on the pulse**: e.g. a fuse with one knot per pulse, the spark passing each knot exactly on it. It freezes in a replay.
- **Unified transition through the frame-within-the-frame**: push into the screen to start a game (about 8 frames), shrink the game back into it to return (about 10 frames) with a ✓ / ✗ stamp. No fades, no blank frames.
- **Failure is performed**: the action overshoots, splats, bonks or rolls off; the medium's own physics makes the joke. The joke is on the situation, never on a person.
- **Instant replay** for a failure that must be understood: freeze, half speed, push-in, letterbox, a caption in the medium's type.
- The home host bobs once on every pulse; stopping it dead is the strongest emotional tool.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Start inside a game, command already slamming | the rules explain themselves | throwing the viewer in |
| Pull back out of the game screen | scale: this was one screen on a show | the first return to the stage |
| Locked frontal home frame | the constant; only the scoreboard changes | stage moments; the host's reaction |
| Spinning strips (the stage splits into rolling strips of earlier frames, stopping one per pulse) | acceleration, a summary | a speed-up; a change of round |
| Extreme insert on the trigger prop | the start, felt | a game starting exactly on the pulse |
| Lights cut to one top spot, frame unchanged | stakes; the last chance | the last life; a decision |
| Tile flip (last frames of past games flip into pieces of a new frame) | the past becomes the material of the present | a finale; a recap |
| Push into a detail, hold | the viewer notices before the hero does | a clue; a silence |
| Snap back to wide on one pulse | release | a solution blooming; a save |
| Split screen, two media side by side | comparison, rivalry | two players; before/after; two approaches |

Framing: the game screen is a fixed fraction of the frame (around 40% of the width in 16:9, around 80% in 9:16); in a mixed-media frame keep **one focal chain** (A leads to B leads to C) and push info panels into a corner.

## 7. Sound palette

- **Each medium has its own foley**: wax squeaks for crayon, wet splats and a brush drag for ink, teletype relays and square beeps for a terminal, paper crunch and a roller for print, bit-crushed blips for pixel, ratchets and stamps for drafting, hollow bonks for clay. The change of sound world at each switch is half of the jolt.
- **Home stage kit**: a spring trigger click, a glass crack for a lost life, card flips, a whirr for the spinning strips, a ✓ stamp and a ✗ stamp, sparse claps from an unseen audience.
- **Every command lands with a hit**; a family of light, medium and heavy hits covers the film. The timer ticks once per pulse, so the ticks crowd together as the film speeds up.
- **Acceleration options** (use what fits): a rising noise sweep into each speed-up; the tick's pitch one step higher each round; on the last life, everything drops out except one slow, low thump per pulse.
- **Real silences**: at least one before the biggest hit (the low thump may remain). The loudest moment comes right after the longest silence.
- **Sound across a cut**: the next medium's foley starts a few frames before the push into the screen, so the ear arrives first.
- **No bed.** Between hits the stage is dry; continuous sound would blur the switches.
- **Voice**: a host who shouts every command a hair *after* the hit so the two don't mask each other; a hero with very few words (reactions work best).

## 8. Native moves

A menu: use the ones your story needs.

- **Style switch per game.** Each task is drawn in the medium that suits it. *Fits content like:* the steps of baking bread (flour in crayon, oven dial in blueprint, crust in woodcut); a day of a nurse; the stations of a parcel's journey.
- **Command word.** One verb is script, on-screen line and hit. *Fits content like:* SCAN! at a checkout; BREATHE! at a swimming lesson; SIGN! at a contract signing.
- **Lives as UI.** The counter carries emotion without narration; 3 → 2 → 1 (blinking) builds tension alone. *Fits content like:* a phone battery; retries on a driving test; chances left on a quiz.
- **SPEED UP.** Everything steps up together. *Fits content like:* rush hour; the last week before a deadline; a kitchen during dinner service.
- **Failure becomes the solution.** The material of an earlier failure returns in the final game as the answer. *Fits content like:* a spilled coffee that later stains the winning map; a bug that becomes a feature; a missed train that leads to the right meeting.
- **Finale mixes the rules.** The final game is built from pieces of earlier media. *Fits content like:* a final exam; launch day; a shop's opening morning.
- **Instant replay.** The joke explained in slow motion. *Fits content like:* a goal-line decision; a typo that shipped; a cat's leap that missed.

## 9. Pitfalls of the medium

- **A brightness-ramp ASCII figure is mush** → hand-authored glyph art with structural glyphs, an inverse glyph for the accent.
- **Ink shapes read as smoke** unless their silhouette is designed (a short round blot phase, then a clear structure with seams and light edges).
- **A failure at high speed goes unread** → make the action overshoot and hit something, or give it an instant replay.
- **Drawn media show the background through their gaps** → a solid base layer where it must be opaque.
- **A medium's filter leaks onto its neighbours** → give each game one wrapper that owns its filter, blend mode and clip, so the stage, the strips and the tiles can show it small without changing it.
- **Command tags pile up** → secondary commands fly out.
- **A 100% white flash** reads as a blank frame → cap at about 60%.
- **A one-word voice line** can gain a vowel tail or be misheard ("Pump!" → "Pompey") → write the command as a short phrase ("Pump it!"), check what `npm run review` prints under "Heard:", and regenerate the line with a new `seed` until it is right.

## 10. Building it here

- **One component per medium, plus the home stage**, all React, CSS and SVG. The game screen is a clipped `div`; the push in and the shrink back are a `transform: scale()` on the stage around the screen's centre.
- **Each look is a filter on its wrapper**: crayon is an SVG `feTurbulence` (fixed `seed`) used as a `mask-image` for paper tooth plus a small `feDisplacementMap`; riso is one layer per plate with `mix-blend-mode: multiply`, a `radial-gradient` dot pattern as mask and a 2–3 px offset; ink is a blurred shape sharpened again with `feComponentTransfer`; a terminal is a monospace glyph grid with `text-shadow` glow and a scanline `repeating-linear-gradient`; pixel is a small `<canvas>` drawn from the frame number and scaled with `image-rendering: pixelated`.
- **Stepped animation**: quantise the frame for characters, `Math.floor(frame / hold) * hold`, with `hold` taken from the current speed level; the camera and the timer read the real frame.
- **Springs fit here**: the command slam is `springAt(…, SPRING.bouncy)`, stamps are `SPRING.snappy`. Use `noise(x, seed)` for wobble and splat scatter, never `Math.random`.
- **Overrides**: `<SceneTrack sweeps={false} />`, because every scene change goes through the game screen; no `Finish` grain over the flat home stage (each medium brings its own texture); `MaskRise` and `Headline` are too polite for a command, so build the banner yourself. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **The speed ladder lives in `timeline.ts`**: a list of levels (pulse in frames, game length, command hold, step hold), and every game's start derived from it; `Soundtrack.tsx` places hits and ticks from the same list.

## 11. In a product video

- **The brand's colour is one of the home stage's loud accents**, and the accent that follows the hero. Each medium keeps its own palette; that contrast is the look.
- **Each command is one thing the product really does** (SCAN! SAVE! SEND!), and the result of the game is what the product gives back. Three to five games fill a 30-second film.
- **The real product is one of the media.** Make the frame-within-the-frame a phone or a laptop and play one game on the real screen with `Device` (a screenshot with `taps`, or a screen recording); it is the game that always succeeds.
- **Lives, stage numbers and scores are game furniture**, not claims. Any real number or claim about the product is listed in `facts.md`; sample data inside a game carries `<ExampleBadge />`.
- **End card**: the home stage at rest, the logo on the game screen, the last command as the call to action (GET IT!) and one card saying where.
- **Arabic**: the lives board and stage badge swap sides and the command tag goes to the other corner. The command slams in as a whole word in a heavy display Arabic face (the kind of Lalezar), no letter-spacing; draw its outline behind the fill (`paint-order: stroke`) so the joins between letters stay clean.
- **9:16**: stack it: badge and lives under the top 12%, the game screen across the middle, the host below it, the timer above the bottom 22%, nothing important in the right 12%.

## 12. Variation space

You decide the tasks, which medium draws each, the home stage and its frame-within-the-frame, the host and hero, the number of rounds, where failures fall, the finale, the opening and the ending. The command → action → result unit, the medium switch and the acceleration stay.

- Structures: **two players, alternating** (each game is played by one of two rivals; the lives board is a tug-of-war); **one day, hour by hour** (each game is an hour, the speed-ups are the morning rush and the evening rush, the finale is midnight); **a relay** (the result of each game is the object handed into the next one, so the chain is the story).
- Openings: **the home stage asleep** (lights off, the host wakes on the first pulse); **a game-over screen** we rewind from; **the lives board alone**, a counter clicking down before we know what it counts.
- Endings: **a high-score table** where the hero's name is written once in each medium; **the credits as one more microgame** (CATCH THE NAMES!); **the home stage packs away** into the frame-within-the-frame and the screen switches off.

---

Adapted for Halal Motion Videos from the `microgame` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
