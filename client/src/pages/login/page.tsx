import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { useAuth } from "@/contexts/AuthProvider";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onLogin = async (data: { email: string; password: string }) => {
    await login(data);
    navigate("/");
  };

  return (
    <LoginForm
      onRegister={() => navigate("/register")}
      onLogin={onLogin}
    ></LoginForm>
  );
};
