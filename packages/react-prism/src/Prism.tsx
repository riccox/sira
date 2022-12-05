import React, { forwardRef } from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { Button, ScrollArea, Sira, useSiraTheme } from "@sira-ui/react-core";
import { useClipboard } from "@sira-ui/react-hooks";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import chrome from "chroma-js";
import { getPrismThemeCss } from "./theme";
import { FaCheck, FaCopy } from "react-icons/fa";

export interface IPrismProps
  extends Omit<React.ComponentPropsWithRef<"div">, "children"> {
  children: string;

  /** Programming language that should be highlighted */
  language: Language;

  copiable?: boolean;

  /** Display line numbers */
  withLineNumbers?: boolean;

  /** Highlight line at given line number with color */
  highlightLines?: Record<string, { color: string; label?: string }>;

  colorMode?: Sira.ColorMode;

  /** Defines whether the code should be trimmed, defaults to true */
  trim?: boolean;

  borderRadius?: string;
}

export const Prism = forwardRef<HTMLDivElement, IPrismProps>(
  (props: IPrismProps, ref) => {
    const [theme] = useSiraTheme();
    const {
      className,
      children,
      language,
      copiable = true,
      withLineNumbers = true,
      highlightLines = {},
      colorMode = theme.color.mode,
      trim,
      borderRadius = theme.borderRadius,
    } = props;
    const code = trim ? children.trim() : children;
    const maxLineSize = code.split("\n").length.toString().length;

    const clipboard = useClipboard();

    return (
      <div
        className={`${className}`}
        css={css`
          position: relative;

          & button {
            opacity: 0;
          }

          &:hover button {
            opacity: 1;
          }

          ${getPrismThemeCss(colorMode === "dark")};
        `}
        ref={ref}
      >
        {copiable && (
          <Button
            onClick={() => clipboard.copy(code)}
            padding={"0.4rem"}
            bgColor={`transparent`}
            fgColor={colorMode === "dark" ? "#eeeeeedd" : "#333333dd"}
            borderWidth={"1px"}
            activeRing={false}
            css={css`
              position: absolute;
              top: 0rem;
              right: 0rem;
              margin: 0.5rem;
              z-index: 2;
            `}
          >
            {clipboard.isCopied ? <FaCheck /> : <FaCopy />}
          </Button>
        )}

        <Highlight
          {...defaultProps}
          theme={undefined}
          code={code}
          language={language}
        >
          {({
            className: inheritedClassName,
            style: inheritedStyle,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <ScrollArea dir="ltr">
              <pre
                className={`${inheritedClassName}`}
                style={inheritedStyle}
                dir="ltr"
                css={css`
                  box-sizing: border-box;
                  position: relative;
                  font-size: 0.85rem;
                  border: #99999955 solid 1px;
                  border-radius: ${borderRadius} !important;
                  margin-top: 0 !important;
                  margin-bottom: 0 !important;
                  padding: 0.7rem !important;
                `}
              >
                {tokens
                  .map((line, index) => {
                    if (
                      index === tokens.length - 1 &&
                      line.length === 1 &&
                      line[0].content === "\n"
                    ) {
                      return null;
                    }

                    const lineNumber = index + 1;
                    const lineProps = getLineProps({ line, key: index });
                    const shouldHighlight =
                      lineNumber in highlightLines &&
                      highlightLines[lineNumber]?.color;

                    return (
                      <div
                        {...lineProps}
                        className={lineProps.className}
                        style={{
                          ...(shouldHighlight
                            ? {
                                backgroundColor:
                                  colorMode === "dark"
                                    ? chrome(highlightLines[lineNumber]?.color)
                                        .darken(4)
                                        .alpha(0.25)
                                        .hex()
                                    : chrome(highlightLines[lineNumber]?.color)
                                        .brighten(4)
                                        .hex(),
                              }
                            : null),
                        }}
                        css={css`
                          display: flex;
                          width: 100%;
                          padding: 0 0.25rem;
                        `}
                      >
                        {withLineNumbers && (
                          <div
                            style={{
                              color: shouldHighlight
                                ? chrome(highlightLines[lineNumber]?.color)
                                    .darken(colorMode === "dark" ? 0 : 3)
                                    .hex()
                                : undefined,
                            }}
                            css={css`
                              text-align: right;
                              width: ${8 * maxLineSize};
                              margin: 0 0.25rem;
                              user-select: none;
                            `}
                          >
                            {highlightLines[lineNumber]?.label || lineNumber}
                          </div>
                        )}

                        <div
                          css={css`
                            width: 100%;
                          `}
                        >
                          {line.map((token, key) => {
                            const tokenProps = getTokenProps({ token, key });
                            return (
                              <span
                                {...tokenProps}
                                style={{
                                  ...tokenProps.style,
                                  color: shouldHighlight
                                    ? chrome(highlightLines[lineNumber]?.color)
                                        .darken(colorMode === "dark" ? 0 : 3)
                                        .hex()
                                    : (tokenProps?.style?.color as string),
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                  .filter(Boolean)}
              </pre>
            </ScrollArea>
          )}
        </Highlight>
      </div>
    );
  }
);
Prism.displayName = "@sira-ui/react-prism/Prism";
