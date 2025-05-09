// Context
import { useAuth } from "@/context/AuthContext";

//Components
import { SiteNav } from "@/components/site-nav";
import { AppNavbar } from "./app-navbar";

export function SiteHeader() {
  const { user, isAuthenticated } = useAuth();

  return <SiteNav />;
}
