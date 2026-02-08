import { useRef, useEffect, useState } from "react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";

const images = [
  gallery1, gallery2, gallery3, gallery4, gallery5,
  gallery6, gallery7, gallery8, gallery9, gallery10,
];

const HorizontalGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef.current;
    if (!section || !container) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;

      if (sectionTop <= 0 && sectionTop >= -sectionHeight) {
        const progress = Math.abs(sectionTop) / sectionHeight;
        setScrollProgress(progress);
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollLeft = progress * maxScroll;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Height = 100vh (sticky) + enough scroll distance for horizontal content
  const totalImages = images.length;

  return (
    <section
      ref={sectionRef}
      style={{ height: `${totalImages * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex h-full items-stretch overflow-hidden"
          style={{ width: "100%" }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-full"
              style={{ width: "100vw" }}
            >
              <img
                src={img}
                alt={`Wedding photography ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.round(scrollProgress * (totalImages - 1)) === i
                  ? "bg-primary-foreground scale-125"
                  : "bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
