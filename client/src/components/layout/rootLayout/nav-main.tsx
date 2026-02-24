import { LayoutDashboard, Send, ListPlus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Submit Tracker",
    url: "/submit-tracker",
    icon: Send,
  },
  {
    title: "Manage Tracker",
    url: "/manage-tracker",
    icon: ListPlus,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {navMain.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link to={item.url}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
