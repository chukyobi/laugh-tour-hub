
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ShowDetails from "./components/ShowDetails";
import SeatSelection from "./pages/SeatSelection";
import TicketCheckout from "./pages/TicketCheckout";
import OrderConfirmation from "./pages/OrderConfirmation";

const queryClient = new QueryClient();

interface ShowParams {
  id?: string;
}

// Wrapper components to extract and pass ID params
const ShowDetailsWrapper = () => {
  const { id } = useParams<ShowParams>();
  return <ShowDetails showId={id || ""} />;
};

const SeatSelectionWrapper = () => {
  const { id } = useParams<ShowParams>();
  return <SeatSelection showId={id || ""} />;
};

const TicketCheckoutWrapper = () => {
  const { id } = useParams<ShowParams>();
  return <TicketCheckout showId={id || ""} />;
};

const OrderConfirmationWrapper = () => {
  const { id } = useParams<ShowParams>();
  return <OrderConfirmation showId={id || ""} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shows/:id" element={<ShowDetailsWrapper />} />
          <Route path="/shows/:id/tickets" element={<ShowDetailsWrapper />} />
          <Route path="/shows/:id/seating" element={<SeatSelectionWrapper />} />
          <Route path="/shows/:id/checkout" element={<TicketCheckoutWrapper />} />
          <Route path="/shows/:id/confirmation" element={<OrderConfirmationWrapper />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
