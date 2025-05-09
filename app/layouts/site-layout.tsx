import { Outlet } from "react-router";

//Components
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main className="p-4 bg-background">
        <Outlet />
      </main>
      <footer className="p-4">Footer</footer>
    </>
  );
}
