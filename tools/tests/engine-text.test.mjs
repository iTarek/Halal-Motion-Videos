// Number ranges in right-to-left text (src/engine/text.ts). A TypeScript file, so it needs a Node that strips types.
import test from "node:test";
import assert from "node:assert/strict";

const skip = !process.features.typescript;
const load = () => import("../../src/engine/text.ts");
const I = (s) => `⁦${s}⁩`;

test("number ranges get isolated, whatever the dash, spacing or units", { skip }, async () => {
  const { isolateNumbers } = await load();
  for (const range of ["25–30", "25 – 30", "2025—2026", "25→30", "10:30–11:00", "25%–30%", "$5–$10", "1.5–2.5", "1–2–3"])
    assert.equal(isolateNumbers(range), I(range), range);
});

test("what doesn't flip stays exactly as it was", { skip }, async () => {
  const { isolateNumbers } = await load();
  for (const text of ["25-30", "١–٢", "سورة الفاتحة · ١–٢", "No numbers – here", "30", "10:30", "1/2", "A–B", ""])
    assert.equal(isolateNumbers(text), text, text);
});

test("a range in a sentence is isolated alone, and its full stop stays outside", { skip }, async () => {
  const { isolateNumbers } = await load();
  assert.equal(isolateNumbers("من 25–30 دقيقة"), `من ${I("25–30")} دقيقة`);
  assert.equal(isolateNumbers("25–30."), `${I("25–30")}.`);
  assert.equal(isolateNumbers("1–2 و 3–4"), `${I("1–2")} و ${I("3–4")}`);
});

test("words split on spaces, but an isolated range stays one word", { skip }, async () => {
  const { isolateNumbers, wordsOf } = await load();
  assert.deepEqual(wordsOf("  one  two\nthree "), ["one", "two", "three"]);
  assert.deepEqual(wordsOf(""), []);
  assert.deepEqual(wordsOf(isolateNumbers("من 25 – 30 دقيقة")), ["من", I("25 – 30"), "دقيقة"]);
  assert.deepEqual(wordsOf(isolateNumbers("(25 – 30)")), [`(${I("25 – 30")})`]);
});

test('a kashida goes only where Arabic allows one', { skip }, async () => {
  const { addKashida } = await load();
  assert.equal(addKashida('جميل'), 'جميـل'); // the last joint
  assert.equal(addKashida('كتب', 3), 'كتـــب');
  assert.equal(addKashida('يَسْمَعُ'), 'يَسْمَـعُ'); // after the vowel mark, not between the letter and its mark
  assert.equal(addKashida('سلام'), 'سلام'.replace('س', 'سـ')); // never inside lam-alef, and alef joins on to nothing
  assert.equal(addKashida('سا'), 'سـا'); // a letter that connects on to alef is a joint like any other
  for (const none of ['دار', 'رز', 'ورد', 'و', 'لا', '25', 'Hello', '']) assert.equal(addKashida(none), none, none);
  assert.equal(addKashida('سـلام'), 'سـ' + 'لام'); // already stretched: no joint left but the one it has
});

test('a kashida never hangs before a hamza or after a letter that does not connect', { skip }, async () => {
  const { addKashida } = await load();
  assert.equal(addKashida('شيء'), 'شـيء');
  assert.equal(addKashida('بريء'), 'بـريء');
  assert.equal(addKashida('ملء'), 'مـلء');
  assert.equal(addKashida('دفء'), 'دفء'); // د connects to nothing after it, and ف not to the hamza: no place
  assert.equal(addKashida('ڈر'), 'ڈر'); // Urdu's ڈ doesn't connect onward, like د
  assert.equal(addKashida('کۆر'), 'کـۆر'); // Kurdish: ک connects to ۆ, and ۆ to nothing
});

test('the Name of God is never stretched', { skip }, async () => {
  const { addKashida } = await load();
  for (const name of ['الله', 'بالله', 'والله', 'لله', 'ولله', 'اللهم', 'اللَّهُ', 'ٱللَّهِ', 'لِلَّهِ', 'بِٱللَّهِ']) assert.equal(addKashida(name), name, name);
  assert.equal(addKashida('جميل'), 'جميـل'); // and any other word still is
});
