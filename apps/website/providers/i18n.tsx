import { FC, ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { SUPPORTED_LANGUAGES } from "../util/i18next";

export const I18nProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  useEffect(() => {
    const preferLang = window.navigator.language;
    const lang = SUPPORTED_LANGUAGES.find((l) =>
      new RegExp(l).test(preferLang)
    );
    console.debug("detect user prefer lang", preferLang, lang);
    i18n.changeLanguage(lang).then();
  }, []);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
