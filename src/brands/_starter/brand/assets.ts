import { assetsFor } from "../../../engine";

// Must match this brand's folder name in src/brands/ and public/ (tools/new.mjs sets it).
export const BRAND_ID = "_starter";

/** public/_starter/brand/<path> — files every video of this brand uses, e.g. brandAsset("img/logo.png") */
export const brandAsset = assetsFor(`${BRAND_ID}/brand`);
