# Printed Long Take

> A deep landscape rendered as a scratchboard print, ink and paper with one red, crossed by one unbroken camera move. Depth, weather and light are all cut lines; the camera travels through the print instead of the print being turned page by page.
> References (grammar only): wood engraving and scratchboard illustration (tone made by the width of parallel cuts), Japanese shin-hanga landscapes (layered planes of mountain, forest, water), and the single-take tracking shot of documentary nature films (a move that never cuts). Take the cut line, the layering and the unbroken move; never copy a print, an illustrator's figures or a film's route.

## 1. Essence, and what it is not

- **Only ink, paper and one red.** Every value is either ink or paper; grey exists only as a density of lines. One red is reserved for one small subject. A warm yellow may appear for the sun, a lamp or one material, never as a second accent.
- **Tone is cut, not shaded.** Shadow sides of hills carry knife lines that run down the fall line; skies are parallel horizontal cuts whose width makes the light; snow is paper with a few drift strokes; water is ink with cut ripples.
- **Real depth, flat marks.** The scene has depth (terrain, rivers, bands of trees, buildings), but every surface is drawn with flat marks fixed to its own layer, so the layers slide past each other like a printed diorama.
- **At least three layers in every held frame:** sky / a mountain or forest band / a middle ground of fields, water or snow / a foreground of branches, fences or posts. Ink and paper roughly half and half. A pass through steam or a structure is exempt for its half second; an opening inside one material (a cloud, the dark) finds its layers in that material (near wisps rushing past, the body, a gap to what lies beyond) within about a second.
- **One continuous move** carries the story; cuts are rare and designed.

Not woodcut (flat printed blocks, a mostly static camera, one block per image). Not ukiyo-e (flat colour fields, no depth travel). Not a toon-shaded game world (no smooth shading, no gradients, no specular). Not a pencil sketch (no hatching that follows form loosely; every line is a knife cut with a blunt entry and a tapered exit).

## 2. Materials & rendering

- **Render model:** a stack of flat planes at different depths, moved by one camera. Every mark decides "ink or paper"; there is no lighting except one direction used to choose lit and shadow faces.
- **Two kinds of field.** Every surface is either a paper field carrying ink cuts (lit faces, snow, sand, cloud, foam, steam) or an ink field carrying paper cuts (shadow faces, sky, water, forest, night). A cloud is paper with a few horizontal ink cuts on its underside, not a reversed sky as densely cut. Tone inside a field comes only from the width and density of the cuts.
- **Faceted terrain:** mountains and volcanoes are cones of flat facets. Lit facets are paper with a few fine ink cuts near the terminator; shadow facets are ink with paper cuts running down the slope. Cut spacing is fixed in the plane's own coordinates, so lines never swim when the camera moves.
- **Sky in its own space:** the sky layer turns with the camera but never slides with its travel; cuts are level rows, so they stay horizontal. Night = sparse wavy wind cuts and square stab stars; day = dense parallel cuts, thicker near the horizon. Words in the sky are plates hung in the same layer.
- **Flat sprites:** trees (pines, frosted deciduous trees), animals, steam. Anything standing stays upright and faces the lens; anything flying may bank. Thin shapes are fattened with distance so they survive as ink instead of thinning to grey.
- **Water** is a ribbon cut into the snow, with bank walls and a paper snow lip. Ripples are short cuts across the flow, faded to solid ink where they would turn grey with distance.
- **Print pass (over the whole frame):** paper fibre, ink mottling in the darks, soft grey blotches near the top of the sheet, a stepped flicker, a light vignette. Nothing else lives in screen space except transitions made of paper (a whiteout, a sheet being peeled).
- **Props with words** (plates, boards, notices): carved letters in paper on an ink ground, or ink on a pasted paper label. They sit at a 3/4 angle with drawn thickness, a snow cap or a rim.

**Rules for any new surface** (the look depends on them):

- Choose its field first: paper with ink cuts, or ink with paper cuts.
- Cuts follow the matter: down the fall line on slopes, horizontal in sky, cloud and still water, across the flow in running water, along the crests for waves, along the grain or course for wood and stone, along drifts or furrows on flat ground.
- Spacing is anchored to the surface, never to the screen; moving matter may slide along its own coordinate with time.
- The one light chooses lit or shadow per face with a threshold; no gradient inside a face.
- Fade with distance: once the cuts are closer together than a couple of pixels, let them go to the field's own value.
- Flat ground carries sparse, irregular marks; a regular rhythm reads as a road or a grid.
- The red never enters a surface; it is its own mark on top. The yellow only for light or the one material.

## 3. Colour logic

- Two values carry everything: ink (a warm black) and paper (a warm off-white). Never pure black or pure white, never a third grey fill.
- **One red, reserved for one subject**, kept small (a crown, a lamp, a flag) and never smaller than about 0.3% of the frame height; enlarge it a little rather than lose it. It may carry into the subject's own trace (its ripple, its trail), never onto another object. A flat stab: no outline, highlight or gradient, a thin paper ring only where it sits on ink. When the take follows the red through steam or a whiteout, the red stays on top of the paper.
- A warm yellow is allowed for light itself (sun disc, its road on water, warm cuts in a dawn sky, a lamp) and one material at most. It never fills a large area except that one material.
- Value order by depth: far mountains paper with ink shadow facets; forest bands solid ink; the middle ground paper; foreground ink silhouettes. Keep the subject on the opposite value of what lies behind it.
- Example palette: ink `#16171b`, paper `#ede5cd`, red `#c4332b`, yellow `#dfa443`.

## 4. Type & on-screen text

- One serif typeface, bold, the kind with sturdy strokes that survive being carved. A brand's own serif comes first; a thin or geometric brand face stays in the logo.
- **Type lives in the world:** carved into a board, cast on a plate, printed on a pasted notice, or cut as a plate of type into the sky. Words in the world carry only keywords and numbers; no centred title cards, no headers.
- At most three sizes per frame; the smallest still reads at phone size; every word at least 5% inside the frame. Blocks flush to the reading side, aligned by optical edge.
- Words appear the way the medium makes them: cut along the reading direction with chips at the knife, pressed by a seal, revealed under a peeled sheet.
- Judged comparisons hold still about 2.5 s before the verdict lands.

### Narration & spoken lines

When the film tells a story with a narrator:

- **Speech and picture move together.** Each line is spoken while the shot shows what it names; the long take keeps going under the voice, and the silent stretches (a hold to read, a pass through a structure, a flock taking off) are left without words.
- **Words in the world carry only keywords and numbers** (a count on a board, a date on a seal). The sentence is in the voice and in its caption band, not on the props.
- **One caption band per spoken line**, low in the frame inside the safe area: one line, never wrapped, in the film's serif, paper letters on an ink band about 80% opaque (thinner bands vanish over paper). Its words arrive with the voice-over's word timings and the band leaves with the line; keep the subject of each shot above it.
- A second-language version swaps the voice and the band's text: the same picture, each line starting at the same moment, finished before the next one starts.

## 5. Motion quality

- **The camera and the world move on every frame.** Separately, the print pass steps its paper flicker and blotches about 12 times a second (hold each state 2–3 frames), so the image breathes like a worn sheet.
- Easing: long monotone curves; the camera keeps momentum through key positions and decelerates into every hold. No bounce, no shake except one frame for an impact.
- Animals are flat silhouettes with three or four poses per action (sleep, wake, call, peck, walk, run, three wing frames, land, leap, bow). Wings cycle on fixed frames; never morph between poses.
- Steam, snow and splashes are paper marks: horizontal cut wisps, square stabs, short arcs.
- Mountains, horizon and sky texture never move; trees never sway.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| High wide establishing frame, sinking and pushing | the whole place at once; the layers separate as it moves | a valley; a coastline; a city seen from its hills |
| Low glide over water or snow | speed, intimacy with the ground; foreground marks rush past | a river journey; a road; a migration |
| Hold on a prop with words, long lens | reading time inside the take | a sign; a plaque; a gauge; a date |
| Pass through a structure (bridge, gate, arch, tunnel) | a threshold, a change of time or light | night to day; outside to inside; then to now |
| Locked frame | a document, a comparison, a count | the same place in four years; before and after |
| Rise and pull back to the opening angle | the place again, changed | a return; a conclusion; an epilogue |
| Follow a flying or falling subject | the subject leads the camera to the next place | birds, a kite, a leaf, a paper plane |

Framing: the horizon sits on a third; the subject is never smaller than 1/20 of the frame height when it must be recognised; words stay inside the frame with a margin of 5% and never cross another object. In 9:16 the layers stack tall, with more sky above and more foreground below, and the take sinks and rises more than it travels sideways. Allowed transitions: through a structure, through steam or snow (under half a second of white paper), a match on a falling or rising subject, a sheet peeled from the corner, a seal. Forbidden: fades to black, cross-dissolves, slides, page flips, zoom cuts.

Fitting the high wide to the terrain (options, not a recipe). A steep look down at a valley right below loses the sky, and with it a layer. Ways round it: stand the camera farther back and higher on a longer lens, so the subject sits at a shallower angle below the horizon; take the printmaker's licence and stretch horizontal distances or compress heights, since each layer is a plane; break a far plane that fills the frame (a sea, a plain) into bands with headlands, islands, boats or tiers of cut density. When the sky is out of frame and words are needed, carve them into something in the world that faces the lens (rock, board, hull, a mark on the water), let the take tilt up into a hold where the sky returns, or keep the words for a later shot where the sky is in frame.

## 7. Sound palette

- **The world**: the matter of the place, close and dry. Water under ice, frost cracking, wind in three weights, wings, steps on snow, small animal sounds (designed by code, never a recording of unknown licence).
- **The print**: a knife through paper or wood, a block's thump, a sheet torn away, a seal pressed. Used only on transitions and verdicts, never as a bed; they are the loudest events in the film.
- **What stays silent**: the camera's travel itself, the sky, the mountains. Sound belongs to what the take passes (a bank, a bridge, a flock), rising as it nears and falling behind it.
- **Ambience bed**: the place's own air (wind over snow, far water), very quiet and never tonal; it thins when the take holds on words.
- **Silence**: the bed drops out for half a second before a verdict, then one heavy low stroke lands with it.
- **Sound across a transition**: the hush of the steam begins before the frame whites out, and the next place's water is heard before it is seen.
- **Tonal accents**: at most one soft, short ring for the red when it first appears; never a tune.
- **Voice**: low and unhurried, a field naturalist reading a logbook; it leaves the silent stretches silent.

## 8. Native moves

- **The sky carved open.** The sky is cut from the horizon up, one row at a time, the newest row still running across; dawn as a carving, not a gradient. *Fits content like:* a factory's first shift; the first day after a long winter; a city's lights coming on in reverse at dawn.
- **One red waking.** In a field of ink and paper, the single red appears point by point (heads lifting, windows lighting, flags raised) across the frame. *Fits content like:* poppies opening on a hillside; lanterns along a river; the first lit windows of a rebuilt street.
- **Through the steam.** The take passes through a cloud of paper cuts that eats the frame for under half a second; the world on the other side is a different scale or place. *Fits content like:* a ship into fog and out at a harbour; a train through a tunnel's smoke; a balloon through cloud.
- **The same place printed again.** A locked frame of one place; the top sheet peels from the corner to show the next year's print beneath, with ink that has not quite taken. *Fits content like:* a coastline retreating; a forest replanted; a village growing into a town.
- **Words cut into the world.** A count or a date carved into a board, cast in a plate or stamped by a seal while the camera holds. *Fits content like:* a flood mark on a wall; a ship's name on the hull; a record on a mountain hut.
- **A plate of type in the sky.** The title or the sign-off is cut into the sky as an ink block with paper letters, part of the same sky layer. *Fits content like:* a title over a skyline; chapter names over a sea; a dedication over a valley.

## 9. Pitfalls of the medium

- **Close-ups expose the flatness.** A flat prop pushed close to the lens looks like a toy. Keep living subjects to mid shot as flat silhouettes; give close props drawn thickness and real materials (carved wood, concrete formwork, cast iron).
- **Empty paper.** A field of snow without layers goes blank. Keep three layers in frame; add drift strokes, reed ticks, thickets, belts.
- **Grey sludge.** Fine cuts at distance average to grey; fade them to solid ink or paper with distance and fatten thin sprites.
- **Sliding lines.** Any cut spaced in screen space swims as the camera moves; anchor cuts to their own plane (or to the sky layer).
- **The road look.** A dark river with a pale bank lip and regular dashes reads as asphalt. Break the rhythm of bank marks and keep the lip narrow.
- **Small subjects vanish.** Real-scale animals disappear in a wide frame; draw distant ones up to 3× larger (a printmaker's scale), keep the red at its minimum size.
- **Camera through solids.** Clear trees, posts and every small scatter (reeds, stones, grass) from the camera's path: one sprite close to the lens fills the frame with ink. Fade near sprites as they approach, then step stills through every low pass and look for frames that are nearly all ink or all paper.
- **Empty paper close up.** A lit facet near the lens becomes a blank sheet. Make facets smaller near the camera's path and give near lit faces their few ink cuts, grit or tufts.
- **Words on a moving take.** A piece of text is readable only while it is fully in frame, unobstructed, large enough and nearly still. Ease the camera into a hold for each one.
- **The end of the world.** A plane narrower than the camera's travel shows its edge; draw every layer wider than the take needs.
- **Too many greys from post.** Vignette and blotches darken the paper and make the print look dirty; keep them light.

## 10. Building it here

- **A 2.5D diorama, not a 3D scene.** There is no 3D library and no shader here: build the world as SVG planes inside one container with `perspective` and `transform-style: preserve-3d`, each plane at its own `translateZ`, or move each plane by the camera's position times a depth factor. The camera is one set of numbers (x, height, depth, tilt) computed from the frame.
- **Cuts are SVG**: facets are polygons filled with a `<pattern>` of lines rotated down the fall line (`patternTransform`), in the plane's own coordinates so they travel with it. The sky is its own layer that only tilts. Give strokes a blunt start and a tapered end.
- **What to leave out**: orbits around an object, steep look-downs and true fly-throughs. A pass through a structure is a foreground plane scaling past the lens; depth of field is not part of the look.
- **Print pass**: one top layer with `feTurbulence` (fixed `seed`) for fibre and mottling, laid on with `mix-blend-mode: multiply`; change its seed from `Math.floor(frame / 2.5)` for the stepped flicker. It replaces `Finish`, or keep `Finish` very light.
- **Paper transitions**: the whiteout is a paper-coloured layer under the red; the peeled sheet is a `clip-path` polygon growing from a corner over the next print.
- **Motion**: `prog(frame, start, dur, ease.inOut)` between camera keys, joined so speed never drops to zero except in holds. No `springAt`: this style overrides the engine's springs, and `noise(x, seed)` places every scatter (never `Math.random`).
- **One take, one timeline**: keep the whole film in a single scene, or use `<SceneTrack sweeps={false} />` and carry the camera across. Camera keys and word holds live in `timeline.ts`, so `Soundtrack.tsx` lands each knife and seal on the same frames. It is one take: no `SceneFrame` entry or exit, and if the take is split into scenes, build the timeline with `{ overlap: 0 }` so one hands over to the next on a single frame.

## 11. In a product video

- **This palette is the look**: ink and paper stay. The brand's main colour takes the place of the one red, and marks only the product's own subject.
- **The product is the prop the take arrives at**: a `Device` standing in the landscape at a 3/4 angle (one fixed pose, `float={0}`: nothing in this world drifts) with a paper rim, its screen showing the real screenshot or screen recording untouched, held on a long lens. One or two such holds; simple screens can also be redrawn as ink and paper with the accent.
- **Real numbers are carved**: a count on a board, a date on a plate, each one listed in the video's `facts.md`. Illustrative data carries `<ExampleBadge />`.
- **End card**: a plate of type in the sky with the logo in paper on ink, and one line on how to get it; a seal pressed beside it can carry the accent.
- **Arabic**: the take travels right to left and blocks sit flush right; words are cut in whole, one word at a time, never letter by letter, with no letter-spacing. Choose a sturdy Naskh face with enough weight to read as carved.
- **9:16**: stack the layers tall and let the take descend and rise; hang the sky plate and stand the product in the middle band, clear of the top 12%, the bottom 22% and the right 12%.

## 12. Variation space

You decide the place, the subject that gets the red, the route of the take, where the cuts fall, the words and where they are carved, the pacing and the sound.

- **Three structures:** a river followed from source to sea in one take, with the dates carved on bridges; a street at night, one window lit per year, ending on the full street; a mountain hut's logbook, each page a different season of the same view.
- **Three openings:** a single red lamp in a black frame that turns out to be a ship far out at sea; a close cut of frost on a window that the camera passes through into the valley; a title cut into a night sky over a harbour.
- **Three endings:** the camera rises until the place becomes a printed map; a final seal pressed onto the scene itself; the sheet peeled away to show blank paper with the first line of the next story cut in.

---

Adapted for Halal Motion Videos from the `printed-long-take` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
