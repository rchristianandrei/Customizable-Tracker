import z from "zod";

export type TrackerFormValues = z.infer<ReturnType<typeof TrackerSchema>>;

export const TrackerSchema = () =>
  z.object({
    name: z
      .string()
      .min(1, {
        message: "field is required",
      })
      .max(30, {
        message: "must be at most 30 characters",
      }),
    description: z
      .string()
      .min(1, {
        message: "field is required",
      })
      .max(30, {
        message: "must be at most 30 characters",
      }),
    deploy: z.boolean(),
  });
