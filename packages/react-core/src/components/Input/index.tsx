import * as React from "react";
import {
  FC,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { InputTypeAttribute, Sira } from "../../types";
import { useSiraTheme } from "../../hook";
import InputUnstyled, {
  InputUnstyledOwnerState,
} from "@mui/base/InputUnstyled";

export interface IInputProps {
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  color?: Sira.Color;
  size?: Sira.Size;
  radius?: Sira.Size;
  className?: string;
  inputClassNames?: string;
  label?: string;
  labelClassNames?: string;
  labelPosition?: "top" | "start";
  placeholder?: string;
  defaultValue?: unknown;
  required?: boolean;
  value?: unknown;
  variant?: "soft" | "solid" | "outline" | "plain";
  type?: InputTypeAttribute;
  multiline?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
  onBlur?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
}

export const Input: FC<IInputProps> = forwardRef(function Input(
  props: IInputProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [theme] = useSiraTheme();
  const {
    id,
    name,
    color = "primary",
    radius = theme.radius,
    size = "md",
    variant = "soft",
    type = "text",
    className = "",
    inputClassNames = "",
    label = "",
    labelPosition = "start",
    labelClassNames = "",
    placeholder = "",
    defaultValue = "",
    multiline = false,
    disabled = false,
    required = false,
    fullWidth = false,
    autoFocus = false,
    startSlot,
    endSlot,
    inputRef,
    value,
    onBlur,
    onChange,
    onClick,
    onFocus,
  } = props;

  const colorCls = useCallback(
    (state: InputUnstyledOwnerState) => {
      console.log(state.focused);
      let result = `sira-text-black dark:sira-text-white
    selection:sira-bg-${color}-500 sira-accent-${color}-500`;

      switch (variant) {
        case "soft":
          result += ` ${
            state.focused
              ? `sira-ring sira-ring-${color}-500`
              : "sira-ring-1 sira-ring-gray-300 dark:sira-ring-gray-700"
          }  
          sira-bg-gray-50 dark:sira-bg-gray-800 `;
          break;
        case "solid":
          result += ` ${
            state.focused
              ? `sira-ring-1 sira-ring-${color}-300 dark:sira-ring-${color}-800`
              : ""
          } sira-bg-gray-200 dark:sira-bg-gray-700`;
          break;
        case "outline":
          result += ` sira-ring-${color}-500 ${
            state.focused ? "sira-ring" : "sira-ring-1"
          }  sira-bg-transparent !sira-text-${color}-500 dark:!sira-text-${color}-400 `;
          break;
        case "plain":
          result += ` sira-bg-transparent !sira-text-${color}-500 dark:!sira-text-${color}-400 `;
          break;
      }
      if (disabled) {
        result += ` !sira-opacity-60 `;
      }
      return result;
    },
    [color, disabled, variant]
  );

  const radiusCls = useMemo(() => {
    switch (radius) {
      case "xs":
        return "sira-rounded";
      case "sm":
        return "sira-rounded-md";
      case "md":
        return "sira-rounded-lg";
      case "lg":
        return "sira-rounded-2xl";
      case "xl":
        return "sira-rounded-3xl";
    }
  }, [radius]);

  const sizeCls = useMemo(() => {
    switch (size) {
      case "xs":
        return "sira-py-1 sira-px-2";
      case "sm":
        return "sira-py-2 sira-px-3";
      case "md":
        return "sira-py-2 sira-px-3";
      case "lg":
        return "sira-py-3 sira-px-3";
      case "xl":
        return "sira-py-4 sira-px-4";
    }
  }, [size]);

  const fontSizeCls = useMemo(() => {
    switch (size) {
      case "xs":
        return `sira-font-light sira-text-xs`;
      case "sm":
        return `sira-font-normal sira-text-sm`;
      case "md":
        return `sira-font-medium sira-text-base`;
      case "lg":
        return `sira-font-medium sira-text-xl`;
      case "xl":
        return `sira-font-semibold sira-text-2xl`;
    }
  }, [size]);

  const labelPositionCls = useMemo(() => {
    switch (labelPosition) {
      case "top":
        return [`sira-flex-col `, `sira-self-start`];
      case "start":
        return [`sira-flex-row `, ""];
    }
  }, [labelPosition]);

  const labelColorCls = useMemo(() => {
    return `sira-text-inherit dark:sira-text-white sira-decoration-transparent
    sira-underline sira-underline-offset-2 sira-decoration-2 group-hover:sira-decoration-${color}-500`;
  }, [color]);

  const labelSizeCls = useMemo(() => {
    switch (size) {
      case "xs":
        return `sira-font-light sira-text-sm`;
      case "sm":
        return `sira-font-normal sira-text-base`;
      case "md":
        return `sira-font-medium sira-text-lg`;
      case "lg":
        return `sira-font-medium sira-text-2xl`;
      case "xl":
        return `sira-font-semibold sira-text-3xl`;
    }
  }, [size]);

  return useMemo(
    () => (
      <div
        className={` sira-group sira-flex sira-items-center sira-gap-1 sira-font-semibold ${
          labelPositionCls[0]
        } ${fullWidth ? "sira-w-full" : "sira-w-fit"} ${className} `}
      >
        {label && (
          <label
            className={`sira-transition-all sira-duration-300
        sira-px-2 ${labelColorCls} ${labelSizeCls} ${labelPositionCls[1]} ${labelClassNames}`}
          >
            {label}
          </label>
        )}
        {/* @ts-ignore*/}
        <InputUnstyled
          componentsProps={{
            root: (state: InputUnstyledOwnerState) => ({
              className: `${colorCls(
                state
              )} ${radiusCls} ${sizeCls} ${inputClassNames}
             sira-flex-1 sira-min-h-fit sira-fill
             sira-overflow-hidden sira-drop-shadow-xs sira-flex sira-items-center sira-gap-x-2
          sira-transition-all sira-duration-300 ${
            disabled ? "hover:sira-cursor-default" : "hover:sira-cursor-text"
          }
         `,
            }),
            input: (_state: InputUnstyledOwnerState) => ({
              className: `${fontSizeCls}
           sira-bg-transparent sira-outline-none placeholder:sira-text-gray-400 dark:placeholder:sira-text-gray-500 `,
            }),
          }}
          startAdornment={startSlot}
          endAdornment={endSlot}
          {...{
            type,
            placeholder,
            multiline,
            disabled,
            defaultValue,
            ref,
            inputRef,
            required,
            value,
            onBlur,
            onClick,
            onFocus,
            onChange,
            autoFocus,
            id,
            name,
          }}
        />
      </div>
    ),
    [
      autoFocus,
      className,
      colorCls,
      defaultValue,
      disabled,
      endSlot,
      fontSizeCls,
      fullWidth,
      id,
      inputClassNames,
      inputRef,
      label,
      labelClassNames,
      labelColorCls,
      labelPositionCls,
      labelSizeCls,
      multiline,
      name,
      onBlur,
      onChange,
      onClick,
      onFocus,
      placeholder,
      radiusCls,
      ref,
      required,
      sizeCls,
      startSlot,
      type,
      value,
    ]
  );
});
