import { Tracker } from "@/components/tracker/tracker";
import { Textbox } from "@/components/tracker/components/textbox";
import { useEditTracker } from "./context/useEditTracker";

export const Preview = () => {
  const { tracker, selectedComponent, setSelectedComponent } = useEditTracker();

  if (tracker)
    return (
      <section className="h-full py-20">
        <Tracker tracker={tracker}>
          {tracker &&
            tracker.components.map((c) => (
              <div key={c.id} onClick={() => setSelectedComponent(c.id)}>
                <Textbox
                  component={c}
                  selected={selectedComponent?.id === c.id}
                />
              </div>
            ))}
        </Tracker>
      </section>
    );
};
