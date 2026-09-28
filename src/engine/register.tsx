import React from "react";
import { Composition, Folder } from "remotion";
import { ThemeProvider } from "./theme";
import type { Video, VideoMeta } from "./types";

// One stable component per video: the film wrapped in its theme.
const films = new WeakMap<Video, React.FC<VideoMeta>>();
const filmOf = (video: Video) => {
  let Film = films.get(video);
  if (!Film) {
    const Inner = video.Film;
    Film = () => (
      <ThemeProvider value={video.theme}>
        <Inner />
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
                    defaultProps={{ brand, video: video.id, format: format.name }}
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
