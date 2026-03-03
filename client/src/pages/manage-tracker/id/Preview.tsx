import { Tracker } from "@/components/tracker/component";
import { useEditTracker } from "./EditTrackerProvider";

export const Preview = () => {
  const { tracker } = useEditTracker();

  if (tracker)
    return (
      <section className="h-full py-20">
        <Tracker tracker={tracker}></Tracker>
      </section>
    );
};
