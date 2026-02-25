import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "@/pages/login/page";
import { Register } from "@/pages/register/page";
import { ManageTracker } from "@/pages/manage-tracker/page";
import { Dashboard } from "@/pages/dashboard/page";

import { AuthProvider } from "@/contexts/AuthProvider";

import { PrivateRoute } from "@/guards/PrivateRoute";
import { PublicRoute } from "@/guards/PublicRoute";

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute></PublicRoute>}>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
          </Route>
          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route
              path="/manage-tracker"
              element={<ManageTracker></ManageTracker>}
            ></Route>
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
    </AuthProvider>
  );
}

export default App;
