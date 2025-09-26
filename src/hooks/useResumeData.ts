import { useTranslation } from "react-i18next";
import {
  AboutMeData,
  ContactData,
  EducationItem,
  HeaderData,
  HeadingData,
  LanguageItem,
  ProjectItem,
  SkillsData,
  ToolItem,
} from "@/types/cv.ts";

export const useResumeData = () => {
  // Luôn sử dụng namespace 'resume' khi gọi t() cho dữ liệu CV
  const { t } = useTranslation("resume");

  // === THAY ĐỔI Ở ĐÂY: Đã xóa tiền tố "cv." khỏi tất cả các key ===
  const heading = t("heading", { returnObjects: true }) as HeadingData;
  const header = t("header", { returnObjects: true }) as HeaderData;
  const contact = t("contact", { returnObjects: true }) as ContactData;
  const aboutMe = t("aboutMe", { returnObjects: true }) as AboutMeData;
  const languages = t("languages.items", {
    returnObjects: true,
  }) as LanguageItem[];
  const tools = t("tools.items", { returnObjects: true }) as ToolItem[];
  const certifications = t("certifications.items", {
    returnObjects: true,
  }) as string[];
  const skills = t("skills", { returnObjects: true }) as SkillsData;
  const educations = t("educations.items", {
    returnObjects: true,
  }) as EducationItem[];
  const projects = t("projects.items", {
    returnObjects: true,
  }) as ProjectItem[];
  // === KẾT THÚC THAY ĐỔI ===

  // Trả về hàm t từ namespace chung nếu cần dịch các chuỗi lẻ khác
  const { t: tCommon } = useTranslation("common");

  return {
    t: tCommon, // Trả về t chung
    tResume: t, // Trả về t của resume để dùng trong các component con
    heading,
    header,
    contact,
    aboutMe,
    languages,
    tools,
    certifications,
    skills,
    educations,
    projects,
  };
};
