import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import type { PaginatedData } from "@/types/paginatedData";
import type { TrackerType } from "@/types/tracker";

import { trackerRepo } from "@/api/trackerRepo";
import type { QueryParams } from "@/types/params";

export const SubmitTrackerContext = createContext<
  | {
      trackers: PaginatedData<TrackerType> | null;
      loading: boolean;
      queryParams: QueryParams;
      setParams: (params: (prev: QueryParams) => QueryParams) => void;
    }
  | undefined
>(undefined);

export const SubmitTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [trackers, setTrackers] = useState<PaginatedData<TrackerType> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrackers();
  }, [location.search]);

  const loadTrackers = async () => {
    setLoading(true);
    try {
      const params = queryParams;
      const trackers = await trackerRepo.getMine({
        ...params,
      });
      setTrackers(trackers);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const queryParams = useMemo(
    (): QueryParams => ({
      query: searchParams.get("query") ?? "",
      page: Number(searchParams.get("page")),
      pageSize: Number(searchParams.get("pageSize")),
    }),
    [searchParams],
  );

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

  return (
    <SubmitTrackerContext
      value={{
        trackers,
        loading,
        queryParams,
        setParams,
      }}
    >
      {children}
    </SubmitTrackerContext>
  );
};

export const useSubmitTracker = () => {
  const hook = useContext(SubmitTrackerContext);

  if (!hook)
    throw new Error(
      "useSubmitTracker must be used insdie SubmitTrackerProvider",
    );

  return hook;
};
