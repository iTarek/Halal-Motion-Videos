# AGENTS.md

This repo is **Halal Motion Videos**. It makes short motion-graphics videos (product promos, App Store previews, social clips) with Remotion, on macOS or Linux.

- **Driving it from a terminal:** no browser needed. Use the command-line tool below.
- **Full manual:** [CLAUDE.md](CLAUDE.md) covers the layout, engine, sound design, voice-over, screenshots and rules. It's also the instructions for the Director (the Claude Code agent that builds each video).
- **Agent Skill:** the same workflow is packaged at [.agents/skills/halal-motion-videos/SKILL.md](.agents/skills/halal-motion-videos/SKILL.md) for OpenClaw, Hermes and other agents.
  - **Install it for every agent on this machine:** `npm run agent-skill`
  - **Hermes, working inside this repo:** run `hermes skills trust .` once.

## Make a video

```bash
npm run doctor -- --json                  # first time: anything missing? → npm run setup
npm run video -- make <brand> next "<what the video is about>" --url=https://product.example --length=30 --format=both --render
npm run video -- status <brand> <video> --json    # poll every 1–2 minutes
```

- **What `make` does:** starts the **autopilot** and returns at once. It writes the brief, builds a 4-frame storyboard, builds the whole video, then renders MP4s. It approves each step itself.
- **When `status` says `blocked`:** the Director asked a question. Answer with `npm run video -- ask <brand> <video> "<answer>"`.
- **When `status` says `failed`:** run `make <brand> <video>` again. It resumes.
- **Where the MP4s land:** `out/<brand>/<video>/`. The paths are in `status` → `outputs`.
- **Needs:** Claude Code logged in (`claude`), because the Director does the creative work.

All commands, flags, JSON fields and exit codes: [.agents/skills/halal-motion-videos/references/commands.md](.agents/skills/halal-motion-videos/references/commands.md).

## Rules

- **Halal videos only:** no alcohol, drugs, gambling or interest-based (riba) products, no immodest content, no mockery of Islam, no lies, scams, hate or violence.
- **Never read `.director/settings.json`:** it holds API keys. Never read `.director/browser/` either.
- **Never run `git commit` or `git push`:** the human commits.
- **Real claims only:** copy comes from the product's own site or store listing.
- **Renders:** render only a finished video, or when asked.
- **Deleting:** never delete brands, videos or outputs unless the human asks.
- **Brands are private:** `src/brands/<brand>/` and `public/<brand>/` are git-ignored. Keep them out of the repo.
