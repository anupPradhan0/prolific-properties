import { motion } from "framer-motion";

const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center justify-between px-9 py-5 border-b border-border"
  >
    <div className="font-display text-[22px] font-semibold tracking-wider text-foreground">
      Prolific <em className="text-gold not-italic">Properties</em>
    </div>
    <div className="hidden md:flex gap-7 text-[12.5px] text-cream-muted tracking-wide">
      <span className="cursor-pointer hover:text-gold transition-colors">Buy</span>
      <span className="cursor-pointer hover:text-gold transition-colors">Rent</span>
      <span className="cursor-pointer hover:text-gold transition-colors">Sell</span>
      <span className="cursor-pointer hover:text-gold transition-colors">Projects</span>
      <span className="cursor-pointer hover:text-gold transition-colors">About</span>
    </div>
    <button className="border border-gold/50 text-gold text-xs px-5 py-2 tracking-widest uppercase font-body hover:bg-gold hover:text-primary-foreground transition-colors">
      Get in touch
    </button>
  </motion.nav>
);

export default Navbar;
