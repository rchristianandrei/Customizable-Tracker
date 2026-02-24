import { authRepo } from "@/api/authRepo";
import type { User } from "@/types/user";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext<
  | {
      user: User | null;
      login: (data: { email: string; password: string }) => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: { email: string; password: string }) => {
    const result = await authRepo.login(data);
    setUser(result);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const hook = useContext(AuthContext);

  if (!hook) throw new Error("useAuth must be used insdie AuthProvider");

  return hook;
};
