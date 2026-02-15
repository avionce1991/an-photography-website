import { useRef, useEffect, useState } from "react";

import { image } from "../images";

const images = [
  image.gallery1,
  image.gallery2,
  image.gallery3,
  image.gallery4,
  image.gallery5,
  image.gallery6,
  image.gallery7,
  image.gallery8,
  image.gallery9,
  
];

const HorizontalGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;

      if (sectionTop <= 0 && sectionTop >= -sectionHeight) {
        const progress = Math.abs(sectionTop) / sectionHeight;
        const maxTranslate = (images.length - 1) * 100;
        setTranslateX(-progress * maxTranslate);
      } else if (sectionTop > 0) {
        setTranslateX(0);
      } else {
        setTranslateX(-(images.length - 1) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalImages = images.length;

  return (
    <section
      ref={sectionRef}
      style={{ height: `${totalImages * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="flex h-full items-stretch"
          style={{
            width: `${totalImages * 100}vw`,
            transform: `translateX(${translateX}vw)`,
            willChange: "transform",
          }}
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
                className={`w-full h-full object-contain ${i === 3 ? "" : "md:object-cover"}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
