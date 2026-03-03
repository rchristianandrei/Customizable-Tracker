import { trackerRepo } from "@/api/trackerRepo";
import { TrackerSchema } from "@/components/zod/tracker";
import type { TrackerType } from "@/types/tracker";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { useParams } from "react-router-dom";
import type z from "zod";

export const EditTrackerContext = createContext<
  | {
      tracker: TrackerType | null;
      loading: boolean;
      trackerForm: UseFormReturn<
        {
          name: string;
          description: string;
        },
        any,
        {
          name: string;
          description: string;
        }
      >;
      updateTracker: () => void;
    }
  | undefined
>(undefined);

const formSchema = TrackerSchema();

type ActionType =
  | {
      type: "updateTracker";
      name?: string;
      description?: string;
    }
  | {
      type: "setTracker";
      tracker: TrackerType | null;
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
  }
};

export const EditTrackerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tracker, dispatch] = useReducer(reducer, null);
  const [loading, setLoading] = useState(true);
  const trackerWatchRef = useRef<ReturnType<typeof trackerForm.watch> | null>(
    null,
  );

  const { id } = useParams();

  const trackerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
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
    };
  }, []);

  const updateTracker = useCallback(async () => {
    if (!tracker || Object.keys(trackerForm.formState.errors).length > 0)
      return;
    await trackerRepo.update(tracker);
  }, [tracker]);

  return (
    <EditTrackerContext
      value={{
        tracker,
        loading,
        trackerForm,
        updateTracker,
      }}
    >
      {children}
    </EditTrackerContext>
  );
};

export const useEditTracker = () => {
  const hook = useContext(EditTrackerContext);

  if (!hook)
    throw new Error("useEditTracker must be used inside EditTrackerProvider");

  return hook;
};
