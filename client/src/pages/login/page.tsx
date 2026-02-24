import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  const navigate = useNavigate();

  return <LoginForm onRegister={() => navigate("/register")}></LoginForm>;
};
