import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { useShallow } from "zustand/shallow";

export const PublicRoute = () => {
  const { user, loading } = useUserStore(
    useShallow((state) => ({ user: state.user, loading: state.loading })),
  );

  if (loading) return <div>Loading</div>;

  if (user) return <Navigate to="/" replace />;

  return <Outlet></Outlet>;
};
