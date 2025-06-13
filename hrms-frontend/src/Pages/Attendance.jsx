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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useAppStore } from "../Store/index";

export default function AttendancePage() {
  const { attendances } = useAppStore();
  const [selectedDate, setSelectedDate] = useState(new Date("2025-06-10")); // Default to one of the dummy data dates
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const avaliableStatus = useMemo(() => {
    const seen = new Set();
    const uniqueStatus = attendances
      .filter((attendance) => {
        if (!seen.has(attendance.status)) {
          seen.add(attendance.status);
          return true;
        }
        return false;
      })
      .map((attendance) => attendance.status);

    return ["All", ...uniqueStatus];
  }, [attendances]);

  // Helper to get status color
  const getStatusColor = (status) => {
    // Keeping existing hardcoded colors for badge backgrounds, as no direct variables
    // for specific status badge backgrounds were provided.
    // Updated text color for dark mode to ensure readability against dark backgrounds.
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-[var(--foreground)]";
      case "On Leave":
        return "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-[var(--foreground)]";
      case "Late":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-[var(--foreground)]";
      case "Absent":
      case "Early Out": // Both can be considered warnings/negatives
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-[var(--foreground)]";
      case "Holiday":
        return "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-[var(--foreground)]";
      case "Weekend":
        return "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-[var(--foreground)]";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-[var(--foreground)]";
    }
  };

  // Helper to calculate total hours worked
  const calculateTotalHours = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return "-";

    try {
      const parseTime = (timeStr) => {
        const [time, period] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0; // Midnight 12 AM is 0 hours
        return hours * 60 + minutes;
      };

      const inMinutes = parseTime(clockIn);
      const outMinutes = parseTime(clockOut);

      let totalMinutes = outMinutes - inMinutes;
      if (totalMinutes < 0) {
        // Handle overnight shifts if necessary, though not strictly in dummy data
        totalMinutes += 24 * 60;
      }

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes}m`;
    } catch (error) {
      console.error("Error calculating total hours:", error);
      return "-";
    }
  };

  // Filter and search logic
  const filteredAttendance = useMemo(() => {
    const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");

    return attendances.filter((record) => {
      // Filter by selected date
      if (record.date !== formattedSelectedDate) {
        return false;
      }

      // Filter by search term (employee name)
      if (
        searchTerm &&
        !record.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by status
      if (filterStatus !== "All" && record.status !== filterStatus) {
        return false;
      }

      return true;
    });
  }, [selectedDate, searchTerm, filterStatus]);

  return (
    // Main container background and border
    <div className="rounded-lg border-[var(--border-color)] bg-[var(--bg-section)] text-[var(--text-body)] shadow-sm p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full sm:w-[240px] justify-start text-left font-normal ${
                !selectedDate &&
                "text-[var(--text-muted)] dark:text-[var(--muted-foreground)]"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-[var(--text-muted)] dark:text-[var(--muted-foreground)]" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                  Pick a date
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[var(--popover)] text-[var(--popover-foreground)]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              // Calendar component uses shadcn-ui defaults, relying on variables like
              // --background, --foreground, --primary, --primary-foreground, --border, --ring
              // defined in your root CSS for its internal styling.
            />
          </PopoverContent>
        </Popover>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[240px] text-[var(--text-body)] dark:text-[var(--foreground)]"
          // Shadcn-ui's Input component uses your --input, --background, --foreground, --ring variables
        />

        {/* Status Filter */}
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px] text-[var(--text-body)] dark:text-[var(--foreground)]">
            <SelectValue
              placeholder="Filter by Status"
              className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]"
            />
          </SelectTrigger>
          <SelectContent className="bg-[var(--popover)] text-[var(--popover-foreground)]">
            {avaliableStatus.map((status, idx) => (
              <SelectItem key={idx} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
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
                Clock In
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Clock Out
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Hours
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Status
              </TableHead>
              <TableHead className="text-[var(--text-heading)] dark:text-[var(--foreground)] font-semibold text-sm">
                Remarks
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((record) => (
                <TableRow
                  key={record.id}
                  // Row hover background
                  className="hover:bg-[var(--hover)]/50 dark:hover:bg-[var(--muted)]/50 transition-colors"
                >
                  {/* Employee Name & Hours (primary text) */}
                  <TableCell className="font-medium text-[var(--text-body)] dark:text-[var(--foreground)]">
                    {record.name}
                  </TableCell>
                  {/* Department, Clock In/Out, Remarks (muted text) */}
                  <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                    {record.department}
                  </TableCell>
                  <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                    {record.clockIn || "-"}
                  </TableCell>
                  <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)]">
                    {record.clockOut || "-"}
                  </TableCell>
                  <TableCell className="font-medium text-[var(--text-body)] dark:text-[var(--foreground)]">
                    {calculateTotalHours(record.clockIn, record.clockOut)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[var(--text-muted)] dark:text-[var(--muted-foreground)] max-w-xs truncate">
                    {record.remarks || "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-[var(--text-muted)] dark:text-[var(--muted-foreground)]"
                >
                  No attendance records found for the selected criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
