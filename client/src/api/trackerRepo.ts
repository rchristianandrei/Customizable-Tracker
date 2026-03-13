import type { TrackerType } from "@/types/tracker";
import { api } from "./axios";
import type { PaginatedData } from "@/types/paginatedData";
import type { QueryParams } from "@/types/params";

const controller = "tracker";

export const trackerRepo = {
  getMine: async (params: QueryParams) => {
    const res = await api.get<PaginatedData<TrackerType>>(
      `${controller}?query=${params.query}&page=${params.page}&pageSize=${params.pageSize}`,
    );
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get<TrackerType>(`${controller}/${id}`);
    return res.data;
  },
  create: async (body: { name: string; description: string }) => {
    const res = await api.post<TrackerType>(`${controller}`, body);
    return res.data;
  },
  update: async (tracker: TrackerType) => {
    const res = await api.put<TrackerType>(
      `${controller}/${tracker.id}`,
      tracker,
    );
    return res.data;
  },
  delete: async (id: number) => {
    const res = await api.delete(`${controller}/${id}`);
    return res.data;
  },
};
