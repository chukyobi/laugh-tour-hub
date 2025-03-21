
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Mock sponsors data - replace with actual sponsor logos
const sponsors = [
  { name: "Acme Inc", logo: "https://placehold.co/200x100/242424/white?text=ACME" },
  { name: "TechCorp", logo: "https://placehold.co/200x100/242424/white?text=TECHCORP" }, 
  { name: "Global Media", logo: "https://placehold.co/200x100/242424/white?text=GLOBAL" },
  { name: "Sound Systems", logo: "https://placehold.co/200x100/242424/white?text=SOUND" },
  { name: "Stage Pro", logo: "https://placehold.co/200x100/242424/white?text=STAGE" },
  { name: "Beverage Co", logo: "https://placehold.co/200x100/242424/white?text=BEVERAGE" },
];

const SponsorsCarousel = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container">
        <h2 className="text-center text-2xl font-bold mb-8">Our Sponsors</h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {sponsors.map((sponsor, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Card className="border-none">
                    <CardContent className="flex items-center justify-center p-6 h-28">
                      <img 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`}
                        className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="static translate-y-0 mx-2" />
            <CarouselNext className="static translate-y-0 mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default SponsorsCarousel;
