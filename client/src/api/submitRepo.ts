import type { TrackerType } from "@/types/tracker";
import { api } from "./axios";
import type { PaginatedData } from "@/types/paginatedData";

const controller = "submittedTracker";

export const submittedRepo = {
  submit: async (data: {
    trackerId: string;
    trackerName: string;
    components: { label: string; encodedData: string }[];
  }) => {
    const res = await api.post(`${controller}`, data);
    return res.data;
  },
  getByTrackerIdAndDateRange: async (query: {
    trackerId: string;
    from: Date;
    to: Date;
  }) => {
    const res = await api.get<PaginatedData<TrackerType>>(
      `${controller}/${query.trackerId}?from=${query.from}&to=${query.to}`,
    );
    return res.data;
  },
};
