import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";

export const Tools = () => {
  const { tResume, tools } = useResumeData();

  return (
    <Section
      heading={tResume("heading.tools")}
      className={"text-base font-medium"}
    >
      {tools.map((tool) => (
        <div key={tool.label} className={"flex"}>
          <h4 className={"!my-1 flex w-24 grow items-center gap-1"}>
            {tool.label}
          </h4>
          {/*<LevelDots level={tool.level} />*/}
        </div>
      ))}
    </Section>
  );
};
