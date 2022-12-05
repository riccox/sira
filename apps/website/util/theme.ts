import { useEffect, useState } from "react";

export const useDarkMode = (): { isDark: boolean; x: <R>(l: R, d: R) => R } => {
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    const intervalTimer = window.setInterval(function () {
      const current = document.documentElement.classList.contains("dark");
      if (isDark !== current) {
        setIsDark(current);
      }
    }, 50);
    return () => clearInterval(intervalTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isDark, x: (l, d) => (isDark ? d : l) };
};
