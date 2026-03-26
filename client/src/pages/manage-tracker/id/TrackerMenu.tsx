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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TrackerMenu = () => {
  const { showSettings } = useEditTrackerState();
  const { updateTracker, addComponent, toggleSettings } =
    useEditTrackerAction();

  return (
    <TooltipProvider>
      <section className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1 border bg-background rounded flex flex-row gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" onClick={updateTracker}>
              <Save />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save Tracker</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => toggleSettings(!showSettings)}
            >
              {showSettings && <Eye />}
              {!showSettings && <EyeClosed />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Edit Visibility</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <Popover>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Plus />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>

            <PopoverContent className="flex flex-col gap-1 w-40">
              <Button type="button" variant="outline" onClick={addComponent}>
                Textbox
              </Button>
              <Button type="button" variant="outline">
                Dropdownbox
              </Button>
            </PopoverContent>
          </Popover>

          <TooltipContent>
            <p>Add Component</p>
          </TooltipContent>
        </Tooltip>
      </section>
    </TooltipProvider>
  );
};
