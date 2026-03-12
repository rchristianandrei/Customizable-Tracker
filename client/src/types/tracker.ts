import type { TextboxComponent } from "./textboxComponent";

export type TrackerType = {
  id: string;
  name: string;
  description: string;
  components: TextboxComponent[];
  createdAt: string;
};
