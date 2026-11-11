# Exploded Teardown

> A real product, built from its own files (drawings, board layouts, parts list, real screens), lit like a studio packshot and taken apart in front of the camera: the layers lift on one axis, the camera travels between them, every part is named with the numbers its files contain, and it closes again into one object.
> References (grammar only): hardware-launch exploded films (layer stagger, orbit timing), repair-guide teardowns (opening order, the macro on the part that matters), engineering drawing (leaders, dimension lines). Never copy their products, layouts or typefaces, or name them in the film.

## 1. Essence, and what it is not

A frame reads as this style when:

- **the object is real and exact**: shapes, positions and counts come from the product's own files (drawings, layout plots, parts list, assembly guide, real screens). Nothing is eyeballed that a file can give;
- **it is shown apart**: layers float on one axis with even, readable gaps, each still oriented as it sits in the product;
- **it looks photographed, not drawn**: materials with their own sheen, a studio key light, a cool rim, a soft contact shadow on an invisible floor;
- **the numbers live on the object**: thin leader lines from a dot on the part, dimension lines with ticks drawn in the scene's own perspective, never a table beside it;
- **the camera never stops travelling**: one or a few continuous moves, orbit outside, macro inside.

It is not a glass product render (one object, material beauty, no disassembly), not a blueprint (line drawing on a grid, no light), not a keynote (slides, headline type, a stage), not an assembly manual (step numbers, arrows, hands).

## 2. Materials & rendering

- **A stack of pre-lit layers in perspective.** Each layer of the product is a flat, exact face (a drawing, a layout plot, a flat photograph) with its light painted in, standing at its own height on the one axis. Ambient darkening where layers sit close, a depth of field that grows as the camera comes close, a glow for emitters only, a vignette.
- Each material keeps its character: plastics with soft sheen, boards with a thin clear coat and traces as a slightly raised, lighter relief under the mask, metallic pads, tight highlights on machined metal, matte rubber.
- **Boards are painted from their layout files**: copper pours, every trace, via, pad and drill, silkscreen, on both sides, at a resolution that survives the macro. Components stand at their footprint positions with their package sizes.
- Light: a warm key from above front, a cool rim behind that follows the camera so edges separate from the ground, a soft top light; a practical fill only where the camera goes inside.
- Background: a dark graphite seamless sweep (a radial gradient), floor visible only as soft shadow.
- Leaders, dimension lines and glows are anchored to points on the parts and follow them on every frame; only narrated lines and title cards live in screen space.

**Where the shapes come from.** For the user's own product, ask for its exports before anything else: a flat drawing or plot of every layer (plates, case halves, both sides of each board), the parts list and the spec sheet. For software, the real screens and the layers they are made of. For a public product, look for open hardware with its original files and component datasheets from the maker. CC0, public domain, CC BY and MIT are fine with credit; CERN-OHL (-P, -W, -S), CC BY-SA, GPL hardware and "no known restrictions" are not the same thing: name the terms to the user and ask before using them. Without files, build only from published dimensions (datasheet, spec page), say on screen or in the voice that it is a model, and show no number you could not source. Never stand in a generated image for the real part.

Every claim goes in the video's `facts.md`: the claim, its source address and quoted wording, or the measurement method for anything measured from a drawing.

## 3. Colour logic

- The product brings its own colours; the frame around it is neutral and dark, so the product is always the brightest, most saturated thing.
- Interface ink is one warm white at two strengths (names at full, specs at about 60%), plus **one accent** reserved for measured things: dimension lines, label indices and one matching detail on the product itself.
- Values are ordered: ground darkest, product mid to light, labels lightest. Never put text on a busy, bright part without a dark backing.
- Example: ground `#34363a` → `#0d0e10`, ink `#f1efe9`, accent `#ff6b3d`.

## 4. Type & on-screen text

- Names: a clean sans at medium weight in the film's script (about 3% of the frame height); the brand's own sans comes first. Specs and numbers: a monospaced face (the kind of JetBrains Mono, never below about 2% of the frame height) so digits line up and read as measurement. A neutral grotesque (the kind of Inter) for running text.
- Label structure is fixed: a two-digit index in the accent, the name, one spec line. Units always written (mm, MB, ×n for counts). A label carries at most one fact the voice does not say.
- Dimension text sits on a small dark plate, follows the line's angle and is never upside down.
- Narrated lines: a centred strip low in the frame with a soft shadow and no box, its words timed to the voice-over. Every label stays fully in frame, and still, for as long as it takes to read.

## 5. Motion quality

- Smooth on every frame, and the same on every render: nothing random.
- **Separation**: smooth start, fast middle, long settle (an ease-in-out, cubed); layers leave top first, 0.15–0.2 s apart; repeated parts (keys, screws) fan out in a wave ordered by distance from a corner.
- **Closing**: bottom first, quicker (about 1 s per layer), the last layer lands with a real mechanical response (a key travels its stroke and returns; nothing bounces like rubber unless it is rubber).
- While held apart, layers may float a millimetre or two with offset phases; during macro shots they hold perfectly still.
- Labels draw in (anchor dot, leader growing, text sliding a short way) and fade out before the parts move again.
- Never moves: the floor, the light rig's relation to the camera, the label column's position across the frame.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| Orbit while layers separate | the whole, its order of assembly | a reveal; a structure overview |
| Grazing macro dolly | touch, material, finish | an opening; a texture |
| Dive between layers | being inside | a hidden component; how it works |
| Slow push on one still part | the part that matters | a chip, a sensor, a seal |
| Rise through the stack | one subsystem to the next | a transition between stops |
| Fast pull back | return, synthesis | a closing; a before/after |
| High three-quarter drift | scale and precision | sizes, pitch, thickness |

- At key moments the subject fills at least a third of the frame height. Labels live in a column on the free side (shift the object's vanishing point rather than moving the object), narrated lines low in the frame.
- In 9:16 the lift axis runs up the frame and the stack fills it; labels sit beside or under each layer in turn instead of in one side column, and the rise through the stack becomes the main move.
- Transitions are camera moves through the object itself. No cuts to black, no slide transitions, no split screens.
- The camera path is keyed in the product's own coordinates and interpolated without overshoot, so a held macro really holds.

## 7. Sound palette

- **Foley is the material**: hollow plastic clacks for keycaps or housings, a switch click with a low thock, dry taps for boards, inharmonic rings for small machined metal, a soft thud for the enclosure, airy swooshes for layers lifting and for camera dives, a fine pen hiss when a dimension line draws, a tiny tick per label.
- **Every separation and every landing has its sound**, placed left or right to match where the part is. Weight follows mass: a tick for a screw, a clack for a plate, the thud for the enclosure closing.
- **What stays silent**: the orbit, floating layers, a held macro.
- **Dry outside, airy inside**: sounds are close and dry while the camera is outside the object, and gain a little space once it is between the layers.
- **Ambience bed**: studio room tone only, very quiet and never tonal.
- **Silence**: at least two near-silences (room tone only), before the big separation and before the turn back; the first sound after each is the most important hit around it.
- **Sound across a move**: the swoosh of a dive starts a few frames before the camera does, and the inside's air hangs on over the pull back.
- **Voice**: calm, close, unhurried, short sentences; numbers spoken as words, written as digits.

## 8. Native moves

- **The wave lift.** Repeated parts rise in a wave across the object. *Fits content like:* battery cells; solar tiles; the drawers of a modular shelf.
- **Inside the gap.** The camera enters the space between two lifted layers to see a hidden face. *Fits content like:* the back of a logic board; the inside of a drone arm; the underside of a sensor module.
- **The leader that lands on the part.** A macro label whose line ends on the component. *Fits content like:* a pressure sensor in a shoe; a gasket in a waterproof case; a motor driver.
- **Dimensions drawn on the thing.** After closing, the real outline gets dimension lines in perspective. *Fits content like:* the thickness of a laptop lid; the footprint of a router; the bore of a valve.
- **One real motion.** A part performs its true mechanical motion once (a press, a hinge, a latch). *Fits content like:* a camera shutter; a buckle; a folding hinge.
- **Lights on inside.** Emitters inside the product switch on while it is apart. *Fits content like:* status LEDs; a backlit display; an indicator ring.

## 9. Pitfalls of the medium

- **Invented numbers.** A size that no file gives. Fix: measure it from the drawing and say "measured" in `facts.md`, or leave it out.
- **Mixed-up revisions.** Plates, cases and boards from different versions of a project. Fix: check hole positions and stack heights across the files (they must coincide), and note the revision.
- **Panelised boards.** Layout files may hold a panel with breakaway tabs. Fix: take the outline from a plate or case of the same revision.
- **Paper-thin layers.** A flat face seen nearly edge-on vanishes. Fix: give every layer a drawn thickness, and keep the orbit inside the arc where each one shows its face.
- **Sticker components.** Parts painted flat on a board look printed in a grazing macro. Fix: lift tall parts onto their own small plane with a shadow.
- **Overshooting camera.** A springy or loose curve flies past a macro stop. Fix: eases that never overshoot, keyed per axis.
- **Labels too short.** Macro stops last about three seconds. Fix: one fact per label, opened before the camera settles.
- **Over-bright light sweeps.** A sweep that blows plastics to white. Fix: sweeps at a fraction of the key; only emitters glow.
- **Brand marks on parts.** Chip tops and connector shells carry trademarks. Fix: in drawn layers, plain package tops and no logo footprints unless the product is the user's own; in a photograph, what is printed on a part stays as it is.
- **Crushed blacks.** Black plastics against a black ground disappear. Fix: lift them to a dark grey and let the rim light separate them.

## 10. Building it here

- **A CSS 3D stack, not a 3D scene.** There is no 3D library and no physically based rendering here. Put `perspective` on a stage and `transform-style: preserve-3d` on the stack; each layer is a plane at `translateZ(index × gap × explode)`; tilt the stack to a three-quarter view and orbit by animating its rotation within about ±35°.
- **Layers are SVG or flat images from the product's files** (nothing here opens CAD or board-layout formats: ask for each layer exported as SVG or PNG), pre-shaded: a soft gradient for the key, a light top edge for the rim, a darker offset copy (or a few stacked copies) for thickness. The contact shadow is a blurred dark ellipse on a floor plane.
- **Depth of field is blur bands**: `filter: blur(…)` per layer from its distance to the layer in focus, stronger as the camera comes close. Emitters glow through a blurred, screened copy of themselves.
- **Labels and dimensions**: dimension lines are SVG inside the layer's own plane, so they inherit its perspective; leaders are one flat SVG overlay whose anchor points come from your own `project(x, y, z)` function, the same one that places the stack.
- **Motion**: `prog` with a cubed ease-in-out for every lift, staggered from `timeline.ts`; the camera uses `ease.inOut` and never a spring. `springAt` with `SPRING.snappy` is kept for the one real mechanical landing. Float phases come from `noise(i, seed)`.
- **Leave out** full orbits round the back, true reflections and long flights inside the object: a dive is a short push between two planes with the near one blurred.
- **Engine parts**: the graphite sweep is your own `radial-gradient` (`Backdrop` glows in the theme's accent, which this style keeps for measured things), `Finish` for vignette and light grain, `<SceneTrack sweeps={false} />`, `isolateNumbers` around every dimension and range, `ExampleBadge` for anything illustrative. For software, `Device` holds the real screen (`float={0}`, so it holds as still as the other layers) and its layers lift off above it. It is one take: no `SceneFrame` entry or exit, and if the take is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.
- **Lifts, stops and labels live in `timeline.ts`**, and `Soundtrack.tsx` puts each clack and thud on the frame its layer leaves or lands.

## 11. In a product video

- **The product's own colours are the picture**; the frame stays graphite and warm white. The brand's colour is the one accent for measured things, if it reads on the dark ground; otherwise keep it on the product and the end card.
- **A physical product** is built from the user's uploads: layer drawings, layout plots and flat photographs of each part. Ask for them first.
- **A software product is taken apart the same way**: the real screenshot or screen recording sits in a `Device`, then its true layers (background, list, card, sheet, keyboard) lift off on one axis and are labelled with what each one does.
- **Only real numbers**: each from a file, a spec page or a measurement, listed with its source in `facts.md`. A model built from published dimensions says so. Illustrative values carry `<ExampleBadge />`; no real customer data on any screen.
- **End card**: the product closed, its dimensions drawn on it, then the name, the logo and one line on how to get it.
- **Arabic**: the label column moves to the other side and each label reads right to left (index, name, spec); names in a clean medium-weight Arabic sans, shown whole with no letter-spacing; specs keep monospaced Western digits with their units.
- **9:16**: the stack rises up the frame; one label at a time; everything to read stays clear of the top 12%, the bottom 22% and the right 12%.

## 12. Variation space

Decided per film: which product and revision, which layers to separate and in what order, how many stops inside and which parts deserve them, the camera route, whether to open from the whole or from a detail, the product's palette and the accent, the voice.

- **Three structures**: one orbit with two stops; a "how it works" path following a signal or flow through the layers; two revisions taken apart side by side, each held still before a difference is named.
- **Three openings**: a part performing its real motion in macro; the closed product turning in silence on the seamless; a single component floating alone before the rest of the product assembles around it.
- **Three endings**: closed with its dimensions drawn on it; closing into a top view that becomes a technical drawing; apart one last time, frozen, every part labelled like a printable sheet.

---

Adapted for Halal Motion Videos from the `teardown` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
