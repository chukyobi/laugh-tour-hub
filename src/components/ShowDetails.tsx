
import { useState } from "react";
import { Calendar, MapPin, Clock, ArrowLeft, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useParams, useNavigate } from "react-router-dom";

// Ticket types data
const ticketTypes = [
  { id: 1, name: "General Admission", price: 45, available: true },
  { id: 2, name: "VIP Package", price: 95, available: true, description: "Includes meet & greet and signed merchandise" },
  { id: 3, name: "Front Row Seats", price: 75, available: false },
  { id: 4, name: "Group Package (4+ tickets)", price: 40, available: true, description: "Per person, minimum 4 tickets" }
];

type SeatSection = {
  id: string;
  name: string;
  price: number;
  available: boolean;
  rows: {
    row: string;
    seats: {
      id: string;
      number: string;
      available: boolean;
    }[];
  }[];
};

// Seating sections
const seatingSections: SeatSection[] = [
  {
    id: "orchestra",
    name: "Orchestra",
    price: 75,
    available: true,
    rows: [
      {
        row: "A",
        seats: Array.from({ length: 10 }, (_, i) => ({
          id: `A-${i + 1}`,
          number: `${i + 1}`,
          available: Math.random() > 0.3
        }))
      },
      {
        row: "B",
        seats: Array.from({ length: 10 }, (_, i) => ({
          id: `B-${i + 1}`,
          number: `${i + 1}`,
          available: Math.random() > 0.3
        }))
      },
      {
        row: "C",
        seats: Array.from({ length: 10 }, (_, i) => ({
          id: `C-${i + 1}`,
          number: `${i + 1}`,
          available: Math.random() > 0.5
        }))
      }
    ]
  },
  {
    id: "mezzanine",
    name: "Mezzanine",
    price: 55,
    available: true,
    rows: [
      {
        row: "D",
        seats: Array.from({ length: 12 }, (_, i) => ({
          id: `D-${i + 1}`,
          number: `${i + 1}`,
          available: Math.random() > 0.2
        }))
      },
      {
        row: "E",
        seats: Array.from({ length: 12 }, (_, i) => ({
          id: `E-${i + 1}`,
          number: `${i + 1}`,
          available: Math.random() > 0.2
        }))
      }
    ]
  },
  {
    id: "balcony",
    name: "Balcony",
    price: 45,
    available: true,
    rows: [
      {
        row: "F",
        seats: Array.from({ length: 14 }, (_, i) => ({
          id: `F-${i + 1}`,
          number: `${i + 1}`,
          available: Math.random() > 0.1
        }))
      },
      {
        row: "G",
        seats: Array.from({ length: 14 }, (_, i) => ({
          id: `G-${i + 1}`,
          number: `${i + 1}`,
          available: Math.random() > 0.1
        }))
      }
    ]
  }
];

// Mock tour data for reference
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
    description: "Don't miss the Boston leg of Alex's 'Everyday Extraordinary' tour. Following his sold-out show last year, Alex returns to the Wilbur with fresh material and his trademark observational wit. This performance features a special Q&A segment at the end, where Alex will take questions from the audience.",
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
    description: "Alex brings his unique perspective on everyday life to the Windy City. This special Chicago performance includes city-specific material and observations from Alex's time living in the Midwest. Expect a mix of polished material and fresh improvisation in this intimate venue.",
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
    description: "Alex's first time in Austin - expect special Texas-themed material. After years of requests, Alex finally brings his comedy to the Live Music Capital of the World. This show will feature his observations on Southern culture, Texas quirks, and the differences between West Coast and Southern living.",
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
    description: "Back to where it all began - a special homecoming show at The Comedy Store. Alex returns to the stage where he got his start, delivering an emotional and hilarious evening of comedy. This show will feature surprise guest appearances from comedy legends and friends who influenced Alex's career.",
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
    description: "Alex's Pacific Northwest debut with all-new material. This theater show showcases Alex's evolution as a comedian, featuring longer-form stories and more personal material than his club sets. The Paramount's historic venue provides the perfect backdrop for this special performance.",
    venuePolicies: "All ages welcome. Concessions available in lobby.",
    duration: "100 minutes"
  }
];

const ShowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
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

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="container px-4 py-12 md:py-16">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/#tour")}
        className="mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to All Shows
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wide mb-4">
              {show.isTour ? "Tour Date" : "Special Show"}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              {show.city}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
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
            
            <div className="prose prose-stone max-w-none">
              <p>{show.description}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Venue Information</h3>
              <p className="text-muted-foreground">{show.address}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Show Policies</h3>
              <p className="text-muted-foreground">{show.venuePolicies}</p>
            </div>
          </div>
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
                  <h4 className="font-medium mb-2">Ticket Options</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ticketTypes.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">
                            {ticket.name}
                            {ticket.description && (
                              <p className="text-xs text-muted-foreground">{ticket.description}</p>
                            )}
                          </TableCell>
                          <TableCell>${ticket.price}</TableCell>
                          <TableCell className="text-right">
                            {ticket.available ? (
                              <Link to={`/shows/${show.id}/tickets?type=${ticket.id}`}>
                                <Button size="sm" variant="outline">Select</Button>
                              </Link>
                            ) : (
                              <span className="text-xs text-muted-foreground">Unavailable</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6 mb-2">
                    <h4 className="font-medium mb-4">Reserved Seating</h4>
                    <div className="space-y-2">
                      {seatingSections.map((section) => (
                        <div key={section.id}>
                          <Button
                            variant="outline"
                            className="w-full justify-between mb-2"
                            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                          >
                            {section.name} - ${section.price}
                            <span className="text-xs">
                              {activeSection === section.id ? "Hide" : "View Seats"}
                            </span>
                          </Button>
                          
                          {activeSection === section.id && (
                            <div className="p-4 bg-muted/50 rounded-md mb-4">
                              <div className="mb-4 text-center">
                                <div className="w-3/4 h-6 bg-primary/20 mx-auto mb-6 rounded-t-xl text-xs flex items-center justify-center text-primary/70">Stage</div>
                              </div>
                              
                              {section.rows.map((row) => (
                                <div key={row.row} className="mb-2">
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-medium w-6">{row.row}</span>
                                    <div className="flex flex-wrap gap-1">
                                      {row.seats.map((seat) => (
                                        <button
                                          key={seat.id}
                                          disabled={!seat.available}
                                          onClick={() => seat.available && toggleSeat(seat.id)}
                                          className={cn(
                                            "w-6 h-6 text-xs rounded flex items-center justify-center transition-colors",
                                            !seat.available && "bg-gray-200 text-gray-400 cursor-not-allowed",
                                            seat.available && !selectedSeats.includes(seat.id) && "bg-white border hover:bg-primary/5",
                                            selectedSeats.includes(seat.id) && "bg-primary text-white"
                                          )}
                                        >
                                          {seat.number}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                                <div className="flex items-center">
                                  <div className="w-4 h-4 bg-white border rounded mr-1"></div>
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
                              
                              {selectedSeats.length > 0 && (
                                <div className="mt-4">
                                  <Link to={`/shows/${show.id}/tickets?section=${section.id}&seats=${selectedSeats.join(',')}`}>
                                    <Button className="w-full">
                                      Continue with {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}
                                    </Button>
                                  </Link>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
