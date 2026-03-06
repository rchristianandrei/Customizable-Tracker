import { Tracker } from "@/components/tracker/tracker";
import { useEditTracker } from "./context/useEditTracker";
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

export const Preview = () => {
  const {
    tracker,
    selectedComponent,
    setSelectedComponent,
    deleteComponent,
    setComponents,
  } = useEditTracker();

  if (!tracker) return;

  return (
    <section className="h-full py-20">
      <Tracker tracker={tracker}>
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
                      <SortableItemHandle asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <GripVertical className="h-4 w-4" />
                        </Button>
                      </SortableItemHandle>
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
                              component={component}
                              selected={selectedComponent?.id === component.id}
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
