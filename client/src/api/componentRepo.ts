import { api } from "./axios";
import type { TextboxComponent } from "@/types/textboxComponent";

const controller = "textbox";

export const componentRepo = {
  create: async (body: { trackerId: number }) => {
    const res = await api.post<TextboxComponent>(`${controller}`, body);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await api.delete<TextboxComponent>(`${controller}/${id}`);
    return res.data;
  },
};
