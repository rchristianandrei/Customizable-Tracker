import { Save, Eye, EyeClosed, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useEditTrackerAction,
  useEditTrackerState,
} from "./context/useEditTrackerProviders";

export const TrackerMenu = () => {
  const { showSettings } = useEditTrackerState();
  const { updateTracker, addComponent, toggleSettings } =
    useEditTrackerAction();

  return (
    <section className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1 border bg-background rounded flex flex-row gap-1">
      <Button type="button" onClick={updateTracker}>
        <Save />
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => toggleSettings(!showSettings)}
      >
        {showSettings && <Eye />}
        {!showSettings && <EyeClosed />}
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-1 w-40">
          <Button type="button" variant="outline" onClick={addComponent}>
            Textbox
          </Button>
          <Button type="button" variant="outline">
            Dropdownbox
          </Button>
        </PopoverContent>
      </Popover>
    </section>
  );
};
