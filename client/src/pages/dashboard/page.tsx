import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider";

export const Dashboard = () => {
  const { email } = useAuth();
  return (
    <>
      <div>Dashboard for {email}</div>
      <Button>Click me</Button>
    </>
  );
};
