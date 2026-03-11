import { Tracker } from "@/components/tracker/tracker";
import {
  useEditTrackerAction,
  useEditTrackerState,
} from "./context/useEditTrackerProviders";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Textbox } from "@/components/tracker/components/textbox";
import { cn } from "@/lib/utils";
import { useTrackerForm } from "@/hooks/useTrackerForm";
import type { TrackerType } from "@/types/tracker";
import { usePreventUnload } from "@/hooks/usePreventUnload";

export const Preview = () => {
  const { tracker } = useEditTrackerState();

  if (!tracker) return;

  return <TrackerPreview tracker={tracker} />;
};

const TrackerPreview = ({ tracker }: { tracker: TrackerType }) => {
  const { selectedComponent, showSettings } = useEditTrackerState();
  const { setSelectedComponent, deleteComponent, setComponents } =
    useEditTrackerAction();
  const { form, isOngoing, handleStart, handleSubmit } =
    useTrackerForm(tracker);

  usePreventUnload(isOngoing);

  const onSubmitEvent = async () => {
    return handleSubmit(async () => {
      form.reset();
    });
  };

  return (
    <section className={cn("h-full py-20", showSettings ? "" : "py-10")}>
      <Tracker
        tracker={tracker}
        onStartEvent={handleStart}
        onSubmitEvent={onSubmitEvent}
      >
        {tracker.components && (
          <Sortable
            value={tracker.components}
            onValueChange={setComponents}
            onDragStart={(event) =>
              setSelectedComponent(Number(event.active.id))
            }
            getItemValue={(item) => item.id}
          >
            <SortableContent asChild>
              <div>
                {tracker.components.map((component) => (
                  <SortableItem key={component.id} value={component.id} asChild>
                    <div className="flex items-center">
                      {showSettings && (
                        <SortableItemHandle asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            tabIndex={-1}
                          >
                            <GripVertical className="h-4 w-4" />
                          </Button>
                        </SortableItemHandle>
                      )}
                      <ContextMenu
                        onOpenChange={(open) => {
                          if (!open) return;
                          setSelectedComponent(component.id);
                        }}
                      >
                        <ContextMenuTrigger className="flex-1">
                          <div
                            onClick={() => setSelectedComponent(component.id)}
                          >
                            <Textbox
                              form={form}
                              component={component}
                              selected={
                                showSettings &&
                                selectedComponent?.id === component.id
                              }
                              enable={isOngoing}
                            />
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem
                            onClick={() => deleteComponent(component.id)}
                          >
                            <Trash2 className="text-destructive" />
                            <span className="text-destructive">Delete</span>
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableContent>
          </Sortable>
        )}
      </Tracker>
    </section>
  );
};
