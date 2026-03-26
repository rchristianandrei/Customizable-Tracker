import { RootLayout } from "@/components/layout/rootLayout/page";
import { CrudPage } from "./crudPage";
import { TrackersProvider } from "@/providers/ManageTrackerProvider";

export const ManageTracker = () => {
  return (
    <RootLayout featureName="Manage Tracker">
      <TrackersProvider>
        <CrudPage></CrudPage>
      </TrackersProvider>
    </RootLayout>
  );
};
