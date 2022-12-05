import * as RadixTabs from "@radix-ui/react-tabs";
import * as React from "react";
import { forwardRef, ReactNode, useCallback, useMemo, useState } from "react";
import { ITabsContext, TabsContext, TabsDefaultContext } from "./provider";
import { TabsList } from "./list";
import { TabsTrigger } from "./trigger";
import { TabsContent } from "./content";
import _ from "lodash";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export type ITabsProps = React.ComponentPropsWithoutRef<"div"> &
  ITabsContext & {
    children?: ReactNode;
    value?: string;
  };
export const Tabs = forwardRef<HTMLDivElement, ITabsProps>(
  (props: ITabsProps, ref) => {
    const { children, value, ...other } = props;
    const [currentVal, setCurrentVal] = useState(value ?? props.defaultValue);

    const onValueChange = useCallback(
      (val: string) => {
        setCurrentVal(val);
        props.onValueChange && props.onValueChange(val);
      },
      [props]
    );

    const ctx = useMemo(() => {
      return {
        ...other,
        currentValue: currentVal,
      };
    }, [currentVal, other]);

    const styles = useMemo(() => {
      return css`
        display: flex;
        flex-direction: ${ctx.orientation === "vertical" ? "row" : "column"};
      `;
    }, [ctx.orientation]);

    return (
      <TabsContext.Provider
        value={_.defaultsDeep({ ...ctx }, TabsDefaultContext)}
      >
        <RadixTabs.Root
          onValueChange={onValueChange}
          {...other}
          value={value}
          ref={ref}
          css={css`
            ${styles};
          `}
        >
          {children}
        </RadixTabs.Root>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "@sira-ui/react-core/Tabs";

export const Root = Tabs;
export const List = TabsList;
export const Trigger = TabsTrigger;
export const Content = TabsContent;
export { TabsList, TabsTrigger, TabsContent };
export * from "./provider";
export * from "./list";
export * from "./trigger";
export * from "./content";
