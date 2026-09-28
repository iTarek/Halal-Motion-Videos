import { staticFile } from "remotion";

/**
 * Asset resolvers over public/:
 *   public/<brand>/brand/   files every video of a brand uses (fonts, logo, screenshots, app sounds)
 *   public/<brand>/<video>/ files only one video uses
 *   public/_shared/         files any brand can use (grain, the synthesized sound kit)
 */
export const assetsFor = (folder: string) => (path: string) => staticFile(`${folder}/${path}`);

/** public/_shared/<path> — grain, the synthesized sound kit (tools/synth_sfx.py). */
export const shared = (path: string) => staticFile(`_shared/${path}`);
