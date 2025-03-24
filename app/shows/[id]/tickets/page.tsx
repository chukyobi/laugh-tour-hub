
import ShowDetails from "@/components/ShowDetails";

export default function TicketsPage({ params }: { params: { id: string } }) {
  return <ShowDetails showId={params.id} ticketsView={true} />;
}
