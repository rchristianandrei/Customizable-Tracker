import { Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { TrackerType } from "@/types/tracker";

type Props = {
  trackers?: TrackerType[];
  loading: boolean;
  openOnNewTab?: boolean;
  renderActions?: (tracker: TrackerType) => React.ReactNode;
};

export const TrackerGrid = ({
  trackers,
  loading,
  openOnNewTab = true,
  renderActions,
}: Props) => {
  return (
    <div className="flex-1 overflow-auto relative">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trackers?.map((tracker) => (
          <Card key={tracker.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{tracker.name}</CardTitle>
                  <CardDescription>
                    {new Date(tracker.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </CardDescription>
                </div>

                {renderActions?.(tracker)}
              </div>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {tracker.description || "No description provided."}
              </p>

              <Link to={`${tracker.id}`} target={openOnNewTab ? "_blank" : ""}>
                <Button type="button">
                  <ArrowRight />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {!loading && trackers && trackers.length === 0 && (
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
  );
};
