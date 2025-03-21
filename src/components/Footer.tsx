
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-16 border-t border-border">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <a href="#home" className="text-2xl font-display font-bold tracking-tight text-primary mb-6">
            ALEX MILLER
          </a>
          
          <div className="flex items-center space-x-6 mb-8">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
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
      </div>
    </footer>
  );
};

export default Footer;
