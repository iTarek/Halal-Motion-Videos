import type { Video } from "../engine";

// Every brand is found automatically: each folder src/brands/<brand>/ with an index.ts that
// default-exports its videos. Nothing to register. Folders starting with "_" (the starter
// template) are skipped. Brands aren't part of the published repo (see .gitignore), so a fresh
// install starts empty.
const brands = require.context("./", true, /^\.\/[a-z][a-z0-9-]*\/index\.ts$/);

/** Every video of every brand. Each brand is a folder in Studio, each video a folder inside it. */
export const VIDEOS: Video[] = brands
  .keys()
  .sort()
  .flatMap((key) => (brands(key) as { default: Video[] }).default);
