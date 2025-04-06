import { Header } from "@/features/resume/Header.tsx";
import { Skills } from "@/features/resume/Skills.tsx";
import { Certifications, Educations } from "@/features/resume/Educations.tsx";
import { AboutMe } from "@/features/resume/AboutMe.tsx";
import { Avatar } from "@/features/resume/Avatar.tsx";
import { Language } from "@/features/resume/Language.tsx";
import { Projects } from "@/features/resume/Projects.tsx";
import { useState } from "react";
import { Lang } from "@/features/resume/types.ts";

function App() {
  const [lang] = useState<Lang>("vi");
  return (
    <div
      className={
        "prose prose-neutral relative mx-auto grid h-[297mm] w-[210mm] max-w-none grid-cols-[1fr_2.75fr] grid-rows-[1fr_6fr] gap-x-16 border p-6"
      }
    >
      {/*<div className={"absolute top-8 right-8 h-24 w-24"}>*/}
      {/*  <QRCode />*/}
      {/*</div>*/}
      {/*<div className={"absolute top-0 right-0 left-0 z-0 h-2 bg-red-400"}>*/}
      {/*  <div className={"opacity-0"}></div>*/}
      {/*</div>*/}
      <div
        className={
          "absolute top-0 right-0 bottom-0 left-0 z-0 w-80 bg-neutral-50"
        }
      >
        <div className={"opacity-0"}></div>
      </div>
      <Avatar />
      <Header lang={lang} />
      <div className={"relative h-full rounded-tr-3xl"}>
        <AboutMe lang={lang} />
        {/*<Contact lang={lang} />*/}
        <Skills lang={lang} />
        <Language lang={lang} />
        <Certifications lang={lang} />
      </div>
      <div className={"relative"}>
        {/*<AboutMe lang={lang} />*/}
        {/*<div className={"border-l-2"}>*/}
        <Projects lang={lang} />
        {/*</div>*/}
        <Educations lang={lang} />
      </div>
    </div>
  );
}

export default App;
