import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/common/Container";
import { ProjectCarousel } from "@/components/common/ProjectCarousel";
import { cn } from "@/lib/utils";
import { Project, Category } from "@/types/project";

export const Portfolio = () => {
  const { t } = useTranslation("portfolio");

  // Lấy dữ liệu từ file i18n
  const categories = t("categories", { returnObjects: true }) as Category[];
  const projectsData = t("projects", { returnObjects: true }) as Project[];

  const [activeCategory, setActiveCategory] = useState("all");

  // Lọc dự án dựa trên danh mục đang được chọn
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projectsData;
    }
    return projectsData.filter(
      (project) => project.categorySlug === activeCategory,
    );
  }, [activeCategory, projectsData]);

  return (
    <Container
      heading={t("pageTitle")}
      className="items-center justify-start pt-12"
    >
      <div className="flex w-full flex-col items-center">
        {/* Thanh lọc danh mục */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                activeCategory === category.slug
                  ? "text-white"
                  : "text-neutral-600 hover:text-neutral-900",
              )}
            >
              {activeCategory === category.slug && (
                <motion.div
                  layoutId="activeCategoryBackground"
                  className="bg-primary-400 absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Hiển thị carousel hoặc thông báo không có dự án */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory} // Key thay đổi sẽ trigger animation
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {filteredProjects.length > 0 ? (
              <ProjectCarousel projects={filteredProjects} />
            ) : (
              <div className="flex h-96 items-center justify-center">
                <p className="text-neutral-500">{t("noProjectsFound")}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};
