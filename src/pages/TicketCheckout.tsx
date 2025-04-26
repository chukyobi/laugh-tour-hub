
import React from "react";
import { TicketCheckout as TicketCheckoutComponent } from "@/components/TicketCheckout";

interface TicketCheckoutProps {
  showId: string;
}

const TicketCheckout: React.FC<TicketCheckoutProps> = ({ showId }) => {
  return <TicketCheckoutComponent showId={showId} />;
};

export default TicketCheckout;
