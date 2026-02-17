import LandscapeGallery from "@/components/LandscapeGallery";
import { useLanguage } from "@/i18n/LanguageContext";

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <main>
      <LandscapeGallery />
    </main>
  );
};

export default Gallery;
