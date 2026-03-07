import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TrackerSettings } from "./TrackerSettings";
import { Preview } from "./Preview";
import { TrackerMenu } from "./TrackerMenu";
import { ComponentSettings } from "./ComponentSettings";
import { Loading } from "./Loading";
import { useEditTracker } from "./context/useEditTracker";
import { EditTrackerStateContext } from "./context/editTrackerStateContext";
import { EditTrackerActionContext } from "./context/editTrackerActionContext";

export const EditTracker = () => {
  const { state, action } = useEditTracker();

  return (
    <EditTrackerStateContext.Provider value={state}>
      <EditTrackerActionContext.Provider value={action}>
        <main className="h-screen overflow-auto">
          <ResizablePanelGroup orientation="horizontal">
            {state.showSettings && (
              <>
                <ResizablePanel
                  className="p-2"
                  minSize={"20%"}
                  defaultSize={"20%"}
                  maxSize={"30%"}
                >
                  <TrackerSettings className="h-full" />
                </ResizablePanel>
                <ResizableHandle />
              </>
            )}
            <ResizablePanel>
              <Preview></Preview>
            </ResizablePanel>
            {state.showSettings && state.selectedComponent && (
              <>
                <ResizableHandle />
                <ResizablePanel
                  className="p-2"
                  minSize={"20%"}
                  defaultSize={"20%"}
                  maxSize={"30%"}
                >
                  <ComponentSettings />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
          <TrackerMenu />
        </main>
        <Loading />
      </EditTrackerActionContext.Provider>
    </EditTrackerStateContext.Provider>
  );
};
