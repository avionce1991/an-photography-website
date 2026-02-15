import { useEffect, useRef, useState } from "react";

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

const MasonryGallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Split into 4 columns for desktop, 2 for mobile
  const getColumns = (count: number) => {
    const cols: string[][] = Array.from({ length: count }, () => []);
    allImages.forEach((img, i) => {
      cols[i % count].push(img);
    });
    return cols;
  };

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-8">
      <div
        className={`transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Desktop: 4 columns */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {getColumns(4).map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className="overflow-hidden group"
                  style={{
                    animationDelay: `${(colIdx * 100) + (imgIdx * 50)}ms`,
                  }}
                >
                  <img
                    src={img}
                    alt={`Wedding photography ${colIdx * 8 + imgIdx + 1}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: 2 columns */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {getColumns(2).map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3">
              {col.map((img, imgIdx) => (
                <div key={imgIdx} className="overflow-hidden">
                  <img
                    src={img}
                    alt={`Wedding photography ${colIdx * 15 + imgIdx + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasonryGallery;
