import type { FC } from "react";

import type { ErrorFallbackProps } from "./ErrorFallbackProps";

export const LayoutFallback: FC<ErrorFallbackProps> = ({ error }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={`fill flex justify-center items-center w-fit`}>
      <div className={`text-xl`}>
        <p>{error.message}</p>
        <a onClick={handleGoBack}>Reload</a>
      </div>
    </div>
  );
};
