# Notices

The **code** in this repository is under the **Halal Motion Videos License** (see [LICENSE](LICENSE)). It's free for individuals, non-profits and companies with up to 3 employees; larger companies need a Company License. Some things it uses or ships are under other terms.

## Remotion (required dependency) — its own license

This project renders video with [Remotion](https://www.remotion.dev), which is under the **Remotion License**, not an open-source license. The full text ships in `node_modules/remotion/LICENSE.md`.

| Who | Remotion license |
| --- | --- |
| Individuals | Free, including commercial use |
| For-profit organizations with **up to 3 employees** | Free |
| Non-profit and not-for-profit organizations | Free |
| Evaluating, not yet using it commercially | Free |
| For-profit organizations with **4 or more employees** | Need a **Company License**: [remotion.pro/license](https://www.remotion.pro/license) |

This repo's license does not change Remotion's terms, and a Halal Motion Videos Company License does **not** include a Remotion license. A company with 4+ employees needs both. Check which tier applies to you before using this project.

## Your brands — yours, and not in this repo

No brands ship with this repository; a fresh install starts with an empty dashboard. The `.gitignore` keeps `src/brands/<brand>/` and `public/<brand>/` out of git.

- **What you create is yours:** brands, their code, assets, screenshots, voice-over and generated sounds.
- **Third-party material keeps its own terms:** logos, screenshots, fonts or sounds you add. Check a font's license (e.g. SIL OFL) before you share a brand folder.

## Styles and moves

### Styles

The built-in styles (`styles/<style>/`) are adapted from [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) by LemoLab: its style sheets, rewritten for this engine, for sound effects without a score and for halal videos.

- **Style sheets** (`STYLE.md`): from its MIT-licensed docs. Its license:

```text
MIT License

Copyright (c) 2026 LemoLab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- **Thumbnails** (`thumb.jpg`): stills of its demo films, © LemoLab, under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changed here: made smaller. Five styles ship without one.
- **Other people's work inside those stills** keeps its own licence. Each demo's `CREDITS` file in Lemo-Opuscar (`styles/<style>/demo/CREDITS`) lists it in full, with what LemoLab changed:

| Thumbnail | Shows | Licence |
| --- | --- | --- |
| `telestrator` | match footage by beIN SPORTS Türkiye | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| `city-symphony` | New York footage by the film-makers named in its [CREDITS](https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/city-symphony/demo/CREDITS) | CC BY 3.0, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) or public domain |
| `caption-news` | bee footage and photos by the authors named in its [CREDITS](https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/caption-news/demo/CREDITS) | CC BY 3.0, CC BY 4.0, CC BY 2.0 or public domain |
| `briefing-board` | photos by BAW – Bundesanstalt für Wasserbau, and "Bear mountain bridge west II" by Russ | CC BY 4.0, and CC BY 2.0 |
| `teardown` | the Corne keyboard (crkbd) by foostan | CC BY 4.0 |
| `white-model` | building data from 3DBAG, by 3DGI and the 3D geoinformation research group, TU Delft | CC BY 4.0 |
| `data-physical` | solar and wind figures from Our World in Data (IRENA's data) | CC BY 4.0 |
| `living-screencast` | Anthropic's Claude interface and mascot, redrawn by LemoLab for an unofficial fan film | they belong to Anthropic |

The other stills are LemoLab's own drawing, or public-domain archives (NASA, the U.S. Geological Survey, the Library of Congress, the U.S. National Archives).

### Moves

The move bank (`tools/moves.mjs`) comes from [video-ad-editor](https://github.com/majedphotos/video-ad-editor), described anew for this engine. Its license:

```text
MIT License

Copyright (c) 2026 Majed Alzaabi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Generated sound kit

`public/_shared/sfx/*.wav` are generated by this repo's own code (`tools/synth_sfx.py`, `npm run sfx`). They're covered by the Halal Motion Videos License like the rest of the code.

`public/_shared/img/grain.png` is a film-grain texture used as an overlay. Confirm its source before publishing.

## Third-party services (your own accounts)

- **Claude Code / Anthropic** runs the Director on your own Claude account; its terms apply.
- **ElevenLabs** voice-over uses your own API key; ElevenLabs' terms apply to the generated audio.
