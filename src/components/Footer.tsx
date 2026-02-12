import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 md:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 text-center">
        <p className="font-serif text-lg italic text-muted-foreground">
          Aleksandar Ničić
        </p>

        <div className="flex items-center gap-8">
          <a
            href="tel:+38163423715"
            className="flex items-center gap-2 heading-caps text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Phone"
          >
            <Phone size={16} strokeWidth={1} />
            <span>+381 63 423 715</span>
          </a>
          
          <a
            href="https://www.instagram.com/an_photography91"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} strokeWidth={1} />
          </a>
          
          <a
            href="mailto:an.photography.matrimoni@gmail.com"
            className="flex items-center gap-2 heading-caps text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={16} strokeWidth={1} />
            <span>an.photography.matrimoni@gmail.com</span>
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
