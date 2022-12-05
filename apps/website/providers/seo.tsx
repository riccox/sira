import { DefaultSeo } from "next-seo";
import { FC, ReactNode } from "react";
import SEO from "../next-seo.config";

export const SEOProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      {children}
    </>
  );
};
