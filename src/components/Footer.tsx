import logo from "@/assets/logo.png";

const footerLinks = [
  { label: "Listings", href: "#listings" },
  { label: "Search", href: "#search" },
  { label: "About", href: "#about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => (
  <footer className="border-t border-border/70 py-8">
    <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Prolific Properties logo" className="h-10 w-auto" />
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Modern property advisory for premium homes, rentals, and new launches across Bhubaneswar and beyond.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:items-end">
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-muted-foreground">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          © 2026 Prolific Properties · Bhubaneswar, Odisha
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
