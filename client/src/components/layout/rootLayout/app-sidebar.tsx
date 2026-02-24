import * as React from "react";
import { NavMain } from "@/components/layout/rootLayout/nav-main";
import { NavUser } from "@/components/layout/rootLayout/nav-user";
import { SideBarLogo } from "@/components/layout/rootLayout/SideBarLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SideBarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
