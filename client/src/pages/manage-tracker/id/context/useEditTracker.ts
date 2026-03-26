import type { TrackerType } from "@/types/tracker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { TrackerSchema } from "../schemas/trackerSchema";
import { TextboxComponentSchema } from "../schemas/textboxComponentSchema";
import { trackerRepo } from "@/api/trackerRepo";
import { toast } from "sonner";
import { componentRepo } from "@/api/componentRepo";
import type { TextboxComponent } from "@/types/textboxComponent";
import type z from "zod";
import type { EditTrackerState } from "./editTrackerStateContext";
import type { EditTrackerAction } from "./editTrackerActionContext";

const formSchema = TrackerSchema();
const textboxSchema = TextboxComponentSchema();

export const useEditTracker = (): {
  state: EditTrackerState;
  action: EditTrackerAction;
} => {
  const [tracker, setTracker] = useState<TrackerType | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState<{ state: boolean; message?: string }>({
    state: true,
    message: "Loading Tracker",
  });
  const [showSettings, setShowSettings] = useState(true);
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
  }, [tracker?.components, selectedComponentId]);

  const mappedComponents = useMemo(() => {
    return new Map<string, TextboxComponent>(
      tracker?.components.map((c) => [c.id, c]) ?? [],
    );
  }, [tracker?.components]);

  const trackerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      deploy: false,
    },
  });

  const textboxForm = useForm<z.infer<typeof textboxSchema>>({
    resolver: zodResolver(textboxSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const loadTracker = async (id: string) => {
      setLoading({ state: true, message: "Loading Tracker" });

      const tracker = await trackerRepo.getById(id);

      setTracker(() => tracker);

      trackerForm.setValue("name", tracker.name);
      trackerForm.setValue("description", tracker.description);
      trackerForm.setValue("deploy", tracker.deploy);

      trackerWatchRef.current = trackerForm.watch((value) => {
        setTracker((t) => {
          if (!t) return t;
          return {
            ...t,
            ...(value.name && { name: value.name.trim() }),
            ...(value.description && { description: value.description.trim() }),
            deploy: value.deploy ?? false,
          };
        });
      });

      setLoading(() => ({
        state: false,
      }));
    };
    loadTracker(id ?? "");

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
  }, [loading.state, tracker, trackerForm]);

  const addComponent = useCallback(async () => {
    if (loading.state || !tracker) return;
    setLoading({ state: true, message: "Adding Component" });
    try {
      const component = await componentRepo.createTextbox();
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
  }, [loading.state, tracker?.id]);

  const deleteComponent = useCallback(
    (id: string) => {
      setTracker((t) => {
        if (!t) return t;
        return {
          ...t,
          components: t.components.filter((c) => c.id !== id),
        };
      });
    },
    [loading.state],
  );

  const toggleSettings = useCallback((show: boolean) => {
    setShowSettings(show);
  }, []);

  const setComponents = useCallback((components: TextboxComponent[]) => {
    setTracker((t) => {
      if (!t) return t;
      return { ...t, components };
    });
  }, []);

  const setSelectedComponent = useCallback(
    (id: string | null) => {
      if (!tracker) return;
      textboxWatchRef.current?.unsubscribe();

      setSelectedComponentId(id);
      const component = tracker.components.find((c) => c.id === id);
      if (!component) return;

      textboxForm.clearErrors();
      textboxForm.setValue("label", component.label);
      textboxForm.setValue("placeholder", component.placeholder);
      textboxForm.setValue("required", component.required);
      textboxForm.setValue("maxLength", component.maxLength);
      textboxForm.setValue("dependsOn", component.dependsOnId ?? "");

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
                required: values.required ?? false,
                ...(values.maxLength && { maxLength: values.maxLength }),
                dependsOnId: values.dependsOn ?? "",
              };
            }),
          };
        });
      });
    },
    [tracker],
  );
  return {
    state: useMemo(
      () => ({
        tracker,
        mappedComponents,
        selectedComponent,
        loading,
        showSettings,
        trackerForm,
        textboxForm,
      }),
      [
        tracker,
        selectedComponent,
        loading,
        showSettings,
        trackerForm,
        textboxForm,
      ],
    ),
    action: useMemo(
      () => ({
        updateTracker,
        addComponent,
        deleteComponent,
        setSelectedComponent,
        setComponents,
        toggleSettings,
      }),
      [
        updateTracker,
        addComponent,
        deleteComponent,
        setSelectedComponent,
        setComponents,
        toggleSettings,
      ],
    ),
  };
};
