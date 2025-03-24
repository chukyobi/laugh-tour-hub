
import OrderConfirmation from "@/components/OrderConfirmation";

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return <OrderConfirmation showId={params.id} />;
}
