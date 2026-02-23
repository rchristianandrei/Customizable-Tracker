import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

export const PrivateRoute = () => {
  const { email } = useAuth();

  if (!email) return <Navigate to="/login" replace />;

  return <Outlet></Outlet>;
};
