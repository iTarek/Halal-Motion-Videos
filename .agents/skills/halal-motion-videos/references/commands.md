# Command reference

`scripts/video <command>` (in this skill) = `npm run video -- <command>` (in the repo root).

- **Server:** the tool talks to the dashboard server on `127.0.0.1:4000` (`PORT=` to change). If the server isn't running, it starts it in the background and logs to `.director/dashboard.log`.
- **JSON:** `--json` on any command prints JSON instead of text. Errors print `{ "ok": false, "error": "…" }` and exit with 1.

## Commands

| Command | Does |
| --- | --- |
| `make <brand> <video\|next> ["<about>"] [settings] [--stop-at=brief\|storyboard] [--render[=blur]] [--app-id=…] [--effort=…]` | Starts the autopilot: brief, then storyboard, then build, then render. It approves each step itself and returns at once. Creates the brand/video if missing. Run it again to resume after `failed`, `paused` or `stopped`, or to render a built video (`make b v --render`). `--app-id` runs `fetch-assets` first. |
| `fetch-assets <brand> <App Store id or URL> [--country=sa] [--no-ipad]` | For iOS apps (no website needed). Asks Apple's public lookup API, then downloads the 1024×1024 icon and the full-size iPhone/iPad store screenshots to `public/<brand>/brand/img/store/`. Writes the listing into the brand's BRAND.md: name, seller, link, and the app's own description and release notes. Sets the brand's website to the App Store page if none is set. Creates the brand if missing. Re-run to refresh. If the app isn't in the US store, it tries other stores, or pass `--country`. |
| `status <brand> <video>` | Where the video is and what to do next (fields below). |
| `ask <brand> <video> "<message>"` | Sends a message to the Director: answer its question, or ask for changes. Un-blocks a `blocked` autopilot. |
| `approve <brand> <video>` | Approves by hand: the brief (then Claude builds the storyboard) or the storyboard (then Claude builds the video). Refused when there's nothing to approve. |
| `stop <brand> <video>` | Stops Claude and the autopilot. |
| `render <brand> <video> [--format=vertical\|horizontal] [--blur] [--frames=0-89]` | Queues an MP4 render. Default is all formats; audio is mastered to -16 LUFS. `--blur` is the film look, about 8× slower. |
| `outputs <brand> <video>` | Rendered MP4s and stills, newest first. |
| `list` | Brands and their videos. |
| `new <brand> [video]` | A new brand (with `video01`) or the next video in a brand. `make` does this for you. |
| `set <brand> [video] [settings]` | Changes settings without starting anything. |
| `styles` | Saved styles (name, id, description) for `--style`. |
| `voice-settings [--voice-id=…] [--model=eleven_v4\|eleven_v4_turbo] [--key-stdin]` | ElevenLabs settings. The key is read from stdin only. |
| `doctor` | System check (`ok: false` means something required is missing: run `npm run setup`). |
| `where` | Prints the repo root. |

`--wait` on `make`, `ask`, `approve` and `render`, for scripts, cron jobs and agents that prefer one long command:

- **Stays open:** until Claude, the autopilot and any render for that video are idle, including rendering and audio mastering.
- **Streams milestones to stderr:** a timestamped line each, also with `--json`, e.g. `[14:02:10] brief ready: …/BRIEF.md`, `storyboard ready: 4 frames in …`, `storyboard approved → building the whole video`, `render · my-app-video01-vertical: 40%`, `render · saved out/…/my-app-video01-vertical.mp4`, `autopilot blocked`, `the Director asks: …`. A heartbeat line appears every minute.
- **Prints the final status on stdout:** with `--json` that's one JSON object whose `mp4` holds the finished MP4 paths. In text mode, `MP4: <path>` lines come last (`tail -1`).
- **Limit:** `--timeout=<s>`, default 5400.
- **In scripts:** call `node tools/video.mjs …` or `npm run --silent video -- …`, so npm's banner doesn't mix into stdout. `scripts/video` already does this.

**Exit codes:** `0` ok · `1` error, failed step or failed render · `2` blocked (the Director asked a question).

## `status --json`

```json
{
  "ok": true,
  "brand": "my-app",
  "video": "video01",
  "step": "build",
  "running": true,
  "activity": "Checking frames (stills)",
  "waiting": false,
  "autopilot": { "status": "running", "stopAt": null, "render": true, "note": "", "renderJob": null, "started": 1760000000000, "updated": 1760000000000 },
  "engine": "claude",
  "claude": "ok",
  "codex": "ok",
  "antigravity": "Install Antigravity CLI from antigravity.google/download, then run `agy` once to sign in. The IDE alone is not the CLI.",
  "lastReply": "Built: 8 scenes, every critique score 8+ …",
  "brief": "/…/src/brands/my-app/video01/BRIEF.md",
  "share": "/…/src/brands/my-app/video01/SHARE.md",
  "storyboard": ["/…/out/my-app/video01/storyboard/hook-vertical-0.jpg", "…"],
  "render": { "job": 3, "status": "running", "progress": 42, "label": "Render my-app/video01 · all formats" },
  "outputs": ["/…/out/my-app/video01/my-app-video01-vertical.mp4"],
  "posters": ["/…/out/my-app/video01/stills/my-app-video01-vertical-poster.jpg"],
  "mp4": [],
  "settings": { "format": "both", "length": 30, "language": "English", "voiceLanguage": "English — American accent", "voiceover": true, "voiceId": "…", "style": null, "website": "https://…", "folder": "/…" },
  "next": "Director is working (Checking frames (stills)). Check again in a minute or two."
}
```

| Field | Meaning |
| --- | --- |
| `ok` / `brand` / `video` | `true` when the command worked / which video this is |
| `step` | `brief` → `storyboard` → `build` |
| `running` / `activity` | The Director is working right now / on what |
| `waiting` | `true` while this video waits its turn behind another video of the same brand (they share the brand kit) |
| `brief` | `BRIEF.md` once the Director has written it, else `null` |
| `storyboard` | The 4 storyboard frames (hook, key feature, climax, end card), once made |
| `settings` | The video's settings: `format`, `length`, `language`, `voiceLanguage`, `voiceover`, `voiceId`, `style`, `website`, `folder` (change them with `set`) |
| `engine` | The Director engine for this video: `claude` (default), `codex` or `antigravity` |
| `autopilot` | `null` if never started. `status`: `running`, `blocked`, `paused`, `failed`, `done`, `stopped`. `note` says why. |
| `claude` / `codex` / `antigravity` | `"ok"`, or how to fix that CLI (missing, too old, logged out) |
| `lastReply` | The Director's latest message (its question when `blocked`, its error when `failed`) |
| `render` | The latest render job for this video: `queued`, `running`, `done`, `failed`, `cancelled`, with `progress` 0–100. `log` holds the last lines when it failed. |
| `outputs` | All finished MP4s for this video, newest first. Their frame 0 is the video's poster frame, when it has one. |
| `share` | `SHARE.md`, the ready-to-post caption the Director writes in the build step, or `null` before that |
| `posters` | The cover images (`stills/<name>-poster.jpg`, one per rendered format), newest first. Empty until a render of a video with a `poster` frame. |
| `mp4` | The MP4s the latest render made, once it's `done` (after audio mastering). Otherwise empty. |
| `next` | One line: what to do now |

## The autopilot

- **Crashes:** if Claude stops with an error, the autopilot retries that step once. If it fails again, it becomes `failed`.
- **Memory:** it lives in the dashboard server. If the server restarts, it stops; run `make` again and it picks up where the video is.
- **Timing:** brief about 3 min, storyboard about 10 min, build 10–20 min (with the critique loop). A 30-second render takes a few minutes; the film look takes about 8× longer.
- **Parallel work:** one autopilot per video.
  - Videos of **different brands** run in parallel.
  - Videos of the **same brand** take turns, one step each, because they share the brand kit. While one waits, `status` shows `running: true`, `waiting: true` and "Waiting for …" in `activity`. That's normal; keep polling.

## Files

| Path | What |
| --- | --- |
| `src/brands/<brand>/<video>/BRIEF.md` | the brief: goal, story by seconds, voice-over lines |
| `out/<brand>/<video>/storyboard/` | the 4 storyboard frames |
| `out/<brand>/<video>/*.mp4` | renders |
| `CLAUDE.md` (repo root) | the full manual: engine, sound design, voice-over, screenshots, rules |

## Director engines and Windows

The default engine is Claude; Codex and Antigravity run only when selected. They launch with their own permission checks off (`--dangerously-bypass-approvals-and-sandbox`, `--dangerously-skip-permissions`). On macOS the dashboard runs Codex in its own sandbox instead (`tools/dashboard/sandbox.mjs`): writes only inside the repo (not `.git`, not MP4s in `out/`), no reading the API keys, browser profiles or home folder, and `voice`/`shot` run through the dashboard. Antigravity runs unrestricted everywhere (its sign-in lives in the macOS Keychain, which a sandbox can't open for it alone), and so does Codex on Linux and Windows. For standalone CLI runs with scoped permissions, `npm run antigravity-permissions` adds video command rules to global settings while preserving deny/ask rules and a backup. The Director treats denied actions and empty results as failures, even when the CLI reports `SUCCESS`.

Use `npm run video -- <command>` from the repo on Windows, macOS or Linux. The portable skill wrapper is `node scripts/video.mjs <command>`; the Bash wrapper is for macOS/Linux. `make` and `set` accept `--engine=codex|claude|antigravity`. `status` reports the selected `engine` plus `codex`, `claude` and `antigravity` readiness. Antigravity uses the official agy CLI with stream-json and per-video conversation IDs; sign in with agy first and allow project tool commands using its permission settings. The IDE launcher is not a substitute for agy.
