import { loadFonts } from "../../../engine";
import { brandAsset } from "./assets";

// Brand fonts from public/<brand>/brand/fonts/. Empty = system fonts only. Example:
//   { family: "Inter", file: "Inter-Bold.ttf", weight: "700" },
// then set F.ui = "Inter" in theme.ts.
export const fontsReady = loadFonts(brandAsset, []);
