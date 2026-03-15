import { RootLayout } from "@/components/layout/rootLayout/page";
import { CrudPage } from "./CrudPage";
import { TrackersProvider } from "@/providers/ManageTrackerProvider";

export const Reports = () => {
  return (
    <RootLayout featureName="Reports">
      <TrackersProvider>
        <CrudPage></CrudPage>
      </TrackersProvider>
    </RootLayout>
  );
};
