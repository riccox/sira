/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const transitionAll = css`
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
`;
export const border = css`
  border: #99999980 solid 1px;
`;
export const dropShadow = css`
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
`;
export const shadow = css`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important;
`;
export const fitContent = css`
  min-width: fit-content !important;
  min-height: fit-content !important;
`;
export const fillContent = (fill: boolean) => css`
  ${fitContent};
  width: ${fill ? "100%" : "fit-content"} !important;
  height: ${fill ? "100%" : "fit-content"} !important;
`;
export const ring = (ringColor: string, offsetColor: string) => css`
  --sira-ring-color: ${ringColor};
  --sira-ring-offset-width: 2px;
  --sira-ring-offset-color: ${offsetColor};
  --sira-ring-offset-shadow: 0 0 0 var(--sira-ring-offset-width)
    var(--sira-ring-offset-color);
  --sira-ring-shadow: 0 0 0 calc(3px + var(--sira-ring-offset-width))
    var(--sira-ring-color);
  --sira-shadow: 0 0 #0000;
  box-shadow: var(--sira-ring-offset-shadow), var(--sira-ring-shadow),
    var(--sira-shadow, 0 0 #0000) !important;
`;

export const underline = (
  underlineColor?: string,
  underlineWidth?: string
) => css`
  text-decoration-line: underline;
  text-decoration-color: ${underlineColor};
  text-decoration-style: solid;
  text-decoration-thickness: ${underlineWidth};
  text-underline-offset: 0.2em;
`;
