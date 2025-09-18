import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";

export const AboutMe = () => {
  const { tResume, aboutMe } = useResumeData();
  return (
    <Section heading={tResume("heading.aboutMe")}>
      <em className={"!my-0 block text-sm leading-relaxed !font-normal"}>
        {aboutMe.summary}
      </em>
    </Section>
  );
};
