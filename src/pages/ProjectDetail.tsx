// src/pages/ProjectDetail.tsx
import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { useParams, NavLink } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Project } from "@/types/project";
import ReactMarkdown from "react-markdown"; // <-- IMPORT
import rehypeRaw from "rehype-raw"; // <-- IMPORT

const listContainerVariants = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {},
};

const listItemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -20 },
};

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation(["portfolio", "common"]);

  const projectsData = t("portfolio:projects", {
    returnObjects: true,
  }) as Project[];
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    // ... (phần code xử lý lỗi không đổi)
    return (
      <Container className="items-center justify-center text-center">
        <h1 className="font-serif text-4xl">{t("common:projectNotFound")}</h1>
        <p className="mt-4 text-neutral-600">
          {t("common:projectNotFoundMessage")}
        </p>
        <NavLink
          to="/portfolio"
          className="group text-primary-600 mt-8 inline-flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          {t("common:projectDetail.backToProjects")}
        </NavLink>
      </Container>
    );
  }

  return (
    <Container className="p-0 pt-0 lg:p-0 lg:pt-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 1. Hero Section - ĐÃ ĐƯỢC CẬP NHẬT */}
        <div className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
          {/* Lớp Nền (Ảnh + Hiệu ứng) */}
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center blur-sm brightness-60 filter"
            style={{ backgroundImage: `url('/images/portfolio-hero.jpg')` }}
          ></div>

          {/* Lớp Phủ Tối */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Lớp Nội dung */}
          <div className="relative flex h-full w-full flex-col items-center justify-center text-center text-white">
            <p className="text-primary-200 text-sm font-semibold tracking-widest uppercase">
              {project.designation}
            </p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl">
              {project.name}
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl text-neutral-800">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-600">
                {project.overview}
              </p>
            </div>
            <div className="text-sm">
              <motion.div
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                {project.details.map((detail) => (
                  <motion.div
                    key={detail.label}
                    variants={listItemVariants}
                    className="flex justify-between gap-4 border-b border-neutral-200 py-3"
                  >
                    <strong className="font-medium whitespace-nowrap text-neutral-700">
                      {detail.label}:
                    </strong>
                    <span className="text-end text-neutral-500">
                      {detail.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* === THAY ĐỔI QUAN TRỌNG Ở ĐÂY === */}
          <div className="prose-lg prose prose-img:rounded-xl prose-img:shadow-md prose-h3:font-serif prose-h3:text-neutral-800 mt-16 max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {project.content}
            </ReactMarkdown>
          </div>
          {/* === KẾT THÚC THAY ĐỔI === */}
        </div>

        <div className="border-t border-neutral-200 bg-neutral-50 py-12 text-center">
          <NavLink
            to="/portfolio"
            className="group hover:text-primary-600 inline-flex items-center gap-2 font-semibold text-neutral-700"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t("common:projectDetail.backToProjects")}
          </NavLink>
        </div>
      </motion.div>
    </Container>
  );
};
