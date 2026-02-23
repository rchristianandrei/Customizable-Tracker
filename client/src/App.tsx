import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/page";
import { Dashboard } from "./pages/dashboard/page";
import { Register } from "./pages/register/page";
import { AuthProvider } from "@/contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
