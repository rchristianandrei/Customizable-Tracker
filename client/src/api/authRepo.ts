import { api } from "./axios";

const controller = "auth";

export const authRepo = {
  register: (body: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    return api.post(`${controller}/register`, body);
  },
};
