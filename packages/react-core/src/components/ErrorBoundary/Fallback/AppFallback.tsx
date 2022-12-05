import type {FC} from "react";

import type {ErrorFallbackProps} from "./ErrorFallbackProps";

const handleReload = () => {
  window.location.assign(window.location.origin);
};

export const AppFallback: FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <div className={`fill flex justify-center items-center w-fit`}>
      <div className={`text-xl`}>
        <p>{error.message}</p>
        <a onClick={handleReload}>Reload</a>
      </div>
    </div>
  );
};
