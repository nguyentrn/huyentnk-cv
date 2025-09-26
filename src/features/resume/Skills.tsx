import { Section } from "./Section"; // Giả sử Section.tsx cũng được chuyển vào components
import { Progress } from "@/components/ui/progress";
import { useResumeData } from "@/hooks/useResumeData";
import { SkillCategory } from "@/types/cv.ts";

// Một sub-component "ngu ngơ" (dumb component) chỉ để hiển thị
const SkillList = ({ category }: { category: SkillCategory }) => {
  return (
    <div className={"flex flex-col gap-3"}>
      {/* Tiêu đề không cần nữa vì Section đã có heading chung */}
      {category.items.map((skill) => (
        <div
          key={skill.label}
          className={"flex flex-col justify-between gap-1"}
        >
          <h4 className={"!my-0 shrink-0"}>{skill.label}</h4>
          <Progress value={skill.level} className={"w-full"} />
        </div>
      ))}
    </div>
  );
};

export const Skills = () => {
  // Chỉ cần một dòng để lấy toàn bộ dữ liệu cần thiết!
  const { tResume, skills } = useResumeData();

  // Không còn prop `lang`, không còn logic hard-code
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
