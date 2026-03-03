import { Save, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditTracker } from "./EditTrackerProvider";
import { ButtonSpinner } from "@/components/spinners/ButtonSpinner";

export const TrackerMenu = () => {
  const { loading, updateTracker } = useEditTracker();

  return (
    <section className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1 border bg-background rounded flex flex-row gap-1">
      <Button type="button" onClick={updateTracker} disabled={loading}>
        {loading && <ButtonSpinner />}
        {!loading && <Save />}
      </Button>
      <Button type="button" variant="outline" disabled={loading}>
        <Eye />
      </Button>
      <Button type="button" variant="outline" disabled={loading}>
        <Plus />
      </Button>
    </section>
  );
};
