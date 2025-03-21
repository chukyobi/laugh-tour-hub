import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Clock, CreditCard, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    duration: "90 minutes"
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
    description: "Don't miss the Boston leg of Alex's 'Everyday Extraordinary' tour.",
    venuePolicies: "All ages show. No phones allowed during performance.",
    duration: "100 minutes"
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
    description: "Alex brings his unique perspective on everyday life to the Windy City.",
    venuePolicies: "18+ only. Two item minimum purchase required.",
    duration: "75 minutes"
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
    description: "Alex's first time in Austin - expect special Texas-themed material.",
    venuePolicies: "18+ only. No recording devices. Arrive 30 minutes before showtime.",
    duration: "90 minutes"
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
    description: "Back to where it all began - a special homecoming show at The Comedy Store.",
    venuePolicies: "21+ only. Two drink minimum. No heckling policy strictly enforced.",
    duration: "120 minutes"
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
    description: "Alex's Pacific Northwest debut with all-new material.",
    venuePolicies: "All ages welcome. Concessions available in lobby.",
    duration: "100 minutes"
  }
];

// Ticket types
const ticketTypes = [
  { id: 1, name: "Regular Admission", price: 45, available: true, code: "REG" },
  { id: 2, name: "VIP Package", price: 95, available: true, code: "VIP", description: "Includes meet & greet and signed merchandise" },
  { id: 3, name: "Table for 5", price: 225, available: true, code: "T5", description: "Reserved table for 5 people (includes 5 tickets)" },
  { id: 4, name: "Table for 10", price: 400, available: true, code: "T10", description: "Reserved table for 10 people (includes 10 tickets)" }
];

const TicketCheckout = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    zipCode: "",
    agreeToTerms: false
  });
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Create params to pass to confirmation page
      const params = new URLSearchParams(searchParams);
      
      // Add form data we might need
      params.set('name', `${formData.firstName} ${formData.lastName}`);
      params.set('email', formData.email);
      
      // Navigate to confirmation
      navigate(`/shows/${id}/confirmation?${params.toString()}`);
    }
  };
  
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
  
  return (
    <>
      <Navbar />
      <div className="container px-4 py-12 md:py-16 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/shows/${id}/seating?${searchParams.toString()}`)}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Seating Selection
        </Button>
        
        <div className="mb-10">
          <h1 className="text-3xl font-display font-bold mb-2">
            Checkout
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {show.date} at {show.time}
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              {show.venue}, {show.city}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  step >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  1
                </div>
                <h2 className="text-lg font-semibold">Review Your Selections</h2>
              </div>
              
              <Card className={cn(step !== 1 && "hidden")}>
                <CardContent className="p-6 space-y-4">
                  {/* Ticket details */}
                  <div>
                    <h3 className="font-semibold mb-3">Your Tickets</h3>
                    {selectedTickets.map((ticket, index) => (
                      <div key={index} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">
                            {ticket.type?.name}
                            {ticket.type?.code && (
                              <Badge variant="outline" className="ml-2 text-xs">{ticket.type.code}</Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <div>${ticket.type?.price} x {ticket.quantity}</div>
                            <div className="text-sm text-muted-foreground">${(ticket.type?.price || 0) * ticket.quantity}</div>
                          </div>
                        </div>
                        
                        {/* Show selected seats for this ticket type, if any */}
                        {ticket.type?.code && (
                          <div className="text-sm text-muted-foreground">
                            {getSeatsByType(ticket.type.code).length > 0 ? (
                              <div className="flex items-start gap-2">
                                <span>Selected:</span>
                                <span>{getSeatsByType(ticket.type.code).join(", ")}</span>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 bg-muted/50 flex justify-end">
                  <Button onClick={handleContinue}>
                    Continue to Customer Info
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="flex items-center space-x-2 pt-6">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  step >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  2
                </div>
                <h2 className="text-lg font-semibold">Customer Information</h2>
              </div>
              
              <Card className={cn(step !== 2 && "hidden")}>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                      <div className="px-3 text-muted-foreground">
                        <Mail size={16} />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="border-0 focus-visible:ring-0"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                      <div className="px-3 text-muted-foreground">
                        <Phone size={16} />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="border-0 focus-visible:ring-0"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 bg-muted/50 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleContinue}>
                    Continue to Payment
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="flex items-center space-x-2 pt-6">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  step >= 3 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  3
                </div>
                <h2 className="text-lg font-semibold">Payment</h2>
              </div>
              
              <Card className={cn(step !== 3 && "hidden")}>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                      <div className="px-3 text-muted-foreground">
                        <CreditCard size={16} />
                      </div>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="border-0 focus-visible:ring-0"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-1">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        I agree to the terms and conditions and the privacy policy
                      </span>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 bg-muted/50 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleContinue} disabled={!formData.agreeToTerms}>
                    Complete Purchase
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader className="pb-3">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="space-y-4">
                  {selectedTickets.map((ticket, index) => {
                    const seatCodes = getSeatsByType(ticket.type?.code || "");
                    return (
                      <div key={index} className="p-3 rounded-md bg-muted/50 border border-border/50">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium flex items-center">
                            {ticket.type?.name}
                            {ticket.type?.code && (
                              <Badge variant="outline" className="ml-2 text-xs">{ticket.type.code}</Badge>
                            )}
                          </span>
                          <span className="font-bold">${(ticket.type?.price || 0) * ticket.quantity}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ticket.quantity} × ${ticket.type?.price}
                        </div>
                        
                        {seatCodes.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {seatCodes.map((code, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {code}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service & Facility Fee</span>
                    <span>${calculateFees().toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${calculateGrandTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <div className="text-xs text-muted-foreground">
                  <p className="mb-1">All sales are final. No refunds or exchanges.</p>
                  <p>Tickets will be emailed to the address provided at checkout.</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TicketCheckout;
