import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { useEditTrackerState } from "./context/useEditTrackerProviders";

export const TrackerSettings = ({ className }: { className?: string }) => {
  const { trackerForm, showSettings } = useEditTrackerState();

  if (!showSettings) return;

  return (
    <form className={cn("flex flex-col gap-1", className)}>
      <h2 className="text-center text-lg font-semibold">Tracker Settings</h2>
      <div className="flex-1 overflow-auto flex flex-col gap-1 px-1">
        {/* Name */}
        <FieldGroup>
          <Controller
            name="name"
            control={trackerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        {/* Description */}
        <FieldGroup>
          <Controller
            name="description"
            control={trackerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
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
