import { RootLayout } from "@/components/layout/rootLayout/page";
import { CrudPage } from "./CrudPage";
import { ManageTrackerProvider } from "../manage-tracker/ManageTrackerProvider";

export const Reports = () => {
  return (
    <RootLayout featureName="Reports">
      <ManageTrackerProvider>
        <CrudPage></CrudPage>
      </ManageTrackerProvider>
    </RootLayout>
  );
};
