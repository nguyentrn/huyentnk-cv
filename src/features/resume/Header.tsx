import { header } from "@/features/resume/constants.ts";
import { Lang } from "@/features/resume/types.ts";
import { Contact } from "@/features/resume/Contact.tsx";
import QRCode from "@/assets/QRCode.svg?react";
import Portfolio from "@/assets/Portfolio.svg?react";

export const Header = ({ lang }: { lang: Lang }) => {
  return (
    <div className={"ml-4 flex flex-col justify-end gap-8"}>
      <div className={"relative flex items-center justify-between"}>
        {/*<div*/}
        {/*  className={*/}
        {/*    "absolute -top-16 right-0 bottom-0 -left-8 h-40 w-40 rounded-full bg-red-300"*/}
        {/*  }*/}
        {/*></div>*/}
        <div className={"flex flex-col"}>
          <h1
            className={
              "relative !mt-0 !mb-0 flex flex-col font-serif tracking-widest whitespace-pre uppercase"
            }
          >
            <span className={"text-3xl font-thin"}>
              {header.LAST_NAME[lang]}
            </span>
            <span className={"text-5xl font-bold"}>
              {header.FIRST_NAME[lang]}
            </span>
          </h1>
          <span
            className={"relative mb-2 h-1 w-1/2 rounded-3xl bg-rose-300"}
          ></span>

          <div className={"relative !my-0 flex gap-2 uppercase"}>
            <h3 className={"!my-0 text-lg font-normal tracking-widest"}>
              {header.POSITION[lang]}
            </h3>
            {/*<span className={"relative h-0.5 w-20 bg-rose-400"}></span>*/}
          </div>
        </div>
        <div className={"flex"}>
          <div className={"flex flex-col items-center justify-center text-xs"}>
            <div className={"h-8 w-8"}>
              <Portfolio className={"fill-rose-400"} />
            </div>
            {/*<span>Portfolio</span>*/}
            <span>huyentnk.com</span>
          </div>
          <div className={"h-20 w-20"}>
            <QRCode />
          </div>
        </div>
      </div>
      <Contact lang={lang} />
    </div>
  );
};
