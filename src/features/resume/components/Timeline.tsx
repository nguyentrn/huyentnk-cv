// src/features/resume/components/Timeline.tsx
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

// Component cha: Bao bọc toàn bộ timeline
export const Timeline = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative flex flex-col gap-8", className)}>
      {/* Đây là đường kẻ dọc của timeline */}
      <div className="absolute top-2 left-4 h-full w-0.5 bg-neutral-200" />
      {children}
    </div>
  );
};

// Component con: Đại diện cho mỗi mục trong timeline
export const TimelineItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative flex items-start gap-2 pl-10", className)}>
      {/* Đây là icon cột mốc */}
      <div className="absolute top-1 left-1.25 flex h-6 w-6 items-center justify-center rounded-full bg-white">
        <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-rose-400 bg-rose-50">
          {/* Bạn có thể thay icon ở đây nếu muốn, ví dụ: <Plus className="h-4 w-4 text-rose-500" /> */}
          <div className="h-2 w-2 rounded-full bg-rose-400" />
        </div>
      </div>
      {/* Đây là khu vực chứa nội dung */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

// Sub-component cho tiêu đề
export const TimelineHeader = ({
  title,
  subtitle,
  time,
}: {
  title: string;
  subtitle?: string;
  time?: string;
}) => (
  <div className="mb-2">
    <div className="flex items-center justify-between">
      <h4 className="!my-0 font-bold tracking-wider text-neutral-800 uppercase">
        {title}
      </h4>
      {time && <em className="text-sm text-neutral-500">{time}</em>}
    </div>
    {subtitle && (
      <em className="block text-sm font-semibold text-neutral-500">
        {subtitle}
      </em>
    )}
  </div>
);

// Sub-component cho nội dung chính
export const TimelineContent = ({ children }: { children: ReactNode }) => (
  <div className="prose-sm prose-neutral prose-li:my-1 prose-ul:my-2">
    {children}
  </div>
);
