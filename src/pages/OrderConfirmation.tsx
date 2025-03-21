import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, MapPin, Clock, Ticket, ArrowLeft } from "lucide-react";

// Mock show data (same as in previous components)
const allShows = [
  {
    id: 1,
    date: "June 12, 2023",
    time: "8:00 PM",
    city: "New York, NY",
    venue: "Comedy Cellar",
    address: "117 MacDougal St, New York, NY 10012",
    status: "Available",
    ticketLink: "/shows/1/tickets",
    isTour: true,
    description: "A night of laughter with Alex Miller's signature observational comedy.",
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
    duration: "100 minutes"
  }
];

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the show based on the ID from URL params
  const show = allShows.find(s => s.id === parseInt(id || "0"));
  
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
  
  // Generate a random order number
  const orderNumber = `AM-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="container px-4 py-16 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your tickets have been emailed to you.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-md">
              <h2 className="font-semibold mb-2">Order #{orderNumber}</h2>
              <p className="text-sm text-muted-foreground">
                Confirmation has been sent to your email.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{show.date}</p>
                    <p className="text-sm text-muted-foreground">{show.time} ({show.duration})</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{show.venue}</p>
                    <p className="text-sm text-muted-foreground">{show.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Ticket className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Alex Miller: Live Comedy</p>
                    <p className="text-sm text-muted-foreground">{show.city}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Important Information</h3>
              <ul className="text-sm space-y-2">
                <li>• Please arrive 30 minutes before showtime.</li>
                <li>• Have your tickets ready on your mobile device or printed.</li>
                <li>• Seat assignments are indicated on your tickets.</li>
                <li>• All sales are final. No refunds or exchanges.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => window.print()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M6 9V2h12v7"></path>
            <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
            <path d="M6 14h12v8H6z"></path>
          </svg>
          Print Confirmation
        </Button>
        
        <Button
          onClick={() => navigate("/")}
          className="flex items-center justify-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Return to Homepage
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
