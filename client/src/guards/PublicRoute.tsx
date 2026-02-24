import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

export const PublicRoute = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return <Outlet></Outlet>;
};
