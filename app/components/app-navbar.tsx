// Context
import { useAuth } from "@/context/AuthContext";

import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavUser } from "./app-navuser";

// Icons
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Contact,
  BookOpenText,
  Settings,
  LayoutGrid,
  LayoutDashboard,
} from "lucide-react";

// Assets
import logo from "@/assets/logo__full.svg";

const items = {
  application: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ],
  site: [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "About",
      url: "#",
      icon: BookOpenText,
    },
    {
      title: "Solutions",
      url: "#",
      icon: LayoutGrid,
    },
    {
      title: "Contact",
      url: "#",
      icon: Contact,
    },
  ],
};

export function AppNavbar() {
  const { user } = useAuth();
  return (
    <Sidebar>
      <SidebarHeader>
        <img src={logo} alt="logo" className="h-8 w-auto mr-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.application.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:bg-secondary transition-colors"
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon /> {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Site Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.site.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:bg-secondary trans"
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon /> {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
