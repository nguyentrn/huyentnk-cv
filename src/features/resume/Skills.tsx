import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { SkillCategory } from "@/types/cv.ts";

const SkillList = ({ category }: { category: SkillCategory }) => {
  return (
    <div className={"flex flex-col gap-3"}>
      {category.items.map((skill) => (
        <div
          key={skill.label}
          className={"flex flex-col justify-between gap-1"}
        >
          <h4 className={"!my-0 shrink-0"}>{skill.label}</h4>
        </div>
      ))}
    </div>
  );
};

export const Skills = () => {
  const { tResume, skills } = useResumeData();
  return (
    <Section
      heading={tResume("heading.skills")}
      className={"flex flex-col justify-between gap-8 text-base font-medium"}
    >
      <SkillList category={skills.hardSkills} />
      <SkillList category={skills.softSkills} />
    </Section>
  );
};
