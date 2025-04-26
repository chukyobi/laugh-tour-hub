
import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 border-t border-white/10 bg-gradient-to-b from-background/80 to-background">
      <motion.div 
        className="container px-4 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <a href="#home" className="text-2xl font-display font-bold tracking-tight text-gradient mb-6">
            ALEX MILLER
          </a>
          
          <div className="flex items-center space-x-6 mb-8">
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all"
              aria-label="Twitter"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Twitter size={18} />
            </motion.a>
            <motion.a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all"
              aria-label="Instagram"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all"
              aria-label="Facebook"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Facebook size={18} />
            </motion.a>
            <motion.a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all"
              aria-label="YouTube"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Youtube size={18} />
            </motion.a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
            <a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#tour" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Tour
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </a>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Alex Miller. All rights reserved.</p>
            <p className="mt-1">Management: <a href="mailto:management@alexmiller.com" className="hover:text-primary transition-colors">management@alexmiller.com</a></p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
