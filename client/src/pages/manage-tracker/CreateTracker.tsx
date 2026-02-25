import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CreateTracker = () => {
  const [open, setOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
  });

  const handleCreate = () => {
    if (!newItem.name.trim()) return;

    setNewItem({ name: "", description: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tracker</DialogTitle>
        </DialogHeader>
        <VisuallyHidden>
          <DialogDescription>Create New Tracker</DialogDescription>
        </VisuallyHidden>

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
  );
};
