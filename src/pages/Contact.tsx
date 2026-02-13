import { useEffect, useState } from "react";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Contact = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="heading-caps text-muted-foreground mb-4">{t("contact.label")}</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light italic whitespace-pre-line">
            {t("contact.title")}
          </h1>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-16 transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Contact info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone size={18} strokeWidth={1} className="mt-1 text-muted-foreground" />
                <div>
                  <p className="heading-caps text-xs text-muted-foreground mb-1">{t("contact.phone")}</p>
                  <a href="tel:+38163423715" className="font-serif text-xl italic hover:opacity-60 transition-opacity">
                    +381 63 423 715
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={18} strokeWidth={1} className="mt-1 text-muted-foreground" />
                <div>
                  <p className="heading-caps text-xs text-muted-foreground mb-1">{t("contact.email")}</p>
                  <a href="mailto:an.photography.matrimoni@gmail.com" className="font-serif text-xl italic hover:opacity-60 transition-opacity">
                    an.photography.matrimoni@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram size={18} strokeWidth={1} className="mt-1 text-muted-foreground" />
                <div>
                  <p className="heading-caps text-xs text-muted-foreground mb-1">{t("contact.instagram")}</p>
                  <a
                    href="https://www.instagram.com/an_photography91"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl italic hover:opacity-60 transition-opacity"
                  >
                    @an_photography91
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={18} strokeWidth={1} className="mt-1 text-muted-foreground" />
                <div>
                  <p className="heading-caps text-xs text-muted-foreground mb-1">{t("contact.location")}</p>
                  <p className="font-serif text-xl italic">
                    {t("contact.locationValue")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="heading-caps text-xs text-muted-foreground block mb-2">
                {t("contact.formName")}
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-border pb-2 font-serif text-lg italic focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <label className="heading-caps text-xs text-muted-foreground block mb-2">
                {t("contact.formEmail")}
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-border pb-2 font-serif text-lg italic focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <label className="heading-caps text-xs text-muted-foreground block mb-2">
                {t("contact.formDate")}
              </label>
              <input
                type="date"
                className="w-full bg-transparent border-b border-border pb-2 font-serif text-lg italic focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div>
              <label className="heading-caps text-xs text-muted-foreground block mb-2">
                {t("contact.formMessage")}
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-border pb-2 font-serif text-lg italic focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="link-underline heading-caps text-xs mt-4"
            >
              {t("contact.formSubmit")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
