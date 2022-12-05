import i18n, { Resource, ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGUAGES = ["en", "zh"];
export const NAMESPACES = ["home"];

const getResource = () => {
  const ret: Resource = {};
  SUPPORTED_LANGUAGES.forEach((lng) => {
    const lng_ns: ResourceLanguage = {};
    NAMESPACES.forEach((ns) => {
      lng_ns[ns] = require(`../public/locales/${lng}/${ns}.json`);
    });
    ret[lng] = lng_ns;
  });
  return ret;
};

i18n
  // .use(Backend)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: SUPPORTED_LANGUAGES[0],
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: NAMESPACES,
    defaultNS: NAMESPACES[0],
    fallbackNS: NAMESPACES[0],
    debug: false,
    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    resources: getResource(),
    react: {
      bindI18n: "languageChanged",
      bindI18nStore: "",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
      useSuspense: false,
    },
  });
export default i18n;
