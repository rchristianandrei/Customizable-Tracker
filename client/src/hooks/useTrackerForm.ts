import type { ComponentHandle } from "@/types/trackerTypes/component-handle";
import { useCallback, useRef } from "react";

export const useTrackerForm = () => {
  const compRefs = useRef<Map<string, ComponentHandle>>(new Map());

  const register = useCallback(
    (key: string) => (handle: ComponentHandle | null) => {
      if (handle) {
        compRefs.current.set(key, handle);
      } else {
        compRefs.current.delete(key);
      }
    },
    [],
  );

  const isFormValid = useCallback(async () => {
    const refs = Array.from(compRefs.current.values());
    const results = await Promise.all(refs.map((r) => r.validate()));
    return results.every(Boolean);
  }, [compRefs.current]);

  const getFormValues = useCallback(() => {
    return Object.fromEntries(
      Array.from(compRefs.current.entries()).map(([key, r]) => [
        key,
        r.getValues(),
      ]),
    );
  }, []);

  const resetForm = useCallback(() => {
    Array.from(compRefs.current.entries()).forEach((kvp) => kvp[1].reset());
  }, []);

  return {
    compRefs,
    register,
    isFormValid,
    getFormValues,
    resetForm,
  };
};
