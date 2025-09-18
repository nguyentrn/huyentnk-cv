import { useTranslation } from "react-i18next";

// =================================================================
// 1. ĐỊNH NGHĨA CÁC TYPE CHO DỮ LIỆU CV (Giữ nguyên)
// =================================================================

export interface HeadingData {
  aboutMe: string;
  skills: string;
  languages: string;
  tools: string;
  education: string;
  projects: string;
  certifications: string;
}

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
  level: number;
}

export interface ToolItem {
  label: string;
  level: number;
}

export interface SkillItem {
  label: string;
  level: number;
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
// 2. CUSTOM HOOK `useResumeData` (ĐÃ ĐƯỢC SỬA LẠI)
// =================================================================

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
    languages, // Bây giờ biến này sẽ là một mảng, lỗi sẽ được khắc phục
    tools,
    certifications,
    skills,
    educations,
    projects,
  };
};
