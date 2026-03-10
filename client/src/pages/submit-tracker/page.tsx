import { RootLayout } from "@/components/layout/rootLayout/page";
import { CrudPage } from "./crudPage";
import { SubmitTrackerProvider } from "./provider/SubmitTrackerProvider";

export const SubtmitTracker = () => {
  return (
    <RootLayout featureName="Submit Tracker">
      <SubmitTrackerProvider>
        <CrudPage></CrudPage>
      </SubmitTrackerProvider>
    </RootLayout>
  );
};
