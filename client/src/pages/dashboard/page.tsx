import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider";

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <>
      <div>Dashboard for {user?.email}</div>
      <Button>Click me</Button>
    </>
  );
};
