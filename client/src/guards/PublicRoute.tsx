import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

export const PublicRoute = () => {
  const { email } = useAuth();

  if (email) return <Navigate to="/" replace />;

  return <Outlet></Outlet>;
};
