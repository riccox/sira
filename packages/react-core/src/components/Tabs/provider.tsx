import { createContext } from "react";
import { Sira } from "../../types";

export interface ITabsContext {
  currentValue?: string;
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string;
  /** A function called when a new tab is selected */
  onValueChange?: (value: string) => void;
  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: Sira.Orientation;
  /**
   * The direction of navigation between toolbar items.
   */
  dir?: Sira.Direction;
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   * */
  activationMode?: "automatic" | "manual";
  variant?: "outline" | "bookmark" | "underline";
  color?: string;
  triggersFill?: boolean;
  contentBorder?: boolean;
}

export const TabsDefaultContext: ITabsContext = {
  variant: "underline",
  activationMode: "automatic",
  dir: "ltr",
  orientation: "horizontal",
  triggersFill: false,
  contentBorder: true,
};

export const TabsContext = createContext<ITabsContext>(TabsDefaultContext);
