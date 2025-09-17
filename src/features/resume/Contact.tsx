import { useResumeData } from "@/hooks/useResumeData";
import { TbCake, TbMail, TbMapPinFilled, TbPhoneCall } from "react-icons/tb";

export const Contact = () => {
  const { contact } = useResumeData();

  return (
    <div className={"-mb-3 flex justify-between border-y-1 py-3 text-sm"}>
      <div className={"flex items-center gap-3"}>
        <TbCake className={"relative -top-0.5 text-lg text-rose-400"} />
        {contact.birthYear}
      </div>
      <div className={"flex items-center gap-3"}>
        <TbPhoneCall className={"relative -top-0.5 text-lg text-rose-400"} />
        {contact.phone}
      </div>
      <div className={"flex items-center gap-3"}>
        <TbMail className={"relative -top-0.5 text-lg text-rose-400"} />
        {contact.email}
      </div>
      <div className={"flex items-center gap-3"}>
        <TbMapPinFilled className={"relative -top-0.5 text-lg text-rose-400"} />
        {contact.address}
      </div>
    </div>
  );
};
