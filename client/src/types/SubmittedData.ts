export type SubmittedData = {
  id: string;
  components: { id: string; label: string; encodedData: string }[];
  createdAt: Date;
};
