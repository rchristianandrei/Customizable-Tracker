import { Save, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonSpinner } from "@/components/spinners/ButtonSpinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEditTracker } from "./context/useEditTracker";

export const TrackerMenu = () => {
  const { loading, updateTracker, addComponent } = useEditTracker();

  return (
    <section className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1 border bg-background rounded flex flex-row gap-1">
      <Button type="button" onClick={updateTracker} disabled={loading}>
        {loading && <ButtonSpinner />}
        {!loading && <Save />}
      </Button>
      <Button type="button" variant="outline" disabled={loading}>
        <Eye />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" disabled={loading}>
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
