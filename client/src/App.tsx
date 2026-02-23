import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/page";
import { Dashboard } from "./pages/dashboard/page";
import { Register } from "./pages/register/page";
import { AuthProvider } from "@/contexts/AuthProvider";
import { PrivateRoute } from "@/guards/PrivateRoute";
import { PublicRoute } from "@/guards/PublicRoute";

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
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
