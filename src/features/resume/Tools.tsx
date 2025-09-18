import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { LevelDots } from "./components/LevelDots";

export const Tools = () => {
  const { tResume, tools } = useResumeData();

  return (
    <Section heading={tResume("heading.tools")}>
      {tools.map((tool) => (
        <div key={tool.label} className={"flex"}>
          <h4 className={"!my-1 flex w-24 grow items-center gap-1 font-normal"}>
            {tool.label}
          </h4>
          <LevelDots level={tool.level} />
        </div>
      ))}
    </Section>
  );
};
