
import { Link } from "react-router-dom"; // Changed from next/link
import { Calendar, MapPin, Clock, ArrowLeft, Ticket, Youtube, ExternalLink, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Mock tour data with additional fields
const allShows = [
  {
    id: 1,
    date: "June 12, 2023",
    time: "8:00 PM",
    city: "New York, NY",
    venue: "Comedy Cellar",
    address: "117 MacDougal St, New York, NY 10012",
    status: "Sold Out",
    ticketLink: "/shows/1/tickets",
    isTour: true,
    description: "A night of laughter with Alex Miller's signature observational comedy. Join Alex as he dissects the absurdities of everyday life, from dating apps to the self-checkout lane. This show features material from his critically acclaimed special 'Ordinary Extraordinary' plus new, never-before-seen bits developed exclusively for this tour.",
    venuePolicies: "21+ only. Two drink minimum. No recording devices allowed.",
    duration: "90 minutes",
    imageUrl: "https://images.unsplash.com/photo-1611215891232-85b67acea065?q=80&w=800",
    youtubeId: "dQw4w9WgXcQ", // Example YouTube ID
    galleryImages: [
      "https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=500",
      "https://images.unsplash.com/photo-1508252592163-5d3c3c559109?q=80&w=500",
      "https://images.unsplash.com/photo-1553659971-f01207815844?q=80&w=500"
    ]
  },
  {
    id: 2,
    date: "June 18, 2023",
    time: "7:30 PM",
    city: "Boston, MA",
    venue: "Wilbur Theatre",
    address: "246 Tremont St, Boston, MA 02116",
    status: "Available",
    ticketLink: "/shows/2/tickets",
    isTour: true,
    description: "Don't miss the Boston leg of Alex's 'Everyday Extraordinary' tour. Following his sold-out show last year, Alex returns to the Wilbur with fresh material and his trademark observational wit. This performance features a special Q&A segment at the end, where Alex will take questions from the audience.",
    venuePolicies: "All ages show. No phones allowed during performance.",
    duration: "100 minutes",
    imageUrl: "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?q=80&w=800",
    youtubeId: null, // No YouTube video yet
    galleryImages: [
      "https://images.unsplash.com/photo-1565608438257-fac3c27aa6e6?q=80&w=500",
      "https://images.unsplash.com/photo-1560889041-3a9d3009d3e0?q=80&w=500"
    ]
  },
  // ... additional shows
];

interface ShowDetailsProps {
  showId: string;
}

const ShowDetails = ({ showId }: ShowDetailsProps) => {
  const show = allShows.find(show => show.id.toString() === showId);
  
  if (!show) {
    return (
      <div className="container py-8">
        <p>Show not found.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-8 px-4 bg-gradient-to-b from-indigo-50/30 to-white">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Button variant="ghost" asChild className="group text-indigo-700">
          <Link to="/" className="flex items-center">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shows
          </Link>
        </Button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                {show.city}
              </Badge>
              <Badge variant={show.status === "Sold Out" ? "destructive" : "default"}>
                {show.status}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 text-transparent bg-clip-text">
              Alex Miller Live at {show.venue}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-indigo-500" />
                <span>{show.date} • {show.time}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-indigo-500" />
                <span>{show.address}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-indigo-500" />
                <span>{show.duration}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 overflow-hidden rounded-xl shadow-lg"
          >
            <AspectRatio ratio={16 / 9}>
              <img 
                src={show.imageUrl}
                alt={`Alex Miller at ${show.venue}`} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="mb-4 bg-indigo-100/50">
                <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:text-indigo-700">
                  Details
                </TabsTrigger>
                <TabsTrigger value="venue" className="data-[state=active]:bg-white data-[state=active]:text-indigo-700">
                  Venue Info
                </TabsTrigger>
                {show.galleryImages.length > 0 && (
                  <TabsTrigger value="gallery" className="data-[state=active]:bg-white data-[state=active]:text-indigo-700">
                    Gallery
                  </TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{show.description}</p>
                </div>
                
                {show.youtubeId && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Youtube size={20} className="mr-2 text-red-500" />
                      Preview
                    </h3>
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <AspectRatio ratio={16 / 9}>
                        <iframe
                          src={`https://www.youtube.com/embed/${show.youtubeId}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </AspectRatio>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="venue" className="space-y-4">
                <Card className="overflow-hidden border-indigo-100">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <MapPin size={18} className="mr-2 text-indigo-500" />
                      Venue Information
                    </h3>
                    <div className="mb-4 p-4 bg-indigo-50/50 rounded-md">
                      <div className="font-medium text-indigo-700">{show.venue}</div>
                      <div className="text-muted-foreground">{show.address}</div>
                    </div>
                    
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(show.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      View on Google Maps
                    </a>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Info size={18} className="mr-2 text-indigo-500" />
                      Venue Policies
                    </h3>
                    <p className="text-sm text-muted-foreground p-4 bg-amber-50/50 border border-amber-100 rounded-md">
                      {show.venuePolicies}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {show.galleryImages.length > 0 && (
                <TabsContent value="gallery">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {show.galleryImages.map((image, i) => (
                      <motion.div 
                        key={i} 
                        className="overflow-hidden rounded-lg shadow-md"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AspectRatio ratio={1 / 1}>
                          <img 
                            src={image} 
                            alt={`Gallery image ${i+1}`} 
                            className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                          />
                        </AspectRatio>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </motion.div>
        </div>
        
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="sticky top-24 border-indigo-100 overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 p-2 text-white text-center">
                <Star className="inline-block text-yellow-300 mr-1" size={14} />
                <span className="text-xs font-medium uppercase tracking-wider">Event Details</span>
              </div>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold flex items-center">
                      <Ticket size={18} className="mr-2 text-indigo-500" />
                      Ticket Information
                    </h3>
                    <Badge variant={show.status === "Sold Out" ? "destructive" : show.status === "Few Left" ? "secondary" : "default"}>
                      {show.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar size={14} className="text-indigo-400" />
                    <span>{show.date}, {show.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} className="text-indigo-400" />
                    <span>{show.venue}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Price</span>
                    <span className="font-medium">Starting at $45.00</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Duration</span>
                    <span className="font-medium">{show.duration}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Attendance</span>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1 text-indigo-400" />
                      <span className="font-medium">250-300 people</span>
                    </div>
                  </div>
                </div>
                
                {show.status !== "Sold Out" ? (
                  <Button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-700 hover:via-purple-700 hover:to-fuchsia-700 text-white shadow-md" asChild>
                    <Link to={`/shows/${show.id}/seating`}>
                      <Ticket className="mr-2 h-4 w-4" />
                      Get Tickets
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full bg-gray-200 text-gray-500" disabled>
                    <Ticket className="mr-2 h-4 w-4" />
                    Sold Out
                  </Button>
                )}
                
                {show.youtubeId && (
                  <Button variant="outline" className="w-full mt-3 border-indigo-200 text-indigo-700" asChild>
                    <a 
                      href={`https://www.youtube.com/watch?v=${show.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-4 w-4 text-red-500" />
                      Watch Preview
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
