import type { FC, ReactNode } from "react";
import { ReactErrorBoundary } from "./index";
import { AppFallback } from "./Fallback";

type Props = {
  children: ReactNode;
};

export const ErrorBoundaryProvider: FC<Props> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={AppFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
