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
import { useState } from "react";
import { ButtonSpinner } from "@/components/spinners/ButtonSpinner";

export function DeleteTracker({
  open,
  item,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  item: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const onConfirmClick = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete {item}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-semibold">{item}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={loading}>
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
  );
}
