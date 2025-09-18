import { Container } from "@/components/common/Container";
import { WordRotate } from "@/components/magicui/word-rotate";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // Sửa lại import cho đúng
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";

export const Home = () => {
  // NEW: Sử dụng namespace 'common'
  const { t } = useTranslation("common");
  const words = t("home.wordRotate", { returnObjects: true }) as string[];

  return (
    <Container className="h-screen max-h-screen justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* CHANGED: Lấy nội dung từ i18n */}
        <h2 className="text-primary-500 font-serif text-xl font-medium tracking-widest uppercase lg:text-2xl">
          {t("home.introduction")}
        </h2>

        <div className="font-sans text-5xl font-bold text-neutral-800 lg:text-5xl">
          {/* CHANGED: Lấy nội dung từ i18n */}
          <h1 className="mb-2">{t("home.name")}</h1>
          <div className="flex items-center justify-center gap-4">
            {/* CHANGED: Lấy nội dung từ i18n */}
            <span>{t("home.subheading")}</span>
            <WordRotate
              className="text-5xl font-bold text-neutral-800 lg:text-5xl"
              words={words}
            />
          </div>
        </div>

        {/* CHANGED: Lấy nội dung từ i18n */}
        <p className="max-w-2xl text-base text-neutral-600 lg:text-lg">
          {t("home.description")}
        </p>

        <NavLink to="/portfolio">
          <Button size="lg" className="group mt-4">
            {/* CHANGED: Lấy nội dung từ i18n */}
            {t("home.cta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </NavLink>
      </motion.div>
    </Container>
  );
};
