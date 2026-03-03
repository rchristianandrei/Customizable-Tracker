import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { useEditTracker } from "./EditTrackerProvider";

export const TrackerSettings = ({ className }: { className?: string }) => {
  const { loading, trackerForm } = useEditTracker();

  const onSubmit = () => {};

  return (
    <form
      className={cn("flex flex-col gap-1", className)}
      onSubmit={trackerForm.handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-lg font-semibold">Tracker Settings</h2>
      <div className="flex-1 overflow-auto flex flex-col gap-1">
        {/* Name */}
        <FieldGroup>
          <Controller
            name="name"
            disabled={loading}
            control={trackerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  maxLength={30}
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
            disabled={loading}
            control={trackerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  maxLength={30}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      {/* Buttons */}
      <FieldGroup>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Save
        </Button>
      </FieldGroup>
    </form>
  );
};
