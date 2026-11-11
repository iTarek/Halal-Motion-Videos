# 80s Cel Anime

> Hand-painted cel animation from the golden age of Japanese OVAs, re-created in code: flat two-tone cels over airbrushed backgrounds, backlit neon, limited-animation timing, played back as a late-80s videotape on a CRT television.
> References (grammar only): 1980s Japanese OVA and TV cel animation in general (painted-background vs flat-cel contrast, backlit light, held drawings, speed grammar, chrome title cards). Borrow the era's craft, never a specific work's characters, mecha, logos, place names or signature shots.

## 1. Essence, and what it is not

Four layers, and the contrast between them is the look:
- **Background painting**: soft airbrushed gradients, glowing windows, wet reflections; painted once (a colour plate and a matching glow plate), then only slid.
- **Cel** (characters, vehicles, props): flat fills, **hard-edged** shadow and highlight shapes, **coloured** outlines, never pure black; stepped, not smooth.
- **Light**: backlit cel (the *tōkakō* effect): signs, lamps, title letters glowing *through* the frame; flares, halation.
- **Playback**: videotape on a CRT: chroma bleed, scanlines, grille, phosphor glow, darkened corners, faint noise.

If a frame looks like modern digital anime, one layer is missing. Not moe anime (round eyes, giant irises, hatched blush), not vector clip-art (uniform black lines, gradients in shapes), not a film-print pastiche (no gate weave or scratches: this is tape).

## 2. Materials & rendering

**Cel rendering.** Fill, then a **hard** shadow crescent, then a **hard** highlight crescent, then the coloured outline. No gradients inside a cel shape (exception: one fully painted still at a peak). Automatic shading: the shadow is *the shape minus the same shape shifted toward the light*; the same construction shifted away gives the highlight and a saturated neon **rim light** (thin: a few pixels). Add hand-placed cast shadows. Outlines about 0.25% of the frame height, thinner (0.45–0.8×) in extreme close-ups. **Colour models per lighting**: define each character in daylight, derive other sets by multiplying lit, shadow and line colours separately, plus a backlit silhouette set with a warm rim.

**People the 80s way.** Construct the head (sphere + jaw): long egg-shaped face, soft-point chin, far eye foreshortened with a cheekbone turn in three-quarter view. **Almond** eyes near the vertical middle of the head, a thick upper lash line flicking outward, a tall oval layered iris, two highlights, long thin brows. Nose = a shadow plane + one stroke; one faint blush layer, never hatched. Hair in overlapping locks with sharp uneven tips over a wider dark under-layer, a continuous ring highlight with a zigzag lower edge; a headscarf, cap or helmet is drawn with the same hard two-tone folds. Clothing is modest and of the era: jackets, coats, uniforms, long sleeves. Lines: skin thin warm dark brown, hair dark purple; only hard props near-black. Emotion lives in brows, lid height, iris size, mouth corners and shoulders. Build and approve a **model sheet** first; draw every shot from the same head construction.

**Backgrounds.** Painted once: sky gradients, airbrushed clouds with lit undersides, buildings or landscape with painted light sources, and always a matching **glow plate** that slides with the colour plate. Wet ground = a flipped, blurred, streaked copy of the plate, darkened, with ripple bands. Generic sign words only, never brands. Moving plates get a light horizontal smear against strobing.

**Light and lens.** Bloom strongly from the glow plate, weakly from the brightest parts of the colour layers; tint the widest bloom red-orange (halation). Flares: star-burst, anamorphic streak, hexagonal flare spots through frame centre. Stamp every cel's silhouette in black onto the glow layer so glow never bleeds through it.

**Videotape + CRT, restrained and deterministic:** chroma bleed (sharp brightness, colour blurred sideways and slightly shifted), fine scanlines whose gap shrinks on brights, a faint RGB grille, phosphor glow, darkened corners without curved borders, faint signal noise. On-screen text sits inside this pass, after the grade. Two optional accents: a **power-on** (dot → line → picture) and **tracking noise** (a few frames of tearing, a rolling band, a vertical hop). Check scanline moiré at phone size. Frame: full bleed like a theatrical feature; a 4:3 picture inside 16:9 is valid for an OVA feel.

## 3. Colour logic

- Painted plates carry gradients and atmosphere; cels are flat, few-colour, saturated. Each time of day gets its own colour model, never a filter over the frame.
- The protagonist has **one accent colour** that pops in every lighting set. Line colours are dark versions of their fill.
- Skin gets its own colour in every set; multiplying daylight skin by a tint turns faces pink under neon.
- Examples: night city (indigo, violet, neon magenta, cyan, window gold); seaside noon (cobalt, white cumulus, sand, coral); classroom dusk (amber, chalk green, brown wood, purple shadows).

## 4. Type & on-screen text

- **Narrated lines live on the tape**, inside the CRT pass: a semi-condensed semibold sans (the kind Barlow Semi Condensed is), cream-yellow with a thick dark outline and a soft shadow, low in the frame; each line appears with the voice and yields to the next. A second speaker may take a second colour and a small boxed tag. A brand's own sans can take this role if it holds up under the outline.
- **Titles**: heavy italic letters in a **chrome gradient** (sky → white horizon line → violet → pink → gold), dark + neon outlines, glowing through the glow layer, flickering on in stepped frames with a light sweep and a star glint. The chrome title is the style's own treatment and is applied to whatever heavy face is used.

## 5. Motion quality

- **Characters step**: hold each drawing 2–3 frames (about 12 a second); acting details (blinks, eye openings, lip flaps, gestures) hold 4 frames (about 8 a second). Camera, light sweeps, flares and rain move on every frame; a stepped camera judders.
- **Cycles**: hair and cloth as ribbons driven by a travelling sine, a 4-drawing cycle (6 when calm); bounce = a stepped jitter of a few pixels.
- **Move light, not drawings**: coloured bands sweeping across a held cel, clipped to its shape.
- **Impact frames**: 2–3 frames of an inverted or monochrome silhouette over radial lines, then the result.
- **Hold the peak**: a painted still with a slow pan, only cycles moving.
- Fast blinks (one closed drawing); eye openings in three drawings; lip flaps of 3–4 shapes ending on a held expression.
- **One pulse**: pick a unit in frames; cuts, impact frames and title flickers land on it.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Multiplane crane over a tall plate | a world revealed layer by layer | arriving; descending into a place; rising above it |
| Side tracking, 3–4 parallax layers | steady momentum | a journey; a pursuit of a deadline; progress |
| Rear view into a pseudo-3D canyon | speed, pressure ahead | a race; a tunnel; a countdown |
| Held bust with light bands | speed or tension without animation | a drive; waiting; a decision |
| Insert with bokeh and a sliding highlight | this object matters | a letter; a key; a ticket |
| Extreme close-up on eyes | resolve, recognition | a choice; a promise |
| Slow pan across a painted still | awe, a held breath | a peak; a memory; a landscape |
| Radial speed lines + a one-pulse freeze | the instant before impact | a leap; a collision; a goal |
| Truck-in through a window or screen | entering another world | a flashback; a broadcast; a daydream |
| Locked two-shot with lip flaps | conversation | banter; an apology; an argument |
| An earlier composition repainted | what changed | after a storm; years later |

Cut on the pulse. Framing: cels readable against the painted plate; keep the lowest ninth of the frame clear for narrated lines. Transitions: cuts, white flashes, impact frames, tracking noise at a tape-related moment; no digital dissolves or wipes.

## 7. Sound palette

- **Synthesised foley of the era's scenes**: engines following a rev curve, rain, tyre hiss, wind, radio squelch, impacts, sparks, cassette clicks, crowd murmur, door buzzers, footsteps on wet pavement. The tape has its own sounds too: a thunk on power-on, a whine and a burst of hiss on tracking noise.
- **Weights**: a cassette click or a footstep is light, a door or a pass of speed lines medium, and the hit under an impact frame the heavy one; spend it once or twice.
- **What stays silent**: held drawings, cycles of hair and cloth, slow pans across a painted still. Light sweeps get a soft airy pass at most.
- **Ambience bed**: the scene's weather and place (rain, wind, a city's distant hum) with a trace of tape hiss; never pitched.
- **Silence**: one pulse of true silence before the peak; the impact comes out of it.
- **Sound across a cut**: the engine or rain of the next scene starts before the cut; a voice from a radio or a tape begins thin and boxed in one shot and opens to full in the next, as we enter its world.
- **Tonal accents**: a bright bell-like sparkle on the title's star glint, a two-tone station chime before a broadcast. Never a tune.
- **Voice**: the feel of a dubbed anime: clear, a little theatrical, short lines. A second voice (a phone, a radio) is marked by a squelch at each end and its own caption colour.

## 8. Native moves

A menu: use the ones your story needs.

- **Small flat hero in a huge painted world.** *Fits content like:* a first day in a big company; a child in a museum hall; a lone researcher at an observatory.
- **Stillness as drama** (held close-up or painted still). *Fits content like:* an exam result; a goodbye at a gate; an unveiling.
- **Backlit light.** *Fits content like:* a street of lit shop signs; a screen full of code; a lighthouse; a control room at night.
- **Speed grammar** (speed lines, looping plates, impact frames). *Fits content like:* a sprint final; a data packet crossing the world; a kitchen rush.
- **Light-band sweep on a held cel.** *Fits content like:* a night train; a scanner reading a page; a heartbeat quickening.
- **A broadcast as an object** (a tape, a radio or a phone line carries a voice into the scene, and the sound opens up as we enter it). *Fits content like:* a family's recorded message; a call-in show; a weather bulletin.
- **Tape artefacts as punctuation.** *Fits content like:* found home video; a rewind to the past; an interrupted broadcast.
- **Colour-model change** (one place, another hour). *Fits content like:* a day in a shop; a farm's seasons; before/after a renovation.

## 9. Pitfalls of the medium

- White cels bloom pink → bloom from the glow layer; only a weak bloom from the very brightest colour.
- Neon bleeds through characters → silhouettes stamped in black into the glow layer.
- Thick rim light swallows thin shapes → keep the offset to a few pixels.
- Hair like tentacles, a face like a paper mask, moe eyes, uniform black lines → the drawing rules in §2.
- Pink faces under coloured light → skin gets its own colour per set; weaker light sweeps on faces.
- Front views are the hardest drawing → hide them behind a visor, a windscreen or backlight when you can.
- Pseudo-3D points behind the camera flip into the sky → stop every point at the near plane.
- A title set before its font has loaded falls back to a serif → load every weight through the brand's `fonts.ts`.
- CRT detail at full strength crawls on a phone and smears after compression → keep scanlines, grille and noise faint, and check the phone review sheets.

## 10. Building it here

- **Four React layers, bottom to top**: the painted plate (CSS and SVG gradients, blurred shapes for airbrush, or a prepared image), the cels (SVG paths), the glow layer (the glow plate, lit signs and title letters, with every cel's silhouette drawn over it in black), then the playback pass. No 3D library and no shaders.
- **Cel shading in SVG**: the shadow is the shape filled with the shadow colour through a `<mask>` that is white on the shape and black on the shifted copy; rim light and highlight the same way. A light band is a `div` clipped to the cel (`clip-path` or `<clipPath>`) in `mix-blend-mode: screen`.
- **Bloom and halation**: two or three copies of the glow layer with growing `filter: blur(…)` in `mix-blend-mode: screen`, the widest tinted red-orange.
- **Tape and CRT**: chroma bleed is a copy of the picture blurred sideways (an SVG `feGaussianBlur` with `stdDeviation="6 0"`; CSS `blur()` spreads both ways) and laid back in `mix-blend-mode: color`; scanlines and grille are `repeating-linear-gradient` overlays; corners a `radial-gradient`; noise `feTurbulence` with its seed from the frame. Power-on is `scaleX` / `scaleY` on the picture; tracking noise is `clip-path` strips shifted sideways for a few frames.
- **Stepping**: cels read `Math.floor(frame * 12 / fps)` (or `* 8` for acting details); the camera reads the true frame with `prog` and `ease.inOut`. Ribbons and jitter use sines and `noise(step, seed)`.
- **Depth without 3D**: multiplane is three or four layers with different parallax factors; the canyon is strips scaled by `1 / z` in plain arithmetic, or planes under a CSS `perspective`. Wet ground is the plate with `scaleY(-1)`, blurred and darkened.
- **Overrides**: no springs, no `MaskRise`, no `SceneFrame` depth entries, `<SceneTrack sweeps={false} />` (the only sweeps are painted light), no `Finish` (the tape supplies noise and dark corners). A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **The pulse lives in `timeline.ts`**; `Soundtrack.tsx` lands impacts, clicks and the title's sparkle on the same frames.

## 11. In a product video

- **The brand's colour is the protagonist's one accent**: a jacket, a vehicle, the glow of the device in their hand. It must pop in every lighting set. The painted palettes of each hour stay; they are the look.
- **The product is the object that matters.** Use the insert (a hand holding a cel-drawn phone, a highlight sliding across it) with the real screenshot on its screen, placed in the glow layer so it shines like a backlit cel. Then **truck in through the screen**: the real screen recording fills the frame, still under a light tape pass, with chroma bleed turned down so its text stays crisp.
- **Real numbers and names only** on signs, name cards and screens when they are claims; each one is in `facts.md`. Sample data on the product's screen carries `<ExampleBadge />`.
- **End card**: a title card of the era: the logo glowing through the frame with a light sweep and a star glint, and one line in the narrated-line style on how to get the product.
- **Arabic**: titles in a heavy Arabic display face with the same chrome gradient and outlines, upright (no italic), flickering on as whole words, never letter by letter and with no letter-spacing; narrated lines in a sturdy Arabic sans under the same outline. Side tracking and speed lines run right to left; the speaker tag sits on the right.
- **9:16**: tall plates and cranes suit it; favour busts, eye close-ups and the rear-view canyon over wide side tracking. Narrated lines sit above the bottom 22%, titles in the middle band, nothing important in the top 12% or the right 12%.

## 12. Variation space

You decide the structure, the characters, the world, the opening, the ending, the camera path, the pacing and the colour models.

- Structures: **slice of life in four seasons** (one place, four colour models, a small change each time); **two-hander dialogue** (a locked two-shot comedy that breaks into one imagined sequence); **the mock opening credits** (a character roster introduced one by one, each with a pose and a name card).
- Openings: **in the middle of a conversation** (lip flaps already moving, no establishing shot); **a TV being switched on** to an in-world broadcast; **a close-up of a drawing hand** in a classroom, then cut to the world it draws.
- Endings: **a freeze-frame** on a laugh with a "to be continued" card; **the tape runs out** into blue screen; **a slow pan up to a starry sky** from a quiet rooftop, no dialogue.

---

Adapted for Halal Motion Videos from the `cel-anime-80s` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
