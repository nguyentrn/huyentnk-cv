// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// --- BẮT ĐẦU IMPORT ---
// Import các file namespace cho tiếng Việt
import commonVI from "./locales/vi/common.json";
import portfolioVI from "./locales/vi/portfolio.json";

// Import các file namespace cho tiếng Anh (giả sử bạn đã tạo)
import commonEN from "./locales/en/common.json";
import portfolioEN from "./locales/en/portfolio.json";

import commonZH from "./locales/zh/common.json";
import portfolioZH from "./locales/zh/portfolio.json";

// --- KẾT THÚC IMPORT ---

// Cấu trúc lại đối tượng resources
const resources = {
  vi: {
    common: commonVI, // namespace 'common' cho tiếng Việt
    portfolio: portfolioVI, // namespace 'portfolio' cho tiếng Việt
  },
  en: {
    common: commonEN, // namespace 'common' cho tiếng Anh
    portfolio: portfolioEN, // namespace 'portfolio' cho tiếng Anh
  },
  zh: {
    common: commonZH, // namespace 'common' cho tiếng Anh
    portfolio: portfolioZH, // namespace 'portfolio' cho tiếng Anh
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "vi",
    ns: ["common", "portfolio"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});

export default i18n;
