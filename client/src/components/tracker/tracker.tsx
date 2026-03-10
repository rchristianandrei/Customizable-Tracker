import { Button } from "@/components/ui/button";
import type { TrackerType } from "@/types/tracker";
import { useState } from "react";

export const Tracker = ({
  tracker,
  children,
  onStartEvent,
  onSubmitEvent,
}: {
  tracker?: TrackerType;
  children: React.ReactNode;
  onStartEvent?: () => void;
  onSubmitEvent?: () => void;
}) => {
  const [onGoing, setOnGoing] = useState(false);

  const onStart = () => {
    setOnGoing(true);
    onStartEvent?.();
  };

  const onSubmit = () => {
    onSubmitEvent?.();
    setOnGoing(false);
  };

  return (
    <div className="h-full max-w-150 border m-auto flex flex-col gap-1 p-1">
      <section className="text-center">
        <h1 className="text-3xl font-bold">
          {tracker ? tracker.name : "Tracker"}
        </h1>
        <p>{tracker ? tracker.description : "Description"}</p>
      </section>
      <section>
        <Button
          type="button"
          onClick={onStart}
          disabled={onGoing}
          className="w-full"
        >
          {onGoing && <span>00:00:00</span>}
          {!onGoing && <span>Start</span>}
        </Button>
      </section>
      <section className="flex-1 overflow-auto">{children}</section>
      <section>
        <Button
          type="submit"
          onClick={onSubmit}
          className="w-full"
          disabled={!onGoing}
        >
          Submit
        </Button>
      </section>
    </div>
  );
};
