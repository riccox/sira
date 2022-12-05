import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Sira } from "../types";
import _ from "lodash";
import { useLocalStorage } from "@sira-ui/react-hooks";
import { ToastContainer } from "react-toastify";

export const SiraThemeLocalStorageKey = "sira-theme";

export const SiraDefaultTheme: Sira.Theme = {
  color: {
    mode: "light",
    palette: {
      primary: "#7100ff",
      secondary: "#b600ff",
      info: "#007bff",
      success: "#3fc814",
      warn: "#ff9d00",
      danger: "#da1919",
    },
  },
  borderRadius: "0.5rem",
};

export interface ISiraContext {
  theme: Sira.Theme;
  action: {
    updateTheme: (theme: Sira.Theme) => void;
    toggleColorMode: (force?: Sira.ColorMode) => void;
  };
}

export const SiraContext = createContext<ISiraContext>({
  theme: { ...SiraDefaultTheme },
  action: {
    updateTheme: (_theme) => {},
    toggleColorMode: (_force) => {},
  },
});

export interface ISiraProvider {
  children?: ReactNode;
  theme?: Sira.ThemeParams;
  hook?: {
    onColorModeChange?: (current: Sira.ColorMode) => void;
  };
}

export const SiraProvider: FC<ISiraProvider> = ({
  children,
  theme = {},
  hook = {},
}) => {
  const [currentTheme, setCurrentTheme] = useState<Sira.Theme>(
    _.defaultsDeep({ ...theme }, SiraDefaultTheme)
  );
  const [_localStorageTheme, updateLocalStorageTheme] = useLocalStorage({
    key: SiraThemeLocalStorageKey,
    defaultValue: SiraDefaultTheme,
  });

  useEffect(() => {
    const newTheme = _.defaultsDeep({ ...theme }, SiraDefaultTheme);
    // check theme object equality or maximum update depth exceeded
    if (!_.isEqual(currentTheme, newTheme)) {
      // update theme when theme props changed
      setCurrentTheme(newTheme);
      // update local storage
      updateLocalStorageTheme(newTheme);
    }
  }, [theme, setCurrentTheme, updateLocalStorageTheme, currentTheme]);

  useEffect(() => {
    // when color mode changed
    hook?.onColorModeChange && hook?.onColorModeChange(currentTheme.color.mode);
    console.debug("[sira]", "onColorModeChange", currentTheme.color.mode);
    if (currentTheme.color.mode === "dark") {
      document.documentElement.classList.add("sira-dark");
    } else {
      document.documentElement.classList.remove("sira-dark");
    }
  }, [currentTheme.color.mode, hook, hook?.onColorModeChange]);

  const toggleColorMode = useCallback((force?: Sira.ColorMode) => {
    setCurrentTheme((prev) => ({
      ...prev,
      color: {
        ...prev.color,
        mode: force ?? prev.color.mode !== "dark" ? "dark" : "light",
      },
    }));
  }, []);

  const updateTheme = useCallback((t: Sira.Theme) => {
    setCurrentTheme(t);
  }, []);

  return (
    <SiraContext.Provider
      value={{ theme: currentTheme, action: { toggleColorMode, updateTheme } }}
    >
      {children}
      <ToastContainer />
    </SiraContext.Provider>
  );
};
