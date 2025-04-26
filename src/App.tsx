
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SeatSelection from "./pages/SeatSelection";
import TicketCheckout from "./pages/TicketCheckout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ShowDetails from "./pages/ShowDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shows/:id" element={<ShowDetails />} />
          <Route path="/shows/:id/tickets" element={<ShowDetails />} />
          <Route path="/shows/:id/seating" element={<SeatSelection />} />
          <Route path="/shows/:id/checkout" element={<TicketCheckout />} />
          <Route path="/shows/:id/confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
