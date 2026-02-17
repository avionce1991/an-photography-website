import { useEffect, useRef, useState, useCallback } from "react";
import { landscapeImages } from "@/landscapeImages";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const LandscapeGalleryImage = ({ src, index }: { src: string; index: number }) => {
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
      { threshold: 0.05, rootMargin: "100px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Staggered animation based on column position
  const colDelay = (index % 3) * 120;

  return (
    <div
      ref={ref}
      className="overflow-hidden cursor-pointer group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.95)",
        transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${colDelay}ms, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${colDelay}ms`,
      }}
    >
      <img
        src={src}
        alt={`Gallery photo ${index + 1}`}
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

const LandscapeGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % landscapeImages.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + landscapeImages.length) % landscapeImages.length
        : null
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  // Split images into columns for masonry
  const getColumns = (count: number) => {
    const cols: { src: string; originalIndex: number }[][] = Array.from(
      { length: count },
      () => []
    );
    landscapeImages.forEach((img, i) => {
      cols[i % count].push({ src: img, originalIndex: i });
    });
    return cols;
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 lg:px-12">
      {/* Desktop: 3 columns */}
      <div className="hidden md:grid grid-cols-3 gap-3 lg:gap-4">
        {getColumns(3).map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-3 lg:gap-4">
            {col.map((item) => (
              <div
                key={item.originalIndex}
                onClick={() => openLightbox(item.originalIndex)}
              >
                <LandscapeGalleryImage
                  src={item.src}
                  index={item.originalIndex}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: 2 columns */}
      <div className="grid md:hidden grid-cols-2 gap-2">
        {getColumns(2).map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-2">
            {col.map((item) => (
              <div
                key={item.originalIndex}
                onClick={() => openLightbox(item.originalIndex)}
              >
                <LandscapeGalleryImage
                  src={item.src}
                  index={item.originalIndex}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} strokeWidth={1} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>

          <img
            src={landscapeImages[lightboxIndex]}
            alt={`Gallery photo ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
            {lightboxIndex + 1} / {landscapeImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default LandscapeGallery;
