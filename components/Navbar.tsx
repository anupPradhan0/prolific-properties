"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Buy", href: "/buy" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Admin", href: "/admin/login" },
];

const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container flex h-20 items-center justify-between gap-4"
    >
      <a href="/" className="flex items-center">
        <Image src={logo} alt="Prolific Properties logo" width={40} height={40} className="h-10 w-auto" />
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
          <a href="/contact">Get in touch</a>
        </Button>
      </div>
    </motion.nav>
  </header>
);

export default Navbar;
