import { useContext } from "react";
import { SiraContext } from "../provider";
import { Sira } from "../types";

export const useSiraColorMode = (): [
  Sira.ColorMode,
  (force?: Sira.ColorMode) => void
] => {
  const context = useContext(SiraContext);
  if (context === undefined) {
    throw new Error("[sira] useSiraTheme must be used within a SiraProvider");
  }
  return [
    context.theme.color.mode as Sira.ColorMode,
    context.action.toggleColorMode,
  ];
};
