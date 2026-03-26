export type TextboxComponent = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  dependsOnId?: string;
  maxLength: number;
};
