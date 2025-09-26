import { useResumeData } from "@/hooks/useResumeData";
import { TbCake, TbMail, TbMapPinFilled, TbPhoneCall } from "react-icons/tb";

export const Contact = () => {
  const { contact } = useResumeData();

  return (
    <div className={"-mb-3 flex justify-between border-y-1 py-3 text-sm"}>
      <div className={"flex items-center gap-2"}>
        <TbCake className={"relative text-lg text-rose-400"} />
        {contact.birthYear}
      </div>
      <div className={"flex items-center gap-2"}>
        <TbPhoneCall className={"relative text-lg text-rose-400"} />
        {contact.phone}
      </div>
      <div className={"flex items-center gap-2"}>
        <TbMail className={"relative text-lg text-rose-400"} />
        {contact.email}
      </div>
      <div className={"flex items-center gap-2"}>
        <TbMapPinFilled className={"relative text-lg text-rose-400"} />
        {contact.address}
      </div>
    </div>
  );
};
