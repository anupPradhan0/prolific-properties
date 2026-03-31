import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center justify-between px-9 py-4 border-b border-border bg-background"
  >
    <img src={logo} alt="Prolific Properties" className="h-9" />
    <div className="hidden md:flex gap-7 text-[13px] text-muted-foreground tracking-wide">
      <span className="cursor-pointer hover:text-primary transition-colors">Buy</span>
      <span className="cursor-pointer hover:text-primary transition-colors">Rent</span>
      <span className="cursor-pointer hover:text-primary transition-colors">Sell</span>
      <span className="cursor-pointer hover:text-primary transition-colors">Projects</span>
      <span className="cursor-pointer hover:text-primary transition-colors">About</span>
    </div>
    <button className="bg-primary text-primary-foreground text-xs px-5 py-2.5 rounded tracking-widest uppercase font-body font-medium hover:bg-blue-accent-light transition-colors">
      Get in touch
    </button>
  </motion.nav>
);

export default Navbar;
