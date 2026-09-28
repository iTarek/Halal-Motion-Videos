import type { Format } from "./types";

export const VERTICAL: Format = { name: "vertical", width: 1080, height: 1920 }; // 9:16 — Reels, Shorts, TikTok, Stories
export const HORIZONTAL: Format = { name: "horizontal", width: 1920, height: 1080 }; // 16:9 — YouTube, web, App Store preview
export const SQUARE: Format = { name: "square", width: 1080, height: 1080 }; // 1:1 — feed posts
export const PORTRAIT: Format = { name: "portrait", width: 1080, height: 1350 }; // 4:5 — Instagram feed
