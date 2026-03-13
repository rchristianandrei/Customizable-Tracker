import type { TrackerType } from "@/types/tracker";
import { api } from "./axios";
import type { PaginatedData } from "@/types/paginatedData";
import type { SubmittedData } from "@/types/SubmittedData";

const controller = "submittedTracker";

export const submittedRepo = {
  submit: async (data: {
    trackerId: string;
    trackerName: string;
    components: { id: string; label: string; encodedData: string }[];
  }) => {
    const res = await api.post(`${controller}`, data);
    return res.data;
  },
  getByTrackerIdAndDateRange: async (query: {
    trackerId: string;
    from?: Date;
    to?: Date;
  }) => {
    const res = await api.get<SubmittedData[]>(
      `${controller}/${query.trackerId}`,
    );
    // const res = await api.get<PaginatedData<TrackerType>>(
    //   `${controller}/${query.trackerId}?from=${query.from}&to=${query.to}`,
    // );
    return res.data;
  },
};
