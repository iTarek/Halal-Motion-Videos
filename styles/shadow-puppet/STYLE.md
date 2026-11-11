# Shadow Puppetry

> Chinese shadow theatre as a craft: translucent dyed-hide puppets, carved like lace, pressed against a cotton screen and lit from behind by oil lamps.
> References (grammar only): Lotte Reiniger's silhouette films of the 1920s for profile acting and lace-like scenery; Shaanxi / Huayin shadow theatre for carving and colour. Never reproduce a specific historical puppet or recording, and never name them in the film.

## 1. Essence, and what it is not

A white cloth screen; behind it, flat puppets cut from **translucent dyed hide**, lit by an **oil lamp**. Colour arrives *by transmitted light*: dyes glow like coloured glass, carved holes shine brightest, overlaps go darker. Puppets are jointed with **visible thread rivets** and moved by **thin rods** (neck and hands) that show as soft grey lines just off the screen. It is live theatre, not stop-motion: the screen **flickers with the lamp**, puppets **tremble in the hand**, loose parts **swing on their rivets**.

What is taken here is the craft (hide, lamp, cloth, rods) and the way a storyteller holds a room. The tales are everyday ones: a journey, a harvest, a workshop, a fable with a lesson. Nothing supernatural and nothing devotional.

Not a black silhouette film (colour is the second protagonist), not paper-cut (the light comes *through*), not a leaded window (no lead lines; pieces move and overlap), not flat vector cut-out animation.

## 2. Materials & rendering

**Rendering model.** Everywhere on the cloth: `image = tonemap( lampLight × hideTransmission × clothTexture )`.
- `hideTransmission`: a layer that starts **white**; every piece is laid on it by multiplying. Holes stay white, overlaps darken by themselves.
- `lampLight`: per lamp a broad lobe plus a tight hotspot (about 6 : 1), each flickering independently (a few percent of slow value noise plus a faster sine). Warm light, never white.
- `tonemap`: a soft shoulder (`1 − exp(−light)`), with exposure falling as lamps are added, so more lamps bleach the frame but keep it readable. Lamp count is a dial the story can turn.
- **Cloth**: a woven texture (warped a little by noise), fibre speckle, low-frequency density blotches, darker edges at the frame. **Post**: warm-tinted bloom, a **warm vignette** (toward brown, never grey), slight saturation, soft S-curve, light grain; heat haze only when the story burns.

**Hide and carving.** Multiply a hide texture (mottling, fibres, specks) into each piece without filling its holes. **Carving is density**: leave thin strips, cut out most of the area. Cut vocabulary: crescent rows (scales, tiles), diamond lattice, coin holes (round hole, square of hide inside), cloud collars and scrolls, tapered slits (cracks, rain, fur), strata along a ridge, leaf holes in a canopy. A dark carved outline (about 0.15–0.2% of the frame height) on every region.

**Figures are jointed puppets**: 8–12 pieces, head about 1.2× natural with large headwear, long robes with sleeves in a different dye from the torso, round joint lobes with a rivet (dark ring + pale knot), arms solved from hand targets (two bones), held objects as separate pieces on the hand line. Sympathetic figures have *open-cut faces* (features as thin strips around a hole); antagonists solid faces.

**Scenery** is carved set pieces on mostly empty lit cloth: one lace piece per element, a narrow carved ground strip, separate liftable strips for water or sky. Fire, smoke and moving water are carved pieces on rods, swapped and shaken, never particles.

**Stage and backstage.** A lacquered frame (lintel, pillars, warm spill on its inner edges), optional blurred audience heads. Backstage = the same pieces seen mirrored, dark wood around, hanging lamps (a glowing flame; snuffed ones trailing dark smoke), hands and sleeves as **silhouettes with a warm rim** on the lamp side, rods sharp.

## 3. Colour logic

- All colour is **transmitted**: a dye filters warm lamplight, so nothing is brighter than the lamp and every hue leans warm.
- 3–5 saturated dyes + **raw hide** (the neutral) + **ink** (outlines, hair, boots). Holes are the brightest value.
- Overlap is darkness: plan which pieces cross.
- Brightness comes from the number of lamps, not grading. Night is fewer lamps, never added blue.
- Thin things that must read (strings, shafts, text) are dark: pale pieces vanish on a bright cloth.
- Example sets: *court* (vermilion, ochre, malachite); *river* (indigo, jade, one ochre); *harvest* (flame orange, gold, one green).

## 4. Type & on-screen text

- Narrated lines belong to the theatre: a **storyteller's placard** (narrow dark-lacquer board, thin gold line, small carved seal), a label on a rod, or letters carved into hide. A classical serif (the kind of Cormorant Garamond 600), about 4% of the frame height, cream on dark, with a short slide in. A brand's own serif can take its place; a light sans stays in the logo.
- **Titles are puppets**: dark hide plaques with the letters cut out so the words glow, a carved border, carried on rods, pressed on to enter, lifted off to exit.
- Carved letters need weight: thin strokes close up on a bright cloth. Keep every counter attached by a bridge of hide.

## 5. Motion quality

- **Puppets and camera move on every frame**; only swapped effect pieces (fire, water) step, each held 2–3 frames.
- **Hand tremor** on every puppet (about 0.3% of the frame, about 0.02 rad, low-frequency), stronger under tension.
- Body glides with the main rod; **legs, plumes, tassels swing** as damped pendulums and spring chains driven by the body's acceleration, computed the same way on every render.
- Stage phrasing: shuffling run → hop → crouch → **freeze pose on a hard clack** (about 1 s, only loose parts quiver) → head turn.
- Faces never change; attitude = head angle + body tilt (up = resolve, down = sorrow).
- **Press on / lift off**: arrivals come large and blurred onto the cloth and snap sharp (about 0.5 s); exits grow, blur and fade (about 1 s).
- A new lamp flares with overshoot; a snuffed lamp gutters with fast flicker.
- Never moves: the cloth, the frame. Nothing morphs: pieces rotate on rivets, slide on rods, or are swapped.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | Expresses | Can serve |
|---|---|---|
| Audience seat (whole stage, heads below) | "This is a show" | a fable; a lesson; a framed memory |
| Push through the frame onto the cloth | Entering the tale | a story within a story; focus |
| Lateral pan across a wide cloth | Extent, a place laid out | a journey; a flood's reach; a caravan |
| Follow a puppet, slight zoom | Being with one figure | a pursuit; a working day |
| **Crash zoom** of a few frames on a clack | The hit becomes the camera | an entrance; a pose; a reveal |
| Whip pan along a moving piece | Cause to effect | a message sent; a ball thrown |
| **Locked wide** | Every step of a change is seen | counting; repetition; stages |
| Medium-close, empty cloth between two pieces | Distance, hesitation | a choice; a parting |
| Close on a carved detail | Craft as meaning | a promise; a tool; a clue |
| Tilt from ground strip to top of cloth | Height, hierarchy | a tower; ground and sky |
| Truck round to the back (mirror view) | The trick revealed | behind the scenes; who pulls the strings |
| Pull back from cloth into the dark room | The tale becomes an object | aftermath; a story ending for the night |

Puppets in profile; most of the cloth stays empty. When zoomed in, clamp the camera to the screen rectangle (no black bars); push on frame centre unless diving into a lamp. In 9:16 the cloth turns tall: the tilt replaces the lateral pan, and scenery stacks as strips. Transitions: lamps dimming, a blurred foreground pillar wipe, a piece lifting off in light, a flash to warm white; never a generic crossfade or digital wipe.

## 7. Sound palette

- **Foley follows the materials**: the storyteller's hard wooden clack (two blocks struck together), a match strike, a lamp's "fwoomp" and its "pfft" and sizzle, rod taps on cloth, dry leather flaps on lift-off, leather steps, creaks of hide and wood props, leather thwacks, cloth rustle.
- **Three weights of hit**: a rod tap for a step, the hard wooden clack for a pose, one deep padded thud for the decisive moment. One hit per visual step in a locked wide.
- **What stays silent**: the glide of a puppet, the lamp's steady burn, the tremor. Sound belongs to contact: hide on cloth, wood on wood, flame.
- **Ambience bed**: backstage room tone, a faint lamp hiss and the hush of a seated audience, very quiet and never tonal.
- **Techniques, as options**: a single tap inside a silence; rod taps that quicken into an entrance; a low slow thud under tension; a metal scrape of the lamp hook to change space; a hard stop, tails included.
- **Silence**: hard-cut the whole bed before the main moment; at most one sound inside (a breath, a tap, a sizzle).
- **Sound across a cut**: the "fwoomp" of the next scene's lamp is heard before its light arrives, or the room tone runs on over the pull-back.
- **Voice**: a storyteller, few short lines, close and warm as in a small room.

## 8. Native moves

A menu: use the ones your story needs; put the strongest at the peak.

- **The light is the world.** Lamp count drives heat and colour. *Fits content like:* city lights spreading at night; a fever rising and falling; servers switching on one by one.
- **Off the screen = big and blurry.** A piece pulled toward the lamp grows and blurs. *Fits content like:* a rumour growing; a memory fading; a deadline pressing onto the cloth and snapping sharp.
- **Go behind the screen.** Lamp, hands, rods. *Fits content like:* how a product is really made; who controls a market; a teacher revealing the method.
- **Carved and translucent.** Holes glow, overlaps darken, open faces vs solid. *Fits content like:* an x-ray of a system; the honest and the dishonest in a fable; layers of a city.
- **Hand-held.** Tremor and swinging parts. *Fits content like:* a nervous interview; a tightrope; a toddler's first steps.
- **Piece swap.** One carved piece on a rod replaced by another. *Fits content like:* seasons; a machine's states; weather over a harvest.
- **Strip lift-off.** A band of scenery lifted to reveal another. *Fits content like:* geological layers; before/after a flood; an old town under a new one.

## 9. Pitfalls of the medium

- Flat clip-art look → hide texture, denser openwork, deeper dyes, carved outlines everywhere.
- Figures unreadable in profile → bigger head, fuller lower body, collar piece, contrasting sleeves.
- Radiating shapes read as saw blades or petals → flame tongues with a fat base, belly and hooked tip, alternating curl.
- Grey corners when overexposed → warm vignette.
- Thin pale pieces vanish → make them dark.
- The mirror view also flips carved words → keep plaques out of the backstage shot, or let them read backwards on purpose.
- Bright smoke is invisible on bright cloth → dark wisps, a warm glow only near a lamp.
- Push-in centred on an edge lamp shoves figures out → push on frame centre.
- Beds leaking into a silence → hard-cut them.
- Flicker on the whole frame at full strength tires the eye and hurts reading → a few percent only, and steadier while a placard is up.

## 10. Building it here

- **The cloth is a stack of blended layers**: a white layer in an `isolation: isolate` wrapper; every piece an SVG on it with `mix-blend-mode: multiply`; above it the lamps as warm `radial-gradient` layers (a broad lobe and a hotspot each), then the weave, both on `multiply` too, so light, hide and cloth multiply as in the model. The soft shoulder is a `brightness` and `contrast` filter whose values you compute from the number of lamps lit.
- **Carving is SVG**: holes are subpaths with `fill-rule: evenodd` or an SVG `<mask>`; the hide's mottling is `feTurbulence` (fixed `seed`) multiplied inside the piece; cut letters are text inside a mask.
- **Puppets are nested groups** rotating on their rivets (`transform-origin` at the joint). Tremor and lamp flicker come from `noise(frame · k, seed)`; pendulum parts are a damped sine driven by the rod's motion keys, so they are the same on every render.
- **Press on / lift off** is `filter: blur(…)` plus scale, eased with `prog(…, ease.out)`; a lamp's flare leans on `springAt` with `SPRING.bouncy`. Puppets themselves never spring: they glide with `ease.inOut`.
- **Backstage** is the same stage wrapper under `scaleX(-1)`, with a dark surround and rim-lit hand silhouettes on top. There is no 3D library: the truck round to the back is a pillar wipe or a quick squeeze through `rotateY` on one plane, not an orbit.
- **Bloom and finish**: a blurred copy of the cloth laid on with `mix-blend-mode: screen` and a warm tint; a brown radial vignette of your own. `Finish`'s vignette is neutral black: pass `vignette={0}` and keep only its grain, or leave it out; use `<SceneTrack sweeps={false} />`. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **Lamp counts, clacks and freezes live in `timeline.ts`**, and `Soundtrack.tsx` puts each tap and clack on the frame of its pose.

## 11. In a product video

- **The brand's colour is one of the dyes**: the hero's sleeves or the product's own piece. It will lean warm under lamplight; if the exact hue matters, show it true once on the end card. The warm lamp, raw hide and ink stay, whatever the brand palette.
- **The product is a carved piece on a rod**: a hide plaque with the device's outline, its screen cut out as one large hole, and the real screenshot or screen recording shown in that hole (a `Phone` behind the cloth layers, with the weave and flicker turned low so it stays readable). Going behind the screen suits "how it works".
- **Real numbers are carved or counted**: digits cut into a plaque, or coin holes lit one by one in a locked wide. Each is in the video's `facts.md`; illustrative data carries `<ExampleBadge />`.
- **Figures stay modest and kind**: long robes, faces that never change, antagonists that are a problem (a storm, a mess, a deadline) more often than a person.
- **End card**: a title plaque pressed onto the cloth with the logo cut out and glowing, one line on a placard below it, then the lamps dim.
- **Arabic**: the stage reads right to left: figures enter from the right and face left, placards slide in from the right. Words are cut and shown whole, never letter by letter, with no letter-spacing; a sturdy Thuluth-flavoured or Kufi face carves well, with bridges holding every enclosed space.
- **9:16**: a tall cloth, one figure large in the middle band, scenery stacked in strips; placards and plaques above the bottom 22% and clear of the top 12% and the right 12%. Audience heads may sit in the bottom band.

## 12. Variation space

You decide the story, the figures (or none), what the lamp means, what leaves the screen, the opening, the ending, the camera path, the dyes and the pacing.

- Structures: **a procession** (one long pan; each figure adds a dye until the cloth is a full street); **two puppeteers** (rival hands argue through their puppets; backstage shows who is winning); **a workshop** (a puppet is carved, dyed and riveted on the cloth, then performs its own making).
- Openings: **backstage first** (rim-lit hands and rods before the front); **one hole of light** (the screen all dark hide; one carved hole glows and widens); **mid-show** (the camera finds a performance already in full swing, clacks and all).
- Endings: **the lamp is carried away** (the cloth darkens from one side); **the puppets rest** (lifted off one by one, laid flat on a dim table); **the audience leaves** (the heads stand and go, the cloth still glowing).

---

Adapted for Halal Motion Videos from the `shadow-puppet` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
