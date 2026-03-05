import type { TextboxComponent } from "@/types/textboxComponent";
import type { TrackerType } from "@/types/tracker";
import { createContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { TrackerFormValues } from "../schemas/trackerSchema";
import type { TextboxComponentValues } from "../schemas/textboxComponentSchema";

export const EditTrackerContext = createContext<
  | {
      tracker: TrackerType | null;
      selectedComponent: TextboxComponent | null;
      loading: {
        state: boolean;
        message?: string;
      };
      trackerForm: UseFormReturn<TrackerFormValues>;
      textboxForm: UseFormReturn<TextboxComponentValues>;
      updateTracker: () => void;
      addComponent: () => Promise<void>;
      deleteComponent: (id: number) => Promise<void>;
      setSelectedComponent: (id: number | null) => void;
    }
  | undefined
>(undefined);
