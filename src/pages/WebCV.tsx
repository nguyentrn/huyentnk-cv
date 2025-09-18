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
