
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowLeft, Check, Ticket, Printer, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock show data (same as in previous files)
const allShows = [
  {
    id: 1,
    date: "June 12, 2023",
    time: "8:00 PM",
    city: "New York, NY",
    venue: "Comedy Cellar",
    address: "117 MacDougal St, New York, NY 10012",
  },
  {
    id: 2,
    date: "June 18, 2023",
    time: "7:30 PM",
    city: "Boston, MA",
    venue: "Wilbur Theatre",
    address: "246 Tremont St, Boston, MA 02116",
  },
  {
    id: 3,
    date: "June 24, 2023",
    time: "8:30 PM",
    city: "Chicago, IL",
    venue: "The Laugh Factory",
    address: "3175 N Broadway, Chicago, IL 60657",
  },
  {
    id: 4,
    date: "July 2, 2023",
    time: "7:00 PM",
    city: "Austin, TX",
    venue: "Cap City Comedy",
    address: "8120 Research Blvd #100, Austin, TX 78758",
  },
  {
    id: 5,
    date: "July 8, 2023",
    time: "9:00 PM",
    city: "Los Angeles, CA",
    venue: "The Comedy Store",
    address: "8433 Sunset Blvd, Los Angeles, CA 90069",
  },
  {
    id: 6,
    date: "July 15, 2023",
    time: "8:00 PM",
    city: "Seattle, WA",
    venue: "The Paramount Theatre",
    address: "911 Pine St, Seattle, WA 98101",
  }
];

// Ticket types
const ticketTypes = [
  { id: 1, name: "Regular Admission", price: 45, code: "REG" },
  { id: 2, name: "VIP Package", price: 95, code: "VIP", description: "Includes meet & greet and signed merchandise" },
  { id: 3, name: "Table for 5", price: 225, code: "T5", description: "Reserved table for 5 people (includes 5 tickets)" },
  { id: 4, name: "Table for 10", price: 400, code: "T10", description: "Reserved table for 10 people (includes 10 tickets)" }
];

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState<string>("");
  
  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
    setOrderNumber(randomOrderNumber);
    
    // Show success toast
    toast.success("Order completed successfully!", {
      description: "Your tickets have been emailed to you."
    });
  }, []);
  
  // Find the show based on the ID from URL params
  const show = allShows.find(s => s.id === parseInt(id || "0"));
  
  // Parse selected ticket types from URL params
  const selectedTickets = searchParams.getAll('tickets').map(param => {
    const [ticketId, quantity] = param.split(':');
    return {
      id: parseInt(ticketId),
      quantity: parseInt(quantity),
      type: ticketTypes.find(t => t.id === parseInt(ticketId))
    };
  });
  
  // Parse selected seats from URL params
  const selectedSeats = searchParams.getAll('seats');
  
  // Get customer information from URL params
  const customerName = searchParams.get('name') || "Guest";
  const customerEmail = searchParams.get('email') || "guest@example.com";
  
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
  
  // Helper to calculate prices
  const calculateSubtotal = () => {
    return selectedTickets.reduce((sum, ticket) => {
      return sum + ((ticket.type?.price || 0) * ticket.quantity);
    }, 0);
  };
  
  const calculateFees = () => {
    return calculateSubtotal() * 0.15; // 15% service fee
  };
  
  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateFees();
  };
  
  // Helper to group selected seats by type
  const getSeatsByType = (type: string) => {
    return selectedSeats.filter(seat => seat.startsWith(type));
  };
  
  const handlePrintTickets = () => {
    window.print();
  };
  
  const handleEmailTickets = () => {
    toast.success("Tickets sent!", {
      description: `Tickets have been emailed to ${customerEmail}`
    });
  };

  return (
    <div className="container px-4 py-12 md:py-16 max-w-3xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-6 print:hidden"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Button>
      
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
          <Check size={32} />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your tickets have been emailed to you.
        </p>
      </div>
      
      <Card className="mb-8 border-primary/10 shadow-md">
        <CardHeader className="pb-2 bg-muted/30">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">Order Details</CardTitle>
              <p className="text-sm text-muted-foreground">Order #{orderNumber}</p>
            </div>
            <div className="space-x-2 print:hidden">
              <Button variant="outline" size="sm" onClick={handlePrintTickets}>
                <Printer size={16} className="mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleEmailTickets}>
                <Mail size={16} className="mr-2" />
                Email Again
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Show Information</h3>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 text-sm">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-muted-foreground" />
                  {show.date} at {show.time}
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 text-muted-foreground" />
                  {show.venue}, {show.city}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3">Ticket Information</h3>
              <div className="space-y-4">
                {selectedTickets.map((ticket, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {ticket.type?.name}
                        {ticket.type?.code && (
                          <Badge variant="outline" className="text-xs">{ticket.type.code}</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Quantity: {ticket.quantity} &bull; ${ticket.type?.price} each
                      </div>
                      
                      {/* Show selected seats for this ticket type, if any */}
                      {ticket.type?.code && getSeatsByType(ticket.type.code).length > 0 && (
                        <div className="mt-2">
                          <Badge variant="secondary" className="font-normal">
                            {ticket.type.code === "T5" || ticket.type.code === "T10" ? "Tables" : "Seats"}
                          </Badge>
                          <div className="text-sm mt-1">
                            {getSeatsByType(ticket.type.code).join(", ")}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Ticket Holder</div>
                      <div className="font-medium">{customerName}</div>
                      <div className="text-sm text-muted-foreground">{customerEmail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Service & Facility Fee</span>
                  <span>${calculateFees().toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${calculateGrandTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 px-6 py-4">
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center">
              <Ticket size={16} className="mr-2 text-primary" />
              <span className="text-sm">Your ticket includes venue entry and seating as specified above.</span>
            </div>
            <Button className="print:hidden" onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground space-y-2 print:hidden">
        <p>Questions about your order? Contact us at tickets@alexmiller.com</p>
        <p>Have a great show!</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
