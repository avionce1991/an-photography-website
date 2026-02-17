import { useEffect, useRef, useState, useCallback } from "react";

import { image } from "../images";

const allImages = [
  image.masonry7, image.masonry2, image.masonry10, image.masonry15, image.masonry4,
  image.masonry28, image.masonry12, image.masonry21, image.masonry9, image.masonry29,
  image.masonry1, image.masonry18, image.masonry5, image.masonry14, image.masonry31,
  image.masonry8, image.masonry20, image.masonry3, image.masonry11, image.masonry25,
  image.masonry6, image.masonry17, image.masonry32, image.masonry23, image.masonry13,
  image.masonry19, image.masonry16, image.masonry22, image.masonry24, image.masonry27, 
  image.masonry26, image.masonry30
];

const MasonryImage = ({ src, alt, delay }: { src: string; alt: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
    </div>
  );
};

const MasonryGallery = () => {
  // Split into columns
  const getColumns = (count: number) => {
    const cols: string[][] = Array.from({ length: count }, () => []);
    allImages.forEach((img, i) => {
      cols[i % count].push(img);
    });
    return cols;
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: '<!-- COMPONENT: MasonryGallery -->' }} />
      <section className="py-16 md:py-24 px-4 md:px-8">
        {/* Desktop: 4 columns */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {getColumns(4).map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((img, imgIdx) => (
                <MasonryImage
                  key={imgIdx}
                  src={img}
                  alt={`Wedding photography ${colIdx * 8 + imgIdx + 1}`}
                  delay={colIdx * 80}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: 2 columns */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {getColumns(2).map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3">
              {col.map((img, imgIdx) => (
                <MasonryImage
                  key={imgIdx}
                  src={img}
                  alt={`Wedding photography ${colIdx * 15 + imgIdx + 1}`}
                  delay={colIdx * 60}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MasonryGallery;
