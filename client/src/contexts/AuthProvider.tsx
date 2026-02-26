import { authRepo } from "@/api/authRepo";
import type { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<
  | {
      user: User | null;
      loading: boolean;
      login: (data: { email: string; password: string }) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onMount = async () => {
      try {
        const user = await authRepo.getMe();
        setUser(user);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    onMount();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const result = await authRepo.login(data);
    setUser(result);
  };

  const logout = async () => {
    await authRepo.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const hook = useContext(AuthContext);

  if (!hook) throw new Error("useAuth must be used insdie AuthProvider");

  return hook;
};
