import { createContext, useContext, useState } from "react";

export const AuthContext = createContext<
  | {
      email: string | null;
      setEmail: React.Dispatch<React.SetStateAction<string | null>>;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>("email@example.com");
  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const hook = useContext(AuthContext);

  if (!hook) throw new Error("useAuth must be used insdie AuthProvider");

  return hook;
};
