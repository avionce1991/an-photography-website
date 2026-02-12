import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const StorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1]">
            <span className="italic">Great</span>{" "}
            <span className="font-sans uppercase tracking-[0.1em]">STORY IS A</span>
            <br />
            <span className="italic">story</span>{" "}
            <span className="font-sans uppercase tracking-[0.1em]">WELL TOLD</span>
          </h2>
        </div>

        <div
          className={`mt-20 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 text-center md:text-left transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4">
            <p className="heading-caps text-sm text-foreground">
              BUT IT'S NOT ONLY ABOUT
              <br />
              TAKING GREAT PHOTOS
            </p>
            <p className="heading-caps text-sm text-foreground">
              IT'S ABOUT PROVIDING YOU
              <br />
              WITH A WHOLE EXPERIENCE
            </p>
          </div>

          <Link to="/kontakt" className="link-underline heading-caps text-sm">
            GET IN TOUCH WITH ME
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
