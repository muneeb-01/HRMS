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
import { useAppStore } from "../Store/index";

const availablePayrollMonths = ["2025-06", "2025-05", "2025-04"]; // Example months
const availableStatuses = ["All", "Processed", "Pending", "On Hold"];

export default function PayrollPage() {
  const { payrolls } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [selectedPayrollMonth, setSelectedPayrollMonth] = useState("2025-06");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const availablePayrollMonths = useMemo(() => {
    const seen = new Set();
    const uniqueMonths = payrolls
      .filter((payroll) => {
        if (!seen.has(payroll.payrollMonth)) {
          seen.add(payroll.payrollMonth);
          return true;
        }
        return false;
      })
      .map((payroll) => payroll.payrollMonth);

    return ["All", ...uniqueMonths];
  }, [payrolls]);

  const availableStatuses = useMemo(() => {
    const seen = new Set();
    const uniqueStatuses = payrolls
      .filter((payroll) => {
        if (!seen.has(payroll.status)) {
          seen.add(payroll.status);
          return true;
        }
        return false;
      })
      .map((payroll) => payroll.status);

    return ["All", ...uniqueStatuses];
  }, [payrolls]);

  const availableDepartments = useMemo(() => {
    const seen = new Set();
    const uniqueDepartments = payrolls
      .filter((payroll) => {
        if (!seen.has(payroll.department)) {
          seen.add(payroll.department);
          return true;
        }
        return false;
      })
      .map((payroll) => payroll.department);

    return ["All", ...uniqueDepartments];
  }, [payrolls]);

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
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-[var(--foreground)]";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-[var(--foreground)]";
      case "On Hold":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-[var(--foreground)]";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-[var(--foreground)]";
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
    return payrolls.filter((record) => {
      // Filter by selected payroll month
      if (record.payrollMonth !== selectedPayrollMonth) {
        return false;
      }

      // Filter by search term (employee name)
      if (
        searchTerm &&
        !record.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    payrolls,
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
    <div className="rounded-lg border-[var(--border-color)] bg-[var(--bg-section)] text-[var(--text-body)] shadow-sm p-6">
      <h3 className="text-xl font-bold mb-5 text-[var(--text-heading)] dark:text-[var(--foreground)]">
        Payroll Management
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center flex-wrap">
        {/* Month Selector */}
        <Select
          value={selectedPayrollMonth}
          onValueChange={setSelectedPayrollMonth}
        >
          <SelectTrigger className="w-full sm:w-[180px] text-[var(--text-body)] dark:text-[var(--foreground)]">
            <SelectValue
              placeholder="Select Month"
              className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]"
            />
          </SelectTrigger>
          <SelectContent className="bg-[var(--popover)] text-[var(--popover-foreground)]">
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
          className="w-full sm:w-[240px] text-[var(--text-body)] dark:text-[var(--foreground)]"
        />

        {/* Department Filter */}
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full sm:w-[180px] text-[var(--text-body)] dark:text-[var(--foreground)]">
            <SelectValue
              placeholder="Filter by Department"
              className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]"
            />
          </SelectTrigger>
          <SelectContent className="bg-[var(--popover)] text-[var(--popover-foreground)]">
            {availableDepartments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px] text-[var(--text-body)] dark:text-[var(--foreground)]">
            <SelectValue
              placeholder="Filter by Status"
              className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]"
            />
          </SelectTrigger>
          <SelectContent className="bg-[var(--popover)] text-[var(--popover-foreground)]">
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
              className="w-full sm:w-auto bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 dark:bg-[var(--primary)] dark:hover:bg-[var(--primary)]/90 text-white dark:text-[var(--primary-foreground)] transition-colors"
            >
              Process Included
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]">
            <DialogHeader>
              <DialogTitle className="text-[var(--text-heading)] dark:text-[var(--foreground)]">
                Confirm Payroll Processing
              </DialogTitle>
              <DialogDescription className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
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
            <TableRow className="bg-[var(--bg-main)] dark:bg-[var(--popover)]">
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                ID
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm w-[60px] text-center">
                <input
                  type="checkbox"
                  // Kept original class for checkbox styling, as no direct variable for it
                  // Consider adding a custom CSS variable for form elements if you want to theme this.
                  className="form-checkbox h-4 w-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                  checked={allDisplayedPendingExtracted}
                  onChange={(e) => handleToggleAllExtraction(e.target.checked)}
                  title="Toggle All Extraction"
                />
                <span className="sr-only">Toggle All Extraction</span>
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Employee
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Department
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm text-right">
                Gross Pay
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm text-right">
                Deductions
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm text-right">
                Net Pay
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm text-center">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayroll.length > 0 ? (
              filteredPayroll.map((employee) => (
                <TableRow
                  key={employee.id}
                  className={`hover:bg-[var(--hover)]/50 dark:hover:bg-[var(--muted)]/50 transition-colors ${
                    !employee.extractedFromPayment &&
                    employee.status === "Pending"
                      ? "bg-[var(--accent-color)]/[0.05] dark:bg-[var(--primary)]/[0.05]" // Subtle highlight for included pending
                      : ""
                  }`}
                >
                  <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)] font-medium">
                    {employee.id}
                  </TableCell>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      // Kept original class for checkbox styling
                      className="form-checkbox h-4 w-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                      checked={employee.extractedFromPayment}
                      onChange={(e) =>
                        handleExtractFromPayment(employee.id, e.target.checked)
                      }
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
                  <TableCell className="font-medium text-[var(--text-body)] dark:text-[var(--foreground)]">
                    {employee.name}
                  </TableCell>
                  <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                    {employee.department}
                  </TableCell>
                  <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)] text-right">
                    ${calculateGrossPay(employee).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)] text-right">
                    ${calculateTotalDeductions(employee).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-bold text-[var(--text-body)] dark:text-[var(--foreground)] text-right">
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
                  className="h-24 text-center text-[var(--text-muted)] dark:text-[var(--muted-foreground)]"
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
