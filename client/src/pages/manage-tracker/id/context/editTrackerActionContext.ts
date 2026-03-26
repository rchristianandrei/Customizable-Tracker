import { createContext } from "react";
import type { TextboxComponent } from "@/types/textboxComponent";

export type EditTrackerAction = {
  toggleSettings: (show: boolean) => void;
  updateTracker: () => void;
  addComponent: () => Promise<void>;
  deleteComponent: (id: string) => void;
  setSelectedComponent: (id: string | null) => void;
  setComponents: (components: TextboxComponent[]) => void;
};

export const EditTrackerActionContext = createContext<
  EditTrackerAction | undefined
>(undefined);
