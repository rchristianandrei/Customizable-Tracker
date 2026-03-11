import { trackerRepo } from "@/api/trackerRepo";
import { Textbox } from "@/components/tracker/components/textbox";
import { Tracker } from "@/components/tracker/tracker";
import { usePreventUnload } from "@/hooks/usePreventUnload";
import { useTrackerForm } from "@/hooks/useTrackerForm";
import type { TrackerType } from "@/types/tracker";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AnswerTracker = () => {
  const { id } = useParams();
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTracker = async (id: number) => {
      setLoading(true);
      const tracker = await trackerRepo.getById(id);
      setTracker(tracker);
      setLoading(false);
    };
    loadTracker(Number(id));
  }, []);

  if (loading) return <Loader2 />;
  if (!tracker) return <>No Tracker Found</>;

  return <AnswerTrackerForm tracker={tracker} />;
};

const AnswerTrackerForm = ({ tracker }: { tracker: TrackerType }) => {
  const { form, isOngoing, handleStart, handleSubmit } =
    useTrackerForm(tracker);

  usePreventUnload(isOngoing);

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return false;
    return handleSubmit(async (data) => {
      console.log(data);
      form.reset();
    });
  };

  return (
    <section className="h-screen">
      <Tracker
        tracker={tracker}
        onStartEvent={handleStart}
        onSubmitEvent={onSubmit}
      >
        <form>
          {tracker.components.map((component) => (
            <Textbox
              key={component.id}
              form={form}
              component={component}
              enable={isOngoing}
            />
          ))}
        </form>
      </Tracker>
    </section>
  );
};
