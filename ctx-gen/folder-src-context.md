# Ngữ cảnh cho thư mục: src

## PHẦN A: PHÂN TÍCH CÁC FILE MỤC TIÊU

Phần này phân tích chi tiết các file được yêu cầu ban đầu.

### Phân tích file: `src/components/common/Container.tsx`

#### Nội dung file

```tsx
import { ReactNode } from "react";
import { motion } from "framer-motion"; // Sửa import
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

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, -0.05, 0.95], // Một ease function mượt mà
      delay: 0.2,
    },
  },
};

export const Container = ({
  heading,
  children,
  className,
}: {
  heading?: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={cn("flex min-h-screen flex-col items-center p-8", className)}
    >
      {heading && (
        <div className="mb-16 flex w-full max-w-6xl flex-col items-center">
          <motion.h1
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center font-serif text-4xl font-medium text-neutral-800 lg:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h1>
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-primary-400 mt-4 h-0.5 w-24 origin-center"
          />
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

### Phân tích file: `src/components/common/CustomCursor.tsx`

#### Nội dung file

```tsx
// src/components/common/CustomCursor.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLAnchorElement ||
        e.target instanceof HTMLButtonElement
      ) {
        setIsHoveringLink(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLAnchorElement ||
        e.target instanceof HTMLButtonElement
      ) {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      scale: 1,
      backgroundColor: "var(--color-primary-400)",
      mixBlendMode: "difference",
    },
    hover: {
      x: position.x - 24,
      y: position.y - 24,
      scale: 2,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference",
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 h-4 w-4 rounded-full"
      variants={cursorVariants}
      animate={isHoveringLink ? "hover" : "default"}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
};

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/components/common/Navbar.tsx`

#### Nội dung file

```tsx
import { NavLink } from "react-router";
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

const langs = [
  {
    key: "vi",
    label: "VI",
  },
  {
    key: "en",
    label: "EN",
  },
  {
    key: "zh",
    label: "ZH",
  },
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
  { label: "navbar.resume", slug: "/cv" },
];

const socialMedias = [
  {
    icon: <SiFacebook className={"size-5"} />,
    link: "https://facebook.com",
  },
  {
    icon: <SiTiktok className={"size-5"} />,
    link: "https://linkedln.com",
  },
];

export const Background = () => {
  return (
    <div className="absolute inset-0 top-0 bottom-0 -z-20 bg-[url('/background.svg')] bg-cover opacity-10">
      <div className={""}></div>
    </div>
  );
};

export const NavbarContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <Background />
      <div className={"flex w-full grow flex-col items-center gap-4"}>
        <LanguageSwitcher />
        <div
          className={"h-32 w-32 rounded-full bg-[url('/avatar.png')] bg-cover"}
        />
        <div className={"text-center text-4xl leading-tight font-bold"}>
          Khánh
          <br />
          Huyền
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
            <div
              key={socialMedia.link}
              className={
                "hover:bg-primary-50 hover:border-primary-200 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border duration-75"
              }
            >
              {socialMedia.icon}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const Navbar = () => {
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
        className={"flex h-full items-center justify-between px-2 lg:hidden"}
      >
        <div>KH</div>
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <NavbarContent />
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
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

### Phân tích file: `src/components/common/ProjectCard.tsx`

#### Nội dung file

```tsx
// src/components/common/ProjectCard.tsx

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string; // Thay description bằng category ngắn gọn
  imageUrl: string;
  index: number;
}

// Animation variants cho card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export const ProjectCard = ({
  title,
  category,
  imageUrl,
  index,
}: ProjectCardProps) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl"
    >
      {/* Lớp ảnh nền */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
        />
      </div>

      {/* Lớp màu phủ gradient để chữ dễ đọc */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {/* Lớp nội dung text */}
      <div className="relative flex h-full flex-col justify-end p-6 text-white">
        {/* Category - Xuất hiện ngay */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
          className="text-primary-200 text-sm font-medium tracking-widest uppercase"
        >
          {category}
        </motion.p>

        {/* Title - Xuất hiện ngay */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
          className="mt-2 font-serif text-3xl leading-tight font-medium lg:text-4xl"
        >
          {title}
        </motion.h3>

        {/* Dòng "View Project" - Chỉ xuất hiện khi hover */}
        <div className="mt-4 overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            whileHover="hover"
            animate={{ y: "100%" }}
            className="flex items-center gap-2 text-base font-semibold transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-[-100%]"
          >
            <span>View Project</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.div>
        </div>
      </div>
    </motion.div>
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
      "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] font-bold leading-none [filter:url(#threshold)_blur(0.6px)] lg:h-24 lg:text-[6rem]",
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

### Phân tích file: `src/components/ui/circular-testimonials.tsx`

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
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
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

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
    // const zIndex = testimonialsLength - Math.abs(offset);
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
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
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        {/* Images */}
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              className="testimonial-image"
              data-index={index}
              style={getImageStyle(index)}
            />
          ))}
        </div>
        {/* Content */}
        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="name"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="designation"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <motion.p
                className="quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <div className="arrow-buttons">
            <button
              className="arrow-button prev-button"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
            >
              <FaArrowLeft size={28} color={colorArrowFg} />
            </button>
            <button
              className="arrow-button next-button"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
            >
              <FaArrowRight size={28} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .testimonial-container {
          width: 100%;
          max-width: 56rem;
          padding: 2rem;
        }
        .testimonial-grid {
          display: grid;
          gap: 5rem;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 24rem;
          perspective: 1000px;
        }
        .testimonial-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .name {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        .designation {
          margin-bottom: 2rem;
        }
        .quote {
          line-height: 1.75;
        }
        .arrow-buttons {
          display: flex;
          gap: 1.5rem;
          padding-top: 3rem;
        }
        .arrow-button {
          width: 2.7rem;
          height: 2.7rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
          border: none;
        }
        .word {
          display: inline-block;
        }
        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
          }
          .arrow-buttons {
            padding-top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
```

#### Mối quan hệ

*   **Imports:** (Không có)

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
  const { t, aboutMe } = useResumeData();
  return (
    <Section heading={t("cv.heading.aboutMe")}>
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
  const { t, certifications } = useResumeData();

  return (
    <Section heading={t("cv.heading.certifications")}>
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
  const { t, educations } = useResumeData();

  return (
    <Section heading={t("cv.heading.education")}>
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
        <div className={"flex flex-col-reverse items-center gap-2"}>
          <div
            className={
              "text-2xs flex flex-col items-center justify-center gap-4"
            }
          >
            <div className={"flex flex-col items-center text-xs leading-3"}>
              <strong>Scan for Portfolio !</strong>
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
  const { t, languages } = useResumeData();

  return (
    <Section heading={t("cv.heading.languages")}>
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
  const { t, projects } = useResumeData();

  return (
    <Section heading={t("cv.heading.projects")}>
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
                <strong>{t("cv.projects.resultLabel")} </strong>
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

### Phân tích file: `src/features/resume/ResumeLayout.tsx`

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

export const CV = forwardRef<HTMLDivElement>((_, ref) => {
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
  const { t, skills } = useResumeData();

  // Không còn prop `lang`, không còn logic hard-code
  return (
    <Section
      heading={t("cv.heading.skills")}
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
  const { t, tools } = useResumeData();

  return (
    <Section heading={t("cv.heading.tools")}>
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
// 1. ĐỊNH NGHĨA CÁC TYPE CHO DỮ LIỆU CV
// Điều này giúp code của bạn an toàn hơn và tự động gợi ý code (autocomplete)
// =================================================================

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
  level: number; // Cấp độ từ 1-6
}

export interface ToolItem {
  label: string;
  level: number; // Cấp độ từ 1-6
}

export interface SkillItem {
  label: string;
  level: number; // Phần trăm từ 0-100
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
// 2. CUSTOM HOOK `useResumeData`
// Nơi duy nhất để lấy và định hình toàn bộ dữ liệu cho trang CV
// =================================================================

export const useResumeData = () => {
  const { t } = useTranslation();

  // Sử dụng t() với option `returnObjects: true` để lấy toàn bộ object/array
  // và ép kiểu (cast) về các interface đã định nghĩa ở trên.
  const header = t("cv.header", { returnObjects: true }) as HeaderData;
  const contact = t("cv.contact", { returnObjects: true }) as ContactData;
  const aboutMe = t("cv.aboutMe", { returnObjects: true }) as AboutMeData;
  const languages = t("cv.languages.items", {
    returnObjects: true,
  }) as LanguageItem[];
  const tools = t("cv.tools.items", { returnObjects: true }) as ToolItem[];
  const certifications = t("cv.certifications.items", {
    returnObjects: true,
  }) as string[];
  const skills = t("cv.skills", { returnObjects: true }) as SkillsData;
  const educations = t("cv.educations.items", {
    returnObjects: true,
  }) as EducationItem[];
  const projects = t("cv.projects.items", {
    returnObjects: true,
  }) as ProjectItem[];

  // Trả về một object duy nhất chứa toàn bộ dữ liệu đã được xử lý
  return {
    t, // Trả về cả hàm `t` để có thể dịch các chuỗi đơn lẻ nếu cần
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

*   **Imports:** (Không có)

---

### Phân tích file: `src/i18n.ts`

#### Nội dung file

```ts
// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import các file dịch của bạn
import translationEN from "./locales/en/translation.json";
import translationVI from "./locales/vi/translation.json";
import translationZH from "./locales/zh/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
  zh: {
    translation: translationZH,
  },
};

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Kết nối i18next với React
  .init({
    resources,
    fallbackLng: "en", // Ngôn ngữ mặc định nếu không phát hiện được
    interpolation: {
      escapeValue: false, // React đã tự chống XSS
    },
  });

// Rất quan trọng: Đồng bộ thuộc tính `lang` của <html>
i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});

export default i18n;

```

#### Mối quan hệ

*   **Imports:**
    *   `src/locales/en/translation.json`
    *   `src/locales/vi/translation.json`
    *   `src/locales/zh/translation.json`

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
import { CustomCursor } from "@/components/common/CustomCursor";

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
    *   `src/components/common/CustomCursor.tsx`

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

### Phân tích file: `src/locales/en/translation.json`

#### Nội dung file

```json
{
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

### Phân tích file: `src/locales/vi/translation.json`

#### Nội dung file

```json
{
  "navbar": {
    "about": "Về tôi",
    "resume": "Sơ yếu lý lịch",
    "portfolio": "Dự án",
    "downloadCV": "Tải CV",
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
    "greeting": "Xin chào!",
    "introduction": "Tôi là Khánh Huyền",
    "wordRotate": [
      "Marketing",
      "Sáng tạo Nội dung",
      "Lập kế hoạch"
    ]
  },
  "cv": {
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
      "contact": "Liên hệ",
      "skills": "Kỹ năng",
      "languages": "Ngoại ngữ",
      "tools": "Công cụ",
      "education": "Học vấn",
      "projects": "Dự án",
      "certifications": "Chứng chỉ",
      "experience": "Kinh nghiệm"
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
}

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

### Phân tích file: `src/locales/zh/translation.json`

#### Nội dung file

```json
{
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

### Phân tích file: `src/main.tsx`

#### Nội dung file

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { CV } from "@/features/resume/ResumeLayout.tsx";
import { Home } from "@/pages/Home.tsx";
import { Portfolio } from "@/pages/Portfolio.tsx";
import "./i18n.ts";
import { WebCV } from "@/pages/WebCV.tsx";

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
    ],
  },
  {
    path: "printable-cv",
    element: <CV />, // Vẫn giữ nguyên
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
    *   `src/components/common/CustomCursor.tsx`
    *   `src/features/resume/ResumeLayout.tsx`
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
    *   `src/components/common/ProjectCard.tsx`
    *   `src/i18n.ts`
    *   `src/locales/en/translation.json`
    *   `src/locales/vi/translation.json`
    *   `src/locales/zh/translation.json`
    *   `src/pages/WebCV.tsx`

---

### Phân tích file: `src/pages/Home.tsx`

#### Nội dung file

```tsx
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
import { Container } from "@/components/common/Container";
import { ProjectCard } from "@/components/common/ProjectCard";

const portfolioData = [
  {
    title: "IMC Plan Development",
    description:
      "Developed a comprehensive IMC plan, starting with target market analysis and setting SMART communication objectives.",
    imageUrl: "https://placehold.co/600x400/fecdd3/44403c?text=Project+1", // Thay bằng ảnh thật
    tags: ["IMC", "Strategy", "Planning"],
  },
  {
    title: "E-commerce Strategy Analysis",
    description:
      "Conducted in-depth analysis of a business model, user experience (UX/UI), and Digital Marketing activities.",
    imageUrl: "https://placehold.co/600x400/cffafe/44403c?text=Project+2", // Thay bằng ảnh thật
    tags: ["E-commerce", "Analysis", "UX/UI"],
  },
  {
    title: "Personal TikTok Channel",
    description:
      "Proactively researched viral content formats and the TikTok platform's algorithm to build an engaging content strategy.",
    imageUrl: "https://placehold.co/600x400/e9d5ff/44403c?text=Project+3", // Thay bằng ảnh thật
    tags: ["Social Media", "Content Creation", "Video"],
  },
];

export const Portfolio = () => {
  return (
    <Container heading="My Works & Projects">
      <div className="mt-12 w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:grid-cols-3">
          {portfolioData.map((project, index) => (
            <ProjectCard
              key={project.title}
              index={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
            />
          ))}
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
    *   `src/components/common/ProjectCard.tsx`

---

### Phân tích file: `src/pages/PrintableCV.tsx`

#### Nội dung file

```tsx
import { CV } from "@/features/resume/ResumeLayout"; // Import component CV đã sửa

export const PrintableCV = () => {
  return <CV />;
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/ResumeLayout.tsx`
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

### Phân tích file: `src/pages/WebCV.tsx`

#### Nội dung file

```tsx
import { useRef, useState, useLayoutEffect } from "react";
import { CV } from "@/features/resume/ResumeLayout";
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
          <CV ref={resumeRef} />
        </div>
      </div>
    </Container>
  );
};

```

#### Mối quan hệ

*   **Imports:**
    *   `src/features/resume/ResumeLayout.tsx`
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

### Phân tích file: `src/vite-env.d.ts`

#### Nội dung file

```ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

```

#### Mối quan hệ

*   **Imports:** (Không có)

---

