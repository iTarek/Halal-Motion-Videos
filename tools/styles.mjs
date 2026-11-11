// The video-style library: named, reusable descriptions of look, motion and sound.
// Any video of any brand can pick one in the dashboard; the Director passes it to Claude.
// - Built in: a folder each in styles/ with STYLE.md (the full style sheet the Director reads), style.json (its name and
//   one line, in English and Arabic, its category and the families of moves that suit it) and thumb.jpg.
//   Adapted from Lemo-Opuscar (MIT, (c) 2026 LemoLab; thumbnails CC BY 4.0): see NOTICE.md.
// - Your own: a name and a description, in styles/library.json on this machine (git-ignored).
import fs from "node:fs";
import path from "node:path";
import { readJson, ROOT } from "./settings.mjs";

const DIR = path.join(ROOT, "styles");
const FILE = path.join(DIR, "library.json");

/** The order the built-in styles are listed in. */
export const CATEGORIES = [
  "Information & Keynote", "Graphic & Type", "Materials & 3D", "Edit & Documentary", "Evidence Films", "Hand-drawn & Painting",
  "Print & Printmaking", "Cartoon & Anime", "Games", "East Asian Traditions", "Cinema & Eras",
];
/** Styles cut from footage, documents or data that only the user has: picked on purpose, never suggested (tools/moves.mjs). */
export const OWN_MATERIAL = ["Edit & Documentary", "Evidence Films"];

let shipped; // read once: they come with the repo and don't change while it runs
const builtIn = () =>
  (shipped ??= (fs.existsSync(DIR) ? fs.readdirSync(DIR, { withFileTypes: true }) : [])
    .flatMap((d) => {
      // its folder is its id: the page asks for its picture by it, and an agent picks it by it
      const j = d.isDirectory() && /^[a-z0-9-]+$/.test(d.name) && readJson(path.join(DIR, d.name, "style.json"));
      if (!j?.name || !j.line) return [];
      return [{
        id: d.name, name: j.name, text: j.line, builtin: true, nameAr: j.ar, textAr: j.lineAr, category: j.category, families: j.families,
        file: `styles/${d.name}/STYLE.md`, // from the repo's root, for the Director to read
        thumb: fs.existsSync(path.join(DIR, d.name, "thumb.jpg")),
      }];
    })
    .sort((a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) || a.name.localeCompare(b.name, "en")));

/** Your own styles. A library from before the film styles may hold marks of deleted built-ins: they're skipped. */
const saved = () => {
  const list = readJson(FILE);
  return Array.isArray(list) ? list.filter((s) => s?.text) : [];
};

/** Yours first, then the built-in ones. One of yours with a built-in's id (saved before these came along) stands in for it. */
export const listStyles = () => {
  const mine = saved();
  const known = new Set(mine.map((s) => s.id));
  return [...mine, ...builtIn().filter((s) => !known.has(s.id))];
};

const slug = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48) || `style-${Date.now()}`;

const write = (list) => {
  // a library that can't be read is still yours: it's never written over
  if (fs.existsSync(FILE) && !Array.isArray(readJson(FILE))) throw new Error("styles/library.json can't be read. Fix it or move it away, then save again.");
  fs.mkdirSync(DIR, { recursive: true });
  // whole or not at all: it's the only copy of the styles you wrote
  const part = `${FILE}.part`;
  fs.writeFileSync(part, JSON.stringify(list, null, 2) + "\n");
  fs.renameSync(part, FILE);
};

export const getStyle = (id) => (id ? listStyles().find((s) => s.id === id) ?? null : null);

/** Creates or updates one of your styles by name (same name → same style). Returns it. */
export const saveStyle = ({ name, text }) => {
  name = String(name ?? "").trim().slice(0, 60);
  text = String(text ?? "").trim().slice(0, 2000);
  if (!name) throw new Error("Give the style a name.");
  if (!text) throw new Error("Describe the style first.");
  const list = saved();
  const id = slug(name);
  const i = list.findIndex((s) => s.id === id);
  if (i < 0 && builtIn().some((s) => s.id === id || slug(s.name) === id)) throw new Error("That's the name of a built-in style. Give yours another name.");
  const style = { id, name, text };
  if (i >= 0) list[i] = style;
  else list.push(style);
  write(list);
  return style;
};

/** Deletes one of your styles. The built-in ones stay. */
export const deleteStyle = (id) => {
  const list = saved();
  if (!list.some((s) => s.id === id)) throw new Error(builtIn().some((s) => s.id === id) ? "Built-in styles can't be deleted." : "No such style.");
  write(list.filter((s) => s.id !== id));
};
