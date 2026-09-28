import { loadFont } from "@remotion/fonts";

export type FontFile = { family: string; file: string; weight?: string; style?: string };

/**
 * Loads font files from <asset folder>/fonts/ (usually public/<brand>/brand/fonts/). Call once at module
 * scope; rendering waits until every face is ready.
 */
export const loadFonts = (asset: (path: string) => string, faces: FontFile[]) =>
  Promise.all(
    faces.map(({ family, file, weight = "400", style = "normal" }) =>
      loadFont({ family, url: asset(`fonts/${file}`), weight, style }),
    ),
  );
