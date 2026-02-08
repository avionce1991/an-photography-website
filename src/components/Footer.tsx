import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 md:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="font-serif text-lg italic text-muted-foreground">
          Aleksandar Ničić
        </p>

        <div className="flex items-center gap-8">
          <a
            href="tel:+381XXXXXXXXX"
            className="flex items-center gap-2 heading-caps text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Phone"
          >
            <Phone size={16} strokeWidth={1} />
            <span>[DODAJ TELEFON]</span>
          </a>
          
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} strokeWidth={1} />
          </a>
          
          <a
            href="mailto:email@example.com"
            className="flex items-center gap-2 heading-caps text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={16} strokeWidth={1} />
            <span>[DODAJ EMAIL]</span>
          </a>
        </div>

        <p className="heading-caps text-xs text-muted-foreground">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
