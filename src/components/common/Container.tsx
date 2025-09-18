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
        className="absolute inset-0 top-0 right-0 bottom-0 left-0 flex items-center justify-center rounded-none opacity-20"
      />
      <div className={"relative"}>
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
      </div>
    </motion.div>
  );
};
