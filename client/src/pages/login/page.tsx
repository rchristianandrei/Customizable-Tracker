import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { useUserStore } from "@/store/useUserStore";

export const Login = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

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
