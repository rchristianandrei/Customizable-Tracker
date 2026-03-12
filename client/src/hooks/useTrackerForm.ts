import type { DynamicFormValues } from "@/types/DynamicFormValues";
import type { TrackerType } from "@/types/tracker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import z from "zod";

export const buildTrackerSchema = (tracker: TrackerType) =>
  z.object(
    tracker.components.reduce<Record<string, z.ZodTypeAny>>(
      (shape, component) => {
        let validator: z.ZodTypeAny = z.string().max(component.maxLength, {
          message: `must be at most ${component.maxLength} characters`,
        });
        shape[component.id] = component.required
          ? (validator as z.ZodString).min(1, {
              message: `${component.label} is required`,
            })
          : validator.optional();
        return shape;
      },
      {},
    ),
  );

export const useTrackerForm = (tracker: TrackerType) => {
  const schema = buildTrackerSchema(tracker);
  const form = useForm<DynamicFormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<DynamicFormValues>,
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: tracker.components.reduce<DynamicFormValues>(
      (acc, component) => ({ ...acc, [component.id.toString()]: "" }),
      {},
    ),
  });

  return { form, schema };
};
