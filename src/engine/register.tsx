import React from "react";
import { Composition, Folder, Freeze, useCurrentFrame } from "remotion";
import { MuteSound } from "./components/SoundCues";
import { ThemeProvider } from "./theme";
import type { Video, VideoMeta } from "./types";

/**
 * Motion blur ("film look") is done by tools/render.mjs --blur: it renders the film several times, each shifted
 * by a fraction of a frame (`subframe`), and ffmpeg averages them — fast moves blur like a real camera, with no
 * banding. A sub-frame render is silent; the sound is rendered once and added at the end. Off by default.
 */
type FilmProps = VideoMeta & { subframe?: number };

const Shifted: React.FC<{ by: number; children: React.ReactNode }> = ({ by, children }) => {
  const frame = useCurrentFrame();
  return <Freeze frame={Math.max(0, frame - by)}>{children}</Freeze>;
};

// One stable component per video: the film wrapped in its theme.
const films = new WeakMap<Video, React.FC<FilmProps>>();
const filmOf = (video: Video) => {
  let Film = films.get(video);
  if (!Film) {
    const Inner = video.Film;
    Film = ({ subframe }) => (
      <ThemeProvider value={video.theme}>
        {subframe ? (
          <MuteSound.Provider value={true}>
            <Shifted by={subframe}>
              <Inner />
            </Shifted>
          </MuteSound.Provider>
        ) : (
          <Inner />
        )}
      </ThemeProvider>
    );
    films.set(video, Film);
  }
  return Film;
};

/**
 * Registers every video in Studio as brand folder → video folder → one
 * composition per format, id `<brand>-<video>-<format>`.
 */
export const VideoCompositions: React.FC<{ videos: Video[] }> = ({ videos }) => {
  const brands = [...new Set(videos.map((v) => v.brand))];
  return (
    <>
      {brands.map((brand) => (
        <Folder key={brand} name={brand}>
          {videos
            .filter((v) => v.brand === brand)
            .map((video) => (
              <Folder key={video.id} name={video.id}>
                {video.formats.map((format) => (
                  <Composition
                    key={format.name}
                    id={`${brand}-${video.id}-${format.name}`}
                    component={filmOf(video)}
                    defaultProps={{ brand, video: video.id, format: format.name, subframe: 0 }}
                    durationInFrames={video.durationInFrames}
                    fps={video.fps}
                    width={format.width}
                    height={format.height}
                  />
                ))}
              </Folder>
            ))}
        </Folder>
      ))}
    </>
  );
};
