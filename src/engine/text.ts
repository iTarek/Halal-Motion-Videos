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
