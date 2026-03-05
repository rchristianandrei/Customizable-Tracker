import { Tracker } from "@/components/tracker/tracker";
import { Textbox } from "@/components/tracker/components/textbox";
import { useEditTracker } from "./context/useEditTracker";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash2 } from "lucide-react";

export const Preview = () => {
  const { tracker, selectedComponent, setSelectedComponent, deleteComponent } =
    useEditTracker();

  if (tracker)
    return (
      <section className="h-full py-20">
        <Tracker tracker={tracker}>
          {tracker &&
            tracker.components.map((c) => (
              <ContextMenu
                key={c.id}
                onOpenChange={(open) => {
                  if (!open) return;
                  setSelectedComponent(c.id);
                }}
              >
                <ContextMenuTrigger>
                  <div onClick={() => setSelectedComponent(c.id)}>
                    <Textbox
                      component={c}
                      selected={selectedComponent?.id === c.id}
                    />
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => deleteComponent(c.id)}>
                    <Trash2 className="text-destructive" />
                    <span className="text-destructive">Delete</span>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
        </Tracker>
      </section>
    );
};
