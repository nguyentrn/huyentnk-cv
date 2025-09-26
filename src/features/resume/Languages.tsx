import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";

export const Languages = () => {
  const { languages, heading } = useResumeData();

  return (
    <Section heading={heading.languages} className={"text-base font-medium"}>
      {languages.map((language) => (
        <div key={language.label} className={"flex"}>
          <h4 className={"!my-1 flex w-24 grow items-center gap-1"}>
            {language.label}
          </h4>
          {/*<span className={"text-2xs mt-0.5 italic"}>{language.tooltip}</span>*/}
        </div>
      ))}
    </Section>
  );
};
