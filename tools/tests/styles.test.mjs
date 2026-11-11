// The style library (tools/styles.mjs): the built-in film styles are complete and written for this repo, and yours sit
// beside them, starting with the 21 every machine gets. Runs on a temp copy, so the real styles/library.json is never touched.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOOLS = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const STYLES = path.join(TOOLS, '..', 'styles');
const FAMILIES = ['calm', 'punch', 'editorial', 'onetake']; // tools/moves.mjs
const ARABIC = /[؀-ۿ]/;

let n = 0;
/** A fresh copy of the module and the built-in styles, with its own library file. library: what's saved already, if anything. */
const fresh = async (t, library) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-styles-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'tools'));
  for (const f of ['styles.mjs', 'settings.mjs']) fs.copyFileSync(path.join(TOOLS, f), path.join(root, 'tools', f));
  fs.cpSync(STYLES, path.join(root, 'styles'), { recursive: true, filter: (src) => !src.endsWith('library.json') });
  const file = path.join(root, 'styles', 'library.json');
  if (library) fs.writeFileSync(file, JSON.stringify(library));
  return { root, file, ...(await import(`${pathToFileURL(path.join(root, 'tools', 'styles.mjs')).href}?${n++}`)) };
};

const STARTER_IDS = ['calm-cinematic', 'bold-punchy', 'clean-product-demo', 'studio-showreel', 'keynote', 'glass-ui', 'news-explainer', 'paper-cut', 'documentary',
  'magazine', 'swiss', 'hand-drawn', 'terminal', 'riso-print', 'newspaper', 'blueprint-classic', 'vhs', 'brutalist', 'product-studio', 'sticker-cartoon', 'tool-card'];

test('a new machine starts with the 21 starter styles as its own, ahead of the built-in ones', async (t) => {
  const { listStyles, getStyle, file } = await fresh(t);
  const mine = listStyles().filter((s) => !s.builtin);
  assert.deepEqual(listStyles().slice(0, 21), mine); // yours come first
  assert.deepEqual(mine.map((s) => s.id), STARTER_IDS);
  for (const s of mine) {
    assert.equal(getStyle(s.id), s);
    assert.ok(s.name && s.text.length > 100 && s.text.length <= 2000, s.id); // 2000: saveStyle's limit, so it can be edited and saved
    assert.equal(s.file, undefined); // a short description, no style sheet
    assert.ok(s.families?.every((f) => FAMILIES.includes(f)) ?? ['vhs', 'brutalist'].includes(s.id), `${s.id}: ${s.families}`); // those two are for a moment, never suggested
  }
  assert.equal(fs.existsSync(file), false); // listing them writes nothing
  const builtIn = listStyles().filter((s) => s.builtin);
  for (const s of mine) assert.ok(!builtIn.some((b) => b.name.toLowerCase() === s.name.toLowerCase()), `${s.name} is a built-in style's name too`); // --style takes a name
});

test('saving a starter under its own name changes that starter, whichever it is', async (t) => {
  const { listStyles, saveStyle } = await fresh(t);
  for (const id of STARTER_IDS) assert.equal(saveStyle({ name: listStyles().find((s) => s.id === id).name, text: 'mine' }).id, id); // never a second style, never "a built-in style's name"
  assert.equal(listStyles().filter((s) => !s.builtin).length, 21);
});

test('a starter you change is saved as yours, and one you delete stays deleted, through later saves', async (t) => {
  const { listStyles, saveStyle, deleteStyle, getStyle, file } = await fresh(t);
  saveStyle({ name: 'Swiss', text: 'my swiss' });
  assert.equal(getStyle('swiss').text, 'my swiss');
  assert.deepEqual(getStyle('swiss').families, ['punch', 'editorial']); // it still suits the same moves
  assert.equal(listStyles().filter((s) => s.id === 'swiss').length, 1);
  deleteStyle('vhs');
  assert.equal(getStyle('vhs'), null);
  saveStyle({ name: 'Second', text: 'another look' });
  assert.equal(getStyle('vhs'), null);
  assert.deepEqual(JSON.parse(fs.readFileSync(file, 'utf8')), [{ id: 'swiss', name: 'Swiss', text: 'my swiss' }, { id: 'vhs', deleted: true }, { id: 'second', name: 'Second', text: 'another look' }]);
  assert.equal(listStyles().filter((s) => s.deleted).length, 0); // the mark never reaches the page
  assert.equal(listStyles().filter((s) => !s.builtin).length, 21); // 21 starters, one deleted, one added
  assert.throws(() => deleteStyle('vhs'), /No such style/);
  deleteStyle('swiss'); // the changed one goes too, and the starter doesn't come back in its place
  assert.equal(getStyle('swiss'), null);
  saveStyle({ name: 'VHS', text: 'mine now' }); // saving under a deleted starter's name brings it back as yours
  assert.equal(getStyle('vhs').text, 'mine now');
  assert.equal(JSON.parse(fs.readFileSync(file, 'utf8')).filter((s) => s.id === 'vhs').length, 1);
});

test('a library saved before the starters shipped keeps what it has and gains the rest', async (t) => {
  const edited = { id: 'calm-cinematic', name: 'Calm & cinematic', text: 'my own edit' };
  const { listStyles, getStyle } = await fresh(t, [edited, { id: 'house', name: 'House', text: 'our look' }]);
  assert.deepEqual(listStyles().filter((s) => !s.builtin).map((s) => s.id), ['calm-cinematic', 'house', ...STARTER_IDS.slice(1)]);
  assert.equal(getStyle('calm-cinematic').text, 'my own edit');
});

test('one of yours typed into the file without an id is still there after a later save', async (t) => {
  const byHand = { name: 'By hand', text: 'typed into the file' };
  const { saveStyle, file } = await fresh(t, [byHand, { deleted: true }]);
  saveStyle({ name: 'Mine', text: 'mine' });
  assert.deepEqual(JSON.parse(fs.readFileSync(file, 'utf8')), [byHand, { id: 'mine', name: 'Mine', text: 'mine' }]); // a mark of nothing is dropped
});

test('a new machine gets the 66 film styles, each complete, in both languages', async (t) => {
  const { root, listStyles, getStyle, CATEGORIES } = await fresh(t);
  const styles = listStyles().filter((s) => s.builtin);
  assert.equal(styles.length, 66);
  assert.deepEqual(styles.map((s) => CATEGORIES.indexOf(s.category)), styles.map((s) => CATEGORIES.indexOf(s.category)).sort((a, b) => a - b)); // listed by category
  for (const s of styles) {
    assert.equal(getStyle(s.id), s);
    assert.equal(s.builtin, true);
    assert.match(s.id, /^[a-z0-9-]+$/); // the server's thumbnail route takes only these
    assert.ok(s.name && s.text.length >= 40 && s.text.length <= 140, `${s.id}: its line is ${s.text?.length} characters`);
    assert.ok(ARABIC.test(s.nameAr) && ARABIC.test(s.textAr), `${s.id} has no Arabic`);
    assert.ok(CATEGORIES.includes(s.category), `${s.id}: ${s.category}`);
    assert.ok(s.families.length >= 1 && s.families.length <= 2 && s.families.every((f) => FAMILIES.includes(f)), `${s.id}: ${s.families}`);
    assert.ok(fs.existsSync(path.join(root, s.file)), s.file);
    assert.equal(s.thumb, true, `${s.id} has no picture: the Style card would show an empty tile`);
    assert.ok(fs.statSync(path.join(root, 'styles', s.id, 'thumb.jpg')).size < 80_000, `${s.id}: a thumbnail stays small`);
  }
  // the page lists them under their category, and translates that heading by its exact English
  const arabic = fs.readFileSync(path.join(TOOLS, 'dashboard', 'i18n.js'), 'utf8');
  for (const c of CATEGORIES) assert.ok(arabic.includes(`'${c}':'`), `"${c}" has no Arabic in i18n.js`);
});

// The sheets came from a library built on another engine, with a score. Each one has to be true here: this repo's
// sections, no music, none of that engine's tools.
test('every style sheet is written for this repo', () => {
  const NOT_HERE = /\b(music|musical|melody|melodies|orchestra|piano|guitar|violin|jazz|songs?|drums?|LUFS|three\.js|WebGL|DEMO\.md|24 fps|whisper|mux|subtitles?)\b|1920×1080|\.srt\b/i;
  const SECTIONS = ['Essence, and what it is not', 'Sound palette', 'Building it here', 'In a product video', 'Variation space'];
  for (const id of fs.readdirSync(STYLES).filter((d) => fs.existsSync(path.join(STYLES, d, 'style.json')))) {
    const sheet = fs.readFileSync(path.join(STYLES, id, 'STYLE.md'), 'utf8');
    const heads = [...sheet.matchAll(/^## \d+\. (.+)$/gm)].map((m) => m[1]);
    assert.ok(heads.length >= 12, `${id}: ${heads.length} sections`);
    assert.deepEqual(heads.filter((h) => SECTIONS.includes(h)), SECTIONS, `${id}: its sections`);
    assert.deepEqual(heads.slice(-2), SECTIONS.slice(-2), `${id}: "In a product video" comes right before "Variation space"`);
    assert.deepEqual([...sheet.matchAll(/^## (\d+)\./gm)].map((m) => Number(m[1])), heads.map((_, i) => i + 1), `${id}: its section numbers`);
    assert.ok(sheet.trimEnd().endsWith(`Adapted for Halal Motion Videos from the \`${id}\` style of [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab (MIT).`), `${id}: its credit line`);
    for (const [what, text] of [['STYLE.md', sheet], ['style.json', fs.readFileSync(path.join(STYLES, id, 'style.json'), 'utf8')]])
      assert.equal(text.match(NOT_HERE)?.[0], undefined, `${id}/${what}`);
  }
});

test('one of yours with a built-in\'s id stands in for it, and a mark for a style that no longer exists is skipped', async (t) => {
  const mine = { id: 'blueprint', name: 'Blueprint', text: 'my own blueprint' };
  const { listStyles, getStyle } = await fresh(t, [mine, { id: 'house', name: 'House', text: 'our look' }, { id: 'long-gone', deleted: true }]);
  const ids = listStyles().map((s) => s.id);
  assert.deepEqual(ids.slice(0, 2), ['blueprint', 'house']);
  assert.equal(ids.length, 21 + 66 + 1); // the starters, the built-in ones (yours standing in for one), and House
  assert.equal(ids.filter((id) => id === 'blueprint').length, 1);
  assert.deepEqual(getStyle('blueprint'), mine);
  assert.equal(getStyle('long-gone'), null);
});

test('a built-in style can\'t be overwritten or deleted; yours can be saved, updated and deleted', async (t) => {
  const { saveStyle, deleteStyle, getStyle, file } = await fresh(t);
  assert.throws(() => saveStyle({ name: 'Blueprint', text: 'mine' }), /built-in style/);
  assert.throws(() => saveStyle({ name: 'swiss motion graphics', text: 'mine' }), /built-in style/); // its name, not only its id (swiss-motion)
  assert.throws(() => deleteStyle('blueprint'), /can't be deleted/);
  assert.throws(() => deleteStyle('nope'), /No such style/);
  assert.equal(fs.existsSync(file), false); // nothing was written
  assert.deepEqual(saveStyle({ name: 'Mine', text: 'first' }), { id: 'mine', name: 'Mine', text: 'first' });
  saveStyle({ name: 'Mine', text: 'second' });
  assert.equal(getStyle('mine').text, 'second');
  assert.deepEqual(JSON.parse(fs.readFileSync(file, 'utf8')), [{ id: 'mine', name: 'Mine', text: 'second' }]);
  deleteStyle('mine');
  assert.deepEqual(JSON.parse(fs.readFileSync(file, 'utf8')), []);
  assert.equal(getStyle('blueprint').builtin, true);
  assert.deepEqual(fs.readdirSync(path.dirname(file)).filter((f) => f.startsWith('library.json')), ['library.json']); // written whole: no part left behind
});

test('a library that can\'t be read is never written over, and a folder that isn\'t a style is skipped', async (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-styles-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'tools'));
  for (const f of ['styles.mjs', 'settings.mjs']) fs.copyFileSync(path.join(TOOLS, f), path.join(root, 'tools', f));
  fs.cpSync(path.join(STYLES, 'blueprint'), path.join(root, 'styles', 'blueprint'), { recursive: true });
  for (const [dir, json] of [['My Style', '{"name":"Mine","line":"A look."}'], ['half', '{"name":"Half"'], ['nameless', '{"line":"A look."}']]) {
    fs.mkdirSync(path.join(root, 'styles', dir));
    fs.writeFileSync(path.join(root, 'styles', dir, 'style.json'), json);
  }
  const file = path.join(root, 'styles', 'library.json');
  const broken = '[{"id":"house","name":"House","text":"our look"},'; // edited by hand, and not finished
  fs.writeFileSync(file, broken);
  const { listStyles, saveStyle, deleteStyle } = await import(`${pathToFileURL(path.join(root, 'tools', 'styles.mjs')).href}?${n++}`);
  assert.deepEqual(listStyles().map((s) => s.id), ['blueprint']);
  assert.throws(() => saveStyle({ name: 'Mine', text: 'mine' }), /can't be read/);
  assert.throws(() => deleteStyle('house'), /No such style/);
  assert.equal(fs.readFileSync(file, 'utf8'), broken);
});

test('one of yours saved under a built-in\'s name before the film styles can still be updated', async (t) => {
  const { saveStyle, getStyle } = await fresh(t, [{ id: 'blueprint', name: 'Blueprint', text: 'old' }]);
  saveStyle({ name: 'Blueprint', text: 'new' });
  assert.equal(getStyle('blueprint').text, 'new');
});
