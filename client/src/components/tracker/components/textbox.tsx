import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { TextboxComponent } from "@/types/textboxComponent";

export const Textbox = ({
  component,
  selected = false,
  enable = false,
}: {
  component: TextboxComponent;
  selected?: boolean;
  enable?: boolean;
}) => {
  const id = component.id.toString();
  return (
    <FieldGroup
      className={cn(
        "border rounded border-background p-1",
        selected ? "border-foreground" : "",
      )}
    >
      <Field className="gap-1">
        <FieldLabel htmlFor={id} className="flex justify-between">
          <span>{component.label}</span>
          {component.required && <span className="text-red-300">*</span>}
        </FieldLabel>
        <Input
          id={id}
          placeholder={component.placeholder}
          autoComplete="on"
          disabled={!enable}
        />
      </Field>
    </FieldGroup>
  );
};
