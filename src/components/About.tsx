
import { Award, Star, ThumbsUp } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1 opacity-0 animate-slide-up animate-delay-200">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wide mb-6">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Turning everyday moments into extraordinary comedy
            </h2>
            <p className="text-muted-foreground mb-6">
              With over a decade of stand-up experience, I've honed my craft on stages
              across the country, delivering sharp observations and unexpected punchlines
              that connect with audiences from all walks of life.
            </p>
            <p className="text-muted-foreground mb-8">
              My comedy finds the absurdity in daily life, exploring topics from 
              technology failures to family gatherings with a unique perspective
              that's both relatable and surprising. When I'm not on tour, I'm
              developing new material, producing podcasts, and writing for various
              comedy platforms.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <ThumbsUp size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">300+</p>
                  <p className="text-sm text-muted-foreground">Shows per year</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Award size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">12</p>
                  <p className="text-sm text-muted-foreground">Comedy awards</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Star size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">2</p>
                  <p className="text-sm text-muted-foreground">Special appearances</p>
                </div>
              </div>
            </div>

            <a 
              href="#contact" 
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:bg-primary/90 hover:scale-105 inline-block"
            >
              Contact for Bookings
            </a>
          </div>

          <div className="order-1 md:order-2 relative opacity-0 animate-slide-up">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1585951635728-5978320730cb?q=80&w=1000" 
                alt="Alex Miller performing on stage" 
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
            <div className="absolute top-6 -left-6 w-full h-full bg-secondary rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
