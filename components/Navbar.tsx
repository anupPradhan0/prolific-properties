"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Buy", href: "/buy" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container flex h-16 items-center justify-between gap-4 md:h-20"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Prolific Properties logo" width={40} height={40} className="h-9 w-auto md:h-10" />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground lg:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden text-sm text-muted-foreground xl:block">Bhubaneswar · Odisha</span>
          <Button asChild size="lg" className="hidden sm:inline-flex">
            <Link href="/contact-us">Get in touch</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </motion.nav>

      {mobileOpen && (
        <div className="border-t border-border bg-surface lg:hidden">
          <div className="container flex flex-col gap-2 py-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-surface-strong hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 sm:hidden">
              <Link href="/contact-us" onClick={() => setMobileOpen(false)}>
                Get in touch
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
