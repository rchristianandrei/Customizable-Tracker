"use client";

import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

type Item = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

const ITEMS_PER_PAGE = 6;

export default function CrudCardsPage() {
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

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
  });

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, page]);

  const handleCreate = () => {
    if (!newItem.name.trim()) return;

    const created: Item = {
      id: Date.now(),
      name: newItem.name,
      description: newItem.description,
      createdAt: new Date(),
    };

    setItems((prev) => [created, ...prev]);
    setNewItem({ name: "", description: "" });
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <Input
          placeholder="Search..."
          className="max-w-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Entity</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                placeholder="Short description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <Button onClick={handleCreate} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Card Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedItems.map((item) => (
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
      </div>

      {/* Empty State */}
      {paginatedItems.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No results found.
        </div>
      )}

      {/* Count */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            {filteredItems.length} result
            {filteredItems.length !== 1 && "s"}
          </Badge>

          {search && (
            <span className="text-sm text-muted-foreground">
              filtered from {items.length}
            </span>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span className="flex items-center px-4 text-sm">
          Page {page} of {totalPages || 1}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
