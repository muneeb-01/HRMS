import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export const Layout = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const pageTitle = path
    ? path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Dashboard";

  return (
    <SidebarProvider>
      <AppSidebar /> {/* Pass the close function */}
      <main className="w-full p-6">
        <Header />
        <h2 className="text-2xl font-semibold py-7 px-2">{pageTitle}</h2>
        <div className="px-2">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
