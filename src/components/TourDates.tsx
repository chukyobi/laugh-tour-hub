
import { useState } from "react";
import { Calendar, MapPin, Ticket, Clock, History, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  
  const fadeInVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };
  
  return (
    <section
      id="tour"
      className="relative py-20 md:py-32 bg-gradient-to-b from-indigo-50 to-white"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-100 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-100/30 to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute top-40 right-20 w-60 h-60 bg-indigo-300 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container px-4 max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700 rounded-full text-xs font-medium uppercase tracking-wide mb-4">
            Shows & Events
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Live Comedy Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join Alex Miller for a night of laughter and unforgettable moments.
            Check out upcoming tour dates and grab your tickets before they're gone.
          </p>
        </motion.div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10 bg-indigo-100/50 p-1">
            <TabsTrigger value="upcoming" className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md">
              Upcoming Shows
            </TabsTrigger>
            <TabsTrigger value="past" className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md">
              Past Shows
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingShows.slice(0, upcomingVisibleCount).map((show, index) => (
                <motion.div
                  key={show.id}
                  custom={index}
                  variants={fadeInVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md bg-white">
                    <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600" />
                    <CardContent className="p-6 relative">
                      {show.status === "Few Left" && (
                        <div className="absolute -top-1 -right-1 rotate-12">
                          <Star className="h-16 w-16 fill-amber-400 stroke-amber-500 opacity-20" />
                          <span className="absolute top-5 left-0 right-0 text-[10px] font-bold text-amber-800 text-center">
                            FEW LEFT
                          </span>
                        </div>
                      )}
                    
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-indigo-600 mb-1 flex items-center font-medium">
                            <Calendar size={14} className="mr-1 text-indigo-400" />
                            {show.date}
                          </span>
                          <h3 className="font-bold text-xl text-gray-900">{show.city}</h3>
                          <span className="text-sm text-gray-500 mt-1 flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {show.venue}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className={cn(
                              "text-xs font-medium px-2.5 py-1 rounded-full",
                              show.status === "Sold Out"
                                ? "bg-red-100 text-red-800"
                                : show.status === "Few Left"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            )}
                          >
                            {show.status}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-5 line-clamp-2">
                        {show.description}
                      </p>
                      
                      <Link
                        to={show.ticketLink}
                        className={cn(
                          "w-full inline-flex items-center justify-center rounded-md py-2.5 px-4 text-sm font-medium transition-all",
                          show.status === "Sold Out"
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 group-hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                        )}
                        onClick={(e) => show.status === "Sold Out" && e.preventDefault()}
                      >
                        <Ticket size={16} className="mr-2" />
                        {show.status === "Sold Out" ? "Sold Out" : "View Details & Tickets"}
                        {show.status !== "Sold Out" && (
                          <ChevronRight size={16} className="ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                        )}
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {upcomingVisibleCount < upcomingShows.length && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center mt-12"
              >
                <Button
                  onClick={() => setUpcomingVisibleCount(upcomingShows.length)}
                  variant="outline"
                  className="bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-300 shadow-sm"
                  size="lg"
                >
                  Load More Shows
                </Button>
              </motion.div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastShows.slice(0, pastVisibleCount).map((show, index) => (
                <motion.div
                  key={show.id}
                  custom={index}
                  variants={fadeInVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all group border-0 shadow-md bg-gradient-to-br from-gray-50 to-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center text-sm text-gray-500">
                          <History size={14} className="mr-1" />
                          {show.date}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          Past Show
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-xl mb-1 text-gray-800">{show.city}</h3>
                      <div className="text-sm text-gray-500 mb-3 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {show.venue}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        {show.description}
                      </p>
                      
                      <Link
                        to={show.videoLink}
                        className="w-full inline-flex items-center justify-center rounded-md py-2.5 px-4 text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all group-hover:-translate-y-0.5"
                      >
                        <Clock size={16} className="mr-2" />
                        View Highlights
                        <ChevronRight size={14} className="ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {pastVisibleCount < pastShows.length && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mt-12"
              >
                <Button
                  onClick={() => setPastVisibleCount(pastShows.length)}
                  variant="outline"
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  View More Past Shows
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TourDates;
