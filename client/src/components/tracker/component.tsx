import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Tracker = () => {
  const [onGoing, setOnGoing] = useState(false);

  const onStart = () => {
    setOnGoing(true);
  };

  const onSubmit = () => {
    setOnGoing(false);
  };

  return (
    <div className="h-full max-w-150 border m-auto flex flex-col gap-1 p-1">
      <section className="text-center">
        <h1 className="text-3xl font-bold">Tracker</h1>
        <p>Description</p>
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
      <section className="flex-1 overflow-auto">
        <div>Components</div>
        <div>Components</div>
        <div>Components</div>
        <div>Components</div>
      </section>
      <section>
        <Button type="submit" onClick={onSubmit} className="w-full">
          Submit
        </Button>
      </section>
    </div>
  );
};
