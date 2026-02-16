import { useEffect } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";
import { validLanguages } from "@/i18n/LanguageContext";

const LanguageRoute = () => {
  const { lang } = useParams<{ lang: string }>();
  const { setLanguage } = useLanguage();

  const isValid = lang && validLanguages.includes(lang as Language);

  useEffect(() => {
    if (isValid) {
      setLanguage(lang as Language);
    }
  }, [lang, isValid, setLanguage]);

  if (!isValid) {
    return <Navigate to="/en" replace />;
  }

  return <Outlet />;
};

export default LanguageRoute;
