import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useEditTrackerState } from "./context/useEditTrackerProviders";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export const ComponentSettings = ({ className }: { className?: string }) => {
  const {
    tracker,
    mappedComponents,
    selectedComponent,
    showSettings,
    textboxForm,
  } = useEditTrackerState();

  if (!selectedComponent || !showSettings) return null;

  return (
    <form className={cn("flex flex-col gap-1", className)}>
      <h2 className="text-center text-lg font-semibold">Component Settings</h2>
      <div className="flex-1 overflow-auto flex flex-col gap-3 px-1">
        {/* Label */}
        <FieldGroup>
          <Controller
            name={`label`}
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
        <FieldGroup>
          <Controller
            name={`placeholder`}
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
        <FieldGroup className="flex-row gap-1">
          <Controller
            name={`required`}
            control={textboxForm.control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm leading-none"
                >
                  Required
                </FieldLabel>
                <Checkbox
                  id={field.name}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Depends On */}
        <FieldGroup>
          <Controller
            name="dependsOn"
            control={textboxForm.control}
            render={({ field, fieldState }) => {
              const selectedLabel = mappedComponents.get(field.value)?.label;

              return (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm leading-none"
                  >
                    Depends On
                  </FieldLabel>

                  <Combobox
                    value={field.value}
                    onValueChange={(value) =>
                      field.onChange(value === "None" ? "" : value)
                    }
                  >
                    <ComboboxInput
                      value={selectedLabel ?? ""}
                      placeholder="Select a component"
                      className="px-1"
                      readOnly
                    />

                    <ComboboxContent>
                      <ComboboxList>
                        <ComboboxItem value="None">None</ComboboxItem>

                        {tracker?.components
                          .filter((c) => c.id !== selectedComponent.id)
                          .map((item) => (
                            <ComboboxItem key={item.id} value={item.id}>
                              {item.label}
                            </ComboboxItem>
                          ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>

        {/* Max Length */}
        <FieldGroup>
          <Controller
            name={`maxLength`}
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
