import * as React from "react";

export * as Sira from "./sira";

// HTML button type property values
export type HTMLButtonTypeValue = typeof HTMLButtonTypeValues[number];
export const HTMLButtonTypeValues = ["submit", "reset", "button"] as const;

export type HTMLAttributeAnchorTarget =
  typeof HTMLAttributeAnchorTargets[number];
export const HTMLAttributeAnchorTargets = [
  "_self",
  "_blank",
  "_parent",
  "_top",
] as const;

export type InputTypeAttribute = typeof InputTypeAttributes[number];
export const InputTypeAttributes = [
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
] as const;

export type ForwardRefWithStaticComponents<
  Props extends Record<string, any>,
  Static extends Record<string, any>
> = ((props: Props) => React.ReactElement) &
  Static & {
    displayName: string;
  };
