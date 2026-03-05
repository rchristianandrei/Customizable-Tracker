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
import {
  TextboxComponentSchema,
  type TextboxComponentValues,
} from "../schemas/textboxComponentSchema";

const formSchema = TrackerSchema();
const textboxSchema = TextboxComponentSchema();

export const EditTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState<{ state: boolean; message?: string }>({
    state: true,
    message: "Loading Tracker",
  });
  const trackerWatchRef = useRef<ReturnType<typeof trackerForm.watch> | null>(
    null,
  );
  const textboxWatchRef = useRef<ReturnType<typeof textboxForm.watch> | null>(
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

  const textboxForm = useForm<TextboxComponentValues>({
    resolver: zodResolver(textboxSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const loadTracker = async (id: number) => {
      setLoading({ state: true, message: "Loading Tracker" });

      const tracker = await trackerRepo.getById(id);

      setTracker(() => tracker);

      trackerForm.setValue("name", tracker.name);
      trackerForm.setValue("description", tracker.description);

      trackerWatchRef.current = trackerForm.watch((value) => {
        setTracker((t) => {
          if (!t) return t;
          return {
            ...t,
            ...(value.name && { name: value.name.trim() }),
            ...(value.description && { description: value.description.trim() }),
          };
        });
      });

      setLoading(() => ({
        state: false,
      }));
    };
    loadTracker(Number(id));

    return () => {
      trackerWatchRef.current?.unsubscribe();
      trackerWatchRef.current = null;
      textboxWatchRef.current?.unsubscribe();
      textboxWatchRef.current = null;
    };
  }, []);

  const updateTracker = useCallback(async () => {
    if (loading.state || !tracker) return;
    if (!(await trackerForm.trigger())) {
      toast.error("Error/s in your tracker");
      return;
    }
    try {
      setLoading({ state: true, message: "Saving Tracker" });
      await trackerRepo.update(tracker);
      toast.success("Tracker Updated!");
    } catch (error) {
      toast.error("Unable to update the tracker");
    } finally {
      setLoading({ state: false });
    }
  }, [tracker]);

  const addComponent = useCallback(async () => {
    if (loading.state || !tracker) return;
    setLoading({ state: true, message: "Adding Component" });
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
      setLoading({ state: false });
    }
  }, [tracker]);

  const deleteComponent = useCallback(
    async (id: number) => {
      if (loading.state) return;

      setLoading({ state: true, message: "Deleting Component" });

      try {
        await componentRepo.delete(id);
        setTracker((t) => {
          if (!t) return t;
          return {
            ...t,
            components: t.components.filter((c) => c.id !== id),
          };
        });
        toast.success("Deleted the component");
      } catch (error) {
        toast.error("Unable to delete the component");
      } finally {
        setLoading({ state: false });
      }
    },
    [loading],
  );

  const setSelectedComponent = useCallback(
    (id: number | null) => {
      if (!tracker) return;
      textboxWatchRef.current?.unsubscribe();

      setSelectedComponentId(id);
      const component = tracker.components.find((c) => c.id === id);
      if (!component) return;

      textboxForm.setValue("label", component.label);
      textboxForm.setValue("placeholder", component.placeholder);
      textboxForm.setValue("required", component.required);
      textboxForm.setValue("maxLength", component.maxLength);

      textboxWatchRef.current = textboxForm.watch((values) => {
        setTracker((t) => {
          if (!t) return t;
          return {
            ...t,
            components: t.components.map((c) => {
              if (c.id !== component.id) return c;
              return {
                ...c,
                ...(values.label && { label: values.label.trim() }),
                placeholder: values.placeholder?.trim() ?? "",
                ...(values.required && { required: values.required }),
                ...(values.maxLength && { maxLength: values.maxLength }),
              };
            }),
          };
        });
      });
    },
    [tracker],
  );

  return (
    <EditTrackerContext
      value={{
        tracker,
        selectedComponent,
        loading,
        trackerForm,
        textboxForm,
        updateTracker,
        addComponent,
        deleteComponent,
        setSelectedComponent,
      }}
    >
      {children}
    </EditTrackerContext>
  );
};
