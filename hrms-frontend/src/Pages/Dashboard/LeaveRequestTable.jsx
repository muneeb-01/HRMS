import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeaveRequestTable() {
  const leaveRequests = [
    {
      id: 1,
      name: "Sarah Khan",
      department: "HR",
      date: "2025-06-08",
      type: "Sick Leave",
      status: "Pending",
    },
    {
      id: 2,
      name: "Ali Raza",
      department: "Engineering",
      date: "2025-06-06",
      type: "Casual Leave",
      status: "Approved",
    },
    {
      id: 3,
      name: "Maria Ahmed",
      department: "Finance",
      date: "2025-06-04",
      type: "Annual Leave",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Ahmed Malik",
      department: "Marketing",
      date: "2025-06-03",
      type: "Maternity Leave",
      status: "Approved",
    },
    {
      id: 5,
      name: "Fatima Zahra",
      department: "Sales",
      date: "2025-06-01",
      type: "Paternity Leave",
      status: "Pending",
    },
  ];

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

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-gray-100">
        Recent Leave Requests
      </h3>
      <div className="overflow-x-auto">
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
                Date
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Type
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveRequests.map((request) => (
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
                  {request.date}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {request.type}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
