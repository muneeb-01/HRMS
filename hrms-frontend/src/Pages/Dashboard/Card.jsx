import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, User } from "lucide-react"; // Replaced Male/Female with User

// Define the statistics data
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
    title: "Available Male",
    value: "7", // Example value, adjust as needed
    icon: <User className="w-6 h-6 text-primary" />, // Using User icon
  },
  {
    title: "Available Female",
    value: "4", // Example value, adjust as needed
    icon: <User className="w-6 h-6 text-primary" />, // Using User icon
  },
];

export default function DashboardStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="section rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="font-medium text-gray-700 dark:text-gray-300">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
