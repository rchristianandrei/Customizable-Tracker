import type { TextboxComponent } from "./textboxComponent";

export type TrackerType = {
  id: string;
  name: string;
  description: string;
  deploy: boolean;
  components: Map<string, TextboxComponent>;
  createdAt: string;
};
