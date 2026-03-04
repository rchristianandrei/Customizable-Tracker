import z from "zod";

export type TextboxComponentValues = z.infer<
  ReturnType<typeof TextboxComponentSchema>
>;

export const TextboxComponentSchema = () =>
  z.object({
    label: z
      .string()
      .min(1, { message: "field is required" })
      .max(30, { message: "must be at most 30 characters" }),
    placeholder: z
      .string()
      .min(1, { message: "field is required" })
      .max(30, { message: "must be at most 30 characters" }),
    required: z.boolean(),
    maxLength: z
      .number()
      .min(1, { message: "must be at least 1" })
      .max(20, { message: "must be at most 20" }),
  });
