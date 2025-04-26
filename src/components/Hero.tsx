
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-16 overflow-hidden bg-[#000000e6]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605134800822-06e6541a2917?q=80&w=1000')] bg-cover bg-center opacity-20 z-0"></div>
      </div>

      <div className="container px-4 z-10 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
        <motion.div 
          className="max-w-2xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ALEX <span className="text-[#9b87f5]">MILLER</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Turning everyday observations into extraordinary comedy that leaves
            audiences breathless with laughter.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="#tour"
              className="group px-6 py-3 rounded-full bg-[#9b87f5] text-white text-sm font-medium transition-all hover:bg-[#9b87f5]/90 hover:scale-105 w-full sm:w-auto flex items-center justify-center"
            >
              View Tour Dates
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#featured"
              className="px-6 py-3 rounded-full bg-white/10 text-white text-sm font-medium transition-all hover:bg-white/20 hover:scale-105 w-full sm:w-auto"
            >
              Featured Show
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform hover:scale-[1.01] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=800" 
              alt="Alex Miller" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
              <button className="bg-[#9b87f5]/80 hover:bg-[#9b87f5] text-white px-4 py-2 rounded-full backdrop-blur-sm transition-colors">
                Watch Trailer
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a href="#featured" className="text-[#9b87f5]/50 hover:text-[#9b87f5] transition-colors">
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
