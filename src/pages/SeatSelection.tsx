
import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Check, Info, Users, Calendar, MapPin, 
  Ticket, Clock, HelpCircle, CalendarClock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CartoonSeatMap, { Selection } from "@/components/CartoonSeatMap";
import { motion } from "framer-motion";

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
  { id: 1, name: "Regular Admission", price: 45, available: true, code: "REG", description: "Standard seating with great views of the stage" },
  { id: 2, name: "VIP Package", price: 95, available: true, code: "VIP", description: "Includes meet & greet and signed merchandise" },
  { id: 3, name: "Table for 5", price: 225, available: true, code: "T5", description: "Reserved table for 5 people (includes 5 tickets)" },
  { id: 4, name: "Table for 10", price: 400, available: true, code: "T10", description: "Reserved table for 10 people (includes 10 tickets)" }
];

interface SeatSelectionProps {
  showId: string;
}

const SeatSelection = ({ showId }: SeatSelectionProps) => {
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
  const show = allShows.find(s => s.id === parseInt(showId || "0"));
  
  const [selections, setSelections] = useState<Selection[]>([]);
  
  // Add guide tour state
  const [showGuideTour, setShowGuideTour] = useState(true);
  const [step, setStep] = useState(0);

  // Auto-dismiss guide tour after 10 seconds
  useEffect(() => {
    if (showGuideTour) {
      const timer = setTimeout(() => {
        setShowGuideTour(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showGuideTour]);

  // Show toast when component loads to help guide users
  useEffect(() => {
    toast({
      title: "Select Your Seats",
      description: "Click on available seats that match your ticket types.",
      duration: 5000,
    });
  }, []);
  
  if (!show) {
    return (
      <div className="container px-4 py-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4 text-red-500">Show Not Found</h2>
          <p className="mb-6 text-gray-600">We couldn't find the show you're looking for. Please check the URL or return to the shows page.</p>
          <Button onClick={() => navigate("/#tour")} size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            <ArrowLeft size={16} className="mr-2" />
            Back to Shows
          </Button>
        </motion.div>
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
        const newSelections = [...prev, { id: item.id, type, name: item.name }];
        
        // Show toast for first selection
        if (prev.length === 0) {
          toast({
            title: "First seat selected!",
            description: "Continue selecting your seats based on your ticket types.",
          });
        }
        
        // Show completion toast
        const allTypes = Object.keys(requiredSelections);
        const isFulfilled = allTypes.every(t => {
          const selected = newSelections.filter(s => s.type === t).length;
          return selected >= (requiredSelections[t] || 0);
        });
        
        if (isFulfilled) {
          toast({
            title: "All seats selected!",
            description: "You can now proceed to checkout.",
            variant: "success",
          });
        }
        
        return newSelections;
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
  
  // Calculate subtotal and fees
  const subtotal = selectedTickets.reduce((sum, ticket) => {
    const ticketType = ticketTypes.find(t => t.id === ticket.id);
    return sum + ((ticketType?.price || 0) * ticket.quantity);
  }, 0);
  
  const serviceFee = subtotal * 0.10;
  const total = subtotal + serviceFee;

  return (
    <div className="container px-4 py-12 md:py-16 bg-gradient-to-b from-indigo-50/50 to-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/shows/${id}`)}
          className="mb-6 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Show Details
        </Button>
        
        <div className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text"
          >
            Select Your Seats & Tables
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}  
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground"
          >
            <div className="flex items-center">
              <CalendarClock size={16} className="mr-1 text-indigo-500" />
              <span>{show.date} at {show.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-indigo-500" />
              <span>{show.venue}, {show.city}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {showGuideTour && (
        <Alert className="mb-6 border-indigo-200 bg-indigo-50">
          <HelpCircle className="h-4 w-4 text-indigo-500" />
          <AlertTitle className="text-indigo-700">Seat Selection Guide</AlertTitle>
          <AlertDescription className="text-indigo-600">
            First, select tables or seats based on your ticket types. Tables and seats are color-coded to match your ticket types.
            <Button variant="link" className="px-0 text-indigo-700" onClick={() => setShowGuideTour(false)}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="overflow-hidden border-indigo-100 mb-8">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Seating Chart</span>
                <Badge variant="outline" className="bg-white">Stage at the front</Badge>
              </CardTitle>
              <CardDescription className="flex items-center text-sm">
                <Info size={14} className="mr-1 text-indigo-400" />
                Click on available seats to make your selection
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 bg-white">
              <CartoonSeatMap
                requiredSelections={requiredSelections}
                selectionCounts={selectionCounts}
                selections={selections}
                toggleSelection={toggleSelection}
              />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="sticky top-4 border-indigo-100">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardTitle className="text-xl">Your Selection</CardTitle>
              <CardDescription className="text-indigo-100">
                {show.venue} • {show.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0 pt-6">
              <div className="space-y-6">
                {selectedTickets.map(ticket => {
                  const ticketType = ticketTypes.find(t => t.id === ticket.id);
                  if (!ticketType) return null;
                  
                  const type = ticketType.code || "";
                  const selectedCount = selections.filter(s => s.type === type).length;
                  const remainingToSelect = Math.max(0, ticket.quantity - selectedCount);
                  
                  return (
                    <div key={ticket.id} className="pb-6 border-b border-indigo-100 last:border-0">
                      <div className="flex justify-between mb-3">
                        <div>
                          <div className="font-medium flex items-center">
                            {ticketType.name}
                            {ticketType.code && (
                              <Badge variant="outline" className="ml-2 text-xs bg-indigo-50 border-indigo-200 text-indigo-700">
                                {ticketType.code}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {ticketType.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-indigo-700">${ticketType.price} x {ticket.quantity}</div>
                          <div className="text-xs text-muted-foreground">${ticketType.price * ticket.quantity}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          {remainingToSelect > 0 ? (
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <Badge variant="secondary" className="font-normal bg-amber-100 text-amber-700 border-amber-200">
                                Select {remainingToSelect} more
                              </Badge>
                            </motion.div>
                          ) : (
                            <Badge variant="outline" className="text-green-700 bg-green-100 border-green-200">
                              <Check size={12} className="mr-1" /> All selected
                            </Badge>
                          )}
                        </div>
                        
                        <div>
                          {selectedCount > 0 && (
                            <div className="text-xs text-indigo-600 font-medium">
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
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span className="text-indigo-700 font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-6">
              <Button 
                className="w-full text-base py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                onClick={handleProceedToCheckout}
                disabled={Object.entries(requiredSelections).some(([type, required]) => 
                  (selectionCounts[type] || 0) < required
                )}
              >
                <Ticket className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SeatSelection;
