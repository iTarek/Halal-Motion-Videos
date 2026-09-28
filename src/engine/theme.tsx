import { createContext, useContext } from "react";
import type { Theme } from "./types";

const ThemeContext = createContext<Theme | null>(null);

/** Root wraps every video's film in this, so shared components pick up its theme. */
export const ThemeProvider = ThemeContext.Provider;

export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("useTheme(): no ThemeProvider — is the video registered through src/brands/index.ts?");
  return theme;
};
