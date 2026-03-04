import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TrackerSettings } from "./TrackerSettings";
import { EditTrackerProvider } from "./context/EditTrackerProvider";
import { Preview } from "./Preview";
import { TrackerMenu } from "./TrackerMenu";
import { ComponentSettings } from "./ComponentSettings";

export const EditTracker = () => {
  return (
    <EditTrackerProvider>
      <main className="h-screen overflow-auto">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel
            className="p-2"
            minSize={"20%"}
            defaultSize={"20%"}
            maxSize={"30%"}
          >
            <TrackerSettings className="h-full" />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <Preview></Preview>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            className="p-2"
            minSize={"20%"}
            defaultSize={"20%"}
            maxSize={"30%"}
          >
            <ComponentSettings />
          </ResizablePanel>
        </ResizablePanelGroup>
        <TrackerMenu />
      </main>
    </EditTrackerProvider>
  );
};
