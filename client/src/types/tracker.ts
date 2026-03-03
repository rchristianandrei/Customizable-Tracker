import type { TextboxComponent } from "./textboxComponent";

export type TrackerType = {
  id: number;
  name: string;
  description: string;
  components: TextboxComponent[];
  createdAt: string;
};
