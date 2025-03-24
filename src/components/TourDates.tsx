
import { useState } from "react";
import { Calendar, MapPin, Ticket, Clock, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Tour date data - upcoming shows
const upcomingShows = [
  {
    id: 1,
    date: "June 12, 2023",
    city: "New York, NY",
    venue: "Comedy Cellar",
    status: "Sold Out",
    ticketLink: "/shows/1",
    isTour: true,
    description: "A night of laughter with Alex Miller's signature observational comedy."
  },
  {
    id: 2,
    date: "June 18, 2023",
    city: "Boston, MA",
    venue: "Wilbur Theatre",
    status: "Available",
    ticketLink: "/shows/2",
    isTour: true,
    description: "Don't miss the Boston leg of Alex's 'Everyday Extraordinary' tour."
  },
  {
    id: 3,
    date: "June 24, 2023",
    city: "Chicago, IL",
    venue: "The Laugh Factory",
    status: "Available",
    ticketLink: "/shows/3",
    isTour: true,
    description: "Alex brings his unique perspective on everyday life to the Windy City."
  },
  {
    id: 4,
    date: "July 2, 2023",
    city: "Austin, TX",
    venue: "Cap City Comedy",
    status: "Few Left",
    ticketLink: "/shows/4",
    isTour: true,
    description: "Alex's first time in Austin - expect special Texas-themed material."
  },
  {
    id: 5,
    date: "July 8, 2023",
    city: "Los Angeles, CA",
    venue: "The Comedy Store",
    status: "Available",
    ticketLink: "/shows/5",
    isTour: true,
    description: "Back to where it all began - a special homecoming show at The Comedy Store."
  },
  {
    id: 6,
    date: "July 15, 2023",
    city: "Seattle, WA",
    venue: "The Paramount Theatre",
    status: "Available",
    ticketLink: "/shows/6",
    isTour: true,
    description: "Alex's Pacific Northwest debut with all-new material."
  }
];

// Past shows data
const pastShows = [
  {
    id: 101,
    date: "May 5, 2023",
    city: "Philadelphia, PA",
    venue: "Helium Comedy Club",
    videoLink: "/videos/philadelphia",
    description: "Alex's sold-out weekend at Helium featured his now-viral 'Grocery Shopping' bit."
  },
  {
    id: 102,
    date: "April 22, 2023",
    city: "Denver, CO",
    venue: "Comedy Works",
    videoLink: "/videos/denver",
    description: "A special one-night-only performance with surprise guest appearances."
  },
  {
    id: 103,
    date: "April 15, 2023",
    city: "Atlanta, GA",
    venue: "Laughing Skull Lounge",
    videoLink: "/videos/atlanta",
    description: "The final show of Alex's 'Hilarious Everyday' mini-tour through the South."
  },
  {
    id: 104,
    date: "March 18, 2023",
    city: "Portland, OR",
    venue: "Helium Comedy Club",
    videoLink: "/videos/portland",
    description: "A rain-soaked night of laughter that birthed Alex's famous 'Weather App' routine."
  }
];

const TourDates = () => {
  const [upcomingVisibleCount, setUpcomingVisibleCount] = useState(3);
  const [pastVisibleCount, setPastVisibleCount] = useState(2);
  
  return (
    <section
      id="tour"
      className="relative py-20 md:py-32 bg-secondary"
    >
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wide mb-4">
            Shows & Events
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Live Comedy Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join Alex Miller for a night of laughter and unforgettable moments.
            Check out upcoming tour dates and grab your tickets before they're gone.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" className="text-sm md:text-base">
              Upcoming Shows
            </TabsTrigger>
            <TabsTrigger value="past" className="text-sm md:text-base">
              Past Shows
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-8 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingShows.slice(0, upcomingVisibleCount).map((show) => (
                <Card key={show.id} className="overflow-hidden hover:shadow-md transition-all group">
                  <div className="h-3 bg-primary" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground mb-1 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {show.date}
                        </span>
                        <h3 className="font-bold text-xl">{show.city}</h3>
                        <span className="text-sm text-muted-foreground mt-1 flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {show.venue}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            show.status === "Sold Out"
                              ? "bg-destructive/10 text-destructive"
                              : show.status === "Few Left"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          )}
                        >
                          {show.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {show.description}
                    </p>
                    
                    <Link
                      href={show.ticketLink}
                      className={cn(
                        "w-full inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-medium transition-all",
                        show.status === "Sold Out"
                          ? "bg-secondary text-muted-foreground cursor-not-allowed"
                          : "bg-primary text-white hover:bg-primary/90 group-hover:translate-y-0"
                      )}
                      onClick={(e) => show.status === "Sold Out" && e.preventDefault()}
                    >
                      <Ticket size={16} className="mr-2" />
                      {show.status === "Sold Out" ? "Sold Out" : "View Details & Tickets"}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {upcomingVisibleCount < upcomingShows.length && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setUpcomingVisibleCount(upcomingShows.length)}
                  variant="outline"
                  className="bg-white hover:bg-primary/5"
                >
                  Load More Shows
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-8 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastShows.slice(0, pastVisibleCount).map((show) => (
                <Card key={show.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <History size={14} className="mr-1" />
                        {show.date}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-1">{show.city}</h3>
                    <div className="text-sm text-muted-foreground mb-3 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {show.venue}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {show.description}
                    </p>
                    
                    <Link
                      href={show.videoLink}
                      className="w-full inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-medium bg-secondary hover:bg-secondary/80 transition-all"
                    >
                      <Clock size={16} className="mr-2" />
                      View Highlights
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {pastVisibleCount < pastShows.length && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setPastVisibleCount(pastShows.length)}
                  variant="outline"
                  className="bg-white hover:bg-primary/5"
                >
                  View More Past Shows
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TourDates;
