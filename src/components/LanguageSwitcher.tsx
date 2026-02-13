import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language, languageNames } from "@/i18n/translations";

const languages: Language[] = ["en", "sr", "gr"];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = languageNames[language];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 heading-caps text-xs tracking-[0.15em] hover:opacity-60 transition-opacity"
        aria-label="Select language"
      >
        <span className="text-sm">{current.flag}</span>
        <span>{current.code}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-border shadow-lg min-w-[120px] z-[200]">
          {languages.map((lang) => {
            const info = languageNames[lang];
            return (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left heading-caps text-xs tracking-[0.1em] hover:bg-accent transition-colors ${
                  lang === language ? "opacity-100" : "opacity-60"
                }`}
              >
                <span className="text-sm">{info.flag}</span>
                <span>{info.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
