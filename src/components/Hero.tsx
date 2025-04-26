
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605134800822-06e6541a2917?q=80&w=1000')] bg-cover bg-center opacity-10 z-0"></div>
      </div>

      <div className="container px-4 z-10 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
        <motion.div 
          className="max-w-2xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span 
            className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium uppercase tracking-wide"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Live On Tour
          </motion.span>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-none text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            ALEX <span className="text-primary">MILLER</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Turning everyday observations into extraordinary comedy that leaves
            audiences breathless with laughter.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <a
              href="#tour"
              className="group px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:bg-primary/90 hover:scale-105 w-full sm:w-auto flex items-center justify-center"
            >
              View Tour Dates
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#featured"
              className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-medium transition-all hover:bg-secondary/80 hover:scale-105 w-full sm:w-auto"
            >
              Featured Show
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-primary/10 transform hover:scale-[1.01] transition-transform duration-500 glass-morphism">
            <img 
              src="https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=800" 
              alt="Alex Miller" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
              <Button className="bg-primary/80 hover:bg-primary backdrop-blur-sm">
                Watch Trailer
              </Button>
            </div>
          </div>
          
          <motion.div 
            className="absolute -top-4 -right-4 bg-primary/20 neo-blur rounded-full p-3 shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs font-bold px-2 text-white">NEW TOUR</span>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-3 -left-3 bg-primary/10 backdrop-blur-sm rounded-lg p-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <div id="featured" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/20 to-transparent z-10"></div>

      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a href="#featured" className="text-primary/50 hover:text-primary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
