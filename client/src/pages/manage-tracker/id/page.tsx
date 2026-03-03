import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TrackerSettings } from "./TrackerSettings";
import { EditTrackerProvider } from "./EditTrackerProvider";
import { Preview } from "./Preview";
import { TrackerMenu } from "./TrackerMenu";

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
            Component Settings
          </ResizablePanel>
        </ResizablePanelGroup>
        <TrackerMenu />
      </main>
    </EditTrackerProvider>
  );
};
