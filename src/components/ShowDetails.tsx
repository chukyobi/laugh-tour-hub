
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft, Ticket, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Shows
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline">{show.city}</Badge>
              <Badge variant={show.status === "Sold Out" ? "destructive" : "default"}>
                {show.status}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Alex Miller Live at {show.venue}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{show.date} • {show.time}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{show.address}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{show.duration}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8 overflow-hidden rounded-xl">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={show.imageUrl}
                alt={`Alex Miller at ${show.venue}`} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
          
          <Tabs defaultValue="details" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="venue">Venue Info</TabsTrigger>
              {show.galleryImages.length > 0 && (
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">{show.description}</p>
              </div>
              
              {show.youtubeId && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Preview</h3>
                  <div className="rounded-lg overflow-hidden">
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
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Venue Information</h3>
                  <div className="mb-4">
                    <div className="font-medium">{show.venue}</div>
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
                  
                  <Separator className="my-4" />
                  
                  <h3 className="text-lg font-semibold mb-3">Venue Policies</h3>
                  <p className="text-sm text-muted-foreground">{show.venuePolicies}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {show.galleryImages.length > 0 && (
              <TabsContent value="gallery">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {show.galleryImages.map((image, i) => (
                    <div key={i} className="overflow-hidden rounded-lg">
                      <AspectRatio ratio={1 / 1}>
                        <img 
                          src={image} 
                          alt={`Gallery image ${i+1}`} 
                          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                        />
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        <div>
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Ticket Information</h3>
                  <Badge variant={show.status === "Sold Out" ? "destructive" : show.status === "Few Left" ? "secondary" : "default"}>
                    {show.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar size={14} />
                  <span>{show.date}, {show.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  <span>{show.venue}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Price</span>
                  <span>Starting at $45.00</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Duration</span>
                  <span>{show.duration}</span>
                </div>
              </div>
              
              {show.status !== "Sold Out" ? (
                <Button className="w-full" asChild>
                  <Link href={`/shows/${show.id}/seating`}>
                    <Ticket className="mr-2 h-4 w-4" />
                    Get Tickets
                  </Link>
                </Button>
              ) : (
                <Button className="w-full" disabled>
                  <Ticket className="mr-2 h-4 w-4" />
                  Sold Out
                </Button>
              )}
              
              {show.youtubeId && (
                <Button variant="outline" className="w-full mt-3" asChild>
                  <a 
                    href={`https://www.youtube.com/watch?v=${show.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube className="mr-2 h-4 w-4" />
                    Watch Preview
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
