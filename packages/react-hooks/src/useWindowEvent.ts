import { useEffect } from "react";

export const useWindowEvent = <K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    // @ts-ignore
    window.addEventListener(type, listener, options);
    // @ts-ignore
    return () => window.removeEventListener(type, listener, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
