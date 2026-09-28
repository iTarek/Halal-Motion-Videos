import { assetsFor } from "../../../engine";
import { BRAND_ID } from "../brand/assets";

// Must match this video's folder name (tools/new.mjs sets it).
export const VIDEO_ID = "video01";

/** public/<brand>/<VIDEO_ID>/<path> — files only this video uses, e.g. asset("img/hero.png") */
export const asset = assetsFor(`${BRAND_ID}/${VIDEO_ID}`);
