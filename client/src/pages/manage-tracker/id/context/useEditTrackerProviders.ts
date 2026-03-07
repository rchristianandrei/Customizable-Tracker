import { useContext } from "react";
import { EditTrackerStateContext } from "./editTrackerStateContext";
import { EditTrackerActionContext } from "./editTrackerActionContext";

export const useEditTrackerState = () => {
  const hook = useContext(EditTrackerStateContext);

  if (!hook)
    throw new Error(
      "useEditTrackerState must be used inside EditTrackerStateContext",
    );

  return hook;
};

export const useEditTrackerAction = () => {
  const hook = useContext(EditTrackerActionContext);

  if (!hook)
    throw new Error(
      "useEditTrackerAction must be used inside EditTrackerActionContext",
    );

  return hook;
};
