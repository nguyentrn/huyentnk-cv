import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import { BiPlus } from "react-icons/bi";

export const Educations = () => {
  const { tResume, educations } = useResumeData();

  return (
    <Section heading={tResume("heading.education")}>
      <div className={"flex w-full flex-col gap-8"}>
        {educations.map((education) => (
          <div key={education.university} className={"flex gap-2"}>
            <BiPlus className={"shrink-0 text-lg"} />
            <div className={"flex flex-col"}>
              <div className={"mb-1 flex flex-col"}>
                <span className={"mb-1 flex justify-between text-sm"}>
                  <em>{education.university}</em>
                  <em className={"text-sm"}>{education.time}</em>
                </span>
                <h4
                  className={
                    "!my-0 flex items-center gap-12 tracking-widest uppercase"
                  }
                >
                  {education.major}
                </h4>
              </div>
              <span className={"block text-sm leading-relaxed"}>
                {education.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
