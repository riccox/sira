import { FC, ReactNode } from "react";
import { SiraUIProvider } from "./sira";
import { SEOProvider } from "./seo";
import { I18nProvider } from "./i18n";

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <I18nProvider>
      <SEOProvider>
        <SiraUIProvider>{children}</SiraUIProvider>
      </SEOProvider>
    </I18nProvider>
  );
};
