import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DynamicFormValues } from "@/types/DynamicFormValues";
import type { TextboxComponent } from "@/types/textboxComponent";
import { Controller, type UseFormReturn } from "react-hook-form";

export const Textbox = ({
  component,
  form,
  selected = false,
  enable = false,
}: {
  component: TextboxComponent;
  selected?: boolean;
  enable?: boolean;
  form: UseFormReturn<DynamicFormValues, any, DynamicFormValues>;
}) => {
  return (
    <FieldGroup
      className={cn(
        "border rounded border-background p-1",
        selected ? "border-foreground" : "",
      )}
    >
      <Controller
        name={component.id.toString()}
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
};
