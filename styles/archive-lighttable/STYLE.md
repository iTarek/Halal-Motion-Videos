# Archive Light Table

> Real archive objects (glass negatives, slides, letters, telegrams, clippings, drawings) lie on a cool, backlit light table. A loupe comes down on one of them, and inside the glass the object comes alive: a negative turns positive, a line of type lights up, a number lifts off the page, a photograph opens into depth. Precise catalogue numbers, dates and readings are pinned to the objects. Clean, modern and quiet, with no vintage filter.
> References (grammar only): archive documentaries that push into still photographs; visual investigations that annotate real imagery (one line, one reading, one source per screen); product macro films (glass edges, transmitted light). Copy none of their layouts, typefaces or shots, and never name them in the film.

## 1. Essence, and what it is not

- **The objects are real**: scans and photographs of real items, at their true proportions, with their real damage (broken corners, emulsion edges, folds, pencil marks). Nothing in them is drawn or generated.
- **Light comes from below**: the table glows a near-white cool grey; film and glass transmit it, paper glows warm at its edges, opaque things read darker than the table.
- **The loupe is the camera's door**: every dive into an object goes through a loupe that lands on it. The inside of the lens is where the object changes state.
- **Catalogue truth**: every object carries its real identifier, date and title from its holder; numbers on screen come from the record.
- **One signal colour** for marks, readings and anchors; everything else is the archive's own greys and paper tones.

**Sources and licences.** "Real" here means, first, what the user uploads (their own scans, prints, sketches, letters, packaging, with their archive numbers and the right to use them), then screenshots and screen recordings of the product, then public material from open collections that publish masters with catalogue records (national libraries and archives, open-access museum collections). CC0, public domain and CC BY (credited) are fine. "No known restrictions", CC BY-SA and other terms are not CC0: name the terms to the user and ask. Never stand a generated image in for an archive object. A scan that carries its holder's watermark or stamp is shown with it or not used: never crop or cover the mark. Every claim, date and figure goes in the video's `facts.md` with its source (the address, the quoted wording, or how a figure was derived). No real personal data on screen: a private name, address or signature on a document is covered or swapped for a fictional stand-in with `<ExampleBadge />`.

Not Halftone Dossier (no newsprint dots, no aged-paper grade), not Satellite Briefing (objects on a table, not the ground from orbit), not Data Storytelling (no charts; the numbers live on the objects), not a keynote (no slides or header bars).

## 2. Materials & rendering

- **One world, one camera**: every object is a flat image on the table with a centre, rotation and scale (scan pixels → table units at true size). The camera is a 2D centre, zoom and roll; the table and every mark go through the same table → screen transform.
- **The light table**: a glowing surface (about 97% white, slightly cool), soft falloff toward the edges, fine diffuser noise, an aluminium frame and a dark desk beyond. It can be switched off (the room at about 4% light) and flicker on.
- **Glass negatives**: the scan inverted and laid over the table so the light shines through it: dense where the positive is bright, almost clear where it is dark, with a warm silver-gelatin tint. The emulsion's edge comes from the scan (a white margin touching the border means no glass there), so broken corners show the table. Dust and scratches are fixed to the table, not to the camera.
- **Paper**: backlit, its colour is transmission (paper tone × light); lit lines get darker ink and brighter paper; unlit text can dim to bring one line forward.
- **The loupe**: inside the lens the table is magnified about 2.5×, bending slightly outward toward the rim, with a faint colour fringe at the very edge. Around it: a black ring with a bevel highlight and a clear acrylic skirt that shows the table through it and glows at its foot. Landing and lifting, it scales by about 1.35× and casts a soft shadow.
- **The photograph space**: after the push the lens stops being a lens. A photo gains depth from layers: the ground (nearer toward the bottom, flat at the horizon), cut-out layers for upright subjects and a filled background; a dolly and a lateral shift drive parallax, and a subject layer may drift. Things left on the ground layer lean: centre the dolly between them.
- **Marks** live on a layer above the picture: hairlines 1.5–3 px at 1080 wide, rings, crop corners, underlines, leaders. Table marks are clipped out under the loupe; marks inside a photograph follow its layers, parallax included.
- **Finish**: a light vignette and fine moving grain (heavier inside photographs). No film damage, no sepia, no halftone.

## 3. Colour logic

- Neutral ground: the light table (near-white, cool) and the archive's own tones (silver greys, paper tans). Do not regrade the archive into a colour scheme.
- **One signal colour** (e.g. a signal orange) for marks, readings, anchors and the verdict; never as a fill behind pictures, never for decoration.
- Text is ink (near-black) on light areas and paper-white on dark caption plates; choose the contrast by the ground, never colour on colour.
- Positives inside the lens may be gently levelled (black and white points) so a weak scan reads; negatives stay as the glass gives them.

Example: table `#F7F9FB`, ink `#15171A`, signal `#FF5A1F`, caption plates `rgba(14,15,17,0.74)`.

## 4. Type & on-screen text

- **Roles**: a monospace for identifiers, dates and readings (the kind of face IBM Plex Mono is; readings two to three times the size of identifiers); a sans for labels in the film's language (the kind Inter is); a serif only for titles and the one name a photograph carries. A brand's own sans and serif come first; the monospace is the style's own and stays whatever the brand uses.
- **Labels attach to objects**: an anchor dot and ring, a vertical leader, then the text. A reading sits in a dark caption plate with a small label above and the source (the catalogue number or the original wording) below.
- **Narrated lines** are a caption strip at the bottom centre, on a dark plate with a thin signal-coloured edge (about 3 px at 1080 wide), each phrase appearing as the voice says it. If the film is bilingual, the film's language goes on top.
- **Quote the source when you can**: a crop of the actual line, or the record's wording in quotation marks, beats a paraphrase.

## 5. Motion quality

- Smooth motion on every frame; every camera parameter on smooth monotone curves through keys (no overshoot, no stepping).
- The camera glides across the table, slows to let the loupe land, then pushes. Speed lives in the glides and pushes; holds are for reading.
- The loupe lands with a fast ease-out (about 0.4 s), lifts the same way. Lines draw on in 0.3–0.6 s; text wipes in from its leader side; numbers count up and land with the voice.
- What never moves: the archive's own content outside a photograph space, and the table itself.

## 6. Camera grammar

| Move | What it expresses | Can serve |
|---|---|---|
| table glide (pan and roll) | surveying; moving to the next piece of evidence | a timeline of documents; a product family; an album |
| loupe landing + push into the lens | choosing one object; "look closer" | the claim; the key photograph; a signature |
| inside the lens: tracking along a line | reading | a letter, a ledger line, a caption, a spec |
| photograph space: dolly + parallax | being there | the event itself; the founding moment; the place |
| rise out of the lens | stepping back, the evidence noted | a transition; a summary |
| pull back to the whole table | scale; everything at once | an index, a timeline, a closing |

Framing: at a reading moment the subject fills at least a third of the frame height; readings and labels stay clear of the caption strip. Transitions are made by the loupe (land, push, rise, lift) and the glide; no cuts, fades to black or page turns between objects.

## 7. Sound palette

- **The table and its tools are the sounds**: the loupe on glass (a clack with a high ring), paper sweeps for glides and lit lines, ticks for scales and counters, a pen stroke for a verdict, soft clicks as labels land, starter clicks as the table switches on.
- **Ambience bed**: the light table's ballast hum, low and steady, and room tone; never a tone you could hum. Inside a photograph the hum gives way to that place's air (wind, a street, a workshop).
- **What gets a sound**: every loupe landing and lift, every label, every counter tick, the verdict. The glide gets only its paper sweep; holds for reading are silent apart from the bed.
- **Weights**: a light click for a label, the loupe's clack for a landing, one heavier stamp or pen stroke for the verdict, used once.
- **Silence**: the hum drops out for about half a second before the key reveal or the verdict; the first sound after it is the loupe, the place or the verdict itself.
- **Sound across a cut of state**: the photograph's air starts a few frames before the lens rim leaves the frame, and the table's hum returns before the rise is finished.
- **Tonal accents** are rare and short: one glassy ring as a negative turns positive. Never a tune.
- **Voice**: a calm narrator, short sentences that state what the object says.

## 8. Native moves

- **Negative to positive under the loupe.** A develop front spreads from the lens centre with a thin warm edge, turning the glass negative into its positive only inside the lens. *Fits content like:* a founder's portrait plate; a factory on a lantern slide; an X-ray film becoming the product inside.
- **The line lights up.** On paper inside the lens one line of type brightens while the rest dims, an underline draws under it, and one word or number lifts out into a reading card. *Fits content like:* a ledger entry; a patent claim; the first order on an invoice.
- **Into the photograph.** The lens rim grows past the frame while the view inside widens; the photograph gains layered depth and a subject drifts. *Fits content like:* the first shop front; a launch day crowd; an expedition camp.
- **Measuring on the photograph.** A ruler laid on the ground plane in perspective, with ticks that crowd toward the horizon and a counter that lands on the recorded figure, marked as a schematic when it is one. *Fits content like:* a race distance; a bridge span; a building's height.
- **Two records, held side by side.** Two caption cards, each with a crop of its source, held still until both are read before one is struck. *Fits content like:* a misprinted date; two versions of a founding story; specification against delivery.
- **The table becomes the index.** Pull back to the whole table; each object's tag flies into one list with its identifier and its reading. *Fits content like:* a company timeline; a collection catalogue; a product family.

## 9. Pitfalls of the medium

- **Over-magnifying a weak scan**: keep the lens interior under about 1.5 screen px per scan px; choose items by scan size.
- **The loupe sweeping over empty table**: lay objects close together, land the loupe straight onto the object (drop in, don't slide in), and glide the camera over objects, not gaps.
- **Shear in the photograph space**: one depth plane for a photo with people or machines in it tears them apart. Cut upright subjects into layers, fill behind them, and keep the moves small enough that the fill is barely seen.
- **Labels that scroll away**: a label on a moving table leaves the frame before it is read; hold the camera, or fix the caption on screen.
- **Vintage creep**: no sepia, no halftone, no paper-ageing overlay. The age is in the objects, not the grade.
- **A lens that shows a different table**: the magnified copy inside the loupe must be the same layout at the same moment as the table outside, or the eye catches the mismatch at the rim.

## 10. Building it here

- **React, CSS and SVG; no 3D library and no shaders.** The table is one wrapper `div` whose CSS `transform` (translate, scale, rotate) is the camera. Each object is an absolutely positioned image at its true proportions; marks are an SVG inside the same wrapper, so they share the transform.
- **Light table**: a near-white `div` with a radial gradient for the falloff and an SVG `feTurbulence` layer with a fixed `seed` for the diffuser. Switching on: opacity stepped by `noise(frame, seed)` for a few frames, then steady.
- **Negatives and paper**: a negative is the scan with `filter: invert(1)` and a slight warm tint, laid over the table with `mix-blend-mode: multiply`; its emulsion edge is a prepared alpha mask (`mask-image`). Paper is a multiply layer too; a lit line is a brighter band under the text plus a dimming layer over the rest.
- **Loupe**: a circular `div` (`border-radius: 50%; overflow: hidden`) holding a second copy of the same world, scaled about 2.5× around the loupe point. The ring is a border with an inset highlight, the skirt a wider translucent ring. Leave out true refraction and per-channel fringes; a soft `feDisplacementMap` bend at the rim is enough, or none at all.
- **Develop front**: the positive sits over the negative inside the lens, revealed by `mask-image: radial-gradient(…)` whose radius comes from `prog`; a thin warm ring rides its edge.
- **Photograph space in 2.5D**: three or four prepared layers (filled background, ground, cut-out subjects) that translate and scale by different amounts, or sit at different `translateZ` under one `perspective`. Keep the moves small. A subject can be cut here with a hand-made `clip-path` polygon, but what was behind it cannot be painted in: without a filled background from the user, keep the parallax to a few pixels or leave the photograph flat.
- **Leans on / overrides**: camera and loupe run on `prog` with `ease.inOut` and `ease.out`, not springs. One continuous scene, so no `SceneFrame` entries and `<SceneTrack sweeps={false} />` if scenes are used at all. `Finish` supplies the light grain and vignette.
- **Timing**: camera keys, loupe landings and label frames live in `timeline.ts`; `Soundtrack.tsx` lands the clack, clicks and ticks on the same frames.

## 11. In a product video

- **The brand's colour is the signal colour**: marks, readings, anchors, the caption strip's edge, the verdict. The table's cool white and the objects' own tones stay as they are; this neutral ground is the look.
- **The product's own archive is the material**: first sketches, early screenshots, printed pages, packaging, release notes, a founder's note, uploaded by the user. Today's product lies on the table as a print or a mounted slide of a real screenshot, flat, with no device frame; under the loupe it comes alive (a screen recording plays inside the lens, a line of the interface lights up).
- **Readings are real**: every date, version number and figure pinned to an object is in `facts.md`. An object made up to illustrate a point carries `<ExampleBadge />`.
- **No private data**: names, emails and addresses in letters or screenshots are covered or replaced before the scan goes on the table.
- **End card**: pull back to the whole table, or switch the table off and leave one object glowing: the logo as a slide, with one line on a caption plate saying where to get the product.
- **Arabic**: leaders and labels sit on the right of their anchors and text wipes in from the right; words appear whole, never letter by letter, with no letter-spacing. Use a clean, low-contrast Arabic sans for labels and a naskh for titles; identifiers and readings stay in the monospace, wrapped with `isolateNumbers`. On an Arabic document the underline draws right to left.
- **9:16**: lay the objects in a column and glide vertically; the loupe can take about 60% of the width. Lift the caption strip above the bottom 22%, and keep readings out of the top 12% and the right 12%.

## 12. Variation space

You decide the objects, their order, the story, which native moves to spend and where, the camera path, the subject of the photograph space, and the signal colour.

- **Three structures**: a company's founding told as five objects in date order, each dive revealing one person; a single photograph explored in three dives (the place, the people, the date on the back); a before/after pair of plans and photographs of one building.
- **Three openings**: the table switching on in the dark; a loupe already on a plate, rising to reveal the table; a hand-written date on an envelope filling the frame.
- **Three endings**: the index of everything on the table; the last photograph held in depth with one line of text; the light table switching off, leaving one object glowing.

---

Adapted for Halal Motion Videos from the `archive-lighttable` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
