import * as React from "react";
import { forwardRef, ReactNode, useContext, useMemo } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { TabsContext } from "./provider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSiraTheme } from "../../hook";
import chroma from "chroma-js";
import { guessForegroundColor } from "@riccox/color-palette-generator";
import { HEXColorExpression } from "types";
import { border } from "../../util/styled";

export interface ITabsTriggerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  children?: ReactNode;
  value: string;
  color?: string;
  triggersFill?: boolean;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, ITabsTriggerProps>(
  (props, ref) => {
    const [theme] = useSiraTheme();
    const ctx = useContext(TabsContext);
    const {
      children,
      value,
      color = ctx.color ?? theme.color.palette.primary,
      triggersFill = ctx.triggersFill,
    } = props;
    const isCurrent = value === ctx.currentValue;

    const styles = useMemo(() => {
      const common = css`
        padding: 0.3rem 0.5rem;
      `;
      if (ctx.variant === "underline") {
        return css`
          ${common};
          ${isCurrent &&
          css`
            ${ctx.orientation === "horizontal"
              ? "border-bottom"
              : `border-${
                  ctx.dir === "ltr" ? "right" : "left"
                }`}: ${color} solid 2px;
          `}
        `;
      }
      if (ctx.variant === "bookmark") {
        const bgColor = chroma(color)
          .brighten(isCurrent ? -0.5 : 0.5)
          .hex() as HEXColorExpression;
        return css`
          ${common};
          background-color: ${bgColor} !important;
          color: ${guessForegroundColor(bgColor)};
          ${ctx.orientation === "horizontal"
            ? `border-${ctx.dir === "ltr" ? "right" : "left"}`
            : `border-bottom`}: #9999 solid 0.1px;

          &:last-child {
            ${ctx.orientation === "horizontal"
              ? `border-${ctx.dir === "ltr" ? "right" : "left"}`
              : `border-bottom`}: none;
          }
        `;
      }
      if (ctx.variant === "outline") {
        return css`
          ${common};
          ${isCurrent &&
          css`
            ${border};
            ${ctx.orientation === "horizontal"
              ? "border-bottom"
              : `border-${ctx.dir === "ltr" ? "right" : "left"}`}: none;
            border-radius: ${ctx.orientation === "horizontal"
              ? `${theme.borderRadius} ${theme.borderRadius} 0 0`
              : ctx.dir === "ltr"
              ? `${theme.borderRadius} 0 0 ${theme.borderRadius}`
              : `0 ${theme.borderRadius} ${theme.borderRadius} 0`};
          `}
        `;
      }
    }, [
      color,
      ctx.dir,
      ctx.orientation,
      ctx.variant,
      isCurrent,
      theme.borderRadius,
    ]);

    return (
      <RadixTabs.Trigger
        {...props}
        ref={ref}
        css={css`
          ${styles};

          &:focus-visible {
            outline: none;
          }

          ${triggersFill
            ? css`
                flex: 1;
              `
            : css``};
        `}
      >
        {children}
      </RadixTabs.Trigger>
    );
  }
);
TabsTrigger.displayName = "@sira-ui/react-core/Tabs/Trigger";
