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
