import * as React from "react";
import { forwardRef, ReactNode, useContext, useMemo } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TabsContext } from "./provider";
import { useSiraTheme } from "../../hook";
import { border } from "../../util/styled";

export interface ITabsListProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  loop?: boolean;
}

export const TabsList = forwardRef<HTMLDivElement, ITabsListProps>(
  (props, ref) => {
    const { children } = props;
    const [theme] = useSiraTheme();
    const ctx = useContext(TabsContext);

    const styles = useMemo(() => {
      return css`
        display: flex;
        flex-direction: ${ctx.orientation === "vertical" ? "column" : "row"};
        ${ctx.variant === "bookmark" &&
        css`
          width: ${ctx.triggersFill ? "100%" : "fit-content"};
          overflow: hidden;
          ${border};
          ${ctx.orientation === "horizontal"
            ? "border-bottom"
            : `border-${ctx.dir === "ltr" ? "right" : "left"}`}: none;
          border-radius: ${ctx.orientation === "horizontal"
            ? `${theme.borderRadius} ${theme.borderRadius} 0 0`
            : ctx.dir === "ltr"
            ? `${theme.borderRadius} 0 0 ${theme.borderRadius}`
            : `0 ${theme.borderRadius} ${theme.borderRadius} 0`};
        `};
      `;
    }, [
      ctx.dir,
      ctx.orientation,
      ctx.triggersFill,
      ctx.variant,
      theme.borderRadius,
    ]);
    return (
      <RadixTabs.List
        {...props}
        ref={ref}
        css={css`
          ${styles};
        `}
      >
        {children}
      </RadixTabs.List>
    );
  }
);
TabsList.displayName = "@sira-ui/react-core/Tabs/List";
