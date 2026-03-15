import { RootLayout } from "@/components/layout/rootLayout/page";
import { CrudPage } from "./crudPage";
import { TrackersProvider } from "@/providers/ManageTrackerProvider";

export const SubtmitTracker = () => {
  return (
    <RootLayout featureName="Submit Tracker">
      <TrackersProvider>
        <CrudPage></CrudPage>
      </TrackersProvider>
    </RootLayout>
  );
};
