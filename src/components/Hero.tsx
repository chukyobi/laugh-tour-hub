
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605134800822-06e6541a2917?q=80&w=1000')] bg-cover bg-center opacity-20 z-0"></div>
      </div>

      <div className="container px-4 z-10 flex flex-col items-center justify-center space-y-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 opacity-0 animate-fade-in animate-delay-100">
          <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium uppercase tracking-wide">
            Live On Tour
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-none">
            ALEX MILLER
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Turning everyday observations into extraordinary comedy that leaves
            audiences breathless with laughter.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 opacity-0 animate-fade-in animate-delay-300">
          <a
            href="#tour"
            className="group px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:bg-primary/90 hover:scale-105 w-full sm:w-auto flex items-center justify-center"
          >
            View Tour Dates
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#tickets"
            className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-medium transition-all hover:bg-secondary/80 hover:scale-105 w-full sm:w-auto"
          >
            Get Tickets
          </a>
        </div>
      </div>

      {/* Bottom fade transition to Tour section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent z-10"></div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce z-20">
        <a href="#tour" className="text-primary/50 hover:text-primary transition-colors">
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
      </div>
    </section>
  );
};

export default Hero;
