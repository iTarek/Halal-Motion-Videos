#!/bin/bash
# Double-click in Finder to start Halal Motion Videos (or run ./Start.command).
# Starts the dashboard and opens http://localhost:4000. Close this window (or press Ctrl+C) to stop it.

cd "$(dirname "$0")" || exit 1
PORT="${PORT:-4000}"
URL="http://localhost:$PORT"

pause_and_exit() {
  echo
  read -r -p "Press Enter to close this window…" _
  exit 1
}

open_page() {
  [ -n "$NO_OPEN" ] && return
  if command -v open >/dev/null; then open "$URL"; elif command -v xdg-open >/dev/null; then xdg-open "$URL"; fi
}

echo "Halal Motion Videos"
echo

# Node.js is the one thing we can't install for you.
if ! command -v node >/dev/null; then
  echo "Node.js isn't installed. Get it from https://nodejs.org (version 22 or newer), then double-click Start.command again."
  pause_and_exit
fi

# Already running? Just open it.
if curl -s -o /dev/null "$URL/api/state" 2>/dev/null; then
  echo "Already running → $URL"
  open_page
  exit 0
fi

# First run: install everything this folder needs.
if [ ! -d node_modules/remotion ]; then
  echo "First run — setting things up (a few minutes)…"
  echo
  npm run setup --silent || echo "Setup finished with notes above. The dashboard's Settings → System check shows what's still missing."
  echo
fi

echo "Starting → $URL"
echo "Keep this window open while you work. Close it (or press Ctrl+C) to stop."
echo

node tools/dashboard/server.mjs &
SERVER=$!
trap 'kill $SERVER 2>/dev/null; exit 0' INT TERM HUP

# Open the page as soon as the server answers.
for _ in $(seq 1 50); do
  if curl -s -o /dev/null "$URL/api/state" 2>/dev/null; then open_page; break; fi
  if ! kill -0 $SERVER 2>/dev/null; then echo "The dashboard didn't start — see the message above."; pause_and_exit; fi
  sleep 0.2
done

wait $SERVER
