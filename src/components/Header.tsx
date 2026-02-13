import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import logo from "@/assets/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.contact"), path: "/kontakt" },
    { label: t("nav.calendar"), path: "/kalendar" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-4 md:py-6 bg-background/80 backdrop-blur-sm">
        <div className="flex-1" />
        
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <h1 className="font-serif text-sm md:text-xl tracking-[0.3em] font-light uppercase whitespace-nowrap">
            Aleksandar Ničić
          </h1>
          <img src={logo} alt="AN Logo" className="h-7 md:h-9 w-auto" />
        </Link>
        
        <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(true)}
            className="heading-caps text-xs tracking-[0.2em] hover:opacity-60 transition-opacity"
            aria-label="Open menu"
          >
            {t("nav.menu")}
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-background transition-all duration-500 flex flex-col items-center justify-center ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 md:right-12 text-foreground hover:opacity-60 transition-opacity"
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1} />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`font-serif text-4xl md:text-5xl font-light italic tracking-wide transition-opacity hover:opacity-60 ${
                location.pathname === item.path ? "opacity-100" : "opacity-70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
