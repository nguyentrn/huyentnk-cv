import { useTranslation } from "react-i18next";

// =================================================================
// 1. ĐỊNH NGHĨA CÁC TYPE CHO DỮ LIỆU CV
// Điều này giúp code của bạn an toàn hơn và tự động gợi ý code (autocomplete)
// =================================================================

export interface HeaderData {
  firstName: string;
  lastName: string;
  position: string;
}

export interface ContactData {
  birthYear: string;
  phone: string;
  email: string;
  address: string;
  portfolio: string;
}

export interface AboutMeData {
  summary: string;
}

export interface LanguageItem {
  label: string;
  tooltip: string;
  level: number; // Cấp độ từ 1-6
}

export interface ToolItem {
  label: string;
  level: number; // Cấp độ từ 1-6
}

export interface SkillItem {
  label: string;
  level: number; // Phần trăm từ 0-100
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export interface SkillsData {
  hardSkills: SkillCategory;
  softSkills: SkillCategory;
}

export interface EducationItem {
  university: string;
  major: string;
  time: string;
  gpa: number | null;
  desc: string;
}

export interface ProjectItem {
  in: string;
  name: string;
  desc: string[];
  result: string;
}

// =================================================================
// 2. CUSTOM HOOK `useResumeData`
// Nơi duy nhất để lấy và định hình toàn bộ dữ liệu cho trang CV
// =================================================================

export const useResumeData = () => {
  const { t } = useTranslation();

  // Sử dụng t() với option `returnObjects: true` để lấy toàn bộ object/array
  // và ép kiểu (cast) về các interface đã định nghĩa ở trên.
  const header = t("cv.header", { returnObjects: true }) as HeaderData;
  const contact = t("cv.contact", { returnObjects: true }) as ContactData;
  const aboutMe = t("cv.aboutMe", { returnObjects: true }) as AboutMeData;
  const languages = t("cv.languages.items", {
    returnObjects: true,
  }) as LanguageItem[];
  const tools = t("cv.tools.items", { returnObjects: true }) as ToolItem[];
  const certifications = t("cv.certifications.items", {
    returnObjects: true,
  }) as string[];
  const skills = t("cv.skills", { returnObjects: true }) as SkillsData;
  const educations = t("cv.educations.items", {
    returnObjects: true,
  }) as EducationItem[];
  const projects = t("cv.projects.items", {
    returnObjects: true,
  }) as ProjectItem[];

  // Trả về một object duy nhất chứa toàn bộ dữ liệu đã được xử lý
  return {
    t, // Trả về cả hàm `t` để có thể dịch các chuỗi đơn lẻ nếu cần
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
