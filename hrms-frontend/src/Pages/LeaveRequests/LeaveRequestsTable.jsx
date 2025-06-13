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
import { useAppStore } from "../../Store/index";
export default function ApproveLeaveRequestsTable() {
  const { leaveRequests } = useAppStore();

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-[var(--foreground)]";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-[var(--foreground)]";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-[var(--foreground)]";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-[var(--foreground)]";
    }
  };

  const handleStatusChange = (id, newStatus) => {};

  // Group leave requests by date
  const groupedRequests = leaveRequests.reduce((acc, request) => {
    (acc[request.date] = acc[request.date] || []).push(request);
    return acc;
  }, {});

  // Sort dates for consistent display, newest first
  const sortedDates = Object.keys(groupedRequests).sort().reverse();

  return (
    // Main container background and border
    <div className="rounded-lg border-[var(--border-color)] bg-[var(--bg-section)] text-[var(--text-body)] shadow-sm p-6">
      <div className="overflow-x-auto">
        {sortedDates.map((date) => (
          <div key={date} className="mb-8">
            {/* Heading for date group */}
            <h4 className="text-lg font-semibold mb-3 bg-[var(--bg-main)] dark:bg-[var(--card)] px-4 py-2 rounded-t-lg border-b border-[var(--border-color)] dark:border-[var(--border)] text-[var(--text-heading)]">
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
                {/* Table Header Row background */}
                <TableRow className="bg-[var(--bg-main)] dark:bg-[var(--popover)]">
                  {/* Table Headings text */}
                  <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                    Employee
                  </TableHead>
                  <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                    Department
                  </TableHead>
                  <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                    Type
                  </TableHead>
                  <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                    Reason
                  </TableHead>
                  <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedRequests[date].map((request) => (
                  <TableRow
                    key={request.id}
                    // Row hover background
                    className="hover:bg-[var(--hover)]/50 dark:hover:bg-[var(--muted)]/50 transition-colors"
                  >
                    {/* Employee Name (primary text) */}
                    <TableCell className="font-medium text-[var(--text-body)] dark:text-[var(--foreground)]">
                      {request.name}
                    </TableCell>
                    {/* Department, Type, Reason (muted text) */}
                    <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                      {request.department}
                    </TableCell>
                    <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                      {request.type}
                    </TableCell>
                    <TableCell className="text-[var(--text-muted)] max-w-xs truncate">
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
                            // Using standard green/red for buttons, but can be customized
                            className="text-green-600 hover:text-green-800 dark:text-[var(--primary)] dark:hover:text-[var(--primary-foreground)]"
                            onClick={() =>
                              handleStatusChange(request.id, "Approved")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 dark:text-[var(--destructive)] dark:hover:text-[var(--destructive)]"
                            onClick={() =>
                              handleStatusChange(request.id, "Rejected")
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[var(--text-muted)] text-sm">
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
