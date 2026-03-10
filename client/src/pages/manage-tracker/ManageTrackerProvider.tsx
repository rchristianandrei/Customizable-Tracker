import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import type { PaginatedData } from "@/types/paginatedData";
import type { TrackerType } from "@/types/tracker";

import type { QueryParams } from "@/types/params";
import { useTrackers } from "@/hooks/useTrackers";

export const ManageTrackerContext = createContext<
  | {
      trackers: PaginatedData<TrackerType> | null;
      loading: boolean;
      queryParams: QueryParams;
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
  const location = useLocation();

  const {
    trackers,
    loading,
    queryParams,
    setParams,
    loadTrackers,
    createTracker,
    deleteTracker,
  } = useTrackers();

  useEffect(() => {
    loadTrackers();
  }, [location.search]);

  return (
    <ManageTrackerContext
      value={{
        trackers,
        loading,
        queryParams,
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
