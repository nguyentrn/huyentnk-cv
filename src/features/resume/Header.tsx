import { useResumeData } from "@/hooks/useResumeData";
import { Contact } from "./Contact";
import QRCode from "@/assets/QRCode.svg?react";

export const Header = () => {
  const { header } = useResumeData();

  return (
    <div className={"ml-4 flex flex-col justify-end gap-6"}>
      <div className={"relative flex items-center justify-between"}>
        <div className={"flex flex-col"}>
          <h1
            className={
              "relative !mt-0 !mb-0 flex flex-col font-serif tracking-widest whitespace-pre uppercase"
            }
          >
            <span className={"font-sans text-3xl font-medium"}>
              {header.lastName}
            </span>
            <span className={"text-5xl font-bold"}>{header.firstName}</span>
          </h1>
          <span
            className={"relative mb-2 h-1 w-1/2 rounded-3xl bg-rose-300"}
          ></span>
          <div className={"relative !my-0 flex gap-2 uppercase"}>
            <h3 className={"!my-0 text-lg font-normal tracking-widest"}>
              {header.position}
            </h3>
          </div>
        </div>
        <div className={"flex flex-col-reverse items-center gap-2"}>
          <div
            className={
              "text-2xs flex flex-col items-center justify-center gap-4"
            }
          >
            <div className={"flex flex-col items-center text-xs leading-3"}>
              <strong>Scan for Portfolio !</strong>
            </div>
          </div>
          <div className={"h-24 w-24"}>
            <QRCode />
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};
