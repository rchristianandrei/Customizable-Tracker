import type { Tracker } from "@/types/tracker";
import { api } from "./axios";
import type { PaginatedData } from "@/types/paginatedData";
import type { QueryParams } from "@/types/params";

const controller = "tracker";

export const trackerRepo = {
  getMine: async (params: QueryParams) => {
    const res = await api.get<PaginatedData<Tracker>>(
      `${controller}?query=${params.query}&page=${params.page}&pageSize=${params.pageSize}`,
    );
    return res.data;
  },
  create: async (body: { name: string; description: string }) => {
    const res = await api.post<Tracker>(`${controller}`, body);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await api.delete(`${controller}/${id}`);
    return res.data;
  },
};
