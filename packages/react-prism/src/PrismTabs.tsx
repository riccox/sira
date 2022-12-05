import React from "react";
import { ITabsProps, Tabs, useSiraColorMode } from "@sira-ui/react-core";

export function PrismTabs(props: ITabsProps) {
  const [colorMode] = useSiraColorMode();
  return (
    <Tabs
      {...props}
      variant={"bookmark"}
      color={colorMode === "light" ? "#fcfcfc" : "#111"}
    />
  );
}
