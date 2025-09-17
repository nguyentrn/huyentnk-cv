import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { BiPlus } from "react-icons/bi";

export const Projects = () => {
  const { t, projects } = useResumeData();

  return (
    <Section heading={t("cv.heading.projects")}>
      <div className={"flex flex-col gap-8"}>
        {projects.map((project) => (
          <div key={project.name} className={"flex gap-2"}>
            <BiPlus className={"mt-1 shrink-0 text-lg"} />
            <div className={"!mb-0 !pl-0"}>
              <span className={"mb-1 flex justify-between text-sm"}>
                <em>{project.in}</em>
              </span>
              <h4 className={"!my-0 tracking-widest uppercase"}>
                {project.name}
              </h4>
              <ul className={"!my-2 !ml-0 block text-sm"}>
                {project.desc.map((d, index) => (
                  <li key={index} className={"!my-0 !leading-relaxed"}>
                    {d}
                  </li>
                ))}
              </ul>
              <p className={"prose-sm !my-0"}>
                <strong>{t("cv.projects.resultLabel")} </strong>
                {project.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
