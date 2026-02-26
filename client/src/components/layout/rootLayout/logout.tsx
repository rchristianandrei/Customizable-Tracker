import { useState } from "react";
import { LogOut } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "sonner";

export function Logout({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const onConfirmClick = async () => {
    setLoading(true);

    try {
      await logout();
      toast.success("Logged out");
    } catch (error) {
      toast.error(
        "Unable to logout. Please try clearing your cookies instead.",
      );
    } finally {
      onClose();
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-row gap-2 items-center">
            <LogOut /> <span>Do you want to Logout?</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Make sure to save any unsaved changes.
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
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
