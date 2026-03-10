import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import type { PaginatedData } from "@/types/paginatedData";
import type { TrackerType } from "@/types/tracker";

import type { QueryParams } from "@/types/params";
import { useTrackers } from "@/hooks/useTrackers";

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
  const location = useLocation();

  const { trackers, loading, queryParams, setParams, loadTrackers } =
    useTrackers();

  useEffect(() => {
    loadTrackers();
  }, [location.search]);

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
