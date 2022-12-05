import { FC, ReactNode, useCallback, useMemo } from "react";
import { useSiraTheme } from "../../hook";
import { useClipboard } from "@sira-ui/react-hooks";
import { Sira } from "../../types";

export interface ICopiableProps {
  children?: ReactNode;
  color?: Sira.Color;
  className?: string;
  /** actual copy value */
  content?: any;
  disabled?: boolean;
}

export const Copiable: FC<ICopiableProps> = (props) => {
  const [theme] = useSiraTheme();
  const {
    color = theme.color.primary,
    className = "",
    children,
    content = children,
    disabled = false,
  } = props;
  const { copy, isCopied } = useClipboard();

  const onClickCopy = useCallback(() => {
    if (!disabled) {
      copy(content);
    }
  }, [content, copy, disabled]);

  const colorCls = useMemo(() => {
    return `sira-text-${color}-500 hover:sira-text-${color}-600  dark:hover:sira-text-${color}-400 `;
  }, [color]);

  return useMemo(
    () => (
      <div
        className={`sira-inline-flex sira-items-center sira-text-black dark:sira-text-white ${className}`}
      >
        {children}
        {!disabled && (
          <div
            className={`${colorCls} sira-relative sira-top-1/2 duration-500 sira-px-1.5`}
          >
            {isCopied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="sira-h-5 sira-w-auto sira-text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="sira-h-5 sira-w-auto sira-cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={onClickCopy}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
        )}
      </div>
    ),
    [children, className, colorCls, disabled, isCopied, onClickCopy]
  );
};
