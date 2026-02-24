import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { authRepo } from "@/api/authRepo";

export const Register = () => {
  const navigate = useNavigate();

  const onRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    return await authRepo.register(data);
  };

  return (
    <RegisterForm
      onLogin={() => navigate("/login")}
      onRegister={onRegister}
    ></RegisterForm>
  );
};
