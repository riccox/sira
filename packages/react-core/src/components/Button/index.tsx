import React, {
  FC,
  ForwardedRef,
  forwardRef,
  ReactNode,
  Ref,
  useMemo,
} from "react";
import useDebounceFn from "ahooks/lib/useDebounceFn";
import { DebounceOptions } from "ahooks/lib/useDebounce/debounceOptions";
import {
  HTMLAttributeAnchorTarget,
  HTMLButtonTypeValue,
  Sira,
} from "../../types";
import { useSiraColorMode, useSiraTheme } from "../../hook";
import { guessForegroundColor } from "@riccox/color-palette-generator";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import chroma from "chroma-js";
import { HEXColorExpression } from "types";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ImSpinner9 } from "react-icons/im";
import { fillContent, ring, shadow, transitionAll } from "../../util/styled";

export interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: ReactNode;
  color?: Sira.Color;
  href?: string;
  className?: string;
  padding?: string;
  target?: HTMLAttributeAnchorTarget;
  formType?: HTMLButtonTypeValue;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  ref?: Ref<any>;
  disabled?: boolean;
  isLoading?: boolean;
  /** only works for onClick */
  debounce?: DebounceOptions;
  contentCls?: string;
  fontSize?: string;
  fgColor?: string;
  bgColor?: string;
  borderRadius?: string;
  borderColor?: string;
  borderWidth?: string;
  fill?: boolean;
  activeRing?: boolean;
}

export const Button: FC<IButtonProps> = forwardRef(function Button(
  props: IButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const [theme] = useSiraTheme();
  const [colorMode] = useSiraColorMode();
  const {
    leftSlot,
    rightSlot,
    children,
    padding = "0.6rem 1rem",
    target = "_blank",
    className = "",
    href,
    disabled: disabledProps = false,
    isLoading = false,
    onClick,
    debounce,
    formType = "button",
    contentCls = "",
    fontSize = "1rem",
    color,
    bgColor = (color && theme.color.palette[color]) || "transparent",
    // calc foreground color by bg
    fgColor = chroma.valid(bgColor)
      ? guessForegroundColor(chroma(bgColor).hex("rgb") as HEXColorExpression)
      : colorMode === "light"
      ? "#000"
      : "#FFF",
    borderRadius = theme.borderRadius,
    borderColor = "unset",
    borderWidth = "0",
    fill = false,
    activeRing = true,
    ...other
  } = props;

  const disabled = useMemo(() => {
    return disabledProps || isLoading;
  }, [disabledProps, isLoading]);

  const loadingIcon = useMemo(() => {
    if (isLoading) {
      return (
        <div
          css={css`
            @keyframes lds-spinner {
              0% {
                rotate: 0deg;
              }
              100% {
                rotate: 360deg;
              }
            }
            animation: lds-spinner 1.5s linear infinite;
            scale: 1.2;
          `}
        >
          <ImSpinner9 color={fgColor} />
        </div>
      );
    }
    return;
  }, [fgColor, isLoading]);

  const { run: runOnClick } = useDebounceFn((e) => {
    onClick && onClick(e);
  }, debounce);

  const label = useMemo(() => {
    return <div className={`${contentCls} `}>{children}</div>;
  }, [children, contentCls]);

  const content = useMemo(() => {
    const commonCss = css`
      padding: ${padding};
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      column-gap: 0.5rem;
      width: 100%;
      height: 100%;
    `;
    return (
      <>
        {href && !disabled ? (
          //  separate padding class names for a tag clickable on whole button
          <a
            css={css`
              ${commonCss};
              color: inherit !important;
              text-decoration-line: none !important;
            `}
            href={href}
            target={target}
          >
            {loadingIcon}
            {leftSlot}
            {label} {rightSlot}
          </a>
        ) : (
          <div css={commonCss}>
            {loadingIcon}
            {leftSlot}
            {label} {rightSlot}
          </div>
        )}
      </>
    );
  }, [
    disabled,
    href,
    label,
    leftSlot,
    loadingIcon,
    padding,
    rightSlot,
    target,
  ]);

  const CustomButton = styled(ButtonUnstyled)`
    ${shadow};
    ${transitionAll};
    ${fillContent(fill)};
    font-weight: bolder;
    font-size: ${fontSize};
    background-color: ${bgColor} !important;
    border-radius: ${borderRadius};
    color: ${fgColor};
    cursor: pointer;
    border-color: ${borderColor};
    border-width: ${borderWidth};
    overflow: hidden;
    outline: none;

    &:hover {
      filter: brightness(0.8);
    }

    &:focus {
      ${activeRing && ring(bgColor, fgColor)};
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  return useMemo(() => {
    return children ? (
      <CustomButton
        {...other}
        className={`${className}`}
        ref={ref}
        type={formType}
        disabled={disabled}
        onClick={(e) => !disabled && runOnClick(e)}
      >
        {content}
      </CustomButton>
    ) : (
      <></>
    );
  }, [
    children,
    CustomButton,
    other,
    className,
    ref,
    formType,
    disabled,
    content,
    runOnClick,
  ]);
});
