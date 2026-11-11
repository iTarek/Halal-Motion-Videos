# Sci-Fi Sitcom Toon

> A dry sci-fi sitcom cartoon: thick boiling outlines, flat colour, a duo whose reactions don't match, a glowing portal, and one palette per world.
> References (grammar only): dialogue-driven sci-fi sitcom cartoons of the 2010s (reaction close-ups, boiling line, sci-fi hardware as household junk). Borrow the *grammar*, never the characters.

## 1. Essence, and what it is not

Hand-drawn-looking 2D TV animation with a dry sense of humour: **uniform thick dark outlines that boil**, **flat fills with hard-edged shadow shapes (no gradients)**, **big white eyes with tiny pupils**, **elastic mouths**, odd-but-cute creatures, and sci-fi hardware treated like household junk. The comedy is **dialogue-driven**: improvised-feeling talk, interruptions, awkward pauses, reaction shots, escalation, and a last-second reversal. The genre's engine is **a tiny, mundane goal pursued with absurdly large sci-fi means**: whoever could solve anything uses it for a small chore, and the plan keeps getting bigger than the chore.

The laugh comes from the gap between the two reactions and from the size of the means, never from mocking anyone.

Not a kids' cartoon (dry humour, long pauses), not anime (no sparkly eyes), not a vector explainer (lines boil).

**Copyright red lines (non-negotiable):**
- Never reproduce any existing show's characters, silhouettes or colour combos (e.g. a spiky-blue-haired old man in a lab coat + a kid in a yellow shirt), names, catchphrases, running gags, logos, or the look of any existing portal device.
- Invent your own cast, props and portal device. Never write a source show's name in the film or its docs.

## 2. Materials & rendering

- **Line**: near-black (a slightly purple black reads best), about 0.65% of the frame height for characters and props, a little thinner for background detail, round joins. **Line width is constant on screen**: close-ups are "redrawn" at the same weight, never scaled up.
- **Line boil**: every outline is displaced along its length with low-frequency noise, amplitude about a quarter of the line's width; cycle **3 boil drawings**, each held 2–3 frames. Everything boils, including held poses and backgrounds: a still frame is never dead.
- **Fill**: flat colours only. Shadows are hard-edged darker shapes clipped inside the fill (one per form, away from the light). Glows are 1–2 flat translucent rings, not gradients. Skies are **flat colour bands**.
- **Faces**: big white eyes (touching in 3/4 view), tiny pupils, heavy lids for deadpan, eye bags. Parametric mouths (open, width, curl, skew) with interior, teeth, tongue. Brows carry the emotion.
- **Cast design**: silhouettes must read in solid black. Give each lead one absurd, modest costume idea. Avoid white lab coat + spiky hair.
- **Creatures**: every world may get one creature that is strange *and* adorable; keep it non-verbal (sound effects) so the film stays a dialogue between the leads. Check that anything behind furniture still shows face and upper body.
- **The portal** (or whatever device moves between worlds): the only thing that glows. A lumpy rim with a thick outline, rotating spiral arms, a pale core, orbiting sparks, drips, a flat translucent wash over the scene while it's open. Open with a gentle overshoot (about 12%, a back-ease of about 0.3 s); a springy overshoot covers the actors.
- **Screen graphics**: a retro-terminal tag (the kind of VT323) typed in, coloured per world.

## 3. Colour logic

- **One palette per world**, 3–5 colours, maximally different from the previous world in hue *and* value, so the audience reads "we jumped" from colour alone.
- Line colour and eye white never change between worlds; everything else may.
- Glow colour belongs to the travel device only: nothing else in any world may use it.
- A deliberately bland palette (beige, brown) is itself a joke: use it for the world that is "suspiciously normal".
- Examples of a sequence of worlds: sage lab → magenta and lime jelly → orange and teal; or grey office → ultraviolet and gold → mint and coral → beige.

## 4. Type & on-screen text

- **Spoken lines**: bottom centre, a rounded heavy sans (the kind of Baloo 2 ExtraBold, about 4.5% of the frame height in 16:9), white with a thick black outline, so they look like the cartoon's own captions, with a small **speaker pill** in the character's colour (boiling outline) on the reading side. Lines wider than about two thirds of the frame wrap to two lines. Overlapping lines stack; the older one dims to about 70%.
- **Timing**: words arrive with the voice-over's word timings. Clear the caption at world changes and **before a silent pause**, so the silence plays on a clean screen.
- **Title**: chunky display lettering popped in on held drawings, on a hit. Choose a look that is not the source genre's logo: **avoid acid green, slime drips and wobbly bubble lettering** together, which reads as a specific show.
- Keep faces out of the caption band and the world tag clear of faces.
- This style wants its own rounded caption face; the brand's typeface stays in the logo and the end card.

## 5. Motion quality

- **Characters on held drawings**: poses, mouths, blinks, walk cycles and boil hold 2–3 frames (about 12 drawings a second). **Camera moves, portal swirl, flying props and wipes move on every frame.**
- **Acting over moving**: held poses with small changes (eye twitch, pupils sliding, a gulp, sweat drops). Idle life: breathing (±1% squash), a nod driven by speech loudness.
- **Anticipation → action** before every gesture.
- **Squash & stretch** on landings (a decaying squash of about 22%), stretch while flying out of a portal; "sucked in" = scale toward the portal centre while stretching.
- **Lip-sync from the audio**: the mouth opens with the loudness of the line, sampled at each held drawing; alternate wide and round shapes. Exaggerate for shouts (mouth ×1.5–1.9).
- **Nervous jitter**: a new small offset on every held drawing (about 0.3–0.5% of the frame) plus trembling pupils; amplitude grows with panic.
- What never moves in a cold pause: everything but the boil.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Medium two-shot | the relationship; who reacts how | dialogue; a standoff; a negotiation |
| Hard cut to a close-up | an interruption, a face breaking | the cut-off line; the realisation; an excuse |
| Insert extreme close-up of an object | the absurd detail | a reveal; the problem itself; the wrong result |
| Reaction close-up | the laugh lives on the face | after every absurd image |
| Tight close-up + short shake on one word | panic | the key word; an alarm; a shout |
| Rush zoom into the portal → swirl wipe | leaving a world | any jump between places, times or versions |
| Same framing repeated across worlds | only the world changes | a montage; a comparison; a list |
| Very slow push-in on a still two-shot | a cold silence | the pause after a reversal; an admission |
| Wide with the device and both leads in frame | the whole situation at once | a callback; a fix; a fresh start |
| Over-the-shoulder onto a screen | reading bad news | a message; a readout |
| Whip pan between two faces | overlapping argument | a disagreement; a mix-up; a double take |

Rule: every absurd image is followed by a **reaction close-up**. In 9:16 the two-shot becomes two stacked singles or alternating close-ups, and the portal sits above the leads instead of between them. Transitions go through the travel device (swirl wipes) or hard cuts; no dissolves.

## 7. Sound palette

- **Foley, all designed in code**: portal open (sub boom + down-swept noise + rising swirl), its low throb while open, the close "fwump", a swirl whoosh per wipe, pop and boing, wet glorp and squish, slurp, chomp, a blink "blip", click-beep, a squeaky toy.
- **Each world has its own room**: one quiet, untuned ambience (a fluorescent buzz and a clock tick; bubbling; wind over dunes) plus one signature sound. Both change on the cut, so the ear reads the jump as clearly as the eye.
- **One stinger per gag**, short and dry. Rule of three: the same stinger, shorter each time.
- **What stays silent**: held poses, the boil, the slow push-in. A blink or a gulp may be the only sound in a shot.
- **Silence is the punchline**: hard-cut every sound, tails included, on a reveal and for a cold pause. Leave only room tone (the buzz, a clock tick, a fridge).
- **Sound across a cut**: the swirl whoosh starts before the rush zoom ends, and the next world's room is heard inside the wipe.
- **Tonal accents**: the portal's rising glide and the click-beep, nothing longer.
- **Voices**: a two-hander with contrasting voices: low, flat and slow for the deadpan lead; higher and faster for the nervous one. A tiny creature may say one or two words, pitched up.

## 8. Native moves

A menu: use the ones your story needs.

- **Parallel worlds.** Each jump = new palette, new room sound, new creature. *Fits content like:* versions of a product; careers you could have had; the same city in five eras.
- **Duo contrast.** Deadpan vs panic: the joke is in the difference between reactions. *Fits content like:* a veteran and a new hire; a parent and a teenager; an AI and its user.
- **Rule of three → quick-fire.** Two slow wrong answers, then one-second worlds cut on the pulse with the same rejection word. *Fits content like:* failed prototypes; bad holiday plans; tax forms.
- **The suspiciously normal world.** The pattern breaks; the calm is the joke. *Fits content like:* the one boring answer that works; a quiet office after chaos; the real customer.
- **Dead-air reversal.** A long silence after the twist, then one line revealing a character's values. *Fits content like:* a price reveal; a fine print clause; a gift that wasn't wanted.
- **Hardware as junk.** World-bending tech used for a small chore. *Fits content like:* a quantum computer used for a grocery list; a rocket to deliver a sandwich; a time machine to fix a typo.
- **Callback button.** The last line repeats the first so the story loops. *Fits content like:* a brand's catchphrase; a morning routine; a running complaint.

## 9. Pitfalls of the medium

- The voice generator reads hyphen stutters as words: write syllables ("buh, buh-broken"); respell words it mangles; pick names that survive a low voice.
- Speech-to-text checks mishear very short lines: read the review's "Heard:" list before rewriting a line that is fine.
- A real interruption: generate the interrupted line *longer* than needed and end its cue where the other voice cuts in.
- A springy overshoot swallows the actors: gentle back-ease.
- Food and liquids need cues (surface detail, drips, steam) or they read as other objects.
- A bright synthesized hit turns to harsh fizz at the top of the spectrum: band-pass the noise.
- A sustained boom below about 40 Hz is only rumble on a phone or a laptop: keep it short and pitch it an octave higher.
- A sound cut without its tail cut is not dead silence.
- A contact sheet samples every half second, so a cut can sit between two of its frames: judge cuts on a strip of consecutive frames.
- A filter that boils the product's screen too makes it unreadable: real screens sit outside the boil.

## 10. Building it here

- **Everything drawn is SVG**: paths with round joins and `vector-effect: non-scaling-stroke`, so the line keeps its weight in a close-up, as long as the camera zooms inside the SVG (a `<g>` transform or the `viewBox`): a CSS `transform` on a wrapper `div` scales the line with the drawing. Shadows are darker shapes inside a `clipPath`; glows are flat translucent circles, never `blur` or gradients.
- **Boil**: one SVG filter (`feTurbulence` with a fixed `seed` into `feDisplacementMap`) over the whole drawn layer; cycle the seed through three values from `Math.floor(frame / hold) % 3`.
- **Held drawings**: poses, mouths, blinks and jitter read `Math.floor(frame / hold) * hold`; the camera, the portal's spin and the wipes read `frame`. Jitter and scatter come from `noise(x, seed)`, never `Math.random`.
- **Mouths follow the voice**: `useAudioLevel(asset(VO.<id>.src), at)` gives the loudness that opens the mouth; captions and cuts use `VO.<id>.words`. Give each lead its own `voice` per line in `voiceover.json`.
- **The portal** opens with `prog(frame, start, 9, ease.back)`, not a bouncy spring; landings may use `springAt` with `SPRING.bouncy`, sampled on the held drawings. The swirl wipe is a rotating SVG mask or an animated `clip-path: circle(…)`.
- **Leave out** `Finish` (no grain, no vignette), `Backdrop` glow and the light sweep: `<SceneTrack sweeps={false} />`. `MaskRise` is not this style's entrance; titles pop. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **Per-format staging** with `useLayout()` and `p(vertical, horizontal)`; line weight is a fraction of the frame, not a pixel count.
- **Cuts and pauses live in `timeline.ts`**, timed from the voice lines, and `Soundtrack.tsx` cuts every sound dead on the frame a silence starts. `SoundCues` plays each cue to its end and `AudioBed` only fades at the film's two ends, so a sound that must stop (a room, a throb, an interrupted line) is your own `<Audio>` from `@remotion/media` inside a `<Sequence>` with `durationInFrames`.

## 11. In a product video

- **The brand's palette is one world**: the last one, where the chore is finally done ("the suspiciously normal world" suits it). The brand's main colour may instead be the glow, if the product is the device that moves between worlds; never both.
- **The real product is the screen they look at**: an over-the-shoulder shot onto a `Device` with a thick drawn frame, showing the real screenshot or screen recording clean, outside the boil; then an insert close-up of the one detail that matters.
- **The duo may joke, the product may not be misdescribed**: every claim a character makes about it, and every number on a screen, is in the video's `facts.md`. Illustrative data carries `<ExampleBadge />`.
- **Keep it kind and modest**: the leads are modestly dressed, the nervous one is never humiliated, and no one is the target of the joke but the oversized plan.
- **End card**: the callback line, then the logo on the last world's flat colour with one line on how to get it, the address typed as a terminal tag.
- **Arabic**: mirror the staging and put the speaker pill on the right; captions appear word by word, each word whole, with no letter-spacing, in a rounded heavy Arabic face (the kind of Baloo Bhaijaan 2). The terminal tag types whole words, not single letters.
- **9:16**: stacked singles instead of a wide two-shot; captions above the bottom 22%, the world tag below the top 12%, nothing important in the right 12%.

## 12. Variation space

You decide the premise, the cast, the worlds, the jokes, the opening, the ending, the camera path, the pacing and the palettes.

- Structures: **one world, many clocks** (the duo stays home and a device skips them through times of day, each time worse); **the job interview** (a panel interviews candidates from other worlds, each with its own room sound); **the tech-support call** (split screen between two worlds, one voice guiding the other through a disaster).
- Openings: **mid-disaster** (the portal is already open and something is coming through); **the instruction manual** (a terminal readout explains the device before we see anyone); **the wrong world** (we start in the absurd world and only later see home).
- Endings: **stuck elsewhere** (the device breaks and they settle in, happily); **the audience** (a creature from one world watches the whole film on a screen and rates it); **the cost** (a quiet final shot of what the errand cost, no joke).

---

Adapted for Halal Motion Videos from the `scifi-toon` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
