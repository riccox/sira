import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { HTMLAttributeAnchorTarget, Sira } from "../../types";
import { useSiraTheme } from "../../hook";
import { HiOutlineExternalLink } from "react-icons/hi";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { underline as underlineCss } from "../../util/styled";

export interface ILinkProps {
  children?: ReactNode;
  icon?: ReactNode;
  color?: Sira.Color;
  className?: string;
  fontSize?: string;
  onClick?: () => void;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  underlineOnHover?: boolean;
  externalLinkIcon?: boolean;
  underline?: boolean;
  underlineWidth?: string;
  underlineColor?: string;
  textColor?: string;
}

export const Link: FC<ILinkProps> = (props) => {
  const [theme] = useSiraTheme();
  const {
    children,
    icon,
    color = theme.color.palette.primary,
    className = "",
    href,
    rel,
    target,
    fontSize,
    underlineOnHover = true,
    underline = false,
    underlineWidth = "1px",
    underlineColor = color && theme.color.palette[color],
    textColor = color && theme.color.palette[color],
    externalLinkIcon = target === "_blank",
  } = props;

  return useMemo(
    () => (
      <a
        href={href}
        target={target}
        rel={rel}
        css={css`
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          column-gap: 0.2rem;
          font-size: ${fontSize};
          color: ${textColor};

          &:hover {
            filter: brightness(1.2);
            ${
              underlineOnHover
                ? css`
                    ${underlineCss(underlineColor, underlineWidth)};
                  `
                : css`
                    text-decoration-line: none;
                  `
            };
                }
              ;
              }

              ${
                underline &&
                css`
                  ${underlineCss(underlineColor, underlineWidth)};
                `
              }

              ;
              `}
        className={`${className}`}
      >
        {icon}
        {children}
        {externalLinkIcon && <HiOutlineExternalLink size={"1.2em"} />}
      </a>
    ),
    [
      href,
      target,
      rel,
      fontSize,
      textColor,
      underlineOnHover,
      underlineColor,
      underlineWidth,
      underline,
      className,
      icon,
      children,
      externalLinkIcon,
    ]
  );
};
