import { Outlet } from "react-router";

//Components
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col bg-background min-h-svh pt-[var(--header-height-sm)] md:pt-[var(--header-height-md)] transition-padding duration-300">
        <Outlet />
      </main>
    </>
  );
}
