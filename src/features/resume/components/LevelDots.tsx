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
