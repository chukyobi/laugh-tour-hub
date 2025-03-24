import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import CartoonSeatMap, { Selection } from "@/components/CartoonSeatMap";

// Ticket types data
const ticketTypes = [
  { id: 1, name: "Regular Admission", price: 45, available: true, code: "REG" },
  { id: 2, name: "VIP Package", price: 95, available: true, code: "VIP", description: "Includes meet & greet and signed merchandise" },
  { id: 3, name: "Table for 5", price: 225, available: true, code: "T5", description: "Reserved table for 5 people (includes 5 tickets)" },
  { id: 4, name: "Table for 10", price: 400, available: true, code: "T10", description: "Reserved table for 10 people (includes 10 tickets)" }
];

// Mock show data
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
    description: "A night of laughter with Alex Miller's signature observational comedy.",
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

interface SeatSelectionProps {
  showId: string;
}

const SeatSelection = ({ showId }: SeatSelectionProps) => {
  const router = useRouter();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("seating");
  const [selections, setSelections] = useState<Selection[]>([]);
  const [selectedShow, setSelectedShow] = useState(allShows.find(show => show.id.toString() === showId));

  // Track user selections by ticket type
  const [selectionCounts, setSelectionCounts] = useState({
    T5: 0,
    T10: 0,
    VIP: 0,
    REG: 0
  });

  // Required selections for each ticket type
  const requiredSelections = {
    T5: ticketTypes.find(t => t.code === "T5")?.price! / 45,
    T10: ticketTypes.find(t => t.code === "T10")?.price! / 40,
    VIP: 1,
    REG: 1
  };

  const handleToggleSelection = (item: { id: string; name: string; status: string }, type: "T5" | "T10" | "VIP" | "REG") => {
    const exists = selections.some(s => s.id === item.id);

    if (exists) {
      // Remove the selection
      setSelections(selections.filter(s => s.id !== item.id));
      setSelectionCounts(prev => ({
        ...prev,
        [type]: prev[type] - 1
      }));
    } else {
      // Check if we already have the maximum of this type
      const maxForType = type === "T5" ? 1 : type === "T10" ? 1 : 10;
      if (selectionCounts[type] >= maxForType) {
        toast({
          title: "Selection limit reached",
          description: `You can only select ${maxForType} ${type} item(s)`,
          variant: "destructive"
        });
        return;
      }
      
      // Add the selection
      setSelections([...selections, { id: item.id, type, name: item.name }]);
      setSelectionCounts(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }));
    }
  };

  const getSubtotal = () => {
    let total = 0;
    if (selectionCounts.T5 > 0) {
      total += ticketTypes.find(t => t.code === "T5")!.price;
    }
    if (selectionCounts.T10 > 0) {
      total += ticketTypes.find(t => t.code === "T10")!.price;
    }
    total += selectionCounts.VIP * ticketTypes.find(t => t.code === "VIP")!.price;
    total += selectionCounts.REG * ticketTypes.find(t => t.code === "REG")!.price;
    return total;
  };

  const handleProceedToCheckout = () => {
    if (selections.length === 0) {
      toast({
        title: "No selections made",
        description: "Please select at least one seat before proceeding",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you'd save the selection state to a context or store
    router.push(`/shows/${showId}/checkout`);
  };

  if (!selectedShow) {
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
          <Link href={`/shows/${showId}`} className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Show Details
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-between">
                <span>Select Your Seats</span>
                <Badge variant="outline">{selectedShow.venue}</Badge>
              </CardTitle>
              <CardDescription>
                {selectedShow.date} • {selectedShow.time}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="seating" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="seating">Seating Chart</TabsTrigger>
                  <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
                </TabsList>
                
                <TabsContent value="seating" className="overflow-hidden">
                  <div className="border rounded-lg p-4">
                    <div className="max-w-5xl mx-auto">
                      <CartoonSeatMap 
                        requiredSelections={requiredSelections}
                        selectionCounts={selectionCounts}
                        selections={selections} 
                        toggleSelection={handleToggleSelection}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tickets">
                  <div className="grid gap-4">
                    {ticketTypes.map((ticket) => (
                      <Card key={ticket.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center gap-4">
                            <div>
                              <h3 className="font-bold text-lg">{ticket.name}</h3>
                              {ticket.description && (
                                <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">${ticket.price}</div>
                              <Badge variant="outline" className="mt-1">
                                {ticket.code === "T5" || ticket.code === "T10" 
                                  ? `Table (${ticket.code === "T5" ? "5" : "10"} seats)` 
                                  : "Per Person"
                                }
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm flex items-center text-muted-foreground">
                              <Info size={14} className="mr-1" />
                              {ticket.code === "T5" || ticket.code === "T10" 
                                ? "Select a table on the seating chart" 
                                : "Select individual seats on the chart"
                              }
                            </div>
                            <Badge variant={selectionCounts[ticket.code as keyof typeof selectionCounts] > 0 ? "default" : "outline"}>
                              {selectionCounts[ticket.code as keyof typeof selectionCounts] > 0 
                                ? `${selectionCounts[ticket.code as keyof typeof selectionCounts]} selected` 
                                : "None selected"
                              }
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Selection</CardTitle>
              <CardDescription>{selectedShow.city} • {selectedShow.venue}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  <span>Tickets Selected:</span>
                </div>
                <Badge variant="outline">
                  {selections.length > 0 ? selections.length : "None"}
                </Badge>
              </div>
              
              {selectionCounts.T5 > 0 && (
                <div className="flex justify-between text-sm py-2">
                  <span>Table for 5</span>
                  <span>${ticketTypes.find(t => t.code === "T5")!.price}</span>
                </div>
              )}
              
              {selectionCounts.T10 > 0 && (
                <div className="flex justify-between text-sm py-2">
                  <span>Table for 10</span>
                  <span>${ticketTypes.find(t => t.code === "T10")!.price}</span>
                </div>
              )}
              
              {selectionCounts.VIP > 0 && (
                <div className="flex justify-between text-sm py-2">
                  <span>VIP Seats (x{selectionCounts.VIP})</span>
                  <span>${ticketTypes.find(t => t.code === "VIP")!.price * selectionCounts.VIP}</span>
                </div>
              )}
              
              {selectionCounts.REG > 0 && (
                <div className="flex justify-between text-sm py-2">
                  <span>Regular Seats (x{selectionCounts.REG})</span>
                  <span>${ticketTypes.find(t => t.code === "REG")!.price * selectionCounts.REG}</span>
                </div>
              )}
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <span>Subtotal</span>
                <span>${getSubtotal()}</span>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className="w-full" 
                onClick={handleProceedToCheckout}
                disabled={selections.length === 0}
              >
                Proceed to Checkout
              </Button>
              
              {activeTab === "seating" && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab("tickets")}
                >
                  View Ticket Options
                </Button>
              )}
              
              {activeTab === "tickets" && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab("seating")}
                >
                  View Seating Chart
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
