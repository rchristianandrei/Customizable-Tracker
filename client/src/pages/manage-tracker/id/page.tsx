import { Tracker } from "@/components/tracker/component";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const EditTracker = () => {
  return (
    <main className="h-screen overflow-auto">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel className="p-2" minSize={"20%"} maxSize={"30%"}>
          Tracker Settings
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Tracker />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-2" minSize={"20%"} maxSize={"30%"}>
          Component Settings
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};
