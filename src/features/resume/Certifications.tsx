import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";

export const Certifications = () => {
  const { tResume, certifications } = useResumeData();

  return (
    <Section heading={tResume("heading.certifications")}>
      {certifications.map((cert) => (
        <div key={cert}>{cert}</div>
      ))}
    </Section>
  );
};
