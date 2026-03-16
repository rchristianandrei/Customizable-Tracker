export interface ComponentHandle {
  validate: () => Promise<boolean>;
  getValues: () => { value: string };
  reset: () => void;
}
