import { motion } from "framer-motion";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Buy", href: "#listings" },
  { label: "Rent", href: "#search" },
  { label: "Sell", href: "#about" },
  { label: "Projects", href: "#listings" },
  { label: "About", href: "#about" },
];

const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container flex h-20 items-center justify-between gap-4"
    >
      <a href="#top" className="flex items-center">
        <img src={logo} alt="Prolific Properties logo" className="h-10 w-auto" />
      </a>

      <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="transition-colors hover:text-primary">
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden xl:block text-sm text-muted-foreground">Bhubaneswar · Odisha</span>
        <Button asChild size="lg">
          <a href="#contact">Get in touch</a>
        </Button>
      </div>
    </motion.nav>
  </header>
);

export default Navbar;
