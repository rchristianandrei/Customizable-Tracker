import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/page";
import { Dashboard } from "./pages/dashboard/page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
