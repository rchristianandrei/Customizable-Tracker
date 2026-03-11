import type { DynamicFormValues } from "@/types/DynamicFormValues";
import type { TrackerType } from "@/types/tracker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
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
  const onSubmitResult = useRef(false);
  const [isOngoing, setIsOngoing] = useState(false);

  const form = useForm<DynamicFormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<DynamicFormValues>,
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: tracker.components.reduce<DynamicFormValues>(
      (acc, component) => ({ ...acc, [component.id.toString()]: "" }),
      {},
    ),
  });

  const handleStart = () => {
    setIsOngoing(true);
  };

  const handleSubmit = async (
    onSubmit: (data: z.infer<typeof schema>) => Promise<void>,
  ) => {
    onSubmitResult.current = false;
    await form.handleSubmit(async (data) => {
      await onSubmit(data);
      onSubmitResult.current = true;
      setIsOngoing(false);
    })();
    return onSubmitResult.current;
  };

  return { form, schema, isOngoing, handleStart, handleSubmit };
};
