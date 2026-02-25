import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { CreateTracker } from "./CreateTracker";
import { useManageTracker } from "./ManageTrackerProvider";

export const CrudPage = () => {
  const { trackers, loading, setPage } = useManageTracker();

  const handleDelete = (id: number) => {
    console.log("Delete", id);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <Input placeholder="Search..." className="w-full sm:max-w-sm" />
        <CreateTracker></CreateTracker>
      </div>

      {/* Card Grid */}
      <div className="flex-1 overflow-auto relative">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trackers &&
            trackers.data.map((item) => (
              <Card key={item.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          ⋮
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description || "No description provided."}
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
  );
};
