import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { AppNavbar } from "@/components/app-navbar";
import { useEffect, useRef } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SidebarProvider>
        <AppNavbar />
        <div className="flex flex-col w-full h-svh">
          <header className="p-4 h-16">
            <SidebarTrigger />
          </header>

          <main className="bg-background p-4 w-full h-full">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
