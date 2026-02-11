import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Wedding photography by Aleksandar Ničić"
        className={`absolute inset-0 w-full h-full object-cover object-bottom transition-all duration-[2s] ${
          loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-end justify-end h-full pb-20 pr-8 md:pr-16">
        <div
          className={`text-right transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h1 className="font-serif italic font-light text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.1]">
            Real editorial
          </h1>
          <h1 className="font-sans uppercase tracking-[0.15em] font-light text-4xl md:text-6xl lg:text-7xl text-primary-foreground mt-2">
            WEDDING
          </h1>
          <h1 className="font-serif italic font-light text-5xl md:text-7xl lg:text-8xl text-primary-foreground">
            photography
          </h1>
        </div>

        <p
          className={`heading-caps text-primary-foreground/80 text-xs mt-8 transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          ALLOWING YOUR UNIQUE MOMENTS TO AGE GRACEFULLY
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
