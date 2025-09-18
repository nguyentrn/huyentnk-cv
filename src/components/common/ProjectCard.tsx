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
