# Halal Motion Videos — a machine for motion-graphics videos

Runs on **Windows, macOS and Linux**. This repo makes short motion-graphics videos (product promos, App Store previews, social clips) with **Remotion** (React → MP4). It's driven by AI agents from a terminal (`npm run video`) or by a person from a local dashboard; either way an AI **Director** (Claude Code, Codex or Antigravity) writes the brief, captures real screenshots, designs sound by code, generates voice-over and builds the scenes.

- Every video lives inside a **brand** (an app or product).
- A brand can have many videos: `my-app/video01`, `my-app/video02`, …
- One source per video renders every format (9:16, 16:9, 1:1, 4:5).

The usual request is **"make a new video for X"**. Follow the workflow near the end.

## Agent first

Most videos are made by **AI agents** (OpenClaw, Hermes, Codex, scripts) through `npm run video`, not by a person in the dashboard. So a change isn't done until an agent can use it without the dashboard:

- **Reachable from the CLI:** every setting and action the dashboard offers also works through `npm run video` (`tools/video.mjs`).
- **Visible in the result:** every new output (a file, a caption, an image, a state) appears in `status --json` and in the `--wait` result, with its path.
- **Told to agents:** the Agent Skill (`.agents/skills/halal-motion-videos/SKILL.md`) says what it is and what to hand the human; it and `references/commands.md` explain every command, flag and `status` field.
- **Versioned:** when the CLI needs something new from the server, bump `AGENT_API` in both `tools/video.mjs` and `tools/dashboard/server.mjs`. An old dashboard that's still running then says "restart it" instead of silently missing it.
- **Tested from the CLI:** `tools/tests/video-cli.test.mjs` covers the new command, flag or field. `tools/tests/agent-docs.test.mjs` fails on its own when the skill misses a command, flag or `status` field, or the two `AGENT_API`s differ: `npm test` before finishing.

Before calling any change finished, ask: **could an agent that only runs `npm run video` find this, use it and hand it over?**

## Setup

On Windows, run the commands below once, then use `Start.bat`. The dashboard supports Arabic and English via its language selector. Select the Director engine inside the video page or with `--engine=codex|claude|antigravity`. See [the Arabic usage guide](USAGE.ar.md) for details.

Double-click `Start.command` on macOS, or run `./Start.command` in a terminal on Linux: the first time it runs setup, then it starts the dashboard and opens it. Closing its window (or Ctrl+C) stops it. Or, step by step:

```bash
npm run setup     # installs npm packages, Remotion's headless Chrome, a Python .venv (numpy + scipy); checks the rest
npm run doctor    # system check (also in the dashboard → Settings)
npm start         # dashboard → http://localhost:4000
```

The Codex and Antigravity Directors launch with their own permission checks off (`--dangerously-bypass-approvals-and-sandbox`, `--dangerously-skip-permissions`). On macOS the dashboard's sandbox takes Codex's place (see Director below); Antigravity, and Codex on Linux and Windows, run unrestricted. For standalone CLI runs with scoped permissions instead, `npm run antigravity-permissions` adds the project's video command rules to global settings, preserving existing deny/ask rules and a backup. A denied tool or an empty result appears as an error in the Director, even if the CLI reports `SUCCESS`.

| Needs | For | Installed by `setup`? |
| --- | --- | --- |
| Node.js 22+ | everything | no: nodejs.org, `brew install node` (macOS), or your package manager / nvm (Linux) |
| npm packages (Remotion 4) | everything | yes |
| Remotion's headless Chrome | rendering, stills, screenshots | yes (`npx remotion browser ensure`) |
| ffmpeg + ffprobe | audio mastering, voice-over timing | no: `brew install ffmpeg` / `apt install ffmpeg` |
| Python 3 + numpy + scipy | sound design | yes, into `.venv` (unless system Python already has them); Debian/Ubuntu need `sudo apt install python3-venv` first |
| Codex CLI, Claude Code CLI 2.1.280+, or Antigravity CLI (`agy`), signed in | the Director chat only | no: install one CLI and sign in |
| ElevenLabs API key | voice-over (optional) | no: dashboard → Settings |

`setup` never installs system-wide software; it prints the exact fix instead.

## Layout

```
src/engine/                 shared, brand-free building blocks (never brand colours or copy)
src/brands/index.ts         finds every brand folder automatically (nothing to register)
src/brands/<brand>/
  index.ts                  this brand's video list (tools/new.mjs edits it)
  brand/                    shared by every video of this brand
    BRAND.md                product, sources of every file, brand rules
    theme.ts                palette (C), fonts (F), mapping onto engine roles (theme)
    fonts.ts                loads fonts from public/<brand>/brand/fonts/
    assets.ts               BRAND_ID + brandAsset("img/x.png")
    components/             brand signature components (e.g. a word-highlight effect unique to the app)
    shots.json · sfx.json · sfx_custom.py   brand-wide screenshots and signature sounds (optional)
  <video>/                  one video
    BRIEF.md / README.md    what this video is: goal, story by seconds, files used
    SHARE.md                the ready-to-post caption, written in the build step
    copy.ts                 every on-screen word
    timeline.ts             scene lengths in frames, in play order
    scenes/                 one component per scene
    Film.tsx                scene order + background + finish + sound
    Soundtrack.tsx          sound cues, placed from the timeline
    assets.ts               VIDEO_ID + asset("img/x.png") for this video's own files
    index.ts                formats (written by the dashboard), fps, theme, cuts (timeline.cuts), poster (thumbnail frame)
    shots.json · sfx.json · sfx_custom.py · voiceover.json   recipes for this video (optional)
    voiceover.gen.ts        generated by `npm run voice`, don't edit
src/brands/_starter/        template copied by `npm run new`; skipped by the finder, keep it compiling
                            (brand folders in src/brands/ and public/ are git-ignored: a fresh clone has none)

public/<brand>/brand/       brand files: fonts/, img/ (img/shots/), sfx/
public/<brand>/<video>/     files only one video uses: img/shots/, sfx/, vo/ (voice-over)
public/_shared/             any brand: img/grain.png, sfx/ (fallback sound kit)
out/<brand>/<video>/        renders + stills (git-ignored)

styles/library.json         your saved video styles (git-ignored; built-in ones are in tools/styles.mjs)
Start.command               double-click launcher: setup on first run, then the dashboard
tools/                      CLIs: new, render, stills, shot, synth_sfx.py, voice, copy-asset, setup, doctor,
                            video (the whole machine from a terminal, for AI agents), agent-skill
AGENTS.md                   entry point for AI agents (Codex, OpenClaw, Hermes, …)
.agents/skills/halal-motion-videos/   Agent Skill (agentskills.io): SKILL.md, scripts/video, references/
.claude/skills/, .opencode/skills/    links to that one skill, so Claude Code and opencode find it in the repo too
tools/dashboard/            the local dashboard: server.mjs, director.mjs (Claude chat), index.html
.director/                  git-ignored local state:
  settings.json               API keys (never read it)
  <brand>/<video>.json        Director chats and per-video settings
  <brand>/_brand.json         the brand's website and project folder
  browser/<brand>/            screenshot browser profile
  tmp/                        self-check stills and spectrograms, cleared after each Director run
.venv/                      Python for sound design (made by `npm run setup`, git-ignored)
```

## Commands

| Command | Does |
| --- | --- |
| `npm start` | local dashboard at http://localhost:4000 |
| `npm run setup` / `npm run doctor [-- --json]` | install what's missing / system check |
| `npm run video -- <command>` | drive everything from a terminal (for AI agents): `make` (autopilot), `status`, `ask`, `approve`, `render`, … — see "Agents" below |
| `npm run agent-skill [-- --remove]` | link the Agent Skill into `~/.agents/skills` (OpenClaw, Codex), `~/.hermes/skills/creative` (Hermes), `~/.openclaw/skills` |
| `npm run new -- <brand> [video]` | new brand + its `video01`, or the next video in an existing brand |
| `npm run studio` | Remotion Studio: brand folder → video folder → one composition per format |
| `npm run render -- <brand> [video] [format] [--frames=a-b] [--blur]` | MP4s to `out/<brand>/<video>/`, audio mastered to -16 LUFS; the video's `poster` frame becomes frame 0 (the thumbnail platforms show) and `stills/<name>-poster.jpg`; `--blur` = film-look motion blur (~8× slower) |
| `npm run stills -- <brand> <video> <frame…> [--format=…] [--dir=…]` | JPGs to `out/<brand>/<video>/stills/` (or `--dir`) |
| `npm run review -- <brand> <video> [--strip=12.5,31] [--safe-area=on|off]` | review sheets for the critique loop → `.director/tmp/<brand>-<video>/review/`; with a voice-over it hears the mix back (speech to text) |
| `npm run shot -- <brand> [video]` | real screenshots of the live site/app from `shots.json` → `public/<brand>/…/img/shots/` |
| `npm run appstore -- <brand> <app id or App Store URL>` | iOS apps: 1024 icon + full-size store screenshots → `public/<brand>/brand/img/store/`, the listing → `BRAND.md` |
| `npm run sfx -- <brand> [video] [--look]` | design sounds by code: the brand's kit (no video) or one video's → `public/<brand>/…/sfx/` |
| `npm run voice -- <brand> <video> [--only=id] [--force]` | ElevenLabs v4 voice-over from `voiceover.json` → `public/<brand>/<video>/vo/` + `voiceover.gen.ts`; a recorded line (`"file"`) is transcribed for its word timings instead |
| `npm run copy-asset -- <src> <public/…>` | copy files from anywhere (e.g. the product's project folder) into `public/` only |
| `npm run typecheck` | `tsc --noEmit` |

Composition ids are `<brand>-<video>-<format>`, e.g. `my-app-video01-vertical`.

## The dashboard (`npm start`)

- **Sidebar:** brands and their videos. `+` adds a video; the trash icon deletes a brand (type its name to confirm).
- **Header:** Settings (ElevenLabs key, default voice, model, system check), Open Studio, New brand.
- **Video page, top to bottom:**

| Card | What's in it |
| --- | --- |
| **Director** | Claude chat, thinking level; **Video** row (format 9:16 / 16:9 / both, length, Safe area switch, video language, voice language); **Voice-over** row (on/off, voice ID) |
| **Style** | pick or save a named style from the shared library |
| **Materials** | product website + project folder (per brand); drag-and-drop uploads (brand-wide or this video) |
| **Preview** | opens each format in Remotion Studio |
| **Render** | MP4 or stills, optional **film look** (motion blur), with a live queue on the right |
| **Outputs** | renders and stills, each with **Download** and **Delete** (to the Trash). A render only appears once it's finished. |
| **Docs** | the brief and the brand kit |

- **Deleting:** Delete (top right) removes a video. Deletes go to the system Trash as `MotionVideos …`: `~/.Trash` on macOS, the file manager's Trash on Linux (Restore puts items in `restored-from-trash/`).

## Director (the dashboard's Claude chat)

Each video page has a **Director** chat. It runs Claude Code headless in this repo (`claude -p`, resumed per video) with this file as its guide.

- **Model:** Opus 5.5 (`claude-opus-5-5`) on whatever Claude Code is logged in with. Needs Claude Code CLI 2.1.280+. Set in `tools/dashboard/director.mjs` → `MODEL`.
- **Claude Code check:** the dashboard runs `claude auth status` (no tokens). If Claude Code is missing, too old or logged out, the Director shows how to fix it and disables Send; the rest of the dashboard keeps working.
- **Thinking:** chosen per message: Medium, High (default) or Extra high (`--effort medium|high|xhigh`). The last choice is remembered per video.
- **Step 1 of 3 · Brief:** Claude fills the brand kit (if it's still the starter) and `BRIEF.md`, then stops. The page shows **Approve brief**.
- **Step 2 of 3 · Storyboard:** Claude captures the real product and builds the look, then renders **4 key frames** (hook, key feature, climax, end card) into `out/<brand>/<video>/storyboard/` and stops. The page shows them with **Approve storyboard & build**; a wrong look costs minutes here, not a whole build.
- **Step 3 of 3 · Build:** Claude builds the whole video in that look: sound, voice-over, every scene. It runs `npm run typecheck`, then the **critique loop** (below) until every score is 8+.
- **Engine:** Claude Code by default. Codex or Antigravity runs only when picked (video page or `--engine=`), never as a silent fallback.
- **Allowed without asking** (Claude's permission rules; Codex gets the sandbox below instead):
  - Read, edit and search files in the repo; web fetch and search.
  - Download assets with `curl`.
  - `npm run copy-asset`, `shot`, `sfx`, `voice`, `stills`, `typecheck`; `npm install`.
  - Basic file commands: `ls`, `mkdir`, `cp`, `file`, `sips` (macOS), `ffprobe`, `unzip`.
  - Everything else is denied: no git, no MP4 renders, never `.director/settings.json` or the browser profiles.
- **Sandbox for Codex (macOS):** it brings no permission rules, so `tools/dashboard/sandbox.mjs` runs it under `sandbox-exec`.
  - **Writes:** only inside the repo, never `.git`, `.director/settings.json`, the browser profiles or MP4s in `out/`. The product folder stays read-only.
  - **Reads:** never `.director/settings.json` or `.director/browser/`; nothing in the home folder beyond the repo, the product folder and the tools it runs.
  - **`voice` and `shot`:** they need the key or a browser profile, so the dashboard runs them for the run (`tools/broker.mjs`, with a per-run ticket): this video and its brand kit only, web addresses only.
  - **Login:** Codex keeps it in `~/.codex/auth.json`; the sandbox opens that folder, so Codex can read its own login (it needs it), but no other app's: the Keychain stays closed.
  - **Linux and Windows:** no such sandbox. There Codex runs unrestricted and the page shows a "No guardrails" note.
- **Antigravity runs unsandboxed everywhere** (with the "No guardrails" note): it reads its sign-in from the macOS Keychain through the `security` tool, and opening that to a sandbox would also open every password saved through the tool, e.g. GitHub CLI's token.
- **One video per brand at a time:** videos of one brand share its kit (BRAND.md, theme, brand sounds) and its screenshot browser profile.
  - A second video of the same brand waits ("Waiting for …"), and the two take turns, one step each.
  - Different brands run in parallel.
- **Project folder:** the page can save the product's own source folder per brand. Claude gets read access (`--add-dir`); Edit/Write there are hard-denied. It copies assets out with `npm run copy-asset`.
- **Materials:** uploads land in `public/<brand>/brand/` or `public/<brand>/<video>/`, sorted into `img/`, `fonts/`, `sfx/`, `video/`.

When you are the Director, keep replies short: first line says what happened, then a few bullets.

## Agents (OpenClaw, Hermes, Codex, scripts)

Another AI agent can run the whole machine from a terminal with `npm run video` (`tools/video.mjs`). No browser needed. It talks to the dashboard server and starts it in the background (log: `.director/dashboard.log`).

- **Autopilot:** `npm run video -- make <brand> <video|next> "<about>" [--url= --folder= --app-id= --length= --format= …] [--render[=blur]]`.
  - `--wait` keeps the command open until the MP4 is mastered. It streams milestones to stderr and ends with the MP4 path (`mp4` in `--json`), for cron jobs and scripts.
  - `--app-id` fetches App Store assets first (`npm run appstore`).
  - The agent approves every step itself: brief, then storyboard, then build, then render.
  - It returns at once. The agent polls `npm run video -- status <brand> <video> --json`.
  - **`blocked`:** you asked a question; the agent answers with `ask` and the autopilot carries on.
  - **`failed`:** it retries a crashed step once, then stops; `make` again resumes.
  - `--stop-at=brief|storyboard` pauses there so the agent can review first.
  - The autopilot lives in the server (`director.autopilot`), not the CLI, so agent shell timeouts don't matter.
- **When the agent is driving:** the page shows an "Autopilot" line. When you are the Director, "the user" is then an agent: still stop at the end of each step as usual, because the autopilot approves.
- **Agent files:**
  - `AGENTS.md` is the entry point.
  - `.agents/skills/halal-motion-videos/` holds the Agent Skill (SKILL.md frontmatter works for agentskills.io, OpenClaw and Hermes). It lives only there: `.claude/skills/` and `.opencode/skills/` are links to it, so every agent opened in the repo finds the same skill (Codex and Antigravity read `.agents/skills/` directly). On Windows, Git makes those links only with `git config core.symlinks true` and Developer Mode; otherwise use `npm run agent-skill`.
  - Its `scripts/video` finds the repo even through a symlink.
  - `npm run agent-skill` installs it for every agent, outside the repo too.
  - The skill opens with "Are you the Director?": the Director (in the repo, so it sees the skill too) must never drive `npm run video`.
- **Keep in sync:** `AGENT_API` in `tools/video.mjs` and `tools/dashboard/server.mjs` must match. Bump both when the CLI needs something new from the server; an older running dashboard then gets a clear "restart it" message.

## Video settings the Director passes to you

The dashboard sends these into every Director message; follow them without being asked.

- **Format:** 9:16, 16:9 or both. The dashboard writes it straight into the video's `index.ts` `formats`, so don't change that line; design every scene for the chosen shape(s).
- **Length:** seconds, default 30. Size `timeline.ts` to it (±1 s), and narration must fit inside it.
- **Safe area:** on (default) or off, per video (dashboard switch, or `npm run video -- set … --safe-area=on|off`). On: follow "Safe area" under Design quality, and `review` tints the unsafe edges red. Off: nothing is laid over this video (an App Store preview, a website hero), so the frame is yours edge to edge.
- **Video language:** default English. All on-screen text is in it; set the theme `direction` to match.
- **Voice language / accent:** default "English — American accent". See Voice-over below.
- **Style:** a named description of look and motion from the shared library `styles/library.json`. Any video of any brand can use it, and it's managed in the Style card. Apply it within the brand kit's colours and fonts.
- **Website / project folder / files:** where to find the real product (see Screenshots and the project-folder note above).

## Design quality (no "mid")

"Mid" is the default AI look: centered text on a gradient, everything fading in, every scene the same layout. Avoid it:

- **A new composition every scene:** change the layout, the scale, the angle. Something new every 2–4 s.
- **Motion with weight:** use springs (`springAt`, `springTo`, `SPRING.snappy | bouncy | soft`) for anything that moves into place. It speeds up, overshoots a hair and settles. Use `prog`/`ease` only for camera drifts and fades.
- **Premium type:** headlines rise word by word from behind a mask (`MaskRise`), not a plain fade.
- **Connected scenes:** match cuts (an element carries across the cut), camera pushes and pulls, a light sweep at cuts. Best of all, a persistent object that travels through scenes and changes role; every transition is motivated by something on screen.
- **The first 2 s are the hook:** the most striking frame of the film goes there, not a logo fading in.
- **Time to read:** pace comes from motion and cuts, never from pulling text away early. A line the viewer must read stays fully in and still for about 0.3 s per word, at least 0.8 s for a short label and 2 s for the final line: fast in, then hold. Lines revealed one after another hold too; don't land a new line on every beat.
- **Timing numbers** (defaults to leave on purpose, not by accident): entrances 0.6–1 s; exits about half that, easing in (they leave fast); about 0.09 s between words, 0.2–0.25 s between list items or cards; typing about 0.035 s per character.
- **One accent, one hero:** one accent colour, and it means something (the answer, the change, the winner): if everything is accented, nothing is. One hero moment per video; build to it, don't spend it early.
- **Nothing dead-still:** grain (`Finish`), a slowly drifting background, idle elements that breathe (a blinking caret, a slow turn). Text holds still while it's being read.
- **Safe area** (when the video's Safe area switch is on, the default): key text and buttons stay 5% from every edge. On 9:16 (TikTok, Reels, Shorts) keep them out of the top 12%, the bottom 22% and the right 12%, where the app lays its header, caption and buttons over the video. The phone review sheets tint those edges red.
- **Show it in use:** the product doing its job (entry → key action → result) beats a page describing it. Simulate the tap, the swipe, the typing, the result appearing.
- **Clear to a stranger:** after one viewing, someone who's never heard of the product knows what it does, who it's for and how to get it.
- **Every frame postable:** any frozen frame should be worth sharing. The strongest settled one becomes the `poster` in `index.ts`: renders put it on frame 0, the thumbnail X, Slack, Discord and WhatsApp show.
- **Clean scene changes:** a plain crossfade between two busy layouts is a muddy double exposure. Stagger it (old out, then new in) or dip through the background.
- **Real data or a label:** anything illustrative (made-up numbers, sample accounts) carries `<ExampleBadge />`, which shows "Example data". Show real integrations only.
- **References:** when the user gives one, copy its grammar (pacing, type, transitions), never its content.

## Critique loop (Claude reviews its own video)

`npm run review -- <brand> <video>` renders frames at phone size and lays them out in `.director/tmp/<brand>-<video>/review/`:

| Sheet | What | Judge |
| --- | --- | --- |
| `contact-<format>-N.png` | a frame every 0.5 s, 24 per sheet | pacing, variety, composition |
| `phone-<format>-N.png` | a frame every 2 s at real phone size (360 px wide), unsafe edges tinted red when Safe area is on | can every word be read on a phone? Is anything important under the red? |
| `strip-<format>-<t>.png` | 12 consecutive frames around every scene change (`cuts` in `index.ts`) and every `--strip=<t>` second | scene changes and fast moves: muddy crossfades, glitches, blur, overlaps |
| `wave.png` | the soundtrack as a waveform, scene changes as coral lines, with its loudness and true peak (the raw mix: renders master it) | does every whoosh and hit peak on its moment? Dead gaps? "TOO HOT"? |
| `voice-<format>-N.png` (with a voice-over) | the mix heard back by speech to text: the picture during each spoken phrase, labelled with what's said; also printed as "Heard:" and shown in blue on `wave.png` | does the picture show what the voice says, while it says it? |

Be a harsh motion director, not a proud author. Read every sheet and score each item 1–10:

1. **Hook:** does the first 2 s grab you?
2. **Readability:** can you read every word at phone size, and does each line stay up long enough to read (about 0.3 s per word)?
3. **Motion quality:** springs and eased moves, nothing robotic or floaty.
4. **Variety:** something new every 2–4 s.
5. **Composition:** a clear focal point; nothing clipped, overlapping or crowded; no muddy double exposure at a scene change; nothing important in the red edges.
6. **Data accuracy:** every claim comes from the product, illustrative numbers are labelled, no real personal data shows.
7. **Sound sync:** in `wave.png`, every whoosh and hit peaks on its moment; every cut, reveal and tap has its cue on the right frame; with a voice-over, the voice sheets show the picture saying what the voice says, when it says it.
8. **Clarity:** after one viewing, would a stranger know what it is, who it's for and how to get it?

Fix the 3 biggest problems, re-run, and repeat until every score is 8+ (at most 4 rounds in a Director run). The sheets are temporary.

## Screenshots (a real headless browser)

**Capture the real product before rebuilding anything.** `npm run shot` drives a headless Chrome: Remotion's bundled one, or Google Chrome/Edge. It can open a live site or web app, act like a user, and save crisp PNGs.

1. **Write** `src/brands/<brand>/brand/shots.json` (brand-wide) or `src/brands/<brand>/<video>/shots.json`:

```json
{ "url": "https://example.com", "device": "iphone",
  "shots": [
    { "id": "home", "steps": [ { "waitGone": "text=Loading" } ] },
    { "id": "home-en", "steps": [ { "waitGone": "text=Loading" }, { "click": "text=EN" } ] },
    { "id": "review", "steps": [ { "click": "text=Review" }, { "wait": 800 } ] },
    { "id": "site", "device": "desktop", "full": true }
  ] }
```

2. **Run:**
   - `npm run shot -- <brand>` (or `<brand> <video>`); `--only=a,b` for some shots.
   - A quick single shot: `npm run shot -- <brand> --url=https://… --id=home --device=desktop`.
3. **Output:** `public/<brand>/<brand|video>/img/shots/<id>.png`. **Read every PNG** to check it, then use it, e.g. `<Phone src={brandAsset("img/shots/home.png")} />`.

**Options:**

- **Devices:**

| Device | Size |
| --- | --- |
| `iphone` | 390×844 @3 → 1170×2532 |
| `iphone-max` | 430×932 @3 |
| `ipad` | 820×1180 @2 |
| `laptop` | 1280×800 @2 |
| `desktop` | 1440×900 @2 |
| custom | `WxH` |

- **Per shot:** `path` (relative to `url`), `full` (whole page), `dark`, `locale`, `settle` (ms to wait after load; default 1200).
- **Steps** (run in order):
  - `wait` (ms)
  - `waitFor` / `waitGone` (a selector, with an optional `timeout` in seconds)
  - `click`, `hover`
  - `type`, `key`
  - `scroll` (px, or a selector)
  - `eval` (JavaScript)
- **Selectors:** CSS, or `text=…` to match the visible label.

**Browser memory:** the browser profile is kept per brand in `.director/browser/<brand>/`, so language choices, logins and big first-load downloads survive between runs. `--fresh` starts clean. Useful when an app downloads a large model or data on first load.

**What screenshots can't do:** screens that need a microphone, camera or a real device (live recitation, for example). Rebuild those in React, matching the captured screens exactly.

**iOS apps without a website:** `npm run appstore -- <brand> <App Store id or apps.apple.com URL>` asks Apple's public lookup API.

- **Icon:** the 1024×1024 icon goes to `public/<brand>/brand/img/store/icon.png`.
- **Screenshots:** the full-size store screenshots go to `iphone-01.png …` and `ipad-01.png …`.
- **Listing:** name, seller, link, and the app's own description and release notes go into an "App Store listing" section of `BRAND.md` (quote copy from it).
- **Website:** the brand's website becomes the App Store page if none is set.
- **Re-running:** refreshes the files and that section. `--country=sa` picks the store; `--no-ipad` skips iPad shots.

## Sound design (sounds made by code)

You are the sound designer. **Invent sounds that fit the video's style and motion**, and build them by code with `tools/synth_sfx.py`: numpy/scipy synthesis, no samples, no sound library, no AI audio.

**Where sounds live:**

| Scope | Recipe | Command | Output | Use in code |
| --- | --- | --- | --- | --- |
| **Brand** signature (logo sting, UI tap, house whoosh) — reused by every video | `src/brands/<brand>/brand/sfx.json` | `npm run sfx -- <brand> --look` | `public/<brand>/brand/sfx/` | `brandAsset("sfx/<id>.wav")` |
| **This video** only | `src/brands/<brand>/<video>/sfx.json` | `npm run sfx -- <brand> <video> --look` | `public/<brand>/<video>/sfx/` | `asset("sfx/<id>.wav")` |

- **Flags:** `--only=a,b` redoes some; `--force` redoes all. Unchanged sounds are skipped.
- **Peaks:** each run also writes `sfx.gen.ts` next to the `sfx.json`, with `SFX["<id>"] = { src, seconds, peak }`. The shared kit's table is `SHARED_SFX` in the engine. `peak` is when the sound is loudest.
- **Cues land on the peak:** give a cue `peak` and its `at` becomes the frame where the loudest moment hits, e.g. `{ at: S.feature.from, src: asset(SFX["whoosh-in"].src), peak: SFX["whoosh-in"].peak, vol: 0.45 }`. A whoosh peaks exactly on the cut, with no guessing how early to start it.
- **Brand sounds:** add to the brand kit, but don't change a brand sound other videos already use. Make a new id instead.
- **The product's own sounds:** Apple apps often ship them as Apple Lossless (ALAC), which Remotion and Chrome can't play. `copy-asset`, uploads and `render` convert them automatically: `.m4a` to AAC under the same name, `.caf`/`.aiff` to a `.wav` beside it. For a file you downloaded yourself, run `node tools/audiofix.mjs <file>`.

### Three levels of creativity

**1. Built-in types, tuned:**

| Type | What it is | Main params |
| --- | --- | --- |
| `whoosh` / `riser` / `swish` | filtered-noise sweeps (stereo) | `dur`, `from`/`to` (Hz), `attack`, `q`, `pan` |
| `reverse` | swell that stops dead | `dur`, `from`, `to` |
| `hit` / `impact` | sub thump / thump + noise burst | `from`/`to` (Hz drop), `dur`, `decay`, `click`, `body` |
| `tick` / `click` / `pop` | UI details | `freq`, `dur` / `from`, `to` |
| `chime` | soft bell (tonal, use sparingly) | `freq`, `dur`, `bright` |
| `shimmer` / `glitch` / `bed` | sparkle / digital stutter / quiet bed | `dur`, `from`/`to` · `bursts`, `crush` · `low`, `high`, `wobble` |

Every sound takes `peak` (0–1) and `seed`; a new seed gives a new take.

**2. Layers + effects.** Stack anything with `"type": "layer"`, and shape any sound or layer with `"fx"`:

```json
{ "id": "logo-sting", "type": "layer", "layers": [
    { "type": "reverse", "dur": 0.8, "from": 1500, "to": 9000 },
    { "type": "impact", "at": 0.8, "body": 0.4 },
    { "type": "chime", "at": 0.8, "freq": 660, "dur": 2.4, "gain": 0.35, "fx": [ { "reverb": { "size": 2.2, "mix": 0.45 } } ] }
] }
```

Effects, applied in order:

- **Filters:** `lowpass`, `highpass`, `bandpass [lo, hi]`
- **Time and pitch:** `pitch` (ratio), `reverse`, `trim [a, b]`
- **Space:** `echo {delay, feedback, mix}`, `reverb {size, mix}`
- **Colour:** `drive`, `crush`, `tremolo {rate, depth}`
- **Placement:** `pan`, `gain`, `fade [in, out]`

**3. Your own synthesis.** Write functions in `sfx_custom.py` next to the `sfx.json`, then use `{ "id": "x", "type": "custom", "fn": "heartbeat", "params": {...} }`:

```python
def heartbeat(p, kit):
    np = kit.np
    t = kit.time(p.get("dur", 1.2))
    thump = np.sin(2 * np.pi * 55 * t) * np.exp(-t * 11)
    return thump + kit.delay(thump, 0.28)[: len(t)] * 0.7   # mono or stereo float array
```

`kit` provides: `np`, `SR`, `rng` (seeded), `time(dur)`, `pink(n)`, `sweep_filter`, `env`, `butter`, `sosfilt`, `delay(x, s)`, `fx(x, [...])`, and every built-in `make_*` function.

### Check what you made (you can't listen)

- **Stats:** each generated sound prints length, peak and RMS level, brightness (spectral centroid), attack and tail. Compare them with your intent, e.g. "a soft UI tap should be short, bright, and under -6 dBFS".
- **Spectrograms:** `--look` writes one per sound to `.director/tmp/<brand>-<video|brand>/sfx-<id>.png`. Read it.
  - **Top strip:** loudness over time.
  - **Below:** frequency on a log scale, with faint lines at 100 Hz, 1 kHz and 10 kHz. Bright means loud.
- **Iterate** until each sound has the right shape.

### Mixing habits that work

- **Accent, don't narrate:** cuts, reveals and taps get sounds; continuous motion (drifts, grain, slow turns) stays silent.
- **A cue on every cut:** a whoosh whose peak lands on the cut, plus a hit or soft thump on it.
- **Ticks on UI beats:** light ticks as each item lands.
- **Reveals:** shimmer on a logo or mark reveal.
- **The payoff:** one riser per video, peaking on the end card (or the hero moment), plus the video's one big impact on it. Don't spend either earlier.
- **Levels:** bed around 0.2; whooshes 0.3–0.5; hits 0.5–0.85; under a voice-over, halve everything. Duck the bed under the hero moment too.
- **One key:** tonal sounds (chimes, shimmers, stings, the bed) share one key per video, e.g. every `chime` `freq` on the notes of one scale. The soundtrack then sounds composed, not collected.
- **Pitch tells progress:** a sequence of tonal cues (items landing, steps completing) rises in pitch and resolves on the payoff.
- **Pan follows the picture:** a sound for something on the left sits left, and a sequence sweeps across. Cues can't pan when they play (Remotion has no pan), so design panned variants in `sfx.json`, e.g. `"fx": [{ "pan": -0.4 }]`.

Running `npm run sfx` with no arguments rebuilds the shared fallback kit in `public/_shared/sfx/`. It reproduces the existing files exactly.

## Voice-over (ElevenLabs Eleven v4)

The dashboard's **Settings** holds the ElevenLabs API key, default voice ID (`NOpBlnGInO9m6vDvFkFC`) and model. They're stored in `.director/settings.json`. **Never read that file.** The voice tool reads the key itself.

Each video's Director panel has:

- **Voice-over on/off:** locked off until an ElevenLabs key is saved, then on by default
- **A voice ID override** for that video
- **Two free-text fields:** video language (default "English") and voice language (default "English — American accent")

When voice-over is on, plan narration in the brief and generate it in the build without being asked.

### 1. Write `src/brands/<brand>/<video>/voiceover.json`

```json
{
  "language": "en",
  "stability": 0.45,
  "similarity": 0.8,
  "lines": [
    { "id": "intro",   "text": "[American accent][warm, unhurried] Every verse, heard. Every word, checked." },
    { "id": "feature", "text": "[quietly curious] Miss a vowel? [short pause] It stops, [gently] and shows you." },
    { "id": "end",     "text": "[Gradually building energy] Recite — and the Book corrects you.", "stability": 0.3 }
  ]
}
```

- **One line per scene.** `id` is a code name: letters, digits, underscore.
- **Optional fields:**
  - `voice` overrides the voice ID.
  - `model` is `eleven_v4` (best) or `eleven_v4_turbo` (fast).
  - `seed` makes a take repeatable.
  - A line-level `stability` or `similarity` overrides the file default.
- **`language`** is the ISO 639-1 code of the voice language, e.g. `en`, `ar`.

### 2. Generate

```bash
npm run voice -- <brand> <video>                 # all lines; unchanged ones are skipped (cached)
npm run voice -- <brand> <video> --only=intro    # redo one line (e.g. after changing its text)
npm run voice -- <brand> <video> --force         # redo everything (e.g. new voice)
npm run voice -- <brand> <video> --id=test --text="[whispering] Testing."   # one-off sample, not added to the video
```

- **Audio:** `public/<brand>/<video>/vo/<id>.mp3`
- **Timings:** `voiceover.gen.ts` next to `voiceover.json`, with `VO.<id> = { src, seconds, words: [{ text, start, end }] }`. Word timings come from ElevenLabs timestamps; they can be empty if the model doesn't return them.

### 3. Use it in the video

- **Scene lengths:** base them on `VO.<id>.seconds`, e.g. `Math.ceil((VO.intro.seconds + 0.6) * FPS)` in `timeline.ts`, which leaves breathing room.
- **Placement:** put each line in `Soundtrack.tsx`, e.g. `{ at: S.intro.from + 8, src: asset(VO.intro.src), vol: 1 }`.
- **Mix:** drop the bed and sfx to about half while the voice plays.
- **Sync:** time every on-screen word the voice says from `VO.<id>.words` (`start` and `end` are seconds from the line's start), never by guessing. Keep one place that says where each line starts, used by both the scenes and `Soundtrack.tsx`, e.g. in `timeline.ts`:

```ts
/** Where each voice line starts, in frames from its scene's start (Soundtrack.tsx places the lines here too). */
export const VO_AT = { intro: 8, feature: 4 } satisfies Record<VoId, number>;
/** Frame (in its scene) where word `i` of a line is spoken: reveal that word's visual on it. */
export const wordAt = (id: VoId, i: number) => VO_AT[id] + Math.round(VO[id].words[i].start * FPS);
```

- **Check it by ear:** you can't listen, so `npm run review` listens for you. It hears the finished mix back with speech to text and prints "Heard:" (each phrase with the time it really lands), marks the phrases on `wave.png`, and makes `voice-<format>-N.png` (the picture while each phrase is heard). If the picture doesn't show what's said when it's said, fix the timing, not the words.

### Your own recording

The user can give you a recorded voice-over instead of ElevenLabs:

1. Copy it into the video's folder: `npm run copy-asset -- "<the recording>" public/<brand>/<video>/vo/`.
2. Give it a line with `"file"` instead of `"text"` in `voiceover.json`: `{ "id": "story", "file": "vo/story-take2.m4a" }`. One recording can be one line, or cut it into a line per scene first.
3. `npm run voice -- <brand> <video>` doesn't generate it: it transcribes it (ElevenLabs speech to text, same key), so `VO.story` gets `seconds`, `words` with timings and `text` (what was heard), like a generated line. Time the scenes to it the same way. The speaker's words are theirs: never add claims the recording doesn't make.

### Eleven v4 cheat sheet

- **Only two settings:** `stability` and `similarity` (0–1). v4 has no style, speed or SSML.
  - Lower stability means more expressive and varied delivery.
  - Higher stability means steadier delivery; use it for calm or reverent narration.
- **Audio tags** are free-form plain-language directions in `[brackets]`, placed before the words they shape:

| Kind | Examples |
| --- | --- |
| Emotion / delivery | `[warm]` `[excited, happy]` `[calm]` `[annoyed]` `[quietly curious]` `[measured]` `[lower, thoughtful]` `[tender]` `[urgent]` |
| Pacing / narration | `[Quiet, measured narration]` `[Gradually building energy]` `[Quick, light, playful pace]` `[short pause]` |
| Volume | `[whispering]` `[under his breath]` `[shouting]` |
| Non-verbal | `[soft chuckle]` `[sigh]` `[laughs]` `[giggle]` `[Pause, dry amusement]` |
| Accent / language | `[American accent]` `[British accent]` `[said in a gentle Egyptian accent]` |

- **Tag habits:**
  - One or two tags per sentence is plenty.
  - Tags aren't perfect. Regenerate a line (`--only=<id>`, optionally a new `seed`) rather than stacking tags.
- **Limits:** 10,000 characters per line, 90+ languages.
- **Sacred text:** for Quran or other sacred text, keep stability high and tags minimal and respectful. Never add laughs or sound effects near it.

## Workflow: "make a new video for X"

In the dashboard this is: **New brand** (or `+`) → fill Materials → pick Style / Video settings → tell the Director → **Approve & build**. By hand:

1. **Scaffold.** `npm run new -- <brand>` makes a new brand with `video01`; for an existing brand it adds the next `videoNN`.
2. **Brand kit** (new brands only). Fill in `brand/BRAND.md`.
   - Put the real colours in `theme.ts`, set `direction` (`"rtl"` for Arabic).
   - Put font files in `public/<brand>/brand/fonts/` and load them in `fonts.ts`.
   - Put the logo and the app's own sounds in `public/<brand>/brand/`.
3. **Screenshots.** Capture the real product with `shots.json` + `npm run shot`.
   **Storyboard.** Build the look and 4 key frames (hook, key feature, climax, end) and get them approved before building everything.
4. **Brief.** Fill in `<video>/BRIEF.md`: goal, platform, formats, length, story table by seconds (with a voice-over column if narrated).
5. **Copy.** Put every on-screen word in `copy.ts`. Quote the product's own site or store listing.
6. **Timeline.** Set scene lengths in `timeline.ts` (to the voice-over durations if narrated) and list the scenes in `Film.tsx`.
7. **Scenes.** Build each scene in `scenes/` from engine parts and the screenshots. Use `p(vertical, horizontal)` for per-format values.
8. **Sound.** Design sounds (`sfx.json` + `npm run sfx`), generate voice-over (`voiceover.json` + `npm run voice`), and place every cue in `Soundtrack.tsx` relative to `SCENES.<key>.from`.
9. **Verify.** Run `npm run typecheck`, run the critique loop (`npm run review`) until every score is 8+, then ask the user to review it in Studio.
10. **Deliver.** Set `poster` in `index.ts` to the strongest settled frame, and write `SHARE.md`: a 1–3 sentence caption, postable as-is, in the video's language, only the product's own claims.

## Engine parts (`src/engine`)

- **Timing:** `buildTimeline`, `prog`, `ease`, `lerp`, `noise`
- **Springs:** `springAt(frame, start, fps, feel)`, `springTo(frame, fps, base, [[frame, to], …])`, `SPRING.snappy | bouncy | soft`
- **Layout:** `useLayout()` → `W`, `H`, `portrait`, `p(vertical, horizontal)`
- **Scene shell:** `SceneFrame` (depth entry, push/drop exit), `SceneTrack` (sequences + light `Sweep` at cuts)
- **Surfaces:** `Backdrop`, `Finish` (grain + vignette)
- **Text:** `MaskRise` (words rise from behind a mask on a spring), `Headline` (word-by-word, accent payoff line), `Kicker`, `Reveal`, `ExampleBadge`
- **UI:** `Card`, `Phone` (screenshot in an iPhone shell), `Waveform`, `LiveDot`, `Icon` (lucide)
- **Sound:** `SoundCues` (cues with `peak`), `AudioBed`, `shared("sfx/…")`, `SHARED_SFX`
- **Formats:** `VERTICAL`, `HORIZONTAL`, `SQUARE`, `PORTRAIT`

Engine components read colours from the `Theme` (via `useTheme()`), never from a brand. Anything brand-specific belongs in `src/brands/<brand>/`. Anything that only one video needs belongs in that video's folder.

## Rules

- **Don't render MP4s unless asked.** Renders are slow and large. Verify with `npm run typecheck`. Temporary stills and spectrograms to check your own work are fine if you delete them afterwards; the Director clears `.director/tmp/` automatically.
- **Claims come from the product.** Anything the video asserts about it (names, numbers, features, quotes) must be in its site, store listing, files or UI. Hooks, jokes, framing and transitions are yours to invent.
- **No real personal data on screen.** Screenshots come from live, often logged-in apps: swap real customer or user names, emails, phone numbers, internal URLs and private content for plausible fictional stand-ins, with `<ExampleBadge />`. Never put a key or secret in a video.
- **Follow brand rules.** Each brand's `BRAND.md` lists its rules, e.g. never split Arabic words into letters, never distort sacred text.
- **Never read `.director/settings.json`.** It holds API keys; the tools read them for you.
- **Don't commit or push unless asked.**
