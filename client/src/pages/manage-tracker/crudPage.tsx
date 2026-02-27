import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import type { Tracker } from "@/types/tracker";

import { CreateTracker } from "./CreateTracker";
import { useManageTracker } from "./ManageTrackerProvider";
import { DeleteTracker } from "./DeleteTracker";
import { SearchBox } from "@/components/inputs/SearchBox";

export const CrudPage = () => {
  const { trackers, loading, setPage } = useManageTracker();

  const [deleteEvent, setDeleteEvent] = useState<{ tracker: Tracker } | null>(
    null,
  );

  return (
    <>
      <div className="h-full flex flex-col gap-4">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <SearchBox
            className="w-full sm:max-w-sm"
            fetchData={(query) => console.log(query)}
          ></SearchBox>
          <CreateTracker></CreateTracker>
        </div>

        {/* Card Grid */}
        <div className="flex-1 overflow-auto relative">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trackers &&
              trackers.data.map((tracker) => (
                <Card key={tracker.id} className="relative">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{tracker.name}</CardTitle>
                        <CardDescription>
                          {new Date(tracker.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </CardDescription>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" tabIndex={-1}>
                            ⋮
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setDeleteEvent(() => ({ tracker }))}
                          >
                            <Trash2 className="text-destructive" />{" "}
                            <span className="text-destructive">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {tracker.description || "No description provided."}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
          {/* Empty State */}
          {!loading && trackers && trackers.data.length === 0 && (
            <div className="text-center text-muted-foreground">
              No results found.
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          )}
        </div>

        {/* Count */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            {trackers && (
              <Badge variant="secondary" className="px-3 py-1">
                {trackers.data.length} result
                {trackers.data.length !== 1 && "s"}
              </Badge>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          {trackers && (
            <>
              <Button
                variant="outline"
                disabled={trackers.page === 1}
                onClick={() => setPage(trackers.page - 1)}
              >
                Prev
              </Button>

              <span className="flex items-center px-4 text-sm">
                Page {trackers.page} of {trackers.totalPages}
              </span>

              <Button
                variant="outline"
                disabled={
                  trackers.page === trackers.totalPages ||
                  trackers.totalPages === 0
                }
                onClick={() => setPage(trackers.page + 1)}
              >
                Next
              </Button>
            </>
          )}
        </div>
      </div>
      <DeleteTracker
        tracker={deleteEvent?.tracker}
        onClose={() => setDeleteEvent(null)}
      ></DeleteTracker>
    </>
  );
};
