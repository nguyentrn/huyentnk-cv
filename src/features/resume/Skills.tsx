import { Section } from "./Section"; // Giả sử Section.tsx cũng được chuyển vào components
import { Progress } from "@/components/ui/progress";
import { useResumeData, SkillCategory } from "@/hooks/useResumeData";

// Một sub-component "ngu ngơ" (dumb component) chỉ để hiển thị
const SkillList = ({ category }: { category: SkillCategory }) => {
  return (
    <div className={"flex flex-col gap-2"}>
      {/* Tiêu đề không cần nữa vì Section đã có heading chung */}
      {category.items.map((skill) => (
        <div
          key={skill.label}
          className={"flex items-center justify-between gap-3"}
        >
          <div className={"shrink-0"}>{skill.label}</div>
          <Progress value={skill.level} className={"w-36"} />
        </div>
      ))}
    </div>
  );
};

export const Skills = () => {
  // Chỉ cần một dòng để lấy toàn bộ dữ liệu cần thiết!
  const { t, skills } = useResumeData();

  // Không còn prop `lang`, không còn logic hard-code
  return (
    <Section
      heading={t("cv.heading.skills")}
      className={"flex justify-between gap-8 text-xs"}
    >
      <SkillList category={skills.hardSkills} />
      <SkillList category={skills.softSkills} />
    </Section>
  );
};
