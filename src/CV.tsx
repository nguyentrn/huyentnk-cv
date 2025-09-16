// function App() {
//   return (
//     <div
//       className={
//         "prose mx-auto flex h-[297mm] w-[210mm] max-w-none flex-col items-center px-20 py-24 shadow-lg shadow-red-500/50"
//       }
//     >
//       <div id={"header"} className={"flex gap-16"}>
//         <div className={"flex flex-col items-center"}>
//           <h1
//             className={
//               "mb-0 flex self-start border-b-4 text-5xl leading-tight font-medium tracking-widest"
//             }
//           >
//             TRƯƠNG NGUYỄN KHÁNH HUYỀN
//           </h1>
//           <table
//             className={
//               "max-w-sm [&>tbody>tr>td]:p-0.5 [&>tbody>tr>td]:text-base"
//             }
//           >
//             <tbody>
//               <tr className={"border-none"}>
//                 <td className={"w-fit font-bold"}>Ngày sinh:</td>
//                 <td>15/04/1999</td>
//               </tr>
//               <tr>
//                 <td className={"w-fit font-bold"}>Email:</td>
//                 <td>huyentnk1504@gmail.com</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className={"flex items-center gap-8"}>
//           <div className="h-[180px] w-[120px] shrink-0 rounded-full bg-[url(avatar.png)] bg-cover"></div>
//           <div className={"text-center text-2xl"}>
//             Thực
//             <br />
//             tập
//             <br /> sinh <br /> Marketing
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Header } from "@/features/resume/Header.tsx";
import { Skills } from "@/features/resume/Skills.tsx";
import { Educations } from "@/features/resume/Educations.tsx";
import { AboutMe } from "@/features/resume/AboutMe.tsx";
import { Avatar } from "@/features/resume/Avatar.tsx";
import { Language } from "@/features/resume/Language.tsx";
import { Projects } from "@/features/resume/Projects.tsx";
import { useState } from "react";
import { Lang } from "@/features/resume/types.ts";
import { Certifications } from "@/features/resume/Certifications.tsx";

function App() {
  const [lang] = useState<Lang>("vi");
  return (
    <div
      className={
        "prose prose-neutral relative mx-auto grid h-[297mm] w-[210mm] max-w-none grid-cols-[1fr_2.09fr] grid-rows-[1fr_6fr] gap-x-12 p-6 pr-8 shadow-lg"
      }
    >
      {/*<div className={"absolute top-8 right-8 h-24 w-24"}>*/}
      {/*  <QRCode />*/}
      {/*</div>*/}
      {/*<div className={"absolute top-0 right-0 left-0 z-0 h-2 bg-red-400"}>*/}
      {/*  <div className={"opacity-0"}></div>*/}
      {/*</div>*/}
      <div
        className={"absolute top-0 right-0 bottom-0 left-0 z-0 w-92 bg-rose-50"}
      >
        <div className={"opacity-0"}></div>
      </div>
      <Avatar />
      <Header lang={lang} />
      <div className={"relative h-full rounded-tr-3xl"}>
        <AboutMe lang={lang} />
        {/*<Contact lang={lang} />*/}
        <Language lang={lang} />
        <Certifications lang={lang} />
      </div>
      <div className={"relative"}>
        {/*<AboutMe lang={lang} />*/}
        {/*<div className={"border-l-2"}>*/}
        <Projects lang={lang} />
        <Skills lang={lang} />
        {/*</div>*/}
        <Educations lang={lang} />
      </div>
    </div>
  );
}

export default App;
