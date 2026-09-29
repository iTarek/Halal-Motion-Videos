import os from "node:os";
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setConcurrency(Math.max(1, Math.min(8, os.availableParallelism()))); // never more than the cores
