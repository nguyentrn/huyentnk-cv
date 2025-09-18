// src/pages/Portfolio.tsx
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/common/Container";
import { ProjectCarousel } from "@/components/common/ProjectCarousel";
import { cn } from "@/lib/utils";
import { Project, Category } from "@/types/project";

export const Portfolio = () => {
  const { t } = useTranslation("portfolio");

  const categories = t("categories", { returnObjects: true }) as Category[];
  const projectsData = t("projects", { returnObjects: true }) as Project[];

  const [activeCategory, setActiveCategory] = useState("all");

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
      pageNumber="01"
      className="items-center justify-start"
    >
      <div className="flex w-full flex-col items-center">
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
                  className="bg-primary-500 absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.length > 0 ? (
              <ProjectCarousel projects={filteredProjects} />
            ) : (
              <div className="flex h-96 items-center justify-center">
                <p className="text-neutral-500">
                  No projects found in this category.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};
