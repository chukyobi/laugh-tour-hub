
import TicketCheckout from "@/pages/TicketCheckout";

export default function CheckoutPage({ params }: { params: { id: string } }) {
  return <TicketCheckout showId={params.id} />;
}
