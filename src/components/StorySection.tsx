import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const StorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1]">
            <span className="italic">{t("story.great")}</span>{" "}
            <span className="font-sans uppercase tracking-[0.1em]">{t("story.storyIs")}</span>
            <br />
            <span className="italic">{t("story.story")}</span>{" "}
            <span className="font-sans uppercase tracking-[0.1em]">{t("story.wellTold")}</span>
          </h2>
        </div>

        <div
          className={`mt-20 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 text-center md:text-left transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4">
            <p className="heading-caps text-sm text-foreground whitespace-pre-line">
              {t("story.notOnly")}
            </p>
            <p className="heading-caps text-sm text-foreground whitespace-pre-line">
              {t("story.providing")}
            </p>
          </div>

          <Link to={`/${localStorage.getItem("lang") || "en"}/kontakt`} className="link-underline heading-caps text-sm">
            {t("story.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
