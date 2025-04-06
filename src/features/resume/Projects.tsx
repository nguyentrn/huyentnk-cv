import { Lang } from "@/features/resume/types.ts";
import { Section } from "@/features/resume/Section.tsx";
import { heading, projects } from "@/features/resume/constants.ts";
import { BiPlus } from "react-icons/bi";

export const Projects = ({ lang }: { lang: Lang }) => {
  return (
    <Section heading={heading.PROJECTS[lang]}>
      <div className={"flex flex-col gap-8"}>
        {projects.map((project) => (
          <div className={"flex gap-2"}>
            <BiPlus className={"shrink-0 text-lg"} />
            <div className={"!mb-0 !pl-0"}>
              <span className={"mb-1 flex justify-between text-sm"}>
                <em>{project.in[lang]}</em>
              </span>
              <h4 className={"!my-0 tracking-widest uppercase"}>
                {project.name[lang]}
              </h4>
              <ul className={"!my-2 !ml-0 block text-sm"}>
                {project.desc[lang].map((d) => (
                  <li className={"!my-0 !leading-relaxed"}>{d}</li>
                ))}
              </ul>
              <p className={"prose-sm !my-0"}>
                <strong>Kết quả đạt được: </strong>
                {project.result[lang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
