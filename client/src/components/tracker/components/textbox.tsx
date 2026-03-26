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
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export const Textbox = forwardRef<
  ComponentHandle,
  {
    component: TextboxComponent;
    selected?: boolean;
    enable?: boolean;
    dependsOn?: ComponentHandle;
  }
>(({ component, dependsOn, selected = false, enable = false }, ref) => {
  const formSchema = useMemo(
    () =>
      z.object({
        value: z
          .string()
          .min(component.required ? 1 : 0, {
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
    getValues: () => ({
      id: component.id,
      label: component.label,
      ...form.getValues(),
    }),
    validate: async () => {
      if (dependsOn) {
        if (!(await dependsOn.validate())) return false;
      }
      return await form.trigger();
    },
    reset: () => form.reset(),
  }));

  const [isCompEnabled, setIsCompEnabled] = useState(enable);

  useEffect(() => {
    const checkValidation = async () => {
      if (!enable) {
        setIsCompEnabled(false);
        return;
      }

      if (dependsOn) {
        setIsCompEnabled(await dependsOn.validate());
        return;
      }

      setIsCompEnabled(true);
    };
    checkValidation();
  }, [enable, dependsOn]);

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
              disabled={!isCompEnabled}
              maxLength={component.maxLength}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
});
