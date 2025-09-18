"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react"; // Dùng icon của lucide-react cho đồng bộ
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

interface ProjectItem {
  quote: string; // Sẽ là mô tả ngắn của dự án
  name: string; // Sẽ là tên dự án
  designation: string; // Sẽ là category của dự án
  src: string; // Ảnh dự án
  slug: string; // <-- THÊM SLUG
}

interface ProjectCarouselProps {
  projects: ProjectItem[];
  autoplay?: boolean;
}

// Hàm tính toán không đổi
function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

export const ProjectCarousel = ({
  projects,
  autoplay = true,
}: ProjectCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const { t } = useTranslation("portfolio");

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const projectsLength = useMemo(() => projects.length, [projects]);
  const activeProject = useMemo(
    () => projects[activeIndex],
    [activeIndex, projects],
  );

  // Các hooks (useEffect, useCallback) giữ nguyên logic, không cần thay đổi
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projectsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current)
        clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, projectsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projectsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [projectsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projectsLength) % projectsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [projectsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  // Hàm tính style cho ảnh giữ nguyên logic
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft =
      (activeIndex - 1 + projectsLength) % projectsLength === index;
    const isRight = (activeIndex + 1) % projectsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Phần ảnh Carousel */}
        <div
          ref={imageContainerRef}
          className="relative h-96 w-full [perspective:1000px]"
        >
          {projects.map((project, index) => (
            // Vẫn giữ NavLink bọc quanh ảnh
            <NavLink
              key={project.src}
              to={`/portfolio/${project.slug}`}
              className="absolute h-full w-full cursor-pointer"
              style={getImageStyle(index)}
              aria-label={`View project: ${project.name}`}
            >
              <img
                src={project.src}
                alt={project.name}
                className="h-full w-full rounded-2xl object-cover shadow-2xl"
              />
            </NavLink>
          ))}
        </div>

        {/* Phần nội dung Text */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col" // Thêm flex-col để nút CTA nằm bên dưới
            >
              <div>
                {" "}
                {/* Bọc phần text vào một div */}
                <p className="text-primary-500 mb-4 text-sm font-semibold tracking-widest uppercase">
                  {activeProject.designation}
                </p>
                <h3 className="mb-8 font-serif text-4xl font-medium text-neutral-800">
                  {activeProject.name}
                </h3>
                <motion.p className="text-base leading-relaxed text-neutral-600">
                  {activeProject.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ filter: "blur(8px)", opacity: 0 }}
                      animate={{ filter: "blur(0px)", opacity: 1 }}
                      transition={{ duration: 0.25, delay: 0.02 * i }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </div>

              {/* === NÚT CTA MỚI === */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }} // Delay để xuất hiện sau text
                className="mt-8"
              >
                <NavLink to={`/portfolio/${activeProject.slug}`}>
                  <Button
                    variant="outline"
                    className="group border-primary-400 text-primary-600 hover:bg-primary-50 hover:text-primary-600"
                  >
                    {t("exploreProject")}
                    <MoveRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </NavLink>
              </motion.div>
              {/* === KẾT THÚC NÚT CTA === */}
            </motion.div>
          </AnimatePresence>

          {/* Nút điều hướng */}
          <div className="mt-12 flex gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="group hover:bg-primary-500 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white transition-colors"
            >
              <ArrowLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="group hover:bg-primary-500 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white transition-colors"
            >
              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
