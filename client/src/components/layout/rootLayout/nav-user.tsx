import { useMemo, useState } from "react";
import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthProvider";
import { Logout } from "./logout";
import { toast } from "sonner";

export function NavUser() {
  const { user, logout } = useAuth();
  const { isMobile } = useSidebar();

  const [open, setOpen] = useState(false);

  const initials = useMemo(() => {
    if (!user) return "??";
    return `${user.firstName[0]}${user.lastName[0]}`;
  }, [user]);

  const onLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
    } catch (error) {
      toast.error(
        "Unable to logout. Please try clearing your cookies instead.",
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      {user && (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {`${user.firstName} ${user.lastName}`}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
      <Logout
        open={open}
        onConfirm={onLogout}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
