
import { useState } from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

// Tour date data
const tourDates = [
  {
    id: 1,
    date: "June 12, 2023",
    city: "New York, NY",
    venue: "Comedy Cellar",
    status: "Sold Out",
    ticketLink: "#"
  },
  {
    id: 2,
    date: "June 18, 2023",
    city: "Boston, MA",
    venue: "Wilbur Theatre",
    status: "Available",
    ticketLink: "#"
  },
  {
    id: 3,
    date: "June 24, 2023",
    city: "Chicago, IL",
    venue: "The Laugh Factory",
    status: "Available",
    ticketLink: "#"
  },
  {
    id: 4,
    date: "July 2, 2023",
    city: "Austin, TX",
    venue: "Cap City Comedy",
    status: "Few Left",
    ticketLink: "#"
  },
  {
    id: 5,
    date: "July 8, 2023",
    city: "Los Angeles, CA",
    venue: "The Comedy Store",
    status: "Available",
    ticketLink: "#"
  },
  {
    id: 6,
    date: "July 15, 2023",
    city: "Seattle, WA",
    venue: "The Paramount Theatre",
    status: "Available",
    ticketLink: "#"
  }
];

const TourDates = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  
  const handleLoadMore = () => {
    setVisibleCount(tourDates.length);
  };

  return (
    <section
      id="tour"
      className="relative py-20 md:py-32 bg-secondary"
    >
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wide mb-4">
            Tour Dates
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Catch Me Live
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join me for a night of laughter and unforgettable moments.
            Check out my upcoming tour dates and get your tickets before they're gone.
          </p>
        </div>

        <div className="space-y-4 md:space-y-5 mb-12">
          {tourDates.slice(0, visibleCount).map((event, index) => (
            <div
              key={event.id}
              className={cn(
                "group bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-5 sm:p-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 opacity-0",
                `animate-fade-in animate-delay-${(index % 5) * 100}`
              )}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto sm:p-5">
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-secondary rounded-full sm:rounded-lg text-center">
                  <Calendar size={20} className="text-primary mb-1" />
                  <span className="text-xs font-medium">{event.date.split(",")[0]}</span>
                </div>
                
                <div className="sm:min-w-[180px]">
                  <h3 className="font-semibold text-lg">{event.city}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {event.venue}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end sm:p-4">
                <div className="flex items-center">
                  <span
                    className={cn(
                      "text-sm font-medium px-3 py-1 rounded-full",
                      event.status === "Sold Out"
                        ? "bg-destructive/10 text-destructive"
                        : event.status === "Few Left"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    )}
                  >
                    {event.status}
                  </span>
                </div>
                
                <a
                  href={event.ticketLink}
                  className={cn(
                    "flex items-center rounded-full py-2 px-4 text-sm font-medium transition-all",
                    event.status === "Sold Out"
                      ? "bg-secondary text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90 hover:scale-105"
                  )}
                  onClick={(e) => event.status === "Sold Out" && e.preventDefault()}
                >
                  <Ticket size={16} className="mr-2" />
                  {event.status === "Sold Out" ? "Sold Out" : "Get Tickets"}
                </a>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < tourDates.length && (
          <div className="text-center opacity-0 animate-fade-in animate-delay-500">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-full bg-white text-primary border border-primary/20 text-sm font-medium transition-all hover:bg-primary/5"
            >
              View All Tour Dates
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TourDates;
