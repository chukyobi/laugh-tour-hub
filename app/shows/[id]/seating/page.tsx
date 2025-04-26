
import SeatSelection from "@/pages/SeatSelection";

export default function SeatSelectionPage({ params }: { params: { id: string } }) {
  return <SeatSelection showId={params.id} />;
}
