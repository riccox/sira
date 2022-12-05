import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { Sira } from "../../types";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { useSiraTheme } from "../../hook";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import chroma from "chroma-js";
import { guessForegroundColor } from "@riccox/color-palette-generator";
import { HEXColorExpression } from "types";

export interface IAvatarProps {
  color?: Sira.Color;
  width?: string;
  height?: string;
  className?: string;
  textCls?: string;
  fontSize?: string;
  onClick?: () => void;
  fallback?: ReactNode;
  fallbackColor?: string;
  src?: string;
  shape?: "square" | "circle";
  ring?: boolean;
  ringColor?: string;
}

export const Avatar: FC<IAvatarProps> = (props) => {
  const [theme] = useSiraTheme();
  const {
    color = theme.color.palette.primary,
    height = "fit-content",
    width = "fit-content",
    className = "",
    shape = "square",
    ring = false,
    fallback,
    src,
    textCls = "",
    fontSize = "1rem",
    fallbackColor = (color && theme.color.palette[color]) ||
      theme.color.palette.primary,
    ringColor = (color && theme.color.palette[color]) ||
      theme.color.palette.primary,
    onClick,
  } = props;

  return useMemo(
    () => (
      <AvatarPrimitive.Root
        onClick={onClick}
        css={css`
          display: inline-flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          user-select: none;
          font-weight: bolder;
          font-size: ${fontSize};
          max-width: 100%;
          max-height: 100%;
          width: ${width};
          height: ${height};
          border-radius: ${shape === "circle" ? "9999px" : "0.8rem"};
          vertical-align: middle;
          ${ring &&
          css`
            outline: 2px solid ${ringColor};
            outline-offset: 2px;
          `};
        `}
        className={`${className}`}
      >
        <AvatarPrimitive.Image
          src={src}
          alt="avatar"
          css={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `}
        />
        <AvatarPrimitive.Fallback
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 1;
            letter-spacing: 0.025em;
            background-color: ${fallbackColor};
            color: ${guessForegroundColor(
              chroma(fallbackColor).hex("rgb") as HEXColorExpression
            )};
          `}
          className={`${textCls}`}
          delayMs={600}
        >
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    ),
    [
      fontSize,
      width,
      height,
      shape,
      ring,
      ringColor,
      className,
      src,
      fallbackColor,
      textCls,
      fallback,
    ]
  );
};
