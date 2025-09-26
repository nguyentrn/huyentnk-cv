import { motion, Variants } from "framer-motion"; // <-- GIỮ LẠI Variants vì chúng ta sẽ dùng nó
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    // THAY ĐỔI QUAN TRỌNG: Cung cấp một giá trị "ease" cụ thể
    // Đây là một đường cong bezier "easeOutExpo" - rất mượt và chuyên nghiệp
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Home() {
  const { t } = useTranslation("common");

  return (
    <Container className="flex h-screen max-h-screen items-center px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center lg:items-start lg:text-left"
      >
        <motion.p
          variants={itemVariants}
          className="text-primary-600 text-base font-medium md:text-lg"
        >
          {t("home.greeting")}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl font-bold tracking-tight text-neutral-800 md:text-7xl"
        >
          {t("home.headline")}
        </motion.h1>

        {/*<motion.div className="space-y-8" variants={itemVariants}>*/}
        {/*  <GradientText*/}
        {/*    colors={["#40ffaa", "#4079ff", "#40ffaa"]}*/}
        {/*    animationSpeed={3}*/}
        {/*    className="text-3xl font-semibold"*/}
        {/*  >*/}
        {/*    {t("home.headline")}*/}
        {/*  </GradientText>*/}
        {/*</motion.div>*/}
        <motion.p className="text-neutral-600">{t("home.subheading")}</motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col gap-4 sm:flex-row"
        >
          <NavLink to="/portfolio">
            <Button size="lg" className="group w-full sm:w-auto">
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
              {t("home.ctaSecondary")}
              <FileText className="ml-2 h-4 w-4" />
            </Button>
          </NavLink>
        </motion.div>
      </motion.div>
    </Container>
  );
}
