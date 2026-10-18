// What a sandboxed Director asks the dashboard to do for it, with the ticket of the Director run it belongs to. Inside
// the macOS sandbox (tools/dashboard/sandbox.mjs) `voice` can't read the ElevenLabs key and `shot` can't open the
// brand's browser profile, so the dashboard runs them: it checks the request (this run's brand and video only, known
// flags, http(s) addresses) and streams the output back; the exit code arrives as a trailer.
// `review` stays in the sandbox (it bundles code the Director wrote, which could import any file the dashboard can
// read); only its soundtrack crosses over, for the dashboard to hear the voice-over back (`checkHearRequest`).
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const FLAGS = {
  voice: ["only", "force", "id", "text"],
  shot: ["only", "url", "id", "device", "full", "wait", "fresh", "dark"],
};

/** Is this tool running inside the Director's sandbox, with a ticket to ask the dashboard? */
export const inSandbox = () => !!(process.env.HMV_TICKET && process.env.HMV_DASHBOARD);

/** Call first thing in a tool: inside the Director's sandbox it runs the tool through the dashboard and exits. */
export const viaDashboard = async (tool) => {
  if (!inSandbox()) return; // run here
  const { HMV_TICKET: ticket, HMV_DASHBOARD: dashboard } = process.env;
  const code = await new Promise((resolve) => {
    const req = http.request(new URL("/api/director/tool", dashboard), { method: "POST", headers: { "Content-Type": "application/json" } }, (res) => {
      let error = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (res.statusCode === 200 ? process.stdout.write(c) : (error += c)));
      res.on("error", () => {}); // a dropped connection: reported on close
      res.on("close", () => {
        if (res.statusCode === 200 && res.complete) return resolve(Number(res.trailers["x-exit-code"] ?? 1));
        if (res.statusCode === 200) console.error(`Lost the dashboard while it ran ${tool}.`);
        else {
          let msg = error;
          try {
            msg = JSON.parse(error).error ?? error;
          } catch {}
          console.error(`The dashboard didn't run ${tool}: ${msg}`);
        }
        resolve(1);
      });
    });
    req.on("error", (e) => {
      console.error(`Couldn't reach the dashboard to run ${tool} (${e.message}). Is it still running?`);
      resolve(1);
    });
    req.end(JSON.stringify({ ticket, tool, args: process.argv.slice(2) }));
  });
  process.exit(code);
};

/** Inside the sandbox: asks the dashboard for one thing (POST /api/director/<action>) and returns its JSON answer. */
export const askDashboard = async (action, body) => {
  const r = await fetch(new URL(`/api/director/${action}`, process.env.HMV_DASHBOARD), {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, ticket: process.env.HMV_TICKET }),
  }).catch((e) => {
    throw new Error(`couldn't reach the dashboard (${e.message}). Is it still running?`);
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error ?? `the dashboard answered ${r.status}`);
  return j;
};

const MAX_HEAR_BYTES = 200 * 1024 * 1024; // ~18 min of 48 kHz stereo; videos are at most 10

/** The dashboard's check of a sandboxed run's request to hear a soundtrack: a WAV inside this run's own
 *  .director/tmp/<brand>-<video>/, with no symlink or hard link reaching out of it. Returns its real path or throws. */
export const checkHearRequest = (file, { brand, video }, root) => {
  const realOf = (p) => {
    try {
      return fs.realpathSync(p);
    } catch {
      return null;
    }
  };
  const dir = path.join(realOf(root), ".director", "tmp", `${brand}-${video}`); // where it must really be, links resolved
  const real = typeof file === "string" && file ? realOf(path.resolve(root, file)) : null;
  const st = real && fs.statSync(real);
  if (!real?.startsWith(dir + path.sep) || !st.isFile() || st.nlink !== 1 || st.size > MAX_HEAR_BYTES)
    throw new Error(`Only a soundtrack in .director/tmp/${brand}-${video}/ can be heard.`);
  const head = Buffer.alloc(12);
  const fd = fs.openSync(real, "r");
  try {
    fs.readSync(fd, head, 0, 12, 0);
  } finally {
    fs.closeSync(fd);
  }
  if (head.toString("latin1", 0, 4) !== "RIFF" || head.toString("latin1", 8, 12) !== "WAVE") throw new Error("Only a WAV file can be heard.");
  return real;
};

/** The dashboard's check of one request from a Director run on { brand, video }: returns the arguments or throws. */
export const checkToolRequest = (tool, args, { brand, video }) => {
  if (!Object.hasOwn(FLAGS, tool)) throw new Error(`Only ${Object.keys(FLAGS).join(", ")} run through the dashboard.`);
  if (!Array.isArray(args) || args.length > 20 || !args.every((a) => typeof a === "string" && a.length <= 10000)) throw new Error("Bad arguments.");
  const pos = args.filter((a) => !a.startsWith("--"));
  const mine = pos[0] === brand && (tool !== "shot" ? pos.length === 2 && pos[1] === video : pos.length === 1 || (pos.length === 2 && pos[1] === video));
  if (!mine) throw new Error(`This run may only use ${tool} for ${brand} ${video}${tool === "shot" ? ` (or the ${brand} brand kit)` : ""}.`);
  for (const a of args.filter((x) => x.startsWith("--"))) {
    const [k, ...v] = a.slice(2).split("=");
    if (!FLAGS[tool].includes(k)) throw new Error(`--${k} isn't allowed here.`);
    if (k === "url" && !/^https?:\/\//i.test(v.join("="))) throw new Error("--url must be an http(s) address.");
  }
  return args;
};
