// =================================================================
// CÁC INTERFACE ĐƠN LẺ (ITEMS)
// =================================================================

/** Một mục trong danh sách Ngoại ngữ */
export interface LanguageItem {
  label: string;
  tooltip: string;
  level: number;
}

/** Một mục trong danh sách Công cụ */
export interface ToolItem {
  label: string;
  level: number;
}

/** Một mục trong danh sách Kỹ năng */
export interface SkillItem {
  label: string;
  level: number;
}

/** Một mục trong danh sách Học vấn */
export interface EducationItem {
  university: string;
  major: string;
  time: string;
  gpa: number | null;
  desc: string;
  achievements?: string[]; // Thêm thuộc tính này, là optional
}

/** Một mục trong danh sách Dự án */
export interface ProjectItem {
  in: string;
  name: string;
  desc: string[];
  time: string;
  result: string[]; // Sửa từ string sang string[]
}

// =================================================================
// CÁC INTERFACE NHÓM (CATEGORIES & DATA SECTIONS)
// =================================================================

/** Dữ liệu cho một nhóm kỹ năng (cứng hoặc mềm) */
export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

/** Dữ liệu cho toàn bộ phần Tiêu đề các mục */
export interface HeadingData {
  aboutMe: string;
  skills: string;
  languages: string;
  tools: string;
  education: string;
  projects: string;
  certifications: string;
}

/** Dữ liệu cho phần Header (tên, vị trí) */
export interface HeaderData {
  firstName: string;
  lastName: string;
  position: string;
}

/** Dữ liệu cho phần Liên hệ */
export interface ContactData {
  birthYear: string;
  phone: string;
  email: string;
  address: string;
  portfolio: string;
}

/** Dữ liệu cho phần Giới thiệu */
export interface AboutMeData {
  summary: string;
}

/** Dữ liệu cho phần Kỹ năng */
export interface SkillsData {
  hardSkills: SkillCategory;
  softSkills: SkillCategory;
}

/** Dữ liệu cho phần Học vấn */
export interface EducationsData {
  items: EducationItem[];
}

/** Dữ liệu cho phần Dự án */
export interface ProjectsData {
  resultLabel: string;
  items: ProjectItem[];
}

/** Dữ liệu cho phần Ngoại ngữ */
export interface LanguagesData {
  items: LanguageItem[];
}

/** Dữ liệu cho phần Công cụ */
export interface ToolsData {
  items: ToolItem[];
}

/** Dữ liệu cho phần Chứng chỉ */
export interface CertificationsData {
  items: string[];
}

// =================================================================
// INTERFACE TỔNG CHO TOÀN BỘ CV
// =================================================================

export interface CVData {
  scanMessage: string;
  header: HeaderData;
  contact: ContactData;
  heading: HeadingData;
  aboutMe: AboutMeData;
  languages: LanguagesData;
  tools: ToolsData;
  certifications: CertificationsData;
  skills: SkillsData;
  educations: EducationsData;
  projects: ProjectsData;
}
