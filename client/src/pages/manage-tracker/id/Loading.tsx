import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEditTracker } from "./context/useEditTracker";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Loader2 } from "lucide-react";

export const Loading = () => {
  const { loading } = useEditTracker();

  return (
    <Dialog open={loading.state}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="[&>button]:hidden h-100">
        <DialogHeader className="h-full justify-center items-center">
          <DialogTitle className="flex flex-col items-center gap-3">
            <p>{loading.message}</p>
            <Loader2 className="h-10 animate-spin" />
          </DialogTitle>
        </DialogHeader>
        <VisuallyHidden>
          <DialogDescription>Saving Tracker</DialogDescription>
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  );
};
