export interface ComponentHandle {
  validate: () => Promise<boolean>;
  getValues: () => { id: string; label: string; value: string };
  reset: () => void;
}
