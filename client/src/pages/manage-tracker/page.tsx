import { RootLayout } from "@/components/layout/rootLayout/page";
import CrudPage from "./crudPage";

export const ManageTracker = () => {
  return (
    <RootLayout featureName="Manage Tracker">
      <CrudPage></CrudPage>
    </RootLayout>
  );
};
