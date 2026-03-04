import { componentRepo } from "@/api/componentRepo";
import { trackerRepo } from "@/api/trackerRepo";
import { TrackerSchema } from "@/pages/manage-tracker/id/schemas/trackerSchema";
import type { TextboxComponent } from "@/types/textboxComponent";
import type { TrackerType } from "@/types/tracker";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import type z from "zod";
import { EditTrackerContext } from "./editTrackerContext";
import { TextboxComponentSchema } from "../schemas/textboxComponentSchema";

const formSchema = TrackerSchema();
const textboxSchema = TextboxComponentSchema();

type ActionType =
  | {
      type: "updateTracker";
      name?: string;
      description?: string;
    }
  | {
      type: "setTracker";
      tracker: TrackerType | null;
    }
  | {
      type: "addComponent";
      component: TextboxComponent;
    }
  | {
      type: "updateComponent";
      component: {
        id: number;
        label?: string;
        placeholder?: string;
        required?: boolean;
        maxLength?: number;
      };
    };

const reducer = (t: TrackerType | null, action: ActionType) => {
  switch (action.type) {
    case "updateTracker":
      if (!t) return t;
      return {
        ...t,
        ...(action.name !== undefined && { name: action.name }),
        ...(action.description !== undefined && {
          description: action.description,
        }),
      };

    case "setTracker":
      return action.tracker;

    case "addComponent":
      if (!t) return t;
      return { ...t, components: [...t.components, action.component] };

    case "updateComponent":
      if (!t) return t;
      const { component } = action;
      return {
        ...t,
        components: t.components.map((c) => {
          if (c.id !== component.id) return c;
          return {
            ...c,
            ...(component.label !== undefined && { label: component.label }),
            ...(component.placeholder !== undefined && {
              placeholder: component.placeholder,
            }),
            ...(component.required !== undefined && {
              required: component.required,
            }),
            ...(component.maxLength !== undefined && {
              maxLength: component.maxLength,
            }),
          };
        }),
      };
  }
};

export const EditTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tracker, dispatch] = useReducer(reducer, null);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const trackerWatchRef = useRef<ReturnType<typeof trackerForm.watch> | null>(
    null,
  );
  const componentWatchRef = useRef<ReturnType<typeof textboxForm.watch> | null>(
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

  const textboxForm = useForm<
    z.input<typeof textboxSchema>,
    any,
    z.output<typeof textboxSchema>
  >({
    resolver: zodResolver(textboxSchema),
    mode: "onChange",
    defaultValues: {
      label: "",
      placeholder: "",
      required: false,
      maxLength: 20,
    },
  });

  useEffect(() => {
    const loadTracker = async (id: number) => {
      setLoading(true);

      const tracker = await trackerRepo.getById(id);

      dispatch({ type: "setTracker", tracker });

      trackerForm.setValue("name", tracker.name);
      trackerForm.setValue("description", tracker.description);

      trackerWatchRef.current = trackerForm.watch((value) => {
        dispatch({
          type: "updateTracker",
          name: value.name,
          description: value.description,
        });
      });

      setLoading(() => false);
    };
    loadTracker(Number(id));

    return () => {
      trackerWatchRef.current?.unsubscribe();
      trackerWatchRef.current = null;
      componentWatchRef.current?.unsubscribe();
      componentWatchRef.current = null;
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
      dispatch({ type: "addComponent", component });
      toast.success("Added a Textbox");
    } catch (error: any) {
      console.log(error);
      toast.error("Unable to add the component");
    } finally {
      setLoading(false);
    }
  }, [tracker]);

  const setSelectedComponent = useCallback(
    (id: number | null) => {
      setSelectedComponentId(id);
      if (!tracker) return;

      const component = tracker.components.find((c) => c.id === id);
      if (!component) return;

      componentWatchRef.current?.unsubscribe();

      textboxForm.setValue("label", component.label);
      textboxForm.setValue("placeholder", component.placeholder);
      textboxForm.setValue("required", component.required);
      textboxForm.setValue("maxLength", component.maxLength);

      componentWatchRef.current = textboxForm.watch((value) => {
        dispatch({
          type: "updateComponent",
          component: {
            id: component.id,
            ...(value.label !== undefined && { label: value.label }),
            ...(value.placeholder !== undefined && {
              placeholder: value.placeholder,
            }),
            ...(value.required !== undefined && { requried: value.required }),
            ...(value.maxLength !== undefined && {
              maxLength: value.maxLength,
            }),
          },
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
        setSelectedComponent,
      }}
    >
      {children}
    </EditTrackerContext>
  );
};
