# Living Screencast

> A product walkthrough that looks like a real screen recording, where a low-resolution mascot lives inside a high-resolution interface and acts out what the software is doing.
> References (grammar only):
> - **Screen Studio-style product recordings:** auto-zoom to the cursor, cursor smoothing, click push-ins, and a window floating on wallpaper.
> - **Apple "Guided Tour" videos:** real interface, calm narration, one feature per sentence.
> - **Duolingo-style mascot motion:** squash and stretch, anticipation, a character that performs inside the UI.
> - **The Browser Company (Arc) launch films:** playful tone and fast cutting.
>
> Never copy their characters, UI, sound or footage.

A walkthrough of a piece of software, typically 20–60 s. The user gives the product and the features; you decide the story, shots, choreography and sound.

## 1. Essence, and what it is not

The film looks like a **screen recording of the real product**, but it is not a recording. Every window, menu, list row and button the camera enters is **redrawn in 2D (HTML/CSS/SVG)** from real captures of the product, so the camera can go anywhere, every pixel is controllable and text stays sharp at any zoom.

A **mascot made of big square pixels** lives in that high-resolution world. The clash of two resolutions, a hard-edged low-res sprite against anti-aliased UI, is the look.

The mascot is the software's agency made visible: when the software reads, it runs along the rows it reads; when it plans, it holds a pixel pencil; when it tests, it stomps the button.

**Two actors, never a hand:** the **cursor** (or a tap ring on a phone) is the user; the **mascot** is the software.

Not a dark tech keynote (no black stage, no invented abstract UI: this is the real product), not a pixel-art game (the world is hi-res vector UI; only the mascot and its props are pixels), not a raw capture (the mascot needs a world it can stand on and change).

## 2. Materials & rendering

- **Real UI, redrawn**: every label, mode name and shortcut matches the real product; no lorem ipsum. Demo content (text, data, results) is coherent, and the thing being worked on really changes.
- **Pixel grid is sacred**: the mascot, its props (pencil, "!", sparkles, star, dust) and trails share one square-pixel grid with crisp edges. It scales with the camera; its position snaps to half-pixels of that grid, so its motion feels stepped.
- **Gravity = top edges of UI**: the mascot only stands on the top edge of a real element (input box, menu, list row, line of text, button, status bar, the letters of a heading). Its position comes from **the interface's own layout** on every frame, never hand-placed coordinates.
- **Window on wallpaper**: the app floats on a desktop with a soft shadow; zoom never shows beyond the monitor. A phone app is a phone on the same kind of soft ground.
- **Depth** only where it serves attention: rack focus (blur the pane that doesn't matter), a vignette spotlight. Never blur text the viewer must read.
- **Motion blur** follows camera speed and is applied along the direction of travel to a wrapper that is **not itself transformed**, only on whips. Slow moves stay sharp.

## 3. Colour logic

- The product's own interface colours rule: follow its real light and dark themes exactly.
- The mascot keeps the product's or brand's mascot colour, or one saturated hue that no UI element uses, so it finds the eye in any frame.
- Overlays (chapter pill, key HUD, captions) are neutral frosted glass; one accent at most, taken from the product.
- A theme switch can be a story event: the whole film may change state with it.

## 4. Type & on-screen text

- UI type follows the product exactly (its own fonts, or close free look-alikes such as Inter or JetBrains Mono when its fonts can't be used).
- **Information layers only**: a chapter pill (01–04), a keystroke HUD showing the keys pressed, frosted-glass caption pills, an optional "▶▶ 4×" time-lapse tag. Nothing else overlays the screen.
- **Narrated lines** sit in a caption pill at the bottom, never over the element being discussed and never under the mascot, each phrase arriving with the voice.
- A title, if any, is diegetic: it appears as part of the UI (an empty-state heading, a window title, a notification).

## 5. Motion quality

- UI moves smoothly on every frame; the mascot's position is stepped to its pixel grid.
- **Mascot acting**: jumps with anticipation crouch, stretch on take-off, tucked legs, landing squash with a damped bounce and dust. Idle breathes (a tiny squash) on the film's pulse and blinks irregularly. Walks by leg alternation, flipping the sprite for direction.
- **Eyes carry the acting** (neutral / left / right / up / down / wide / happy / shut / blink): they look at what matters. Arms: down / up (cheer) / wave.
- **Cursor**: smoothed, spring-eased paths, small push on click, never teleports.
- **Cause and effect**: every mascot action triggers a real UI state change; every user action is a cursor move, click, tap or keystroke shown on the HUD.
- UI animates like the real product (its own menus, popovers, reveals); don't invent flourishes the product doesn't have.

## 6. Camera grammar

A recording-software camera: one continuous take inside the screen, zoom never below 1, cuts only under chapter transitions. Opening and ending come from the topic.

| Move | What it expresses | Can serve |
|---|---|---|
| Push-in to the cursor or caret | "this is where it happens" | typing a prompt; choosing a menu item; a setting |
| Slow drift at rest | the app is alive while we listen | a line of narration; waiting for a result |
| Whip-pan between panes (with blur) | cause here, effect there | sending a message → a result appearing; editor → preview |
| Push-in + vignette freeze | the one promise to remember | a safety guarantee; a price; an undo |
| Rack focus between panes | attention moves, nothing else does | reading files; logs scrolling while chat waits |
| Pull back to the full window | the whole workflow in view | a summary; parallel tasks; before/after |
| Follow the mascot along a list | the software working through items | scanning results; a checklist; a migration |
| Split-window reframe | two things at once | parallel sessions; compare two versions |

Framing: the thing being discussed and its caption never overlap; the mascot never covers text to be read. In 9:16 a desktop window is never shown whole and tiny: the camera lives inside one pane at a time and whips between panes. Transitions: chapter pill wipes, pixel wipes, a theme reveal circle; never dissolves.

## 7. Sound palette

- **Two resolutions in the sound too**: the world is hi-fi, close and real; the mascot is 8-bit. They never swap.
- **World foley**: keyboard (a thock plus a click, with human timing jitter), trackpad clicks, pane swishes, popup pops, notification chimes, progress ticks, a shutter for a capture.
- **Mascot**: short square-wave blips for steps, a rising blip for a jump, a low one with a puff for a landing; one blip per word it lands on. Accents, never a tune.
- **Three weights**: a key or a step (light), a click or a landing (medium), and one bigger pop with a sparkle for the result the walkthrough builds to.
- **Ambience**: quiet room tone of a desk, never tonal; in a dark theme everything is a little muffled, as at night. A split screen puts each side's sounds on its own side.
- **Silence**: a short drop to room tone alone before the key promise makes it land.
- **Sound across a cut**: at a chapter seam, the first keystroke or swish of the next chapter starts under the pill wipe.
- **Voice**: calm, one feature per line. Keep every effect off the first sound of a word, above all the product's name.

## 8. Native moves

A menu: use the ones your walkthrough needs.

- **Match-cut origin.** The mascot is born from something already in the UI (a logo's blocks, an icon, a loading spinner) and climbs out, leaving an outline. *Fits content like:* a chat bubble turning into a guide; an icon becoming an assistant; a spinner becoming a helper.
- **Diegetic title.** The name appears as a real UI element; the mascot lands on it on the pulse. *Fits content like:* an empty state; a new-project dialog; a welcome email.
- **Moving floor.** The mascot rides a caret, a popup, a sent message, a progress bar. *Fits content like:* a message flying into a thread; an upload bar; a drag-and-drop.
- **Time-lapse with a tag.** Long work runs at N× with a flashing tag and rack focus. *Fits content like:* indexing a library; a data import; a build.
- **Spotlight freeze.** Push in and vignette the one badge that holds the promise. *Fits content like:* "Saved"; "Encrypted"; "No charges until…".
- **The film changes state.** A toggle's effect escapes the preview and takes over the whole film, and returns later. *Fits content like:* dark mode; a language switch; offline mode.
- **Cell division.** A new session or window splits the screen and the mascot splits with a pixel burst. *Fits content like:* parallel tasks; multiple accounts; team members.
- **Cursor and mascot as characters.** The cursor pats, nudges or drags the mascot, and it reacts. *Fits content like:* approving a suggestion; undoing; onboarding delight.
- **Bouncing-ball words.** The mascot hops from word to word as they are spoken. *Fits content like:* a slogan; a shortcut list; step names.

## 9. Pitfalls of the medium

- Invented features or renamed modes → check every button, mode and shortcut against the product's real screens and documentation; if it isn't there, it isn't in the film.
- The mascot floats or drifts off its element → take its floor from the interface's layout every frame, and stand only on top edges.
- The mascot covers text or sits under a caption → reserve a text-free lane for it.
- Blur as "fake depth" on text you want read, or zooming out past the screen → rack focus only on panes not being read; zoom stays at 1 or above.
- A hand, arm or finger on screen → the cursor is the user.
- Motion blur applied to a layer that is itself scaled or moved smears the pixel sprite wrong → blur an untransformed wrapper, and only on whips.
- A keypress or pop landing on a product name masks it → shift the effect off the start of the word, then check the "Heard:" lines of `npm run review`.
- The voice mispronounces the product name → try another spelling in the script or another take, and check what was heard.
- A redrawn screen that is nearly right reads as a fake → compare it side by side with the real capture before animating anything.

## 10. Building it here

- **This is the engine's home ground: React, CSS and SVG.** Capture the real product first (`npm run shot`, or a screen recording from the user), then rebuild each screen as a component driven by state, matching the capture label for label. A pane nobody touches can simply be the real screenshot.
- **Layout as data**: draw each screen from one layout object (row heights, pane rectangles, element boxes). The same object gives the mascot its floors and the cursor its targets. If a position must be measured from the DOM instead, measure with a ref in `useLayoutEffect` and hold the frame with `delayRender` until it is known.
- **Camera**: one wrapper with a CSS transform (scale and translate), driven by `springTo` for push-ins and `prog(…, ease.inOut)` for drifts. `Device` with all tilts at 0 and `float={0}` does the same job (its `moves` take `scale` and `focus`, its `taps` draw tap rings) and takes the rebuilt screen as `children`.
- **Mascot**: a sprite is rows of characters turned into SVG `rect`s with `shapeRendering="crispEdges"` (or a small `<canvas>` scaled with `image-rendering: pixelated`). Poses are a table; position is rounded to half a sprite pixel; jumps and landings use `springAt` with `SPRING.bouncy`.
- **Cursor**: positions from `springTo` with `SPRING.soft`; a click is a 0.92 scale dip plus a ring. Typing is a string cut to `Math.floor((frame - start) / 2)` characters, with timing jitter from `noise(i, seed)`.
- **Blur**: rack focus is `filter: blur()` on a pane; whip blur is an SVG `feGaussianBlur` with a horizontal-only `stdDeviation`, on an outer wrapper. Caption pills use `backdrop-filter: blur()`.
- **Leans on** the engine's springs; **overrides**: no `Finish` (a screen recording has no grain or vignette), no `Backdrop`, no `MaskRise`, no light sweep (`<SceneTrack sweeps={false} />`).
- **Every visual event hangs on a spoken word**: in `timeline.ts`, derive event frames from `VO.<id>.words` (the `wordAt` pattern), and let `Soundtrack.tsx` place keys, clicks and blips on the same frames.

## 11. In a product video

- **The product's own colours are the palette.** The brand's colour is the mascot (if no interface element already uses it) and the single accent of the overlays.
- **The mascot** is the brand's own character or logo mark redrawn in big pixels; if the brand has none, an original, friendly pixel character whose gags are kind.
- **The real product is the whole film**: its real screens, real labels, real flows, rebuilt from captures. A screen recording may play inside a pane the mascot never stands on (`<Device video={…} />`).
- **Demo content is believable and safe**: sample names, messages and figures are fictional and carry `<ExampleBadge />` (as one more frosted pill); never a real user's data. Any claim in a caption or badge ("Encrypted", a price, a speed) is in `facts.md`.
- **End card**: stay diegetic. The product's own finished state, the mascot at rest on the logo, and one caption pill saying where to get it.
- **Arabic**: use the product's real right-to-left interface (capture it with the shot's `locale`); the mascot reads rows from the right and hops words right to left. Text never types letter by letter: it lands word by word, each word whole, with one key sound per word. No letter-spacing; the interface's own Arabic face.
- **9:16**: a phone app fills the frame as a phone; a desktop app is shown pane by pane. Chapter pill under the top 12%, caption pill above the bottom 22%, key HUD on the left, away from the right 12%.

## 12. Variation space

You decide the features and their order, the mascot (the product's own, or an original pixel character), the story, the opening, the ending, the camera path and the chapters.

- Structures: **a bug hunt** (the mascot chases one error through logs, code and a fix, a single chapter); **a day of one user** (morning to evening in one app, the theme and the room tone shifting with the hour); **a race** (two windows side by side, old way vs. new way, the mascot winning on one side).
- Openings: **mid-task** (a half-written document; the mascot is already pushing the cursor's selection); **the notification** (a system toast lands; the mascot is inside it); **empty state** (a blank app, a caret blinking; the mascot drops from the menu bar).
- Endings: **the mascot goes to sleep** on the finished item as the window dims; **the app closes** and the mascot is left standing on the dock; **a real share** (the result is sent and the mascot rides it out of frame).

---

Adapted for Halal Motion Videos from the `living-screencast` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).
