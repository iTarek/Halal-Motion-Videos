// Real screenshots of a live site or web app, in a headless Chrome driven over the DevTools protocol.
// No extra installs: uses Remotion's bundled chrome-headless-shell, else Google Chrome / Edge (CHROME_PATH overrides).
//
// Usage:
//   npm run shot -- <brand> [<video>]                         every shot in shots.json (brand: src/brands/<brand>/brand/shots.json)
//   npm run shot -- <brand> [<video>] --only=home,settings    just these
//   npm run shot -- <brand> [<video>] --url=https://… --id=home [--device=iphone] [--full] [--wait=1500]   one quick shot
//
// shots.json:
//   {
//     "url": "https://example.com",          // default page for every shot
//     "device": "iphone",                     // iphone | iphone-max | ipad | desktop | laptop | <W>x<H>  (default iphone)
//     "dark": false,                          // prefers-color-scheme: dark
//     "locale": "en-US",
//     "shots": [
//       { "id": "home" },
//       { "id": "reader", "steps": [ { "click": "text=Start" }, { "wait": 800 } ] },
//       { "id": "settings", "path": "/settings", "device": "desktop", "full": true },
//       { "id": "search", "steps": [ { "click": "input[type=search]" }, { "type": "mercy" }, { "key": "Enter" }, { "waitFor": ".result" } ] }
//     ]
//   }
//
// Steps (run in order after the page loads):
//   { "wait": 800 }                  ms
//   { "waitFor": "css or text=…" }   until it exists (30 s max — add "timeout": 120 for seconds)
//   { "waitGone": "css or text=…" }  until it's gone, e.g. a loading screen (120 s max, or "timeout")
//   { "click": "css or text=…" }     real mouse click on the element's centre
//   { "hover": "css or text=…" }
//   { "type": "text" }               into the focused element
//   { "key": "Enter" }               Enter, Escape, Tab, ArrowDown, …
//   { "scroll": 600 }                page y in px — or { "scroll": "css or text=…" } to bring it into view
//   { "eval": "document.body.classList.add('x')" }   any JavaScript (e.g. dismiss a banner)
//
// The browser profile is kept per brand in .director/browser/<brand>/, so logins, cookies and big
// first-load downloads (e.g. an on-device model) survive between runs. --fresh starts from an empty profile.
//
// Output: public/<brand>/brand/img/shots/<id>.png (brand) or public/<brand>/<video>/img/shots/<id>.png — Read them to check.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ROOT } from "./settings.mjs";

const NAME = /^[a-z][a-z0-9-]*$/;
const SHOT_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const fail = (m) => {
  console.error(m);
  process.exit(1);
};

const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => {
  const [k, ...v] = a.slice(2).split("=");
  return [k, v.length ? v.join("=") : true];
}));
const [brand, videoArg] = args.filter((a) => !a.startsWith("--"));
if (!NAME.test(brand ?? "") || (videoArg && !NAME.test(videoArg))) fail("Usage: npm run shot -- <brand> [<video>] [--only=a,b] | [--url=… --id=…]");
const folder = videoArg || "brand";
const srcDir = path.join(ROOT, "src", "brands", brand, folder);
if (!fs.existsSync(srcDir)) fail(`No folder src/brands/${brand}/${folder}`);
const outDir = path.join(ROOT, "public", brand, folder, "img", "shots");

// ---- recipe
let recipe;
if (flags.url) {
  const id = typeof flags.id === "string" ? flags.id : "shot";
  recipe = {
    url: flags.url,
    device: typeof flags.device === "string" ? flags.device : "iphone",
    dark: !!flags.dark,
    shots: [{ id, full: !!flags.full, steps: flags.wait ? [{ wait: Number(flags.wait) }] : [] }],
  };
} else {
  const file = path.join(srcDir, "shots.json");
  if (!fs.existsSync(file)) fail(`Write src/brands/${brand}/${folder}/shots.json first (see the top of tools/shot.mjs), or pass --url=… --id=…`);
  try {
    recipe = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    fail(`shots.json isn't valid JSON: ${e.message}`);
  }
}
const only = typeof flags.only === "string" ? new Set(flags.only.split(",")) : null;
const shots = (recipe.shots ?? []).filter((s) => !only || only.has(s.id));
if (!shots.length) fail("No shots to take.");
for (const s of shots) if (!SHOT_ID.test(s.id ?? "")) fail(`Shot id "${s.id}" must be letters, digits, - or _.`);

const DEVICES = {
  iphone: { width: 390, height: 844, scale: 3, mobile: true },
  "iphone-max": { width: 430, height: 932, scale: 3, mobile: true },
  ipad: { width: 820, height: 1180, scale: 2, mobile: true },
  laptop: { width: 1280, height: 800, scale: 2, mobile: false },
  desktop: { width: 1440, height: 900, scale: 2, mobile: false },
};
const deviceOf = (d = "iphone") => {
  if (DEVICES[d]) return DEVICES[d];
  const m = String(d).match(/^(\d{3,4})x(\d{3,4})$/);
  if (m) return { width: +m[1], height: +m[2], scale: 2, mobile: +m[1] < 800 };
  fail(`Unknown device "${d}" — use ${Object.keys(DEVICES).join(", ")} or WxH.`);
};
const UA = {
  mobile: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
};

// ---- browser
const findChrome = () => {
  const candidates = [
    process.env.CHROME_PATH,
    path.join(ROOT, "node_modules/.remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell"),
    path.join(ROOT, "node_modules/.remotion/chrome-headless-shell/mac-x64/chrome-headless-shell-mac-x64/chrome-headless-shell"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ].filter(Boolean);
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) fail("No Chrome found — set CHROME_PATH to a Chrome/Chromium binary.");
  return found;
};

// Per-brand profile (kept) — or a throwaway one with --fresh.
const profile = flags.fresh ? fs.mkdtempSync(path.join(os.tmpdir(), "shot-")) : path.join(ROOT, ".director", "browser", brand);
fs.mkdirSync(profile, { recursive: true });
const chrome = spawn(findChrome(), [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--no-first-run", "--no-default-browser-check",
  "--hide-scrollbars", "--mute-audio", "--disable-extensions", "--disable-background-networking", "--force-color-profile=srgb",
], { stdio: ["ignore", "ignore", "pipe"] });
const removeProfile = () => {
  if (!flags.fresh) return; // the per-brand profile is kept on purpose
  try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }); } catch {}
};
const cleanup = async () => {
  if (chrome.exitCode === null) {
    const gone = new Promise((r) => chrome.once("exit", r));
    try { chrome.kill(); } catch {}
    await Promise.race([gone, new Promise((r) => setTimeout(r, 3000))]);
  }
  removeProfile();
};
process.on("exit", () => {
  try { chrome.kill(); } catch {}
  removeProfile();
});

const wsUrl = await new Promise((resolve, reject) => {
  let buf = "";
  const t = setTimeout(() => reject(new Error("Chrome didn't start in 20 s")), 20000);
  chrome.stderr.on("data", (d) => {
    buf += d;
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) { clearTimeout(t); resolve(m[1]); }
  });
  chrome.on("exit", (c) => reject(new Error(`Chrome exited (${c})`)));
}).catch((e) => fail(e.message));

// ---- minimal DevTools protocol client
const ws = new WebSocket(wsUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = () => j(new Error("Couldn't connect to Chrome")); });
let nextId = 1;
const pending = new Map();
const listeners = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) {
    for (const l of [...listeners]) l(msg);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
const once = (method, sessionId, ms = 30000) =>
  new Promise((resolve) => {
    const t = setTimeout(() => { listeners.splice(listeners.indexOf(fn), 1); resolve(null); }, ms);
    const fn = (m) => {
      if (m.method === method && m.sessionId === sessionId) {
        clearTimeout(t);
        listeners.splice(listeners.indexOf(fn), 1);
        resolve(m.params);
      }
    };
    listeners.push(fn);
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Finds an element by CSS or "text=…" (smallest visible element whose text contains it); returns its centre.
const FIND = `(q) => {
  let el = null;
  if (q.startsWith("text=")) {
    const want = q.slice(5).trim().toLowerCase();
    const all = [...document.querySelectorAll("body *")].filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (e.innerText || e.value || e.getAttribute("aria-label") || "").toLowerCase().includes(want);
    });
    all.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height);
    el = all[0] || null;
  } else el = document.querySelector(q);
  if (!el) return null;
  el.scrollIntoView({ block: "center", inline: "center" });
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}`;

const evalJs = async (s, expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, s);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result?.value;
};
const find = (s, q) => evalJs(s, `(${FIND})(${JSON.stringify(q)})`);

const runStep = async (s, step) => {
  const [kind, v] = Object.entries(step).find(([k]) => k !== "timeout") ?? [];
  if (kind === "wait") return sleep(Number(v));
  if (kind === "waitFor" || kind === "waitGone") {
    const limit = Date.now() + 1000 * Number(step.timeout ?? (kind === "waitGone" ? 120 : 30));
    while (Date.now() < limit) {
      const present = !!(await find(s, String(v)));
      if (present === (kind === "waitFor")) return sleep(kind === "waitGone" ? 600 : 0);
      await sleep(400);
    }
    throw new Error(kind === "waitFor" ? `waitFor: "${v}" never appeared` : `waitGone: "${v}" was still there after ${step.timeout ?? 120}s`);
  }
  if (kind === "click" || kind === "hover") {
    const p = await find(s, String(v));
    if (!p) throw new Error(`${kind}: nothing matches "${v}"`);
    await sleep(120);
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y }, s);
    if (kind === "click") {
      await send("Input.dispatchMouseEvent", { type: "mousePressed", x: p.x, y: p.y, button: "left", clickCount: 1 }, s);
      await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: p.x, y: p.y, button: "left", clickCount: 1 }, s);
    }
    return sleep(400);
  }
  if (kind === "type") return send("Input.insertText", { text: String(v) }, s);
  if (kind === "key") {
    const key = String(v);
    const code = { Enter: 13, Escape: 27, Tab: 9, ArrowDown: 40, ArrowUp: 38, ArrowLeft: 37, ArrowRight: 39, Backspace: 8, " ": 32 }[key] ?? 0;
    const base = { key, code: key, windowsVirtualKeyCode: code, nativeVirtualKeyCode: code, ...(key === "Enter" ? { text: "\r" } : {}) };
    await send("Input.dispatchKeyEvent", { type: "keyDown", ...base }, s);
    await send("Input.dispatchKeyEvent", { type: "keyUp", ...base }, s);
    return sleep(300);
  }
  if (kind === "scroll") {
    if (typeof v === "number") await evalJs(s, `window.scrollTo(0, ${v})`);
    else if (!(await find(s, String(v)))) throw new Error(`scroll: nothing matches "${v}"`);
    return sleep(500);
  }
  if (kind === "eval") return evalJs(s, String(v));
  throw new Error(`unknown step "${kind}"`);
};

// ---- take the shots
fs.mkdirSync(outDir, { recursive: true });
let failed = 0;
for (const shot of shots) {
  const dev = deviceOf(shot.device ?? recipe.device);
  let url = shot.url ?? recipe.url;
  if (!url) fail(`Shot "${shot.id}" has no url (set "url" at the top of shots.json).`);
  if (shot.path) url = new URL(shot.path, url).href;
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId: s } = await send("Target.attachToTarget", { targetId, flatten: true });
  try {
    await send("Page.enable", {}, s);
    await send("Runtime.enable", {}, s);
    await send("Emulation.setDeviceMetricsOverride", { width: dev.width, height: dev.height, deviceScaleFactor: dev.scale, mobile: dev.mobile }, s);
    if (dev.mobile) {
      await send("Emulation.setUserAgentOverride", { userAgent: UA.mobile }, s);
      await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 }, s);
    }
    const dark = shot.dark ?? recipe.dark;
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: dark ? "dark" : "light" }] }, s);
    if (shot.locale ?? recipe.locale) await send("Emulation.setLocaleOverride", { locale: shot.locale ?? recipe.locale }, s).catch(() => {});
    const loaded = once("Page.loadEventFired", s);
    const nav = await send("Page.navigate", { url }, s);
    if (nav.errorText) throw new Error(`couldn't open ${url}: ${nav.errorText}`);
    await loaded;
    await evalJs(s, "document.fonts ? document.fonts.ready.then(() => true) : true").catch(() => {});
    await sleep(Number(shot.settle ?? recipe.settle ?? 1200)); // let JS render and entry animations finish
    for (const step of shot.steps ?? []) await runStep(s, step);
    let clip;
    if (shot.full) {
      const m = await send("Page.getLayoutMetrics", {}, s);
      const c = m.cssContentSize ?? m.contentSize;
      clip = { x: 0, y: 0, width: dev.width, height: Math.min(Math.ceil(c.height), 12000), scale: 1 };
    }
    const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: !!shot.full, ...(clip ? { clip } : {}) }, s);
    const file = path.join(outDir, `${shot.id}.png`);
    fs.writeFileSync(file, Buffer.from(data, "base64"));
    const px = (n) => Math.round(n * dev.scale);
    console.log(`+ ${shot.id}: ${px(dev.width)}×${px(clip ? clip.height : dev.height)} → ${path.relative(ROOT, file)}`);
  } catch (e) {
    failed++;
    console.error(`✕ ${shot.id}: ${e.message}`);
  } finally {
    await send("Target.closeTarget", { targetId }).catch(() => {});
  }
}
ws.close();
await cleanup();
console.log(`\n${shots.length - failed}/${shots.length} shots saved. Read the PNGs to check them before using.`);
process.exit(failed ? 1 : 0);
