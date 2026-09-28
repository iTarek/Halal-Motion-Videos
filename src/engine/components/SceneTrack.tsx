import React from "react";
import { Sequence } from "remotion";
import type { Timeline } from "../timeline";
import { Sweep } from "./Sweep";

/**
 * Lays scenes on the timeline in order (each with its overlap tail), then a
 * light Sweep across every cut after the first scene.
 */
export const SceneTrack = <K extends string>({
  timeline,
  views,
  sweeps = true,
  premountFor = 30,
}: {
  timeline: Timeline<K>;
  views: Array<[K, React.FC]>;
  sweeps?: boolean;
  premountFor?: number;
}) => (
  <>
    {views.map(([key, View]) => (
      <Sequence key={key} name={key} premountFor={premountFor} {...timeline.span(key)}>
        <View />
      </Sequence>
    ))}
    {sweeps && views.slice(1).map(([key]) => <Sweep key={key} at={timeline.scenes[key].from} />)}
  </>
);
