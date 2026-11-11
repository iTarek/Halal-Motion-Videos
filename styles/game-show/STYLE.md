# Game Show Flat

> A party-game variety show in flat vector: toy-like mascots with thick ink outlines on candy-coloured stripes and sunbursts, every hit landing on one fixed pulse, call-and-response patterns, and a judgement word when each round is won.
> References (grammar only): pattern-and-response party games (cue → answer, round cards, judgement words), Japanese variety-show telops (thick outlined captions, stripe and sunburst sets), WarioWare-style stage cards. Never use their names, characters, UI or levels.

The length follows the number of rounds: each round is a title card plus its phrases of play. Narration is optional: the style can carry a film on short shouts and telops alone.

## 1. Essence, and what it is not

- **Everything is on the grid.** One fixed, fast pulse. Every pop, drop, stamp, typed word and camera punch sits at a (phrase, pulse) and is also a sound; picture and sound read the same table, so they can't drift.
- **One drawing kit, many sets.** Flat fills, one heavy ink outline, round caps, hard offset shadows; each round gets a new saturated background colour and pattern.
- **Characters are toys.** One body construction for the whole cast, told apart by colour, a belly patch, one head accessory and a name tag. They hop on the pulse, squash on hits, throw their arms up on a shout.
- **A round = a repeatable verb + a win.** The topic is split into rounds; each round has one action that can repeat on the pulse, and ends on a judgement the audience reads in one glance.

Not a microgame frenzy (no timer or one-verb command per 3 s game, no change of art style per round), not a mid-century cartoon (no textured painted backgrounds, no character acting), not a keynote (no slow reveals, no gradients).

## 2. Materials & rendering

- **Vector only**: flat fills, one outline colour (near-black), outlines of about 0.75% of the frame's short side on characters and props, a little thinner on small parts, round joins and caps.
- **No gradients, no blur, no texture, no soft shadow.** Depth is a **hard offset shadow**: the same shape in outline colour shifted by about 1% of the short side (stickers, banners) to 1.3% (cards), then the coloured shape on top.
- **Sets** = one saturated background plus a same-hue pattern one step lighter: diagonal stripes (often scrolling slowly), offset polka dots (about 20% white), or a rotating sunburst. A darker floor band with an ink line on top grounds the characters.
- **Characters**: a rounded bean body, stubby arms with mitten hands, oval eyes with a catch-light, a mouth that swaps to an open one. Humans share the construction and are modestly dressed; older machines or eras read through a boxier silhouette.
- **UI kit**: round card, corner sticker banner, judgement word, burst (star, ring and speed lines), scoreboards.
- **Every frame is computed from its frame number**: each element's state is worked out fresh, never carried over from the frame before.

## 3. Colour logic

- **Ink, paper and candy.** Near-black ink, white, and a warm cream for cards and paper props; around eight saturated candy hues (yellow, orange, red, pink, green, lime, sky, blue) plus two or three deep hues with darker partners for night or finale sets.
- **One set = one hue.** The background, its pattern and the round card share a hue; the card changes colour to match the set it introduces. Neighbouring rounds never share a hue.
- **Characters own colours.** A contestant's body colour is its identity and never changes; keep it distinct from the set it stands on (a character is never the same hue as the background).
- Big words are white or yellow with a thick ink stroke; judgement words may be pink or yellow.
- Set examples: tangerine ground `#FFB870` with `#FFA85A` stripes; teal with mint dots; navy with a gold sunburst.

## 4. Type & on-screen text

- **Display**: a heavy rounded sans for words and numbers (the Fredoka kind); a hand-lettered face only for handwritten props. The style needs this weight and roundness: a brand's own face is used only if it is as heavy, otherwise it stays in the logo.
- **Telop text**: white or yellow fill with an ink stroke of about 14% of the font size painted *under* the fill. In Latin script titles are built letter by letter so each can pop in.
- **The telops are the text of the film.** Round cards, corner banners, labels, prop text and judgement words carry the meaning; keep them short (a banner line of 4–6 words, a plate of 2–3). With narration, the spoken lines are telop plates low in the frame in the same outlined type, each word popping as it is spoken, never a thin generic caption.
- A judgement word may be shorter on screen than other text because it is read at a glance.

## 5. Motion quality

- **Idle = hop on the pulse**: one parabola per pulse (about 1–3% of the frame height); neighbours hop on the half-pulse so a crowd ripples.
- **Hit = squash**: a damped wobble of about 10 frames after each hit; a small squash on the first pulse of every phrase.
- **Entrances drop from the sky** easing in and land exactly on their pulse, so the sound lands with them. Crowds drop in one per pulse or half-pulse.
- **Pops overshoot** for anything appearing (cards, stickers, stamps, words); exits ease in. Nothing fades in slowly: things are either on or popping.
- **Shout pose**: arms up and open mouth for about half a pulse.
- **Typewriter** reveals on fractions of a pulse, with a click every few characters.
- Scene changes are **hard cuts on phrase lines**, with a white flash of a frame or two. A fade is saved for the very end, if at all.
- Nothing moves off the grid: an event between pulses sits on a subdivision.

## 6. Camera grammar

The stage is a frontal, symmetrical proscenium; the frame itself does the moving. A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Pulse punch (zoom 0.8–5% around centre, decaying in about 5 frames) | the hit, felt in the frame | any accent; a slam; a count-in |
| Several punches in one phrase | the frame breathing with the pulse | a repeated pattern; an escalation |
| Locked frontal wide | the whole stage as a game board | a pattern being set up; a crowd; a scoreboard |
| Hard cut on the phrase line, with a flash | a new round, a new set | chapter changes; a before/after |
| Split stage (two halves, two sets) | two sides answering each other | a friendly rivalry; human and machine; old and new |
| Shrink to thumbnail (a finished bit scales down into a slot) | memory, accumulation | a recap; "and then all of this happened" |
| Scroll of the set (floor to sky) | rising stakes or scale | a leaderboard; growth; a tower of items |
| Snap zoom onto one prop (hard cut to a 2× framing, back on the next phrase) | this detail is the joke | a price tag; a number; a face reacting |

Keep the sum of simultaneous punches below about 6% so the frame edge never shows. Characters stand on the floor band; banners in the top reading-side corner, judgement words centre-top. Hard cuts only; no dissolves.

## 7. Sound palette

- **Toy foley, made by code, one per event**: pops, a plop and a boing for landings, rubber stamps, typewriter clicks, buzzers, dings, servo whirs, splats, a cardboard slap for a card, a spring for a wobble.
- **Three weights on the grid**: a light pip or click for small things, a plop or pop for characters and cards, one fat stamp-and-ding for the judgement word. Idle hopping stays silent.
- **A round's clock**: a dry woodblock tick on each pulse may run under play, like a quiz timer; it thins to nothing under a voice.
- **Rising pips, never a tune**: when a crowd drops in, each contestant gets a pip one step higher than the last, resolving on the final one.
- **Each round opens on a sting**: a short rising sweep into a bright hit as the card flies in. The film's one riser and biggest hit are kept for the last judgement.
- **Shouts, not sentences**: one- to three-word calls ("Hey!", a number, a verdict), placed a frame before the pulse so the consonant lands on it. A crowd shout is several different voices stacked a frame apart.
- **Silence and carry-over**: one phrase of silence broken by a single shout before the big hit; the sting of the next round starts over the last frames of the one before.
- **Voice**: bright, quick and cheerful, a game-show host who never mocks a contestant.

## 8. Native moves

A menu: use the ones your story needs.

- **Rounds with a card.** A card one phrase long (round number, name and a tag such as a year or a step) flies in on a sting, then play. *Fits content like:* the steps of a recipe; the stages of a startup; the chapters of a museum tour.
- **Report card.** A typewritten recap with a grade stamp. *Fits content like:* a quarterly review; a trip summary; a final score.
- **Call-and-response.** Anything with a turn becomes a pattern; speeding up the pattern (whole pulses → halves) *is* the plot. *Fits content like:* a teacher's question and the class answer; a customer order and the barista's reply; a ball going back and forth between two players.
- **Next-level tease.** Something hatches or unlocks. *Fits content like:* a next version; next season; a next grade.
- **Judgement word.** A big outlined word pops at an angle on the round's last hit. *Fits content like:* "Delivered!" on a logistics step; "Approved!" on a permit; "Personal best!" on a training plan.
- **Recap board.** One set with a timeline ribbon; each item gets a few phrases centre stage, then shrinks into a slot along the bottom; at the climax all slots bounce together. *Fits content like:* a year in review; a team's release list; a conference programme.
- **Stats as game UI.** Numbers become podium scores, counters racing to a target, price tags getting stamped down, bar charts that grow per pulse. *Fits content like:* fundraising progress; calories per dish; downloads of an app.
- **Crowd drop.** Many contestants drop in one per pulse, each with its pip. *Fits content like:* every member of a club; the planets; the ingredients of a dish.

## 9. Pitfalls of the medium

- **Poses kept from the frame before break the render**: frames are drawn out of order, in several browser tabs. Compute every pose from the frame number; compare single stills with the played film.
- **Cue lists drift** when cut flashes, stings and events are separate hand lists: derive them all from one table.
- **Text overflows a plate sized by guess**: let the plate wrap its text with padding, and check the longest line in every language.
- **The voice misreads digits and symbols** in shouts: spell them out.
- **Punches that add up show the frame edge**: cap their sum and scale the stage slightly larger than the frame.
- **Other people's products as characters**: generic stand-ins with names on tags, no logos or UI of theirs; real people only as generic stand-ins. Gags are kind: nobody is the loser of the joke.

## 10. Building it here

- **SVG and plain `div`s, all 2D.** One `Bean` component draws the whole cast from props (body colour, belly patch, accessory, pose); the stage is a frontal layout from `useLayout()`.
- **The grid**: export the pulse (12 frames is a good fast one) and an `at(phrase, pulse)` helper from `timeline.ts`. A hop is a parabola of `(frame % pulse) / pulse`; a squash is a damped sine of the frames since the hit.
- **Pops and drops**: `prog(frame, at, 6, ease.back)` for pops that must be done by a fixed frame, `springAt(…, SPRING.bouncy)` where a longer settle is welcome, `ease.in` for drops so they land exactly on the pulse. The engine's springs suit this style.
- **Hard shadows and outlines**: `box-shadow: 10px 10px 0 <ink>` on rectangles, `filter: drop-shadow(10px 10px 0 <ink>)` on any other shape; telop text with `-webkit-text-stroke` and `paint-order: stroke fill`. Sizes scale with the frame's short side.
- **Sets in CSS**: `repeating-linear-gradient` stripes scrolled with `background-position`, tiled `radial-gradient` dots, a `repeating-conic-gradient` sunburst turned with `rotate`.
- **Camera punch**: one wrapper scaled by `1 +` the sum of decaying punches read from the cue table.
- **Overrides**: hard cuts with a 1–2 frame white flash, so `<SceneTrack sweeps={false} />` and no `SceneFrame` entries or exits; no `Finish` (no grain, no vignette), no `Backdrop`, no `MaskRise` (words pop). A hard cut needs the timeline built with `{ overlap: 0 }`: the engine's default leaves the old scene under the new one for 8 frames.
- **One table drives both**: `Soundtrack.tsx` maps the same events to cues with their `peak` on the event's frame; shouts are short voice-over lines placed one frame early.

## 11. In a product video

- **The candy palette is the look; the brand colour is the hero's body colour** (the brand's mascot, or the product as a contestant), and it may be the finale set's hue if the hero is not standing on it. It never changes during the film.
- **Each feature is a round**: one verb the product does, repeated on the pulse, ending on a judgement word that is the benefit ("Sorted!", "Delivered!").
- **The real product is a prop on stage**: a flat `Phone` with a real screenshot, given the kit's ink outline and hard offset shadow so it belongs; a tap on it (`Device` with `float={0}` and `taps`, since `Phone` draws none) is a hit on the pulse, and a snap zoom shows the screen full frame for a phrase. No tilts, no glow.
- **Scoreboards show real numbers**, each in `facts.md`; a made-up score carries `<ExampleBadge />`. The rival is "the old way" (a queue, a paper pile), never a named competitor.
- **End card**: the cast frozen mid-hop, a round card with the logo and one line on how to get it, the last judgement word above.
- **Arabic**: mirror the stage (banners in the top right, the typewriter and crowd drops running right to left); words pop whole, never letter by letter, with no letter-spacing; a heavy, rounded Arabic display face that can carry the thick ink stroke.
- **9:16**: the stage turns tall: the floor band sits above the bottom 22%, the cast stands in two rows, the split stage stacks, and banners and judgement words stay below the top 12% and clear of the right 12%.

## 12. Variation space

You decide the rounds and their verbs, the cast, the sets and colours, whether there is narration, the pulse, the opening, the ending and the length. The grid, the drawing kit and the telop language stay.

- Structures: **a tournament bracket** (two contestants per round, the winner advances, the final is a split stage); **one long round** that keeps escalating its single pattern from whole pulses to quarters as the story's pressure rises; **a quiz show** with three contestants where each question is a fact of the topic and the scoreboard is the argument.
- Openings: **the judgement first** (a "Perfect!" pops on an empty stage, then we rewind to how it was earned); **a single contestant alone** hopping on a bare floor until the crowd drops in; **the scoreboard** showing a final number, then counting back to zero.
- Endings: **a group photo** (everyone freezes mid-hop, a flash, the frame becomes a snapshot on a card); **a level-select map** where every finished round is a lit node; **a curtain** falling phrase by phrase with the last shout under it.

---

Adapted for Halal Motion Videos from the `game-show` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
