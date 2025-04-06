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
