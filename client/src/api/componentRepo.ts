import { api } from "./axios";
import type { TextboxComponent } from "@/types/textboxComponent";

const controller = "component";

export const componentRepo = {
  createTextbox: async () => {
    const res = await api.post<TextboxComponent>(`${controller}/textbox`);
    return res.data;
  },
};
