import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ApproveLeaveRequestsTable() {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: "Sarah Khan",
      department: "HR",
      date: "2025-06-08",
      type: "Sick Leave",
      reason: "Fever and flu, unable to come to office.",
      status: "Pending",
    },
    {
      id: 2,
      name: "Ali Raza",
      department: "Engineering",
      date: "2025-06-06",
      type: "Casual Leave",
      reason: "Attending a family wedding out of city.",
      status: "Approved",
    },
    {
      id: 3,
      name: "Maria Ahmed",
      department: "Finance",
      date: "2025-06-08", // Same date as Sarah Khan
      type: "Annual Leave",
      reason: "Planned vacation to northern areas.",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Ahmed Malik",
      department: "Marketing",
      date: "2025-06-07",
      type: "Maternity Leave",
      reason: "Expecting child, need rest.",
      status: "Pending",
    },
    {
      id: 5,
      name: "Fatima Zahra",
      department: "Sales",
      date: "2025-06-07", // Same date as Ahmed Malik
      type: "Paternity Leave",
      reason: "To care for newborn and assist wife.",
      status: "Pending",
    },
    {
      id: 6,
      name: "Usman Ali",
      department: "Operations",
      date: "2025-06-06", // Same date as Ali Raza
      type: "Sick Leave",
      reason: "Food poisoning, doctor advised rest.",
      status: "Pending",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  // Group leave requests by date
  const groupedRequests = leaveRequests.reduce((acc, request) => {
    (acc[request.date] = acc[request.date] || []).push(request);
    return acc;
  }, {});

  // Sort dates for consistent display, newest first
  const sortedDates = Object.keys(groupedRequests).sort().reverse();

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="overflow-x-auto">
        {sortedDates.map((date) => (
          <div key={date} className="mb-8">
            <h4 className="text-lg font-semibold mb-3 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-t-lg border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">
              Requests for{" "}
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                    Employee
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                    Department
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                    Type
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                    Reason
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedRequests[date].map((request) => (
                  <TableRow
                    key={request.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                      {request.name}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {request.department}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {request.type}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {request.reason}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {request.status === "Pending" ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                            onClick={() =>
                              handleStatusChange(request.id, "Approved")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            onClick={() =>
                              handleStatusChange(request.id, "Rejected")
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {request.status === "Approved"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
}
