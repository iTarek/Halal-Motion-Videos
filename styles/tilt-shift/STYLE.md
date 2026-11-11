# Tilt-Shift Miniature

> A real-looking place photographed from high above with a tilted lens and a time-lapse camera, so the whole world reads as a tabletop model.
> References (grammar only): Sam O'Hare's *The Sandpit* (2010) and tilt-shift time-lapse photography in general: high vantage points, the blur band, time-lapse rhythm, cloud shadows sweeping over streets. Copy none of its places; show no real landmarks, brands or logos.

## 1. Essence, and what it is not

A place seen from high up through a **tilt-shift lens**: only a thin horizontal strip of the frame is sharp, everything above and below melts into blur. The eye reads that as a macro shot of something small, so the world becomes a model. Two more things make the trick work: **saturated, sunny colour** (model-railway paint) and **time-lapse** (vehicles and people move in fast, jittery steps like wind-up toys).

Not a toy or clay render (the world looks real, only the lens and the clock make it small), not a game's top-down view (no UI, no clean flat shading), not drone footage (the band, the saturation and the stutter are mandatory).

## 2. Materials & rendering

- **Vantage**: always high. Oblique views at roughly 45–55° pitch, as if from 100–200 m with a moderately long lens; straight top-down for the most "board game" look. Real tilt-shift is never shot from street level, except for a deliberate intimate moment: a true medium close-up at the actors' height, a blurred foreground object framing sharp actors who fill about a quarter to a third of the frame height (a long lens from high up keeps them as dots).
- **Blur band**: one sharp horizontal strip; blur grows with distance above and below it, slowly at first and then faster, up to about 3% of the frame height. Put the band on the subject; when the subject moves, slide the band with it on the same frame. Narrow the band for intimacy. Blur from far areas must never smear over a sharp subject in front of them.
- **Grade**: strong saturation boost, soft added contrast, slightly warm highlights, a vignette. Lower saturation at night.
- **Light**: a hard sun with sharp shadows, a soft fill with warm ground bounce so shadows stay blue but not murky, sky colour in glass and paint. **Cheat the sun direction per shot**: each time-lapse clip is its own shot, so front-light the facades you see; one fixed sun leaves half a film backlit and grey.
- **Model-like detail** (what separates "filmed miniature" from "game graphics"): facades with several window types, narrow bays, dark reveals, grime, sky-reflecting glass and walls darkening toward the ground; roof clutter, awnings and signs; worn markings and stains; vehicles with dark glass, a soft contact shadow and brake lights; soft darkening wherever two surfaces meet.
- **People** are small colour capsules, like model-railway figures. Actors seen up close get rounder bodies with a soft sheen and are made 20–30% larger than real so they read.

## 3. Colour logic

- Saturated, sunny, "freshly painted model": a pale warm ground of buildings with a few candy accents, very saturated greens, dark ground surfaces so white markings and vehicles pop.
- Shadows stay blue and clean, never grey. Night and dawn are the only low-saturation states; dawn must read as early morning (a warm low fill from the sunrise side, few lit windows), not midnight.
- The subject you want found should be the one saturated thing in the sharp band, or move against the flow.
- Examples: a Mediterranean harbour (whitewash, cobalt shutters, terracotta, turquoise water); a snowy ski village (white, pine green, red gondolas, long blue shadows); a desert market (sand, saffron, indigo awnings, dusty olive).

## 4. Type & on-screen text

- **Narrated lines belong to the world's own signage**: a panel in the graphic language of the place's signs (road sign, platform board, harbour notice…), set in a sign-style sans (the Overpass kind, a highway-lettering revival), sitting in the lower blur band, each word appearing as it is spoken.
- A **time-lapse clock** with a speed readout (e.g. `×24 TIME-LAPSE` / `×1 REAL TIME`, monospace, fixed-width digits) is the audience's speedometer for the native trick; use it whenever speed changes carry meaning.
- **Titles live in the world**: letters on a roof, a sign or a field, placed where nothing blocks them, lit or revealed on the pulse.
- A brand's own typeface can take the titles; the sign panel and the clock keep their sign and mono faces, because they belong to the place.

## 5. Motion quality

- **Time-lapse stutter is the soul of the style.** In fast-forward the whole world (vehicles, people, lights, sun) updates at a low rate and holds each position for several frames: at 30 fps, hold 3–4 frames (8–10 updates a second). Make that hold the film's pulse, so every jump lands on it. **The camera stays smooth on every frame.** Step at a middle rate while the speed is moderate; below about ×2 the stutter disappears and motion becomes silky, which makes a drop to real time hit hard.
- Systems run on simple simulations worked out per clip (cars following each other, signal cycles, crowds gathering and surging), with cycle offsets chosen so changes land on the pulse.
- Hero actors get art-directed timing (scripted paths fitted through chosen frames), never a hope that the simulation arrives on time.
- Close-up acting: anticipation squash → stretch → land squash → settle; a failed attempt before success is the comedy engine.

## 6. Camera grammar

A vocabulary, not a route. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| High oblique wide, very slow slide | a whole system at a glance | setting a place; routine; many small actors |
| Band follows one subject across a wide | "this one" | a single commuter; a delivery; a lost child |
| Rack of the band from one subject to another | attention changing hands | cause and effect; a handover; a comparison |
| Slow push on an intersection, station or yard | a system heating up | rush hour; a fair setting up; a queue |
| Straight top-down, slowly rotating | the world as a board or machine | patterns; logistics; a routine in step |
| Continuous dive from high to actor height with a speed ramp | the one small thing that matters | a twist; a joke; a meeting |
| Band narrowing to a sliver | intimacy | a quiet word; a reunion; one decision |
| Vertical rise, slowing as it climbs | scale, letting go | aftermath; a summary; a system becoming a pattern |
| Lateral track along a line (rail, river, road) | a process in order | a supply chain; a parade; a race |
| Locked frame across hours | time as the actor | a construction; a market day; tide |

Framing: stay high; the sharp band carries the subject; vehicles and people stay tiny except in a close-up. Transitions: cuts on the pulse, speed ramps, dives and rises; avoid dissolves that reveal the fake lens.

## 7. Sound palette

- **Sound follows speed.** In time-lapse the world is a toy: a faint granular "sped-up world" hiss, clacks, relay clicks, and a light ratchet tick on each stepped jump. At real speed it turns suddenly real: idling engines, distant traffic, birds, a far murmur, footsteps.
- **Single events get single sounds**: a signal changing is one relay click, a gate closing one clack, a boat leaving one short horn. The crowd and the flow stay under the hiss.
- **The tape-stop**: when time slows, the hiss glides down in pitch and drops out. On release, engines rev and wind rises back into the hiss.
- **Silence is the moment real time arrives**: cut everything for half a second, then keep one or two real sounds, close and dry.
- **Ambience bed**: high, thin wind for the height, very quiet and never tonal; it thins out as the camera dives and returns on a rise.
- **Sound across a cut**: the real-time engine idle starts a few frames before the speed drop finishes; the wind of a rise runs on over the cut that follows.
- **Tonal accents** only as single notes: a horn, a crossing bell, a shop-door chime. One at a time, never a tune.
- **Voice**: relaxed, few short lines; the hiss and clicks drop to about half while it speaks.

## 8. Native moves

A menu: use the ones your story needs.

- **The speed drop (×40 → ×1).** Time crashes to real speed on one detail. *Fits content like:* one worker finishing a shift; a child dropping an ice cream; a parent finding a child on a crowded pier.
- **The band as pointer.** Slide or narrow the sharp strip to steer the eye. *Fits content like:* a courier through a market; a single wrong-way skier; one boat leaving port.
- **Bird's-eye system.** The place as a clockwork or machine. *Fits content like:* a port unloading ships; an airport's turnaround; a farm harvest.
- **Long-exposure light.** At dusk, lights leave trails that draw on the world. *Fits content like:* ferries crossing a bay; runners with headlamps; street lamps coming on along a river.
- **The scale reveal.** Rise until the place becomes a pattern. *Fits content like:* a street market from setup to crowd; a school at recess; a city grid at night.
- **Cloud shadows sweeping.** Weather crossing the model. *Fits content like:* a season turning; a mood change; a news cycle.

## 9. Pitfalls of the medium

- Tall buildings plus shallow pitch hide the ground → low to mid-rise buildings, pitch 45° or more.
- The subject hides in a canyon or behind a facade → route it on the camera side and let the band follow it.
- Hundreds of separate elements slow every frame → draw crowds and traffic on one `<canvas>` from the frame number, and skip what is far outside the frame.
- Queued vehicles stop short of the line (the jam gap) → close it where the story needs contact.
- The band lags the subject by a frame → compute the subject's position first, then the band, from the same frame.
- A top-down → oblique dive twists → rotate the top-down so its screen-up matches the target shot.
- A close-up from high up is too far → go low and close, with a blurred foreground object.
- Clouds wash out a rise → flat white, low opacity, nothing below the camera. Light pools read as bubbles → denser, larger, fainter pools.
- Scene backlit and grey → cheat the sun per shot. Dawn reads as midnight → warm low fill, fewer lit windows.
- Blur layers show a hard step, or darken at the frame edge → overlap their masks with long gradients and let the scene run past the frame on every side.

## 10. Building it here

- **There is no 3D renderer here; the look is built in 2.5D.** Two routes: a **real high-angle photo or clip** (the user's upload, or a public-domain aerial) with the band, grade and stutter applied; or a **town built in CSS 3D**. A built town reads as a painted model rather than a photograph, so lean on model-railway paint and let the lens and the clock do the rest.
- **Built town**: a ground `div` under a `perspective` wrapper, tilted with `rotateX(50–55deg)` and `transform-style: preserve-3d`. Buildings are boxes of pre-shaded faces (sunlit wall, shaded blue wall, roof), windows as SVG patterns, a skewed dark `div` for each cast shadow and a gradient darkening each wall toward the ground. The camera is one transform on the ground (`prog` with `ease.inOut`).
- **Blur band**: three or four copies of the scene (or `backdrop-filter` layers) with rising `blur()`, each cut by a `mask-image: linear-gradient` that is clear over the sharp strip. Move the gradient stops to the subject's screen position each frame.
- **Stutter**: the world reads a stepped clock, `Math.floor(frame / hold) * hold`; the camera reads `frame`. Speed ramps change how much world time each step adds. On a real clip, step the source frame the same way with Remotion's `<Freeze>`.
- **Grade**: one CSS `filter: saturate(…) contrast(…)` on the scene, and `Finish` for the vignette with light grain.
- **Traffic and people**: small rects and capsules on lanes, positions from simple functions of the stepped clock, variation from `noise(x, seed)`.
- **Overrides**: no springs on the stepped world (springs only for close-up acting, `SPRING.bouncy`); `<SceneTrack sweeps={false} />`; no `Backdrop`. **Left out**: true depth-based focus, real-time shadows, reflections that follow the camera. Scenes take no `SceneFrame` entry or exit: its blurred push is the engine's default look, not this one. The timeline's `overlap` is how long the old scene stays mounted under the new one (8 frames by default): build it with `{ overlap: 0 }` for a hard cut, or give it the length of this style's own transition.
- **The hold length is the pulse in `timeline.ts`**; `Soundtrack.tsx` puts clicks and the speed drop on the same frames.

## 11. In a product video

- **The brand's colour is the one saturated thing in the sharp band**: the courier's jacket, the van, the shop's awning. The place keeps its sunny model paint; the brand colour is only the subject.
- **The product is the system seen from above, then one screen.** The town shows what the product does at scale (deliveries, bookings, routes); the speed drop or a dive then lands on a real screenshot in a `Phone` or `Device`, held wholly inside the sharp strip with blur above and below. Never grade or blur the screenshot itself.
- **Real numbers go on the world's signs** (a platform board, a roof number), each one listed in `facts.md`. A simulated town is an illustration: where it implies quantities (vans on the road, orders in a day), add `<ExampleBadge />`. The clock's ×N must match the speed really shown.
- **End card**: straight top-down, the logo as letters on a roof or field in the sharp band, and one sign panel saying where to get it.
- **Arabic**: sign panels read right to left and a lateral track follows the process from right to left; words appear whole, with no letter-spacing; a clear road-sign style Arabic face suits the panels. Keep `×24` and other readouts reading left to right with `isolateNumbers`.
- **9:16**: the tall frame gives more blur above and below, which is where apps lay their buttons. Keep the sharp strip and the subject in the middle third, the sign panel above the bottom 22%, the clock below the top 12%, nothing key in the right 12%.

## 12. Variation space

You decide the place, the system, the tiny actor, the structure, the opening, the ending, the camera path, the speed curve and the palette within the colour logic.

- Structures: **one day, dawn to night** (a single locked vantage, the sun and the shadows sweep, one shop's light the last to go out); **the relay** (the band hands attention from actor to actor across a whole place, each one passing something to the next); **before/after** (a construction site time-lapsed from empty lot to opening day, with one real-time moment per stage).
- Openings: **mid-bustle at full density** with the band already on one oddity; **a top-down pattern** that only slowly tilts into a place; **real time first**: one person at actor height, then the lens lifts and time speeds up.
- Endings: **a drop to real time that stays there** (no pull-back); **lights going out one by one** at night from high above; **the lens un-tilts**: the band widens to full sharpness and the model becomes a real place.

---

Adapted for Halal Motion Videos from the `tilt-shift` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
