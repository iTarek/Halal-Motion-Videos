// The style library (tools/styles.mjs): built-ins reach old libraries too, and a deleted one stays deleted.
// Runs on a temp copy, so the real styles/library.json is never touched.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOOLS = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BANK_IDS = ['keynote', 'glass-ui', 'news-explainer', 'paper-cut', 'documentary', 'magazine', 'swiss', 'hand-drawn', 'terminal', 'riso-print',
  'newspaper', 'blueprint', 'vhs', 'brutalist', 'product-studio', 'sticker-cartoon', 'tool-card'];

let n = 0;
/** A fresh copy of the module with its own library file. library: what's saved already, if anything. */
const fresh = async (t, library) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-styles-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'tools'));
  for (const f of ['styles.mjs', 'settings.mjs']) fs.copyFileSync(path.join(TOOLS, f), path.join(root, 'tools', f));
  const file = path.join(root, 'styles', 'library.json');
  if (library) {
    fs.mkdirSync(path.dirname(file));
    fs.writeFileSync(file, JSON.stringify(library));
  }
  return { file, ...(await import(`${pathToFileURL(path.join(root, 'tools', 'styles.mjs')).href}?${n++}`)) };
};

test('a new machine gets all the built-in styles, each usable and complete', async (t) => {
  const { listStyles, getStyle, STYLE_FAMILIES, MOMENT_STYLES } = await fresh(t);
  const ids = listStyles().map((s) => s.id);
  assert.equal(ids.length, 21);
  assert.deepEqual(ids.slice(4), BANK_IDS);
  for (const s of listStyles()) {
    assert.ok(s.name && s.text.length > 100 && s.text.length <= 2000, s.id); // 2000: saveStyle's limit, so it can be edited and saved
    assert.equal(getStyle(s.id), s);
    assert.ok(STYLE_FAMILIES[s.id] || MOMENT_STYLES.includes(s.id), `${s.id} has no family of moves`);
  }
});

test('a library saved before the new styles keeps what it has and gains them', async (t) => {
  const mine = { id: 'calm-cinematic', name: 'Calm & cinematic', text: 'my own edit' };
  const { listStyles, getStyle } = await fresh(t, [mine, { id: 'house', name: 'House', text: 'our look' }]);
  assert.deepEqual(listStyles().map((s) => s.id), ['calm-cinematic', 'house', ...BANK_IDS]); // a starter deleted long ago doesn't come back
  assert.equal(getStyle('calm-cinematic').text, 'my own edit');
});

test('a built-in you delete stays deleted, through later saves', async (t) => {
  const { listStyles, deleteStyle, saveStyle, getStyle, file } = await fresh(t, [{ id: 'house', name: 'House', text: 'our look' }]);
  deleteStyle('vhs');
  assert.equal(getStyle('vhs'), null);
  saveStyle({ name: 'Second', text: 'another look' });
  assert.equal(getStyle('vhs'), null);
  assert.ok(getStyle('second'));
  assert.equal(listStyles().filter((s) => s.deleted).length, 0); // the mark never reaches the page
  assert.deepEqual(JSON.parse(fs.readFileSync(file, 'utf8')).at(-2), { id: 'vhs', deleted: true });
  assert.throws(() => deleteStyle('vhs'), /No such style/);
});

test('editing a built-in leaves one copy of it under the same name, and deleting your own needs no mark', async (t) => {
  const { listStyles, saveStyle, deleteStyle, getStyle, file } = await fresh(t);
  saveStyle({ name: 'Swiss', text: 'my swiss' });
  assert.equal(getStyle('swiss').text, 'my swiss');
  assert.equal(listStyles().filter((s) => s.id === 'swiss').length, 1);
  saveStyle({ name: 'Mine', text: 'mine' });
  deleteStyle('mine');
  assert.ok(!JSON.parse(fs.readFileSync(file, 'utf8')).some((s) => s.id === 'mine'));
});
