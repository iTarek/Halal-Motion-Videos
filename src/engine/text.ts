// Numbers in right-to-left text. A Western-digit range such as 25–30 shows as 30–25 unless it's isolated;
// a hyphen (25-30) doesn't flip, and Arabic digits (١–٢) already run right to left as they should.
const NUM = String.raw`[$€£]?\d+(?:[.,:]\d+)*%?`;
const RANGE = new RegExp(String.raw`${NUM}(?:\s*[–—→]\s*${NUM})+`, "g");

/**
 * Keeps number ranges reading the right way round in an RTL video, with invisible isolate marks.
 * MaskRise, Headline and Kicker already do this; use it for any other on-screen text.
 */
export const isolateNumbers = (text: string) => text.replace(RANGE, (range) => `⁦${range}⁩`);

/** Splits text into words, keeping an isolated range (`25 – 30`) in one piece. */
export const wordsOf = (text: string) => text.match(/(?:⁦[^⁩]*⁩|\S)+/g) ?? [];

const MARKS = /\p{M}/u; // vowel marks: they belong to the letter before them
const ARABIC_LETTER = /[\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06FA-\u06FC]/;
// Letters that don't connect to the one after them: ا د ذ ر ز و and their kin, the Urdu and Kurdish ones too (ڈ ڑ ۆ ے).
const NEVER_JOINS_ON = /[\u0621-\u0625\u0627\u0629\u062F-\u0632\u0648\u0649\u0671-\u0677\u0688-\u0699\u06C0\u06C3-\u06CB\u06CD\u06CF\u06D2\u06D3]/;
const HAMZA = /[\u0621\u0674]/; // a lone hamza connects to nothing, so a kashida before it would hang in the air (شيء)
const ALEF = /[\u0622\u0623\u0625\u0627\u0671-\u0673\u0675]/;
const THE_NAME = /^[وفبتك]?[اٱ]?لله/; // الله, بالله, لله, اللهم, read with the vowel marks taken out

/**
 * The word with a kashida (ـ) where Arabic allows one: the last joint between two connected letters, after any vowel mark,
 * never inside lam-alef. A word with no such place (دار, a number) comes back unchanged: pulse it instead. So does the
 * Name of God, which is never stretched.
 */
export const addKashida = (word: string, count = 1) => {
  if (THE_NAME.test(word.replace(/\p{M}/gu, ""))) return word;
  const chars = [...word];
  let place = -1;
  chars.forEach((c, i) => {
    if (!ARABIC_LETTER.test(c) || NEVER_JOINS_ON.test(c)) return;
    let next = i + 1;
    while (next < chars.length && MARKS.test(chars[next])) next++;
    if (next >= chars.length || !ARABIC_LETTER.test(chars[next]) || HAMZA.test(chars[next]) || (c === "ل" && ALEF.test(chars[next]))) return;
    place = next;
  });
  return place < 0 ? word : [...chars.slice(0, place), "ـ".repeat(count), ...chars.slice(place)].join("");
};
