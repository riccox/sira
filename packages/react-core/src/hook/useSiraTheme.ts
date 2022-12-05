import { useContext } from "react";
import { SiraContext } from "../provider";
import { Sira } from "../types";

export const useSiraTheme = (): [Sira.Theme, (theme: Sira.Theme) => void] => {
  const context = useContext(SiraContext);
  if (context === undefined) {
    throw new Error("[sira] useSiraTheme must be used within a SiraProvider");
  }
  return [context.theme, context.action.updateTheme];
};
