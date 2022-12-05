import { Sira } from "../types";
import { SiraThemeLocalStorageKey } from "../provider";
import { HEXColorExpression, RGBColorNumberExpression } from "types";
import chroma from "chroma-js";

// ex: #ffa500 => 255, 165, 0
const hex2rgb = (hex: HEXColorExpression): RGBColorNumberExpression => {
  const rgbArr = chroma(hex).rgb() as number[];
  return `${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]}`;
};
// ex: 255, 165, 0 => #ffa500
const rgbNumberStr2hex = (
  rgb: RGBColorNumberExpression
): HEXColorExpression => {
  const rgbArr = rgb
    .replaceAll(" ", "")
    .split(",")
    .map((e) => parseInt(e));
  console.debug("[sira]", "rgbNumberStr2hex", rgb, rgbArr);
  return chroma(rgbArr, "rgb").hex() as HEXColorExpression;
};

export const paletteArray2Obj = (
  arr: HEXColorExpression[]
): Sira.SingleColorPalette => {
  const ret: Partial<Sira.SingleColorPalette> = {};
  for (let n = 0; n <= 9; n++) {
    const code = (n > 0
      ? `${n}00`
      : "50") as unknown as keyof Sira.SingleColorPalette;
    ret[code] = arr[n];
  }
  return ret as Sira.SingleColorPalette;
};

export const isInSiraDarkMode = (): boolean =>
  document.documentElement.classList.contains("sira-dark");

export const getLocalStorageTheme = (): Sira.Theme => {
  const store = window.localStorage.getItem(SiraThemeLocalStorageKey);
  return store ? JSON.parse(store) : null;
};
