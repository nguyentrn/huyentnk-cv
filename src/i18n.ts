import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonVI from "./locales/vi/common.json";
import portfolioVI from "./locales/vi/portfolio.json";
import resumeVI from "./locales/vi/resume.json";

import commonEN from "./locales/en/common.json";
import portfolioEN from "./locales/en/portfolio.json";
import resumeEN from "./locales/en/resume.json";

import commonZH from "./locales/zh/common.json";
import portfolioZH from "./locales/zh/portfolio.json";
import resumeZH from "./locales/zh/resume.json";

const resources = {
  vi: {
    common: commonVI,
    portfolio: portfolioVI,
    resume: resumeVI,
  },
  en: {
    common: commonEN,
    portfolio: portfolioEN,
    resume: resumeEN,
  },
  zh: {
    common: commonZH,
    portfolio: portfolioZH,
    resume: resumeZH,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    load: "languageOnly",
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
