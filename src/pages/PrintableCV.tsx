import { forwardRef } from "react";

import { Header } from "@/features/resume/Header.tsx";
import { Skills } from "@/features/resume/Skills.tsx";
import { Educations } from "@/features/resume/Educations.tsx";
import { AboutMe } from "@/features/resume/AboutMe.tsx";
import { Avatar } from "@/features/resume/Avatar.tsx";
import { Languages } from "@/features/resume/Languages.tsx";
import { Projects } from "@/features/resume/Projects.tsx";
import { Tools } from "@/features/resume/Tools.tsx";

export const PrintableCV = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className={
        "prose prose-printable prose-neutral relative mx-auto grid h-[396mm] w-[280mm] max-w-none grid-cols-[1fr_2.2fr] grid-rows-[1fr_6fr] gap-x-12 p-10 pt-20 pr-12 shadow-lg"
      }
    >
      <div
        className={
          "absolute top-0 right-0 bottom-0 left-0 z-0 w-88 bg-rose-50/40"
        }
      >
        <div className={"opacity-0"}></div>
      </div>
      <Avatar />
      <Header />
      <div className={"relative h-full rounded-tr-3xl"}>
        <AboutMe />
        <Languages />
        <Tools />
        <Skills />

        {/*<Certifications />*/}
      </div>
      <div className={"prose-ul:pl-3 relative"}>
        <Projects />
        {/*<Skills />*/}
        <Educations />
      </div>
    </div>
  );
});
