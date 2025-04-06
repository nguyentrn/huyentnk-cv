import { Lang } from "@/features/resume/types.ts";
import { contacts } from "@/features/resume/constants.ts";
import { TbCake, TbMail, TbMapPinFilled, TbPhoneCall } from "react-icons/tb";

export const Contact = ({ lang }: { lang: Lang }) => {
  return (
    <div className={"flex justify-between"}>
      <div className={"flex items-center gap-3"}>
        <TbPhoneCall className={"relative -top-0.5 text-lg text-rose-400"} />
        (+84) 976 8888 09
      </div>
      <div className={"flex items-center gap-3"}>
        <TbMail className={"relative -top-0.5 text-lg text-rose-400"} />
        huyentnk1504@gmail.com
      </div>
      {/*<div className={"flex items-center gap-3"}>*/}
      {/*  <TbCake className={"relative -top-0.5 text-lg text-rose-400"} />*/}
      {/*  15/04/1999*/}
      {/*</div>*/}
      <div className={"flex items-center gap-3"}>
        <TbMapPinFilled className={"relative -top-0.5 text-lg text-rose-400"} />
        {contacts.ADDRESS[lang]}
      </div>
    </div>
  );
};
