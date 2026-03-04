import { componentRepo } from "@/api/componentRepo";
import { trackerRepo } from "@/api/trackerRepo";
import { TrackerSchema } from "@/pages/manage-tracker/id/schemas/trackerSchema";
import type { TrackerType } from "@/types/tracker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import type z from "zod";
import { EditTrackerContext } from "./editTrackerContext";
import type { TextboxComponentValues } from "../schemas/textboxComponentSchema";

const formSchema = TrackerSchema();

export const EditTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const trackerWatchRef = useRef<ReturnType<typeof trackerForm.watch> | null>(
    null,
  );
  const { id } = useParams();
  const selectedComponent = useMemo(() => {
    if (!tracker || !selectedComponentId) return null;
    return tracker.components.find((c) => c.id === selectedComponentId) ?? null;
  }, [tracker, selectedComponentId]);

  const trackerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    const loadTracker = async (id: number) => {
      setLoading(true);

      const tracker = await trackerRepo.getById(id);

      setTracker(() => tracker);

      trackerForm.setValue("name", tracker.name);
      trackerForm.setValue("description", tracker.description);
      trackerForm.setValue(
        "components",
        tracker.components.reduce(
          (acc, c) => {
            acc[c.id] = {
              label: c.label,
              placeholder: c.placeholder,
              required: c.required,
              maxLength: c.maxLength,
            };
            return acc;
          },
          {} as Record<string, TextboxComponentValues>,
        ),
      );

      trackerWatchRef.current = trackerForm.watch((value) => {
        setTracker((t) => {
          if (!t) return t;
          return {
            ...t,
            ...(value.name && { name: value.name }),
            ...(value.description && { description: value.description }),
            components: t.components.map((c) => {
              if (!value.components) return c;
              const comp = value.components[c.id];
              if (!comp) return c;
              return {
                ...c,
                ...(comp.label && { label: comp.label }),
                ...(comp.placeholder && { placeholder: comp.placeholder }),
                ...(comp.required && { required: comp.required }),
                ...(comp.maxLength && { maxLength: comp.maxLength }),
              };
            }),
          };
        });
      });

      setLoading(() => false);
    };
    loadTracker(Number(id));

    return () => {
      trackerWatchRef.current?.unsubscribe();
      trackerWatchRef.current = null;
    };
  }, []);

  const updateTracker = useCallback(async () => {
    if (!tracker || loading || !(await trackerForm.trigger())) {
      toast.error("Error/s in your tracker");
      return;
    }
    try {
      setLoading(true);
      await trackerRepo.update(tracker);
      toast.success("Tracker Updated!");
    } catch (error) {
      toast.error("Unable to update the tracker");
    } finally {
      setLoading(false);
    }
  }, [tracker]);

  const addComponent = useCallback(async () => {
    if (!tracker) return;
    setLoading(true);
    try {
      const component = await componentRepo.create({ trackerId: tracker.id });
      setTracker((t) => {
        if (!t) return t;
        return { ...t, components: [...t.components, component] };
      });
      toast.success("Added a Textbox");
    } catch (error: any) {
      console.log(error);
      toast.error("Unable to add the component");
    } finally {
      setLoading(false);
    }
  }, [tracker]);

  const setSelectedComponent = useCallback((id: number | null) => {
    setSelectedComponentId(id);
  }, []);

  return (
    <EditTrackerContext
      value={{
        tracker,
        selectedComponent,
        loading,
        trackerForm,
        updateTracker,
        addComponent,
        setSelectedComponent,
      }}
    >
      {children}
    </EditTrackerContext>
  );
};
