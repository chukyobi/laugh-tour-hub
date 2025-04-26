
import React from "react";
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Get the next upcoming show (first one that's not sold out)
const nextShow = {
  id: 2,
  date: "June 18, 2023",
  time: "7:30 PM",
  city: "Boston, MA",
  venue: "Wilbur Theatre",
  address: "246 Tremont St, Boston, MA 02116",
  status: "Available",
  ticketLink: "/shows/2",
  isTour: true,
  imageUrl: "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?q=80&w=800",
  description: "Don't miss the Boston leg of Alex's 'Everyday Extraordinary' tour. Following his sold-out show last year, Alex returns to the Wilbur with fresh material and his trademark observational wit. This performance features a special Q&A segment at the end, where Alex will take questions from the audience."
};

const FeaturedShow: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="container px-4">
        <motion.div 
          className="flex flex-col items-center text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/20">Featured Show</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-gradient">Don't Miss The Next Big Show</h2>
          <p className="text-muted-foreground max-w-2xl">
            Grab your tickets now for Alex Miller's next performance
          </p>
        </motion.div>

        <motion.div
          className="overflow-hidden glass-morphism border-primary/20 shadow-xl rounded-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden">
              <motion.div 
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10" />
                <img 
                  src={nextShow.imageUrl} 
                  alt={`${nextShow.city} Show`} 
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <Badge 
                className="absolute top-4 left-4 z-20 bg-primary text-primary-foreground"
              >
                {nextShow.status}
              </Badge>
            </div>
            
            <div className="p-6 flex flex-col justify-between">
              <div>
                <motion.h3 
                  className="text-2xl font-bold font-display mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {nextShow.city}
                </motion.h3>
                <motion.div 
                  className="flex items-center text-sm text-muted-foreground mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Calendar size={16} className="mr-1 text-primary/80" />
                  <span>{nextShow.date} • {nextShow.time}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center text-sm text-muted-foreground mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <MapPin size={16} className="mr-1 text-primary/80" />
                  <span>{nextShow.venue}</span>
                </motion.div>
                
                <Separator className="my-4 bg-white/10" />
                
                <motion.p 
                  className="text-muted-foreground mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {nextShow.description}
                </motion.p>
              </div>
              
              <div className="space-y-4">
                <Link to={`/shows/${nextShow.id}`} className="w-full">
                  <Button 
                    className="w-full group bg-primary hover:bg-primary/90"
                  >
                    <span>Show Details</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link to={`/shows/${nextShow.id}/seating`} className="w-full">
                  <Button 
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-secondary"
                  >
                    <Ticket size={16} className="mr-2" />
                    <span>Get Tickets</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedShow;
