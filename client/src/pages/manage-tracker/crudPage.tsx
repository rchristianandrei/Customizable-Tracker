import { useState } from "react";

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

type Item = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

export const CrudPage = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Project Alpha",
      description: "Internal admin dashboard project.",
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "Marketing Site",
      description: "Landing page redesign for Q2 campaign.",
      createdAt: new Date(),
    },
    {
      id: 3,
      name: "Project Alpha",
      description: "Internal admin dashboard project.",
      createdAt: new Date(),
    },
    {
      id: 4,
      name: "Marketing Site",
      description: "Landing page redesign for Q2 campaign.",
      createdAt: new Date(),
    },
    {
      id: 5,
      name: "Project Alpha",
      description: "Internal admin dashboard project.",
      createdAt: new Date(),
    },
    {
      id: 6,
      name: "Project Alpha",
      description: "Internal admin dashboard project.",
      createdAt: new Date(),
    },
    {
      id: 7,
      name: "Project Alpha",
      description: "Internal admin dashboard project.",
      createdAt: new Date(),
    },
  ]);

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <Input placeholder="Search..." className="w-full sm:max-w-sm" />
        <CreateTracker></CreateTracker>
      </div>

      {/* Card Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>Created {"Date"}</CardDescription>
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
        {items.length === 0 && (
          <div className="text-center text-muted-foreground">
            No results found.
          </div>
        )}
      </div>

      {/* Count */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            {items.length} result
            {items.length !== 1 && "s"}
          </Badge>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          //   disabled={page === 1}
          //   onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span className="flex items-center px-4 text-sm">Page 1 of 1</span>

        <Button
          variant="outline"
          //   disabled={page === totalPages || totalPages === 0}
          //   onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
