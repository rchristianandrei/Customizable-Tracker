import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useManageTracker } from "./ManageTrackerProvider";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "field is required",
    })
    .max(30, {
      message: "must be at most 30 characters",
    }),
  description: z
    .string()
    .min(1, {
      message: "field is required",
    })
    .max(30, {
      message: "must be at most 30 characters",
    }),
});

export const CreateTracker = () => {
  const { createTracker } = useManageTracker();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      await createTracker(data);
      form.reset();
      toast.success("Created New Tracker");
      setOpen(() => false);
    } catch (error: any) {
      setError(() => error.response?.data ?? "Failed to create");
      toast.error("Failed to create");
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (loading) return;
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tracker</DialogTitle>
        </DialogHeader>
        <VisuallyHidden>
          <DialogDescription>Create New Tracker</DialogDescription>
        </VisuallyHidden>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FieldGroup>
            <Controller
              name="name"
              disabled={loading}
              control={form.control}
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
              control={form.control}
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

          {/* Error */}
          {error && (
            <FieldGroup className="text-center text-sm text-destructive">
              {error}
            </FieldGroup>
          )}

          {/* Buttons */}
          <FieldGroup>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};
