import { trackerRepo } from "@/api/trackerRepo";
import type { PaginatedData } from "@/types/paginatedData";
import type { QueryParams } from "@/types/params";
import type { TrackerType } from "@/types/tracker";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useTrackers = ({
  isDeployed = false,
}: {
  isDeployed: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [trackers, setTrackers] = useState<PaginatedData<TrackerType> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const queryParams = useMemo(
    (): QueryParams => ({
      query: searchParams.get("query") ?? "",
      page: Number(searchParams.get("page")),
      pageSize: Number(searchParams.get("pageSize")),
    }),
    [searchParams],
  );

  const loadTrackers = useCallback(async () => {
    setLoading(true);
    try {
      const params = queryParams;
      const trackers = await trackerRepo.getMine(
        {
          ...params,
        },
        isDeployed,
      );
      setTrackers(trackers);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  const setParams = (params: (prev: QueryParams) => QueryParams) => {
    if (!trackers) return;

    const { query, page } = params({
      query: searchParams.get("query") ?? "",
      page: Number(searchParams.get("page")),
    });

    const urlParams = new URLSearchParams(location.search);
    if (query) urlParams.set("query", query.toString());
    else urlParams.delete("query");

    if (page) urlParams.set("page", page.toString());
    else urlParams.delete("page");

    urlParams.set("pageSize", trackers.pageSize.toString());

    navigate({ pathname: location.pathname, search: urlParams.toString() });
  };

  const createTracker = useCallback(
    async (data: { name: string; description: string }) => {
      await trackerRepo.create(data);
      await loadTrackers();
    },
    [],
  );

  const deleteTracker = useCallback(async (id: string) => {
    await trackerRepo.delete(id);
    await loadTrackers();
  }, []);

  return {
    trackers,
    loading,
    queryParams,
    setParams,
    loadTrackers,
    createTracker,
    deleteTracker,
  };
};
