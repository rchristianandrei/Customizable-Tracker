import { RootLayout } from "@/components/layout/rootLayout/page";
import { useParams } from "react-router-dom";
import { SubmittedTable } from "./SubmittedTable";
import { useEffect, useState } from "react";
import { trackerRepo } from "@/api/trackerRepo";
import type { TrackerType } from "@/types/tracker";
import { submittedRepo } from "@/api/submitRepo";
import type { SubmittedData } from "@/types/SubmittedData";

export const Table = () => {
  const { id } = useParams();
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [submitted, setSubmitted] = useState<SubmittedData[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      const tracker = await trackerRepo.getById(id ?? "");
      setTracker(tracker);

      const submitted = await submittedRepo.getByTrackerIdAndDateRange({
        trackerId: id ?? "",
      });
      setSubmitted(submitted);
    };
    onLoad();
  }, []);

  return (
    <RootLayout featureName={`Submitted Data for ${tracker?.name}`}>
      {tracker && (
        <SubmittedTable
          tracker={tracker}
          submitted={submitted}
        ></SubmittedTable>
      )}
    </RootLayout>
  );
};
