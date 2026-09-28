import React from "react";
import { VideoCompositions } from "./engine";
import { VIDEOS } from "./brands";

export const Root: React.FC = () => <VideoCompositions videos={VIDEOS} />;
