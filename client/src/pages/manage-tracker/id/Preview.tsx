import { Tracker } from "@/components/tracker/component";
import { useEditTracker } from "./EditTrackerProvider";

export const Preview = () => {
  const { tracker } = useEditTracker();

  if (tracker) return <Tracker tracker={tracker}></Tracker>;
};
