---
description: Senior audit of the uncommitted changes (Remotion engine, CLI, dashboard, sandbox) — fixes, tests, docs upkeep, commit message, next improvements
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(git ls-files:*)
---

# Context

- Changed files: !`git status --short`
- New files (not in the diff below — read them in full): !`git ls-files --others --exclude-standard`
- Staged and unstaged changes: !`git diff HEAD -- . ':(exclude)package-lock.json'`

# Role & Guideline
Do not audit your own code: hand the audit to another agent acting as a Senior Engineer who knows
Remotion and Node. Give it this file and the diff, not your reasoning. The project's own rules come
first — `CLAUDE.md`. Apply the **[remotion-best-practices]** skill (when installed) as the guide for
code in `src/`.

# Task
1.  **Read the rules, then the changes**: read `CLAUDE.md` before judging anything. Then review every
    changed file line by line — new files in full. Do not skip any file.
2.  **The quality bar**, in this order — a change that trades one for a later one is a finding:
    * **Safe**: keys stay secret, the Director stays inside its limits, nothing of the user's is lost.
    * **Correct**: the video renders the same every time, and sound, voice and text land where they
      should, in every format.
    * **Agent first**: an agent that only runs `npm run video` can find it, use it and hand it over.
    * **Everywhere**: Windows, macOS and Linux; English and Arabic; left to right and right to left.
    * **Every line has a purpose**: dead code, commented-out code, a "for later" option, a wrapper
      that only forwards, a second copy of something that exists — each is a finding.
3.  **Safety** (`CLAUDE.md` → Director):
    * **Keys**: `.director/settings.json` is never read by hand, and no key reaches a log, an error
      message, a video, the Director's environment, or the browser (the page gets a hint of the last
      4 characters only).
    * **The three permission lists move together**: a new `npm run` tool the Director may use is in
      `ALLOWED_TOOLS` (`tools/dashboard/director.mjs`), in `VIDEO_PERMISSION_RULES`
      (`tools/antigravity-permissions.mjs`) and in `CLAUDE.md` → Allowed without asking. One that
      must not run from inside the Codex sandbox is in none of them.
    * **The sandbox** (`tools/dashboard/sandbox.mjs`): `tools/`, `.git`, `.director/whisper/` and the
      browser profiles stay write-protected. A tool needing a key or a browser profile goes through
      `tools/broker.mjs`, limited to this video and its brand kit. Anything the sandbox can write
      that runs outside it later is a finding.
    * **The dashboard server**: it listens on `127.0.0.1` only. Every brand and video name from a
      request passes `NAME` / `validVideo`; every file path stays inside its folder. A new route that
      takes action makes the open gap in `Todo.md` bigger: say so.
    * **Deleting**: the user's files go to the system Trash, never `rm`.
    * **What's public**: brands, their files and `styles/library.json` are git-ignored. No brand
      name, customer data, key or personal path enters a tracked file. Code or looks from another
      project: its licence fits, and it's credited in `NOTICE.md`.
4.  **Engine and video code** (`src/`):
    * **Same frame, same picture**: everything comes from `useCurrentFrame()`. No `Math.random`,
      `Date.now`, CSS transition, CSS animation or `setTimeout`; use `noise`, `springAt`, `prog`.
      `Img` and `Audio` from Remotion, and files through `asset` / `brandAsset` / `shared`.
    * **Brand-free**: `src/engine/` holds no brand colour or copy, and reads colours from
      `useTheme()`.
    * **Brands the diff can't show**: they're git-ignored but on this machine, in `src/brands/`. A
      changed engine part is checked against every video that uses it (grep there). Their
      `npm run typecheck` errors count. Never edit a brand to make the engine change pass.
    * **`_starter`** keeps compiling and keeps following the design rules: every new video copies it.
    * **Arabic**: no word split into letters, no `letter-spacing`; marks and tails aren't clipped
      (`overflow: hidden` around text is a finding); a number range goes through `isolateNumbers`.
      Sacred text is never distorted, and no sound effect sits near it.
    * **Formats**: anything sized in pixels goes through `useLayout()` / `p(vertical, horizontal)` and
      works in 9:16 and 16:9. Nothing important in the safe-area edges (`CLAUDE.md` → Design quality).
    * **Design quality**, for scenes: read `CLAUDE.md` → Design quality. Text held long enough to
      read, springs for anything with weight, no muddy crossfade.
    * **Claims**: on-screen claims come from the product; made-up numbers carry `<ExampleBadge />`.
      Halal videos only (`AGENTS.md`), and that goes for anything in `_starter`, `tools/styles.mjs` and
      `tools/moves.mjs` too.
5.  **Tools and CLI** (`tools/`, `CLAUDE.md` → Agent first):
    * **Reachable**: every dashboard setting and action also works through `npm run video`.
    * **Visible**: every new output is in `status --json` and the `--wait` result, with its path.
    * **Told**: `SKILL.md` and `references/commands.md` explain each new command, flag and `status`
      field. `USAGE.ar.md` and `README.md` still tell the truth.
    * **Versioned**: when the CLI needs something new from the server, `AGENT_API` is bumped in both
      `tools/video.mjs` and `tools/dashboard/server.mjs`.
    * **Every platform**: `path.join`, never a hard-coded `/`. No shell-only command without a Windows
      path. `process.platform` branches for all three. `windowsHide: true` on spawned processes.
      `sips` and `sandbox-exec` are macOS only.
    * **Providers**: a voice change works for ElevenLabs, Gemini and a recorded line. Engines: Claude,
      Codex and Antigravity; no silent fallback from one to another.
    * **Failing well**: a plain message that says what to do, not a stack trace. A stalled network
      call or child process has a timeout. A file a run depends on is written whole (temp, then
      rename). Paid work (a generated voice line) survives a later failure.
    * **Setup**: `setup` never installs anything system-wide. No new dependency without a reason;
      every `@remotion/*` stays pinned to the same exact version as `remotion`. Python stays numpy
      and scipy.
    * **Sound**: `synth_sfx.py` changed? `npm run sfx` with no arguments must still reproduce
      `public/_shared/sfx/` exactly (`git status` shows no change).
6.  **Dashboard** (`tools/dashboard/`):
    * Every new visible English string has its Arabic in `i18n.js`, in sync with the exact English.
      Project data, documents, chat and logs are never translated.
    * Layout works right to left: logical properties, and paths, URLs and keys stay left to right.
    * User text reaches the page through `esc()`. A status line says what's really happening.
7.  **Tests** (`tools/tests/`):
    * Each new command, flag, `status` field or fixed bug has a test. Existing tests are updated when
      behaviour changes, never deleted to go green.
    * Tests stay offline and never touch the real settings, library or brands: temp copies, a faked
      `fetch`. A check that needs a person or a real service is reported as not run.
8.  **General**: bugs, missing edge cases (a missing or half-written file, no key, a stopped run, a
    second video of the same brand, a path with spaces, an empty script), resource leaks (a browser or
    server left running), dead or duplicated code. A rule the diff does not meet is a finding: fix the
    code. Never soften `CLAUDE.md` to let the diff through.
9.  **Fix and verify**:
    * Fix what you find, in the codebase's own style; when behaviour changes, update or add the tests.
    * Run `npm run typecheck` and `npm test`. Report each result as it is; if something could not
      run, say so.
    * **`src/engine/` or a scene changed?** Tests can't see pixels. Render stills with
      `npm run stills -- <brand> <video> <frames> --dir=<a temp folder>`, from one Arabic and one
      English video that use the changed part, with the old and the new code. Read them: settled
      frames must match, unless the change is meant to show. Delete them afterwards.
    * **Never render an MP4 unless asked. One heavy job at a time.** If the Mac is already busy
      (`sysctl vm.loadavg`, an `xcodebuild` running), say so and wait.
    * Clean up: no leftover server, browser, temp file or test `moves.json`.
    * Never `git commit` or `git push`; the project manager commits.
    * If no issues are found, explicitly state: "✅ Code is clean and idiomatic."
10. **Keep the docs in step**: `CLAUDE.md` is the guide every Director reads, so it stays true and
    short. Update only what the diff made stale, in `CLAUDE.md`, `AGENTS.md`, `SKILL.md`,
    `references/commands.md`, `USAGE.ar.md`, `README.md` — never a rule, to make room for the diff.
11. **Suggest Next Improvements**: propose 3–5 concrete improvements based on what you saw in the diff
    — not generic advice. Prioritize by the quality bar's order. For each: the file or area, what to
    improve, and why it matters.

# Output Format
Start with what the audit found:

| File:line | Issue | Rule broken | Fixed? |
|---|---|---|---|

Then one line per check: typecheck, tests (passed / failed counts), stills compared (or why not
needed), anything that could not run.

Then a commit message for the **net result** of the changes:

```text
<Imperative one-line summary, under 72 characters>

<What changed and why, in short plain paragraphs.>
```

Then:

## Next Improvements

1. **[file/area]**: <what to do> — <why it matters>
2. ...

Then, WITHOUT being asked, the same improvements in plain language — same items, same order, one block
each with exactly these four labels:

## In plain words

### 1. <short title of the improvement>

- **You'd notice:** what someone making a video actually sees or feels. "Nothing today" when it is
  invisible — say so plainly.
- **Why:** the cause in one or two sentences, no jargon. Name a mechanism, not a symbol.
- **Fix:** what would be done, in a sentence. Not code.
- **Worth it?** Yes / no / your call — and what it depends on.

Close with one line recommending which to do first and which to leave.

Rules for this section:
- Order by **what the user would feel**, strongest first — it may differ from the technical order.
- No symbol names, file paths or API names; if one is unavoidable, say what it does in the same breath.
- Never more than two sentences in a row without a break.

Commit message rules:
- The summary starts with a verb, like this repo's history: "Add …", "Fix …", "Audit …".
- The body says the *what and why*.
- No "Co-Authored-By" or "Generated with" lines.
