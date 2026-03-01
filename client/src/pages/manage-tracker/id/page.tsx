import { useParams } from "react-router-dom";

export const EditTracker = () => {
  const { id } = useParams();
  return <>Tracker: {id}</>;
};
