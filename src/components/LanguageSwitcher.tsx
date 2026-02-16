import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language, languageNames } from "@/i18n/translations";

const languages: Language[] = ["en", "sr", "gr"];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    // Replace the language prefix in the current path
    const pathParts = location.pathname.split("/").filter(Boolean);
    const validLangs: string[] = ["en", "sr", "gr"];
    if (pathParts.length > 0 && validLangs.includes(pathParts[0])) {
      pathParts[0] = lang;
    } else {
      pathParts.unshift(lang);
    }
    navigate("/" + pathParts.join("/"));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 heading-caps text-xs tracking-[0.15em] hover:opacity-60 transition-opacity"
        aria-label="Select language"
      >
        <img src={current.flag} alt="" className="w-5 h-auto rounded-sm" />
        <span>{current.code}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-border shadow-lg min-w-[120px] z-[200]">
          {languages.map((lang) => {
            const info = languageNames[lang];
            return (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left heading-caps text-xs tracking-[0.1em] hover:bg-accent transition-colors ${
                  lang === language ? "opacity-100" : "opacity-60"
                }`}
              >
                <img src={info.flag} alt="" className="w-5 h-auto rounded-sm" />
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
