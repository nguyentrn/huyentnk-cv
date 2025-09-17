import { Container } from "@/components/common/Container";
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

export const Portfolio = () => {
  return (
    <Container>
      <div>
        Đây là trang Portfolio
        <br /> <WordRotateDemo />
      </div>
    </Container>
  );
};
