# HD-2D

> Hand-made pixel sprites standing like paper cut-outs inside a lit, fogged miniature diorama, seen from a high three-quarter angle through a tilt-shift lens: a toy world where every lamp throws a shadow.
> References (grammar only): *Octopath Traveler* (Square Enix × Acquire, 2018) and its sequel (2023), the games that defined the HD-2D look. Learn the grammar: sprite-in-diorama, high 3/4 camera, tilt-shift focus band, point lights with shadows, heavy bloom and vignette, framed dialogue box. Never use their characters, places, logos, UI ornaments or sounds, and never name them in the film.
> Name: "HD-2D" is Square Enix's term (and trademark) for that look. It is borrowed here only to describe the style; this style has no connection to Square Enix and is not endorsed by it. Don't use "HD-2D" as a title or brand in a film.

## 1. Essence, and what it is not

A **miniature set** of boxes and cylinders wrapped in **pixel-art textures**, populated by **flat 2D pixel sprites that receive light and cast shadows**, seen from a **high, far camera** through a **tilt-shift band** so the world reads as a tabletop model. **Light is the subject**: practicals throw sprite shadows across the floor; shafts, fog, dust or rain hang in the air; strong bloom, heavy vignette. On top, a small **RPG UI**: chapter card, framed dialogue box with typewriter text, serif narration lines.

The key contrast: characters stay **flat, low-res and stepped** while camera, light, particles and focus move smoothly every frame.

Not a voxel game (no cubic characters), not a flat 2D pixel RPG (the set has depth and its light changes things), not a tilt-shift photo of a real miniature (textures are pixels, not materials).

## 2. Materials & rendering

- **Constant texel density**: every surface is drawn pixel by pixel at one density across the whole set, scaled up with hard edges (no smoothing); sprites on a similar scale (a character about 30–60 texels tall).
- **Colour from ramps**: 3–6 swatches picked by brightness through a narrow 4×4 Bayer dither. Sprites get a 1-texel *selout* outline (the neighbour colour darkened toward the ink).
- **Boxes and cylinders** for buildings, floors, rock; **flat cards that face the camera** for foliage, distant props, ridges. Windows are glowing pixel panes; fire is a pixel strip of a few drawings, about 10 a second; water is quantized ripples with columns of light running toward the camera.
- **Light rig per set**: one dim key that gives every sprite a base shadow, a soft overall fill, **practical lights** that each throw their own sprite shadows (lamps, fires, windows, screens), and a **front fill** on the hero (a flat sprite lit only from behind is a black hole). Every source carries a soft additive glow so the bloom has something to grab.
- **Lens**: a sharp horizontal band on the subject, blur growing above it (far) and below it (near); far blur never bleeds over a sharp foreground. Then bloom, vignette and a gentle grade. No film grain.

## 3. Colour logic

- **Two temperatures**: one large ambient key (cold, or pale, or dusty) against small warm or saturated practicals. The practicals carry the story; the ambient carries the mood.
- The darkest value is a warm ink, never pure black; the brightest is the light source itself, bloomed.
- Each set owns one fog colour and one light key, so a cut to a new place reads instantly.
- The hero wears the one saturated costume colour that no set uses, so the tiny sprite is findable in a wide.
- UI is one metal (gold, silver, copper) plus one paper white over a dark translucent plate.
- Examples: night canal town (blue fog, amber windows); autumn market at dusk (violet sky, pink paper lanterns); snowy mine at noon (grey-white daylight, green mineral glow).

## 4. Type & on-screen text

- An inscriptional capital serif (the kind of face Cinzel is, wide tracking in Latin script) for chapter labels and titles; an old-style serif (Cormorant, Cormorant Garamond italic) for narration, dialogue and taglines. The brand's own serif comes first if it has one; a brand sans stays in the logo and the end card.
- **Narration lines**: italic serif, about 4.5% of the frame height in 16:9 and 3% in 9:16, centred low on a soft dark gradient band, one line per voice line, each word appearing as it is spoken.
- **On-screen speech gets a dialogue box**, not a narration line: dark plate, thin metal border, corner ornaments, name plate on its top edge, text **typed over about 90% of the voice line**, blinking caret, soft chime on entry.
- Chapter cards and a title card belong to the grammar: small capitals, a thin metal rule, a slow fade on a dark plate.

## 5. Motion quality

- **Sprites step, everything else glides.** Walk cycles of 4 drawings, each held 3–5 frames; idles alternate two drawings every 15–30 frames; blinks every few seconds; pose changes are instant cuts between drawings. Camera, lights, particles, beams and focus update on every frame.
- **Poses are data**: a parameter object per drawing; a new pose is a new table entry.
- **Lights breathe**: every flame flickers (a few summed sines, about ±20%). A light's level is one value that drives the lit sprite drawing, the pool of light on the floor, the glow's opacity and its scale together.
- **Weather is procedural**: slanted rain streaks; lightning as a scripted flash curve (strike, dip, re-strike, decay) lifting sky, fill and exposure together.
- The world never shakes except for impact; the set never moves, only the camera and what lives in it.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic. Always look **down** on the world (never at eye level); every path is a smooth curve through a few keys with no overshoot; the focus band is recomputed every frame from the subject's position on screen.

| Move | Expresses | Can serve |
|---|---|---|
| Very high, very far, slow push; band on one tiny subject | Preciousness, a whole place as a map | where we are; scale; a landmark |
| Medium-high 3/4, near-static drift | Two figures on one stage | a conversation; a handover; a choice |
| Lateral tracking, camera leading slightly, foreground passing blurred | A path through a world | travel; a process with steps; a commute |
| Dive low and close while a figure kneels or stops | The toy world suddenly personal | exhaustion; care; a secret |
| Rising pull-back, focus handed from figure to object | The act spreads outward | consequence; a system switching on |
| Part-orbit round a building or prop | An object seen from more than one side | a workshop; a machine; a monument |
| Top-down, straight overhead, tilt band as a strip | A board game, a plan | routes; a schedule; a queue |
| Rack focus between two depths in a locked frame | Attention changing hands | a memory; someone watching; before/after |
| Return to an earlier framing, changed | The rhyme shows what changed | aftermath; growth; a season later |

Framing: characters about 1/12–1/8 of the frame height in 16:9 (1/16–1/10 in 9:16, where the diorama is seen as a tall slice with more floor in front and more sky behind); the sharp band follows the subject's height on screen (kept between 20% and 80% of the frame); with no character, use a fixed band height per shot. Transitions: short fades to black or cuts between sets; no wipes, no 3D spins.

## 7. Sound palette

- **Foley follows the diorama's matter**: footsteps per surface (wood, dirt, stone, snow), fire crackle, cloth, a UI chime for dialogue boxes and menus, small bells for things switching on, thunder after each flash, a deep boom with shimmer for a big ignition.
- **What gets a sound**: every light that turns on, every dialogue box, every step on its stepped drawing, every weather strike. Camera glides, fog, dust and flicker stay silent.
- **A family of three for lights**: a small bell tick for a window or a screen, a soft thump with shimmer for a lamp or a fire, and the one deep boom for the ignition the film builds to. The size of the sound matches the size of the pool of light.
- **An ambience bed per set**: night water, wind over a ridge, room tone, the hush of a market. Quiet, never tonal, crossfaded at each cut.
- **Lights popping on one by one** may step up in pitch and resolve on the last one: a short run of accents, never a tune.
- **Silence**: a hard stop, bed included, when the light nearly dies; a short breath (under a second) when something fails. The next light then sounds like an event.
- **Sound across a cut**: the next set's ambience opens a few frames before the picture cuts, or the thunder rolls on over it.
- **Voice**: a storybook narrator, slow and warm; a character who speaks in a dialogue box can take a second, smaller voice so it sits "in the world".

## 8. Native moves

A menu: use the ones your story needs.

- **Shadows jump when a light is lit.** A practical turns on next to sprites and their shadows swing across the floor. *Fits content like:* a shop opening at dawn; a server rack powering up; a teacher switching on a projector.
- **The carried light as a meter.** One small light a character carries is key light and gauge at once: its brightness rises and falls with whatever the story is measuring. *Fits content like:* a phone battery on a long trip; a patient's heart monitor; a student's desk lamp on exam night.
- **Tilt-shift preciousness.** An extra-wide with the band on one tiny subject. *Fits content like:* a single delivery van in a city; a newborn's room in a whole hospital; one stall in an evening market.
- **Lights popping on one by one.** Windows, lamps or boats light up at a steady cadence across the map. *Fits content like:* users joining a network; a village getting electricity; a town waking before dawn.
- **RPG grammar.** Chapter card, named character in a dialogue box, biomes, a landmark, a title card. *Fits content like:* onboarding a new employee; a history in eras; a recipe in stages.
- **Weather passes over the diorama.** Rain, snow or lightning sweeps the tabletop with the flash curve. *Fits content like:* a hard quarter for a business; a harvest threatened; a hard week at work.

## 9. Pitfalls of the medium

- **Checkerboard everywhere** → the dither band is too wide; keep it narrow on sprites and about twice as wide on textures.
- **A light burns out the sprite that holds it** → put the light slightly in front of the sprite, and cap how bright a sprite can get (a little above its own colours, never white).
- **A sprite lit only from behind goes black** → always the front fill.
- **Dark scenes unreadable** → lift the set's mid-tones to about double outside the one moment that must go dark.
- **Distant glows hidden by fog** → draw glows above the fog layers.
- **Pixels shimmer as the camera moves** → scale sprites and textures by whole numbers only; the smooth sub-pixel move belongs to the camera wrapper, never to the art.
- **Tilt-shift with no character to track** → fixed band height per shot. **One blur band laid over the finished frame** smears the far background across a sharp foreground → blur each depth layer by its own distance from the band.
- **A shadow that floats** → every shadow pivots at the sprite's feet and shares its stepped drawing.

## 10. Building it here

- **No 3D renderer and no 3D library: the diorama is 2.5D in CSS.** A wrapper with `perspective` is the lens; the floor is a plane tilted back with `rotateX`; buildings are boxes of pre-shaded pixel faces inside `transform-style: preserve-3d`; sprites and foliage are upright cards counter-rotated to face the camera. The camera is one transform on the wrapper, driven by `prog(frame, start, dur, ease.inOut)`.
- **Pixel art from code**: draw sprites and textures on small `<canvas>` elements (or SVG `rect` grids) from pose tables and ramps, then scale by whole numbers with `image-rendering: pixelated`. The Bayer dither is a 4×4 table; any variation comes from `noise(x, seed)`, never `Math.random`.
- **Light is faked, and one number drives it**: each practical has a level from 0 to 1 in the timeline. It sets a radial-gradient pool on the floor (`mix-blend-mode: screen`), a blurred glow card, a warm overlay on nearby faces, and each sprite's **shadow**: a darkened copy of the sprite (`filter: brightness(0)`, low opacity) laid on the floor with `transform-origin` at the feet, turned away from the light and stretched with distance. A light turning on is a change of that angle and length over a few frames.
- **Lens**: `filter: blur()` on each depth layer from its distance to the focus band (a `filter` flattens the 3D inside the element it sits on, so each depth layer is its own `perspective` wrapper with the same camera transform, blurred as a whole), plus blurred strips at the top and bottom edges (`backdrop-filter` under a `mask-image` gradient). Fog is a row of translucent gradient planes between the layers. Vignette from `<Finish grain={0} />`.
- **Stepping**: a sprite's drawing is `Math.floor(frame / 4) % 4`; flames and flicker are summed sines of the frame number.
- **Overrides the engine defaults**: no springs on camera or sprites, no grain, no light sweep at cuts (`<SceneTrack sweeps={false} />`), no `MaskRise` (text fades or types). The dialogue box is a plain `div` with a border and a typed string. A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **Leave out**: full orbits (pre-shaded faces hold up for about a third of a turn), shadows climbing walls, true reflections. A part-orbit, floor shadows and light columns on water are enough.
- **Timing lives in `timeline.ts`**: each light's on-frame is exported there, so `Soundtrack.tsx` lands its bell or boom on the same frame.

## 11. In a product video

- **This palette is the look**: fog, ink and warm practicals stay. The brand's colour is the **hero's costume** or the **one light the story turns on** (the glow of the product's screen, a sign over a shop), and the metal of the UI can lean toward it.
- **The real product is a lit screen in the world**: a pixel phone, kiosk or shop window whose glow lights the sprites around it. For the feature itself, dive in and let a real screenshot or screen recording fill the frame inside a dialogue-box-style plate (`Phone` for a screenshot, `Device` with `float={0}` and no `moves` for a recording), then pull back to the diorama.
- **Real numbers and claims only**, each in `facts.md`: a count can be windows lighting up one by one, a claim can be a line in a dialogue box. Illustrative figures carry `<ExampleBadge />`.
- **Characters** are small, modestly dressed pixel people; their gags are kind.
- **End card**: a title card on the dark plate, the logo in place of the game title, one line on how to get it where "press start" would sit, and one lamp still flickering behind.
- **Arabic**: dialogue box and name plate mirrored (name plate on the right, caret on the left of the line); text is typed **word by word**, never letter by letter, with no letter-spacing; a Naskh face for narration and dialogue, a Kufi or Thuluth-like display face for chapter cards. Lateral tracking shots run right to left.
- **9:16**: stack the diorama deep instead of wide; narration and dialogue box sit above the bottom 22%, chapter cards below the top 12%, and nothing important hugs the right 12%.

## 12. Variation space

You decide the places, the characters, the light the story turns on, the chapters, the opening, the ending, the camera path and the key temperature.

- Structures: **a day-cycle map** (one set, dawn to night, each hour lit by different practicals as the town's routine unfolds); **a party of three** (three short chapters, each character's biome and light, converging in one room); **a menu of places** (a top-down overworld; the camera dives into one location per topic point and pulls back to the map between).
- Openings: **in the middle of the room** (a dialogue box already typing over a close 3/4 shot); **overhead map** (straight top-down, the band as a strip, then tilt down into the 3/4 view); **daylight** (a bright noon wide with no practicals at all, so the first lamp later is an event).
- Endings: **a save point** (the hero rests at a small glowing object, the UI shows a save line, fade); **the band narrows** (the sharp strip thins onto one sprite until everything else is blur); **the party leaves frame** (a locked wide holds after the characters walk out; only ambience and flicker remain).

---

Adapted for Halal Motion Videos from the `hd-2d` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
