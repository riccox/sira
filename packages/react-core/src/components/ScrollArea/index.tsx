import React, { forwardRef, useState } from "react";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { useSiraTheme } from "../../hook";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface IScrollAreaProps extends React.ComponentPropsWithRef<"div"> {
  /** Scrollbar size in px */
  scrollbarSize?: number;

  /** Scrollbar display occasion */
  occasion?: "auto" | "always" | "scroll" | "hover" | "never";

  /** Scroll hide delay in ms, for scroll and hover types only */
  scrollHideDelay?: number;

  /** Reading direction of the scroll area */
  dir?: "ltr" | "rtl";

  /** Should scrollbars be offset with padding */
  offsetScrollbars?: boolean;

  /** Get viewport ref */
  viewportRef?: React.ForwardedRef<HTMLDivElement>;

  /** Subscribe to scroll position changes */
  onScrollPositionChange?(position: { x: number; y: number }): void;
}

export const ScrollArea = forwardRef<HTMLDivElement, IScrollAreaProps>(
  (props, ref) => {
    const {
      children,
      className,
      scrollbarSize = 12,
      scrollHideDelay = 350,
      occasion = "hover",
      dir = "ltr",
      offsetScrollbars = false,
      viewportRef,
      onScrollPositionChange,
    } = props;

    const [scrollbarHovered, setScrollbarHovered] = useState(false);
    const [theme] = useSiraTheme();

    const scrollbarCommonCss = css`
      display: ${occasion === "never" ? "none" : "flex"};
      user-select: none;
      touch-action: none;
      box-sizing: border-box;
      padding: ${scrollbarSize / 5};
      transition: background-color 150ms ease, opacity 150ms ease;

      &:hover {
        background-color: ${theme.color.mode === "dark"
          ? "rgba(255,255,255,0.5)"
          : "rgba(0,0,0,0.5)"};
      }
    `;

    const thumbCommonCss = css`
      flex: 1;
      background-color: ${theme.color.mode === "dark"
        ? "rgba(255,255,255,0.4)"
        : "rgba(0,0,0,0.4)"};
      border-radius: ${scrollbarSize};
      position: relative;
      transition: background-color 150ms ease;
      display: ${occasion === "never" ? "none" : "unset"};
      overflow: hidden;

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-width: 44px;
        min-height: 44px;
      }
    `;

    return (
      <RadixScrollArea.Root
        type={occasion === "never" ? "always" : occasion}
        scrollHideDelay={scrollHideDelay}
        dir={dir}
        ref={ref}
        asChild
        css={css`
          overflow: hidden;
        `}
      >
        <div className={`${className}`}>
          <RadixScrollArea.Viewport
            ref={viewportRef}
            onScroll={
              typeof onScrollPositionChange === "function"
                ? ({ currentTarget }) =>
                    onScrollPositionChange({
                      x: currentTarget.scrollLeft,
                      y: currentTarget.scrollTop,
                    })
                : undefined
            }
            css={css`
              width: 100%;
              height: 100%;
              padding-right: ${offsetScrollbars ? scrollbarSize : "unset"};
              padding-bottom: ${offsetScrollbars ? scrollbarSize : "unset"};
            `}
          >
            {children}
          </RadixScrollArea.Viewport>
          <RadixScrollArea.Scrollbar
            orientation="horizontal"
            css={css`
              ${scrollbarCommonCss};
              height: ${scrollbarSize};
              flex-direction: column;
            `}
            forceMount
            onMouseEnter={() => setScrollbarHovered(true)}
            onMouseLeave={() => setScrollbarHovered(false)}
          >
            <RadixScrollArea.Thumb
              css={css`
                ${thumbCommonCss};
              `}
            />
          </RadixScrollArea.Scrollbar>
          <RadixScrollArea.Scrollbar
            orientation="vertical"
            css={css`
              ${scrollbarCommonCss};
              width: ${scrollbarSize};
            `}
            forceMount
            onMouseEnter={() => setScrollbarHovered(true)}
            onMouseLeave={() => setScrollbarHovered(false)}
          >
            <RadixScrollArea.Thumb
              css={css`
                ${thumbCommonCss};
              `}
            />
          </RadixScrollArea.Scrollbar>
          <RadixScrollArea.Corner
            css={css`
              background-color: ${theme.color.mode === "dark"
                ? "rgba(255,255,255,0.3)"
                : "rgba(0,0,0,0.3)"};
              transition: opacity 150ms ease;
              opacity: ${scrollbarHovered ? 1 : 0};
              display: ${occasion === "never" ? "none" : "unset"};
            `}
          />
        </div>
      </RadixScrollArea.Root>
    );
  }
);
ScrollArea.displayName = "@sira-ui/react-core/ScrollArea";

export interface IScrollAreaAutosizeProps extends IScrollAreaProps {
  maxHeight: React.CSSProperties["maxHeight"];
}

export const ScrollAreaAutosize = forwardRef<
  HTMLDivElement,
  IScrollAreaAutosizeProps
>((props, ref) => {
  const { maxHeight, children, ...other } = props;
  return (
    <div
      ref={ref}
      css={css`
        display: flex;
        max-height: ${maxHeight};
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1;
        `}
      >
        <ScrollArea {...other}>{children}</ScrollArea>
      </div>
    </div>
  );
});
ScrollAreaAutosize.displayName = "@sira-ui/react-core/ScrollAreaAutosize";
