import { useRef, useState, useLayoutEffect } from "react";
import { PrintableCV } from "@/pages/PrintableCV.tsx";
import { Container } from "@/components/common/Container";
import { MagnetizeButton } from "@/components/ui/magnetize-button.tsx";

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
