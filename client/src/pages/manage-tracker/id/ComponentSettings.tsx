import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useEditTracker } from "./context/useEditTracker";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

export const ComponentSettings = ({ className }: { className?: string }) => {
  const { selectedComponent, textboxForm } = useEditTracker();

  if (!selectedComponent) return null;

  return (
    <form className={cn("flex flex-col gap-1", className)}>
      <h2 className="text-center text-lg font-semibold">Component Settings</h2>
      <div className="flex-1 overflow-auto flex flex-col gap-3 px-1">
        {/* Label */}
        <FieldGroup className="">
          <Controller
            name="label"
            control={textboxForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Label</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Placeholder */}
        <FieldGroup className="">
          <Controller
            name="placeholder"
            control={textboxForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Placeholder</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Required */}
        <FieldGroup className="">
          <Controller
            name="required"
            control={textboxForm.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex gap-5 justify-start"
              >
                <FieldLabel htmlFor={field.name}>Required</FieldLabel>
                <Input
                  id={field.name}
                  type="checkbox"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  className="h-5"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Max Length */}
        <FieldGroup className="">
          <Controller
            name="maxLength"
            control={textboxForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Max Length</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  min={1}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
    </form>
  );
};
