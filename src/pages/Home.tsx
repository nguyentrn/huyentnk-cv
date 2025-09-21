import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown"; // THÊM MỚI: Hook để lấy dữ liệu

// Animation Variants vẫn giữ nguyên vì chúng rất hiệu quả
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export function Home() {
  // THAY ĐỔI 1: Sử dụng useTranslation để lấy nội dung từ file JSON
  const { t } = useTranslation("common");

  return (
    <Container className="flex h-screen max-h-screen items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center lg:items-start lg:text-left"
      >
        <motion.p
          variants={itemVariants}
          className="text-primary-400 text-base font-medium md:text-lg"
        >
          <ReactMarkdown>{t("home.greeting")}</ReactMarkdown>
        </motion.p>

        {/* THAY ĐỔI 2: Headline tĩnh, mạnh mẽ, không còn hiệu ứng xoay từ */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl font-bold tracking-tight text-neutral-800 md:text-7xl"
        >
          {/* Lấy dữ liệu từ i18n */}
          {t("home.headline")}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-2 max-w-2xl text-lg leading-relaxed text-neutral-600"
        >
          {/* Lấy dữ liệu từ i18n */}
          {t("home.subheading")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col gap-4 sm:flex-row"
        >
          <NavLink to="/portfolio">
            <Button size="lg" className="group w-full font-bold sm:w-auto">
              {/* Lấy dữ liệu từ i18n */}
              {t("home.ctaPrimary")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </NavLink>
          <NavLink to="/cv">
            <Button
              size="lg"
              variant="outline"
              className="group w-full sm:w-auto"
            >
              {/* Lấy dữ liệu từ i18n */}
              {t("home.ctaSecondary")}
              <FileText className="ml-2 h-4 w-4" />
            </Button>
          </NavLink>
        </motion.div>
      </motion.div>
    </Container>
  );
}
