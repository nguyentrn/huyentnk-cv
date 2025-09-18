# Ngữ cảnh cho thư mục: src

## PHẦN A: PHÂN TÍCH CÁC FILE MỤC TIÊU

Phần này phân tích chi tiết các file được yêu cầu ban đầu.

### Phân tích file: `src/components/common/Container.tsx`

#### Nội dung file

```tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BubbleBackground } from "@/components/ui/shadcn-io/bubble-background";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const headingContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
  hidden: {},
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Container = ({
  heading,
  children,
  className,
}: {
  heading?: string;
  pageNumber?: string;
  children: ReactNode;
  className?: string;
}) => {
  const letters = heading ? Array.from(heading) : [];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={cn(
        "relative flex min-h-screen flex-col items-center p-8 pt-24",
        className,
      )}
    >
      <BubbleBackground
        interactive
        className="absolute inset-0 top-0 right-0 bottom-0 left-0 flex items-center justify-center rounded-xl"
      />

      {heading && (
        <div className="relative mb-16 w-full max-w-6xl text-center">
          {/* Yếu tố nền (nếu bạn dùng phương án 3) */}
          {/* <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-serif text-[120px] font-bold text-neutral-100 -z-10 select-none lg:text-[150px]">
            {heading.split(" ")[0]}
          </span> */}

          {/* === THAY ĐỔI Ở ĐÂY === */}
          <motion.h1
            // Bỏ: whileInView="visible"
            // Bỏ: viewport={{ once: true }}
            // Thay bằng:
            initial="hidden" // Luôn bắt đầu từ trạng thái ẩn
            animate="visible" // Luôn animate đến trạng thái hiện
            variants={headingContainerVariants}
            className="relative font-serif text-4xl font-medium text-neutral-800 lg:text-5xl"
            aria-label={heading}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      )}
      {children}
    </motion.div>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/components/common/Navbar.tsx`

#### Nội dung file

```tsx
import { NavLink } from "react-router"; // Sửa lại import cho đúng
import { cn } from "@/lib/utils.ts";
import { MagnetizeButton } from "@/components/ui/magnetize-button.tsx";
import { useTranslation } from "react-i18next";
import { SiFacebook, SiTiktok } from "@icons-pack/react-simple-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { Button } from "../ui/button.tsx";
import { Menu } from "lucide-react";

// Ghi chú: Component LanguageSwitcher nên được tách ra file riêng
// src/components/common/LanguageSwitcher.tsx để gọn gàng hơn.
// Tuy nhiên, để giữ nguyên cấu trúc file, tôi vẫn để ở đây.
const langs = [
  { key: "vi", label: "VI" },
  { key: "en", label: "EN" },
  { key: "zh", label: "ZH" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="mt-4 flex gap-2">
      {langs.map((lang) => (
        <button
          key={lang.key}
          onClick={() => changeLanguage(lang.key)}
          disabled={i18n.language === lang.key}
          className={cn(
            "bg-primary-50 border-primary-400 text-primary-400 h-7 w-7 cursor-pointer rounded-full border text-xs font-bold",
            i18n.language === lang.key &&
              "bg-primary-400 text-primary-50 cursor-default",
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

const links = [
  { label: "navbar.about", slug: "/" },
  { label: "navbar.portfolio", slug: "/portfolio" },
  { label: "navbar.resume", slug: "/cv" }, // Đổi key cho nhất quán
];

const socialMedias = [
  { icon: <SiFacebook className={"size-5"} />, link: "https://facebook.com" },
  { icon: <SiTiktok className={"size-5"} />, link: "https://linkedln.com" },
];

export const Background = () => {
  return (
    <div className="absolute inset-0 top-0 bottom-0 -z-20 bg-[url('/background.svg')] bg-cover opacity-10" />
  );
};

export const NavbarContent = () => {
  // NEW: Sử dụng hook useTranslation với namespace 'common'
  const { t } = useTranslation("common");

  return (
    <>
      <Background />
      <div className={"flex w-full grow flex-col items-center gap-4"}>
        <LanguageSwitcher />
        <div
          className={"h-32 w-32 rounded-full bg-[url('/avatar.png')] bg-cover"}
        />
        <div
          className={
            "text-center text-3xl leading-tight font-bold whitespace-pre-line"
          }
        >
          {t("navbar.name")}
        </div>
        <div className={"flex w-full flex-col text-lg leading-relaxed"}>
          {links.map((link) => (
            <NavLink
              key={link.slug}
              to={link.slug}
              className={({ isActive }) =>
                cn(
                  "hover:bg-primary-200/50 border-primary-500 px-8 py-3 transition-colors duration-75 hover:border-r-4",
                  isActive ? "border-r-4 font-bold" : "",
                )
              }
            >
              {/* Dữ liệu đã được lấy từ i18n, giữ nguyên */}
              <div>{t(link.label)}</div>
            </NavLink>
          ))}
        </div>
      </div>

      <div className={"flex flex-col items-center gap-4"}>
        <a
          href={"/truong-nguyen-khanh-huyen-cv.pdf"}
          className={"cursor-pointer"}
        >
          <MagnetizeButton particleCount={14} attractRadius={50} />
        </a>
        <div className={"flex gap-2"}>
          {socialMedias.map((socialMedia) => (
            <a // CHANGED: Bọc trong thẻ <a> để có thể click
              key={socialMedia.link}
              href={socialMedia.link}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "hover:bg-primary-50 hover:border-primary-200 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border duration-75"
              }
            >
              {socialMedia.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export const Navbar = () => {
  // NEW: Sử dụng hook useTranslation
  const { t } = useTranslation("common");

  return (
    <header
      className={
        "sticky top-0 z-10 h-12 shrink-0 bg-white lg:h-screen lg:w-2xs lg:min-w-2xs"
      }
    >
      <nav
        className={cn(
          "hidden h-full w-2xs min-w-2xs shrink-0 flex-col items-center justify-between overflow-hidden py-8 lg:flex",
        )}
      >
        <NavbarContent />
      </nav>

      <div
        className={"flex h-full items-center justify-between px-4 lg:hidden"}
      >
        {/* CHANGED: Lấy tên viết tắt từ i18n */}
        <div className="font-bold">{t("navbar.initials", "KH")}</div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <NavbarContent />
            <SheetFooter>
              <SheetClose asChild>
                {/* CHANGED: Lấy text từ i18n */}
                <Button variant="outline">{t("navbar.close")}</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`
    *   `src/components/ui/magnetize-button.tsx`
    *   `src/components/ui/button.tsx`
    *   `src/components/ui/sheet.tsx`

---

### Phân tích file: `src/components/common/ProjectCarousel.tsx`

#### Nội dung file

```tsx
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

```

#### Mối quan hệ

*   **Imports:**
    *   `src/components/ui/button.tsx`
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/components/magicui/animated-circular-progress-bar.tsx`

#### Nội dung file

```tsx
import { cn } from "@/lib/utils";

interface AnimatedCircularProgressBarProps {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div
      className={cn("relative size-40 text-2xl font-semibold", className)}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--transition-length": "1s",
          "--transition-step": "200ms",
          "--delay": "0s",
          "--percent-to-deg": "3.6deg",
          transform: "translateZ(0)",
        } as React.CSSProperties
      }
    >
      <svg
        fill="none"
        className="size-full"
        strokeWidth="2"
        viewBox="0 0 100 100"
      >
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" opacity-100"
            style={
              {
                stroke: gaugeSecondaryColor,
                "--stroke-percent": 90 - currentPercent,
                "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                transform:
                  "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
                transition: "all var(--transition-length) ease var(--delay)",
                transformOrigin:
                  "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              } as React.CSSProperties
            }
          />
        )}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-100"
          style={
            {
              stroke: gaugePrimaryColor,
              "--stroke-percent": currentPercent,
              strokeDasharray:
                "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
              transition:
                "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
              transitionProperty: "stroke-dasharray,transform",
              transform:
                "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
              transformOrigin:
                "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
            } as React.CSSProperties
          }
        />
      </svg>
      <span
        data-current-value={currentPercent}
        className="duration-[var(--transition-length)] delay-[var(--delay)] absolute inset-0 m-auto size-fit ease-linear animate-in fade-in"
      >
        {currentPercent}
      </span>
    </div>
  );
}

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/components/magicui/morphing-text.tsx`

#### Nội dung file

```tsx
"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 0.5;

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
    </>
  );
};

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => (
  <div
    className={cn(
      "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] leading-none font-bold [filter:url(#threshold)_blur(0.6px)] lg:h-24 lg:text-[6rem]",
      className,
    )}
  >
    <Texts texts={texts} />
    <SvgFilters />
  </div>
);

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/components/magicui/word-rotate.tsx`

#### Nội dung file

```tsx
"use client";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          className={cn(className)}
          {...motionProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/components/ui/button.tsx`

#### Nội dung file

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/components/ui/magnetize-button.tsx`

#### Nội dung file

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Magnet, Download } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface MagnetizeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number;
  attractRadius?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

function MagnetizeButton({
  className,
  particleCount = 12,
  attractRadius = 50,
  ...props
}: MagnetizeButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();
  const { t } = useTranslation();
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }));
  }, [particlesControl, particles]);

  return (
    <Button
      className={cn(
        "relative min-w-40 touch-none",
        "bg-primary-100 dark:bg-primary-900",
        "hover:bg-primary-200 dark:hover:bg-primary-800",
        "text-primary-600 dark:text-primary-300",
        "border-primary-300 dark:border-primary-700 border",
        "transition-all duration-300",
        className,
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            "absolute h-1.5 w-1.5 rounded-full",
            "bg-primary-400 dark:bg-primary-300",
            "transition-opacity duration-300",
            isAttracting ? "opacity-100" : "opacity-40",
          )}
        />
      ))}
      <span className="relative flex w-full items-center justify-center gap-2">
        <Download
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isAttracting && "scale-120",
          )}
        />
        {t("navbar.downloadCV")}
      </span>
    </Button>
  );
}

export { MagnetizeButton };

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`
    *   `src/components/ui/button.tsx`

---

### Phân tích file: `src/components/ui/progress.tsx`

#### Nội dung file

```tsx
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-neutral-200",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-rose-400 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/components/ui/shadcn-io/bubble-background/index.tsx`

#### Nội dung file

```tsx
"use client";

import * as React from "react";
import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

type BubbleBackgroundProps = React.ComponentProps<"div"> & {
  interactive?: boolean;
  transition?: SpringOptions;
  colors?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
  };
};

function BubbleBackground({
  ref,
  className,
  children,
  interactive = false,
  transition = { stiffness: 100, damping: 20 },
  colors = {
    first: "18,113,255",
    second: "221,74,255",
    third: "0,220,255",
    fourth: "200,50,50",
    fifth: "180,180,50",
    sixth: "140,100,255",
  },
  ...props
}: BubbleBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  React.useEffect(() => {
    if (!interactive) return;

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    currentContainer?.addEventListener("mousemove", handleMouseMove);
    return () =>
      currentContainer?.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      data-slot="bubble-background"
      className={cn(
        "relative -z-10 size-full overflow-hidden bg-gradient-to-br from-violet-900 to-blue-900",
        className,
      )}
      {...props}
    >
      <style>
        {`
            :root {
              --first-color: ${colors.first};
              --second-color: ${colors.second};
              --third-color: ${colors.third};
              --fourth-color: ${colors.fourth};
              --fifth-color: ${colors.fifth};
              --sixth-color: ${colors.sixth};
            }
          `}
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 h-0 w-0"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-0"
        style={{ filter: "url(#goo) blur(40px)" }}
      >
        <motion.div
          className="absolute top-[10%] left-[10%] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--first-color),0.8)_0%,rgba(var(--first-color),0)_50%)] mix-blend-hard-light"
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
        />

        <motion.div
          className="absolute inset-0 flex origin-[calc(50%-400px)] items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div className="top-[10%] left-[10%] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--second-color),0.8)_0%,rgba(var(--second-color),0)_50%)] mix-blend-hard-light" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex origin-[calc(50%+400px)] items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute top-[calc(50%+200px)] left-[calc(50%-500px)] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--third-color),0.8)_0%,rgba(var(--third-color),0)_50%)] mix-blend-hard-light" />
        </motion.div>

        <motion.div
          className="absolute top-[10%] left-[10%] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--fourth-color),0.8)_0%,rgba(var(--fourth-color),0)_50%)] opacity-70 mix-blend-hard-light"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 40, ease: "easeInOut", repeat: Infinity }}
        />

        <motion.div
          className="absolute inset-0 flex origin-[calc(50%_-_800px)_calc(50%_+_200px)] items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute top-[calc(50%-80%)] left-[calc(50%-80%)] size-[160%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--fifth-color),0.8)_0%,rgba(var(--fifth-color),0)_50%)] mix-blend-hard-light" />
        </motion.div>

        {interactive && (
          <motion.div
            className="absolute size-full rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--sixth-color),0.8)_0%,rgba(var(--sixth-color),0)_50%)] opacity-70 mix-blend-hard-light"
            style={{
              x: springX,
              y: springY,
            }}
          />
        )}
      </div>

      {children}
    </div>
  );
}

export { BubbleBackground, type BubbleBackgroundProps };

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/components/ui/sheet.tsx`

#### Nội dung file

```tsx
import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/features/resume/AboutMe.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";

export const AboutMe = () => {
  const { tResume, aboutMe } = useResumeData();
  return (
    <Section heading={tResume("heading.aboutMe")}>
      <em className={"!my-0 block text-sm leading-relaxed !font-normal"}>
        {aboutMe.summary}
      </em>
    </Section>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/hooks/useResumeData.ts`

---

### Phân tích file: `src/features/resume/Avatar.tsx`

#### Nội dung file

```tsx
export const Avatar = () => {
  return (
    <div
      className={
        "relative !m-auto h-fit w-fit rounded-full border-2 border-rose-400 p-1"
      }
    >
      <div className={"relative h-40 w-40 overflow-hidden rounded-full"}>
        <img src={"avatar.png"} className={"relative -top-4 !my-0 bg-cover"} />
      </div>
    </div>
  );
};

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/features/resume/Certifications.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";

export const Certifications = () => {
  const { tResume, certifications } = useResumeData();

  return (
    <Section heading={tResume("heading.certifications")}>
      {certifications.map((cert) => (
        <div key={cert}>{cert}</div>
      ))}
    </Section>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/hooks/useResumeData.ts`

---

### Phân tích file: `src/features/resume/Contact.tsx`

#### Nội dung file

```tsx
import { useResumeData } from "@/hooks/useResumeData";
import { TbCake, TbMail, TbMapPinFilled, TbPhoneCall } from "react-icons/tb";

export const Contact = () => {
  const { contact } = useResumeData();

  return (
    <div className={"-mb-3 flex justify-between border-y-1 py-3 text-sm"}>
      <div className={"flex items-center gap-3"}>
        <TbCake className={"relative -top-0.5 text-lg text-rose-400"} />
        {contact.birthYear}
      </div>
      <div className={"flex items-center gap-3"}>
        <TbPhoneCall className={"relative -top-0.5 text-lg text-rose-400"} />
        {contact.phone}
      </div>
      <div className={"flex items-center gap-3"}>
        <TbMail className={"relative -top-0.5 text-lg text-rose-400"} />
        {contact.email}
      </div>
      <div className={"flex items-center gap-3"}>
        <TbMapPinFilled className={"relative -top-0.5 text-lg text-rose-400"} />
        {contact.address}
      </div>
    </div>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/hooks/useResumeData.ts`

---

### Phân tích file: `src/features/resume/Educations.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { BiPlus } from "react-icons/bi";

export const Educations = () => {
  const { tResume, educations } = useResumeData();

  return (
    <Section heading={tResume("heading.education")}>
      <div className={"flex w-full flex-col gap-8"}>
        {educations.map((education) => (
          <div key={education.university} className={"flex gap-2"}>
            <BiPlus className={"shrink-0 text-lg"} />
            <div className={"flex flex-col"}>
              <div className={"mb-1 flex flex-col"}>
                <span className={"mb-1 flex justify-between text-sm"}>
                  <em>{education.university}</em>
                  <em className={"text-sm"}>{education.time}</em>
                </span>
                <h4
                  className={
                    "!my-0 flex items-center gap-12 tracking-widest uppercase"
                  }
                >
                  {education.major}
                </h4>
              </div>
              <span className={"block text-sm leading-relaxed"}>
                {education.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/hooks/useResumeData.ts`

---

### Phân tích file: `src/features/resume/Header.tsx`

#### Nội dung file

```tsx
import { useResumeData } from "@/hooks/useResumeData";
import { Contact } from "./Contact";
import QRCode from "@/assets/QRCode.svg?react";

export const Header = () => {
  const { header, tResume } = useResumeData();

  return (
    <div className={"ml-4 flex flex-col justify-end gap-6"}>
      <div className={"relative flex items-center justify-between"}>
        <div className={"flex flex-col"}>
          <h1
            className={
              "relative !mt-0 !mb-0 flex flex-col font-serif tracking-widest whitespace-pre uppercase"
            }
          >
            <span className={"font-sans text-3xl font-medium"}>
              {header.lastName}
            </span>
            <span className={"text-5xl font-bold"}>{header.firstName}</span>
          </h1>
          <span
            className={"relative mb-2 h-1 w-1/2 rounded-3xl bg-rose-300"}
          ></span>
          <div className={"relative !my-0 flex gap-2 uppercase"}>
            <h3 className={"!my-0 text-lg font-normal tracking-widest"}>
              {header.position}
            </h3>
          </div>
        </div>
        <div className={"flex flex-col-reverse items-center gap-2"}>
          <div
            className={
              "text-2xs flex flex-col items-center justify-center gap-4"
            }
          >
            <div className={"flex flex-col items-center text-xs leading-3"}>
              <strong>{tResume("scanMessage")}</strong>
            </div>
          </div>
          <div className={"h-24 w-24"}>
            <QRCode />
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/hooks/useResumeData.ts`
    *   `src/features/resume/Contact.tsx`

---

### Phân tích file: `src/features/resume/Heading.tsx`

#### Nội dung file

```tsx
import { ReactNode } from "react";
import { TiChevronRight } from "react-icons/ti";
// import Education from "../assets/Education.svg?react";

export const Heading = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className={"flex items-center gap-3 uppercase"}>
      <TiChevronRight className={"mb-1 text-4xl text-rose-400"} />
      {/*<div className={"mb-1 h-8 w-8 rounded-full border-2 border-rose-400 p-1"}>*/}
      {/*  <Education className={"!my-0 fill-red-400"} />*/}
      {/*</div>*/}
      <span className={"font-semibold tracking-widest"}>{children}</span>
      <span
        className={"ml-1 h-1 max-h-0.5 min-h-0.5 grow bg-neutral-300"}
      ></span>
    </h2>
  );
};

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/features/resume/Languages.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { LevelDots } from "./components/LevelDots";

export const Languages = () => {
  const { languages, heading } = useResumeData();

  return (
    <Section heading={heading.languages}>
      {languages.map((language) => (
        <div key={language.label} className={"flex"}>
          <h4 className={"!my-1 flex w-24 grow items-center gap-1 font-normal"}>
            {language.label}
            <span className={"text-2xs mt-0.5 italic"}>
              ({language.tooltip})
            </span>
          </h4>
          <LevelDots level={language.level} />
        </div>
      ))}
    </Section>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/hooks/useResumeData.ts`
    *   `src/features/resume/components/LevelDots.tsx`

---

### Phân tích file: `src/features/resume/Projects.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { BiPlus } from "react-icons/bi";

export const Projects = () => {
  const { heading, projects, tResume } = useResumeData();

  return (
    <Section heading={heading.projects}>
      <div className={"flex flex-col gap-8"}>
        {projects.map((project) => (
          <div key={project.name} className={"flex gap-2"}>
            <BiPlus className={"mt-1 shrink-0 text-lg"} />
            <div className={"!mb-0 !pl-0"}>
              <span className={"mb-1 flex justify-between text-sm"}>
                <em>{project.in}</em>
              </span>
              <h4 className={"!my-0 tracking-widest uppercase"}>
                {project.name}
              </h4>
              <ul className={"!my-2 !ml-0 block text-sm"}>
                {project.desc.map((d, index) => (
                  <li key={index} className={"!my-0 !leading-relaxed"}>
                    {d}
                  </li>
                ))}
              </ul>
              <p className={"prose-sm !my-0"}>
                <strong>{tResume("projects.resultLabel")} </strong>
                {project.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/hooks/useResumeData.ts`

---

### Phân tích file: `src/features/resume/Section.tsx`

#### Nội dung file

```tsx
import { ReactNode } from "react";
import { Heading } from "@/features/resume/Heading.tsx";
import { cn } from "@/lib/utils.ts";

export const Section = ({
  heading,
  children,
  className,
}: {
  heading: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div>
      <Heading>{heading}</Heading>
      <div className={cn("ml-4", className)}>{children}</div>
    </div>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/features/resume/Skills.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section"; // Giả sử Section.tsx cũng được chuyển vào components
import { Progress } from "@/components/ui/progress";
import { useResumeData, SkillCategory } from "@/hooks/useResumeData";

// Một sub-component "ngu ngơ" (dumb component) chỉ để hiển thị
const SkillList = ({ category }: { category: SkillCategory }) => {
  return (
    <div className={"flex flex-col gap-2"}>
      {/* Tiêu đề không cần nữa vì Section đã có heading chung */}
      {category.items.map((skill) => (
        <div
          key={skill.label}
          className={"flex items-center justify-between gap-3"}
        >
          <div className={"shrink-0"}>{skill.label}</div>
          <Progress value={skill.level} className={"w-36"} />
        </div>
      ))}
    </div>
  );
};

export const Skills = () => {
  // Chỉ cần một dòng để lấy toàn bộ dữ liệu cần thiết!
  const { tResume, skills } = useResumeData();

  // Không còn prop `lang`, không còn logic hard-code
  return (
    <Section
      heading={tResume("heading.skills")}
      className={"flex justify-between gap-8 text-xs"}
    >
      <SkillList category={skills.hardSkills} />
      <SkillList category={skills.softSkills} />
    </Section>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/ui/progress.tsx`
    *   `src/hooks/useResumeData.ts`

---

### Phân tích file: `src/features/resume/Tools.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { LevelDots } from "./components/LevelDots";

export const Tools = () => {
  const { tResume, tools } = useResumeData();

  return (
    <Section heading={tResume("heading.tools")}>
      {tools.map((tool) => (
        <div key={tool.label} className={"flex"}>
          <h4 className={"!my-1 flex w-24 grow items-center gap-1 font-normal"}>
            {tool.label}
          </h4>
          <LevelDots level={tool.level} />
        </div>
      ))}
    </Section>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/hooks/useResumeData.ts`
    *   `src/features/resume/components/LevelDots.tsx`

---

### Phân tích file: `src/features/resume/components/LevelDots.tsx`

#### Nội dung file

```tsx
import { cn } from "@/lib/utils";

interface LevelDotsProps {
  level: number;
  maxLevel?: number;
  className?: string;
}

export const LevelDots = ({
  level,
  maxLevel = 6,
  className,
}: LevelDotsProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxLevel }).map((_, index) => {
        const isFilled = index < level;
        return isFilled ? (
          <div key={index} className={"h-3 w-3 rounded-full bg-rose-400"}></div>
        ) : (
          <div
            key={index}
            className={"h-3 w-3 rounded-full border-2 border-rose-400"}
          ></div>
        );
      })}
    </div>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/features/resume/constants.ts`

#### Nội dung file

```ts
export const heading: {
  ABOUT_ME: Text;
  CONTACT: Text;
  SKILLS: Text;
  LANGUAGES: Text;
  EDUCATION: Text;
  PROJECTS: Text;
  CERTIFICATION: Text;
  WORKS: Text;
} = {
  ABOUT_ME: { vi: "Giới thiệu", en: "About Me" }, // "About Me" is slightly more common than "About me" in headings
  CONTACT: { vi: "Liên hệ", en: "Contact" },
  SKILLS: { vi: "Kỹ năng", en: "Skills" },
  LANGUAGES: { vi: "Ngoại ngữ", en: "Languages" },
  EDUCATION: { vi: "Học vấn", en: "Education" },
  PROJECTS: { vi: "Dự án", en: "Projects" },
  CERTIFICATION: { vi: "Chứng chỉ", en: "Certifications" },
  WORKS: { vi: "Kinh nghiệm", en: "Experience" }, // "Experience" is more standard than "Works" for CVs
};

type Text = { vi: string; en: string };

export const header: { FIRST_NAME: Text; LAST_NAME: Text; POSITION: Text } = {
  FIRST_NAME: {
    vi: "Khánh  Huyền",
    en: "Khanh  Huyen",
  }, // Keeping Vietnamese name order is standard
  LAST_NAME: {
    vi: "Trương  Nguyễn",
    en: "Truong  Nguyen",
  }, // Keeping Vietnamese name order is standard
  POSITION: { vi: "Thực tập sinh Marketing", en: "Marketing Intern" },
};

export const contacts: { ADDRESS: Text } = {
  ADDRESS: {
    vi: "Quận 2, Tp. Hồ Chí Minh",
    en: "District 2, Ho Chi Minh City",
  },
  // Add other contact fields here like Phone, Email, LinkedIn if available
  // PHONE: { vi: "Số điện thoại", en: "Phone Number" },
  // EMAIL: { vi: "Địa chỉ Email", en: "Email Address" },
  // LINKEDIN: { vi: "Hồ sơ LinkedIn", en: "LinkedIn Profile" }
};

export const languages = [
  // { label: { en: "Vietnamese", vi: "Tiếng Việt" }, level: 6, tooltip: "Native" }, // Added Vietnamese as Native for completeness
  { label: { en: "English", vi: "Tiếng Anh" }, level: 4, tooltip: "TOEIC 850" },
  { label: { en: "Chinese", vi: "Tiếng Trung" }, level: 2, tooltip: "HSK 4" },
].map((lang) => {
  const level: boolean[] = [];
  for (let i = 0; i < 6; i++) {
    level.push(i < lang.level);
  }
  return { ...lang, level };
});

// Note: Tooltips for design skills should ideally reflect proficiency (e.g., Basic, Intermediate, Advanced)
// or specific achievements, not language scores like TOEIC/HSK. I've added suggested proficiency levels.
export const designs = [
  { label: "Canva", level: 9, tooltip: "Advanced" }, // Assuming level 9/10 is advanced
  { label: "Capcut", level: 7, tooltip: "Proficient" }, // Assuming level 7/10 is proficient
  { label: "Photoshop", level: 4, tooltip: "Basic" }, // Assuming level 4/10 is basic
  { label: "Illustrator", level: 4, tooltip: "Basic" }, // Assuming level 4/10 is basic
];

export const educations: Array<{
  university: Text;
  major: Text;
  time: [number, number | null];
  gpa?: number;
  desc: Text;
}> = [
  {
    university: {
      vi: "Trường Đại học Mở Thành phố Hồ Chí Minh",
      en: "Ho Chi Minh City Open University",
    },
    major: { vi: "Marketing", en: "Marketing" },
    time: [2022, null], // Represents 2022 - Present
    gpa: 3.8,
    desc: {
      vi: "Các môn học tiêu biểu: Quản trị Thương hiệu (A+, 9.8), Quảng cáo (A+, 9.3), Quản trị Marketing (A+, 9.3), Nghiên cứu Marketing (A+, 9.2).",
      en: "Relevant Coursework: Brand Management (A+, 9.8), Advertising (A+, 9.3), Marketing Management (A+, 9.3), Marketing Research (A+, 9.2).",
    },
  },
  {
    university: {
      vi: "Trường Đại học Y khoa Phạm Ngọc Thạch",
      en: "Pham Ngoc Thach University of Medicine",
    },
    major: { vi: "Y đa khoa", en: "General Medicine" },
    time: [2017, 2021],
    desc: {
      vi: "Quá trình giúp bản thân rèn luyện tư duy phân tích, sự tỉ mỉ, khả năng chịu áp lực và tinh thần trách nhiệm, trước khi tự xác định lại đam mê và quyết tâm theo đuổi lĩnh vực Marketing.",
      en: "Developed analytical thinking, meticulousness, resilience under pressure, and a strong sense of responsibility during medical studies before identifying a passion for and deciding to pursue the Marketing field.",
    },
  },
];

export const projects: Array<{
  in: Text;
  name: Text;
  desc: { vi: string[]; en: string[] };
  result: Text;
}> = [
  {
    in: {
      vi: "Môn học: IMC",
      en: "",
    },
    name: {
      vi: "Xây dựng Kế hoạch Truyền thông Marketing Tích hợp",
      en: "Integrated Marketing Communications (IMC) Plan Development",
    },
    desc: {
      vi: [
        "Phân tích đối tượng mục tiêu, thiết lập mục tiêu truyền thông (SMART).",
        "Xây dựng thông điệp chủ đạo & chiến lược phối hợp kênh (Social, Content...).",
        "Đề xuất hoạt động cụ thể, phác thảo ngân sách & timeline.",
      ],
      en: [
        "Developed a comprehensive IMC plan, starting with target market analysis and setting SMART communication objectives.",
        "Crafted a consistent key message and selected a strategic mix of communication channels (Social Media Marketing, Content Marketing, [Other Channels...]) to maximize reach.",
        "Proposed specific activity ideas for each channel and outlined a basic budget and implementation timeline.",
      ],
    },
    result: {
      vi: "Hoàn thiện bản kế hoạch IMC logic, thể hiện tư duy chiến lược & kỹ năng lập kế hoạch Marketing.",
      en: "Completed a detailed, logical, and feasible IMC plan, achieving an A/A+ grade. Demonstrated strategic Marketing thinking, strong planning skills, and understanding of integrating communication tools.",
    },
  },
  {
    in: {
      vi: "Môn học: E-Commerce",
      en: "",
    },
    name: {
      vi: "Phân tích Chiến lược Thương mại Điện tử và Đề xuất Tối ưu",
      en: "E-commerce Strategy Analysis and Optimization Proposal",
    },
    desc: {
      vi: [
        "Phân tích sâu mô hình kinh doanh, UX/UI, Digital Marketing (SEO, Social)",
        "Xác định điểm mạnh/yếu, cơ hội dựa trên lý thuyết & phân tích đối thủ.",
        "Xây dựng & trình bày các đề xuất tối ưu hóa khả thi.",
      ],
      en: [
        "Conducted in-depth analysis of the business model, user experience (UX/UI), pricing strategy, and Digital Marketing activities (SEO, Social Media) of [Company/Platform Name - Replace Placeholder].",
        "Identified strengths, weaknesses, and improvement opportunities based on E-commerce principles and competitor analysis.",
        "Developed and presented specific optimization recommendations aimed at [Proposal Goal, e.g., increasing conversion rates, enhancing customer experience, improving product visibility].",
      ],
    },
    result: {
      vi: "Hoàn thành báo cáo phân tích chi tiết ([Số trang]), áp dụng hiệu quả lý thuyết E-commerce vào thực tế.",
      en: "Completed a detailed analysis report of [Number] pages [Replace Placeholder] and achieved an A/A+ grade. Enhanced ability to apply E-commerce theory to practical analysis and problem-solving.",
    },
  },
  {
    in: {
      vi: "Dự án cá nhân",
      en: "",
    },
    name: {
      vi: 'Xây dựng & Phát triển Kênh TikTok Cá nhân về "Study Vlog"',
      en: 'Building & Developing a Personal TikTok Channel themed "Study Vlog"',
    },
    desc: {
      vi: [
        "Nghiên cứu trends & thuật toán TikTok.",
        "Sản xuất [Số lượng, VD: 20+] video (lên ý tưởng, quay dựng bằng [Tên công cụ]).",
        "Phân tích hiệu quả & tối ưu hóa nội dung, hashtag.",
      ],
      en: [
        "Proactively researched viral content formats and the TikTok platform's algorithm to build an engaging content strategy.",
        "Produced (ideated, filmed, edited using [Tool Name, e.g., CapCut] - Replace Placeholder) [Quantity, e.g., 20+] creative short videos focusing on [Content Goal, e.g., sharing applied Marketing knowledge, analyzing short case studies... - Replace Placeholder].",
        "Analyzed video performance (views, engagement) to optimize content strategy and hashtag approach.",
      ],
    },
    result: {
      vi: "Đạt [Số liệu nổi bật, VD: XXX views/video], phát triển kỹ năng Content Video, biên tập, nắm bắt xu hướng social.",
      en: "Achieved [Specific Metrics if available, e.g., XXX views for a top video, XX% follower growth in Month Y - Replace Placeholder], significantly developing practical skills in short-form video content creation, editing, and understanding social media trends.",
    },
  },
];

// Add other sections like CERTIFICATION, SKILLS (e.g., Technical Skills, Soft Skills) here in a similar format

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/features/resume/types.ts`

#### Nội dung file

```ts
export type Lang = "en" | "vi";

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/hooks/useResumeData.ts`

#### Nội dung file

```ts
import { useTranslation } from "react-i18next";

// =================================================================
// 1. ĐỊNH NGHĨA CÁC TYPE CHO DỮ LIỆU CV (Giữ nguyên)
// =================================================================

export interface HeadingData {
  aboutMe: string;
  skills: string;
  languages: string;
  tools: string;
  education: string;
  projects: string;
  certifications: string;
}

export interface HeaderData {
  firstName: string;
  lastName: string;
  position: string;
}

export interface ContactData {
  birthYear: string;
  phone: string;
  email: string;
  address: string;
  portfolio: string;
}

export interface AboutMeData {
  summary: string;
}

export interface LanguageItem {
  label: string;
  tooltip: string;
  level: number;
}

export interface ToolItem {
  label: string;
  level: number;
}

export interface SkillItem {
  label: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export interface SkillsData {
  hardSkills: SkillCategory;
  softSkills: SkillCategory;
}

export interface EducationItem {
  university: string;
  major: string;
  time: string;
  gpa: number | null;
  desc: string;
}

export interface ProjectItem {
  in: string;
  name: string;
  desc: string[];
  result: string;
}

// =================================================================
// 2. CUSTOM HOOK `useResumeData` (ĐÃ ĐƯỢC SỬA LẠI)
// =================================================================

export const useResumeData = () => {
  // Luôn sử dụng namespace 'resume' khi gọi t() cho dữ liệu CV
  const { t } = useTranslation("resume");

  // === THAY ĐỔI Ở ĐÂY: Đã xóa tiền tố "cv." khỏi tất cả các key ===
  const heading = t("heading", { returnObjects: true }) as HeadingData;
  const header = t("header", { returnObjects: true }) as HeaderData;
  const contact = t("contact", { returnObjects: true }) as ContactData;
  const aboutMe = t("aboutMe", { returnObjects: true }) as AboutMeData;
  const languages = t("languages.items", {
    returnObjects: true,
  }) as LanguageItem[];
  const tools = t("tools.items", { returnObjects: true }) as ToolItem[];
  const certifications = t("certifications.items", {
    returnObjects: true,
  }) as string[];
  const skills = t("skills", { returnObjects: true }) as SkillsData;
  const educations = t("educations.items", {
    returnObjects: true,
  }) as EducationItem[];
  const projects = t("projects.items", {
    returnObjects: true,
  }) as ProjectItem[];
  // === KẾT THÚC THAY ĐỔI ===

  // Trả về hàm t từ namespace chung nếu cần dịch các chuỗi lẻ khác
  const { t: tCommon } = useTranslation("common");

  return {
    t: tCommon, // Trả về t chung
    tResume: t, // Trả về t của resume để dùng trong các component con
    heading,
    header,
    contact,
    aboutMe,
    languages, // Bây giờ biến này sẽ là một mảng, lỗi sẽ được khắc phục
    tools,
    certifications,
    skills,
    educations,
    projects,
  };
};

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/i18n.ts`

#### Nội dung file

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonVI from "./locales/vi/common.json";
import portfolioVI from "./locales/vi/portfolio.json";
import resumeVI from "./locales/vi/resume.json";

import commonEN from "./locales/en/common.json";
import portfolioEN from "./locales/en/portfolio.json";
import resumeEN from "./locales/en/resume.json";

import commonZH from "./locales/zh/common.json";
import portfolioZH from "./locales/zh/portfolio.json";
import resumeZH from "./locales/zh/resume.json";

const resources = {
  vi: {
    common: commonVI,
    portfolio: portfolioVI,
    resume: resumeVI,
  },
  en: {
    common: commonEN,
    portfolio: portfolioEN,
    resume: resumeEN,
  },
  zh: {
    common: commonZH,
    portfolio: portfolioZH,
    resume: resumeZH,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "vi",
    ns: ["common", "portfolio"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});

export default i18n;

```

#### Mối quan hệ

*   **Imports:**
    *   `src/locales/vi/common.json`
    *   `src/locales/vi/portfolio.json`
    *   `src/locales/vi/resume.json`
    *   `src/locales/en/common.json`
    *   `src/locales/en/portfolio.json`
    *   `src/locales/en/resume.json`
    *   `src/locales/zh/common.json`
    *   `src/locales/zh/portfolio.json`
    *   `src/locales/zh/resume.json`

---

### Phân tích file: `src/index.css`

#### Nội dung file

```css
@import "tailwindcss";
@import "tw-animate-css";
@plugin "@tailwindcss/typography";

@custom-variant dark (&:is(.dark *));

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-SmbdItDisp.woff2") format("woff2");
  font-weight: 600;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-MedDisp.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-MedItDisp.woff2") format("woff2");
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-LtDisp.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-LtItDisp.woff2") format("woff2");
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-BdDisp.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-BdItDisp.woff2") format("woff2");
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-Disp.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Garamond Premiere Pro Display";
  src: url("/fonts/GaramondPremrPro-ItDisp.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Black Italic VN.otf") format("woff2");
  font-weight: 900;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Black VN.otf") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Bold Italic VN.otf") format("woff2");
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Bold VN.otf") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro SemiBold Italic VN.otf") format("woff2");
  font-weight: 600;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro SemiBold VN.otf") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Medium Italic VN.otf") format("woff2");
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Medium VN.otf") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Italic VN.otf") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Regular VN.otf") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Light Italic VN.otf") format("woff2");
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Light VN.otf") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Extralight Italic VN.otf") format("woff2");
  font-weight: 200;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Extralight VN.otf") format("woff2");
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Ultralight Italic VN.otf") format("woff2");
  font-weight: 100;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Sofia Pro";
  src: url("/fonts/Sofia Pro Ultralight VN.otf") format("woff2");
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-BlackIt.woff2") format("woff2");
  font-weight: 900;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-Black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-ExtraBoldIt.woff2") format("woff2");
  font-weight: 800;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-ExtraBold.woff2") format("woff2");
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-BoldIt.woff2") format("woff2");
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-SemiBoldIt.woff2") format("woff2");
  font-weight: 600;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-MediumIt.woff2") format("woff2");
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-RegularIt.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-LightIt.woff2") format("woff2");
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-UltralightIt.woff2") format("woff2");
  font-weight: 100;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Soft";
  src: url("/fonts/ProximaSoft-Ultralight.woff2") format("woff2");
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@theme {
  --font-sans:
    "Proxima Soft", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-serif: "Proxima Soft", ui-serif, "Time New Roman";

  --color-primary-50: var(--color-rose-50);
  --color-primary-100: var(--color-rose-100);
  --color-primary-200: var(--color-rose-200);
  --color-primary-300: var(--color-rose-300);
  --color-primary-400: var(--color-rose-400);
  --color-primary-500: var(--color-rose-500);
  --color-primary-600: var(--color-rose-600);
  --color-primary-700: var(--color-rose-700);
  --color-primary-800: var(--color-rose-800);
  --color-primary-900: var(--color-rose-900);
  --color-primary-950: var(--color-rose-950);

  --color-secondary-50: var(--color-sky-50);
  --color-secondary-100: var(--color-sky-100);
  --color-secondary-200: var(--color-sky-200);
  --color-secondary-300: var(--color-sky-300);
  --color-secondary-400: var(--color-sky-400);
  --color-secondary-500: var(--color-sky-500);
  --color-secondary-600: var(--color-sky-600);
  --color-secondary-700: var(--color-sky-700);
  --color-secondary-800: var(--color-sky-800);
  --color-secondary-900: var(--color-sky-900);
  --color-secondary-950: var(--color-sky-950);
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-lg: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  /* Nền tảng - Ấm áp & Dịu mắt */
  --background: var(--color-stone-50);
  --foreground: var(--color-stone-800);
  --card: var(--color-white);
  --card-foreground: var(--color-stone-800);
  --popover: var(--color-white);
  --popover-foreground: var(--color-stone-800);

  /* Màu sắc thương hiệu - Yêu thương & Bình yên */
  --primary: var(--color-rose-500);
  --primary-foreground: var(--color-rose-50);
  --secondary: var(--color-sky-100);
  --secondary-foreground: var(--color-sky-800);

  /* Màu sắc phụ trợ - Nhẹ nhàng & không gây xao lãng */
  --muted: var(--color-stone-100);
  --muted-foreground: var(--color-stone-500);
  --accent: var(--color-stone-100);
  --accent-foreground: var(--color-stone-900);

  /* Màu sắc phản hồi - Rõ ràng & Dịu dàng */
  --destructive: var(--color-rose-500);
  --destructive-foreground: var(--color-white);
  --success: var(--color-green-500);
  --success-foreground: var(--color-white);
  --warning: var(--color-amber-500);
  --warning-foreground: var(--color-stone-900);

  /* Yếu tố UI khác */
  --border: var(--color-stone-200);
  --input: var(--color-stone-200);
  --ring: var(--color-rose-400);

  /* Bán kính bo góc - Mềm mại, không sắc cạnh */
  --radius: 0.75rem;

  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  --shadow-primary-lg:
    0 10px 15px -3px var(--color-primary-50),
    0 4px 6px -4px var(--color-primary-50);
  --shadow-primary-xl:
    0 20px 25px -5px var(--color-primary-100),
    0 8px 10px -6px var(--color-primary-100);

  --shadow-secondary-lg:
    0 10px 15px -3px var(--color-secondary-50),
    0 4px 6px -4px var(--color-secondary-50);
  --shadow-secondary-xl:
    0 20px 25px -5px var(--color-secondary-100),
    0 8px 10px -6px var(--color-secondary-100);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

.cv {
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply scroll-smooth;
    scrollbar-gutter: stable;
  }

}

.font-cv {
  font-size: 12px;
}


```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/layouts/MainLayout.tsx`

#### Nội dung file

```tsx
import { Navbar } from "@/components/common/Navbar";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";

export function MainLayout() {
  const location = useLocation(); // Lấy location hiện tại

  return (
    <>
      {/*<CustomCursor /> /!* Thêm vào đây *!/*/}
      <div
        className={
          "relative flex min-h-screen flex-col bg-neutral-100 lg:flex-row lg:gap-4"
        }
      >
        <Navbar />
        <main className={"min-w-0 flex-grow bg-white shadow-xl"}>
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

```

#### Mối quan hệ

*   **Imports:**
    *   `src/components/common/Navbar.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/ui/magnetize-button.tsx`
    *   `src/components/ui/button.tsx`
    *   `src/components/ui/sheet.tsx`

---

### Phân tích file: `src/lib/utils.ts`

#### Nội dung file

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/en/common.json`

#### Nội dung file

```json
{
  "projectDetail": {
    "backToProjects": "Trở về danh sách dự án",
    "projectNotFound": "Không tìm thấy dự án",
    "projectNotFoundMessage": "Rất tiếc, chúng tôi không thể tìm thấy dự án bạn đang tìm kiếm."
  },
  "navbar": {
    "about": "About Me",
    "resume": "Resume",
    "portfolio": "Portfolio",
    "downloadCV": "Download CV",
    "socials": [
      {
        "name": "Facebook",
        "url": "https://facebook.com"
      },
      {
        "name": "Tiktok",
        "url": "https://tiktok.com"
      }
    ]
  },
  "home": {
    "greeting": "Hello!",
    "introduction": "I am Khanh Huyen",
    "wordRotate": ["Marketing", "Content Creation", "Planning"]
  },
  "cv": {
    "header": {
      "firstName": "Khanh Huyen",
      "lastName": "Truong Nguyen",
      "position": "Marketing Intern"
    },
    "contact": {
      "birthYear": "1999",
      "phone": "(+84) 976 8888 09",
      "email": "huyentnk1504@gmail.com",
      "address": "District 2, Ho Chi Minh City",
      "portfolio": "huyentnk.com"
    },
    "heading": {
      "aboutMe": "About Me",
      "contact": "Contact",
      "skills": "Skills",
      "languages": "Languages",
      "tools": "Tools",
      "education": "Education",
      "projects": "Projects",
      "certifications": "Certifications",
      "experience": "Experience"
    },
    "aboutMe": {
      "summary": "A third-year Marketing student with a strong academic record and a solid foundation in marketing principles. Possesses practical experience from academic projects in integrated marketing planning, competitor analysis, and content development. Eager to apply knowledge, skills, and a proactive learning attitude to the Marketing Intern position to contribute to campaigns at a creative agency."
    },
    "languages": {
      "items": [
        {
          "label": "English",
          "tooltip": "TOEIC 850",
          "level": 4
        },
        {
          "label": "Chinese",
          "tooltip": "HSK 4",
          "level": 2
        }
      ]
    },
    "tools": {
      "items": [
        {
          "label": "MS Office",
          "level": 5
        },
        {
          "label": "Canva & Capcut",
          "level": 4
        },
        {
          "label": "Adobe CS (PS/AI)",
          "level": 2
        },
        {
          "label": "Google Analytics",
          "level": 1
        }
      ]
    },
    "certifications": {
      "items": [
        "Google Digital Garage",
        "LinkedIn Marketing Labs",
        "Hubspot Inbound Marketing"
      ]
    },
    "skills": {
      "hardSkills": {
        "title": "Hard Skills",
        "items": [
          {
            "label": "Content Creation",
            "level": 90
          },
          {
            "label": "Social Media Marketing",
            "level": 60
          },
          {
            "label": "Market Research",
            "level": 70
          },
          {
            "label": "Marketing Planning",
            "level": 20
          }
        ]
      },
      "softSkills": {
        "title": "Soft Skills",
        "items": [
          {
            "label": "Communication & Presentation",
            "level": 90
          },
          {
            "label": "Creativity & Innovation",
            "level": 50
          },
          {
            "label": "Teamwork",
            "level": 70
          },
          {
            "label": "Problem Solving",
            "level": 20
          }
        ]
      }
    },
    "educations": {
      "items": [
        {
          "university": "Ho Chi Minh City Open University",
          "major": "Marketing",
          "time": "2022 - Present",
          "gpa": 3.8,
          "desc": "Relevant Coursework: Brand Management (A+, 9.8), Advertising (A+, 9.3), Marketing Management (A+, 9.3), Marketing Research (A+, 9.2)."
        },
        {
          "university": "Pham Ngoc Thach University of Medicine",
          "major": "General Medicine",
          "time": "2017 - 2021",
          "gpa": null,
          "desc": "This period helped cultivate analytical thinking, meticulousness, resilience under pressure, and a sense of responsibility before re-identifying a passion for and deciding to pursue the Marketing field."
        }
      ]
    },
    "projects": {
      "resultLabel": "Key Achievement:",
      "items": [
        {
          "in": "Coursework: IMC",
          "name": "Integrated Marketing Communications (IMC) Plan Development",
          "desc": [
            "Analyzed target audience, set SMART communication objectives.",
            "Developed key messaging & coordinated channel strategy (Social, Content...).",
            "Proposed specific activities, outlined budget & timeline."
          ],
          "result": "Completed a logical IMC plan, demonstrating strategic thinking & marketing planning skills."
        },
        {
          "in": "Coursework: E-Commerce",
          "name": "E-commerce Strategy Analysis and Optimization Proposal",
          "desc": [
            "In-depth analysis of business model, UX/UI, Digital Marketing (SEO, Social).",
            "Identified strengths/weaknesses, opportunities based on theory & competitor analysis.",
            "Developed & presented feasible optimization proposals."
          ],
          "result": "Completed a detailed analysis report, effectively applying E-commerce theory to practice."
        },
        {
          "in": "Personal Project",
          "name": "Building & Developing a Personal TikTok Channel on \"Study Vlog\"",
          "desc": [
            "Researched TikTok trends & algorithms.",
            "Produced videos (ideation, filming, editing).",
            "Analyzed performance & optimized content, hashtags."
          ],
          "result": "Achieved positive metrics, developed skills in video content, editing, and understanding social trends."
        }
      ]
    }
  }
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/en/portfolio.json`

#### Nội dung file

```json
{
  "pageTitle": "Các dự án nổi bật",
  "categories": [
    { "name": "Tất cả Dự án", "slug": "all" },
    { "name": "Chiến lược & Kế hoạch", "slug": "strategy" },
    { "name": "Sáng tạo Nội dung", "slug": "content" },
    { "name": "Phân tích & Nghiên cứu", "slug": "analysis" }
  ],
  "projects": [
    {
      "slug": "the-art-of-communication",
      "name": "Nghệ thuật Truyền thông",
      "designation": "Chiến lược IMC",
      "categorySlug": "strategy",
      "quote": "Xây dựng một kế hoạch IMC toàn diện, bắt đầu từ việc phân tích thị trường mục tiêu và thiết lập các mục tiêu SMART để tối đa hóa phạm vi tiếp cận và tác động.",
      "src": "/images/project-1.jpg",
      "heroImage": "/images/project-1-hero.jpg",
      "overview": "Một kế hoạch IMC toàn diện được thiết kế để nâng cao sự hiện diện của thương hiệu và thu hút thế hệ người tiêu dùng mới thông qua cách kể chuyện đa kênh, có chiến lược.",
      "details": [
        { "label": "Khách hàng", "value": "Dự án Môn học" },
        { "label": "Vai trò", "value": "Chuyên viên Chiến lược, Lập kế hoạch Nội dung" },
        { "label": "Thời gian", "value": "4 Tuần" },
        { "label": "Năm", "value": "2023" }
      ],
      "content": "<h3>Thách thức</h3><p>Thách thức chính là tạo ra một kế hoạch Truyền thông Marketing Tích hợp từ đầu. Điều này bao gồm nghiên cứu thị trường sâu rộng, xác định một định vị giá trị độc đáo, và tạo ra một thông điệp gây tiếng vang trên các nền tảng đa dạng trong khi vẫn duy trì một tiếng nói thương hiệu nhất quán.</p><img src=\"/images/project-1-content-1.jpg\" alt=\"Phân tích nghiên cứu thị trường\" /><h3>Tiếp cận & Giải pháp</h3><p>Quy trình của tôi bắt đầu bằng việc phân tích kỹ lưỡng đối tượng mục tiêu và đối thủ cạnh tranh. Tôi đã sử dụng mô hình SMART để đặt ra các mục tiêu rõ ràng, có thể đo lường được. Cốt lõi của giải pháp là một chiến lược tập trung vào nội dung, ưu tiên cách kể chuyện chân thực hơn là bán hàng cứng nhắc.</p><ul><li><strong>Chiến lược Kênh:</strong> Lựa chọn sự kết hợp giữa mạng xã hội (Instagram, TikTok) và marketing nội dung (blog) để tối đa hóa phạm vi tiếp cận.</li><li><strong>Thông điệp Chính:</strong> Phát triển một thông điệp chủ đạo nhất quán tập trung vào sự trao quyền và sáng tạo.</li><li><strong>Thực thi:</strong> Vạch ra các ý tưởng hoạt động cụ thể, lịch nội dung và đề xuất ngân sách theo từng giai đoạn.</li></ul><h3>Kết quả</h3><p>Kế hoạch IMC cuối cùng là một lộ trình logic, chi tiết và khả thi. Nó đã nhận được điểm A+ và được khen ngợi về chiều sâu chiến lược và sự sáng tạo trong thực thi. Dự án này đã mài giũa kỹ năng của tôi về tư duy chiến lược, phân tích thị trường và lập kế hoạch marketing toàn diện.</p>"
    },
    {
      "slug": "digital-storefront",
      "name": "Cửa hàng Số",
      "designation": "Phân tích E-commerce",
      "categorySlug": "analysis",
      "quote": "Thực hiện phân tích sâu về mô hình kinh doanh, trải nghiệm người dùng và các hoạt động marketing số để xác định các cơ hội tối ưu hóa quan trọng.",
      "src": "/images/project-2.jpg",
      "heroImage": "/images/project-2-hero.jpg",
      "overview": "Một phân tích sâu về chiến lược của một nền tảng thương mại điện tử, xác định điểm mạnh, điểm yếu và các đề xuất có thể hành động để cải thiện tỷ lệ chuyển đổi và trải nghiệm người dùng.",
      "details": [
        { "label": "Đối tượng", "value": "Nền tảng E-commerce" },
        { "label": "Vai trò", "value": "Chuyên viên Phân tích, Nghiên cứu UX" },
        { "label": "Thời gian", "value": "3 Tuần" },
        { "label": "Năm", "value": "2023" }
      ],
      "content": "<h3>Mục tiêu</h3><p>Mục tiêu là áp dụng lý thuyết thương mại điện tử vào một trường hợp thực tế, phân tích mô hình kinh doanh, UX/UI và các nỗ lực marketing số để đề xuất các cải tiến hữu hình.</p><img src=\"/images/project-2-content-1.jpg\" alt=\"Phân tích UX/UI\" /><h3>Phương pháp luận</h3><p>Tôi đã tiến hành đánh giá heuristic về hành trình của người dùng, từ trang đích đến trang thanh toán. Điều này được bổ sung bằng một phân tích cạnh tranh để so sánh với các công ty hàng đầu trong ngành. Các lĩnh vực trọng tâm bao gồm điều hướng trang web, khám phá sản phẩm và khả năng đáp ứng trên thiết bị di động.</p><h3>Phát hiện & Đề xuất</h3><p>Phân tích đã tiết lộ một số điểm ma sát trong quy trình thanh toán và cơ hội để tăng cường SEO. Các đề xuất của tôi bao gồm việc tinh giản luồng thanh toán, tối ưu hóa mô tả sản phẩm với các từ khóa liên quan và triển khai một menu điều hướng di động trực quan hơn.</p>"
    }
  ]
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/en/resume.json`

#### Nội dung file

```json
{
  "scanMessage": "Quét để xem Portfolio!",
  "header": {
    "firstName": "Khánh Huyền",
    "lastName": "Trương Nguyễn",
    "position": "Thực tập sinh Marketing"
  },
  "contact": {
    "birthYear": "1999",
    "phone": "(+84) 976 8888 09",
    "email": "huyentnk1504@gmail.com",
    "address": "Quận 2, Tp. Hồ Chí Minh",
    "portfolio": "huyentnk.com"
  },
  "heading": {
    "aboutMe": "Giới thiệu",
    "skills": "Kỹ năng",
    "languages": "Ngoại ngữ",
    "tools": "Công cụ",
    "education": "Học vấn",
    "projects": "Dự án",
    "certifications": "Chứng chỉ"
  },
  "aboutMe": {
    "summary": "Sinh viên năm 3 ngành Marketing, với thành tích học tập tốt và kiến thức vững chắc về Marketing, có kinh nghiệm thực hành thông qua các dự án học thuật về lập kế hoạch Marketing tích hợp, phân tích đối thủ cạnh tranh và phát triển nội dung. Mong muốn vận dụng kiến thức, kỹ năng và tinh thần chủ động học hỏi vào vị trí Thực tập sinh Marketing để đóng góp vào các chiến dịch tại một agency sáng tạo."
  },
  "languages": {
    "items": [
      {
        "label": "Tiếng Anh",
        "tooltip": "TOEIC 850",
        "level": 4
      },
      {
        "label": "Tiếng Trung",
        "tooltip": "HSK 4",
        "level": 2
      }
    ]
  },
  "tools": {
    "items": [
      {
        "label": "MS Office",
        "level": 5
      },
      {
        "label": "Canva & Capcut",
        "level": 4
      },
      {
        "label": "Adobe CS (PS/AI)",
        "level": 2
      },
      {
        "label": "Google Analytics",
        "level": 1
      }
    ]
  },
  "certifications": {
    "items": [
      "Google Digital Garage",
      "Linkedln Marketing Labs",
      "Hubspot Inbound Marketing"
    ]
  },
  "skills": {
    "hardSkills": {
      "title": "Kỹ năng cứng",
      "items": [
        {
          "label": "Sáng tạo Nội dung",
          "level": 90
        },
        {
          "label": "Tiếp thị Mạng xã hội",
          "level": 60
        },
        {
          "label": "Nghiên cứu Thị trường",
          "level": 70
        },
        {
          "label": "Lập kế hoạch Marketing",
          "level": 20
        }
      ]
    },
    "softSkills": {
      "title": "Kỹ năng mềm",
      "items": [
        {
          "label": "Giao tiếp & Trình bày",
          "level": 90
        },
        {
          "label": "Sáng tạo & Đổi mới",
          "level": 50
        },
        {
          "label": "Làm việc nhóm",
          "level": 70
        },
        {
          "label": "Giải quyết Vấn đề",
          "level": 20
        }
      ]
    }
  },
  "educations": {
    "items": [
      {
        "university": "Trường Đại học Mở Thành phố Hồ Chí Minh",
        "major": "Marketing",
        "time": "2022 - Hiện tại",
        "gpa": 3.8,
        "desc": "Các môn học tiêu biểu: Quản trị Thương hiệu (A+, 9.8), Quảng cáo (A+, 9.3), Quản trị Marketing (A+, 9.3), Nghiên cứu Marketing (A+, 9.2)."
      },
      {
        "university": "Trường Đại học Y khoa Phạm Ngọc Thạch",
        "major": "Y đa khoa",
        "time": "2017 - 2021",
        "gpa": null,
        "desc": "Quá trình giúp bản thân rèn luyện tư duy phân tích, sự tỉ mỉ, khả năng chịu áp lực và tinh thần trách nhiệm, trước khi tự xác định lại đam mê và quyết tâm theo đuổi lĩnh vực Marketing."
      }
    ]
  },
  "projects": {
    "resultLabel": "Kết quả đạt được:",
    "items": [
      {
        "in": "Môn học: IMC",
        "name": "Xây dựng Kế hoạch Truyền thông Marketing Tích hợp",
        "desc": [
          "Phân tích đối tượng mục tiêu, thiết lập mục tiêu truyền thông (SMART).",
          "Xây dựng thông điệp chủ đạo & chiến lược phối hợp kênh (Social, Content...).",
          "Đề xuất hoạt động cụ thể, phác thảo ngân sách & timeline."
        ],
        "result": "Hoàn thiện bản kế hoạch IMC logic, thể hiện tư duy chiến lược & kỹ năng lập kế hoạch Marketing."
      },
      {
        "in": "Môn học: E-Commerce",
        "name": "Phân tích Chiến lược Thương mại Điện tử và Đề xuất Tối ưu",
        "desc": [
          "Phân tích sâu mô hình kinh doanh, UX/UI, Digital Marketing (SEO, Social)",
          "Xác định điểm mạnh/yếu, cơ hội dựa trên lý thuyết & phân tích đối thủ.",
          "Xây dựng & trình bày các đề xuất tối ưu hóa khả thi."
        ],
        "result": "Hoàn thành báo cáo phân tích chi tiết, áp dụng hiệu quả lý thuyết E-commerce vào thực tế."
      },
      {
        "in": "Dự án cá nhân",
        "name": "Xây dựng & Phát triển Kênh TikTok Cá nhân về \"Study Vlog\"",
        "desc": [
          "Nghiên cứu trends & thuật toán TikTok.",
          "Sản xuất video (lên ý tưởng, quay dựng).",
          "Phân tích hiệu quả & tối ưu hóa nội dung, hashtag."
        ],
        "result": "Đạt được các chỉ số tích cực, phát triển kỹ năng Content Video, biên tập, nắm bắt xu hướng social."
      }
    ]
  }
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/vi/common.json`

#### Nội dung file

```json
{
  "navbar": {
    "about": "Câu chuyện của mình",
    "resume": "Hành trình của mình",
    "portfolio": "Dự án tâm đắc",
    "downloadCV": "Tải CV giấy",
    "name": "Trương Nguyễn\nKhánh Huyền",
    "initials": "KH",
    "close": "Đóng"
  },
  "home": {
    "greeting": "Xin chào bạn,",
    "introduction": "Mình là Khánh Huyền",
    "name": "Khánh Huyền.",
    "subheading": "Một người kể chuyện bằng",
    "description": "Với mình, marketing không chỉ là những con số, mà là nghệ thuật kể nên những câu chuyện chạm đến cảm xúc, xây dựng những kết nối chân thành và tạo ra giá trị bền vững cho thương hiệu. Cùng mình khám phá nhé!",
    "cta": "Xem các dự án của mình",
    "wordRotate": [
      "Sự Sáng Tạo",
      "Dữ Liệu",
      "Sự Thấu Cảm"
    ]
  },
  "projectDetail": {
    "backToProjects": "Quay lại trang dự án",
    "projectNotFound": "Ối, không tìm thấy dự án rồi!",
    "projectNotFoundMessage": "Có vẻ như dự án bạn tìm không có ở đây. Mời bạn quay lại và khám phá những câu chuyện khác nhé."
  }
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/vi/portfolio.json`

#### Nội dung file

```json
{
  "pageTitle": "Nơi những ý tưởng được hiện thực hóa",
  "exploreProject": "Xem chi tiết dự án",
  "noProjectsFound": "Hiện chưa có dự án nào trong danh mục này.",
  "categories": [
    { "name": "Tất cả", "slug": "all" },
    { "name": "Sáng tạo Nội dung & Kể chuyện", "slug": "content" },
    { "name": "Nghiên cứu & Chiến lược", "slug": "strategy" },
    { "name": "Thực thi Kênh Digital", "slug": "digital" }
  ],
  "projects": [
    {
      "slug": "case-study-tiktok-the-marketing-brew",
      "name": "Case Study: Kênh TikTok \"The Marketing Brew\"",
      "designation": "Sáng tạo & Tăng trưởng Kênh",
      "categorySlug": "content",
      "quote": "Mình tin rằng kiến thức sẽ thú vị hơn khi được kể bằng hình ảnh. Đây là hành trình mình biến những trang sách marketing khô khan thành những video ngắn sống động.",
      "src": "/images/project-3.jpg",
      "heroImage": "/images/project-tiktok-hero.jpg",
      "overview": "Một case study chi tiết về quá trình mình tự xây dựng một kênh TikTok cá nhân về chủ đề Marketing. Dự án thể hiện khả năng từ lên chiến lược, sản xuất nội dung video, cho đến phân tích hiệu quả để tối ưu và tăng trưởng kênh.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Cá nhân" },
        { "label": "Vai trò của mình", "value": "Lên ý tưởng, Sản xuất, Phân tích" },
        { "label": "Công cụ", "value": "Capcut, Canva, TikTok Analytics" },
        { "label": "Kết quả nổi bật", "value": "Video đạt 10,000+ views" }
      ],
      "content": "### Bài toán mình tự đặt ra\n\nLà một sinh viên Marketing, mình nhận thấy nhiều kiến thức chuyên ngành khá khô khan và khó tiếp cận với các bạn mới. Mình tự hỏi: \"Làm thế nào để biến những lý thuyết phức tạp thành nội dung dễ hiểu, gần gũi và thu hút trên nền tảng TikTok?\" Kênh \"The Marketing Brew\" ra đời để trả lời câu hỏi đó.\n\n### Cách mình giải bài toán\n\nHành trình của mình đi qua 3 giai đoạn chính:\n\n**1. Giai đoạn 1: Lên chiến lược nội dung**\n\n*   **Đối tượng:** Các bạn sinh viên ngành Marketing, Kinh tế hoặc những ai tò mò về ngành.\n*   **Trụ cột nội dung:** Mình xác định 3 mảng nội dung chính để kênh không bị một màu:\n    *   `Giải mã thuật ngữ:` Các video ngắn giải thích các khái niệm như 'Insight', 'SWOT', 'Brand Positioning'...\n    *   `Case study mini:` Phân tích nhanh các chiến dịch marketing nổi bật trong 1 phút.\n    *   `Tips & Tricks:` Chia sẻ các mẹo học tập, công cụ hữu ích cho dân Marketing.\n\n**2. Giai đoạn 2: Sản xuất & Sáng tạo**\n\nToàn bộ video được mình thực hiện với quy trình đơn giản: Lên kịch bản -> Tự quay bằng điện thoại -> Dựng và thêm hiệu ứng bằng Capcut -> Thiết kế ảnh bìa bằng Canva. Mình tập trung vào việc giữ nhịp điệu video nhanh, phụ đề rõ ràng và âm nhạc hợp xu hướng.\n\n<img src=\"/images/tiktok-video-1.jpg\" alt=\"Ví dụ video phân tích case study\">\n*Giao diện một video phân tích case study trên kênh của mình.*\n\n**3. Giai đoạn 3: Phân tích & Rút kinh nghiệm**\n\nĐây là giai đoạn quan trọng nhất. Sau mỗi video, mình đều theo dõi các chỉ số trên TikTok Analytics. Mình nhận ra rằng:\n\n*   Các video dạng \"listicle\" (VD: '3 sai lầm khi...') có tỷ lệ xem lại cao hơn.\n*   Việc trả lời bình luận của người xem bằng video giúp tăng tương tác đáng kể.\n*   Thời điểm đăng bài vào khung giờ 19h-21h tối có hiệu quả tốt nhất với tệp khán giả của mình.\n\nNhờ quá trình tối ưu liên tục, một video của mình đã may mắn đạt hơn 10,000 views, giúp kênh có những followers đầu tiên chất lượng."
    },
    {
      "slug": "campaign-the-coffee-house-an-yen",
      "name": "\"Một Chút An Yên\" - Chiến dịch Content cho The Coffee House",
      "designation": "Sáng tạo Nội dung Thương hiệu (Giả lập)",
      "categorySlug": "content",
      "quote": "Làm sao để thương hiệu không chỉ bán sản phẩm, mà còn trở thành một người bạn đồng hành? Mình đã thử trả lời câu hỏi này qua một chiến dịch giả lập cho The Coffee House.",
      "src": "/images/project-4.jpg",
      "heroImage": "/images/project-tch-hero.jpg",
      "overview": "Một dự án giả lập mình thực hiện để thể hiện khả năng lên ý tưởng và sản xuất nội dung cho một thương hiệu lớn. Mục tiêu là giúp The Coffee House tăng cường kết nối cảm xúc với đối tượng khách hàng Gen Z thông qua một chiến dịch nội dung ý nghĩa.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Giả lập" },
        { "label": "Thương hiệu", "value": "The Coffee House" },
        { "label": "Mục tiêu", "value": "Tăng kết nối cảm xúc với Gen Z" },
        { "label": "Kênh", "value": "Instagram, Facebook" }
      ],
      "content": "### Bối cảnh & Ý tưởng lớn\n\nGen Z, đối tượng khách hàng chính của The Coffee House, thường xuyên đối mặt với áp lực học tập và công việc. Họ tìm kiếm những không gian và khoảnh khắc 'chữa lành' (healing).\n\n**Ý tưởng lớn:** The Coffee House không chỉ bán cà phê, mà còn mang đến **\"Một Chút An Yên\"** - một không gian, một khoảnh khắc để bạn sống chậm lại, kết nối với bản thân giữa những bộn bề.\n\n### Sản phẩm thực thi\n\nMình đã phác thảo một số nội dung chính cho chiến dịch này:\n\n**1. Visual & Thiết kế Post (Thực hiện bằng Canva)**\n\nSử dụng tone màu ấm, dịu mắt, font chữ viết tay mềm mại. Hình ảnh tập trung vào những góc nhỏ yên tĩnh của quán, những khoảnh khắc trầm tư bên ly cà phê, thay vì chỉ chụp sản phẩm.\n\n<img src=\"/images/tch-post-1.jpg\" alt=\"Thiết kế post 1 cho The Coffee House\">\n*Mẫu thiết kế post cho chiến dịch, tập trung vào cảm xúc và không gian.*\n\n**2. Copywriting & Giọng văn**\n\nGiọng văn đồng cảm, chia sẻ như một người bạn. Nội dung không kêu gọi mua hàng mà khơi gợi sự suy ngẫm.\n\n*   **Sample Post 1:**\n    *   *Visual:* Một góc quán có ánh nắng chiếu vào.\n    *   *Caption:* \"Đôi khi chúng ta chỉ cần một góc nhỏ quen thuộc, một bản nhạc không lời và một ly cà phê đủ đậm. Để cho phép mình được nghỉ ngơi một chút thôi. #MotChutAnYen #TheCoffeeHouse\"\n*   **Sample Post 2:**\n    *   *Visual:* Close-up một bàn tay đang viết nhật ký.\n    *   *Caption:* \"Gửi những ý nghĩ còn ngổn ngang vào trang giấy. Gửi những mệt nhoài tan vào vị đắng cà phê. Hôm nay bạn thế nào? #Healing #TheCoffeeHouse\"\n\n**3. Ý tưởng Instagram Story**\n\nTạo chuỗi Story tương tác để tăng kết nối:\n\n*   **Poll:** \"Góc 'an yên' của bạn hôm nay là...?\" (A: Một cuốn sách hay / B: Một playlist mới)\n*   **Q&A:** \"Chia sẻ với Nhà một bản nhạc bạn hay nghe để 'sạc pin' tâm hồn nhé!\"\n*   **Quiz:** \"Đoán tên món nước phù hợp với tâm trạng của bạn.\""
    },
    {
      "slug": "imc-plan-danh-thuc-ban-sac-viet",
      "name": "Kế hoạch IMC: \"Đánh thức Bản sắc Việt\"",
      "designation": "Hoạch định Chiến lược Marketing Tích hợp",
      "categorySlug": "strategy",
      "quote": "Một chiến lược tốt giống như một tấm bản đồ, giúp mọi hoạt động marketing đi cùng một hướng. Dự án này là lần đầu mình được tự tay vẽ nên tấm bản đồ đó.",
      "src": "/images/project-1.jpg",
      "heroImage": "/images/project-imc-hero.jpg",
      "overview": "Đây là dự án môn học được mình đầu tư nhiều tâm sức, trong đó mình xây dựng một kế hoạch Truyền thông Marketing Tích hợp (IMC) hoàn chỉnh cho một thương hiệu giả định. Dự án thể hiện khả năng phân tích, tư duy chiến lược và cách kết hợp các công cụ marketing một cách logic.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Môn học" },
        { "label": "Vai trò của mình", "value": "Hoạch định Chiến lược" },
        { "label": "Kỹ năng thể hiện", "value": "Phân tích, Lập kế hoạch, Tư duy IMC" },
        { "label": "Điểm số", "value": "A+" }
      ],
      "content": "### Thách thức của thương hiệu\n\nMột thương hiệu thời trang Việt Nam đang gặp khó khăn trong việc tạo sự khác biệt trên thị trường, vốn đã bão hòa bởi các thương hiệu trong nước và quốc tế. Bài toán đặt ra là làm thế nào để thương hiệu này tìm được tiếng nói riêng và kết nối với người trẻ yêu văn hóa Việt.\n\n### Luồng tư duy chiến lược của mình\n\nMình đã tiếp cận bài toán theo một quy trình 4 bước:\n\n1.  **Phân tích 3C (Company - Customer - Competitor):**\n    *   **Company:** Nhận diện điểm mạnh cốt lõi là chất liệu truyền thống.\n    *   **Customer:** Vẽ chân dung khách hàng mục tiêu - những người trẻ tự hào về văn hóa Việt nhưng cần những thiết kế hiện đại.\n    *   **Competitor:** Phân tích các đối thủ cạnh tranh và chỉ ra \"khoảng trống\" thị trường.\n\n2.  **Tìm kiếm 'Sự thật Ngầm hiểu' (Insight):**\n    *   Mình phát hiện ra insight: *\"Người trẻ Việt muốn thể hiện bản sắc văn hóa của mình, nhưng họ sợ bị coi là 'cũ kỹ' hoặc 'sến'.\"*\n\n3.  **Xây dựng 'Ý tưởng Lớn' (Big Idea):**\n    *   Từ insight trên, mình xây dựng Big Idea: **\"Đánh thức Bản sắc Việt trong từng chuyển động hiện đại.\"**\n\n4.  **Kế hoạch thực thi đa kênh:**\n    *   **Social Media:** Ra mắt bộ ảnh lookbook kết hợp giữa trang phục và các bối cảnh kiến trúc Việt Nam đương đại.\n    *   **PR & Influencer:** Hợp tác với các KOLs trong lĩnh vực văn hóa, nghệ thuật để lan tỏa câu chuyện.\n    *   **Activation:** Tổ chức một workshop nhỏ về cách phối đồ hiện đại với các chất liệu truyền thống.\n\n### Điều mình tâm đắc nhất\n\nDự án này giúp mình hiểu sâu sắc rằng, một chiến dịch marketing thành công không chỉ là những hoạt động riêng lẻ, mà phải là một bản giao hưởng được phối hợp nhịp nhàng từ một ý tưởng lớn duy nhất."
    },
    {
      "slug": "cx-analysis-coolmate",
      "name": "Phân tích Trải nghiệm Khách hàng (CX) cho Coolmate",
      "designation": "Nghiên cứu & Tối ưu Trải nghiệm Người dùng",
      "categorySlug": "strategy",
      "quote": "Mỗi cú click chuột đều ẩn chứa một câu chuyện, một cảm xúc của người dùng. Trong dự án này, mình đã thử 'đọc' những câu chuyện đó để tìm cách làm cho hành trình mua sắm trở nên mượt mà hơn.",
      "src": "/images/project-2.jpg",
      "heroImage": "/images/project-coolmate-hero.jpg",
      "overview": "Từ dự án phân tích E-commerce trên lớp, mình đã phát triển sâu hơn thành một bài phân tích trải nghiệm khách hàng (CX) cho website Coolmate. Mình đã vẽ bản đồ hành trình khách hàng, chỉ ra các 'điểm đau' và đề xuất những giải pháp cụ thể để tối ưu hóa.",
      "details": [
        { "label": "Bối cảnh", "value": "Phát triển từ Dự án Môn học" },
        { "label": "Thương hiệu", "value": "Coolmate.me" },
        { "label": "Phương pháp", "value": "Customer Journey Mapping" },
        { "label": "Mục tiêu", "value": "Đề xuất tối ưu Tỷ lệ chuyển đổi" }
      ],
      "content": "### Mục tiêu\n\nĐặt mình vào vị trí một khách hàng của Coolmate, mình muốn tìm ra những điểm có thể khiến người dùng phân vân, khó chịu hoặc từ bỏ giỏ hàng trong quá trình mua sắm, từ đó đề xuất các giải pháp cải thiện.\n\n### Bản đồ Hành trình Khách hàng (Customer Journey Map)\n\nMình đã xây dựng một chân dung khách hàng giả định (Nam, 22 tuổi, sinh viên) và đi theo hành trình của bạn ấy:\n\n*   **Giai đoạn 1: Nhận thức (Awareness)**\n    *   *Hành động:* Thấy quảng cáo Coolmate trên Facebook.\n    *   *Điểm chạm tốt:* Quảng cáo sáng tạo, thông điệp rõ ràng.\n\n*   **Giai đoạn 2: Cân nhắc (Consideration)**\n    *   *Hành động:* Click vào website, tìm kiếm sản phẩm áo thun.\n    *   *Điểm chạm tốt:* Bộ lọc sản phẩm chi tiết, hình ảnh sản phẩm chất lượng cao.\n    *   **Điểm đau (Pain Point):** Thông tin về chính sách đổi trả 60 ngày chưa thực sự nổi bật ở trang sản phẩm.\n\n*   **Giai đoạn 3: Mua hàng (Purchase)**\n    *   *Hành động:* Thêm vào giỏ hàng và tiến hành thanh toán.\n    *   *Điểm chạm tốt:* Giao diện giỏ hàng đơn giản.\n    *   **Điểm đau (Pain Point):** Form đăng ký tài khoản bắt buộc có hơi nhiều bước, có thể gây nản lòng cho người mua lần đầu.\n\n*   **Giai đoạn 4: Sau mua hàng (Post-Purchase)**\n    *   *Hành động:* Nhận email xác nhận.\n    *   *Điểm chạm tốt:* Email chuyên nghiệp, đầy đủ thông tin.\n\n### Đề xuất của mình\n\nTừ những 'điểm đau' đã chỉ ra, mình đề xuất 3 giải pháp:\n\n1.  **Tối ưu trang sản phẩm:** Thêm một banner nhỏ hoặc icon nổi bật ngay gần nút \"Thêm vào giỏ hàng\" để nhấn mạnh chính sách \"Đổi trả miễn phí 60 ngày\".\n2.  **Tối ưu quy trình thanh toán:** Cho phép người dùng thanh toán với tư cách \"khách\" (guest checkout) mà không cần tạo tài khoản, hoặc tích hợp đăng nhập nhanh qua Google/Facebook.\n3.  **Tăng cường niềm tin:** Thêm mục đánh giá của khách hàng ngay trên trang sản phẩm để người mua mới có thêm cơ sở ra quyết định."
    },
    {
      "slug": "meta-ads-workshop-marketing-101",
      "name": "Chiến dịch Meta Ads cho Workshop \"Marketing 101\"",
      "designation": "Thực thi Quảng cáo Digital (Giả lập)",
      "categorySlug": "digital",
      "quote": "Làm thế nào để thông điệp của bạn đến đúng người cần nghe nhất với chi phí tối ưu? Dự án này là bài thực hành của mình về nghệ thuật quảng cáo trên nền tảng Meta.",
      "src": "/images/project-1.jpg",
      "heroImage": "/images/project-meta-ads-hero.jpg",
      "overview": "Một dự án giả lập chi tiết về việc thiết kế một chiến dịch quảng cáo trên Meta (Facebook & Instagram) để quảng bá cho một workshop marketing hư cấu. Dự án bao gồm từ việc xác định đối tượng, thiết kế mẫu quảng cáo, viết nội dung cho đến việc phác thảo một phễu chuyển đổi đơn giản.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Giả lập" },
        { "label": "Nền tảng", "value": "Meta (Facebook & Instagram)" },
        { "label": "Mục tiêu", "value": "Thu hút 100 lượt đăng ký workshop" },
        { "label": "Ngân sách giả định", "value": "2,000,000 VNĐ" }
      ],
      "content": "### Kế hoạch thực thi\n\nVới mục tiêu thu hút 100 sinh viên đăng ký workshop \"Marketing 101 for Students\", mình đã phác thảo một kế hoạch quảng cáo như sau:\n\n**1. Nhắm chọn Đối tượng (Targeting)**\n\nMình sẽ tạo một tệp đối tượng chi tiết trên Meta Ads Manager:\n\n*   **Vị trí:** TP. Hồ Chí Minh, Hà Nội.\n*   **Tuổi:** 18 - 22.\n*   **Nhân khẩu học:** Đang là sinh viên đại học.\n*   **Sở thích:** Marketing, Brands Vietnam, Advertising Vietnam, Philip Kotler, Digital Marketing, Content Marketing.\n\n**2. Mẫu Quảng cáo (Ad Creative)**\n\nMình thiết kế 2 định dạng để A/B testing:\n\n*   **Định dạng Ảnh (dùng Canva):** Một thiết kế dạng poster, cung cấp đầy đủ thông tin chính (Diễn giả, Thời gian, Địa điểm, Lợi ích chính) một cách bắt mắt.\n*   **Định dạng Video ngắn (dùng Capcut):** Một video 15 giây với hiệu ứng chữ sinh động, nêu bật 3 lý do không thể bỏ lỡ workshop, kèm nhạc nền sôi động.\n\n<img src=\"/images/meta-ads-creative.jpg\" alt=\"Mẫu quảng cáo cho workshop\">\n*Mẫu quảng cáo dạng ảnh mình thiết kế.*\n\n**3. Nội dung Quảng cáo (Ad Copy)**\n\nMình cũng viết 2 phiên bản nội dung để thử nghiệm:\n\n*   **Bản 1 (Tập trung vào Lợi ích):** \"CV trống trơn? Mông lung về ngành Marketing? Workshop 'Marketing 101' sẽ giúp bạn xây dựng nền tảng vững chắc và định hướng sự nghiệp ngay từ năm nhất! Tìm hiểu ngay...\"\n*   **Bản 2 (Tạo sự Khan hiếm):** \"CHỈ CÒN 20 SUẤT ƯU ĐÃI EARLY BIRD! Nhanh tay đăng ký workshop 'Marketing 101' để gặp gỡ diễn giả đầu ngành và nhận trọn bộ tài liệu độc quyền. Đăng ký ngay trước khi hết vé!\"\n\n**4. Phễu Chuyển đổi**\n\nLuồng người dùng sẽ đi như sau: Thấy Quảng cáo trên Facebook/Instagram -> Click vào link -> Dẫn đến Landing Page (chứa thông tin chi tiết và form đăng ký) -> Điền form -> Nhận email xác nhận vé thành công."
    },
    {
      "slug": "influencer-marketing-cocoon",
      "name": "Kế hoạch Hợp tác Influencer cho Cocoon",
      "designation": "Thực thi Influencer Marketing (Giả lập)",
      "categorySlug": "digital",
      "quote": "Chọn đúng người kể chuyện cũng quan trọng như việc có một câu chuyện hay. Đây là cách mình tìm kiếm những 'người kể chuyện' phù hợp cho một thương hiệu thuần chay như Cocoon.",
      "src": "/images/project-2.jpg",
      "heroImage": "/images/project-cocoon-hero.jpg",
      "overview": "Một dự án giả lập về việc xây dựng kế hoạch Influencer Marketing cho Cocoon nhân dịp ra mắt dòng sản phẩm mới. Dự án thể hiện sự nhạy bén với thị trường KOC/KOL tại Việt Nam, khả năng phân tích và lựa chọn influencer phù hợp, cũng như kỹ năng soạn thảo một bản brief chuyên nghiệp.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Giả lập" },
        { "label": "Thương hiệu", "value": "Cocoon Vietnam" },
        { "label": "Mục tiêu", "value": "Tăng nhận diện & dùng thử sản phẩm mới" },
        { "label": "Nền tảng", "value": "TikTok, Instagram, YouTube" }
      ],
      "content": "### Bài toán\n\nCocoon sắp ra mắt dòng sản phẩm mới chiết xuất từ hoa đậu biếc, hướng tới công dụng chống lão hóa. Làm thế nào để lan tỏa thông tin và tạo niềm tin cho người dùng một cách tự nhiên và hiệu quả nhất?\n\n### Chiến lược Influencer của mình\n\nMình đề xuất một chiến lược kết hợp 3 nhóm Influencer để tạo hiệu ứng đa tầng:\n\n**1. Phân loại & Lựa chọn Influencer**\n\n*   **Nhóm 1: Beauty Blogger (Macro-influencer):**\n    *   *Mục đích:* Tạo độ phủ và uy tín cho sản phẩm.\n    *   *Ví dụ đề xuất:* **Trinh Phạm, Primmy Trương.**\n    *   *Lý do:* Có chuyên môn sâu về mỹ phẩm, tệp người theo dõi lớn và tin tưởng vào các đánh giá của họ.\n*   **Nhóm 2: Lifestyle Vlogger (Mid-tier influencer):**\n    *   *Mục đích:* Đưa sản phẩm vào bối cảnh đời sống hàng ngày, tăng tính gần gũi.\n    *   *Ví dụ đề xuất:* **Helly Tống, Hana's Lexis.**\n    *   *Lý do:* Theo đuổi lối sống xanh, bền vững, rất phù hợp với giá trị cốt lõi của Cocoon.\n*   **Nhóm 3: KOCs trên TikTok (Micro-influencer):**\n    *   *Mục đích:* Thúc đẩy quyết định mua hàng thông qua các review chân thật, không tô vẽ.\n    *   *Ví dụ đề xuất:* **Call Me Duy, Bác sĩ da liễu Hoa Cúc.**\n    *   *Lý do:* Các video review ngắn, thẳng thắn của họ có tỉ lệ chuyển đổi rất cao.\n\n**2. Bản Brief Mẫu gửi cho Influencer**\n\nĐể đảm bảo các influencer truyền tải đúng thông điệp, mình đã soạn một bản brief mẫu với các nội dung chính:\n\n*   **Về chiến dịch:** Giới thiệu dòng sản phẩm mới và thông điệp chính: \"Gìn giữ nét thanh xuân từ thiên nhiên Việt Nam\".\n*   **Yêu cầu về nội dung:**\n    *   **Bắt buộc (Mandatory):** Quay cảnh unbox sản phẩm, quay cận cảnh chất kem/serum, chia sẻ cảm nhận sau 7 ngày sử dụng.\n    *   **Thông điệp cần nhấn mạnh:** Thành phần 100% thuần chay, không thử nghiệm trên động vật, hiệu quả chống oxy hóa từ hoa đậu biếc.\n    *   **Hashtag chiến dịch:** #Cocoon #DauBiecThanhXuan #MyPhamThuanChay\n*   **Những điều cần tránh (Do's & Don'ts):**\n    *   **Don't:** So sánh trực tiếp với sản phẩm của đối thủ, cam kết hiệu quả 100% sau 1 lần dùng.\n    *   **Do:** Chia sẻ câu chuyện và trải nghiệm cá nhân một cách chân thực.\n*   **Thời gian & Quyền lợi:** Nêu rõ deadline đăng bài và các quyền lợi đi kèm."
    }
  ]
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/vi/resume.json`

#### Nội dung file

```json
{
  "scanMessage": "Quét để xem Portfolio!",
  "header": {
    "firstName": "Khánh Huyền",
    "lastName": "Trương Nguyễn",
    "position": "Thực tập sinh Marketing"
  },
  "contact": {
    "birthYear": "1999",
    "phone": "(+84) 976 8888 09",
    "email": "huyentnk1504@gmail.com",
    "address": "Quận 2, Tp. Hồ Chí Minh",
    "portfolio": "huyentnk.com"
  },
  "heading": {
    "aboutMe": "Giới thiệu",
    "skills": "Kỹ năng",
    "languages": "Ngoại ngữ",
    "tools": "Công cụ",
    "education": "Học vấn",
    "projects": "Dự án",
    "certifications": "Chứng chỉ"
  },
  "aboutMe": {
    "summary": "Sinh viên năm 3 ngành Marketing, với thành tích học tập tốt và kiến thức vững chắc về Marketing, có kinh nghiệm thực hành thông qua các dự án học thuật về lập kế hoạch Marketing tích hợp, phân tích đối thủ cạnh tranh và phát triển nội dung. Mong muốn vận dụng kiến thức, kỹ năng và tinh thần chủ động học hỏi vào vị trí Thực tập sinh Marketing để đóng góp vào các chiến dịch tại một agency sáng tạo."
  },
  "languages": {
    "items": [
      {
        "label": "Tiếng Anh",
        "tooltip": "TOEIC 850",
        "level": 4
      },
      {
        "label": "Tiếng Trung",
        "tooltip": "HSK 4",
        "level": 2
      }
    ]
  },
  "tools": {
    "items": [
      {
        "label": "MS Office",
        "level": 5
      },
      {
        "label": "Canva & Capcut",
        "level": 4
      },
      {
        "label": "Adobe CS (PS/AI)",
        "level": 2
      },
      {
        "label": "Google Analytics",
        "level": 1
      }
    ]
  },
  "certifications": {
    "items": [
      "Google Digital Garage",
      "Linkedln Marketing Labs",
      "Hubspot Inbound Marketing"
    ]
  },
  "skills": {
    "hardSkills": {
      "title": "Kỹ năng cứng",
      "items": [
        {
          "label": "Sáng tạo Nội dung",
          "level": 90
        },
        {
          "label": "Tiếp thị Mạng xã hội",
          "level": 60
        },
        {
          "label": "Nghiên cứu Thị trường",
          "level": 70
        },
        {
          "label": "Lập kế hoạch Marketing",
          "level": 20
        }
      ]
    },
    "softSkills": {
      "title": "Kỹ năng mềm",
      "items": [
        {
          "label": "Giao tiếp & Trình bày",
          "level": 90
        },
        {
          "label": "Sáng tạo & Đổi mới",
          "level": 50
        },
        {
          "label": "Làm việc nhóm",
          "level": 70
        },
        {
          "label": "Giải quyết Vấn đề",
          "level": 20
        }
      ]
    }
  },
  "educations": {
    "items": [
      {
        "university": "Trường Đại học Mở Thành phố Hồ Chí Minh",
        "major": "Marketing",
        "time": "2022 - Hiện tại",
        "gpa": 3.8,
        "desc": "Các môn học tiêu biểu: Quản trị Thương hiệu (A+, 9.8), Quảng cáo (A+, 9.3), Quản trị Marketing (A+, 9.3), Nghiên cứu Marketing (A+, 9.2)."
      },
      {
        "university": "Trường Đại học Y khoa Phạm Ngọc Thạch",
        "major": "Y đa khoa",
        "time": "2017 - 2021",
        "gpa": null,
        "desc": "Quá trình giúp bản thân rèn luyện tư duy phân tích, sự tỉ mỉ, khả năng chịu áp lực và tinh thần trách nhiệm, trước khi tự xác định lại đam mê và quyết tâm theo đuổi lĩnh vực Marketing."
      }
    ]
  },
  "projects": {
    "resultLabel": "Kết quả đạt được:",
    "items": [
      {
        "in": "Môn học: IMC",
        "name": "Xây dựng Kế hoạch Truyền thông Marketing Tích hợp",
        "desc": [
          "Phân tích đối tượng mục tiêu, thiết lập mục tiêu truyền thông (SMART).",
          "Xây dựng thông điệp chủ đạo & chiến lược phối hợp kênh (Social, Content...).",
          "Đề xuất hoạt động cụ thể, phác thảo ngân sách & timeline."
        ],
        "result": "Hoàn thiện bản kế hoạch IMC logic, thể hiện tư duy chiến lược & kỹ năng lập kế hoạch Marketing."
      },
      {
        "in": "Môn học: E-Commerce",
        "name": "Phân tích Chiến lược Thương mại Điện tử và Đề xuất Tối ưu",
        "desc": [
          "Phân tích sâu mô hình kinh doanh, UX/UI, Digital Marketing (SEO, Social)",
          "Xác định điểm mạnh/yếu, cơ hội dựa trên lý thuyết & phân tích đối thủ.",
          "Xây dựng & trình bày các đề xuất tối ưu hóa khả thi."
        ],
        "result": "Hoàn thành báo cáo phân tích chi tiết, áp dụng hiệu quả lý thuyết E-commerce vào thực tế."
      },
      {
        "in": "Dự án cá nhân",
        "name": "Xây dựng & Phát triển Kênh TikTok Cá nhân về \"Study Vlog\"",
        "desc": [
          "Nghiên cứu trends & thuật toán TikTok.",
          "Sản xuất video (lên ý tưởng, quay dựng).",
          "Phân tích hiệu quả & tối ưu hóa nội dung, hashtag."
        ],
        "result": "Đạt được các chỉ số tích cực, phát triển kỹ năng Content Video, biên tập, nắm bắt xu hướng social."
      }
    ]
  }
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/zh/common.json`

#### Nội dung file

```json
{
  "projectDetail": {
    "backToProjects": "Trở về danh sách dự án",
    "projectNotFound": "Không tìm thấy dự án",
    "projectNotFoundMessage": "Rất tiếc, chúng tôi không thể tìm thấy dự án bạn đang tìm kiếm."
  },
  "navbar": {
    "about": "关于我",
    "resume": "简历",
    "portfolio": "作品集",
    "downloadCV": "下载简历",
    "socials": [
      {
        "name": "Facebook",
        "url": "https://facebook.com"
      },
      {
        "name": "Tiktok",
        "url": "https://tiktok.com"
      }
    ]
  },
  "home": {
    "greeting": "你好！",
    "introduction": "我是 Khánh Huyền",
    "wordRotate": ["市场营销", "内容创作", "策划"]
  },
  "cv": {
    "header": {
      "firstName": "Khanh Huyen",
      "lastName": "Truong Nguyen",
      "position": "市场营销实习生"
    },
    "contact": {
      "birthYear": "1999",
      "phone": "(+84) 976 8888 09",
      "email": "huyentnk1504@gmail.com",
      "address": "胡志明市，第二郡",
      "portfolio": "huyentnk.com"
    },
    "heading": {
      "aboutMe": "个人简介",
      "contact": "联系方式",
      "skills": "专业技能",
      "languages": "语言能力",
      "tools": "工具技能",
      "education": "教育背景",
      "projects": "项目经历",
      "certifications": "所获证书",
      "experience": "工作经历"
    },
    "aboutMe": {
      "summary": "市场营销专业大三在读学生，学习成绩优异，具备扎实的市场营销理论基础。通过整合营销策划、竞争对手分析及内容开发等学术项目，积累了丰富的实践经验。期望能将在校所学的知识技能与积极主动的学习态度应用于市场营销实习生的岗位，为创意机构的营销活动做出贡献。"
    },
    "languages": {
      "items": [
        {
          "label": "英语",
          "tooltip": "托业 850",
          "level": 4
        },
        {
          "label": "中文",
          "tooltip": "HSK 4级",
          "level": 2
        }
      ]
    },
    "tools": {
      "items": [
        {
          "label": "MS Office",
          "level": 5
        },
        {
          "label": "Canva & Capcut",
          "level": 4
        },
        {
          "label": "Adobe CS (PS/AI)",
          "level": 2
        },
        {
          "label": "Google Analytics",
          "level": 1
        }
      ]
    },
    "certifications": {
      "items": [
        "谷歌数字营销认证 (Google Digital Garage)",
        "领英营销实验室 (LinkedIn Marketing Labs)",
        "Hubspot集客式营销认证 (Hubspot Inbound Marketing)"
      ]
    },
    "skills": {
      "hardSkills": {
        "title": "专业硬技能",
        "items": [
          {
            "label": "内容创作",
            "level": 90
          },
          {
            "label": "社交媒体营销",
            "level": 60
          },
          {
            "label": "市场调研",
            "level": 70
          },
          {
            "label": "营销策划",
            "level": 20
          }
        ]
      },
      "softSkills": {
        "title": "综合软技能",
        "items": [
          {
            "label": "沟通与表达",
            "level": 90
          },
          {
            "label": "创新思维",
            "level": 50
          },
          {
            "label": "团队协作",
            "level": 70
          },
          {
            "label": "问题解决能力",
            "level": 20
          }
        ]
      }
    },
    "educations": {
      "items": [
        {
          "university": "胡志明市开放大学",
          "major": "市场营销",
          "time": "2022 - 至今",
          "gpa": 3.8,
          "desc": "主修课程：品牌管理 (A+, 9.8), 广告学 (A+, 9.3), 市场营销管理 (A+, 9.3), 市场调研 (A+, 9.2)。"
        },
        {
          "university": "范玉石医科大学",
          "major": "临床医学",
          "time": "2017 - 2021",
          "gpa": null,
          "desc": "在医学领域的学习经历中，锻炼了本人严谨的分析思维、一丝不苟的工作态度、强大的抗压能力及高度的责任感。此后，基于对市场营销领域的真正热情，决定转型并致力于该方向的发展。"
        }
      ]
    },
    "projects": {
      "resultLabel": "项目成果：",
      "items": [
        {
          "in": "课程项目：整合营销传播 (IMC)",
          "name": "整合营销传播 (IMC) 方案策划",
          "desc": [
            "分析目标受众，设立SMART传播目标。",
            "构建核心信息，制定渠道组合策略 (社交媒体, 内容营销等)。",
            "提出具体活动方案，并规划初步预算与时间表。"
          ],
          "result": "完成了一份逻辑清晰的IMC方案，展现了策略性思维与营销策划能力。"
        },
        {
          "in": "课程项目：电子商务",
          "name": "电子商务战略分析与优化提案",
          "desc": [
            "深入分析商业模式、用户体验(UX/UI)及数字营销活动(SEO, 社交媒体)。",
            "基于理论和竞品分析，识别优劣势与机会点。",
            "制定并展示了可行的优化建议。"
          ],
          "result": "完成一份详细的分析报告，将电子商务理论有效应用于实践。"
        },
        {
          "in": "个人项目",
          "name": "个人TikTok账号“学习Vlog”主题的搭建与运营",
          "desc": [
            "研究TikTok内容趋势与平台算法。",
            "制作视频 (创意构思、拍摄、剪辑)。",
            "分析数据表现并优化内容与标签策略。"
          ],
          "result": "取得了积极的数据指标，提升了视频内容制作、剪辑和洞察社交媒体趋势的技能。"
        }
      ]
    }
  }
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/zh/portfolio.json`

#### Nội dung file

```json
{
  "pageTitle": "Các dự án nổi bật",
  "categories": [
    { "name": "Tất cả Dự án", "slug": "all" },
    { "name": "Chiến lược & Kế hoạch", "slug": "strategy" },
    { "name": "Sáng tạo Nội dung", "slug": "content" },
    { "name": "Phân tích & Nghiên cứu", "slug": "analysis" }
  ],
  "projects": [
    {
      "slug": "the-art-of-communication",
      "name": "Nghệ thuật Truyền thông",
      "designation": "Chiến lược IMC",
      "categorySlug": "strategy",
      "quote": "Xây dựng một kế hoạch IMC toàn diện, bắt đầu từ việc phân tích thị trường mục tiêu và thiết lập các mục tiêu SMART để tối đa hóa phạm vi tiếp cận và tác động.",
      "src": "/images/project-1.jpg",
      "heroImage": "/images/project-1-hero.jpg",
      "overview": "Một kế hoạch IMC toàn diện được thiết kế để nâng cao sự hiện diện của thương hiệu và thu hút thế hệ người tiêu dùng mới thông qua cách kể chuyện đa kênh, có chiến lược.",
      "details": [
        { "label": "Khách hàng", "value": "Dự án Môn học" },
        { "label": "Vai trò", "value": "Chuyên viên Chiến lược, Lập kế hoạch Nội dung" },
        { "label": "Thời gian", "value": "4 Tuần" },
        { "label": "Năm", "value": "2023" }
      ],
      "content": "<h3>Thách thức</h3><p>Thách thức chính là tạo ra một kế hoạch Truyền thông Marketing Tích hợp từ đầu. Điều này bao gồm nghiên cứu thị trường sâu rộng, xác định một định vị giá trị độc đáo, và tạo ra một thông điệp gây tiếng vang trên các nền tảng đa dạng trong khi vẫn duy trì một tiếng nói thương hiệu nhất quán.</p><img src=\"/images/project-1-content-1.jpg\" alt=\"Phân tích nghiên cứu thị trường\" /><h3>Tiếp cận & Giải pháp</h3><p>Quy trình của tôi bắt đầu bằng việc phân tích kỹ lưỡng đối tượng mục tiêu và đối thủ cạnh tranh. Tôi đã sử dụng mô hình SMART để đặt ra các mục tiêu rõ ràng, có thể đo lường được. Cốt lõi của giải pháp là một chiến lược tập trung vào nội dung, ưu tiên cách kể chuyện chân thực hơn là bán hàng cứng nhắc.</p><ul><li><strong>Chiến lược Kênh:</strong> Lựa chọn sự kết hợp giữa mạng xã hội (Instagram, TikTok) và marketing nội dung (blog) để tối đa hóa phạm vi tiếp cận.</li><li><strong>Thông điệp Chính:</strong> Phát triển một thông điệp chủ đạo nhất quán tập trung vào sự trao quyền và sáng tạo.</li><li><strong>Thực thi:</strong> Vạch ra các ý tưởng hoạt động cụ thể, lịch nội dung và đề xuất ngân sách theo từng giai đoạn.</li></ul><h3>Kết quả</h3><p>Kế hoạch IMC cuối cùng là một lộ trình logic, chi tiết và khả thi. Nó đã nhận được điểm A+ và được khen ngợi về chiều sâu chiến lược và sự sáng tạo trong thực thi. Dự án này đã mài giũa kỹ năng của tôi về tư duy chiến lược, phân tích thị trường và lập kế hoạch marketing toàn diện.</p>"
    },
    {
      "slug": "digital-storefront",
      "name": "Cửa hàng Số",
      "designation": "Phân tích E-commerce",
      "categorySlug": "analysis",
      "quote": "Thực hiện phân tích sâu về mô hình kinh doanh, trải nghiệm người dùng và các hoạt động marketing số để xác định các cơ hội tối ưu hóa quan trọng.",
      "src": "/images/project-2.jpg",
      "heroImage": "/images/project-2-hero.jpg",
      "overview": "Một phân tích sâu về chiến lược của một nền tảng thương mại điện tử, xác định điểm mạnh, điểm yếu và các đề xuất có thể hành động để cải thiện tỷ lệ chuyển đổi và trải nghiệm người dùng.",
      "details": [
        { "label": "Đối tượng", "value": "Nền tảng E-commerce" },
        { "label": "Vai trò", "value": "Chuyên viên Phân tích, Nghiên cứu UX" },
        { "label": "Thời gian", "value": "3 Tuần" },
        { "label": "Năm", "value": "2023" }
      ],
      "content": "<h3>Mục tiêu</h3><p>Mục tiêu là áp dụng lý thuyết thương mại điện tử vào một trường hợp thực tế, phân tích mô hình kinh doanh, UX/UI và các nỗ lực marketing số để đề xuất các cải tiến hữu hình.</p><img src=\"/images/project-2-content-1.jpg\" alt=\"Phân tích UX/UI\" /><h3>Phương pháp luận</h3><p>Tôi đã tiến hành đánh giá heuristic về hành trình của người dùng, từ trang đích đến trang thanh toán. Điều này được bổ sung bằng một phân tích cạnh tranh để so sánh với các công ty hàng đầu trong ngành. Các lĩnh vực trọng tâm bao gồm điều hướng trang web, khám phá sản phẩm và khả năng đáp ứng trên thiết bị di động.</p><h3>Phát hiện & Đề xuất</h3><p>Phân tích đã tiết lộ một số điểm ma sát trong quy trình thanh toán và cơ hội để tăng cường SEO. Các đề xuất của tôi bao gồm việc tinh giản luồng thanh toán, tối ưu hóa mô tả sản phẩm với các từ khóa liên quan và triển khai một menu điều hướng di động trực quan hơn.</p>"
    }
  ]
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/zh/resume.json`

#### Nội dung file

```json
{
  "scanMessage": "Quét để xem Portfolio!",
  "header": {
    "firstName": "Khánh Huyền",
    "lastName": "Trương Nguyễn",
    "position": "Thực tập sinh Marketing"
  },
  "contact": {
    "birthYear": "1999",
    "phone": "(+84) 976 8888 09",
    "email": "huyentnk1504@gmail.com",
    "address": "Quận 2, Tp. Hồ Chí Minh",
    "portfolio": "huyentnk.com"
  },
  "heading": {
    "aboutMe": "Giới thiệu",
    "skills": "Kỹ năng",
    "languages": "Ngoại ngữ",
    "tools": "Công cụ",
    "education": "Học vấn",
    "projects": "Dự án",
    "certifications": "Chứng chỉ"
  },
  "aboutMe": {
    "summary": "Sinh viên năm 3 ngành Marketing, với thành tích học tập tốt và kiến thức vững chắc về Marketing, có kinh nghiệm thực hành thông qua các dự án học thuật về lập kế hoạch Marketing tích hợp, phân tích đối thủ cạnh tranh và phát triển nội dung. Mong muốn vận dụng kiến thức, kỹ năng và tinh thần chủ động học hỏi vào vị trí Thực tập sinh Marketing để đóng góp vào các chiến dịch tại một agency sáng tạo."
  },
  "languages": {
    "items": [
      {
        "label": "Tiếng Anh",
        "tooltip": "TOEIC 850",
        "level": 4
      },
      {
        "label": "Tiếng Trung",
        "tooltip": "HSK 4",
        "level": 2
      }
    ]
  },
  "tools": {
    "items": [
      {
        "label": "MS Office",
        "level": 5
      },
      {
        "label": "Canva & Capcut",
        "level": 4
      },
      {
        "label": "Adobe CS (PS/AI)",
        "level": 2
      },
      {
        "label": "Google Analytics",
        "level": 1
      }
    ]
  },
  "certifications": {
    "items": [
      "Google Digital Garage",
      "Linkedln Marketing Labs",
      "Hubspot Inbound Marketing"
    ]
  },
  "skills": {
    "hardSkills": {
      "title": "Kỹ năng cứng",
      "items": [
        {
          "label": "Sáng tạo Nội dung",
          "level": 90
        },
        {
          "label": "Tiếp thị Mạng xã hội",
          "level": 60
        },
        {
          "label": "Nghiên cứu Thị trường",
          "level": 70
        },
        {
          "label": "Lập kế hoạch Marketing",
          "level": 20
        }
      ]
    },
    "softSkills": {
      "title": "Kỹ năng mềm",
      "items": [
        {
          "label": "Giao tiếp & Trình bày",
          "level": 90
        },
        {
          "label": "Sáng tạo & Đổi mới",
          "level": 50
        },
        {
          "label": "Làm việc nhóm",
          "level": 70
        },
        {
          "label": "Giải quyết Vấn đề",
          "level": 20
        }
      ]
    }
  },
  "educations": {
    "items": [
      {
        "university": "Trường Đại học Mở Thành phố Hồ Chí Minh",
        "major": "Marketing",
        "time": "2022 - Hiện tại",
        "gpa": 3.8,
        "desc": "Các môn học tiêu biểu: Quản trị Thương hiệu (A+, 9.8), Quảng cáo (A+, 9.3), Quản trị Marketing (A+, 9.3), Nghiên cứu Marketing (A+, 9.2)."
      },
      {
        "university": "Trường Đại học Y khoa Phạm Ngọc Thạch",
        "major": "Y đa khoa",
        "time": "2017 - 2021",
        "gpa": null,
        "desc": "Quá trình giúp bản thân rèn luyện tư duy phân tích, sự tỉ mỉ, khả năng chịu áp lực và tinh thần trách nhiệm, trước khi tự xác định lại đam mê và quyết tâm theo đuổi lĩnh vực Marketing."
      }
    ]
  },
  "projects": {
    "resultLabel": "Kết quả đạt được:",
    "items": [
      {
        "in": "Môn học: IMC",
        "name": "Xây dựng Kế hoạch Truyền thông Marketing Tích hợp",
        "desc": [
          "Phân tích đối tượng mục tiêu, thiết lập mục tiêu truyền thông (SMART).",
          "Xây dựng thông điệp chủ đạo & chiến lược phối hợp kênh (Social, Content...).",
          "Đề xuất hoạt động cụ thể, phác thảo ngân sách & timeline."
        ],
        "result": "Hoàn thiện bản kế hoạch IMC logic, thể hiện tư duy chiến lược & kỹ năng lập kế hoạch Marketing."
      },
      {
        "in": "Môn học: E-Commerce",
        "name": "Phân tích Chiến lược Thương mại Điện tử và Đề xuất Tối ưu",
        "desc": [
          "Phân tích sâu mô hình kinh doanh, UX/UI, Digital Marketing (SEO, Social)",
          "Xác định điểm mạnh/yếu, cơ hội dựa trên lý thuyết & phân tích đối thủ.",
          "Xây dựng & trình bày các đề xuất tối ưu hóa khả thi."
        ],
        "result": "Hoàn thành báo cáo phân tích chi tiết, áp dụng hiệu quả lý thuyết E-commerce vào thực tế."
      },
      {
        "in": "Dự án cá nhân",
        "name": "Xây dựng & Phát triển Kênh TikTok Cá nhân về \"Study Vlog\"",
        "desc": [
          "Nghiên cứu trends & thuật toán TikTok.",
          "Sản xuất video (lên ý tưởng, quay dựng).",
          "Phân tích hiệu quả & tối ưu hóa nội dung, hashtag."
        ],
        "result": "Đạt được các chỉ số tích cực, phát triển kỹ năng Content Video, biên tập, nắm bắt xu hướng social."
      }
    ]
  }
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/main.tsx`

#### Nội dung file

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { PrintableCV } from "@/pages/PrintableCV.tsx";
import { Home } from "@/pages/Home.tsx";
import { Portfolio } from "@/pages/Portfolio.tsx";
import "./i18n.ts";
import { WebCV } from "@/pages/WebCV.tsx";
import { ProjectDetail } from "@/pages/ProjectDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "cv",
        element: <WebCV />,
      },
      {
        path: "portfolio/:slug",
        element: <ProjectDetail />,
      },
    ],
  },
  {
    path: "printable-cv",
    element: <PrintableCV />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

```

#### Mối quan hệ

*   **Imports:**
    *   `src/index.css`
    *   `src/layouts/MainLayout.tsx`
    *   `src/components/common/Navbar.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/ui/magnetize-button.tsx`
    *   `src/components/ui/button.tsx`
    *   `src/components/ui/sheet.tsx`
    *   `src/pages/PrintableCV.tsx`
    *   `src/features/resume/Header.tsx`
    *   `src/hooks/useResumeData.ts`
    *   `src/features/resume/Contact.tsx`
    *   `src/features/resume/Skills.tsx`
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/components/ui/progress.tsx`
    *   `src/features/resume/Educations.tsx`
    *   `src/features/resume/AboutMe.tsx`
    *   `src/features/resume/Avatar.tsx`
    *   `src/features/resume/Languages.tsx`
    *   `src/features/resume/components/LevelDots.tsx`
    *   `src/features/resume/Projects.tsx`
    *   `src/features/resume/Certifications.tsx`
    *   `src/features/resume/Tools.tsx`
    *   `src/pages/Home.tsx`
    *   `src/components/common/Container.tsx`
    *   `src/components/magicui/word-rotate.tsx`
    *   `src/pages/Portfolio.tsx`
    *   `src/components/common/ProjectCarousel.tsx`
    *   `src/types/project.ts`
    *   `src/i18n.ts`
    *   `src/locales/vi/common.json`
    *   `src/locales/vi/portfolio.json`
    *   `src/locales/vi/resume.json`
    *   `src/locales/en/common.json`
    *   `src/locales/en/portfolio.json`
    *   `src/locales/en/resume.json`
    *   `src/locales/zh/common.json`
    *   `src/locales/zh/portfolio.json`
    *   `src/locales/zh/resume.json`
    *   `src/pages/WebCV.tsx`
    *   `src/pages/ProjectDetail.tsx`

---

### Phân tích file: `src/pages/Home.tsx`

#### Nội dung file

```tsx
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

```

#### Mối quan hệ

*   **Imports:**
    *   `src/components/common/Container.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/magicui/word-rotate.tsx`
    *   `src/components/ui/button.tsx`

---

### Phân tích file: `src/pages/Portfolio.tsx`

#### Nội dung file

```tsx
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

```

#### Mối quan hệ

*   **Imports:**
    *   `src/components/common/Container.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/common/ProjectCarousel.tsx`
    *   `src/components/ui/button.tsx`
    *   `src/types/project.ts`

---

### Phân tích file: `src/pages/PrintableCV.tsx`

#### Nội dung file

```tsx
import { forwardRef } from "react";

import { Header } from "@/features/resume/Header.tsx";
import { Skills } from "@/features/resume/Skills.tsx";
import { Educations } from "@/features/resume/Educations.tsx";
import { AboutMe } from "@/features/resume/AboutMe.tsx";
import { Avatar } from "@/features/resume/Avatar.tsx";
import { Languages } from "@/features/resume/Languages.tsx";
import { Projects } from "@/features/resume/Projects.tsx";
import { Certifications } from "@/features/resume/Certifications.tsx";
import { Tools } from "@/features/resume/Tools.tsx";

export const PrintableCV = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className={
        "prose prose-printable prose-neutral relative mx-auto grid h-[396mm] w-[280mm] max-w-none grid-cols-[1fr_2.2fr] grid-rows-[1fr_6fr] gap-x-12 p-6 pr-8 shadow-lg"
      }
    >
      <div
        className={
          "absolute top-0 right-0 bottom-0 left-0 z-0 w-88 bg-rose-50/50"
        }
      >
        <div className={"opacity-0"}></div>
      </div>
      <Avatar />
      <Header />
      <div className={"relative h-full rounded-tr-3xl"}>
        <AboutMe />
        <Languages />
        <Tools />
        <Certifications />
      </div>
      <div className={"relative"}>
        <Projects />
        <Skills />
        <Educations />
      </div>
    </div>
  );
});

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/Header.tsx`
    *   `src/hooks/useResumeData.ts`
    *   `src/features/resume/Contact.tsx`
    *   `src/features/resume/Skills.tsx`
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/ui/progress.tsx`
    *   `src/features/resume/Educations.tsx`
    *   `src/features/resume/AboutMe.tsx`
    *   `src/features/resume/Avatar.tsx`
    *   `src/features/resume/Languages.tsx`
    *   `src/features/resume/components/LevelDots.tsx`
    *   `src/features/resume/Projects.tsx`
    *   `src/features/resume/Certifications.tsx`
    *   `src/features/resume/Tools.tsx`

---

### Phân tích file: `src/pages/ProjectDetail.tsx`

#### Nội dung file

```tsx
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

```

#### Mối quan hệ

*   **Imports:**
    *   `src/components/common/Container.tsx`
    *   `src/lib/utils.ts`
    *   `src/types/project.ts`

---

### Phân tích file: `src/pages/WebCV.tsx`

#### Nội dung file

```tsx
import { useRef, useState, useLayoutEffect } from "react";
import { PrintableCV } from "@/pages/PrintableCV.tsx";
import { Container } from "@/components/common/Container";

export const WebCV = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const calculateScale = () => {
      if (containerRef.current && resumeRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const resumeNaturalWidth = resumeRef.current.clientWidth;

        if (resumeNaturalWidth > 0) {
          setScale(containerWidth / resumeNaturalWidth);
        }
      }
    };

    calculateScale();

    const resizeObserver = new ResizeObserver(calculateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Container className="items-stretch p-0 lg:pr-0.5">
      <div ref={containerRef} className="relative aspect-[210/297] w-full">
        <div
          className="absolute top-0 left-0"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <PrintableCV ref={resumeRef} />
        </div>
      </div>
    </Container>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/pages/PrintableCV.tsx`
    *   `src/features/resume/Header.tsx`
    *   `src/hooks/useResumeData.ts`
    *   `src/features/resume/Contact.tsx`
    *   `src/features/resume/Skills.tsx`
    *   `src/features/resume/Section.tsx`
    *   `src/features/resume/Heading.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/ui/progress.tsx`
    *   `src/features/resume/Educations.tsx`
    *   `src/features/resume/AboutMe.tsx`
    *   `src/features/resume/Avatar.tsx`
    *   `src/features/resume/Languages.tsx`
    *   `src/features/resume/components/LevelDots.tsx`
    *   `src/features/resume/Projects.tsx`
    *   `src/features/resume/Certifications.tsx`
    *   `src/features/resume/Tools.tsx`
    *   `src/components/common/Container.tsx`

---

### Phân tích file: `src/types/project.ts`

#### Nội dung file

```ts
// src/types/project.ts

export interface Category {
  name: string;
  slug: string;
}

export interface Project {
  slug: string;
  name: string;
  designation: string;
  categorySlug: "strategy" | "content" | "analysis";
  quote: string;
  src: string;
  heroImage: string;
  overview: string;
  details: { label: string; value: string }[];
  content: string;
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/vite-env.d.ts`

#### Nội dung file

```ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

