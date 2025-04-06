export const heading: {
  ABOUT_ME: Text;
  CONTACT: Text;
  SKILLS: Text;
  LANGUAGES: Text;
  EDUCATION: Text;
  PROJECTS: Text;
  CERTIFICATION: Text;
  WORKS: Text;
} = {
  ABOUT_ME: { vi: "Giới thiệu", en: "About Me" }, // "About Me" is slightly more common than "About me" in headings
  CONTACT: { vi: "Liên hệ", en: "Contact" },
  SKILLS: { vi: "Kỹ năng", en: "Skills" },
  LANGUAGES: { vi: "Ngoại ngữ", en: "Languages" },
  EDUCATION: { vi: "Học vấn", en: "Education" },
  PROJECTS: { vi: "Dự án", en: "Projects" },
  CERTIFICATION: { vi: "Chứng chỉ", en: "Certifications" },
  WORKS: { vi: "Kinh nghiệm", en: "Experience" }, // "Experience" is more standard than "Works" for CVs
};

type Text = { vi: string; en: string };

export const header: { FIRST_NAME: Text; LAST_NAME: Text; POSITION: Text } = {
  FIRST_NAME: {
    vi: "Khánh  Huyền",
    en: "Khanh  Huyen",
  }, // Keeping Vietnamese name order is standard
  LAST_NAME: {
    vi: "Trương  Nguyễn",
    en: "Truong  Nguyen",
  }, // Keeping Vietnamese name order is standard
  POSITION: { vi: "Thực tập sinh Marketing", en: "Marketing Intern" },
};

export const contacts: { ADDRESS: Text } = {
  ADDRESS: {
    vi: "Quận 2, Tp. Hồ Chí Minh",
    en: "District 2, Ho Chi Minh City",
  },
  // Add other contact fields here like Phone, Email, LinkedIn if available
  // PHONE: { vi: "Số điện thoại", en: "Phone Number" },
  // EMAIL: { vi: "Địa chỉ Email", en: "Email Address" },
  // LINKEDIN: { vi: "Hồ sơ LinkedIn", en: "LinkedIn Profile" }
};

export const languages = [
  // { label: { en: "Vietnamese", vi: "Tiếng Việt" }, level: 6, tooltip: "Native" }, // Added Vietnamese as Native for completeness
  { label: { en: "English", vi: "Tiếng Anh" }, level: 4, tooltip: "TOEIC 850" },
  { label: { en: "Chinese", vi: "Tiếng Trung" }, level: 2, tooltip: "HSK 4" },
].map((lang) => {
  const level: boolean[] = [];
  for (let i = 0; i < 6; i++) {
    level.push(i < lang.level);
  }
  return { ...lang, level };
});

// Note: Tooltips for design skills should ideally reflect proficiency (e.g., Basic, Intermediate, Advanced)
// or specific achievements, not language scores like TOEIC/HSK. I've added suggested proficiency levels.
export const designs = [
  { label: "Canva", level: 9, tooltip: "Advanced" }, // Assuming level 9/10 is advanced
  { label: "Capcut", level: 7, tooltip: "Proficient" }, // Assuming level 7/10 is proficient
  { label: "Photoshop", level: 4, tooltip: "Basic" }, // Assuming level 4/10 is basic
  { label: "Illustrator", level: 4, tooltip: "Basic" }, // Assuming level 4/10 is basic
];

export const educations: Array<{
  university: Text;
  major: Text;
  time: [number, number | null];
  gpa?: number;
  desc: Text;
}> = [
  {
    university: {
      vi: "Trường Đại học Mở Thành phố Hồ Chí Minh",
      en: "Ho Chi Minh City Open University",
    },
    major: { vi: "Marketing", en: "Marketing" },
    time: [2022, null], // Represents 2022 - Present
    gpa: 3.8,
    desc: {
      vi: "Các môn học tiêu biểu: Quản trị Thương hiệu (A+, 9.8), Quảng cáo (A+, 9.3), Quản trị Marketing (A+, 9.3), Nghiên cứu Marketing (A+, 9.2).",
      en: "Relevant Coursework: Brand Management (A+, 9.8), Advertising (A+, 9.3), Marketing Management (A+, 9.3), Marketing Research (A+, 9.2).",
    },
  },
  {
    university: {
      vi: "Trường Đại học Y khoa Phạm Ngọc Thạch",
      en: "Pham Ngoc Thach University of Medicine",
    },
    major: { vi: "Y đa khoa", en: "General Medicine" },
    time: [2017, 2021],
    desc: {
      vi: "Quá trình giúp bản thân rèn luyện tư duy phân tích, sự tỉ mỉ, khả năng chịu áp lực và tinh thần trách nhiệm, trước khi tự xác định lại đam mê và quyết tâm theo đuổi lĩnh vực Marketing.",
      en: "Developed analytical thinking, meticulousness, resilience under pressure, and a strong sense of responsibility during medical studies before identifying a passion for and deciding to pursue the Marketing field.",
    },
  },
];

export const projects: Array<{
  in: Text;
  name: Text;
  desc: { vi: string[]; en: string[] };
  result: Text;
}> = [
  {
    in: {
      vi: "Môn học: IMC",
      en: "",
    },
    name: {
      vi: "Xây dựng Kế hoạch Truyền thông Marketing Tích hợp",
      en: "Integrated Marketing Communications (IMC) Plan Development",
    },
    desc: {
      vi: [
        "Phân tích đối tượng mục tiêu, thiết lập mục tiêu truyền thông (SMART).",
        "Xây dựng thông điệp chủ đạo & chiến lược phối hợp kênh (Social, Content...).",
        "Đề xuất hoạt động cụ thể, phác thảo ngân sách & timeline.",
      ],
      en: [
        "Developed a comprehensive IMC plan, starting with target market analysis and setting SMART communication objectives.",
        "Crafted a consistent key message and selected a strategic mix of communication channels (Social Media Marketing, Content Marketing, [Other Channels...]) to maximize reach.",
        "Proposed specific activity ideas for each channel and outlined a basic budget and implementation timeline.",
      ],
    },
    result: {
      vi: "Hoàn thiện bản kế hoạch IMC logic, thể hiện tư duy chiến lược & kỹ năng lập kế hoạch Marketing.",
      en: "Completed a detailed, logical, and feasible IMC plan, achieving an A/A+ grade. Demonstrated strategic Marketing thinking, strong planning skills, and understanding of integrating communication tools.",
    },
  },
  {
    in: {
      vi: "Môn học: E-Commerce",
      en: "",
    },
    name: {
      vi: "Phân tích Chiến lược Thương mại Điện tử và Đề xuất Tối ưu",
      en: "E-commerce Strategy Analysis and Optimization Proposal",
    },
    desc: {
      vi: [
        "Phân tích sâu mô hình kinh doanh, UX/UI, Digital Marketing (SEO, Social)",
        "Xác định điểm mạnh/yếu, cơ hội dựa trên lý thuyết & phân tích đối thủ.",
        "Xây dựng & trình bày các đề xuất tối ưu hóa khả thi.",
      ],
      en: [
        "Conducted in-depth analysis of the business model, user experience (UX/UI), pricing strategy, and Digital Marketing activities (SEO, Social Media) of [Company/Platform Name - Replace Placeholder].",
        "Identified strengths, weaknesses, and improvement opportunities based on E-commerce principles and competitor analysis.",
        "Developed and presented specific optimization recommendations aimed at [Proposal Goal, e.g., increasing conversion rates, enhancing customer experience, improving product visibility].",
      ],
    },
    result: {
      vi: "Hoàn thành báo cáo phân tích chi tiết ([Số trang]), áp dụng hiệu quả lý thuyết E-commerce vào thực tế.",
      en: "Completed a detailed analysis report of [Number] pages [Replace Placeholder] and achieved an A/A+ grade. Enhanced ability to apply E-commerce theory to practical analysis and problem-solving.",
    },
  },
  {
    in: {
      vi: "Dự án cá nhân",
      en: "",
    },
    name: {
      vi: 'Xây dựng & Phát triển Kênh TikTok Cá nhân về "Study Vlog"',
      en: 'Building & Developing a Personal TikTok Channel themed "Study Vlog"',
    },
    desc: {
      vi: [
        "Nghiên cứu trends & thuật toán TikTok.",
        "Sản xuất [Số lượng, VD: 20+] video (lên ý tưởng, quay dựng bằng [Tên công cụ]).",
        "Phân tích hiệu quả & tối ưu hóa nội dung, hashtag.",
      ],
      en: [
        "Proactively researched viral content formats and the TikTok platform's algorithm to build an engaging content strategy.",
        "Produced (ideated, filmed, edited using [Tool Name, e.g., CapCut] - Replace Placeholder) [Quantity, e.g., 20+] creative short videos focusing on [Content Goal, e.g., sharing applied Marketing knowledge, analyzing short case studies... - Replace Placeholder].",
        "Analyzed video performance (views, engagement) to optimize content strategy and hashtag approach.",
      ],
    },
    result: {
      vi: "Đạt [Số liệu nổi bật, VD: XXX views/video], phát triển kỹ năng Content Video, biên tập, nắm bắt xu hướng social.",
      en: "Achieved [Specific Metrics if available, e.g., XXX views for a top video, XX% follower growth in Month Y - Replace Placeholder], significantly developing practical skills in short-form video content creation, editing, and understanding social media trends.",
    },
  },
];

// Add other sections like CERTIFICATION, SKILLS (e.g., Technical Skills, Soft Skills) here in a similar format
