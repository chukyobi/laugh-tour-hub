
import React, { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container px-4 max-w-6xl mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium uppercase tracking-wide mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay Updated
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-6 text-gradient"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Never Miss a Show
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Subscribe to my newsletter for exclusive updates on new tour dates, special
            discounts, and behind-the-scenes content from life on the road.
          </motion.p>

          {isSubmitted ? (
            <motion.div 
              className="glass-morphism rounded-lg p-8 shadow-sm flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <CheckCircle2 size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thanks for subscribing!</h3>
              <p className="text-muted-foreground max-w-sm">
                You're all set to receive the latest updates on shows, special offers, and exclusive content.
              </p>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="relative flex-grow">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/10 transition-all text-white placeholder:text-muted-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 rounded-full bg-primary text-white text-sm font-medium transition-all hover:bg-primary/90 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
