import { Container } from "@/components/common/Container"; // Cập nhật đường dẫn
import { WordRotate } from "@/components/magicui/word-rotate";
import { useTranslation } from "react-i18next";

const WordRotateDemo = () => {
  const { t } = useTranslation();
  const words = t("home.wordRotate", { returnObjects: true }) as string[];

  return (
    <WordRotate
      className="text-4xl font-bold text-black dark:text-white"
      words={words}
    />
  );
};

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div
        id="home"
        className="flex min-h-screen items-center bg-purple-50 text-7xl tracking-wider"
      >
        <div>
          {t("home.greeting")}
          <br /> {t("home.introduction")} <WordRotateDemo />
        </div>
      </div>
    </Container>
  );
};
