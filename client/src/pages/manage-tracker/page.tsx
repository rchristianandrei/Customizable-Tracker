import { RootLayout } from "@/components/layout/rootLayout/page";
import { CrudPage } from "./CrudPage";
import { ManageTrackerProvider } from "./ManageTrackerProvider";

export const ManageTracker = () => {
  return (
    <RootLayout featureName="Manage Tracker">
      <ManageTrackerProvider>
        <CrudPage></CrudPage>
      </ManageTrackerProvider>
    </RootLayout>
  );
};
