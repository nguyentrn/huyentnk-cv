// src/pages/Home.tsx
import { Container } from "@/components/common/Container";
import { WordRotate } from "@/components/magicui/word-rotate";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";

export const Home = () => {
  const { t } = useTranslation();
  const words = t("home.wordRotate", { returnObjects: true }) as string[];

  return (
    // Container được tái sử dụng, nhưng chúng ta override style để nó căn giữa
    <Container className="h-screen max-h-screen justify-center text-center">
      <motion.div
        // Hiệu ứng xuất hiện cho toàn bộ nội dung
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Dòng giới thiệu ngắn gọn */}
        <h2 className="text-primary-500 font-serif text-xl font-medium tracking-widest uppercase lg:text-2xl">
          {t("home.introduction")}
        </h2>

        {/* Tên và các từ xoay vòng */}
        <div className="font-sans text-5xl font-bold text-neutral-800 lg:text-7xl lg:text-8xl">
          <h1 className="mb-2">Khánh Huyền.</h1>
          <div className="flex items-center justify-center gap-4">
            <span>A</span>
            <WordRotate
              className="text-5xl font-bold text-neutral-800 lg:text-7xl lg:text-8xl"
              words={words}
            />
          </div>
        </div>

        {/* Một đoạn mô tả chi tiết hơn */}
        <p className="max-w-2xl text-base text-neutral-600 lg:text-lg">
          {/* Bạn có thể thêm một key mới trong file JSON cho đoạn này */}A
          passionate Marketing student with a love for creating compelling
          narratives and building impactful brand experiences.
        </p>

        {/* Nút kêu gọi hành động (Call to Action) */}
        <NavLink to="/portfolio">
          <Button size="lg" className="group mt-4">
            Explore My Work
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </NavLink>
      </motion.div>
    </Container>
  );
};
