import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

import { image } from "../images";

const images = [image.masonry1, image.masonry2, image.masonry3, image.masonry4];

const InstagramSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div
        className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1]">
          <span className="font-sans uppercase tracking-[0.15em]">{t("instagram.checkOut")}</span>{" "}
          <span className="italic">{t("instagram.instagram")}</span>
        </h2>
      </div>

      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 md:px-8 transition-all duration-1000 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {images.map((img, i) => (
          <a
            key={i}
            href="https://www.instagram.com/an_photography91"
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-hidden group block"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={img}
                alt={`Instagram photo ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </a>
        ))}
      </div>

      <div
        className={`text-center mt-10 md:mt-14 transition-all duration-1000 delay-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <a
          href="https://www.instagram.com/an_photography91"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 heading-caps text-sm border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <Instagram size={18} strokeWidth={1} />
          {t("instagram.follow")}
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;
