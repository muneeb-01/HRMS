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
  // Helper function for status badge colors
  const getStatusColor = (status) => {
    // Keeping existing hardcoded colors for badges, as no direct variables
    // for specific status badge backgrounds were provided.
    // Updated text color for dark mode for better contrast.
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-600 dark:text-[var(--foreground)]";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500 dark:text-[var(--foreground)]";
      case "Inactive":
        return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-[var(--foreground)]";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-[var(--foreground)]";
    }
  };

  return (
    // Main container background and border
    <div className="rounded-lg border-[var(--border-color)] bg-[var(--bg-section)] text-[var(--text-body)] shadow-sm p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {/* Table Header Row background */}
            <TableRow className="bg-[var(--bg-main)] dark:bg-[var(--popover)]">
              {/* Table Headings text */}
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                ID
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Name
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Department
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Position
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm text-center">
                Status
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Email
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow
                key={emp.id}
                // Row hover background
                className="hover:bg-[var(--hover)]/50 dark:hover:bg-[var(--muted)]/50 transition-colors"
              >
                {/* Employee ID and Name (primary text) */}
                <TableCell className="font-medium text-[var(--text-body)] dark:text-[var(--foreground)]">
                  {emp.id}
                </TableCell>
                <TableCell className="font-medium text-[var(--text-body)] dark:text-[var(--foreground)]">
                  {emp.name}
                </TableCell>
                {/* Department, Position, Email (muted text) */}
                <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                  {emp.department}
                </TableCell>
                <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                  {emp.position}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      emp.status
                    )}`}
                  >
                    {emp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                  {emp.email}
                </TableCell>
                {/* Actions (Pencil Icon) */}
                <TableCell className="flex justify-end space-x-3">
                  <Pencil className="w-4 h-4 text-[var(--accent-color)] hover:text-[var(--accent-color)] dark:text-[var(--primary)] dark:hover:text-[var(--primary-foreground)] cursor-pointer transition-colors" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
