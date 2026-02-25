import type { Tracker } from "@/types/tracker";
import { api } from "./axios";
import type { PaginatedData } from "@/types/paginatedData";

const controller = "tracker";

export const trackerRepo = {
  getMine: async (query: { page?: number; pageSize?: number }) => {
    const res = await api.get<PaginatedData<Tracker>>(
      `${controller}?page=${query.page}&pageSize=${query.pageSize}`,
    );
    return res.data;
  },
  create: async (body: { name: string; description: string }) => {
    const res = await api.post<Tracker>(`${controller}`, body);
    return res.data;
  },
};
