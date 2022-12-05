import { DeepPartial, HEXColorExpression } from "types";

export type ColorMode = typeof ColorModes[number];
export type Speed = typeof Speeds[number];
export type RelativePosition = typeof RelativePositions[number];
export type Scene = typeof Scenes[number];
export type Orientation = typeof Orientations[number];
export type Direction = typeof Directions[number];

export const ColorModes = ["light", "dark"] as const;
export const Orientations = ["horizontal", "vertical"] as const;
export const Directions = ["ltr", "rtl"] as const;
export const Speeds = ["slowest", "slow", "normal", "fast", "fastest"] as const;
export const RelativePositions = [
  "top-right",
  "top-center",
  "top-left",
  "bottom-right",
  "bottom-center",
  "bottom-left",
] as const;
export const Scenes = ["info", "success", "warn", "danger"] as const;
export const DesignedColors = ["primary", "secondary"] as const;
export type DesignedColor = typeof DesignedColors[number];
export type Color = DesignedColor | Scene;

export interface Theme {
  borderRadius: string;
  color: {
    mode: ColorMode;
    palette: ThemeColorPalette;
  };
}

export type ThemeParams = DeepPartial<Theme>;

export type SingleColorPalette = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};
export type SingleColorPaletteKeys = keyof SingleColorPalette;

export type ThemeColorPalette = {
  [k in DesignedColor | Scene]: HEXColorExpression;
};
