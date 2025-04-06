import { heading } from "@/features/resume/constants.ts";
import { Lang } from "@/features/resume/types.ts";
import { Section } from "@/features/resume/Section.tsx";
import { Progress } from "@/components/ui/progress";

const tools = [
  {
    name: "MS/Google Office",
    level: 7,
  },
  {
    name: "Canva/Capcut",
    level: 4,
  },
  {
    name: "Photoshop/Illustrator",
    level: 6,
  },
  {
    name: "Google Analytics",
    level: 3,
  },
];

const skills = [
  {
    name: "Lập kế hoạch",
    level: 9,
  },
  {
    name: "Content Creation",
    level: 5,
  },
  {
    name: "Digital Fundamentals",
    level: 7,
  },
  {
    name: "Social Media",
    level: 2,
  },
];

export const Skills = ({ lang }: { lang: Lang }) => {
  return (
    <Section
      heading={heading.SKILLS[lang]}
      className={"flex w-full gap-12 text-xs"}
    >
      <div className={"flex grow flex-col gap-2"}>
        {skills.map((skill) => (
          <div className={"flex items-center"}>
            <div className={"w-30 shrink-0"}>{skill.name}</div>
            <Progress value={skill.level * 10} />
          </div>
        ))}
      </div>
      <div className={"flex grow flex-col gap-2"}>
        {tools.map((skill) => (
          <div className={"flex items-center"}>
            <div className={"w-30 shrink-0"}>{skill.name}</div>
            <Progress value={skill.level * 10} />
          </div>
        ))}
      </div>
    </Section>
  );
};
