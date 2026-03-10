import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { TrackerType } from "@/types/tracker";

import { CreateTracker } from "./CreateTracker";
import { useManageTracker } from "./ManageTrackerProvider";
import { DeleteTracker } from "./DeleteTracker";
import { SearchBox } from "@/components/inputs/SearchBox";
import { ResultCount } from "@/components/crud/ResultCount";
import { Pagination } from "@/components/crud/Pagination";
import { TrackerGrid } from "@/components/crud/TrackerGrid";

export const CrudPage = () => {
  const { trackers, loading, queryParams, setParams } = useManageTracker();

  const [deleteEvent, setDeleteEvent] = useState<{
    tracker: TrackerType;
  } | null>(null);

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

          <CreateTracker />
        </div>

        <TrackerGrid
          trackers={trackers?.data}
          loading={loading}
          renderActions={(tracker) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  ⋮
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setDeleteEvent({ tracker })}>
                  <Trash2 className="text-destructive" />
                  <span className="text-destructive">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />

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

      <DeleteTracker
        tracker={deleteEvent?.tracker}
        onClose={() => setDeleteEvent(null)}
      />
    </>
  );
};
