import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import type { PaginatedData } from "@/types/paginatedData";
import type { Tracker } from "@/types/tracker";

import { trackerRepo } from "@/api/trackerRepo";

export const ManageTrackerContext = createContext<
  | {
      trackers: PaginatedData<Tracker> | null;
      loading: boolean;
      setPage: (page: number) => void;
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
      const trackers = await trackerRepo.getMine({
        page: Number(searchParams.get("page")),
        pageSize: Number(searchParams.get("pageSize")),
      });
      setTrackers(trackers);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setPage = (page: number) => {
    if (!trackers) return;

    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    params.set("pageSize", trackers.pageSize.toString());

    navigate({ pathname: location.pathname, search: params.toString() });
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
      value={{ trackers, loading, setPage, createTracker, deleteTracker }}
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
