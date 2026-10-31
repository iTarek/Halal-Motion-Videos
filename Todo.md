# Todo

## Close the dashboard's cross-site gap

**Problem:** any web page open in your browser can send commands to the dashboard (`localhost:4000`) while it runs.

- The browser stops the page from *reading* replies, not from *sending* requests.
- The page skips the browser's check by sending the body as "plain text"; `readBody` in `tools/dashboard/server.mjs` parses it as JSON anyway.
- **DNS rebinding:** a site that points its own address at `127.0.0.1` can also *read* replies (brands, videos, Director chats), because the server never checks the `Host` header. API keys stay safe: only their last 4 characters are ever sent.

**What a bad page could do:**

| Request | Effect |
| --- | --- |
| `/api/director/…` | starts a Director run with its own message (edits files, `curl`, `npm install`, uses up the Claude plan) |
| `/api/settings`, `/api/voice/test` | changes voice settings, spends ElevenLabs/Gemini credits |
| `/api/delete-video`, `/api/delete-brand` | moves videos to the Trash |
| `/api/render` | starts heavy renders |

**Fix (about 6 lines, top of the request handler in `server.mjs`):**

- [ ] **Host check:** accept only `localhost` or `127.0.0.1` on the port the server runs on (blocks DNS rebinding).
- [ ] **Origin check:** refuse a POST whose `Origin` is another site (403).
- [ ] **Test** in `tools/tests/`: a foreign Host or Origin is refused; the dashboard page and the CLI still work.

**Must keep working:**

- The dashboard's own page (same origin, so it passes).
- `npm run video` and the broker: Node calls `127.0.0.1:<PORT>` and sends no `Origin`.
- A custom `PORT`.
