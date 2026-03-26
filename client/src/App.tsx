import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "@/pages/login/page";
import { Register } from "@/pages/register/page";
import { Dashboard } from "@/pages/dashboard/page";
import { ManageTracker } from "@/pages/manage-tracker/page";
import { EditTracker } from "@/pages/manage-tracker/id/page";
import { SubtmitTracker } from "@/pages/submit-tracker/page";

import { PublicRoute } from "@/guards/PublicRoute";
import { PrivateRoute } from "@/guards/PrivateRoute";

import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/store/useUserStore";
import { AnswerTracker } from "./pages/submit-tracker/id/page";
import { Reports } from "./pages/reports/page";
import { Table } from "./pages/reports/id/page";

function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute></PublicRoute>}>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
          </Route>
          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path="/submit-tracker">
              <Route
                path=""
                element={<SubtmitTracker></SubtmitTracker>}
              ></Route>
              <Route
                path=":id"
                element={<AnswerTracker></AnswerTracker>}
              ></Route>
            </Route>
            <Route path="/manage-tracker">
              <Route path="" element={<ManageTracker></ManageTracker>}></Route>
              <Route path=":id" element={<EditTracker></EditTracker>}></Route>
            </Route>
            <Route path="/reports">
              <Route path="" element={<Reports></Reports>}></Route>
              <Route path=":id" element={<Table></Table>}></Route>
            </Route>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            success: "!bg-green-600 !text-white !border-green-600",
            error: "!bg-red-600 !text-white !border-red-600",
          },
        }}
      />
    </>
  );
}

export default App;
