import style from "../style/home.module.css";
import {
  Button,
  Link,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sira-ui/react-core";
import { NextSeo } from "next-seo";
import { FaGithub, FaNpm, FaReact, FaYarn } from "react-icons/fa";
import { GoTools } from "react-icons/go";
import { RxComponent1 } from "react-icons/rx";
import { Prism, PrismTabs } from "@sira-ui/react-prism";
import { SiPnpm } from "react-icons/si";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("home");
  return (
    <>
      <NextSeo />
      <div className={`--page px-20 py-10 ${style.bg}`}>
        {/* Header */}
        <div className={`flex p-5`}>
          <div className={`flex items-center gap-3`}>
            <div className={`w-8`}>
              <img
                alt={"sira-logo"}
                src="https://assets.riccox.com/sira/logo/plain.svg"
              />
            </div>
            <Link
              href={"https://sira.riccox.com"}
              target="_self"
              className={`text-3xl font-bold !decoration-4`}
            >
              Sira
            </Link>
          </div>
        </div>
        <div className={`flex-1 flex flex-col gap-10 items-center`}>
          <div
            className={`text-7xl font-bold w-full text-center py-20 leading-relaxed `}
          >
            {t("hero.0")}{" "}
            <Link
              href={"/components"}
              underlineWidth={"8px"}
              className={`text-pink-500`}
            >
              {t("hero.1")}
            </Link>{" "}
            &{" "}
            <Link
              href={"/tools"}
              underlineWidth={"8px"}
              className={`text-purple-500`}
            >
              {t("hero.2")}
            </Link>{" "}
            {t("hero.3")}
          </div>
          <div className={`self-stretch flex justify-center`}>
            <PrismTabs className={`w-1/4`} defaultValue={"npm"}>
              <TabsList>
                <TabsTrigger
                  value={"npm"}
                  className={`flex items-center gap-2`}
                >
                  <FaNpm color={"#ea2039"} />
                  NPM
                </TabsTrigger>
                <TabsTrigger
                  value={"yarn"}
                  className={`flex items-center gap-2`}
                >
                  <FaYarn color={"#2188b6"} />
                  Yarn
                </TabsTrigger>
                <TabsTrigger
                  value={"pnpm"}
                  className={`flex items-center gap-2`}
                >
                  <SiPnpm className={"#f69220"} />
                  pnpm
                </TabsTrigger>
              </TabsList>
              <TabsContent value={"npm"}>
                <Prism language={"bash"} withLineNumbers={false}>
                  {`npm install "@sira-ui/react-core"`}
                </Prism>
              </TabsContent>
              <TabsContent value={"yarn"}>
                <Prism language={"bash"} withLineNumbers={false}>
                  {`yarn add "@sira-ui/react-core"`}
                </Prism>
              </TabsContent>
              <TabsContent value={"pnpm"}>
                <Prism language={"bash"} withLineNumbers={false}>
                  {`pnpm add "@sira-ui/react-core"`}
                </Prism>
              </TabsContent>
            </PrismTabs>
          </div>
          <div className={`flex flex-col`}>
            <div className={`flex gap-6`}>
              <Button
                href={"/components"}
                color={"primary"}
                leftSlot={<RxComponent1 size={"1.5rem"} />}
              >
                {t("components")}
              </Button>
              <Button
                href={"/tools"}
                color={"secondary"}
                leftSlot={<GoTools size={"1.3rem"} />}
              >
                {t("tools")}
              </Button>
              <Button
                bgColor={"#272b33"}
                leftSlot={<FaGithub size={"1.5rem"} />}
                href={`https://github.com/riccox/sira`}
              >
                Github
              </Button>
            </div>
            <div className={`flex items-center text-sm opacity-75 py-4`}>
              {t("completed.0.0")}{" "}
              <FaReact className={`mx-1`} color={"#007bff"} />
              {t("completed.0.1")}
            </div>
          </div>
          <div className={`flex gap-6 mt-auto`}>
            <Link
              href={"https://www.riccox.com"}
              target="_blank"
              rel={"noreferrer"}
              externalLinkIcon={true}
              className={`text-sm text-rose-800`}
            >
              {t("footer.createdBy", { author: "Ricco Xie" })}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
