import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Import ShadCN Dialog components for confirmation
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// import { toast } from "react-hot-toast"; // Assuming react-hot-toast for notifications, but using console.log for no external dependency

// Dummy payroll data for a specific month (e.g., June 2025)
// In a real application, this would come from a backend for the selected period
const initialPayrollData = [
  {
    id: 1,
    employeeName: "Ahsan Khan",
    department: "Engineering",
    basicSalary: 80000,
    hra: 20000, // House Rent Allowance
    conveyance: 5000, // Conveyance Allowance
    medicalAllowance: 3000,
    pfDeduction: 5000, // Provident Fund
    taxDeduction: 7000, // Income Tax
    loanDeduction: 2000, // Loan installment
    status: "Processed",
    payrollMonth: "2025-06",
  },
  {
    id: 2,
    employeeName: "Sara Ahmed",
    department: "HR",
    basicSalary: 95000,
    hra: 25000,
    conveyance: 6000,
    medicalAllowance: 4000,
    pfDeduction: 6000,
    taxDeduction: 9000,
    loanDeduction: 0,
    status: "Pending",
    payrollMonth: "2025-06",
  },
  {
    id: 3,
    employeeName: "Ali Raza",
    department: "Finance",
    basicSalary: 70000,
    hra: 18000,
    conveyance: 4500,
    medicalAllowance: 2500,
    pfDeduction: 4000,
    taxDeduction: 6000,
    loanDeduction: 1500,
    status: "Processed",
    payrollMonth: "2025-06",
  },
  {
    id: 4,
    employeeName: "Hina Batool",
    department: "Marketing",
    basicSalary: 75000,
    hra: 19000,
    conveyance: 5000,
    medicalAllowance: 3000,
    pfDeduction: 4500,
    taxDeduction: 6500,
    loanDeduction: 0,
    status: "Pending",
    payrollMonth: "2025-06",
  },
  {
    id: 5,
    employeeName: "Usman Ghani",
    department: "Operations",
    basicSalary: 85000,
    hra: 22000,
    conveyance: 5500,
    medicalAllowance: 3500,
    pfDeduction: 5500,
    taxDeduction: 8000,
    loanDeduction: 2500,
    status: "Processed",
    payrollMonth: "2025-06",
  },
  {
    id: 6,
    employeeName: "Fatima Zahra",
    department: "Sales",
    basicSalary: 68000,
    hra: 17000,
    conveyance: 4000,
    medicalAllowance: 2000,
    pfDeduction: 3800,
    taxDeduction: 5500,
    loanDeduction: 0,
    status: "Pending",
    payrollMonth: "2025-06",
  },
  {
    id: 7,
    employeeName: "Zain Ali",
    department: "Engineering",
    basicSalary: 90000,
    hra: 24000,
    conveyance: 5800,
    medicalAllowance: 3800,
    pfDeduction: 5800,
    taxDeduction: 8500,
    loanDeduction: 0,
    status: "Pending",
    payrollMonth: "2025-06", // Added for current month
  },
  {
    id: 8,
    employeeName: "Sana Malik",
    department: "HR",
    basicSalary: 72000,
    hra: 18000,
    conveyance: 4800,
    medicalAllowance: 2800,
    pfDeduction: 4200,
    taxDeduction: 6200,
    loanDeduction: 1000,
    status: "Processed",
    payrollMonth: "2025-05", // Example for previous month
  },
  {
    id: 9,
    employeeName: "Kamran Khan",
    department: "Finance",
    basicSalary: 82000,
    hra: 21000,
    conveyance: 5300,
    medicalAllowance: 3200,
    pfDeduction: 5200,
    taxDeduction: 7500,
    loanDeduction: 0,
    status: "Pending",
    payrollMonth: "2025-05", // Example for previous month
  },
];

const availableDepartments = [
  "All",
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Operations",
  "Sales",
];
const availablePayrollMonths = ["2025-06", "2025-05", "2025-04"]; // Example months

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [selectedPayrollMonth, setSelectedPayrollMonth] = useState("2025-06"); // Default to current month
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // State for confirmation dialog
  const [viewMode, setViewMode] = useState("all"); // New state for radio group filter

  // Helper to calculate gross pay
  const calculateGrossPay = (employee) => {
    return (
      employee.basicSalary +
      employee.hra +
      employee.conveyance +
      employee.medicalAllowance
    );
  };

  // Helper to calculate total deductions
  const calculateTotalDeductions = (employee) => {
    return (
      employee.pfDeduction + employee.taxDeduction + employee.loanDeduction
    );
  };

  // Helper to calculate net pay
  const calculateNetPay = (employee) => {
    return calculateGrossPay(employee) - calculateTotalDeductions(employee);
  };

  // Helper to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
      case "On Hold":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  // Filter and search logic for payroll data
  const filteredPayroll = useMemo(() => {
    return payrollData.filter((record) => {
      // Filter by selected payroll month
      if (record.payrollMonth !== selectedPayrollMonth) {
        return false;
      }

      // Filter by search term (employee name)
      if (
        searchTerm &&
        !record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by department
      if (
        filterDepartment !== "All" &&
        record.department !== filterDepartment
      ) {
        return false;
      }

      // Filter by radio group viewMode
      if (viewMode === "pending" && record.status !== "Pending") {
        return false;
      }
      if (viewMode === "processed" && record.status !== "Processed") {
        return false;
      }

      return true;
    });
  }, [
    payrollData,
    searchTerm,
    filterDepartment,
    selectedPayrollMonth,
    viewMode,
  ]);

  // Function to actually process payroll after confirmation
  const executePayrollProcessing = () => {
    const pendingEmployees = filteredPayroll.filter(
      (emp) => emp.status === "Pending"
    );

    if (pendingEmployees.length === 0) {
      // toast.error("No pending payroll entries for the selected filters.");
      console.error("No pending payroll entries for the selected filters.");
      setIsConfirmDialogOpen(false); // Close dialog
      return;
    }

    setPayrollData((prevData) =>
      prevData.map((emp) =>
        // Only process pending employees for the currently selected month and filters
        emp.payrollMonth === selectedPayrollMonth &&
        emp.status === "Pending" &&
        (filterDepartment === "All" || emp.department === filterDepartment) &&
        (searchTerm === "" ||
          emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()))
          ? { ...emp, status: "Processed" }
          : emp
      )
    );
    // toast.success(`Payroll processed for ${pendingEmployees.length} employees.`);
    console.log(`Payroll processed for ${pendingEmployees.length} employees.`);
    setIsConfirmDialogOpen(false); // Close dialog after processing
    setViewMode("processed"); // Automatically switch to "Processed Records" view after processing
  };

  // Handle "Process All" action (opens confirmation dialog)
  const handleProcessAllClick = () => {
    // Count pending employees based on current filters
    const pendingCount = filteredPayroll.filter(
      (emp) => emp.status === "Pending"
    ).length;
    if (pendingCount === 0) {
      // toast.error("No pending payroll entries for the selected filters to process.");
      console.error(
        "No pending payroll entries for the selected filters to process."
      );
      return;
    }
    setIsConfirmDialogOpen(true); // Open the confirmation dialog
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-gray-100">
        Payroll Management
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center flex-wrap">
        {/* Month Selector */}
        <Select
          value={selectedPayrollMonth}
          onValueChange={setSelectedPayrollMonth}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {availablePayrollMonths.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[240px]"
        />

        {/* Department Filter */}
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            {availableDepartments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Radio Input for Extracting/Viewing Employees */}
        <RadioGroup
          value={viewMode}
          onValueChange={setViewMode}
          className="flex gap-4 p-2 rounded-md bg-gray-50 dark:bg-gray-800 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="view-all" />
            <Label htmlFor="view-all">All Records</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pending" id="view-pending" />
            <Label htmlFor="view-pending">Pending for Processing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="processed" id="view-processed" />
            <Label htmlFor="view-processed">Processed Records</Label>
          </div>
        </RadioGroup>

        {/* Process All Button */}
        <Dialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={handleProcessAllClick}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors"
            >
              Process All
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Payroll Processing</DialogTitle>
              <DialogDescription>
                Are you sure you want to process payroll for the **
                {
                  filteredPayroll.filter((emp) => emp.status === "Pending")
                    .length
                }{" "}
                pending employees** currently displayed for{" "}
                {selectedPayrollMonth}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={executePayrollProcessing}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm text-right">
                Gross Pay
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm text-right">
                Deductions
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm text-right">
                Net Pay
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm text-center">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayroll.length > 0 ? (
              filteredPayroll.map((employee) => (
                <TableRow
                  key={employee.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                    {employee.employeeName}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {employee.department}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400 text-right">
                    ${calculateGrossPay(employee).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400 text-right">
                    ${calculateTotalDeductions(employee).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-bold text-gray-800 dark:text-gray-200 text-right">
                    ${calculateNetPay(employee).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        employee.status
                      )}`}
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-gray-500 dark:text-gray-400"
                >
                  No payroll records found for the selected criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
