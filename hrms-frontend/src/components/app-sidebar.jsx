import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Calendar,
  Building2,
  CreditCard,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

// Sidebar link structure
const sidebarLinks = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", icon: Home, label: "Dashboard" },
      { to: "/employees", icon: Users, label: "Employees" },
      { to: "/attendance", icon: Calendar, label: "Attendance" },
      // { to: "/departments", icon: Building2, label: "Departments" },
      { to: "/payroll", icon: CreditCard, label: "Payroll" },
      { to: "/leaves-requests", icon: FileText, label: "Leave Requests" },
    ],
  },
  // {
  //   label: "System",
  //   items: [{ to: "/settings", icon: Settings, label: "Settings" }],
  // },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold text-primary px-4 pt-4">HRMS</h2>
      </SidebarHeader>

      <SidebarContent>
        {sidebarLinks.map((group) => (
          <SidebarGroup key={group.label} label={group.label}>
            {group.items.map(({ to, icon: Icon, label }) => (
              <Link to={to} key={to}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-4 py-2"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
