import React from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop, Finish, SceneTrack } from "../../../engine";
import "../brand/fonts";
import { End } from "./scenes/End";
import { Feature } from "./scenes/Feature";
import { Title } from "./scenes/Title";
import { Soundtrack } from "./Soundtrack";
import { SceneKey, timeline } from "./timeline";

// Scene order. Add a scene: write scenes/X.tsx, give it a length in timeline.ts, list it here.
const SCENE_VIEWS: Array<[SceneKey, React.FC]> = [
  ["title", Title],
  ["feature", Feature],
  ["end", End],
];

export const Film: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <SceneTrack timeline={timeline} views={SCENE_VIEWS} />
    <Finish />
    <Soundtrack />
  </AbsoluteFill>
);
