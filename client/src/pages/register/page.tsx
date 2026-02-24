import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

export const Register = () => {
  const navigate = useNavigate();
  return <RegisterForm onLogin={() => navigate("/login")}></RegisterForm>;
};
