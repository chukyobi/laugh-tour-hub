
import { useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

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

// Define seating layout
const tablesFor5 = [
  { id: "T5-A", name: "Table A", status: "available" },
  { id: "T5-B", name: "Table B", status: "available" },
  { id: "T5-C", name: "Table C", status: "available" },
  { id: "T5-D", name: "Table D", status: "available" },
  { id: "T5-E", name: "Table E", status: "taken" },
  { id: "T5-F", name: "Table F", status: "available" },
  { id: "T5-G", name: "Table G", status: "available" },
  { id: "T5-H", name: "Table H", status: "taken" },
];

const tablesFor10 = [
  { id: "T10-A", name: "Table A", status: "available" },
  { id: "T10-B", name: "Table B", status: "available" },
  { id: "T10-C", name: "Table C", status: "taken" },
  { id: "T10-D", name: "Table D", status: "available" },
];

const vipSeats = Array.from({ length: 20 }, (_, i) => ({
  id: `VP-${i + 1}`,
  name: `Seat ${i + 1}`,
  status: Math.random() > 0.3 ? "available" : "taken"
}));

const regularSeats = Array.from({ length: 50 }, (_, i) => ({
  id: `REG-${i + 1}`,
  name: `Seat ${i + 1}`,
  status: Math.random() > 0.2 ? "available" : "taken"
}));

type Selection = {
  id: string;
  type: "T5" | "T10" | "VIP" | "REG";
  name: string;
};

type SelectedTicket = {
  id: number;
  quantity: number;
};

const SeatSelection = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Parse selected ticket types from URL params
  const selectedTickets: SelectedTicket[] = useMemo(() => {
    const tickets: SelectedTicket[] = [];
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
    
    navigate(`/shows/${id}/tickets?${params.toString()}`);
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
              <div className="w-full overflow-auto p-4">
                <div className="min-w-[600px]">
                  {/* Stage */}
                  <div className="w-full h-12 bg-primary/20 mb-12 rounded-t-xl text-xs flex items-center justify-center text-primary font-medium">
                    STAGE
                  </div>
                  
                  {/* Tables (front row) */}
                  <div className="mb-16">
                    <h3 className="text-sm font-medium mb-4 text-center">Premium Tables</h3>
                    
                    {/* Tables for 10 */}
                    <div className="flex justify-center gap-6 mb-8">
                      {tablesFor10.map(table => (
                        <TooltipProvider key={table.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                disabled={table.status === "taken"}
                                onClick={() => toggleSelection(table, "T10")}
                                className={cn(
                                  "w-16 h-16 rounded-full flex items-center justify-center text-xs transition",
                                  table.status === "taken" && "bg-gray-200 text-gray-400 cursor-not-allowed",
                                  table.status === "available" && !selections.some(s => s.id === table.id) && 
                                    "bg-secondary hover:bg-secondary/80 border-2 border-dashed border-border",
                                  selections.some(s => s.id === table.id) && "bg-primary text-primary-foreground"
                                )}
                              >
                                <div className="text-center">
                                  <div className="font-medium">{table.name}</div>
                                  <div className="text-[10px]">{table.id}</div>
                                </div>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{table.status === "taken" ? "Already reserved" : "Table for 10"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                    
                    {/* Tables for 5 */}
                    <div className="flex justify-center flex-wrap gap-4">
                      {tablesFor5.map(table => (
                        <TooltipProvider key={table.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                disabled={table.status === "taken"}
                                onClick={() => toggleSelection(table, "T5")}
                                className={cn(
                                  "w-12 h-12 rounded-full flex items-center justify-center text-xs transition",
                                  table.status === "taken" && "bg-gray-200 text-gray-400 cursor-not-allowed",
                                  table.status === "available" && !selections.some(s => s.id === table.id) && 
                                    "bg-secondary hover:bg-secondary/80 border-2 border-dashed border-border",
                                  selections.some(s => s.id === table.id) && "bg-primary text-primary-foreground"
                                )}
                              >
                                <div className="text-center">
                                  <div className="font-medium">{table.name}</div>
                                  <div className="text-[10px]">{table.id}</div>
                                </div>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{table.status === "taken" ? "Already reserved" : "Table for 5"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                  
                  {/* VIP Seats (sides) */}
                  <div className="mb-12">
                    <div className="flex justify-between">
                      <div className="w-1/5">
                        <h3 className="text-sm font-medium mb-3 text-center">VIP Left</h3>
                        <div className="flex flex-col gap-2 items-center">
                          {vipSeats.slice(0, 10).map(seat => (
                            <button
                              key={seat.id}
                              disabled={seat.status === "taken"}
                              onClick={() => toggleSelection(seat, "VIP")}
                              className={cn(
                                "w-10 h-8 flex items-center justify-center text-xs rounded transition",
                                seat.status === "taken" && "bg-gray-200 text-gray-400 cursor-not-allowed",
                                seat.status === "available" && !selections.some(s => s.id === seat.id) && 
                                  "bg-secondary/50 hover:bg-secondary border border-border",
                                selections.some(s => s.id === seat.id) && "bg-primary text-primary-foreground"
                              )}
                            >
                              {seat.id}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="w-3/5">
                        {/* Empty space for middle section */}
                      </div>
                      
                      <div className="w-1/5">
                        <h3 className="text-sm font-medium mb-3 text-center">VIP Right</h3>
                        <div className="flex flex-col gap-2 items-center">
                          {vipSeats.slice(10, 20).map(seat => (
                            <button
                              key={seat.id}
                              disabled={seat.status === "taken"}
                              onClick={() => toggleSelection(seat, "VIP")}
                              className={cn(
                                "w-10 h-8 flex items-center justify-center text-xs rounded transition",
                                seat.status === "taken" && "bg-gray-200 text-gray-400 cursor-not-allowed",
                                seat.status === "available" && !selections.some(s => s.id === seat.id) && 
                                  "bg-secondary/50 hover:bg-secondary border border-border",
                                selections.some(s => s.id === seat.id) && "bg-primary text-primary-foreground"
                              )}
                            >
                              {seat.id}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Regular Seats (back rows) */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 text-center">Regular Seating</h3>
                    <div className="flex justify-center">
                      <div className="flex flex-wrap justify-center gap-1 max-w-[600px]">
                        {regularSeats.map(seat => (
                          <button
                            key={seat.id}
                            disabled={seat.status === "taken"}
                            onClick={() => toggleSelection(seat, "REG")}
                            className={cn(
                              "w-8 h-7 flex items-center justify-center text-[10px] rounded transition",
                              seat.status === "taken" && "bg-gray-200 text-gray-400 cursor-not-allowed",
                              seat.status === "available" && !selections.some(s => s.id === seat.id) && 
                                "bg-muted hover:bg-muted/80 border border-border",
                              selections.some(s => s.id === seat.id) && "bg-primary text-primary-foreground"
                            )}
                          >
                            {seat.id}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-secondary/50 border border-border rounded mr-1"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary rounded mr-1"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-1"></div>
                  <span>Taken</span>
                </div>
              </div>
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
