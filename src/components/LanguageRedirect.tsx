import { Navigate } from "react-router-dom";
import { detectLanguage } from "@/i18n/LanguageContext";

const LanguageRedirect = () => {
  const lang = detectLanguage();
  return <Navigate to={`/${lang}`} replace />;
};

export default LanguageRedirect;
