import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { LevelDots } from "./components/LevelDots";

export const Languages = () => {
  const { t, languages } = useResumeData();

  return (
    <Section heading={t("cv.heading.languages")}>
      {languages.map((language) => (
        <div key={language.label} className={"flex"}>
          <h4 className={"!my-1 flex w-24 grow items-center gap-1 font-normal"}>
            {language.label}
            <span className={"text-2xs mt-0.5 italic"}>
              ({language.tooltip})
            </span>
          </h4>
          <LevelDots level={language.level} />
        </div>
      ))}
    </Section>
  );
};
