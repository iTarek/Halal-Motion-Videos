# Risograph Print

> Animation that looks printed, frame by frame, on a stencil duplicator: two or three translucent spot inks overprinted on warm paper, halftone dots, ink grain, and plates that never quite line up.
> References (grammar only): Tom Haugomat's riso illustrations (colour fields and silhouettes, a small figure in a large world, extra colours made by overprinting); Jacques Tati's *Jour de fête* (comedy staged small in a wide frame, everyday sounds as rhythm); real riso prints (translucent inks, misregistration, pinholes, feed streaks). Copy none of their characters, compositions or palettes.

## 1. Essence, and what it is not

A risograph prints **one colour at a time**: each colour is its own stencil ("plate") with its own cylinder of translucent ink. That one fact makes the look:

- **A tiny palette**: 2–3 spot inks on warm off-white paper.
- **Overprint mixing**: inks multiply, so two inks make a third colour and all three approach black; a tint of one ink over a solid of another gives the brightest mixes.
- **Misregistration**: every plate lands a little off; edges show slivers of paper or a coloured halo.
- **Halftone dots** for mid-tones, each plate on its own screen angle; **imperfect ink**: pinholes in solids, streaks along the feed direction, blotchy density.
- **Flat shapes, no outlines**: forms are colour fields and silhouettes.

Not flat vector art with a noise overlay (every colour comes from the plates), not CMYK pop-art halftone (no process colours, no keyline), not screen-print posters (riso ink is translucent and grainy, not opaque). **Never** show the RISO brand, logo or machine trade dress; ink names are colour references only.

## 2. Materials & rendering

**The print model.** Think of each frame as **one density map per plate** (0 = no ink, 1 = solid). A shape drawn on a plate with nothing beneath is a true **knockout**; a shape added to one plate over another plate's ink is a true **overprint**. The frame is then "printed":

- per plate: a small offset plus a tiny rotation → misregistration;
- halftone: round dots on a rotated grid, period about 0.6–0.75% of the frame's short side, soft-edged; densities of about 90% and up print solid; screen angles at least 15° apart;
- grain on the dot edges, pinholes in solids, density varying with a feed-direction streak and a slow blot noise;
- paper shows through wherever a plate has no ink, with faint paper fibre;
- dots anchored to the **paper** (the screen), not to objects: a pan slides the image under a fixed screen, as if each frame were printed anew;
- a per-plate **gate** and a **roller sweep** (a moving edge with a slightly heavier ink band) let a plate arrive mid-shot.

**Composition rules.**
- Every area uses **at most two plates, at most one of them as a tint**. Three halftones on top of each other = mud.
- Big flat shapes, lots of solid paper and solid ink; halftone in a few stepped bands (e.g. 20 / 40 / 60 / 100%) for skies, shadows, distance.
- Characters get a **paper-white knockout halo** (about 0.4% of the frame height): a ring of zero ink on every plate, then the character drawn inside it. Plates misregister around it, so it picks up coloured fringes like a real trap.
- One horizon, one big flat field or disc, one small figure; the figure's head against the flattest colour in the frame.
- Design for the **one-plate version**: every main colour contains some of the first plate, so a one-ink frame still reads as a complete silhouette. A deliberate exception stays blank paper until its plate arrives: a reveal.

## 3. Colour logic

- **2–3 spot inks, never more**, plus paper; every other colour is an overprint or a tint. No gradients except stepped halftone.
- Pick inks whose pairs mix into useful colours; at least one must carry a silhouette alone.
- Paper is warm off-white (around `#F4EEE2`), never pure white; paper white is a colour too (knockouts, highlights, caption strips).
- Light neutral surfaces (skin): a light tint of the palest ink. Dots of a saturated ink on skin look like a rash.
- Save the full overprint (every plate, densest mixes) for the moment that earns it.
- Example ink sets: Blue `#0078BF` + Yellow `#FFE800` + Fluorescent Pink `#FF48B0`; Teal `#00838A` + Fluorescent Orange `#FF7477`; Federal Blue `#3D5588` + Red `#FF665E` + Sunflower `#FFB511`.

## 4. Type & on-screen text

- **Type is printed**: titles and captions live on one plate, so they misregister and grain with it. A title can be printed on two plates with a visible offset: the riso double-hit.
- Faces: a heavy grotesque for titles (the kind of Bricolage Grotesque 800) and a geometric sans for captions (the kind of Jost 500–700). A brand's own fonts come first when they are heavy enough to survive the grain.
- Narrated lines: a **paper-white knockout strip** (zero ink, small radius) with text on one plate, large enough to read at phone size; its edges catch misregistration fringes. Words arrive with the voice-over's word timings.
- Prints don't fade: titles arrive with a roller wipe or on a pulse and leave on a cut.

## 5. Motion quality

- **Characters act on held drawings**: hold each drawing 2–3 frames (about 12 a second). **The camera moves on every frame**: a stepped camera reads as judder.
- **Registration is not jittered every frame.** One fixed set of offsets per shot (about 0.1–0.3% of the frame's short side). A **kick** (about 1%, decaying in about a quarter of a second with slight ringing) on an accent; a **drift** up to about 2% through a held moment, snapping back on the next pulse.
- **One pulse times the film**: pick a unit in frames; plate arrivals, kicks, snaps and cuts land on it.
- Grain boils partly (about a third re-rolls per print); sheet streaks and blots change only at cuts.
- Simple cycles on few drawings; secondary motion (scarf, flag, tail) as a travelling sine wave.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | Expresses | Can serve |
|---|---|---|
| Wide lateral tracking, small figure, empty sky | Travel, routine, room | a commute; a process line; a title |
| Static wide, the subject crosses the frame | Comedy of scale | a gag; an arrival; a crowd |
| Locked composition: horizon, disc, figure | Stillness, awe | a decision; a reveal; the film's one pause |
| Ground-level low angle, big foreground shapes | Energy, abundance | a burst; a harvest; a launch |
| Medium two-shot held for a look | Reaction | a joke landing; a handshake; a disagreement |
| Straight top-down, long shadows | Pattern, a map | a schedule; a floor plan; a game board |
| Push into a halftone field until dots are shapes | Entering the print | a close look at data; a memory; a cell |
| Pull back to reveal the paper | It was one sheet | a series; an archive; a summing-up |
| Match cut on a flat shape | Continuity through form | a time jump; cause and effect; before/after |

Framing: lots of paper and solid ink, text on empty sky or a knockout strip. In 9:16 the sky grows and the horizon drops; a figure that crossed the frame sideways now climbs or descends it. Transitions: overprint growths, roller sweeps, shape match cuts, hard cuts on the pulse. Never a cross-dissolve, never a soft digital wipe.

## 7. Sound palette

- **The machine is the signature**: feed "shhk", a "ka-chunk" at every plate arrival, a sheet landing on a stack, a guillotine cut, the roller's wet roll under a sweep.
- **Everything else is dry, close and papery**, following the story's materials: a footstep is a tap on card, a splash is a crumple.
- **Layering like plates**: each plate has its own arrival weight (light, medium, heavy), so the third plate lands hardest; plates leaving take their sound with them.
- **What stays silent**: held compositions and slow tracking. Kicks get a short thud; a drift gets nothing.
- **Ambience bed**: the machine room, a low unpitched motor murmur and paper hush, very quiet; it stops at cuts to a new sheet.
- **Silence**: everything cuts for the held moment, at most one distant sound; it pairs with a registration drift, and the snap brings the room back.
- **Sound across a cut**: the feed "shhk" of the next sheet starts a few frames before the cut.
- **Voice**: relaxed and conversational, in short lines.

## 8. Native moves

A menu: use the ones your story needs.

- **Plates as narrative.** The world gains a plate at each turning point. *Fits content like:* a product arriving as a new ink; a city history, one ink per era; colour returning during a recovery.
- **Two inks, a third where they meet.** *Fits content like:* a merger; a partnership; two data sets whose overlap is the finding.
- **Overprint transition.** A shape of one ink grows over the frame, turning everything beneath into the mix, then shrinks into the next scene's key shape. *Fits content like:* a pill dissolving; a lamp becoming a moon; a stamp becoming a map pin.
- **Registration as rhythm and feeling.** Kicks on accents, drift in a held moment, snap on the pulse. *Fits content like:* nerves before a speech; dizziness; a memory coming into focus.
- **Reflections as separated plates.** Each plate wobbles on its own phase. *Fits content like:* a shop window; heat over a road; a coffee surface.
- **Knockout reveal.** A shape made only of missing ink; its plate arrives later. *Fits content like:* a missing piece; a surprise; a logo hidden in plain sight.
- **Halftone scale.** Dots grow into shapes as the camera pushes in. *Fits content like:* population; rainfall; a crowd that turns out to be people.
- **It is a sheet of paper.** The print can be stacked, folded, cut or pinned; grain boils like a flipbook of prints. *Fits content like:* a zine; a poster series; a flyer passed hand to hand.

## 9. Pitfalls of the medium

- Three halftoned plates in one area = mud → two plates, one tint.
- A cheap noise pattern draws stripes across solids → use well-mixed fractal noise for grain and pinholes, and look at a solid at full size.
- Per-frame registration jitter and sheet streaks flicker and bloat the render → fixed offsets per shot, kicks on accents, sheet noise at cuts, partial boil.
- Fine saturated dots smear and moiré once the video is compressed or scaled → keep dots large enough, and check stills at full size and at phone size.
- The halo must share its character's transform, or zoomed shots draw the ring at the wrong scale.
- An overprint faked with opacity loses the third colour → inks must multiply.
- A main colour without the first plate floats loose in one-ink frames → build palette recipes up from the one-ink silhouette.
- Dots that travel with an object look like a texture, not a print → the screen stays fixed to the paper.

## 10. Building it here

- **One layer per plate.** Each plate is a full-frame `div` or SVG group drawn only in its ink's colour, stacked over the paper with `mix-blend-mode: multiply`. Inside a plate, white means "no ink": a white shape is a knockout, and the same shape on two plates is an overprint.
- **Misregistration** is a `transform` on each plate layer (a translate and a fraction of a degree of rotation), fixed per shot; kicks and drifts animate that one transform with `prog` and a decaying sine.
- **Halftone** is a `mask-image` on the plate's tinted areas: a repeating `radial-gradient` dot grid (or an SVG `<pattern>` of circles) rotated to the plate's screen angle, one dot size per stepped band. Put the mask on a wrapper fixed to the frame, so objects slide under the screen.
- **Ink grain and pinholes**: an SVG filter with `feTurbulence` (fixed `seed`) thresholded by `feComponentTransfer`, used as a second mask; re-roll the seed for part of the grain every 2–3 frames, and change streaks and blots only at cuts.
- **Roller sweep and gate**: animate `clip-path: inset(…)` on the plate, with a narrow darker band riding the moving edge.
- **Engine parts**: `useLayout()` and `p(vertical, horizontal)` for the composition; `prog` with `ease.out` for moves; `noise(x, seed)` for every random value. Skip `Finish` (the grain is in the print), `Backdrop` glow and springs on plates; use `<SceneTrack sweeps={false} />`. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **The pulse lives in `timeline.ts`**: plate arrivals, kicks and cuts derive from it, and `Soundtrack.tsx` puts each "ka-chunk" on the same frame.

## 11. In a product video

- **The brand's main colour is one of the inks**, ideally the plate that arrives with the product. Choose the other one or two inks so they overprint well with it; a brand with a full palette still gets three inks at most.
- **The product arrives as a new plate**: the world is one or two inks until the product enters, then its ink prints over everything it touches.
- **Real screens stay readable**: a `Phone` or `Device` sits in a paper-white knockout with a halo, its screenshot or screen recording shown clean like a photo tipped onto the sheet. For texture shots only, a screenshot can be re-printed as a two-plate halftone; never ask the viewer to read that one.
- **Real numbers** are printed large on one plate with a double-hit; each one is in the video's `facts.md`. Illustrative data carries `<ExampleBadge />`.
- **End card**: the camera pulls back to the whole sheet; the logo on the brand's plate, one line on how to get it in a knockout strip.
- **Arabic**: mirror the layout and run the roller wipe right to left; words print whole on their plate, never letter by letter, with no letter-spacing. A heavy modern Kufi for titles and a plain sans-style Naskh for captions; keep the double-hit offset small so joined letters stay clear.
- **9:16**: stack horizon, disc and figure vertically; keep titles and the caption strip out of the top 12%, the bottom 22% and the right 12%.

## 12. Variation space

You decide the inks and what each plate means, the structure, characters (or none), opening, ending, camera path and pacing.

- Structures: **two inks in dialogue** (two subjects alternate shots and only overlap at the end, making the third colour); **subtraction** (start at full overprint, lose a plate at each loss, end in one ink); **a zine** (each shot a page turned, each page a different two-plate pairing).
- Openings: **a knockout** (a blank shape in a full-colour field, filled by its plate seconds later); **dots first** (extreme close-up of halftone that pulls back into an image); **echoes converge** (three colour echoes of one image drift together and snap into a readable frame on the first pulse).
- Endings: **one ink left** (plates lift away until the last line stands in one colour); **the print on a wall** (the last frame becomes a poster pasted up inside the world it showed); **a folded sheet** (the print folds into something the story needs: a boat, an envelope, a ticket).

---

Adapted for Halal Motion Videos from the `risograph` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
