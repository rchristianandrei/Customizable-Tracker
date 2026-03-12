import { Button } from "@/components/ui/button";
import type { TrackerType } from "@/types/tracker";

export const Tracker = ({
  tracker,
  children,
  isActive,
  formatTime,
  onStartEvent,
  onSubmitEvent,
}: {
  tracker?: TrackerType;
  children: React.ReactNode;
  isActive: boolean;
  formatTime: string;
  onStartEvent?: () => void;
  onSubmitEvent?: () => void | Promise<void>;
}) => {
  const onStart = () => {
    onStartEvent?.();
  };

  const onSubmit = async () => {
    await onSubmitEvent?.();
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
          disabled={isActive}
          className="w-full"
        >
          {isActive && <span>{formatTime}</span>}
          {!isActive && <span>Start</span>}
        </Button>
      </section>
      <section className="flex-1 overflow-auto">{children}</section>
      <section>
        <Button
          type="submit"
          onClick={onSubmit}
          className="w-full"
          disabled={!isActive}
        >
          Submit
        </Button>
      </section>
    </div>
  );
};
