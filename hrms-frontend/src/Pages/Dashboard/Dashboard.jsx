import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  CalendarCheck,
  Users,
  UserCheck,
  Briefcase,
  UserPlus,
} from "lucide-react";
import Chart from "./Chart";
import LeaveRequestTable from "./LeaveRequestTable";
import DashboardStatsCards from "./Card";
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardStatsCards />
      <Chart />
      <LeaveRequestTable />
    </div>
  );
};

export default Dashboard;
