
import React from "react";
import TicketCheckoutComponent from "@/components/TicketCheckout";

interface TicketCheckoutProps {
  showId: string;
}

const TicketCheckout: React.FC<TicketCheckoutProps> = ({ showId }) => {
  return <TicketCheckoutComponent showId={showId} />;
};

export default TicketCheckout;
