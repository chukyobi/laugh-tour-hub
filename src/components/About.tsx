
import React from "react";
import { Award, Star, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-background/95 to-background">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium uppercase tracking-wide mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              About Me
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-gradient"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Turning everyday moments into extraordinary comedy
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              With over a decade of stand-up experience, I've honed my craft on stages
              across the country, delivering sharp observations and unexpected punchlines
              that connect with audiences from all walks of life.
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              My comedy finds the absurdity in daily life, exploring topics from 
              technology failures to family gatherings with a unique perspective
              that's both relatable and surprising. When I'm not on tour, I'm
              developing new material, producing podcasts, and writing for various
              comedy platforms.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-6 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <ThumbsUp size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">300+</p>
                  <p className="text-sm text-muted-foreground">Shows per year</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Award size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">12</p>
                  <p className="text-sm text-muted-foreground">Comedy awards</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Star size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">2</p>
                  <p className="text-sm text-muted-foreground">Special appearances</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.a 
              href="#contact" 
              className="px-6 py-3 rounded-full bg-primary text-white text-sm font-medium transition-all hover:bg-primary/90 hover:scale-105 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Contact for Bookings
            </motion.a>
          </motion.div>

          <motion.div 
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative z-10 rounded-2xl overflow-hidden shadow-xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
              whileHover={{ scale: 1.02, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1585951635728-5978320730cb?q=80&w=1000" 
                alt="Alex Miller performing on stage" 
                className="w-full h-[500px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </motion.div>
            <div className="absolute top-6 -left-6 w-full h-full bg-primary/10 rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
