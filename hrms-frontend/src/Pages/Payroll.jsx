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
// import { toast } from "react-hot-toast"; // Assuming react-hot-toast for notifications, but using console.log for no external dependency

// Dummy payroll data for a specific month (e.g., June 2025)
// Added 'extractedFromPayment' boolean to each employee
const initialPayrollData = [
  {
    id: 1,
    employeeName: "Ahsan Khan",
    department: "Engineering",
    basicSalary: 80000,
    hra: 20000,
    conveyance: 5000,
    medicalAllowance: 3000,
    pfDeduction: 5000,
    taxDeduction: 7000,
    loanDeduction: 2000,
    status: "Processed",
    payrollMonth: "2025-06",
    extractedFromPayment: false, // Processed, so not relevant for extraction
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
    extractedFromPayment: false, // Default: included for payment
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
    extractedFromPayment: false,
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
    extractedFromPayment: false,
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
    extractedFromPayment: false,
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
    extractedFromPayment: false,
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
    payrollMonth: "2025-06",
    extractedFromPayment: false,
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
    payrollMonth: "2025-05",
    extractedFromPayment: false,
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
    payrollMonth: "2025-05",
    extractedFromPayment: false,
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
const availableStatuses = ["All", "Processed", "Pending", "On Hold"];

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [selectedPayrollMonth, setSelectedPayrollMonth] = useState("2025-06");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

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

  // Handler for individual employee extraction checkbox
  const handleExtractFromPayment = (id, isChecked) => {
    setPayrollData((prevData) =>
      prevData.map((emp) =>
        emp.id === id ? { ...emp, extractedFromPayment: isChecked } : emp
      )
    );
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

      // Filter by status
      if (filterStatus !== "All" && record.status !== filterStatus) {
        return false;
      }

      return true;
    });
  }, [
    payrollData,
    searchTerm,
    filterDepartment,
    selectedPayrollMonth,
    filterStatus,
  ]);

  // Determine if all *displayed pending* employees are marked for extraction
  const allDisplayedPendingExtracted = useMemo(() => {
    const pendingAndDisplayed = filteredPayroll.filter(
      (emp) => emp.status === "Pending"
    );
    if (pendingAndDisplayed.length === 0) return false;
    return pendingAndDisplayed.every((emp) => emp.extractedFromPayment);
  }, [filteredPayroll]);

  // Handler for master "Extract All / Include All" checkbox
  const handleToggleAllExtraction = (isChecked) => {
    setPayrollData((prevData) =>
      prevData.map((emp) => {
        // Only modify if currently pending and displayed
        if (
          emp.payrollMonth === selectedPayrollMonth &&
          emp.status === "Pending" &&
          (filterDepartment === "All" || emp.department === filterDepartment) &&
          (searchTerm === "" ||
            emp.employeeName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (filterStatus === "All" || emp.status === filterStatus)
        ) {
          return { ...emp, extractedFromPayment: isChecked };
        }
        return emp;
      })
    );
  };

  // Function to actually process payroll after confirmation
  const executePayrollProcessing = () => {
    // Filter to find employees that are Pending AND NOT extracted from payment
    const employeesToProcess = filteredPayroll.filter(
      (emp) => emp.status === "Pending" && !emp.extractedFromPayment
    );

    if (employeesToProcess.length === 0) {
      console.error("No pending employees selected for processing.");
      setIsConfirmDialogOpen(false); // Close dialog
      return;
    }

    setPayrollData((prevData) =>
      prevData.map((emp) =>
        // Process only if: matches selected month, is Pending, is NOT extracted, and matches other display filters
        emp.payrollMonth === selectedPayrollMonth &&
        emp.status === "Pending" &&
        !emp.extractedFromPayment && // Crucial change: only process if NOT extracted
        (filterDepartment === "All" || emp.department === filterDepartment) &&
        (searchTerm === "" ||
          emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "All" || emp.status === filterStatus)
          ? { ...emp, status: "Processed", extractedFromPayment: false } // Set to processed and unmark for extraction
          : emp
      )
    );
    console.log(
      `Payroll processed for ${employeesToProcess.length} employees.`
    );
    setIsConfirmDialogOpen(false); // Close dialog after processing
  };

  // Handle "Process Included" action (opens confirmation dialog)
  const handleProcessIncludedClick = () => {
    // Count pending employees that are NOT extracted, based on current filters
    const includedPendingCount = filteredPayroll.filter(
      (emp) => emp.status === "Pending" && !emp.extractedFromPayment
    ).length;

    if (includedPendingCount === 0) {
      console.error(
        "No pending employees to process for the selected filters."
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

        {/* Status Filter */}
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            {availableStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Process Included Button */}
        <Dialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={handleProcessIncludedClick}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors"
            >
              Process Included
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Payroll Processing</DialogTitle>
              <DialogDescription>
                You are about to process payroll for **
                {
                  filteredPayroll.filter(
                    (emp) =>
                      emp.status === "Pending" && !emp.extractedFromPayment
                  ).length
                }{" "}
                included pending employees** for {selectedPayrollMonth}.
                <br />
                **Employees marked for 'Extraction from Pay' will be skipped.**
                This action cannot be undone.
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
                ID
              </TableHead>{" "}
              {/* New column for ID */}
              {/* New column for extraction checkbox */}
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm w-[60px] text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                  checked={allDisplayedPendingExtracted}
                  onChange={(e) => handleToggleAllExtraction(e.target.checked)}
                  title="Extract/Include All Pending"
                />
                <span className="sr-only">Toggle All Extraction</span>{" "}
                {/* Accessible label */}
              </TableHead>
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
                  // Highlight if NOT extracted AND pending (i.e., will be included in payment)
                  className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors ${
                    !employee.extractedFromPayment &&
                    employee.status === "Pending"
                      ? "bg-blue-50/50 dark:bg-blue-950/50"
                      : ""
                  }`}
                >
                  <TableCell className="text-gray-600 dark:text-gray-400 font-medium">
                    {employee.id}
                  </TableCell>{" "}
                  {/* Display employee ID */}
                  {/* Individual extraction checkbox */}
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                      checked={employee.extractedFromPayment}
                      onChange={(e) =>
                        handleExtractFromPayment(employee.id, e.target.checked)
                      }
                      // Disable if already processed
                      disabled={employee.status === "Processed"}
                      title={
                        employee.status === "Processed"
                          ? "Already Processed"
                          : employee.extractedFromPayment
                          ? "Excluded from Pay"
                          : "Included in Pay"
                      }
                    />
                  </TableCell>
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
                  colSpan={8}
                  className="h-24 text-center text-gray-500 dark:text-gray-400"
                >
                  {" "}
                  {/* Updated colSpan */}
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
