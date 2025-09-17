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
