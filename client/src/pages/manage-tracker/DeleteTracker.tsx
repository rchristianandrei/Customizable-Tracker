import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ButtonSpinner } from "@/components/spinners/ButtonSpinner";
import type { Tracker } from "@/types/tracker";
import { useManageTracker } from "./ManageTrackerProvider";

export function DeleteTracker({
  tracker,
  onClose,
}: {
  tracker?: Tracker;
  onClose: () => void;
}) {
  const { deleteTracker } = useManageTracker();

  const [loading, setLoading] = useState(false);

  const onConfirmClick = async () => {
    if (!tracker) return;
    setLoading(true);

    try {
      await deleteTracker(tracker.id);
      toast.success(`Deleted ${tracker.name}`);
    } catch (error) {
      toast.error(`Unable to delete ${tracker.name}`);
    } finally {
      onClose();
      setLoading(false);
    }
  };

  return (
    <>
      {tracker && (
        <AlertDialog open={true}>
          <AlertDialogTrigger asChild></AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to delete {tracker.name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                <span className="font-semibold">{tracker.name}</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={onClose} disabled={loading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={onConfirmClick}
                disabled={loading}
              >
                {loading && <ButtonSpinner />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
