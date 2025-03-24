
import ShowDetails from "@/components/ShowDetails";

export default function ShowDetailsPage({ params }: { params: { id: string } }) {
  return <ShowDetails showId={params.id} />;
}
