import { trackerRepo } from "@/api/trackerRepo";
import { Textbox } from "@/components/tracker/components/textbox";
import { Tracker } from "@/components/tracker/tracker";
import type { TrackerType } from "@/types/tracker";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AnswerTracker = () => {
  const { id } = useParams();
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOngoing, setIsOngoing] = useState(false);

  useEffect(() => {
    const loadTracker = async (id: number) => {
      setLoading(true);

      const tracker = await trackerRepo.getById(id);

      setTracker(() => tracker);

      setLoading(false);
    };
    loadTracker(Number(id));
  }, []);

  if (loading) return <Loader2 />;

  if (!tracker) return <>No Tracker Found</>;

  return (
    <section className="h-screen">
      <Tracker
        tracker={tracker}
        onStartEvent={() => setIsOngoing(true)}
        onSubmitEvent={() => setIsOngoing(false)}
      >
        {tracker.components && (
          <div>
            {tracker.components.map((component) => (
              <div className="flex items-center">
                <Textbox component={component} enable={isOngoing} />
              </div>
            ))}
          </div>
        )}
      </Tracker>
    </section>
  );
};
