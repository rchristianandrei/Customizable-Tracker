import type { User } from "@/types/user";
import { api } from "./axios";

const controller = "auth";

export const authRepo = {
  register: async (body: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    const res = await api.post(`${controller}/register`, body);
    return res.data;
  },
  login: async (body: { email: string; password: string }) => {
    const res = await api.post<User>(`${controller}/login`, body);
    return res.data;
  },
};
