import { SearchBox } from "@/components/inputs/SearchBox";
import { TrackerGrid } from "@/components/crud/TrackerGrid";
import { ResultCount } from "@/components/crud/ResultCount";
import { Pagination } from "@/components/crud/Pagination";
import { useManageTracker } from "../manage-tracker/ManageTrackerProvider";

export const CrudPage = () => {
  const { trackers, loading, queryParams, setParams } = useManageTracker();

  return (
    <>
      <div className="h-full flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <SearchBox
            className="w-full sm:max-w-sm"
            value={queryParams.query}
            fetchData={(query) =>
              setParams((p) => ({ ...p, query: query ?? "" }))
            }
          />
        </div>

        <TrackerGrid trackers={trackers?.data} loading={loading} />

        {trackers && <ResultCount count={trackers.data.length} />}

        {trackers && (
          <Pagination
            page={trackers.page}
            totalPages={trackers.totalPages}
            onPrev={() => setParams((p) => ({ ...p, page: trackers.page - 1 }))}
            onNext={() => setParams((p) => ({ ...p, page: trackers.page + 1 }))}
          />
        )}
      </div>
    </>
  );
};
