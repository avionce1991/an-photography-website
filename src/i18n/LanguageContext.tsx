import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  localePath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const validLanguages: Language[] = ["en", "sr", "gr"];

export const detectLanguage = (): Language => {
  // Check localStorage first
  const saved = localStorage.getItem("lang") as Language;
  if (saved && translations[saved]) return saved;

  // Check browser language
  const browserLang = navigator.language?.toLowerCase() || "";
  if (browserLang.startsWith("sr") || browserLang.startsWith("bs") || browserLang.startsWith("hr")) return "sr";
  if (browserLang.startsWith("el")) return "gr";
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang") as Language;
    return saved && translations[saved] ? saved : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  const localePath = (path: string): string => {
    return `/${language}${path.startsWith("/") ? path : "/" + path}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localePath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
