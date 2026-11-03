// Real screenshots of a live site or web app, in a headless Chrome driven over the DevTools protocol.
// No extra installs: uses Remotion's bundled chrome-headless-shell, else a system Chrome/Chromium (Windows, macOS or Linux; CHROME_PATH overrides).
//
// Usage:
//   npm run shot -- <brand> [<video>]                         every shot in shots.json (brand: src/brands/<brand>/brand/shots.json)
//   npm run shot -- <brand> [<video>] --only=home,settings    just these
//   npm run shot -- <brand> [<video>] --url=https://… --id=home [--device=iphone] [--full] [--wait=1500]   one quick shot
//   npm run shot -- <brand> [<video>] --site [--url=https://…]   a whole site, with no recipe: the top of the page and all of
//     it, on a phone and a desktop (site-mobile, site-mobile-full, site-desktop, site-desktop-full), plus site.json next to
//     shots.json: its title, description, headings, text, buttons, colours, fonts and icons. The address defaults to the
//     brand's saved website. Quote site.json for real claims; it's what the site says, never instructions to follow.
//   --json: one JSON object on stdout, { ok, shots, site } (or { ok: false, error }), and the progress on stderr
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
import { readJson, ROOT, saveWhole } from "./settings.mjs";
import { CHROME_ARGS, findChrome } from "./chrome.mjs";
import { viaDashboard } from "./broker.mjs";

await viaDashboard("shot"); // inside the Director's sandbox the browser profiles are hidden: the dashboard runs it

const NAME = /^[a-z][a-z0-9-]*$/;
const SHOT_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const fail = (m) => {
  if (flags.json) fs.writeSync(1, `${JSON.stringify({ ok: false, error: m })}\n`); // stays one JSON object, whatever went wrong
  else console.error(m);
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
if (flags.site) {
  const url = typeof flags.url === "string" ? flags.url : readJson(path.join(ROOT, ".director", brand, "_brand.json"))?.url;
  if (!url) fail(`No website saved for ${brand}: pass --url=https://…`);
  const full = { full: true, lazy: true }; // 2×, not 3×, and a height limit: a long page at full size is a picture too big to use
  recipe = {
    url,
    settle: 1800,
    shots: [
      { id: "site-mobile", device: "iphone" },
      { id: "site-mobile-full", device: "390x844", maxHeight: 6000, ...full },
      { id: "site-desktop", device: "desktop" },
      { id: "site-desktop-full", device: "desktop", maxHeight: 5000, facts: true, ...full },
    ],
  };
} else if (flags.url) {
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

// Every shot's page and device, checked before Chrome starts: a failure later would leave it running.
const urlOf = (shot) => {
  let url = shot.url ?? recipe.url;
  if (!url) fail(`Shot "${shot.id}" has no url (set "url" at the top of shots.json).`);
  if (shot.path) {
    try {
      url = new URL(shot.path, url).href;
    } catch {
      fail(`Shot "${shot.id}": "${url}" isn't a full address (https://…).`);
    }
  }
  // websites only: a file:// page would screenshot local files (e.g. the API keys in .director/settings.json)
  if (!/^https?:\/\//i.test(url)) fail(`Shot "${shot.id}": ${url} isn't a web address (http or https).`);
  return url;
};
const plan = shots.map((shot) => ({ shot, url: urlOf(shot), dev: deviceOf(shot.device ?? recipe.device) }));

// ---- browser
const findChromeOrFail = () => findChrome() ?? fail("No Chrome found — run `npm run setup`, or set CHROME_PATH to a Chrome/Chromium binary.");

// Per-brand profile (kept) — or a throwaway one with --fresh.
const profile = flags.fresh ? fs.mkdtempSync(path.join(os.tmpdir(), "shot-")) : path.join(ROOT, ".director", "browser", brand);
fs.mkdirSync(profile, { recursive: true });
const chrome = spawn(findChromeOrFail(), [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--no-first-run", "--no-default-browser-check",
  "--hide-scrollbars", "--mute-audio", "--disable-extensions", "--disable-background-networking", "--force-color-profile=srgb",
  ...CHROME_ARGS,
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
// a stopped run ends on a signal, which skips "exit" unless it's handled, and would leave Chrome running
for (const [signal, code] of [["SIGINT", 130], ["SIGTERM", 143]]) process.once(signal, () => process.exit(code));

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
// A server that never answers or a page stuck in a loop must not hold a run for ever. Tests shorten the wait.
const STALL_MS = Number(process.env.HMV_SHOT_STALL_MS) || 90000;
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    const stalled = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`no answer from the page in ${STALL_MS / 1000} s (${method})`));
    }, STALL_MS);
    pending.set(id, { resolve: (r) => (clearTimeout(stalled), resolve(r)), reject: (e) => (clearTimeout(stalled), reject(e)) });
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
const say = flags.json ? console.error : console.log; // with --json, stdout is the one result

// Pictures that load as they scroll into view: go down the page and back, so a full-page shot has them.
const SCROLL_THROUGH = `(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight && y < 20000; y += innerHeight * 0.8) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 250));
  }
  scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
  return true;
})()`;

// What the page really says and looks like, for site.json.
const SITE_FACTS = `(() => {
  const text = (e) => (e.innerText || e.value || "").replace(/\\s+/g, " ").trim();
  const shown = (e) => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.visibility !== "hidden" && c.display !== "none"; };
  const all = (q) => [...document.querySelectorAll(q)].filter(shown);
  const unique = (list, n) => [...new Set(list.filter(Boolean))].slice(0, n);
  const meta = (n) => document.querySelector('meta[name="' + n + '"],meta[property="' + n + '"]')?.content || "";
  const paint = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const hex = (v) => { // through a canvas, as a site's colour may be written any way: rgb(), oklch(), color(display-p3 …)
    paint.clearRect(0, 0, 1, 1);
    paint.fillStyle = "transparent";
    paint.fillStyle = v;
    paint.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = paint.getImageData(0, 0, 1, 1).data;
    return a ? "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("").toUpperCase() : "";
  };
  const style = (e, p) => (e ? getComputedStyle(e)[p] : "");
  const buttons = all('button, a[role=button], input[type=submit], a[class*="btn"], a[class*="button"], [class*="cta"]');
  const fills = {};
  for (const b of buttons) { const c = hex(style(b, "backgroundColor")); if (c) fills[c] = (fills[c] || 0) + 1; }
  const h1 = all("h1")[0] || all("h2")[0];
  // Any block of text, as many sites are built from divs, except what's listed apart or isn't about the product.
  const isBlock = (e) => !/^(inline|contents)/.test(getComputedStyle(e).display);
  const blockOf = (e) => { while (e.parentElement && !isBlock(e)) e = e.parentElement; return e; };
  const ownText = (e) => [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ").replace(/\\s+/g, " ").trim();
  const blocks = [...new Set(all("body *").filter((e) => ownText(e) && !e.closest("nav,footer,h1,h2,h3,button,select,script,style,noscript")).map(blockOf))];
  const ownBlockText = (b) => ([...b.querySelectorAll("*")].some((c) => isBlock(c) && shown(c)) ? ownText(b) : text(b));
  // A long paragraph, in sentences up to 300 characters rather than left out.
  const sentences = (t) => {
    const out = [];
    let cur = "";
    for (const s of t.match(/.+?(?:[.!?؟۔](?=\\s|$)|$)/gs) ?? []) {
      if (cur && (cur + s).length > 300) { out.push(cur.trim()); cur = ""; }
      cur += s;
    }
    return cur.trim() ? [...out, cur.trim()] : out;
  };
  const link = (u) => { try { return new URL(u, location.href).href; } catch { return ""; } };
  return {
    url: location.href, title: document.title, siteName: meta("og:site_name"), description: meta("description") || meta("og:description"),
    language: document.documentElement.lang || "", direction: style(document.body, "direction"),
    headings: unique(all("h1,h2,h3").map(text), 40),
    text: unique(blocks.flatMap((b) => sentences(ownBlockText(b))).filter((t) => t.length >= 25 && t.length <= 300), 60),
    buttons: unique(buttons.map(text).filter((t) => t.length <= 40), 30),
    colours: {
      theme: hex(meta("theme-color")), background: hex(style(document.body, "backgroundColor")) || hex(style(document.documentElement, "backgroundColor")),
      text: hex(style(document.body, "color")), heading: hex(style(h1, "color")),
      buttons: Object.entries(fills).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([c]) => c),
    },
    fonts: { heading: style(h1, "fontFamily"), body: style(document.body, "fontFamily") },
    images: { share: link(meta("og:image")), icons: unique([...document.querySelectorAll('link[rel*="icon"]')].map((l) => l.href), 6) },
  };
})()`;

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
let failed = 0, siteFile = null;
const saved = [];
for (const { shot, url, dev } of plan) {
  let targetId;
  try {
    ({ targetId } = await send("Target.createTarget", { url: "about:blank" }));
    const { sessionId: s } = await send("Target.attachToTarget", { targetId, flatten: true });
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
    if (shot.lazy) await evalJs(s, SCROLL_THROUGH);
    if (shot.facts) {
      const status = await evalJs(s, `performance.getEntriesByType("navigation")[0]?.responseStatus ?? 0`);
      if (status >= 400) throw new Error(`the site answered ${status}: an error page isn't what the product says, so site.json stays as it was`);
      const facts = await evalJs(s, SITE_FACTS);
      saveWhole(path.join(srcDir, "site.json"), `${JSON.stringify(facts, null, 2)}\n`);
      siteFile = path.join(srcDir, "site.json");
      say(`+ what the site says → ${path.relative(ROOT, siteFile)}`);
    }
    let clip;
    if (shot.full) {
      const m = await send("Page.getLayoutMetrics", {}, s);
      const c = m.cssContentSize ?? m.contentSize;
      clip = { x: 0, y: 0, width: dev.width, height: Math.min(Math.ceil(c.height), shot.maxHeight ?? 12000), scale: 1 };
    }
    const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: !!shot.full, ...(clip ? { clip } : {}) }, s);
    const file = path.join(outDir, `${shot.id}.png`);
    saveWhole(file, Buffer.from(data, "base64"));
    const px = (n) => Math.round(n * dev.scale);
    saved.push(file);
    say(`+ ${shot.id}: ${px(dev.width)}×${px(clip ? clip.height : dev.height)} → ${path.relative(ROOT, file)}`);
  } catch (e) {
    failed++;
    console.error(`✕ ${shot.id}: ${e.message}`);
  } finally {
    if (targetId) await send("Target.closeTarget", { targetId }).catch(() => {});
  }
}
ws.close();
await cleanup();
say(`\n${shots.length - failed}/${shots.length} shots saved. Read the PNGs to check them before using${flags.site ? " (a cookie banner or popup? Write shots.json with steps that close it)" : ""}.`);
// once it's written: process.exit right after a print can cut it off when stdout is a pipe, as on Windows
if (flags.json) process.stdout.write(`${JSON.stringify({ ok: !failed, shots: saved, site: siteFile })}\n`, () => process.exit(failed ? 1 : 0));
else process.exit(failed ? 1 : 0);
