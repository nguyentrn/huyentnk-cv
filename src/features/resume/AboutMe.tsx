import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";

export const AboutMe = () => {
  const { t, aboutMe } = useResumeData();
  return (
    <Section heading={t("cv.heading.aboutMe")}>
      <em className={"!my-0 block leading-relaxed !font-normal"}>
        {aboutMe.summary}
      </em>
    </Section>
  );
};
