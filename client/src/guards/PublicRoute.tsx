import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

export const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading</div>;

  if (user) return <Navigate to="/" replace />;

  return <Outlet></Outlet>;
};
