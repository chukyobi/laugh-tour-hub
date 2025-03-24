
import SeatSelection from "@/components/SeatSelection";

export default function SeatSelectionPage({ params }: { params: { id: string } }) {
  return <SeatSelection showId={params.id} />;
}
