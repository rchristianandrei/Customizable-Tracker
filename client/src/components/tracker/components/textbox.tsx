import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ComponentHandle } from "@/types/trackerTypes/component-handle";
import type { TextboxComponent } from "@/types/textboxComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export const Textbox = forwardRef<
  ComponentHandle,
  {
    component: TextboxComponent;
    selected?: boolean;
    enable?: boolean;
  }
>(({ component, selected = false, enable = false }, ref) => {
  const formSchema = useMemo(
    () =>
      z.object({
        value: z
          .string()
          .min(1, {
            message: "field is required",
          })
          .max(
            component.maxLength,
            `must be at most ${component.maxLength} characters`,
          ),
      }),
    [],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
    mode: "onChange",
  });

  useImperativeHandle(ref, () => ({
    getValues: () => form.getValues(),
    validate: () => form.trigger(),
    reset: () => form.reset(),
  }));

  return (
    <FieldGroup
      className={cn(
        "border rounded border-background p-1",
        selected ? "border-foreground" : "",
      )}
    >
      <Controller
        name={"value"}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor={field.name} className="flex justify-between">
              <span>{component.label}</span>
              {component.required && <span className="text-red-300">*</span>}
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={component.placeholder}
              autoComplete="on"
              disabled={!enable}
              maxLength={component.maxLength}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
});
