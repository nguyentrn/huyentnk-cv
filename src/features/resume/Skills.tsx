import { designs, heading } from "@/features/resume/constants.ts";
import { Lang } from "@/features/resume/types.ts";
import { Section } from "@/features/resume/Section.tsx";

export const Skills = ({ lang }: { lang: Lang }) => {
  return (
    <Section heading={heading.SKILLS[lang]}>
      <div>Canva/CapCut</div>
      {designs.map((design) => (
        <div>{design.label}</div>
      ))}
    </Section>
  );
};
