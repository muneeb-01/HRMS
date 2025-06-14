import { useSidebar } from "@/components/ui/sidebar";
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
  ChevronDown, // Import ChevronDown for the collapse icon
  ChevronUp, // Import ChevronUp for the expand icon
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState for managing collapse state

// Sidebar link structure
const sidebarLinks = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", icon: Home, label: "Dashboard" },
      {
        label: "Employees", // This will be the collapsable section
        icon: Users,
        collapsable: true,
        items: [
          { to: "/employees", icon: Users, label: "All Employees" }, // Renamed for clarity
          { to: "/attendance", icon: Calendar, label: "Attendance" },
          { to: "/payroll", icon: CreditCard, label: "Payroll" },
          { to: "/leaves-requests", icon: FileText, label: "Leave Requests" },
          { to: "/add-employee", icon: Users, label: "Add Employee" },
          { to: "/single-employee", icon: Users, label: "Employee Profile" },
        ],
      },
      // { to: "/departments", icon: Building2, label: "Departments" }, // Keep commented or remove as needed
    ],
  },
  // {
  //   label: "System",
  //   items: [{ to: "/settings", icon: Settings, label: "Settings" }],
  // },
];

export function AppSidebar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  // State to manage which collapsable group is open
  const [openCollapsable, setOpenCollapsable] = useState({});

  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const toggleCollapsable = (label) => {
    setOpenCollapsable((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <Sidebar className="min-h-screen rounded-l-4xl overflow-hidden p-2">
      <SidebarHeader>
        <h2 className="text-[var(--sidebar-foreground)] text-lg font-bold px-4 pt-4">
          HRMS
        </h2>
      </SidebarHeader>

      <SidebarContent>
        {sidebarLinks.map((group) => (
          <SidebarGroup key={group.label} label={group.label}>
            {group.items.map((item) =>
              item.collapsable ? (
                <div key={item.label}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-4 py-2"
                    onClick={() => toggleCollapsable(item.label)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    {openCollapsable[item.label] ? (
                      <ChevronUp className="ml-auto w-4 h-4" />
                    ) : (
                      <ChevronDown className="ml-auto w-4 h-4" />
                    )}
                  </Button>
                  {openCollapsable[item.label] && (
                    <div className="ml-6 border-l border-gray-200 dark:border-gray-700">
                      {" "}
                      {/* Indentation for sub-items */}
                      {item.items.map(({ to, icon: Icon, label }) => (
                        <Link to={to} key={to} onClick={handleItemClick}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 px-4 py-2"
                          >
                            <Icon className="w-4 h-4" />
                            {label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link to={item.to} key={item.to} onClick={handleItemClick}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-4 py-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 px-4 py-2 text-[#fff] hover:bg-red-100 dark:hover:bg-red-900"
          // You might also want to close sidebar on logout, if it navigates away
        >
          <LogOut className="w-4 h-4 text-[#FFAC53]" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
