---
name: halal-motion-videos
description: Make motion-graphics promo videos (MP4) for an app or product from the terminal. An autopilot writes the brief, storyboard and build, then renders.
license: Halal Motion Videos License (see LICENSE in the repo)
compatibility: macOS or Linux. Needs Node.js 22+, ffmpeg/ffprobe, Python 3, and Claude Code logged in (the Director). Run `npm run setup` once in the repo.
version: 1.0.0
platforms: [macos, linux]
prerequisites:
  commands: [node, npm, ffmpeg, ffprobe, python3]
metadata: {"openclaw": {"os": ["darwin", "linux"], "requires": {"bins": ["node", "npm", "ffmpeg", "ffprobe", "python3"]}}, "hermes": {"tags": ["video", "motion-graphics", "remotion", "promo", "app-store"], "category": "creative"}}
---

# Halal Motion Videos

A local machine that makes short motion-graphics videos: product promos, App Store previews and social clips. One source renders 9:16 and 16:9.

- **Structure:** every video belongs to a **brand** (an app or product), e.g. `my-app/video01`.
- **The Director:** Claude Code does the creative work. It captures real screenshots, writes copy from the product's own words, designs sound by code, adds an ElevenLabs voice-over and builds the scenes.
- **Your job:** drive it from the terminal. The autopilot approves each step itself; no browser needed.

**Halal videos only.** Refuse anything that promotes or shows:

- alcohol, drugs, gambling or interest-based (riba) products
- immodest or sexual content
- mockery of Allah, the Qur'an, the Prophets or Islam
- lies, scams, misleading claims, hate or violence

## The command

`scripts/video` in this skill's folder runs the tool from anywhere, even when this skill is installed as a symlink.

- **From the repo root:** `npm run video -- <command>` does the same.
- **Where the repo is:** `scripts/video where` prints the repo root.
- **JSON output:** add `--json` to any command for machine-readable output.

First time on a machine:

```bash
scripts/video doctor --json      # anything required missing? → run `npm run setup` in the repo root
```

## Make a video (autopilot)

```bash
scripts/video make <brand> next "<what the video is about>" \
  --url=https://product.example --folder=/path/to/product/source \
  --length=30 --format=both --render
```

- **`<brand>`:** lowercase letters, digits and dashes, e.g. `ela-salaty`. A new brand is created on first use.
- **`next`:** makes the brand's next video (`video01`, `video02`, …). Or name one, e.g. `video01`.
- **What it's about:** one or two sentences, e.g. "App Store promo showing prayer times and the Qibla finder".
- **`--url` / `--folder`:** where the Director finds the real product: its website, and its source code (read-only).
- **`--app-id`:** for an iOS app, pass its App Store id or link (e.g. `--app-id=6474693547`).
  - Fetches the 1024 icon, the full-size store screenshots and the app's own description into the brand kit first.
  - Use it when the app has no website, or for its official store art.
- **Returns at once.** The autopilot approves the brief, then the storyboard, builds everything, then renders (`--render`).
- **Timing:** about 15–30 minutes, plus the render.

Then poll every 1–2 minutes:

```bash
scripts/video status <brand> <video> --json
```

| `autopilot.status` | What to do |
| --- | --- |
| `running` | Wait and poll again. |
| `blocked` | The Director asked a question: read `lastReply`, then `scripts/video ask <brand> <video> "<answer>"`. The autopilot carries on by itself. |
| `paused` | Only with `--stop-at`: review (below), then run `make <brand> <video>` again. |
| `failed` | Read `lastReply` and fix the cause if it names one (e.g. a missing file), then `make <brand> <video>` again. It resumes where it stopped. |
| `done` | Built. With `--render`, wait until `render.status` is `done`. The MP4 paths are in `outputs`. |
| `stopped` | Someone ran `stop`. `make` again to resume. |

Hand the human the MP4 paths from `outputs` (`out/<brand>/<video>/<brand>-<video>-vertical.mp4`, `…-horizontal.mp4`).

**One command instead of polling (scripts, cron jobs):** add `--wait` to `make`, `ask`, `approve` or `render`.

```bash
scripts/video make <brand> next "<about>" --format=vertical --render --wait --json > result.json
```

- **Stays open:** until everything is finished, including rendering and audio mastering. The default limit is 90 minutes (`--timeout=<s>`).
- **Milestones:** stream to **stderr** as they happen, e.g. "brief ready", "storyboard ready", "render · 40%", "saved …mp4", with a heartbeat every minute. Stdout stays one clean JSON object.
- **The result:** ends with the MP4 path(s): `mp4` in JSON, or `MP4: <path>` lines last in text.
- **Exit codes:** `0` ok · `1` failed · `2` blocked (answer with `ask`, then `make` again).

## Review before approving (optional)

`--stop-at=brief` or `--stop-at=storyboard` makes the autopilot pause there instead of approving.

- **Brief:** read `brief` (the BRIEF.md path in `status`). It holds the story by seconds and the voice-over lines.
- **Storyboard:** look at the 4 JPGs in `storyboard` (hook, key feature, climax, end card).
- **To continue:** `make <brand> <video>` again.
- **To change something:** `ask <brand> <video> "<changes>"`, wait for it, check again, then `make`.

## Changes after the build

```bash
scripts/video ask <brand> <video> "Make the hook faster and the end card bigger" --wait
scripts/video render <brand> <video> --wait            # add --blur for the film look (~8x slower)
```

## Settings

Pass these to `make`, or change them with `scripts/video set <brand> [video] …`:

| Flag | Values | Default |
| --- | --- | --- |
| `--url`, `--folder` | the product's website and source folder (brand-wide) | none |
| `--app-id` | App Store id or link: fetch icon, screenshots and listing first (`make` only) | none |
| `--length` | seconds (3–600) | 30 |
| `--format` | `vertical` (or `9:16`), `horizontal` (or `16:9`), `both` | `both` |
| `--language` | on-screen language, e.g. `Arabic` | English |
| `--voiceover` | `on` / `off` (needs an ElevenLabs key) | on when a key is saved |
| `--voice-language` | e.g. `"Arabic — Egyptian accent"` | English — American accent |
| `--voice-id` | an ElevenLabs voice ID | the saved default |
| `--style` | a style name from `scripts/video styles`, or `none` | none |
| `--effort` | Claude's thinking: `medium`, `high`, `xhigh` | `high` |

**ElevenLabs key (voice-over):** pipe it in, never put it on the command line:
`printf %s "$ELEVENLABS_API_KEY" | scripts/video voice-settings --key-stdin`

More commands and every JSON field: [references/commands.md](references/commands.md).

## Rules

- **Never read `.director/settings.json`:** it holds API keys; the tools read it themselves. Never read `.director/browser/` either.
- **No git:** never `git commit` or `git push`. The human commits.
- **Real claims only:** don't ask the Director to invent features, numbers or reviews. Illustrative data gets an "Example data" label automatically.
- **Renders are slow and large:** render once the video is done, not after every change.
- **Deleting:** never delete brands, videos or outputs unless the human asks.
- **Parallel videos:** different brands run at the same time. Two videos of the same brand take turns, one step each (`status` shows `waiting: true`); that's normal.

## Without Claude Code

The autopilot needs Claude Code (`claude`, logged in). Without it, build by hand following `CLAUDE.md` in the repo root, the full manual.

- **Tools:** `npm run new`, `shot` (screenshots), `sfx` (sound), `voice`, `stills`, `review` (self-critique sheets), `typecheck`, `render`.
