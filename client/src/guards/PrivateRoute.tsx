import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

export const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet></Outlet>;
};
