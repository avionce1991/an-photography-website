import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const COOKIE_KEY = "cookie_consent";

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setShow(false);
    // Enable Meta Pixel tracking
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("consent", "grant");
    }
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setShow(false);
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("consent", "revoke");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] p-4 md:p-6">
      <div className="max-w-xl mx-auto bg-background border border-border shadow-lg p-5 md:p-6 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-muted-foreground font-light flex-1 text-center sm:text-left">
          {t("cookie.text")}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="heading-caps text-xs tracking-[0.15em] px-4 py-2 border border-border hover:bg-accent transition-colors"
          >
            {t("cookie.decline")}
          </button>
          <button
            onClick={handleAccept}
            className="heading-caps text-xs tracking-[0.15em] px-4 py-2 bg-foreground text-background hover:opacity-80 transition-opacity"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
