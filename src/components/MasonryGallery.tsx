import { useEffect, useRef, useState, useCallback } from "react";

import { image } from "../images";

// 32 images to fill 4 columns evenly (8 per column)
const allImages = [
  image.masonry1, image.masonry2, image.masonry3, image.masonry4, image.masonry5,
  image.gallery1, image.gallery2, image.gallery3, image.gallery4, image.gallery5,
  image.gallery6, image.gallery7, image.gallery8, image.gallery9, image.masonry1,
  image.masonry2, image.masonry3, image.masonry4, image.masonry5, image.gallery1,
  image.gallery2, image.gallery3, image.gallery4, image.gallery5, image.gallery6,
  image.gallery7, image.gallery8, image.gallery9, image.masonry1, image.masonry2,
  image.masonry3, image.masonry4,
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
  );
};

export default MasonryGallery;
