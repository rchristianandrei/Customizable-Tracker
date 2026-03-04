import { useContext } from "react";
import { EditTrackerContext } from "./editTrackerContext";

export const useEditTracker = () => {
  const hook = useContext(EditTrackerContext);

  if (!hook)
    throw new Error("useEditTracker must be used inside EditTrackerProvider");

  return hook;
};
