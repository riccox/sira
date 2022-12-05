import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  defaultTitle: "Sira UI",
  titleTemplate: "%s - Sira UI",
  description: "Sira UI is created by ricco xie",
  additionalLinkTags: [
    {
      rel: "shortcut icon",
      href: "//assets.riccox.com/sira/logo/plain.svg",
      type: "image/x-icon",
    },
  ],
};

export default config;
