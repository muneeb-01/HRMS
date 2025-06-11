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

const stats = [
  {
    title: "Total Employees",
    value: "128",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    title: "Active Employees",
    value: "113",
    icon: <UserCheck className="w-6 h-6 text-primary" />,
  },
  {
    title: "New Hiring (Last Month)",
    value: "5",
    icon: <UserPlus className="w-6 h-6 text-primary" />,
  },
  {
    title: "Open Positions",
    value: "3",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="section">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Chart />
      {/* <LeaveRequestTable /> */}
    </div>
  );
};

export default Dashboard;
