import { FC, ReactNode } from "react";
import { SiraProvider } from "@sira-ui/react-core";
import { useDarkMode } from "../util/theme";

interface Props {
  children: ReactNode;
}

export const SiraUIProvider: FC<Props> = ({ children }) => {
  const { isDark } = useDarkMode();
  return (
    <SiraProvider theme={{ color: { mode: isDark ? "dark" : "light" } }}>
      {children}
    </SiraProvider>
  );
};
