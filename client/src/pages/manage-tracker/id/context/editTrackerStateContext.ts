import type { TextboxComponent } from "@/types/textboxComponent";
import type { TrackerType } from "@/types/tracker";
import { createContext } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { TrackerFormValues } from "../schemas/trackerSchema";
import type { TextboxComponentValues } from "../schemas/textboxComponentSchema";

export type EditTrackerState = {
  tracker: TrackerType | null;
  selectedComponent: TextboxComponent | null;
  loading: {
    state: boolean;
    message?: string;
  };
  showSettings: boolean;
  trackerForm: UseFormReturn<TrackerFormValues>;
  textboxForm: UseFormReturn<TextboxComponentValues>;
};

export const EditTrackerStateContext = createContext<
  EditTrackerState | undefined
>(undefined);
