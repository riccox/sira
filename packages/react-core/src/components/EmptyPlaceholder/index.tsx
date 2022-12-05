import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { Sira } from "../../types";

export interface IEmptyPlaceholder {
  tip?: ReactNode;
  size?: Sira.Size;
}

export const EmptyPlaceholder: FC<IEmptyPlaceholder> = (props) => {
  const { tip, size = "md" } = props;

  const svgSizeCls = useMemo(() => {
    switch (size) {
      case "xs":
        return `sira-w-12`;
      case "sm":
        return `sira-w-20`;
      case "md":
        return `sira-w-28`;
      case "lg":
        return `sira-w-36`;
      case "xl":
        return `sira-w-64`;
    }
  }, [size]);

  const textSizeCls = useMemo(() => {
    switch (size) {
      case "xs":
        return `sira-font-thin sira-text-xs`;
      case "sm":
        return `sira-font-light sira-text-sm`;
      case "md":
        return `sira-font-medium sira-text-md`;
      case "lg":
        return `sira-font-semibold sira-text-lg`;
      case "xl":
        return `sira-font-bold sira-text-xl`;
    }
  }, [size]);

  return useMemo(
    () => (
      <div
        className={`sira-fill sira-flex sira-flex-col sira-gap-1 sira-justify-center sira-items-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.4}
          stroke="currentColor"
          className={`${svgSizeCls} sira-text-gray-400`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
          />
        </svg>
        {tip && (
          <div
            className={`${textSizeCls} sira-text-gray-500 dark:sira-text-gray-400`}
          >
            {tip}
          </div>
        )}
      </div>
    ),
    [svgSizeCls, textSizeCls, tip]
  );
};
