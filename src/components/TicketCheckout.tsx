
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Check, CreditCard, Info, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Mock shows data
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
  }
];

// Mocked selected tickets from previous step
const mockSelections = [
  { id: "REG-1", type: "REG", name: "Seat 1" },
  { id: "REG-2", type: "REG", name: "Seat 2" },
  { id: "VIP-5", type: "VIP", name: "Seat 5" }
];

const ticketTypePrice = {
  REG: 45,
  VIP: 95,
  T5: 225,
  T10: 400
};

interface TicketCheckoutProps {
  showId: string;
}

const TicketCheckout = ({ showId }: TicketCheckoutProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const selectedShow = allShows.find(show => show.id.toString() === showId);
  
  // In a real app, you'd get the selected items from context or a store
  const selections = mockSelections;
  
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
  
  const calculateSubtotal = () => {
    return selections.reduce((total, item) => {
      return total + ticketTypePrice[item.type as keyof typeof ticketTypePrice];
    }, 0);
  };
  
  const subtotal = calculateSubtotal();
  const serviceFees = Math.round(subtotal * 0.15);
  const total = subtotal + serviceFees;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Payment successful!",
        description: "Your tickets have been booked and emailed to you.",
      });
      router.push("/");
    }, 1500);
  };
  
  return (
    <div className="container py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href={`/shows/${showId}/seating`} className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Seating
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter your payment details to complete your booking</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <RadioGroup defaultValue={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Credit Card
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                    <Label
                      htmlFor="paypal"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                        <path d="M3.4 22H12c1.7 0 3.4-.5 4.5-1.6C18 19.1 19 17 19 15V9c0-5-3.5-8-8-8H6c-2.2 0-4 1.8-4 4v11c0 2.2 1.8 4 4 4Z" />
                      </svg>
                      PayPal
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
                    <Label
                      htmlFor="apple"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                        <path d="M10 2c1 .5 2 2 2 5" />
                      </svg>
                      Apple Pay
                    </Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input id="card-name" placeholder="Full name on card" required className="mt-1" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required className="mt-1" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Shield size={16} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                )}
                
                {paymentMethod !== "card" && (
                  <div className="rounded-md bg-secondary p-4">
                    <div className="flex items-start space-x-3">
                      <Info size={18} className="text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">Complete payment on next step</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {paymentMethod === "paypal" 
                            ? "After clicking 'Complete Purchase', you'll be redirected to PayPal to complete your payment securely." 
                            : "After clicking 'Complete Purchase', you'll be prompted to confirm your payment with Apple Pay."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Complete Purchase"
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardFooter>
            </Card>
          </form>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {selectedShow.date} • {selectedShow.time}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{selectedShow.venue}</h3>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin size={14} className="mr-1" />
                    {selectedShow.address}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium">Your Tickets</h4>
                
                {selections.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <Check size={14} className="mr-2 text-green-500" />
                      <span>
                        {item.type === "REG" && "Regular Seat"}
                        {item.type === "VIP" && "VIP Seat"}
                        {item.type === "T5" && "Table for 5"}
                        {item.type === "T10" && "Table for 10"}
                        {" - "}{item.name}
                      </span>
                    </div>
                    <span>${ticketTypePrice[item.type as keyof typeof ticketTypePrice]}</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service fees</span>
                  <span>${serviceFees.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketCheckout;
