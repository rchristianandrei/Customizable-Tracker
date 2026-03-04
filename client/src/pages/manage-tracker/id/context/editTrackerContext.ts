import type { TextboxComponent } from "@/types/textboxComponent";
import type { TrackerType } from "@/types/tracker";
import { createContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { TrackerFormValues } from "../schemas/trackerSchema";

export const EditTrackerContext = createContext<
  | {
      tracker: TrackerType | null;
      selectedComponent: TextboxComponent | null;
      loading: boolean;
      trackerForm: UseFormReturn<TrackerFormValues>;
      updateTracker: () => void;
      addComponent: () => Promise<void>;
      setSelectedComponent: (id: number | null) => void;
    }
  | undefined
>(undefined);
