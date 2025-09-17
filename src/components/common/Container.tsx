import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
      className={cn("flex min-h-screen flex-col items-center p-8", className)}
    >
      {heading && (
        <h1 className={"decoration-primary-500 underline underline-offset-4"}>
          {heading}
        </h1>
      )}
      {children}
    </motion.div>
  );
};
