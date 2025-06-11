import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react"; // Assuming lucide-react for icons

// Dummy employee data
const employees = [
  {
    id: 1,
    name: "Ahsan Khan",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
    email: "ahsan@example.com",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    department: "HR",
    position: "HR Manager",
    status: "On Leave",
    email: "sara@example.com",
  },
  {
    id: 3,
    name: "Ali Raza",
    department: "Finance",
    position: "Accountant",
    status: "Inactive",
    email: "ali@example.com",
  },
  {
    id: 4,
    name: "Hina Batool",
    department: "Marketing",
    position: "Marketing Specialist",
    status: "Active",
    email: "hina@example.com",
  },
  {
    id: 5,
    name: "Usman Ghani",
    department: "Operations",
    position: "Operations Lead",
    status: "On Leave",
    email: "usman@example.com",
  },
];

export default function EmployeesTable() {
  // Helper function for status badge colors, consistent with LeaveRequestTable
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
      case "Inactive":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                ID
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Name
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Department
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Position
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Status
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Email
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow
                key={emp.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                  {emp.id}
                </TableCell>
                <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                  {emp.name}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {emp.department}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {emp.position}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      emp.status
                    )}`}
                  >
                    {emp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {emp.email}
                </TableCell>
                <TableCell className="flex justify-end space-x-3">
                  <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
