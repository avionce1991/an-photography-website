import { useEffect, useRef, useState } from "react";
import photographerImg from "@/assets/photographer-portrait.jpg";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Text - left */}
        <div
          className={`space-y-6 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="heading-caps text-muted-foreground">O meni</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light italic leading-tight">
            Svaka priča zaslužuje da bude ispričana
          </h2>
          <p className="text-muted-foreground leading-relaxed font-light">
            [DODAJ TEKST O SEBI — Ovde ide tvoj lični opis, tvoj pristup fotografiji, 
            šta te inspiriše i zašto voliš da fotografišeš venčanja. 
            Tekst ćeš naknadno dostaviti.]
          </p>
          <a href="/kontakt" className="link-underline heading-caps text-xs inline-block mt-4">
            KONTAKTIRAJ ME
          </a>
        </div>

        {/* Photo - right */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={photographerImg}
              alt="Aleksandar Ničić - Wedding Photographer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
