import { Lang } from "@/features/resume/types.ts";
import { heading, languages } from "@/features/resume/constants.ts";

import { Section } from "@/features/resume/Section.tsx";

export const Language = ({ lang }: { lang: Lang }) => {
  return (
    <Section heading={heading.LANGUAGES[lang]}>
      {languages.map((language) => (
        <div className={"flex"}>
          <h4 className={"!my-1 w-24 grow font-normal"}>
            {language.label[lang]}
            {/*<span className={"text-2xs italic"}> ({language.tooltip})</span>*/}
          </h4>
          <div className={"flex items-center gap-1"}>
            {language.level.map((l) =>
              l ? (
                <div className={"h-3 w-3 rounded-full bg-rose-400"}></div>
              ) : (
                <div
                  className={"h-3 w-3 rounded-full border-2 border-rose-400"}
                ></div>
              ),
            )}
          </div>
        </div>
      ))}
    </Section>
  );
};
