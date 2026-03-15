import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import type { PaginatedData } from "@/types/paginatedData";
import type { TrackerType } from "@/types/tracker";

import type { QueryParams } from "@/types/params";
import { useTrackers } from "@/hooks/useTrackers";

export const TrackersContext = createContext<
  | {
      trackers: PaginatedData<TrackerType> | null;
      loading: boolean;
      queryParams: QueryParams;
      setParams: (params: (prev: QueryParams) => QueryParams) => void;
      createTracker: (data: {
        name: string;
        description: string;
      }) => Promise<void>;
      deleteTracker: (id: string) => Promise<void>;
    }
  | undefined
>(undefined);

export const TrackersProvider = ({
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
    <TrackersContext
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
    </TrackersContext>
  );
};

export const useTrackersContext = () => {
  const hook = useContext(TrackersContext);

  if (!hook)
    throw new Error("useTrackers must be used inside TrackersProvider");

  return hook;
};
