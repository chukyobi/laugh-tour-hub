
import React from "react";
import { SeatSelection as SeatSelectionComponent } from "@/components/SeatSelection";

interface SeatSelectionProps {
  showId: string;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ showId }) => {
  return <SeatSelectionComponent showId={showId} />;
};

export default SeatSelection;
