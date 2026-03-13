import { submittedRepo } from "@/api/submitRepo";
import { trackerRepo } from "@/api/trackerRepo";
import { Textbox } from "@/components/tracker/components/textbox";
import { Tracker } from "@/components/tracker/tracker";
import { usePreventUnload } from "@/hooks/usePreventUnload";
import { useStopwatch } from "@/hooks/useStopwatch";
import { useTrackerForm } from "@/hooks/useTrackerForm";
import type { TrackerType } from "@/types/tracker";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const AnswerTracker = () => {
  const { id } = useParams();
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTracker = async (id: string) => {
      setLoading(true);
      const tracker = await trackerRepo.getById(id);
      setTracker(tracker);
      setLoading(false);
    };
    loadTracker(id ?? "");
  }, []);

  if (loading) return <Loader2 />;
  if (!tracker) return <>No Tracker Found</>;

  return <AnswerTrackerForm tracker={tracker} />;
};

const AnswerTrackerForm = ({ tracker }: { tracker: TrackerType }) => {
  const { form } = useTrackerForm(tracker);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isActive, elapsedTime, formatTime, startTime, resetTime } =
    useStopwatch();

  usePreventUnload(isActive);

  const onStart = () => {
    startTime();
  };

  const onSubmit = async () => {
    if (isSubmitting) return;

    const isValid = await form.trigger();
    if (!isValid) return;

    setIsSubmitting(true);

    const timeInSecs = elapsedTime / 1000;
    const formData = form.getValues();

    console.log("Elapsed Time in Secs:", timeInSecs);

    const mapComponentData = Object.entries(formData).map(([key, value]) => {
      const component = tracker.components.find((c) => c.id === key);
      return {
        id: component?.id ?? "",
        label: component?.label ?? "",
        encodedData: String(value),
      };
    });

    try {
      await submittedRepo.submit({
        trackerId: tracker.id.toString(),
        trackerName: tracker.name,
        components: mapComponentData,
      });
      form.reset();
      resetTime();
      toast.success("Tracker Submitted");
    } catch (error) {
      toast.error("Unable to Submit Data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-screen">
      <Tracker
        tracker={tracker}
        isActive={isActive}
        formatTime={formatTime}
        onStartEvent={onStart}
        onSubmitEvent={onSubmit}
      >
        <form>
          {tracker.components.map((component) => (
            <Textbox
              key={component.id}
              form={form}
              component={component}
              enable={isActive}
            />
          ))}
        </form>
      </Tracker>
    </section>
  );
};
