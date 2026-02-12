import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Početna", path: "/" },
    { label: "Kontakt", path: "/kontakt" },
    { label: "Kalendar", path: "/kalendar" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-background/80 backdrop-blur-sm">
        <div className="flex-1" />
        
        <Link to="/" className="flex-1 flex items-center justify-center gap-3">
          <img src={logo} alt="AN Logo" className="h-8 md:h-9 w-auto" />
          <h1 className="font-serif text-lg md:text-xl tracking-[0.3em] font-light uppercase">
            Aleksandar Ničić
          </h1>
        </Link>
        
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setMenuOpen(true)}
            className="heading-caps text-xs tracking-[0.2em] hover:opacity-60 transition-opacity"
            aria-label="Open menu"
          >
            MENU
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
