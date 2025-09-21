import { ReactNode } from "react";
import { TiChevronRight } from "react-icons/ti";
// import Education from "../assets/Education.svg?react";

export const Heading = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className={"!mt-10 !mb-3 flex items-center gap-3 uppercase"}>
      <TiChevronRight className={"mb-1 text-4xl text-rose-400"} />
      {/*<div className={"mb-1 h-8 w-8 rounded-full border-2 border-rose-400 p-1"}>*/}
      {/*  <Education className={"!my-0 fill-red-400"} />*/}
      {/*</div>*/}
      <span className={"font-semibold tracking-widest"}>{children}</span>
      <span
        className={"ml-1 h-1 max-h-0.5 min-h-0.5 grow bg-neutral-300"}
      ></span>
    </h2>
  );
};
