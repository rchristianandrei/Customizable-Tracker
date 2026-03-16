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
      try {
        const tracker = await trackerRepo.getById(id, true);
        setTracker(tracker);
      } catch (error) {
        toast.error("Unable to load the tracker");
      } finally {
        setLoading(false);
      }
    };
    loadTracker(id ?? "");
  }, []);

  if (loading) return <Loader2 />;
  if (!tracker) return <>No Tracker Found</>;

  return <AnswerTrackerForm tracker={tracker} />;
};

const AnswerTrackerForm = ({ tracker }: { tracker: TrackerType }) => {
  const { compRefs, register, isFormValid, getFormValues, resetForm } =
    useTrackerForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isActive, elapsedTime, formatTime, startTime, resetTime } =
    useStopwatch();

  usePreventUnload(isActive);

  const onStart = () => {
    startTime();
  };

  const onSubmit = async () => {
    if (isSubmitting) return;

    if (!(await isFormValid())) return;

    setIsSubmitting(true);

    const timeInSecs = elapsedTime / 1000;
    const formData = getFormValues();

    console.log("Elapsed Time in Secs:", timeInSecs);

    const mapComponentData = Object.entries(formData).map(([_, value]) => {
      return {
        id: value.id,
        label: value.label,
        encodedData: value.value,
      };
    });

    try {
      await submittedRepo.submit({
        trackerId: tracker.id.toString(),
        trackerName: tracker.name,
        components: mapComponentData,
      });
      resetForm();
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {tracker.components
            .map((component) => ({
              component,
              handle: register(component.id),
            }))
            .map(({ component, handle }) => (
              <Textbox
                ref={handle}
                key={component.id}
                component={component}
                dependsOn={compRefs.current.get(component.dependsOn ?? "")}
                enable={isActive}
              />
            ))}
        </form>
      </Tracker>
    </section>
  );
};
