// The move bank (tools/moves.mjs): what a palette holds, and that a brand's videos don't move alike. The command runs on
// a temp copy, so no real video's moves.json is touched.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CUES, FAMILIES, MOVES, planMoves } from '../moves.mjs';

const TOOLS = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
/** The built-in styles, from a copy with no library file: the real styles/library.json stays out of these tests. */
const builtInStyles = async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-moves-styles-'));
  try {
    fs.mkdirSync(path.join(root, 'tools'));
    for (const f of ['styles.mjs', 'settings.mjs']) fs.copyFileSync(path.join(TOOLS, f), path.join(root, 'tools', f));
    return (await import(pathToFileURL(path.join(root, 'tools', 'styles.mjs')).href)).listStyles();
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
};
const styles = await builtInStyles();
const byId = new Map(MOVES.map((m) => [m.id, m]));
const all = (plan) => [...plan.core, ...plan.accents].map((m) => byId.get(m.id));

test('every move in the bank is complete', () => {
  assert.equal(MOVES.length, 97);
  assert.equal(byId.size, MOVES.length, 'two moves share an id');
  for (const m of MOVES) {
    assert.ok(m.name && m.how.length > 20, m.id);
    assert.ok(['caption', 'text', 'transition', 'camera', 'card', 'rule'].includes(m.role), m.id);
    assert.ok(m.families.every((f) => FAMILIES.includes(f)), m.id);
    assert.ok(m.cues.every((c) => CUES.includes(c)), m.id);
  }
  for (const family of FAMILIES)
    for (const roles of [['text'], ['transition'], ['camera', 'card']])
      assert.ok(MOVES.some((m) => m.families.includes(family) && roles.includes(m.role)), `${family} has no ${roles} move`);
});

test('a palette is 3 core moves of one family, the same each time for the same video', () => {
  const plan = planMoves({ seed: 'demo/video01', styles });
  assert.deepEqual(plan.core.map((m) => m.role).slice(0, 2), ['text', 'transition']);
  assert.ok(['camera', 'card'].includes(plan.core[2].role));
  assert.ok(plan.core.every((m) => byId.get(m.id).families.includes(plan.family) && m.how));
  assert.ok(plan.accents.length >= 1 && plan.accents.every((m) => !plan.core.some((c) => c.id === m.id)));
  assert.deepEqual(plan.always.map((m) => m.id), ['jcut', 'matchCut']);
  assert.deepEqual(planMoves({ seed: 'demo/video01', styles }), plan);
  assert.notDeepEqual(planMoves({ seed: 'demo/video02', styles }).core, plan.core);
});

test('Arabic moves only in right-to-left videos, and always one there', () => {
  for (let i = 0; i < 40; i++) {
    assert.ok(!all(planMoves({ seed: `ltr${i}`, styles })).some((m) => m.arabic), `seed ${i}`);
    assert.ok(all(planMoves({ seed: `rtl${i}`, rtl: true, styles })).some((m) => m.arabic), `seed ${i}`);
  }
});

test('a brand that forbids splitting words never gets a move that does, and nobody gets the verse move by chance', () => {
  for (let i = 0; i < 80; i++) {
    const cues = i % 2 ? ['reveal', 'emphasis', 'tech', 'contrast'] : [];
    assert.ok(!all(planMoves({ seed: `s${i}`, rtl: true, noSplit: true, cues, styles })).some((m) => m.splits), `seed ${i}`);
    assert.ok(!all(planMoves({ seed: `s${i}`, rtl: true, cues, styles })).some((m) => m.manual), `seed ${i}`);
  }
});

test('no move tells the Director an effect is safe near a verse', () => {
  assert.deepEqual(MOVES.filter((m) => m.id !== 'ayahCalm' && /\bverse\b/i.test(m.how) && !/never/i.test(m.how)).map((m) => m.id), []);
});

test('a style someone named Constructor is a style like any other', () => {
  const mine = [...styles, { id: 'constructor', name: 'Constructor', text: 'my look' }];
  assert.equal(planMoves({ seed: 'a', styles: mine }).style.suggested, true);
  assert.deepEqual(planMoves({ seed: 'a', styleId: 'constructor', styles: mine }).style, { id: 'constructor', name: 'Constructor', suggested: false });
});

test("a brand's videos differ: core moves aren't reused within 3 videos, nor the family or style next to each other", () => {
  const history = [];
  for (let i = 0; i < 12; i++) {
    const plan = planMoves({ seed: `demo/video${i}`, history, styles });
    const recent = new Set(history.slice(-3).flatMap((p) => p.core.map((m) => m.id)));
    assert.deepEqual(plan.core.filter((m) => recent.has(m.id)), [], `video ${i}`);
    assert.notEqual(plan.family, history.at(-1)?.family, `video ${i}`);
    assert.ok(!history.slice(-3).some((p) => p.style.id === plan.style.id), `video ${i}: style ${plan.style.id} again`);
    history.push(plan);
  }
});

test('the moments asked for get accents, at most 4', () => {
  const plan = planMoves({ seed: 'demo', cues: ['number', 'price', 'cta', 'hit', 'reveal', 'tech'], styles });
  assert.deepEqual(plan.accents.map((m) => m.cue), ['number', 'price', 'cta', 'hit']);
  for (const m of plan.accents) assert.ok(byId.get(m.id).cues.includes(m.cue), m.id);
});

test("a video's own style sets the family and is kept; without one, a whole-film style is suggested", () => {
  for (let i = 0; i < 20; i++) {
    const plan = planMoves({ seed: `p${i}`, styleId: 'keynote', styles });
    assert.ok(['calm', 'onetake'].includes(plan.family));
    assert.deepEqual(plan.style, { id: 'keynote', name: 'Keynote', suggested: false });
    const open = planMoves({ seed: `q${i}`, styles });
    assert.equal(open.style.suggested, true);
    assert.equal(open.style.text, styles.find((s) => s.id === open.style.id).text); // a name alone says nothing about the look
    assert.ok(!['vhs', 'brutalist'].includes(open.style.id));
  }
  assert.equal(planMoves({ seed: 'x', family: 'punch', styles }).family, 'punch');
});

/** A brand with videos on a temp copy of the tool. */
const temp = (t, brandDoc = '', theme = 'direction: "ltr"') => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hmv-moves-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'tools'));
  for (const f of ['moves.mjs', 'styles.mjs', 'settings.mjs']) fs.copyFileSync(path.join(TOOLS, f), path.join(root, 'tools', f));
  const brand = path.join(root, 'src', 'brands', 'demo');
  fs.mkdirSync(path.join(brand, 'brand'), { recursive: true });
  fs.writeFileSync(path.join(brand, 'brand', 'BRAND.md'), brandDoc);
  fs.writeFileSync(path.join(brand, 'brand', 'theme.ts'), theme);
  for (const v of ['video01', 'video02']) {
    fs.mkdirSync(path.join(brand, v));
    fs.writeFileSync(path.join(brand, v, 'index.ts'), '');
  }
  const run = (...args) => spawnSync(process.execPath, [path.join(root, 'tools', 'moves.mjs'), ...args], { encoding: 'utf8', windowsHide: true });
  const saved = (v) => JSON.parse(fs.readFileSync(path.join(brand, v, 'moves.json'), 'utf8'));
  return { root, brand, run, saved };
};

test('the command saves a palette, shows it again unchanged, and only --again makes a new one', (t) => {
  const { run, saved } = temp(t);
  const first = run('demo', 'video01', '--cues=number,cta');
  assert.equal(first.status, 0, first.stderr);
  assert.match(first.stdout, /Core: build the whole video around these three/);
  assert.match(first.stdout, /Saved: .*moves\.json/);
  assert.match(first.stdout, /none of them goes on Quran or other sacred text/);
  const plan = saved('video01');
  assert.deepEqual(plan.accents.map((m) => m.cue), ['number', 'cta']);
  const unchanged = run('demo', 'video01', '--family=calm'); // flags don't change a palette already chosen, and it says so…
  assert.equal(unchanged.status, 0);
  assert.match(unchanged.stderr, /already chosen.*--again/);
  assert.deepEqual(saved('video01'), plan);
  assert.equal(run('demo', 'video01').stderr, ''); // nothing to say when it's only being shown
  const again = JSON.parse(run('demo', 'video01', '--again', '--json').stdout); // …--again does
  assert.equal(again.ok, true);
  assert.match(again.file, /moves\.json$/);
  assert.ok(!fs.existsSync(`${again.file}.part`)); // written whole, nothing left beside it
  assert.deepEqual(saved('video01').core, again.core);
  assert.deepEqual(again.core.filter((m) => plan.core.some((p) => p.id === m.id)), []);
});

test("the command remembers the brand's other videos", (t) => {
  const { run, saved } = temp(t);
  run('demo', 'video01');
  run('demo', 'video02');
  const [a, b] = [saved('video01'), saved('video02')];
  assert.deepEqual(a.core.filter((m) => b.core.some((x) => x.id === m.id)), []);
  assert.notEqual(a.family, b.family);
});

test("the command reads the direction from the video's language, then the theme, and the brand's rule on splitting", (t) => {
  const { root, run, saved } = temp(t, 'Never split Arabic words into letters.', 'direction: "rtl"');
  run('demo', 'video01');
  assert.ok(all(saved('video01')).some((m) => m.arabic)); // the theme
  assert.ok(!all(saved('video01')).some((m) => m.splits));
  fs.mkdirSync(path.join(root, '.director', 'demo'), { recursive: true });
  fs.writeFileSync(path.join(root, '.director', 'demo', 'video02.json'), JSON.stringify({ videoLanguage: 'English', styleId: 'swiss' }));
  run('demo', 'video02');
  assert.ok(!all(saved('video02')).some((m) => m.arabic)); // the video's language wins
  assert.deepEqual(saved('video02').style, { id: 'swiss', name: 'Swiss', suggested: false }); // and its style
  // Arabic-only moves (kashida, dots, reed pen) need Arabic script, not just right to left
  fs.writeFileSync(path.join(root, '.director', 'demo', 'video02.json'), JSON.stringify({ videoLanguage: 'Hebrew' }));
  run('demo', 'video02', '--again');
  assert.ok(!all(saved('video02')).some((m) => m.arabic));
});

test('--family, --rtl and --ltr shape a new palette, whatever the theme says', (t) => {
  const { run, saved } = temp(t, '', 'direction: "rtl"');
  run('demo', 'video01', '--family=calm', '--ltr');
  assert.equal(saved('video01').family, 'calm');
  assert.ok(!all(saved('video01')).some((m) => m.arabic));
  run('demo', 'video01', '--again', '--rtl');
  assert.ok(all(saved('video01')).some((m) => m.arabic));
});

test('a brand whose theme file also defines an Arabic variant is still read by its own direction', (t) => {
  const { run, saved } = temp(t, '', 'export const theme = { direction: "ltr" };\nexport const themeAr = { ...theme, direction: "rtl" };');
  run('demo', 'video01');
  assert.ok(!all(saved('video01')).some((m) => m.arabic));
});

test('a moves.json edited out of shape counts as no palette, here and for the brand next door', (t) => {
  const { brand, run, saved } = temp(t);
  fs.writeFileSync(path.join(brand, 'video01', 'moves.json'), '{"family":"punch"}');
  fs.writeFileSync(path.join(brand, 'video02', 'moves.json'), 'half a fi');
  const r = run('demo', 'video01');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(saved('video01').core.length, 3);
});

test('the command explains what it refuses, and lists the bank', (t) => {
  const { run } = temp(t);
  assert.match(run('demo').stderr, /Usage/);
  // the tracked template every new video copies gets no palette, and a name can't walk out of the brands folder
  assert.match(run('_starter', 'video01').stderr, /Usage/);
  assert.match(run('..', 'demo').stderr, /Usage/);
  assert.match(run('demo', 'video09').stderr, /No video demo\/video09/);
  assert.match(run('demo', 'video01', '--family=wild').stderr, /No family "wild"/);
  assert.match(run('demo', 'video01', '--cues=wild').stderr, /No cue "wild"/);
  const refused = run('demo', 'video09', '--json'); // an agent reading --json gets its answer on stdout
  assert.equal(refused.status, 1);
  assert.deepEqual(JSON.parse(refused.stdout), { ok: false, error: 'No video demo/video09.' });
  assert.equal(JSON.parse(run('--list', '--json').stdout).moves.length, MOVES.length);
  assert.match(run('--list').stdout, /riseUp: Mask rise/);
});
