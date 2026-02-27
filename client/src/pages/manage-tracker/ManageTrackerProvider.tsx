import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import type { PaginatedData } from "@/types/paginatedData";
import type { Tracker } from "@/types/tracker";

import { trackerRepo } from "@/api/trackerRepo";
import type { QueryParams } from "@/types/params";

export const ManageTrackerContext = createContext<
  | {
      trackers: PaginatedData<Tracker> | null;
      loading: boolean;
      getParams: QueryParams;
      setParams: (params: (prev: QueryParams) => QueryParams) => void;
      createTracker: (data: {
        name: string;
        description: string;
      }) => Promise<void>;
      deleteTracker: (id: number) => Promise<void>;
    }
  | undefined
>(undefined);

export const ManageTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [trackers, setTrackers] = useState<PaginatedData<Tracker> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrackers();
  }, [location.search]);

  const loadTrackers = async () => {
    setLoading(true);
    try {
      const params = getParams;
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

  const getParams = useMemo(
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

  const createTracker = async (data: { name: string; description: string }) => {
    await trackerRepo.create(data);
    await loadTrackers();
  };

  const deleteTracker = async (id: number) => {
    await trackerRepo.delete(id);
    await loadTrackers();
  };

  return (
    <ManageTrackerContext
      value={{
        trackers,
        loading,
        getParams,
        setParams,
        createTracker,
        deleteTracker,
      }}
    >
      {children}
    </ManageTrackerContext>
  );
};

export const useManageTracker = () => {
  const hook = useContext(ManageTrackerContext);

  if (!hook)
    throw new Error(
      "useManageTracker must be used insdie ManageTrackerProvider",
    );

  return hook;
};
