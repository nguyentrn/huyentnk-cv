import { Lang } from "@/features/resume/types.ts";
import { heading } from "@/features/resume/constants.ts";
import { Section } from "@/features/resume/Section.tsx";

export const AboutMe = ({ lang }: { lang: Lang }) => {
  return (
    <Section heading={heading.ABOUT_ME[lang]}>
      <em className={"!my-0 block text-sm leading-relaxed !font-normal"}>
        Sinh viên năm 3 ngành Marketing, với thành tích học tập tốt và kiến thức
        vững chắc về Marketing, có kinh nghiệm thực hành thông qua các dự án học
        thuật về lập kế hoạch Marketing tích hợp, phân tích đối thủ cạnh tranh
        và phát triển nội dung. Mong muốn vận dụng kiến thức, kỹ năng và tinh
        thần chủ động học hỏi vào vị trí Thực tập sinh Marketing để đóng góp vào
        các chiến dịch tại một agency sáng tạo.
      </em>
    </Section>
  );
};
