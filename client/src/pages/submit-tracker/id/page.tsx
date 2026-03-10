import { trackerRepo } from "@/api/trackerRepo";
import { Tracker } from "@/components/tracker/tracker";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TrackerType } from "@/types/tracker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";

type DynamicFormValues = Record<string, string | undefined>;

export const AnswerTracker = () => {
  const { id } = useParams();
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTracker = async (id: number) => {
      setLoading(true);
      const tracker = await trackerRepo.getById(id);
      setTracker(tracker);
      setLoading(false);
    };
    loadTracker(Number(id));
  }, []);

  if (loading) return <Loader2 />;
  if (!tracker) return <>No Tracker Found</>;

  return <AnswerTrackerForm tracker={tracker} />;
};

const AnswerTrackerForm = ({ tracker }: { tracker: TrackerType }) => {
  const [isOngoing, setIsOngoing] = useState(false);
  const onSubmitResult = useRef(false);

  const schema = z.object(
    tracker.components.reduce<Record<string, z.ZodTypeAny>>(
      (shape, component) => {
        let validator: z.ZodTypeAny = z.string().max(component.maxLength, {
          message: `must be at most ${component.maxLength} characters`,
        });

        if (component.required) {
          validator = (validator as z.ZodString).min(1, {
            message: `${component.label} is required`,
          });
        } else {
          validator = validator.optional();
        }

        shape[component.id] = validator;
        return shape;
      },
      {},
    ),
  );

  const form = useForm<DynamicFormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<DynamicFormValues>,
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: tracker.components.reduce<DynamicFormValues>(
      (acc, component) => ({ ...acc, [component.id.toString()]: "" }),
      {},
    ),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    onSubmitResult.current = true;
    form.reset();
  };

  return (
    <section className="h-screen">
      <Tracker
        tracker={tracker}
        onStartEvent={() => setIsOngoing(true)}
        onSubmitEvent={async () => {
          const isValid = await form.trigger();
          if (!isValid) return false;
          setIsOngoing(false);
          await form.handleSubmit(onSubmit)();
          return onSubmitResult.current;
        }}
      >
        <form>
          {tracker.components.map((component) => (
            <div key={component.id}>
              <FieldGroup>
                <Controller
                  name={component.id.toString()}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor={field.name}>
                        {component.label}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="you@example.com"
                        autoComplete="on"
                        disabled={!isOngoing}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
          ))}
        </form>
      </Tracker>
    </section>
  );
};
