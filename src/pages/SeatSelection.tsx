
import { useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import CartoonSeatMap, { Selection } from "@/components/CartoonSeatMap";

// Mock show data (same as in ShowDetails.tsx)
const allShows = [
  {
    id: 1,
    date: "June 12, 2023",
    time: "8:00 PM",
    city: "New York, NY",
    venue: "Comedy Cellar",
    address: "117 MacDougal St, New York, NY 10012",
    status: "Sold Out",
  },
  {
    id: 2,
    date: "June 18, 2023",
    time: "7:30 PM",
    city: "Boston, MA",
    venue: "Wilbur Theatre",
    address: "246 Tremont St, Boston, MA 02116",
    status: "Available",
  },
  {
    id: 3,
    date: "June 24, 2023",
    time: "8:30 PM",
    city: "Chicago, IL",
    venue: "The Laugh Factory",
    address: "3175 N Broadway, Chicago, IL 60657",
    status: "Available",
  },
  {
    id: 4,
    date: "July 2, 2023",
    time: "7:00 PM",
    city: "Austin, TX",
    venue: "Cap City Comedy",
    address: "8120 Research Blvd #100, Austin, TX 78758",
    status: "Few Left",
  },
  {
    id: 5,
    date: "July 8, 2023",
    time: "9:00 PM",
    city: "Los Angeles, CA",
    venue: "The Comedy Store",
    address: "8433 Sunset Blvd, Los Angeles, CA 90069",
    status: "Available",
  },
  {
    id: 6,
    date: "July 15, 2023",
    time: "8:00 PM",
    city: "Seattle, WA",
    venue: "The Paramount Theatre",
    address: "911 Pine St, Seattle, WA 98101",
    status: "Available",
  }
];

// Ticket types data
const ticketTypes = [
  { id: 1, name: "Regular Admission", price: 45, available: true, code: "REG" },
  { id: 2, name: "VIP Package", price: 95, available: true, code: "VIP", description: "Includes meet & greet and signed merchandise" },
  { id: 3, name: "Table for 5", price: 225, available: true, code: "T5", description: "Reserved table for 5 people (includes 5 tickets)" },
  { id: 4, name: "Table for 10", price: 400, available: true, code: "T10", description: "Reserved table for 10 people (includes 10 tickets)" }
];

const SeatSelection = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Parse selected ticket types from URL params
  const selectedTickets = useMemo(() => {
    const tickets: { id: number; quantity: number }[] = [];
    searchParams.getAll('tickets').forEach(param => {
      const [ticketId, quantity] = param.split(':');
      tickets.push({
        id: parseInt(ticketId),
        quantity: parseInt(quantity)
      });
    });
    return tickets;
  }, [searchParams]);
  
  // Find the show based on the ID from URL params
  const show = allShows.find(s => s.id === parseInt(id || "0"));
  
  const [selections, setSelections] = useState<Selection[]>([]);
  
  if (!show) {
    return (
      <div className="container px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Show not found</h2>
        <Button onClick={() => navigate("/#tour")}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Shows
        </Button>
      </div>
    );
  }
  
  // Calculate how many of each type we need to select
  const requiredSelections = useMemo(() => {
    return selectedTickets.reduce<Record<string, number>>((acc, ticket) => {
      const ticketType = ticketTypes.find(t => t.id === ticket.id);
      if (ticketType) {
        const code = ticketType.code || "";
        acc[code] = (acc[code] || 0) + ticket.quantity;
      }
      return acc;
    }, {});
  }, [selectedTickets]);
  
  // Count how many of each type are selected
  const selectionCounts = useMemo(() => {
    return selections.reduce<Record<string, number>>((acc, selection) => {
      acc[selection.type] = (acc[selection.type] || 0) + 1;
      return acc;
    }, {});
  }, [selections]);
  
  const toggleSelection = (item: { id: string; name: string; status: string }, type: "T5" | "T10" | "VIP" | "REG") => {
    if (item.status === "taken") return;
    
    setSelections(prev => {
      // Check if already selected
      const isSelected = prev.some(s => s.id === item.id);
      
      if (isSelected) {
        // Remove selection
        return prev.filter(s => s.id !== item.id);
      } else {
        // Check if we've reached the limit for this type
        const currentCount = prev.filter(s => s.type === type).length;
        const requiredCount = requiredSelections[type] || 0;
        
        if (currentCount >= requiredCount) {
          toast({
            title: "Selection limit reached",
            description: `You can only select ${requiredCount} ${type} ${requiredCount === 1 ? 'item' : 'items'}`,
            variant: "destructive"
          });
          return prev;
        }
        
        // Add selection
        return [...prev, { id: item.id, type, name: item.name }];
      }
    });
  };
  
  const handleProceedToCheckout = () => {
    // Check if we've selected enough of each type
    let allSelected = true;
    const missingSelections: string[] = [];
    
    Object.entries(requiredSelections).forEach(([type, required]) => {
      const selected = selectionCounts[type] || 0;
      if (selected < required) {
        allSelected = false;
        missingSelections.push(`${required - selected} ${type}`);
      }
    });
    
    if (!allSelected) {
      toast({
        title: "Incomplete selection",
        description: `You still need to select: ${missingSelections.join(", ")}`,
        variant: "destructive"
      });
      return;
    }
    
    // Create URL params with selected tickets and seats
    const params = new URLSearchParams();
    
    // Add ticket types first
    selectedTickets.forEach(ticket => {
      params.append('tickets', `${ticket.id}:${ticket.quantity}`);
    });
    
    // Add seat/table selections
    selections.forEach(selection => {
      params.append('seats', `${selection.id}`);
    });
    
    navigate(`/shows/${id}/checkout?${params.toString()}`);
  };

  return (
    <div className="container px-4 py-12 md:py-16">
      <Button 
        variant="ghost" 
        onClick={() => navigate(`/shows/${id}`)}
        className="mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Show Details
      </Button>
      
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold mb-2">
          Select Your Seats & Tables
        </h1>
        <p className="text-muted-foreground">
          {show.venue}, {show.city} • {show.date} at {show.time}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Seating Chart</span>
                <Badge variant="outline">Stage at the front</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CartoonSeatMap
                requiredSelections={requiredSelections}
                selectionCounts={selectionCounts}
                selections={selections}
                toggleSelection={toggleSelection}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Your Selection</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="space-y-4">
                {selectedTickets.map(ticket => {
                  const ticketType = ticketTypes.find(t => t.id === ticket.id);
                  if (!ticketType) return null;
                  
                  const type = ticketType.code || "";
                  const selectedCount = selections.filter(s => s.type === type).length;
                  const remainingToSelect = Math.max(0, ticket.quantity - selectedCount);
                  
                  return (
                    <div key={ticket.id} className="pb-4 border-b last:border-0">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">
                          {ticketType.name}
                          {ticketType.code && (
                            <Badge variant="outline" className="ml-2 text-xs">{ticketType.code}</Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${ticketType.price} x {ticket.quantity}</div>
                          <div className="text-xs text-muted-foreground">${ticketType.price * ticket.quantity}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          {remainingToSelect > 0 ? (
                            <Badge variant="secondary" className="font-normal">
                              Select {remainingToSelect} more
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-primary bg-primary/10 border-primary/20">
                              <Check size={12} className="mr-1" /> All selected
                            </Badge>
                          )}
                        </div>
                        
                        <div>
                          {selectedCount > 0 && (
                            <div className="text-muted-foreground text-xs">
                              {selections
                                .filter(s => s.type === type)
                                .map(s => s.id)
                                .join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    ${selectedTickets.reduce((sum, ticket) => {
                      const ticketType = ticketTypes.find(t => t.id === ticket.id);
                      return sum + ((ticketType?.price || 0) * ticket.quantity);
                    }, 0)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-6">
              <Button 
                className="w-full"
                onClick={handleProceedToCheckout}
                disabled={Object.entries(requiredSelections).some(([type, required]) => 
                  (selectionCounts[type] || 0) < required
                )}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
