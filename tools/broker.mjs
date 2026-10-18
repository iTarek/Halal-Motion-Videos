// Tools that a sandboxed Director runs through the dashboard. Inside the macOS sandbox (tools/dashboard/sandbox.mjs)
// `voice` can't read the ElevenLabs key and `shot` can't open the brand's browser profile, so they ask the dashboard to
// run them, with the ticket of the Director run they belong to. The dashboard checks the request (this run's brand and
// video only, known flags, http(s) addresses) and streams the output back; the exit code arrives as a trailer.
import http from "node:http";

const FLAGS = {
  voice: ["only", "force", "id", "text"],
  shot: ["only", "url", "id", "device", "full", "wait", "fresh", "dark"],
};

/** Call first thing in a tool: inside the Director's sandbox it runs the tool through the dashboard and exits. */
export const viaDashboard = async (tool) => {
  const { HMV_TICKET: ticket, HMV_DASHBOARD: dashboard } = process.env;
  if (!ticket || !dashboard) return; // not sandboxed: run here
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

/** The dashboard's check of one request from a Director run on { brand, video }: returns the arguments or throws. */
export const checkToolRequest = (tool, args, { brand, video }) => {
  if (!Object.hasOwn(FLAGS, tool)) throw new Error(`Only ${Object.keys(FLAGS).join(" and ")} run through the dashboard.`);
  if (!Array.isArray(args) || args.length > 20 || !args.every((a) => typeof a === "string" && a.length <= 10000)) throw new Error("Bad arguments.");
  const pos = args.filter((a) => !a.startsWith("--"));
  const mine = pos[0] === brand && (tool === "voice" ? pos.length === 2 && pos[1] === video : pos.length === 1 || (pos.length === 2 && pos[1] === video));
  if (!mine) throw new Error(`This run may only use ${tool} for ${brand} ${video}${tool === "shot" ? ` (or the ${brand} brand kit)` : ""}.`);
  for (const a of args.filter((x) => x.startsWith("--"))) {
    const [k, ...v] = a.slice(2).split("=");
    if (!FLAGS[tool].includes(k)) throw new Error(`--${k} isn't allowed here.`);
    if (k === "url" && !/^https?:\/\//i.test(v.join("="))) throw new Error("--url must be an http(s) address.");
  }
  return args;
};
