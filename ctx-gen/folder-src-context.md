# Ngữ cảnh cho thư mục: src

## PHẦN A: PHÂN TÍCH CÁC FILE MỤC TIÊU

Phần này phân tích chi tiết các file được yêu cầu ban đầu.

### Phân tích file: `src/components/common/Container.tsx`

#### Nội dung file

```tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      transition={pageTransition}
      className={"relative flex min-h-screen flex-col items-center p-8 pt-24"}
    >
      {/*<BubbleBackground*/}
      {/*  interactive*/}
      {/*  className="absolute inset-0 top-0 right-0 bottom-0 left-0 flex items-center justify-center rounded-none opacity-20"*/}
      {/*/>*/}
      <div className={cn("relative w-full", className)}>
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
              className="relative font-serif text-3xl font-medium text-neutral-800 md:text-4xl lg:text-5xl"
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
      </div>
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
import Cat from "@/assets/Cat.svg?react";

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
  { label: "navbar.home", slug: "/" },
  // { label: "navbar.about", slug: "about" },
  { label: "navbar.portfolio", slug: "/portfolio" },
  { label: "navbar.cv", slug: "/cv" },
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
        className={
          "shadow-primary-50/70 flex h-full items-center justify-between px-4 shadow-lg lg:hidden"
        }
      >
        <div className={"w-1/3"}></div>
        <div className="flex w-1/3 justify-center gap-2 text-center font-bold">
          <div className={"h-6 w-6"}>
            <Cat />
          </div>
          <div>{t("navbar.initials", "KH")}</div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <div className={"flex w-1/3 justify-end"}>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </div>
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
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area"; // <-- IMPORT SCROLLAREA

interface ProjectItem {
  quote: string;
  name: string;
  designation: string;
  src: string;
  slug: string;
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
              className="flex flex-col"
            >
              {/* === THAY ĐỔI Ở ĐÂY: SỬ DỤNG SCROLLAREA ĐỂ CỐ ĐỊNH CHIỀU CAO === */}
              <ScrollArea className="h-64 pr-4">
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
              </ScrollArea>
              {/* === KẾT THÚC THAY ĐỔI === */}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
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
            </motion.div>
          </AnimatePresence>

          {/* Nút điều hướng */}
          <div className="mt-12 flex gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="group hover:bg-primary-600 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white transition-colors"
            >
              <ArrowLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="group hover:bg-primary-600 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white transition-colors"
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
    *   `src/components/ui/scroll-area.tsx`

---

### Phân tích file: `src/components/common/TikTokEmbed.tsx`

#### Nội dung file

```tsx
// src/components/common/TikTokEmbed.tsx
import { useEffect } from "react";

interface TikTokEmbedProps {
  embedHtml: string;
}

const TIKTOK_SCRIPT_SRC = "https://www.tiktok.com/embed.js";

export const TikTokEmbed = ({ embedHtml }: TikTokEmbedProps) => {
  useEffect(() => {
    // Kiểm tra xem script đã tồn tại chưa để tránh chèn nhiều lần
    if (document.querySelector(`script[src="${TIKTOK_SCRIPT_SRC}"]`)) {
      // Nếu có, chỉ cần gọi hàm load của TikTok (nếu có)
      // TikTok embed script tự động xử lý việc này, nên chúng ta không cần làm gì thêm
      return;
    }

    const script = document.createElement("script");
    script.src = TIKTOK_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);

    // Dọn dẹp script khi component bị unmount
    return () => {
      const existingScript = document.querySelector(
        `script[src="${TIKTOK_SCRIPT_SRC}"]`,
      );
      if (existingScript) {
        // Thông thường không cần gỡ script, vì nó có thể được dùng ở trang khác
        // Nhưng nếu muốn dọn dẹp triệt để, có thể dùng: document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div
      className="my-8 flex justify-center"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
};

```

#### Mối quan hệ

*   **Imports:** (Không có)

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

### Phân tích file: `src/components/ui/gradient-text.tsx`

#### Nội dung file

```tsx
import { cn } from "@/lib/utils"
import * as React from "react"

interface GradientTextProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of colors for the gradient
   * @default ["#ffaa40", "#9c40ff", "#ffaa40"]
   */
  colors?: string[]
  /**
   * Animation duration in seconds
   * @default 8
   */
  animationSpeed?: number
  /**
   * Show animated border
   * @default false
   */
  showBorder?: boolean
}

export function GradientText({
  children,
  className,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
  ...props
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center",
        "rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500",
        "overflow-hidden cursor-pointer",
        className
      )}
      {...props}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 bg-background rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </div>
  )
}
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
import { Download } from "lucide-react";
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

### Phân tích file: `src/components/ui/scroll-area.tsx`

#### Nội dung file

```tsx
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

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
    // 1. Hồng Đào (Pastel Coral/Pink) - Ấm áp, thân thiện
    first: "255, 179, 186",

    // 2. Tím Oải Hương (Pastel Lavender) - Mơ màng, sáng tạo
    second: "204, 170, 255",

    // 3. Xanh Bầu Trời (Pastel Sky Blue) - Tươi mát, trong trẻo
    third: "155, 221, 255",

    // 4. Xanh Bạc Hà (Pastel Mint) - Năng động, tươi mới
    fourth: "152, 251, 152",

    // 5. Vàng Kem Nắng (Pastel Sunny Yellow) - Vui vẻ, lạc quan
    fifth: "255, 229, 153",

    // 5. Vàng Kem Nắng (Pastel Sunny Yellow) - Vui vẻ, lạc quan
    sixth: "204, 170, 255",
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
        "from-primary-100 to-secondary-100 relative size-full overflow-hidden bg-gradient-to-br",
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
    *   `src/types/cv.ts`

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
    *   `src/types/cv.ts`

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
      <div className={"flex items-center gap-2"}>
        <TbCake className={"relative text-lg text-rose-400"} />
        {contact.birthYear}
      </div>
      <div className={"flex items-center gap-2"}>
        <TbPhoneCall className={"relative text-lg text-rose-400"} />
        {contact.phone}
      </div>
      <div className={"flex items-center gap-2"}>
        <TbMail className={"relative text-lg text-rose-400"} />
        {contact.email}
      </div>
      <div className={"flex items-center gap-2"}>
        <TbMapPinFilled className={"relative text-lg text-rose-400"} />
        {contact.address}
      </div>
    </div>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/hooks/useResumeData.ts`
    *   `src/types/cv.ts`

---

### Phân tích file: `src/features/resume/Educations.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { Plus } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const Educations = () => {
  const { tResume, educations } = useResumeData();

  return (
    <Section heading={tResume("heading.education")}>
      <div className={"flex w-full flex-col gap-8"}>
        {educations.map((education) => (
          <div key={education.university} className={"flex gap-2"}>
            <Plus className={"text-primary-500 -mt-1.5 h-8 w-8 stroke-3"} />
            <div
              className={
                "prose-p:my-0 prose-li:my-0 prose-sm prose-ul:my-0 flex flex-col"
              }
            >
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
              <ReactMarkdown>{education.desc}</ReactMarkdown>
              <span className={"block text-sm leading-relaxed"}></span>
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
    *   `src/types/cv.ts`

---

### Phân tích file: `src/features/resume/Header.tsx`

#### Nội dung file

```tsx
import { useResumeData } from "@/hooks/useResumeData";
import { Contact } from "./Contact";
import QRCode from "@/assets/QRCode.svg?react";

export const Header = () => {
  const { header } = useResumeData();

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
        <div className={"flex flex-col-reverse items-center gap-1"}>
          <div className={"flex flex-col items-center justify-center text-xs"}>
            <a
              href={
                "https://transcendent-cuchufli-e090f2.netlify.app/portfolio"
              }
              className={"italic"}
            >
              #portfolio
            </a>
          </div>
          <div className={"h-24 w-24"}>
            <QRCode className={"h-full w-full"} />
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
    *   `src/types/cv.ts`
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
    <h2 className={"!mt-10 !mb-3 flex items-center gap-3 uppercase"}>
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
    <Section heading={heading.languages} className={"text-base font-medium"}>
      {languages.map((language) => (
        <div key={language.label} className={"flex"}>
          <h4 className={"!my-1 flex w-24 grow items-center gap-1"}>
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
    *   `src/types/cv.ts`
    *   `src/features/resume/components/LevelDots.tsx`

---

### Phân tích file: `src/features/resume/Projects.tsx`

#### Nội dung file

```tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { Plus } from "lucide-react";

export const Projects = () => {
  const { heading, projects, tResume } = useResumeData();

  return (
    <Section heading={heading.projects}>
      <div className={"flex flex-col gap-6"}>
        {projects.map((project) => (
          <div key={project.name} className={"flex gap-2"}>
            <Plus className={"text-primary-500 -mt-1.5 h-8 w-8 stroke-3"} />
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
              <strong>{tResume("projects.resultLabel")} </strong>
              <ul className={"!my-0 !ml-0 block text-sm"}>
                {project.result.map((d, index) => (
                  <li key={index} className={"!my-0 !leading-relaxed"}>
                    {d}
                  </li>
                ))}
              </ul>
              {/*<p className={"prose-sm !my-0"}>*/}
              {/*  <strong>{tResume("projects.resultLabel")} </strong>*/}
              {/*  {project.result}*/}
              {/*</p>*/}
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
    *   `src/types/cv.ts`

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
import { useResumeData } from "@/hooks/useResumeData";
import { SkillCategory } from "@/types/cv.ts";

// Một sub-component "ngu ngơ" (dumb component) chỉ để hiển thị
const SkillList = ({ category }: { category: SkillCategory }) => {
  return (
    <div className={"flex flex-col gap-3"}>
      {/* Tiêu đề không cần nữa vì Section đã có heading chung */}
      {category.items.map((skill) => (
        <div
          key={skill.label}
          className={"flex flex-col justify-between gap-1"}
        >
          <h4 className={"!my-0 shrink-0"}>{skill.label}</h4>
          <Progress value={skill.level} className={"w-full"} />
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
      className={"flex flex-col justify-between gap-8 text-base font-medium"}
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
    *   `src/types/cv.ts`

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
    <Section
      heading={tResume("heading.tools")}
      className={"text-base font-medium"}
    >
      {tools.map((tool) => (
        <div key={tool.label} className={"flex"}>
          <h4 className={"!my-1 flex w-24 grow items-center gap-1"}>
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
    *   `src/types/cv.ts`
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
import {
  AboutMeData,
  ContactData,
  EducationItem,
  HeaderData,
  HeadingData,
  LanguageItem,
  ProjectItem,
  SkillsData,
  ToolItem,
} from "@/types/cv.ts";

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
    languages,
    tools,
    certifications,
    skills,
    educations,
    projects,
  };
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/types/cv.ts`

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
  --animate-gradient: gradient var(--animation-duration, 8s) linear infinite;

  @keyframes gradient {
    0% {
      backgroundPosition: 0% 50%;
    }
    50% {
      backgroundPosition: 100% 50%;
    }
    100% {
      backgroundPosition: 0% 50%;
    }
  }
  @keyframes gradient {
  0% {
    backgroundPosition: 0% 50%;
    }
  50% {
    backgroundPosition: 100% 50%;
    }
  100% {
    backgroundPosition: 0% 50%;
    }
  }
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
  --primary: var(--color-rose-400);
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
  "navbar": {
    "about": "My Story",
    "resume": "My Journey",
    "portfolio": "Featured Projects",
    "downloadCV": "Download CV",
    "name": "Truong Nguyen\nKhanh Huyen",
    "initials": "KH",
    "close": "Close"
  },
  "home": {
    "greeting": "Hello there,",
    "introduction": "I am Khanh Huyen",
    "name": "Khanh Huyen.",
    "subheading": "A storyteller who crafts with",
    "description": "For me, marketing is not just about numbers, but the art of telling stories that touch emotions, building sincere connections, and creating sustainable value for brands. Let's explore together!",
    "cta": "Explore my projects",
    "wordRotate": [
      "Creativity",
      "Data",
      "Empathy"
    ]
  },
  "projectDetail": {
    "backToProjects": "Back to projects",
    "projectNotFound": "Oops, project not found!",
    "projectNotFoundMessage": "It seems the project you're looking for isn't here. Please go back and discover other stories."
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
  "pageTitle": "Where Ideas Come to Life",
  "exploreProject": "Explore Project",
  "noProjectsFound": "There are currently no projects in this category.",
  "categories": [
    { "name": "All", "slug": "all" },
    { "name": "Content Creation & Storytelling", "slug": "content" },
    { "name": "Research & Strategy", "slug": "strategy" },
    { "name": "Digital Channel Execution", "slug": "digital" }
  ],
  "projects": [
    {
      "slug": "case-study-tiktok-the-marketing-brew",
      "name": "Case Study: \"The Marketing Brew\" TikTok Channel",
      "designation": "Channel Creation & Growth",
      "categorySlug": "content",
      "quote": "I believe knowledge is more engaging when told through visuals. This is my journey of turning dry marketing textbooks into lively short videos.",
      "src": "/images/project-3.jpg",
      "heroImage": "/images/project-tiktok-hero.jpg",
      "overview": "A detailed case study on the process of building a personal TikTok channel about Marketing. The project demonstrates the ability to strategize, produce video content, and analyze performance for optimization and channel growth.",
      "details": [
        { "label": "Context", "value": "Personal Project" },
        { "label": "My Role", "value": "Ideation, Production, Analysis" },
        { "label": "Tools", "value": "Capcut, Canva, TikTok Analytics" },
        { "label": "Key Result", "value": "Video reached 10,000+ views" }
      ],
      "content": "### The Challenge I Set for Myself\n\nAs a Marketing student, I noticed that much of the specialized knowledge is quite dry and difficult for newcomers to approach. I asked myself: \"How can I turn complex theories into content that is easy to understand, relatable, and engaging on the TikTok platform?\" \"The Marketing Brew\" channel was born to answer that question.\n\n### How I Solved It\n\nMy journey went through 3 main stages:\n\n**1. Stage 1: Content Strategy**\n\n*   **Audience:** Students in Marketing, Economics, or anyone curious about the field.\n*   **Content Pillars:** I identified 3 main content areas to keep the channel diverse:\n    *   `Decoding Jargon:` Short videos explaining concepts like 'Insight', 'SWOT', 'Brand Positioning'...\n    *   `Mini Case Studies:` Quick analyses of notable marketing campaigns in 1 minute.\n    *   `Tips & Tricks:` Sharing study tips and useful tools for marketers.\n\n**2. Stage 2: Production & Creation**\n\nAll videos were made with a simple process: Scripting -> Filming with my phone -> Editing and adding effects with Capcut -> Designing thumbnails with Canva. I focused on maintaining a fast video pace, clear subtitles, and trendy music.\n\n<img src=\"/images/tiktok-video-1.jpg\" alt=\"Example of a case study analysis video\">\n*Interface of a case study analysis video on my channel.*\n\n**3. Stage 3: Analysis & Learning**\n\nThis was the most crucial stage. After each video, I tracked the metrics on TikTok Analytics. I realized that:\n\n*   Listicle-style videos (e.g., '3 mistakes when...') had a higher re-watch rate.\n*   Replying to viewers' comments with a video significantly increased engagement.\n*   Posting between 7 PM - 9 PM was most effective for my audience.\n\nThanks to continuous optimization, one of my videos fortunately reached over 10,000 views, helping the channel gain its first quality followers."
    },
    {
      "slug": "campaign-the-coffee-house-an-yen",
      "name": "\"A Moment of Peace\" - Content Campaign for The Coffee House",
      "designation": "Brand Content Creation (Concept)",
      "categorySlug": "content",
      "quote": "How can a brand not only sell products but also become a companion? I tried to answer this question through a concept campaign for The Coffee House.",
      "src": "/images/project-4.jpg",
      "heroImage": "/images/project-tch-hero.jpg",
      "overview": "A concept project I created to showcase my ability to ideate and produce content for a major brand. The goal was to help The Coffee House strengthen its emotional connection with its Gen Z audience through a meaningful content campaign.",
      "details": [
        { "label": "Context", "value": "Concept Project" },
        { "label": "Brand", "value": "The Coffee House" },
        { "label": "Objective", "value": "Increase emotional connection with Gen Z" },
        { "label": "Channels", "value": "Instagram, Facebook" }
      ],
      "content": "### Context & Big Idea\n\nGen Z, the primary customer base of The Coffee House, often faces academic and work-related pressure. They seek 'healing' spaces and moments.\n\n**Big Idea:** The Coffee House doesn't just sell coffee; it offers **\"A Moment of Peace\"**—a space, a moment to slow down and connect with oneself amidst the hustle and bustle.\n\n### Execution Samples\n\nI drafted some key content for this campaign:\n\n**1. Visuals & Post Design (Created with Canva)**\n\nUsing a warm, soothing color palette and soft, handwritten fonts. The imagery focuses on quiet corners of the cafe, moments of contemplation with a cup of coffee, rather than just product shots.\n\n<img src=\"/images/tch-post-1.jpg\" alt=\"Post design 1 for The Coffee House\">\n*A sample post design for the campaign, focusing on emotion and atmosphere.*\n\n**2. Copywriting & Tone of Voice**\n\nThe tone is empathetic and conversational, like a friend. The content doesn't push sales but evokes reflection.\n\n*   **Sample Post 1:**\n    *   *Visual:* A sunlit corner of the cafe.\n    *   *Caption:* \"Sometimes, all we need is a familiar little corner, an instrumental tune, and a coffee that's just right. To allow ourselves a moment of rest. #AMomentOfPeace #TheCoffeeHouse\"\n*   **Sample Post 2:**\n    *   *Visual:* Close-up of a hand writing in a journal.\n    *   *Caption:* \"Pour your jumbled thoughts onto the page. Let the fatigue dissolve into the bitter taste of coffee. How are you today? #Healing #TheCoffeeHouse\"\n\n**3. Instagram Story Ideas**\n\nCreate interactive Story series to boost connection:\n\n*   **Poll:** \"What's your 'peaceful' corner today?\" (A: A good book / B: A new playlist)\n*   **Q&A:** \"Share with us a song you listen to when you need to recharge your soul!\"\n*   **Quiz:** \"Guess the drink that matches your mood.\""
    },
    {
      "slug": "imc-plan-danh-thuc-ban-sac-viet",
      "name": "IMC Plan: \"Awakening Vietnamese Identity\"",
      "designation": "Integrated Marketing Strategy Planning",
      "categorySlug": "strategy",
      "quote": "A good strategy is like a map, guiding all marketing activities in the same direction. This project was my first time drawing that map myself.",
      "src": "/images/project-1.jpg",
      "heroImage": "/images/project-imc-hero.jpg",
      "overview": "This was a course project I invested a lot of effort into, where I developed a complete Integrated Marketing Communications (IMC) plan for a hypothetical brand. The project showcases my ability to analyze, think strategically, and logically combine various marketing tools.",
      "details": [
        { "label": "Context", "value": "Course Project" },
        { "label": "My Role", "value": "Strategy Planner" },
        { "label": "Skills Demonstrated", "value": "Analysis, Planning, IMC Thinking" },
        { "label": "Grade", "value": "A+" }
      ],
      "content": "### The Brand's Challenge\n\nA Vietnamese fashion brand was struggling to differentiate itself in a market saturated with local and international brands. The problem was how to find a unique voice and connect with young people who love Vietnamese culture.\n\n### My Strategic Thinking Process\n\nI approached the problem with a 4-step process:\n\n1.  **3C Analysis (Company - Customer - Competitor):**\n    *   **Company:** Identified the core strength in traditional materials.\n    *   **Customer:** Profiled the target customer—young individuals proud of Vietnamese culture but seeking modern designs.\n    *   **Competitor:** Analyzed competitors and identified a market gap.\n\n2.  **Finding the Insight:**\n    *   I discovered the insight: *\"Young Vietnamese people want to express their cultural identity, but they fear being seen as 'old-fashioned' or 'cheesy'.\"*\n\n3.  **Developing the Big Idea:**\n    *   From this insight, I built the Big Idea: **\"Awakening Vietnamese Identity in every modern movement.\"**\n\n4.  **Multi-channel Execution Plan:**\n    *   **Social Media:** Launch a lookbook photoshoot combining the outfits with contemporary Vietnamese architectural settings.\n    *   **PR & Influencers:** Collaborate with KOLs in the fields of culture and arts to spread the story.\n    *   **Activation:** Organize a small workshop on how to style modern outfits with traditional materials.\n\n### What I'm Most Proud Of\n\nThis project helped me deeply understand that a successful marketing campaign is not just a series of isolated activities, but a symphony harmoniously coordinated from a single big idea."
    },
    {
      "slug": "cx-analysis-coolmate",
      "name": "Customer Experience (CX) Analysis for Coolmate",
      "designation": "User Experience Research & Optimization",
      "categorySlug": "strategy",
      "quote": "Every click hides a story, an emotion of the user. In this project, I tried to 'read' those stories to find ways to make the shopping journey smoother.",
      "src": "/images/project-2.jpg",
      "heroImage": "/images/project-coolmate-hero.jpg",
      "overview": "Building on an E-commerce analysis project from class, I developed a deeper customer experience (CX) analysis for the Coolmate website. I mapped the customer journey, identified 'pain points', and proposed specific solutions for optimization.",
      "details": [
        { "label": "Context", "value": "Developed from a Course Project" },
        { "label": "Brand", "value": "Coolmate.me" },
        { "label": "Method", "value": "Customer Journey Mapping" },
        { "label": "Objective", "value": "Propose Conversion Rate Optimization" }
      ],
      "content": "### Objective\n\nPutting myself in the shoes of a Coolmate customer, I wanted to identify points that might cause users to hesitate, get frustrated, or abandon their carts during the shopping process, and then propose improvements.\n\n### Customer Journey Map\n\nI created a persona (Male, 22, student) and followed his journey:\n\n*   **Stage 1: Awareness**\n    *   *Action:* Sees a Coolmate ad on Facebook.\n    *   *Good Touchpoint:* Creative ad, clear message.\n\n*   **Stage 2: Consideration**\n    *   *Action:* Clicks to the website, searches for a t-shirt.\n    *   *Good Touchpoint:* Detailed product filters, high-quality product images.\n    *   **Pain Point:** Information about the 60-day return policy is not prominent enough on the product page.\n\n*   **Stage 3: Purchase**\n    *   *Action:* Adds to cart and proceeds to checkout.\n    *   *Good Touchpoint:* Simple cart interface.\n    *   **Pain Point:** The mandatory account registration form has a few too many steps, which could discourage first-time buyers.\n\n*   **Stage 4: Post-Purchase**\n    *   *Action:* Receives a confirmation email.\n    *   *Good Touchpoint:* Professional email with complete information.\n\n### My Recommendations\n\nBased on the identified 'pain points', I proposed 3 solutions:\n\n1.  **Optimize Product Page:** Add a small banner or a prominent icon near the \"Add to Cart\" button to highlight the \"60-Day Free Returns\" policy.\n2.  **Optimize Checkout Process:** Allow users to check out as a guest without creating an account, or integrate quick sign-in via Google/Facebook.\n3.  **Build Trust:** Add a customer reviews section directly on the product page to give new buyers more confidence in their decision."
    },
    {
      "slug": "meta-ads-workshop-marketing-101",
      "name": "Meta Ads Campaign for \"Marketing 101\" Workshop",
      "designation": "Digital Advertising Execution (Concept)",
      "categorySlug": "digital",
      "quote": "How do you get your message to the right people at the most optimal cost? This project was my practice in the art of advertising on the Meta platform.",
      "src": "/images/project-1.jpg",
      "heroImage": "/images/project-meta-ads-hero.jpg",
      "overview": "A detailed concept project for designing an advertising campaign on Meta (Facebook & Instagram) to promote a fictional marketing workshop. The project covers audience targeting, ad creative design, copywriting, and outlining a simple conversion funnel.",
      "details": [
        { "label": "Context", "value": "Concept Project" },
        { "label": "Platform", "value": "Meta (Facebook & Instagram)" },
        { "label": "Objective", "value": "Attract 100 workshop registrations" },
        { "label": "Assumed Budget", "value": "2,000,000 VND" }
      ],
      "content": "### Execution Plan\n\nWith the goal of attracting 100 students to the \"Marketing 101 for Students\" workshop, I drafted the following ad plan:\n\n**1. Audience Targeting**\n\nI would create a detailed audience in Meta Ads Manager:\n\n*   **Location:** Ho Chi Minh City, Hanoi.\n*   **Age:** 18 - 22.\n*   **Demographics:** Currently university students.\n*   **Interests:** Marketing, Brands Vietnam, Advertising Vietnam, Philip Kotler, Digital Marketing, Content Marketing.\n\n**2. Ad Creative**\n\nI designed 2 formats for A/B testing:\n\n*   **Image Format (using Canva):** A poster-style design providing all key information (Speaker, Time, Venue, Key Benefits) in an eye-catching way.\n*   **Short Video Format (using Capcut):** A 15-second video with dynamic text effects, highlighting 3 reasons not to miss the workshop, with upbeat background music.\n\n<img src=\"/images/meta-ads-creative.jpg\" alt=\"Ad creative for the workshop\">\n*The image-based ad creative I designed.*\n\n**3. Ad Copy**\n\nI also wrote 2 copy versions to test:\n\n*   **Version 1 (Benefit-focused):** \"Empty CV? Confused about the Marketing industry? The 'Marketing 101' workshop will help you build a solid foundation and guide your career from your freshman year! Learn more...\"\n*   **Version 2 (Creating Scarcity):** \"ONLY 20 EARLY BIRD SPOTS LEFT! Register now for the 'Marketing 101' workshop to meet industry experts and receive an exclusive set of materials. Sign up before it's sold out!\"\n\n**4. Conversion Funnel**\n\nThe user flow would be: See Ad on Facebook/Instagram -> Click link -> Land on Landing Page (with detailed info and registration form) -> Fill out form -> Receive ticket confirmation email."
    },
    {
      "slug": "influencer-marketing-cocoon",
      "name": "Influencer Collaboration Plan for Cocoon",
      "designation": "Influencer Marketing Execution (Concept)",
      "categorySlug": "digital",
      "quote": "Choosing the right storyteller is as important as having a good story. This is how I would find the right 'storytellers' for a vegan brand like Cocoon.",
      "src": "/images/project-2.jpg",
      "heroImage": "/images/project-cocoon-hero.jpg",
      "overview": "A concept project for building an Influencer Marketing plan for Cocoon for a new product launch. The project demonstrates an understanding of the KOC/KOL market in Vietnam, the ability to analyze and select suitable influencers, and the skill to draft a professional brief.",
      "details": [
        { "label": "Context", "value": "Concept Project" },
        { "label": "Brand", "value": "Cocoon Vietnam" },
        { "label": "Objective", "value": "Increase awareness & trial for a new product" },
        { "label": "Platforms", "value": "TikTok, Instagram, YouTube" }
      ],
      "content": "### The Problem\n\nCocoon is about to launch a new product line with butterfly pea flower extract, targeting anti-aging benefits. How can we spread the word and build user trust naturally and effectively?\n\n### My Influencer Strategy\n\nI propose a strategy combining 3 tiers of influencers to create a multi-layered effect:\n\n**1. Influencer Tiers & Selection**\n\n*   **Tier 1: Beauty Bloggers (Macro-influencers):**\n    *   *Purpose:* Generate broad reach and credibility for the product.\n    *   *Proposed Examples:* **Trinh Pham, Primmy Truong.**\n    *   *Reasoning:* They have deep expertise in cosmetics, and their large follower base trusts their reviews.\n*   **Tier 2: Lifestyle Vloggers (Mid-tier influencers):**\n    *   *Purpose:* Integrate the product into daily life contexts, increasing relatability.\n    *   *Proposed Examples:* **Helly Tong, Hana's Lexis.**\n    *   *Reasoning:* They pursue a green, sustainable lifestyle, which aligns perfectly with Cocoon's core values.\n*   **Tier 3: KOCs on TikTok (Micro-influencers):**\n    *   *Purpose:* Drive purchase decisions through authentic, unpolished reviews.\n    *   *Proposed Examples:* **Call Me Duy, Dermatologist Hoa Cuc.**\n    *   *Reasoning:* Their short, straightforward review videos have a very high conversion rate.\n\n**2. Sample Brief for Influencers**\n\nTo ensure influencers convey the right message, I drafted a sample brief with key sections:\n\n*   **About the Campaign:** Introduce the new product line and the key message: \"Preserving youth with Vietnamese nature.\"\n*   **Content Requirements:**\n    *   **Mandatory:** Film an unboxing, show a close-up of the cream/serum texture, share feelings after 7 days of use.\n    *   **Key Messages to Emphasize:** 100% vegan ingredients, not tested on animals, antioxidant benefits from butterfly pea flower.\n    *   **Campaign Hashtags:** #Cocoon #DauBiecThanhXuan #MyPhamThuanChay\n*   **Do's & Don'ts:**\n    *   **Don't:** Directly compare with competitor products, promise 100% results after one use.\n    *   **Do:** Share personal stories and experiences authentically.\n*   **Timeline & Compensation:** Clearly state the posting deadline and associated benefits."
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
  "scanMessage": "Scan to see my Portfolio!",
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
    "skills": "Skills",
    "languages": "Languages",
    "tools": "Tools",
    "education": "Education",
    "projects": "Projects",
    "certifications": "Certifications"
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

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/vi/common.json`

#### Nội dung file

```json
{
  "navbar": {
    "home": "Trang chủ",
    "about": "Về mình",
    "portfolio": "Dự án của mình",
    "cv": "CV",
    "downloadCV": "Tải CV",
    "name": "Trương Nguyễn\nKhánh Huyền",
    "initials": "Khánh Huyền",
    "close": "Đóng"
  },
  "home": {
    "greeting": "Xin chào, mình là Khánh Huyền.",
    "headline": "Lắng nghe, thấu hiểu và kể những câu chuyện ý nghĩa.",
    "subheading": "Mỗi thương hiệu đều có một câu chuyện riêng. Mình ở đây để lắng nghe, tìm kiếm những điều đặc biệt và giúp câu chuyện đó được tỏa sáng.",
    "ctaPrimary": "Khám phá dự án",
    "ctaSecondary": "Hồ sơ của mình"
  },
  "about": {
    "pageTitle": "Hành trình của mình",
    "headline": "Từ một lựa chọn an toàn đến một đam mê đích thực.",
    "story": {
      "title": "Bốn năm và một quyết định quan trọng",
      "content": "Con đường của mình không phải là một đường thẳng. Mình đã bắt đầu tại Đại học Y khoa - một lựa chọn được xem là an toàn và đáng tự hào. Đó là một môi trường rèn luyện cho mình sự kỷ luật, tư duy logic và khả năng làm việc dưới áp lực cực lớn.\n\nNhưng sâu bên trong, mình nhận ra đó không phải là nơi mình thực sự thuộc về. Mình khao khát một môi trường năng động hơn, nơi mình có thể dùng sự sáng tạo để tạo ra những kết nối ở quy mô lớn hơn, thay vì chỉ là những tương tác một-một. Thú thật, đó là một quyết định không hề dễ dàng."
    },
    "bridge": {
      "title": "Giai đoạn 'bắc cầu'",
      "content": "Thay vì vội vàng, mình dành thời gian để thực sự 'nghiên cứu' và 'thử nghiệm'. Mình tìm hiểu sâu về ngành Marketing, tham gia các khóa học online, tự thực hiện những dự án nhỏ đầu tiên. Giai đoạn này giúp mình khẳng định chắc chắn rằng: **đây chính là con đường mình muốn đi.** Nó không phải là một 'khoảng trống', mà là một 'cây cầu' được xây dựng có chủ đích."
    },
    "approach": {
      "title": "Và đây là cách mình làm Marketing hôm nay",
      "intro": "Hành trình đó đã định hình con người và cách mình làm việc. Mình không đến với Marketing một cách tình cờ, mà bằng một sự lựa chọn có ý thức. Vì vậy, mình luôn tiếp cận mọi thứ với:",
      "items": [
        {
          "title": "Sự Tò mò và Ham học hỏi",
          "desc": "Vì là người 'ngoại đạo', mình luôn có tâm thế của một người mới, không ngại đặt câu hỏi và luôn tìm tòi để hiểu sâu vấn đề."
        },
        {
          "title": "Tư duy Logic & Rõ ràng",
          "desc": "Nền tảng khoa học giúp mình tiếp cận các vấn đề marketing một cách có hệ thống, từ nghiên cứu, lập kế hoạch đến đo lường hiệu quả."
        },
        {
          "title": "Sự Kiên định và Cam kết",
          "desc": "Mình đã nỗ lực rất nhiều để được ở đây. Vì vậy, mình cam kết mang đến 100% nỗ lực và tinh thần trách nhiệm cho mỗi công việc mình làm."
        }
      ]
    }
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
  "pageTitle": "Những câu chuyện mình đã kể",
  "exploreProject": "Xem chi tiết dự án",
  "overview": "Tổng quan",
  "noProjectsFound": "Hiện chưa có dự án nào trong danh mục này.",
  "categories": [
    { "name": "Tất cả", "slug": "all" },
    { "name": "Sáng tạo Nội dung & Kể chuyện", "slug": "content" },
    { "name": "Nghiên cứu & Chiến lược", "slug": "strategy" },
    { "name": "Thực thi Kênh Digital", "slug": "digital" }
  ],
  "projects": [
    {
      "slug": "saigontourist-vr-campaign",
      "name": "Case Study: Trẻ hóa Tour du lịch Lịch sử",
      "designation": "Hoạch định Chiến lược & Sáng tạo 360°",
      "categorySlug": "strategy",
      "quote": "Mình luôn tự hỏi, làm thế nào để lịch sử không chỉ là những trang sách mà còn là một trải nghiệm có thể 'chạm' tới? Dự án này là câu trả lời của mình.",
      "src": "/images/saigontourist/flyer.png",
      "heroImage": "/images/saigontourist/billboard-main.png",
      "overview": "Đây là một case study chi tiết về quá trình mình giải quyết bài toán kinh doanh: 'Làm thế nào để làm mới sản phẩm tour du lịch lịch sử của Saigontourist?'. Giải pháp của mình là một chiến dịch 360°, bắt đầu từ việc thay đổi trải nghiệm sản phẩm bằng công nghệ VR, sau đó xây dựng câu chuyện và thực thi trên đa kênh (Print, OOH, Event).",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Môn học" },
        { "label": "Thương hiệu", "value": "Saigontourist" },
        { "label": "Vai trò", "value": "Lên ý tưởng & Thực thi" },
        { "label": "Phạm vi", "value": "Chiến dịch 360°" }
      ],
      "content": "### Hành trình tư duy của mình\n\n**1. Bắt đầu từ một câu hỏi**\n\nLàm thế nào để một tour du lịch về nguồn có thể trở nên hấp dẫn hơn với người trẻ? Thay vì chỉ nghĩ về quảng cáo, mình bắt đầu từ chính trải nghiệm của du khách. Mình nhận ra, điều còn thiếu là sự tương tác. Từ đó, ý tưởng tích hợp công nghệ **Thực tế ảo (VR)** ra đời, để du khách không chỉ nghe, mà còn có thể 'thấy' và 'cảm nhận' lịch sử một cách sống động hơn.\n\n**2. Từ ý tưởng đến câu chuyện**\n\nKhi đã có điểm nhấn là VR, mình bắt đầu xây dựng một câu chuyện chung cho toàn bộ chiến dịch: **\"Sống lại lịch sử - Cảm trọn hành trình\"**. Đây là lời hứa về một trải nghiệm cảm xúc, chứ không chỉ là một chuyến tham quan đơn thuần.\n\n**3. Hiện thực hóa câu chuyện qua thiết kế**\n\nĐể câu chuyện được lan tỏa, mình đã thiết kế một bộ ấn phẩm đồng bộ, mỗi thứ có một nhiệm vụ riêng:\n\n- **Giai đoạn 1: Khơi gợi sự tò mò (Print)**\n\n<img src=\"/images/saigontourist/flyer.png\" alt=\"Tờ rơi (Flyer) giới thiệu chung về tour du lịch trải nghiệm VR.\">\n<img src=\"/images/saigontourist/brochure.png\" alt=\"Brochure gập ba, cung cấp thông tin chi tiết hơn về lịch trình và trải nghiệm.\">\n<img src=\"/images/saigontourist/brochure-detail-front.png\" alt=\"Mặt trước của brochure khi mở ra, trình bày chi tiết lịch trình.\">\n<img src=\"/images/saigontourist/brochure-detail-back.png\" alt=\"Mặt sau của brochure khi mở ra, với các gói tour và thông tin liên hệ.\">\n\n- **Giai đoạn 2: Tạo điểm nhấn (Event)**\n\n<img src=\"/images/saigontourist/flyer-event.png\" alt=\"Tờ rơi (Flyer) dành riêng cho sự kiện ra mắt trải nghiệm VR.\">\n\n- **Giai đoạn 3: Tăng độ nhận diện (OOH & DOOH)**\n\n<img src=\"/images/saigontourist/billboard-main.png\" alt=\"Billboard chính trên các trục đường lớn, tạo ấn tượng thị giác mạnh mẽ.\">\n<img src=\"/images/saigontourist/billboard-alt.png\" alt=\"Phương án billboard thay thế, có thể sử dụng trên các tòa nhà.\">\n<img src=\"/images/saigontourist/ooh-bus-stop.png\" alt=\"Quảng cáo tại nhà chờ xe buýt, tiếp cận khách hàng ở cự ly gần.\">\n<img src=\"/images/saigontourist/dooh-elevator.png\" alt=\"Quảng cáo màn hình kỹ thuật số trong thang máy (DOOH), thu hút sự chú ý trong không gian hẹp.\">",
      "keyTakeaways": {
        "title": "Bài học rút ra",
        "items": [
          "**Tư duy chiến lược & Giải quyết vấn đề:** Nhận diện đúng thách thức kinh doanh và đề xuất giải pháp từ gốc rễ (trải nghiệm sản phẩm), chứ không chỉ ở bề mặt (quảng cáo).",
          "**Lên kế hoạch & Thực thi 360°:** Xây dựng một kế hoạch có lớp lang, từ ý tưởng lớn, câu chuyện truyền thông, đến việc triển khai nhất quán trên nhiều kênh khác nhau.",
          "**Sáng tạo nội dung đa kênh:** Thiết kế các ấn phẩm phù hợp với mục tiêu và đặc thù của từng kênh, từ in ấn, sự kiện đến quảng cáo ngoài trời."
        ]
      }
    },
    {
      "slug": "dau-dau-livestream-poster",
      "name": "Case Study: Thiết kế Key Visual cho Livestream",
      "designation": "Thiết kế Đồ họa & Tư duy Social Media",
      "categorySlug": "digital",
      "quote": "Một key visual tốt phải thu hút được sự chú ý trong 3 giây. Với dự án này, mình tập trung vào màu sắc tươi sáng, thông điệp rõ ràng và một chút vui nhộn để làm được điều đó.",
      "src": "/images/daudau/livestream-kv.png",
      "heroImage": "/images/daudau/livestream-kv.png",
      "overview": "Đây là case study về việc giải quyết một bài toán phổ biến trên mạng xã hội: làm thế nào để thiết kế một Key Visual (KV) hiệu quả, thu hút tối đa lượt xem và tương tác cho một buổi livestream bán hàng trong môi trường thông tin dày đặc.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Môn học" },
        { "label": "Thương hiệu", "value": "Đậu Đậu (Giả định)" },
        { "label": "Vai trò", "value": "Lên ý tưởng & Thiết kế" },
        { "label": "Mục tiêu", "value": "Tối ưu Tỷ lệ Click & Tương tác" }
      ],
      "content": "### Hành trình tư duy của mình\n\n**1. Thách thức: Cuộc chiến 3 giây trên Newsfeed**\n\nNgười dùng mạng xã hội lướt rất nhanh. Một thiết kế cho livestream nếu không nổi bật và dễ hiểu ngay lập tức sẽ bị bỏ qua. Vì vậy, câu hỏi mình đặt ra không phải là 'làm sao cho đẹp?', mà là 'làm sao để người xem **dừng lại, hiểu ngay, và muốn tham gia**?'.\n\n**2. Giải pháp thiết kế có chủ đích**\n\nTừ thách thức đó, mỗi yếu tố trong thiết kế này đều có một nhiệm vụ riêng:\n\n<img src=\"/images/daudau/livestream-kv.png\" alt=\"Key visual cho livestream Đậu Đậu\">\n\n- **Màu sắc & Bố cục:** Mình chọn tông màu xanh lá-vàng tươi mát để tạo cảm giác tự nhiên, nổi bật trên nền trắng-xanh của Facebook. Các sản phẩm và icon tương tác được sắp xếp bay lượn, tạo không khí năng động, vui vẻ của một buổi live.\n\n- **Phân cấp thông điệp:** Thông tin quan trọng nhất phải được thấy đầu tiên. Vì vậy, cụm từ **\"DEAL HỜI QUÀ HOT\"** và dải banner **\"Giảm 50%\"** được làm to và đặt ở vị trí trung tâm, dễ thấy nhất.\n\n- **Các 'Mồi câu' khác:** Các coupon nhỏ ở phía dưới (Minigame, Combo, Deal 1K) đóng vai trò là những lý do phụ để thuyết phục người xem rằng đây là một buổi live có nhiều giá trị và không thể bỏ lỡ.",
      "keyTakeaways": {
        "title": "Năng lực được thể hiện",
        "items": [
          "**Tư duy Visual Marketing:** Hiểu cách sử dụng màu sắc, bố cục để thu hút sự chú ý và truyền tải thông điệp một cách nhanh chóng trong môi trường digital.",
          "**Thiết kế hướng đến Chuyển đổi:** Biết cách sắp xếp và nhấn mạnh các yếu tố quan trọng (ưu đãi, kêu gọi hành động) để thúc đẩy hành vi mong muốn của người xem.",
          "**Hiểu biết về Thương hiệu & Nền tảng:** Tạo ra một thiết kế có cá tính, vừa phù hợp với tinh thần của thương hiệu ('Đậu Đậu'), vừa tối ưu cho đặc thù của nền tảng mạng xã hội (livestream)."
        ]
      }
    },

    {
      "slug": "bia-saigon-that-tuu",
      "name": "BST 'Bia Saigon Thất Tửu'",
      "designation": "Ý tưởng & Thiết kế Bao bì",
      "categorySlug": "content",
      "quote": "Với mình, một lon bia không chỉ là thức uống, mà còn có thể là một sứ giả văn hóa. Đây là cách mình thử dùng thiết kế để 'tiếp lửa' cho những giá trị truyền thống.",
      "src": "/images/project-saigon-beer-thumb.png",
      "heroImage": "/images/project-saigon-beer-hero.png",
      "overview": "Trong một dự án môn học, mình đã lên ý tưởng và thiết kế bộ sưu tập lon phiên bản giới hạn cho Bia Saigon. Mỗi lon bia tôn vinh một làng nghề truyền thống đang dần mai một, với mong muốn biến sản phẩm quen thuộc thành một lời nhắc nhở nhẹ nhàng về văn hóa dân tộc.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Môn học" },
        { "label": "Thương hiệu", "value": "Bia Saigon" },
        { "label": "Sản phẩm", "value": "Bao bì phiên bản giới hạn" },
        { "label": "Thông điệp", "value": "Tiếp lửa cho những làng nghề" }
      ],
      "content": "### Ý tưởng chính\n\nDịp Tết là lúc mọi người hướng về cội nguồn. Mình nghĩ, tại sao không kết hợp sản phẩm của Bia Saigon với những câu chuyện văn hóa? Bộ sưu tập 'Thất Tửu' ra đời, với 7 thiết kế lon, mỗi lon là một câu chuyện nhỏ về một làng nghề:\n\n1.  **Nghề làm gốm - Dân tộc Chăm:** *\"Đất nở lộc vàng – Xuân sang phát đạt\"*\n<img src=\"/images/saigon-beer-gom-cham.png\" alt=\"Lon Bia Saigon - Nghề làm gốm Chăm\">\n\n2.  **Nghề rèn - Dân tộc Mông:** *\"Lửa tôi gan thép – Vững chí vươn xa\"*\n<img src=\"/images/saigon-beer-ren-mong.png\" alt=\"Lon Bia Saigon - Nghề rèn Mông\">\n\n3.  **Nghề dệt thổ cẩm - Dân tộc Thái:** *\"Dệt chỉ vàng son – May mắn vẹn tròn\"*\n<img src=\"/images/saigon-beer-det-thai.png\" alt=\"Lon Bia Saigon - Nghề dệt thổ cẩm Thái\">\n\n(Và các thiết kế khác...)"
    },
    {
      "slug": "tiktok-channel-growth",
      "name": "Case Study: Xây dựng Kênh TikTok từ Con số 0",
      "designation": "Content Strategy, Video Production & Community Growth",
      "categorySlug": "content",
      "quote": "Mình tò mò muốn biết, lý thuyết marketing thì nhiều, nhưng thực tế một kênh social được xây dựng từ con số 0 sẽ như thế nào? Kênh TikTok này chính là hành trình mình tự đi tìm câu trả lời.",
      "src": "/images/project-tiktok-hero.jpg",
      "heroImage": "/images/project-tiktok-hero.jpg",
      "overview": "Đây là case study về một thử nghiệm thực tế của cá nhân mình: tự xây dựng một kênh TikTok từ A-Z. Hành trình này bao gồm tất cả các bước, từ nghiên cứu, sản xuất nội dung, xây dựng cộng đồng, và cuối cùng là thử nghiệm mô hình Affiliate Marketing để tạo ra sự chuyển đổi.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Cá nhân" },
        { "label": "Nền tảng", "value": "TikTok" },
        { "label": "Vai trò", "value": "Tất cả (One-person team)" },
        { "label": "Kết quả", "value": "1.1M+ views, 5.8K+ followers" }
      ],
      "content": "### Hành trình tư duy của mình\n\n**1. Giai đoạn 1: Nghiên cứu & Lên kế hoạch**\n\nTrước khi sản xuất bất kỳ video nào, mình đã dành thời gian để nghiên cứu sâu về ngách 'study vlog': các dạng content đang hiệu quả, thuật toán của TikTok hoạt động ra sao, và khán giả thực sự quan tâm đến điều gì. Giai đoạn này giúp mình định hình được 3 cột trụ nội dung chính: quá trình học tiếng Trung, phương pháp học tập, và review văn phòng phẩm.\n\n**2. Giai đoạn 2: Bền bỉ Sản xuất Nội dung**\n\nĐây là giai đoạn thử thách nhất. Mình đã tự lên ý tưởng, quay và dựng hơn **80 video** bằng Capcut. Quá trình này giúp mình hiểu rằng sự sáng tạo cần đi đôi với sự bền bỉ. Mỗi video là một cơ hội để thử nghiệm một ý tưởng mới, một cách kể chuyện mới.\n\n<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@_hoccungvy/video/7322060812648975634\" data-video-id=\"7322060812648975634\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"@_hoccungvy\" href=\"https://www.tiktok.com/@_hoccungvy?refer=embed\">@_hoccungvy</a> \uD83E\uDDD0\uD83E\uDDD0 <a title=\"desksetup\" target=\"_blank\" href=\"https://www.tiktok.com/tag/desksetup?refer=embed\">#desksetup</a> <a title=\"hoccungvy\" target=\"_blank\" href=\"https://www.tiktok.com/tag/hoccungvy?refer=embed\">#hoccungvy</a> <a title=\"hantu\" target=\"_blank\" href=\"https://www.tiktok.com/tag/hantu?refer=embed\">#hantu</a> <a title=\"chuhan\" target=\"_blank\" href=\"https://www.tiktok.com/tag/chuhan?refer=embed\">#chuhan</a> <a title=\"chinese\" target=\"_blank\" href=\"https://www.tiktok.com/tag/chinese?refer=embed\">#chinese</a> <a title=\"studychinese\" target=\"_blank\" href=\"https://www.tiktok.com/tag/studychinese?refer=embed\">#studychinese</a> <a title=\"hoctiengtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/hoctiengtrung?refer=embed\">#hoctiengtrung</a> <a title=\"tiengtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/tiengtrung?refer=embed\">#tiengtrung</a> <a title=\"chinesevocabulary\" target=\"_blank\" href=\"https://www.tiktok.com/tag/chinesevocabulary?refer=embed\">#chinesevocabulary</a> <a title=\"中文\" target=\"_blank\" href=\"https://www.tiktok.com/tag/%E4%B8%AD%E6%96%87?refer=embed\">#中文</a> <a title=\"汉语\" target=\"_blank\" href=\"https://www.tiktok.com/tag/%E6%B1%89%E8%AF%AD?refer=embed\">#汉语</a>  <a title=\"汉语学习\" target=\"_blank\" href=\"https://www.tiktok.com/tag/%E6%B1%89%E8%AF%AD%E5%AD%A6%E4%B9%A0?refer=embed\">#汉语学习</a> <a title=\"汉字\" target=\"_blank\" href=\"https://www.tiktok.com/tag/%E6%B1%89%E5%AD%97?refer=embed\">#汉字</a>  <a title=\"tuhoctiengtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/tuhoctiengtrung?refer=embed\">#tuhoctiengtrung</a>  <a title=\"họctiếngtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/h%E1%BB%8Dcti%E1%BA%BFngtrung?refer=embed\">#họctiếngtrung</a> <a title=\"tuvung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/tuvung?refer=embed\">#tuvung</a> <a title=\"tuvungtiengtrung\" target=\"_blank\" href=\"https://www.tiktok.com/tag/tuvungtiengtrung?refer=embed\">#tuvungtiengtrung</a> <a target=\"_blank\" title=\"♬ Nocturne (Piano Instrumental) [Originally Performed By Jay Chou] - 紀鈞瀚 (Bryan Chi)\" href=\"https://www.tiktok.com/music/Nocturne-Piano-Instrumental-7231101464348395521?refer=embed\">♬ Nocturne (Piano Instrumental) [Originally Performed By Jay Chou] - 紀鈞瀚 (Bryan Chi)</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>\n\n\n*Video viral 1.1 triệu lượt xem, minh chứng cho việc thấu hiểu khán giả.*\n\n**3. Giai đoạn 3: Tối ưu & Tăng trưởng**\n\nSau mỗi video, mình đều dành thời gian xem lại các chỉ số: lượt xem, lượt thích, bình luận, thời gian xem trung bình. Dữ liệu này giúp mình hiểu hơn về khán giả và tối ưu các video sau, từ cách đặt tiêu đề, chọn nhạc nền, đến việc sử dụng hashtag sao cho hiệu quả.\n\n**4. Giai đoạn 4: Tạo ra giá trị & Chuyển đổi**\n\nKhi kênh đạt 1.000 followers, mình bắt đầu thử nghiệm Affiliate Marketing. Đây là một bước quan trọng để kiểm chứng xem liệu sự yêu thích của khán giả có thể chuyển hóa thành hành động mua hàng hay không. Kết quả tích cực đã cho mình một bài học quý giá về việc xây dựng lòng tin và tạo ra giá trị thực tế.",
      "keyTakeaways": {
        "title": "Những điều mình tâm đắc nhất",
        "items": [
          "**Bài học về sự thấu hiểu:** Mình nhận ra content viral không đến từ sự may mắn, mà từ việc thực sự thấu hiểu 'nỗi đau' hoặc 'niềm vui' của khán giả và tạo ra nội dung giải quyết được điều đó.",
          "**Bài học về sự kiên trì:** Xây dựng một cộng đồng cần thời gian và sự bền bỉ. 80+ video chính là minh chứng cho thấy chỉ cần kiên trì, kết quả sẽ đến.",
          "**Bài học về phễu marketing:** Dự án này giúp mình trải nghiệm toàn bộ phễu marketing trong thực tế: từ tạo nhận diện (views), xây dựng cộng đồng (followers), đến chuyển đổi (affiliate sales). Đây là bài học quý giá nhất."
        ]
      }
    },
    {
      "slug": "pepsi-tvc-concept",
      "name": "Case Study: Hiện thực hóa Ý tưởng TVC",
      "designation": "Lên Kịch bản, Quay & Dựng phim",
      "categorySlug": "content",
      "quote": "Một ý tưởng hay trên giấy và một TVC hoàn chỉnh là hai thế giới khác nhau. Dự án này là hành trình thực tế của mình để đi từ thế giới này sang thế giới kia, với tất cả những thử thách của nó.",
      "src": "/images/project-pepsi-thumb.jpg",
      "heroImage": "/images/project-pepsi-thumb.jpg",
      "overview": "Đây là case study về quá trình hiện thực hóa một ý tưởng TVC quảng cáo cho Pepsi trong điều kiện thực tế của một nhóm sinh viên: nguồn lực giới hạn. Dự án này không chỉ là về kỹ năng quay dựng, mà còn là bài học về teamwork, sự linh hoạt và khả năng học hỏi từ những điều chưa hoàn hảo.",
      "details": [
        { "label": "Bối cảnh", "value": "Dự án Môn học" },
        { "label": "Thương hiệu", "value": "Pepsi (Concept)" },
        { "label": "Vai trò", "value": "Lên ý tưởng, Quay & Dựng phim" },
        { "label": "Thử thách", "value": "Nguồn lực & không gian giới hạn" }
      ],
      "content": "### Hành trình tư duy của mình\n\n**1. Thử thách: Từ ý tưởng đến hiện thực**\n\nTrong môn Quản trị Thương hiệu, thử thách đặt ra cho nhóm mình là tạo ra một TVC quảng cáo cho Pepsi. Vấn đề lớn nhất không phải là thiếu ý tưởng, mà là làm thế nào để biến ý tưởng đó thành một sản phẩm video cụ thể với kinh phí và các điều kiện thực tế của sinh viên.\n\n**2. Quá trình thực hiện**\n\n- **Lên ý tưởng kịch bản:** Bọn mình cùng nhau brainstorm để tìm ra một câu chuyện đơn giản nhưng phù hợp với tinh thần 'Sảng khoái' của Pepsi.\n- **Quay và phối hợp:** Đây là lúc mình học được nhiều nhất về teamwork. Để có những cảnh quay 'ăn ý', cả nhóm đã phải phối hợp và hỗ trợ nhau rất nhiều.\n- **Hậu kỳ và edit:** Mình đảm nhận phần hậu kỳ, cố gắng sử dụng các kỹ thuật edit trên Capcut để làm nổi bật sản phẩm và truyền tải được năng lượng của thương hiệu.\n\n**3. Sản phẩm cuối cùng**\n\n(Chèn video của bạn vào đây)\n\n### Nhìn lại và học hỏi\n\nDù TVC chưa hoàn hảo và còn nhiều sai sót do hạn chế về nguồn lực, quá trình này đã cho mình những bài học quý giá. Mình hiểu rằng, một sản phẩm thực tế luôn có những giới hạn, và điều quan trọng là cách chúng ta xoay sở và học hỏi từ chính những giới hạn đó. Sự góp ý của giảng viên và các bạn sau dự án là phần thưởng lớn nhất.",
      "keyTakeaways": {
        "title": "Những điều mình tâm đắc nhất",
        "items": [
          "**Bài học về sự linh hoạt:** Mình học được cách sáng tạo và tìm ra giải pháp trong điều kiện nguồn lực giới hạn, một kỹ năng quan trọng trong môi trường làm việc thực tế.",
          "**Bài học về teamwork:** Mình hiểu rằng để tạo ra một sản phẩm chung, việc giao tiếp và hỗ trợ lẫn nhau trong team quan trọng không kém gì kỹ năng cá nhân.",
          "**Bài học về việc tiếp thu phản hồi:** Mình nhận ra rằng những lời góp ý, dù chỉ ra sai sót, lại chính là cách nhanh nhất để mình tiến bộ và làm tốt hơn trong những lần sau."
        ]
      }
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
    "address": "P. An Khánh, Tp. Hồ Chí Minh",
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
      { "label": "Tiếng Anh", "tooltip": "TOEIC 650", "level": 3 },
      { "label": "Tiếng Trung", "tooltip": "HSK 3", "level": 2 }
    ]
  },
  "tools": {
    "items": [
      { "label": "MS Office", "level": 5 },
      { "label": "Canva", "level": 5 },
      { "label": "Capcut", "level": 5 }
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
        { "label": "Sáng tạo Nội dung", "level": 80 },
        { "label": "Tiếp thị Mạng xã hội", "level": 60 }
      ]
    },
    "softSkills": {
      "title": "Kỹ năng mềm",
      "items": [
        { "label": "Giao tiếp & Trình bày", "level": 70 },
        { "label": "Làm việc nhóm", "level": 70 }
      ]
    }
  },
  "educations": {
    "items": [
      {
        "university": "Trường Đại học Mở Thành phố Hồ Chí Minh",
        "major": "Marketing",
        "time": "2022 - Hiện tại",
        "gpa": 3.79,
        "desc": "* **GPA:** 3.79/4.0 (hiện tại).\n\n* **Các môn học nổi bật:** Quản trị Marketing (A+, 9.3), Quản trị Thương hiệu (A+, 9.8), Quảng cáo (A+, 9.3), Nghiên cứu Marketing (A+, 9.2), IMC (A+, 9.7).\n\n* **Thành tích:** Đạt học bổng KKHT 3/7 học kỳ.\n"
      },
      {
        "university": "Trường Đại học Y khoa Phạm Ngọc Thạch",
        "major": "Y đa khoa",
        "time": "2017 - 2021",
        "gpa": null,
        "desc": "* Quá trình giúp bản thân rèn luyện tư duy phân tích, sự tỉ mỉ, khả năng chịu áp lực và tinh thần trách nhiệm, trước khi tự xác định lại đam mê và quyết tâm theo đuổi lĩnh vực Marketing."
      }
    ]
  },
  "projects": {
    "resultLabel": "Kết quả đạt được:",
    "items": [
      {
        "in": "Dự án cá nhân",
        "name": "XÂY DỰNG & PHÁT TRIỂN KÊNH TIKTOK CÁ NHÂN VỀ \"STUDY VLOG\"",
        "desc": [
          "Link kênh: [@_hoccungvy]",
          "Nghiên cứu trends, thuật toán TikTok và hành vi người dùng trong ngách “study vlog”.",
          "Tự sản xuất 80+ video (lên ý tưởng, quay dựng, edit video bằng Capcut) về quá trình tự học tiếng Trung, chia sẻ kinh nghiệm học tập và truyền động lực.",
          "Quản lý lịch đăng bài, tối ưu hóa tiêu đề và áp dụng hashtag phù hợp để tối đa hóa lượt tiếp cận tự nhiên.",
          "Triển khai Affiliate Marketing sau khi đạt 1.000 followers, tạo ra nguồn thu nhập thụ động từ các sản phẩm văn phòng phẩm liên quan."
        ],
        "result": [
          "Phát triển kênh đạt 5.800+ followers và 113.000+ lượt thích.",
          "Sản xuất 1 video viral (1,1+ triệu lượt xem) và 14 video khác (>10.000 lượt xem).",
          "Tạo nguồn thu nhập thụ động thành công qua Affiliate Marketing, chứng minh khả năng chuyển đổi người xem thành người mua.",
          "Phát triển kỹ năng content video, edit video, nắm bắt xu hướng social."
        ]
      },
      {
        "in": "Môn học Marketing dịch vụ",
        "name": "LẬP KẾ HOẠCH MARKETING CHO TOUR DU LỊCH CỦA SAIGONTOURIST",
        "desc": [
          "Dự án nhóm - Độc lập phụ trách toàn bộ phần nội dung và thiết kế Chiến lược Promotion.",
          "Đề xuất Insight, Big Idea và Slogan, tạo nền tảng cốt lõi cho toàn bộ chiến dịch.",
          "Biên soạn nội dung truyền thông đa kênh (OOH, Digital, Social Media, Event & PR). Lập kế hoạch cho sự kiện “Ra mắt trải nghiệm du lịch thực tế ảo” giả định.",
          "Trực tiếp thiết kế các ấn phẩm marketing cho chiến dịch: Poster, Brochure, Flyer, Billboard."
        ],
        "result": [
          "Thực hiện quy trình hoàn chỉnh từ lên chiến lược đến thực thi.",
          "Nắm vững cách phối hợp và triển khai thông điệp nhất quán trên đa kênh.",
          "Thiết kế thành công bộ ấn phẩm marketing đồng nhất, sẵn sàng cho các chiến dịch thực tế."
        ]
      },
      {
        "in": "Môn học IMC",
        "name": "XÂY DỰNG KẾ HOẠCH TRUYỀN THÔNG MARKETING TÍCH HỢP",
        "desc": [
          "Cùng nhóm phác thảo chương trình IMC hoàn chỉnh cho sản phẩm Bia Saigon Lager của công ty SABECO cho mùa tết Bính Ngọ 2026.",
          "Đề xuất Insight “Cùng bia Saigon Lager tri an và tiếp sức cho những làng nghề truyền thống Việt”, định hướng thông điệp cốt lõi cho chiến dịch.",
          "Lên ý tưởng, thiết kế bao bì và xây dựng câu chuyện cho bộ sưu tập quà tặng “Bia Saigon Thất Tửu”.",
          "Điều phối, phân công nhiệm vụ và chuẩn bị hậu cần cho sự kiện tài trợ giả định trên lớp."
        ],
        "result": [
          "Tham gia tạo ra bản kế hoạch IMC toàn diện, xây dựng chiến dịch có chiều sâu văn hóa.",
          "Thể hiện kỹ năng điều phối và làm việc nhóm hiệu quả."
        ]
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
  "navbar": {
    "about": "我的故事",
    "resume": "我的旅程",
    "portfolio": "精选项目",
    "downloadCV": "下载简历",
    "name": "张阮\n庆玹",
    "initials": "KH",
    "close": "关闭"
  },
  "home": {
    "greeting": "你好，",
    "introduction": "我是 Khánh Huyền",
    "name": "Khánh Huyền.",
    "subheading": "一位用...打造故事的讲述者",
    "description": "对我而言，市场营销不仅是数字，更是一门艺术——讲述触动人心的故事，建立真诚的连接，并为品牌创造可持续的价值。让我们一起探索吧！",
    "cta": "探索我的项目",
    "wordRotate": [
      "创意",
      "数据",
      "共情"
    ]
  },
  "projectDetail": {
    "backToProjects": "返回项目列表",
    "projectNotFound": "哎呀，找不到项目！",
    "projectNotFoundMessage": "您寻找的项目似乎不在这里。请返回并探索其他精彩故事吧。"
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
  "pageTitle": "创意实现之地",
  "exploreProject": "探索项目详情",
  "noProjectsFound": "此类别下当前没有项目。",
  "categories": [
    { "name": "全部", "slug": "all" },
    { "name": "内容创作与故事叙述", "slug": "content" },
    { "name": "研究与策略", "slug": "strategy" },
    { "name": "数字渠道执行", "slug": "digital" }
  ],
  "projects": [
    {
      "slug": "case-study-tiktok-the-marketing-brew",
      "name": "案例研究：“营销小酒馆” TikTok 频道",
      "designation": "频道创建与增长",
      "categorySlug": "content",
      "quote": "我相信，通过视觉化的方式讲述知识会更引人入胜。这是我将枯燥的营销教科书变成生动短视频的旅程。",
      "src": "/images/project-3.jpg",
      "heroImage": "/images/project-tiktok-hero.jpg",
      "overview": "关于我个人从零到一建立一个营销主题TikTok频道的详细案例研究。该项目展示了从策略制定、视频内容制作到效果分析以优化和增长频道的全方位能力。",
      "details": [
        { "label": "背景", "value": "个人项目" },
        { "label": "我的角色", "value": "创意策划、内容制作、数据分析" },
        { "label": "使用工具", "value": "剪映、Canva、TikTok数据分析" },
        { "label": "关键成果", "value": "视频观看量突破10,000次" }
      ],
      "content": "### 我为自己设定的挑战\n\n作为一名市场营销专业的学生，我发现许多专业知识相当枯燥，对新手来说难以入门。我问自己：“如何将复杂的理论转化为在TikTok平台上易于理解、贴近生活且引人入胜的内容？”“营销小酒馆”这个频道就是为了回答这个问题而诞生的。\n\n### 我的解决方案\n\n我的旅程分为三个主要阶段：\n\n**1. 第一阶段：内容策略规划**\n\n*   **目标受众：** 市场营销、经济学专业的学生，或任何对该领域感到好奇的人。\n*   **内容支柱：** 我确定了三大内容方向，以保持频道的多元化：\n    *   `术语解码：` 解释“洞察”、“SWOT”、“品牌定位”等概念的短视频。\n    *   `迷你案例研究：` 在1分钟内快速分析知名的营销活动。\n    *   `技巧与窍门：` 分享营销人的学习技巧和实用工具。\n\n**2. 第二阶段：制作与创意**\n\n所有视频都遵循一个简单的流程：撰写脚本 -> 用手机拍摄 -> 使用剪映进行剪辑和添加特效 -> 使用Canva设计封面图。我专注于保持视频节奏快、字幕清晰和配乐时尚。\n\n<img src=\"/images/tiktok-video-1.jpg\" alt=\"案例分析视频示例\">\n*我频道上一个案例分析视频的界面。*\n\n**3. 第三阶段：分析与复盘**\n\n这是最关键的阶段。每个视频发布后，我都会在TikTok数据分析后台跟踪各项指标。我发现：\n\n*   清单体裁的视频（例如“3个...的误区”）的复看率更高。\n*   用视频回复观众评论能显著提高互动率。\n*   晚上7点到9点发布视频对我的观众群体效果最好。\n\n得益于持续的优化，我的一个视频有幸获得了超过10,000次观看，帮助频道吸引了第一批高质量的粉丝。"
    },
    {
      "slug": "campaign-the-coffee-house-an-yen",
      "name": "“片刻安 Yên” - The Coffee House 内容营销活动",
      "designation": "品牌内容创作（概念）",
      "categorySlug": "content",
      "quote": "品牌如何不仅销售产品，更能成为顾客的伙伴？我尝试通过为The Coffee House策划的一个概念性活动来回答这个问题。",
      "src": "/images/project-4.jpg",
      "heroImage": "/images/project-tch-hero.jpg",
      "overview": "这是我为了展示为大品牌构思和制作内容的能力而进行的一个概念性项目。目标是通过一个有意义的内容营销活动，帮助The Coffee House加强与Z世代消费者的情感连接。",
      "details": [
        { "label": "背景", "value": "概念性项目" },
        { "label": "品牌", "value": "The Coffee House" },
        { "label": "目标", "value": "增强与Z世代的情感连接" },
        { "label": "渠道", "value": "Instagram, Facebook" }
      ],
      "content": "### 背景与核心创意\n\nZ世代是The Coffee House的主要客户群体，他们经常面临学习和工作的压力，寻求“治愈系”的空间和时刻。\n\n**核心创意：** The Coffee House不仅卖咖啡，更提供**“片刻安 Yên”**——一个在喧嚣中让你放慢脚步、与自己对话的空间和时刻。\n\n### 执行产出示例\n\n我为这个活动草拟了一些核心内容：\n\n**1. 视觉与帖子设计（使用Canva制作）**\n\n采用温暖、柔和的色调和手写字体。图片聚焦于咖啡馆的安静角落、一杯咖啡旁的沉思瞬间，而非单纯的产品特写。\n\n<img src=\"/images/tch-post-1.jpg\" alt=\"The Coffee House 帖子设计1\">\n*活动帖子设计示例，侧重于情感和氛围。*\n\n**2. 文案与语调**\n\n语调充满同理心，像朋友一样分享。内容不催促购买，而是引发思考。\n\n*   **帖子示例1：**\n    *   *视觉：* 阳光洒进咖啡馆的一角。\n    *   *文案：* “有时候，我们只需要一个熟悉的小角落，一首无人声的曲子，和一杯恰到好处的咖啡。给自己片刻的休憩。#片刻安Yên #TheCoffeeHouse”\n*   **帖子示例2：**\n    *   *视觉：* 一只手在日记本上写字的特写。\n    *   *文案：* “把纷乱的思绪写进纸页，让疲惫溶入咖啡的苦涩。今天你还好吗？#治愈 #TheCoffeeHouse”\n\n**3. Instagram Story 创意**\n\n创建互动式快拍系列以增强连接：\n\n*   **投票：** “今天你的‘安 yên’角落是？” (A: 一本好书 / B: 一个新歌单)\n*   **问答：** “和我们分享一首你用来‘充电’的歌吧！”\n*   **测验：** “测测哪款饮品最符合你现在的心情。”"
    },
    {
      "slug": "imc-plan-danh-thuc-ban-sac-viet",
      "name": "整合营销传播方案：“唤醒越南本色”",
      "designation": "整合营销策略规划",
      "categorySlug": "strategy",
      "quote": "一个好的策略就像一张地图，指引所有营销活动朝同一个方向前进。这个项目是我第一次亲手绘制这张地图。",
      "src": "/images/project-1.jpg",
      "heroImage": "/images/project-imc-hero.jpg",
      "overview": "这是我投入大量心血的一个课程项目，我为一个虚拟品牌构建了一个完整的整合营销传播（IMC）方案。该项目展示了我的分析能力、战略思维以及如何逻辑地组合各种营销工具。",
      "details": [
        { "label": "背景", "value": "课程项目" },
        { "label": "我的角色", "value": "策略规划师" },
        { "label": "展示技能", "value": "分析、规划、整合营销思维" },
        { "label": "成绩", "value": "A+" }
      ],
      "content": "### 品牌挑战\n\n一个越南时尚品牌在国内外品牌饱和的市场中难以脱颖而出。问题在于，如何让这个品牌找到自己独特的声音，并与热爱越南文化的年轻人建立连接。\n\n### 我的战略思维流程\n\n我通过一个四步流程来解决这个问题：\n\n1.  **3C分析（公司 - 顾客 - 竞争对手）：**\n    *   **公司：** 识别出其核心优势在于传统材质。\n    *   **顾客：** 描绘目标顾客画像——为越南文化感到自豪但需要现代设计的年轻人。\n    *   **竞争对手：** 分析竞争对手并指出市场“空白”。\n\n2.  **寻找洞察（Insight）：**\n    *   我发现了一个洞察：*“越南年轻人希望表达自己的文化认同，但他们害怕被视为‘老土’或‘俗气’。”*\n\n3.  **构建核心创意（Big Idea）：**\n    *   基于以上洞察，我构建了核心创意：**“在每一次现代律动中，唤醒越南本色。”**\n\n4.  **多渠道执行计划：**\n    *   **社交媒体：** 发布一系列结合服装与当代越南建筑背景的造型照。\n    *   **公关与影响者：** 与文化艺术领域的KOL合作，传播品牌故事。\n    *   **线下活动：** 组织一个关于如何用传统材质搭配现代服装的小型工作坊。\n\n### 我最自豪的一点\n\n这个项目让我深刻理解到，一个成功的营销活动不仅仅是一系列孤立的行动，而必须是由一个统一的核心创意协调而成的一曲交响乐。"
    },
    {
      "slug": "cx-analysis-coolmate",
      "name": "Coolmate 客户体验（CX）分析",
      "designation": "用户体验研究与优化",
      "categorySlug": "strategy",
      "quote": "每一次点击都隐藏着一个故事，一种用户的情感。在这个项目中，我尝试‘阅读’这些故事，以找到让购物之旅更顺畅的方法。",
      "src": "/images/project-2.jpg",
      "heroImage": "/images/project-coolmate-hero.jpg",
      "overview": "在课堂电子商务分析项目的基础上，我为Coolmate网站进行了一次更深入的客户体验（CX）分析。我绘制了客户旅程图，指出了“痛点”，并提出了具体的优化解决方案。",
      "details": [
        { "label": "背景", "value": "由课程项目发展而来" },
        { "label": "品牌", "value": "Coolmate.me" },
        { "label": "方法", "value": "客户旅程图绘制" },
        { "label": "目标", "value": "提出转化率优化建议" }
      ],
      "content": "### 目标\n\n我将自己置于Coolmate顾客的位置，旨在找出在购物过程中可能导致用户犹豫、不满或放弃购物车的环节，并据此提出改进建议。\n\n### 客户旅程图（Customer Journey Map）\n\n我构建了一个虚拟用户画像（男，22岁，学生）并跟随他的旅程：\n\n*   **第一阶段：认知（Awareness）**\n    *   *行为：* 在Facebook上看到Coolmate的广告。\n    *   *良好触点：* 广告创意新颖，信息明确。\n\n*   **第二阶段：考虑（Consideration）**\n    *   *行为：* 点击进入网站，搜索T恤。\n    *   *良好触点：* 详细的产品筛选器，高质量的产品图片。\n    *   **痛点（Pain Point）：** 关于60天退货政策的信息在产品页面上不够突出。\n\n*   **第三阶段：购买（Purchase）**\n    *   *行为：* 加入购物车并进行结算。\n    *   *良好触点：* 购物车界面简洁。\n    *   **痛点（Pain Point）：** 强制注册账户的步骤略多，可能会让首次购买者感到沮丧。\n\n*   **第四阶段：购后（Post-Purchase）**\n    *   *行为：* 收到确认邮件。\n    *   *良好触点：* 邮件专业，信息完整。\n\n### 我的建议\n\n针对已发现的“痛点”，我提出了3个解决方案：\n\n1.  **优化产品页面：** 在“加入购物车”按钮附近添加一个小横幅或醒目的图标，以强调“60天免费退换”政策。\n2.  **优化结算流程：** 允许用户以“访客”身份结算而无需创建账户，或集成通过Google/Facebook快速登录。\n3.  **增强信任感：** 在产品页面上直接添加客户评价部分，为新买家提供更多决策依据。"
    },
    {
      "slug": "meta-ads-workshop-marketing-101",
      "name": "“营销101”工作坊 Meta 广告活动",
      "designation": "数字广告执行（概念）",
      "categorySlug": "digital",
      "quote": "如何以最优成本将你的信息传递给最需要的人？这个项目是我在Meta平台上实践广告艺术的练习。",
      "src": "/images/project-1.jpg",
      "heroImage": "/images/project-meta-ads-hero.jpg",
      "overview": "一个详细的概念性项目，旨在为一个虚构的营销工作坊设计一个在Meta（Facebook和Instagram）上的广告活动。项目涵盖了受众定位、广告创意设计、文案撰写以及一个简单的转化漏斗规划。",
      "details": [
        { "label": "背景", "value": "概念性项目" },
        { "label": "平台", "value": "Meta (Facebook & Instagram)" },
        { "label": "目标", "value": "吸引100名工作坊报名者" },
        { "label": "假设预算", "value": "2,000,000 越南盾" }
      ],
      "content": "### 执行计划\n\n为了吸引100名学生报名“学生营销101”工作坊，我草拟了以下广告计划：\n\n**1. 受众定位（Targeting）**\n\n我将在Meta广告管理工具中创建一个详细的受众群体：\n\n*   **地区：** 胡志明市，河内。\n*   **年龄：** 18 - 22岁。\n*   **人口统计：** 在读大学生。\n*   **兴趣：** 市场营销、Brands Vietnam、Advertising Vietnam、菲利普·科特勒、数字营销、内容营销。\n\n**2. 广告创意（Ad Creative）**\n\n我设计了两种格式进行A/B测试：\n\n*   **图片格式（使用Canva）：** 一张海报式设计，以引人注目的方式提供所有关键信息（讲师、时间、地点、核心收益）。\n*   **短视频格式（使用剪映）：** 一个15秒的视频，配以动态文字效果，突出不容错过工作坊的3个理由，并配上动感的背景音乐。\n\n<img src=\"/images/meta-ads-creative.jpg\" alt=\"工作坊的广告创意\">\n*我设计的图片格式广告创意。*\n\n**3. 广告文案（Ad Copy）**\n\n我也写了两个版本的文案进行测试：\n\n*   **版本1（聚焦收益）：** “简历空空？对营销行业感到迷茫？‘营销101’工作坊将帮助你从大一开始就打下坚实基础，明确职业方向！立即了解...”\n*   **版本2（制造稀缺）：** “早鸟优惠仅剩20个名额！立即报名‘营销101’工作坊，与行业专家会面，并获得全套独家资料。名额有限，报满即止！”\n\n**4. 转化漏斗**\n\n用户流程如下：在Facebook/Instagram上看到广告 -> 点击链接 -> 跳转至落地页（包含详细信息和报名表） -> 填写表单 -> 收到报名成功确认邮件。"
    },
    {
      "slug": "influencer-marketing-cocoon",
      "name": "Cocoon 影响者合作计划",
      "designation": "影响者营销执行（概念）",
      "categorySlug": "digital",
      "quote": "选择合适的故事讲述者和拥有一个好故事同样重要。这是我为像Cocoon这样的纯素品牌寻找合适‘故事讲述者’的方式。",
      "src": "/images/project-2.jpg",
      "heroImage": "/images/project-cocoon-hero.jpg",
      "overview": "一个为Cocoon推出新产品系列而制定的影响者营销计划的概念性项目。该项目展示了对越南KOC/KOL市场的敏锐度、分析和选择合适影响者的能力，以及撰写专业合作简报的技巧。",
      "details": [
        { "label": "背景", "value": "概念性项目" },
        { "label": "品牌", "value": "Cocoon Vietnam" },
        { "label": "目标", "value": "提升新产品认知度与试用率" },
        { "label": "平台", "value": "TikTok, Instagram, YouTube" }
      ],
      "content": "### 问题\n\nCocoon即将推出以蝶豆花提取物为特色、主打抗衰老功效的新产品系列。如何最自然有效地传播信息并建立用户信任？\n\n### 我的影响者策略\n\n我提出了一个结合三类影响者的策略，以创造多层次的效应：\n\n**1. 影响者分类与选择**\n\n*   **第一类：美妆博主（头部影响者）：**\n    *   *目的：* 为产品创造广泛的覆盖面和信誉。\n    *   *建议人选：* **Trinh Pham, Primmy Truong.**\n    *   *理由：* 他们在化妆品领域有深厚的专业知识，其庞大的粉丝群体信任他们的评测。\n*   **第二类：生活方式视频博主（中腰部影响者）：**\n    *   *目的：* 将产品融入日常生活场景，增加亲和力。\n    *   *建议人选：* **Helly Tống, Hana's Lexis.**\n    *   *理由：* 他们追求绿色、可持续的生活方式，与Cocoon的核心价值观完美契合。\n*   **第三类：TikTok上的KOC（微型影响者）：**\n    *   *目的：* 通过真实、不加修饰的评测来推动购买决策。\n    *   *建议人选：* **Call Me Duy, 皮肤科医生Hoa Cúc.**\n    *   *理由：* 他们简短、直接的评测视频转化率非常高。\n\n**2. 发送给影响者的合作简报模板**\n\n为确保影响者准确传达信息，我起草了一份包含以下主要内容的简报模板：\n\n*   **关于活动：** 介绍新产品系列和核心信息：“源自越南自然的青春守护”。\n*   **内容要求：**\n    *   **必须包含（Mandatory）：** 拍摄开箱视频，展示面霜/精华的质地特写，分享使用7天后的感受。\n    *   **需强调的信息：** 100%纯素成分，无动物实验，蝶豆花的抗氧化功效。\n    *   **活动标签：** #Cocoon #DauBiecThanhXuan #MyPhamThuanChay\n*   **注意事项（Do's & Don'ts）：**\n    *   **不要（Don't）：** 与竞争对手产品直接比较，承诺使用一次即有100%效果。\n    *   **要做（Do）：** 真实地分享个人故事和体验。\n*   **时间与权益：** 明确说明发文截止日期和相关合作权益。"
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
  "scanMessage": "扫描查看我的作品集！",
  "header": {
    "firstName": "庆玄",
    "lastName": "张阮",
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
    "skills": "专业技能",
    "languages": "语言能力",
    "tools": "工具技能",
    "education": "教育背景",
    "projects": "项目经历",
    "certifications": "所获证书"
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
        "label": "Canva & 剪映",
        "level": 4
      },
      {
        "label": "Adobe CS (PS/AI)",
        "level": 2
      },
      {
        "label": "谷歌分析",
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
import { About } from "@/pages/About.tsx";

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
        path: "about",
        element: <About />,
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
    *   `src/types/cv.ts`
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
    *   `src/components/ui/gradient-text.tsx`
    *   `src/pages/Portfolio.tsx`
    *   `src/components/common/ProjectCarousel.tsx`
    *   `src/components/ui/scroll-area.tsx`
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
    *   `src/pages/About.tsx`

---

### Phân tích file: `src/pages/About.tsx`

#### Nội dung file

```tsx
import { Container } from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
// THÊM MỚI: Các icon phù hợp hơn
import { BrainCircuit, PenSquare, ClipboardCheck } from "lucide-react";

// Sub-component cho các thẻ năng lực
const ApproachCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
    <div className="bg-primary-100 text-primary-600 flex h-10 w-10 items-center justify-center rounded-full">
      {icon}
    </div>
    <h3 className="mt-2 font-semibold text-neutral-800">{title}</h3>
    <p className="text-neutral-600">{desc}</p>
  </div>
);

export const About = () => {
  const { t } = useTranslation("common");

  const approachItems = t("about.approach.items", {
    returnObjects: true,
  }) as any[];

  return (
    <Container className="py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 md:gap-24">
        {/* === HỒI 1: CÂU CHUYỆN NỀN TẢNG === */}
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-16">
          {/* Ảnh bên trái */}
          <div className="w-96 shrink-0">
            <img
              src="/avatar.png"
              alt="Portrait of Khanh Huyen"
              className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-lg"
            />
          </div>
          {/* Nội dung bên phải */}
          <div className="order-2 flex flex-col gap-4 md:order-2">
            <span className="text-primary-500 font-serif text-2xl">
              {t("about.pageTitle")}
            </span>
            <h1 className="mt-2 font-serif text-4xl font-medium text-neutral-700">
              {t("about.story.title")}
            </h1>
            <div className="prose prose-lg mt-4 max-w-none text-neutral-600">
              <ReactMarkdown>{t("about.story.content")}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* === HỒI 2: CÁCH TIẾP CẬN MARKETING === */}
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-neutral-50 p-8 md:p-12">
          <h2 className="text-center font-serif text-3xl font-medium text-neutral-700">
            {t("about.approach.title")}
          </h2>
          <p className="max-w-xl text-center text-lg text-neutral-600">
            {t("about.approach.intro")}
          </p>
          <div className="mt-6 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <ApproachCard
              icon={<BrainCircuit size={20} />}
              title={approachItems[0].title}
              desc={approachItems[0].desc}
            />
            <ApproachCard
              icon={<PenSquare size={20} />}
              title={approachItems[1].title}
              desc={approachItems[1].desc}
            />
            <ApproachCard
              icon={<ClipboardCheck size={20} />}
              title={approachItems[2].title}
              desc={approachItems[2].desc}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/components/common/Container.tsx`
    *   `src/lib/utils.ts`

---

### Phân tích file: `src/pages/Home.tsx`

#### Nội dung file

```tsx
import { motion, Variants } from "framer-motion"; // <-- GIỮ LẠI Variants vì chúng ta sẽ dùng nó
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { GradientText } from "@/components/ui/gradient-text";
// LOẠI BỎ: import ReactMarkdown không được sử dụng

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
    <Container className="flex h-screen max-h-screen items-center">
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

```

#### Mối quan hệ

*   **Imports:**
    *   `src/components/ui/button.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/common/Container.tsx`
    *   `src/components/ui/gradient-text.tsx`

---

### Phân tích file: `src/pages/Portfolio.tsx`

#### Nội dung file

```tsx
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
    <Container heading={t("pageTitle")} className="items-center justify-start">
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

```

#### Mối quan hệ

*   **Imports:**
    *   `src/components/common/Container.tsx`
    *   `src/lib/utils.ts`
    *   `src/components/common/ProjectCarousel.tsx`
    *   `src/components/ui/button.tsx`
    *   `src/components/ui/scroll-area.tsx`
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
        "prose prose-printable prose-neutral relative mx-auto grid h-[396mm] w-[280mm] max-w-none grid-cols-[1fr_2.2fr] grid-rows-[1fr_6fr] gap-x-8 p-4 pr-6 shadow-lg"
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
        <Skills />

        {/*<Certifications />*/}
      </div>
      <div className={"prose-ul:pl-3 relative"}>
        <Projects />
        {/*<Skills />*/}
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
    *   `src/types/cv.ts`
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
import { ArrowLeft, CheckCircle2 } from "lucide-react";
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

const KeyTakeawaysSection = ({
  takeaways,
}: {
  takeaways: Project["keyTakeaways"];
}) => {
  if (!takeaways || !takeaways.items || takeaways.items.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 rounded-2xl bg-neutral-50 p-8 md:p-12">
      <h3 className="text-center font-serif text-3xl font-medium text-neutral-700">
        {takeaways.title}
      </h3>
      <ul className="mt-8 flex flex-col gap-4">
        {takeaways.items.map((item, index) => (
          <li key={index} className="flex items-start gap-4 text-lg">
            <CheckCircle2 className="text-primary-500 mt-1 h-6 w-6 flex-shrink-0" />
            <span className="text-neutral-600">
              <ReactMarkdown components={{ p: "span" }}>{item}</ReactMarkdown>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation(["portfolio", "common"]);

  const projectsData = t("portfolio:projects", {
    returnObjects: true,
  }) as Project[];
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
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
            className="absolute inset-0 bg-cover bg-center blur-sm brightness-95 filter"
            style={{ backgroundImage: `url('${project.heroImage}')` }}
          ></div>

          {/* Lớp Phủ Tối */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Lớp Nội dung */}
          <div className="relative flex h-full w-full flex-col items-center justify-center px-8 text-center text-white">
            <p className="text-primary-200 text-sm font-semibold tracking-widest uppercase">
              {project.designation}
            </p>
            <h1 className="mt-4 font-serif text-5xl whitespace-pre-line md:text-7xl">
              {project.name}
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl text-neutral-800">
                {t("overview")}
              </h2>
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
                    <span className="text-end whitespace-pre-line text-neutral-500">
                      {detail.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* === THAY ĐỔI QUAN TRỌNG Ở ĐÂY === */}
          <div className="prose-lg prose prose-img:rounded-xl prose-img:shadow-md prose-h3:font-serif prose-h3:text-neutral-800 mt-16 max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                img: (props) => (
                  <div className={"flex flex-col items-center"}>
                    <img
                      src={props.src}
                      className={"!mb-0 lg:w-4/5"}
                      alt={props.alt}
                    />
                    <figcaption className={"mb-8 text-center italic"}>
                      {props.alt}
                    </figcaption>
                  </div>
                ),
              }}
            >
              {project.content}
            </ReactMarkdown>
          </div>
          <KeyTakeawaysSection takeaways={project.keyTakeaways} />
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
import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import { MagnetizeButton } from "@/components/ui/magnetize-button.tsx";

export const WebCV = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const { t } = useTranslation();

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
    <Container className="flex flex-col items-center justify-center gap-12">
      <a
        href={"/truong-nguyen-khanh-huyen-cv.pdf"}
        className={"mx-auto cursor-pointer"}
      >
        <MagnetizeButton particleCount={14} attractRadius={50} />
      </a>
      <div
        ref={containerRef}
        className="!border-primary-100 relative aspect-[210/297] w-full max-w-[210mm]"
      >
        <div
          className="border-primary-100 absolute top-0 left-0"
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
    *   `src/types/cv.ts`
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
    *   `src/components/ui/button.tsx`
    *   `src/components/ui/magnetize-button.tsx`

---

### Phân tích file: `src/types/cv.ts`

#### Nội dung file

```ts
// =================================================================
// CÁC INTERFACE ĐƠN LẺ (ITEMS)
// =================================================================

/** Một mục trong danh sách Ngoại ngữ */
export interface LanguageItem {
  label: string;
  tooltip: string;
  level: number;
}

/** Một mục trong danh sách Công cụ */
export interface ToolItem {
  label: string;
  level: number;
}

/** Một mục trong danh sách Kỹ năng */
export interface SkillItem {
  label: string;
  level: number;
}

/** Một mục trong danh sách Học vấn */
export interface EducationItem {
  university: string;
  major: string;
  time: string;
  gpa: number | null;
  desc: string;
  achievements?: string[]; // Thêm thuộc tính này, là optional
}

/** Một mục trong danh sách Dự án */
export interface ProjectItem {
  in: string;
  name: string;
  desc: string[];
  result: string[]; // Sửa từ string sang string[]
}

// =================================================================
// CÁC INTERFACE NHÓM (CATEGORIES & DATA SECTIONS)
// =================================================================

/** Dữ liệu cho một nhóm kỹ năng (cứng hoặc mềm) */
export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

/** Dữ liệu cho toàn bộ phần Tiêu đề các mục */
export interface HeadingData {
  aboutMe: string;
  skills: string;
  languages: string;
  tools: string;
  education: string;
  projects: string;
  certifications: string;
}

/** Dữ liệu cho phần Header (tên, vị trí) */
export interface HeaderData {
  firstName: string;
  lastName: string;
  position: string;
}

/** Dữ liệu cho phần Liên hệ */
export interface ContactData {
  birthYear: string;
  phone: string;
  email: string;
  address: string;
  portfolio: string;
}

/** Dữ liệu cho phần Giới thiệu */
export interface AboutMeData {
  summary: string;
}

/** Dữ liệu cho phần Kỹ năng */
export interface SkillsData {
  hardSkills: SkillCategory;
  softSkills: SkillCategory;
}

/** Dữ liệu cho phần Học vấn */
export interface EducationsData {
  items: EducationItem[];
}

/** Dữ liệu cho phần Dự án */
export interface ProjectsData {
  resultLabel: string;
  items: ProjectItem[];
}

/** Dữ liệu cho phần Ngoại ngữ */
export interface LanguagesData {
  items: LanguageItem[];
}

/** Dữ liệu cho phần Công cụ */
export interface ToolsData {
  items: ToolItem[];
}

/** Dữ liệu cho phần Chứng chỉ */
export interface CertificationsData {
  items: string[];
}

// =================================================================
// INTERFACE TỔNG CHO TOÀN BỘ CV
// =================================================================

export interface CVData {
  scanMessage: string;
  header: HeaderData;
  contact: ContactData;
  heading: HeadingData;
  aboutMe: AboutMeData;
  languages: LanguagesData;
  tools: ToolsData;
  certifications: CertificationsData;
  skills: SkillsData;
  educations: EducationsData;
  projects: ProjectsData;
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

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
  embedCode?: string;
  keyTakeaways: {
    title: string;
    items: string[];
  };
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

