
import React from "react";
import ShowDetailsComponent from "@/components/ShowDetails";
import { useParams } from "react-router-dom";

const ShowDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <ShowDetailsComponent showId={id || ""} />;
};

export default ShowDetails;
