import * as React from "react";
import { forwardRef, ReactNode, useContext } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSiraTheme } from "../../hook";
import { TabsContext } from "./provider";
import { border } from "../../util/styled";

export interface ITabsContentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  value: string;
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
  withBorder?: boolean;
}

export const TabsContent = forwardRef<HTMLDivElement, ITabsContentProps>(
  (props, ref) => {
    const [theme] = useSiraTheme();
    const ctx = useContext(TabsContext);
    const { children, withBorder = ctx.contentBorder } = props;
    return (
      <RadixTabs.Content
        {...props}
        ref={ref}
        css={css`
          ${withBorder &&
          css`
            ${border};
            padding: 0.5rem;
          `};
          border-radius: ${ctx.orientation === "horizontal"
            ? `0 0 ${theme.borderRadius} ${theme.borderRadius}`
            : ctx.dir === "ltr"
            ? `0 ${theme.borderRadius} ${theme.borderRadius} 0`
            : `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
        `}
      >
        {children}
      </RadixTabs.Content>
    );
  }
);
TabsContent.displayName = "@sira-ui/react-core/Tabs/Content";
