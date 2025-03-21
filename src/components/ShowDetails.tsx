import { useState } from "react";
import { Calendar, MapPin, Clock, ArrowLeft, Ticket, Youtube, ExternalLink, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Ticket types data
const ticketTypes = [
  { id: 1, name: "Regular Admission", price: 45, available: true, code: "REG" },
  { id: 2, name: "VIP Package", price: 95, available: true, code: "VIP", description: "Includes meet & greet and signed merchandise" },
  { id: 3, name: "Table for 5", price: 225, available: true, code: "T5", description: "Reserved table for 5 people (includes 5 tickets)" },
  { id: 4, name: "Table for 10", price: 400, available: true, code: "T10", description: "Reserved table for 10 people (includes 10 tickets)" }
];

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
  {
    id: 3,
    date: "June 24, 2023",
    time: "8:30 PM",
    city: "Chicago, IL",
    venue: "The Laugh Factory",
    address: "3175 N Broadway, Chicago, IL 60657",
    status: "Available",
    ticketLink: "/shows/3/tickets",
    isTour: true,
    description: "Alex brings his unique perspective on everyday life to the Windy City. This special Chicago performance includes city-specific material and observations from Alex's time living in the Midwest. Expect a mix of polished material and fresh improvisation in this intimate venue.",
    venuePolicies: "18+ only. Two item minimum purchase required.",
    duration: "75 minutes",
    imageUrl: "https://images.unsplash.com/photo-1603739409582-8d21acc0379c?q=80&w=800",
    youtubeId: "G1IbRujko-A", // Example YouTube ID
    galleryImages: [
      "https://images.unsplash.com/photo-1508188609340-d106773001b7?q=80&w=500",
      "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?q=80&w=500",
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=500"
    ]
  },
  {
    id: 4,
    date: "July 2, 2023",
    time: "7:00 PM",
    city: "Austin, TX",
    venue: "Cap City Comedy",
    address: "8120 Research Blvd #100, Austin, TX 78758",
    status: "Few Left",
    ticketLink: "/shows/4/tickets",
    isTour: true,
    description: "Alex's first time in Austin - expect special Texas-themed material. After years of requests, Alex finally brings his comedy to the Live Music Capital of the World. This show will feature his observations on Southern culture, Texas quirks, and the differences between West Coast and Southern living.",
    venuePolicies: "18+ only. No recording devices. Arrive 30 minutes before showtime.",
    duration: "90 minutes",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800",
    youtubeId: null,
    galleryImages: [
      "https://images.unsplash.com/photo-1597878800896-614e258d23cb?q=80&w=500",
      "https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?q=80&w=500"
    ]
  },
  {
    id: 5,
    date: "July 8, 2023",
    time: "9:00 PM",
    city: "Los Angeles, CA",
    venue: "The Comedy Store",
    address: "8433 Sunset Blvd, Los Angeles, CA 90069",
    status: "Available",
    ticketLink: "/shows/5/tickets",
    isTour: true,
    description: "Back to where it all began - a special homecoming show at The Comedy Store. Alex returns to the stage where he got his start, delivering an emotional and hilarious evening of comedy. This show will feature surprise guest appearances from comedy legends and friends who influenced Alex's career.",
    venuePolicies: "21+ only. Two drink minimum. No heckling policy strictly enforced.",
    duration: "120 minutes",
    imageUrl: "https://images.unsplash.com/photo-1611348586840-ea9872d33411?q=80&w=800",
    youtubeId: "zvGBHy-o_uw", // Example YouTube ID
    galleryImages: [
      "https://images.unsplash.com/photo-1508252592163-5d3c3c559109?q=80&w=500",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500",
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=500"
    ]
  },
  {
    id: 6,
    date: "July 15, 2023",
    time: "8:00 PM",
    city: "Seattle, WA",
    venue: "The Paramount Theatre",
    address: "911 Pine St, Seattle, WA 98101",
    status: "Available",
    ticketLink: "/shows/6/tickets",
    isTour: true,
    description: "Alex's Pacific Northwest debut with all-new material. This theater show showcases Alex's evolution as a comedian, featuring longer-form stories and more personal material than his club sets. The Paramount's historic venue provides the perfect backdrop for this special performance.",
    venuePolicies: "All ages welcome. Concessions available in lobby.",
    duration: "100 minutes",
    imageUrl: "https://images.unsplash.com/photo-1512592877846-938bd2c3b018?q=80&w=800",
    youtubeId: null,
    galleryImages: [
      "https://images.unsplash.com/photo-1578944032637-f09897c5233d?q=80&w=500",
      "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?q=80&w=500"
    ]
  }
];

const ShowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("details");
  const [selectedTickets, setSelectedTickets] = useState<{id: number, quantity: number}[]>([]);
  const { toast } = useToast();
  
  // Find the show based on the ID from URL params
  const show = allShows.find(s => s.id === parseInt(id || "0"));
  
  if (!show) {
    return (
      <>
        <Navbar />
        <div className="container px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Show not found</h2>
          <Button onClick={() => navigate("/#tour")}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Shows
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (ticketId: number, change: number) => {
    setSelectedTickets(prev => {
      const existing = prev.find(t => t.id === ticketId);
      
      if (!existing && change > 0) {
        // Add new ticket type
        return [...prev, { id: ticketId, quantity: change }];
      } else if (existing) {
        const newQuantity = existing.quantity + change;
        
        if (newQuantity <= 0) {
          // Remove ticket type
          return prev.filter(t => t.id !== ticketId);
        } else {
          // Update quantity
          return prev.map(t => 
            t.id === ticketId ? { ...t, quantity: newQuantity } : t
          );
        }
      }
      return prev;
    });
  };

  const getTicketQuantity = (ticketId: number) => {
    const ticket = selectedTickets.find(t => t.id === ticketId);
    return ticket ? ticket.quantity : 0;
  };

  const getTotalTickets = () => {
    return selectedTickets.reduce((sum, ticket) => {
      const ticketType = ticketTypes.find(t => t.id === ticket.id);
      if (ticketType && ticketType.code === "T5") {
        return sum + (ticket.quantity * 5);
      } else if (ticketType && ticketType.code === "T10") {
        return sum + (ticket.quantity * 10);
      } else {
        return sum + ticket.quantity;
      }
    }, 0);
  };

  const getTotalPrice = () => {
    return selectedTickets.reduce((sum, ticket) => {
      const ticketType = ticketTypes.find(t => t.id === ticket.id);
      return sum + ((ticketType?.price || 0) * ticket.quantity);
    }, 0);
  };
  
  const proceedToSeatSelection = () => {
    if (selectedTickets.length === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to continue",
        variant: "destructive"
      });
      return;
    }

    // Create URL params with selected tickets
    const params = new URLSearchParams();
    selectedTickets.forEach(ticket => {
      params.append('tickets', `${ticket.id}:${ticket.quantity}`);
    });
    
    navigate(`/shows/${id}/seating?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 py-12 md:py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/#tour")}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to All Shows
        </Button>
        
        {/* Hero Image */}
        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10"></div>
          <img 
            src={show.imageUrl} 
            alt={`${show.city} show`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wide mb-4">
              {show.isTour ? "Tour Date" : "Special Show"}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white drop-shadow-md">
              {show.city}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/90 mb-2">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {show.date}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                {show.time} ({show.duration})
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {show.venue}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs 
              defaultValue="details" 
              className="w-full"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                <TabsTrigger value="media" className="text-sm">Media</TabsTrigger>
                <TabsTrigger value="venue" className="text-sm">Venue</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div className="prose prose-stone max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">About This Show</h2>
                  <p>{show.description}</p>
                </div>
                  
                <div>
                  <h3 className="text-xl font-semibold mt-6 mb-3">Show Policies</h3>
                  <p className="text-muted-foreground">{show.venuePolicies}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="media" className="space-y-6">
                {show.youtubeId ? (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Show Preview</h2>
                    <div className="rounded-md overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <iframe
                          src={`https://www.youtube.com/embed/${show.youtubeId}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        ></iframe>
                      </AspectRatio>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-md p-8 flex flex-col items-center justify-center text-center">
                    <Youtube size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Video Coming Soon</h3>
                    <p className="text-muted-foreground">
                      We're working on a preview video for this show. Check back later!
                    </p>
                  </div>
                )}
                
                {show.galleryImages && show.galleryImages.length > 0 && (
                  <div className="space-y-4 mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {show.galleryImages.map((img, index) => (
                        <div key={index} className="rounded-md overflow-hidden h-48 bg-muted">
                          <img 
                            src={img} 
                            alt={`${show.city} show gallery ${index + 1}`} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="venue" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Venue Information</h2>
                  <p className="text-lg font-medium">{show.venue}</p>
                  <p className="text-muted-foreground">{show.address}</p>
                  
                  <div className="mt-6 rounded-md overflow-hidden border">
                    <AspectRatio ratio={16 / 9}>
                      <iframe 
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(show.venue + ' ' + show.address)}`}
                        title="Google Maps"
                        className="w-full h-full border-0"
                        allowFullScreen
                      ></iframe>
                    </AspectRatio>
                  </div>
                  
                  <div className="flex items-center justify-center mt-4">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(show.venue + ' ' + show.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary flex items-center"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Get Tickets</h3>
                
                {show.status === "Sold Out" ? (
                  <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4 text-center">
                    This show is sold out
                  </div>
                ) : (
                  <>
                    <h4 className="font-medium mb-4">Select Tickets</h4>
                    <div className="space-y-4">
                      {ticketTypes.map((ticket) => (
                        <div key={ticket.id} className="p-3 rounded-md border">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {ticket.name}
                                {ticket.code && (
                                  <Badge variant="outline" className="text-xs">{ticket.code}</Badge>
                                )}
                              </div>
                              {ticket.description && (
                                <p className="text-xs text-muted-foreground mt-1">{ticket.description}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-bold">${ticket.price}</div>
                              <div className="text-xs text-muted-foreground">per {ticket.code?.startsWith('T') ? 'table' : 'ticket'}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-sm text-muted-foreground">
                              {ticket.code === "T5" && "Includes 5 tickets"}
                              {ticket.code === "T10" && "Includes 10 tickets"}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(ticket.id, -1)}
                                disabled={getTicketQuantity(ticket.id) === 0}
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="w-6 text-center font-medium">
                                {getTicketQuantity(ticket.id)}
                              </span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(ticket.id, 1)}
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedTickets.length > 0 && (
                      <>
                        <Separator className="my-4" />
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total tickets:</span>
                            <span>{getTotalTickets()} tickets</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total price:</span>
                            <span>${getTotalPrice()}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4"
                          onClick={proceedToSeatSelection}
                        >
                          Select Seats/Tables
                        </Button>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowDetails;
