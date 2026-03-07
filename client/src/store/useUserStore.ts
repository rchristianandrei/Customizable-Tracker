import { authRepo } from "@/api/authRepo";
import type { User } from "@/types/user";
import { create } from "zustand";

type UserState = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    try {
      const user = await authRepo.getMe();
      set(() => ({ user }));
    } catch (error) {
    } finally {
      set(() => ({ loading: false }));
    }
  },
  login: async (data: { email: string; password: string }) => {
    const result = await authRepo.login(data);
    set(() => ({ user: result }));
  },
  logout: async () => {
    await authRepo.logout();
    set(() => ({ user: null }));
  },
}));
