
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedShow from "@/components/FeaturedShow";
import TourDates from "@/components/TourDates";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import SponsorsCarousel from "@/components/SponsorsCarousel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock tour data for the table
const upcomingShows = [
  {
    id: 2,
    date: "June 18, 2023",
    time: "7:30 PM",
    city: "Boston, MA",
    venue: "Wilbur Theatre",
    status: "Available",
    ticketLink: "/shows/2/tickets"
  },
  {
    id: 3,
    date: "June 24, 2023",
    time: "8:30 PM",
    city: "Chicago, IL",
    venue: "The Laugh Factory",
    status: "Available",
    ticketLink: "/shows/3/tickets"
  },
  {
    id: 4,
    date: "July 2, 2023",
    time: "7:00 PM",
    city: "Austin, TX",
    venue: "Cap City Comedy",
    status: "Few Left",
    ticketLink: "/shows/4/tickets"
  },
  {
    id: 5,
    date: "July 8, 2023",
    time: "9:00 PM",
    city: "Los Angeles, CA",
    venue: "The Comedy Store",
    status: "Available",
    ticketLink: "/shows/5/tickets"
  },
  {
    id: 6,
    date: "July 15, 2023",
    time: "8:00 PM",
    city: "Seattle, WA",
    venue: "The Paramount Theatre",
    status: "Available",
    ticketLink: "/shows/6/tickets"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedShow />
      
      {/* Tour Dates Table */}
      <section id="tour-table" className="py-12 bg-muted/30">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-display">Upcoming Tour Dates</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link to="/#tour">
                View All <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tickets</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingShows.slice(0, 4).map((show) => (
                  <TableRow key={show.id}>
                    <TableCell>
                      <div className="font-medium">{show.date}</div>
                      <div className="text-sm text-muted-foreground">{show.time}</div>
                    </TableCell>
                    <TableCell>{show.city}</TableCell>
                    <TableCell>{show.venue}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          show.status === "Sold Out" ? "destructive" : 
                          show.status === "Few Left" ? "warning" : 
                          "success"
                        }
                      >
                        {show.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" asChild>
                        <Link to={`/shows/${show.id}`}>
                          Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      
      <TourDates />
      <About />
      <SponsorsCarousel />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
