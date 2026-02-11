import { useEffect, useRef, useState } from "react";

import masonry1 from "@/assets/masonry-1.jpg";
import masonry2 from "@/assets/masonry-2.jpg";
import masonry3 from "@/assets/masonry-3.jpg";
import masonry4 from "@/assets/masonry-4.jpg";
import masonry5 from "@/assets/masonry-5.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";

// 30 images by duplicating the available ones
const allImages = [
  masonry1, masonry2, masonry3, masonry4, masonry5,
  gallery1, gallery2, gallery3, gallery4, gallery5,
  gallery6, gallery7, gallery8, gallery9, masonry1,
  masonry2, masonry3, masonry4, masonry5, gallery1,
  gallery2, gallery3, gallery4, gallery5, gallery6,
  gallery7, gallery8, gallery9, masonry1, masonry2,
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
