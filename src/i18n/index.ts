import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import vi from "./locales/vi";

export const ADMIN_LANGUAGE_STORAGE_KEY = "adminLanguage";
export const ADMIN_LANGUAGES = ["vi", "en"] as const;
export type AdminLanguage = (typeof ADMIN_LANGUAGES)[number];
export const APP_LANGUAGE_STORAGE_KEY = ADMIN_LANGUAGE_STORAGE_KEY;
export const APP_LANGUAGES = ADMIN_LANGUAGES;
export type AppLanguage = AdminLanguage;

const storedLanguage = localStorage.getItem(ADMIN_LANGUAGE_STORAGE_KEY);
const initialLanguage: AdminLanguage = storedLanguage === "en" ? "en" : "vi";

void i18n.use(initReactI18next).init({
  resources: { vi, en },
  lng: initialLanguage,
  fallbackLng: "vi",
  supportedLngs: ADMIN_LANGUAGES,
  defaultNS: "common",
  interpolation: { escapeValue: false },
  returnNull: false,
});

document.documentElement.lang = initialLanguage;

i18n.on("languageChanged", (language) => {
  const supportedLanguage: AdminLanguage = language === "en" ? "en" : "vi";
  localStorage.setItem(ADMIN_LANGUAGE_STORAGE_KEY, supportedLanguage);
  document.documentElement.lang = supportedLanguage;
});

export default i18n;
