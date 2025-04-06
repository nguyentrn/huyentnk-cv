import { educations, heading } from "@/features/resume/constants.ts";
import { Lang } from "@/features/resume/types.ts";
import { Section } from "@/features/resume/Section.tsx";
import { BiPlus } from "react-icons/bi";

export const List = () => {};

export const Educations = ({ lang }: { lang: Lang }) => {
  return (
    <Section heading={heading.EDUCATION[lang]}>
      <div className={"flex flex-col gap-8"}>
        {educations.map((education) => (
          <div className={"flex gap-2"}>
            <BiPlus className={"shrink-0 text-lg"} />
            <div className={"flex flex-col"}>
              <div className={"mb-1 flex flex-col"}>
                <span className={"mb-1 flex justify-between text-sm"}>
                  <em>{education.university[lang]}</em>
                  <em className={"text-sm"}>
                    {education.time[0]} – {education.time[1] || "hiện tại"}
                  </em>
                </span>
                <h4
                  className={
                    "!my-0 flex items-center gap-12 tracking-widest uppercase"
                  }
                >
                  {education.major[lang]}
                  {/*{education.gpa && (*/}
                  {/*  <div className={"flex items-end text-xs"}>*/}
                  {/*    (*/}
                  {/*    <span className={"font-semibold"}>*/}
                  {/*      GPA: {education.gpa}*/}
                  {/*    </span>*/}
                  {/*    <span className={""}>/4.0</span>)*/}
                  {/*  </div>*/}
                  {/*)}*/}
                </h4>
              </div>
              <span className={"block text-sm leading-relaxed"}>
                {education.desc[lang]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export const Certifications = ({ lang }: { lang: Lang }) => {
  return (
    <Section heading={heading.CERTIFICATION[lang]}>
      <div>Google Digital Garage</div>
      <div>Google Analytics</div>
      <div>Linkedln Marketing Labs</div>
      <div>Hubspot Inbound Marketing</div>
    </Section>
  );
};
