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
import { CalendarIcon } from "lucide-react"; // Assuming lucide-react for icons

// Dummy attendance data
const allAttendanceRecords = [
  {
    id: 1,
    employeeName: "Ahsan Khan",
    department: "Engineering",
    date: "2025-06-10",
    clockIn: "09:00 AM",
    clockOut: "05:00 PM",
    status: "Present",
    remarks: "",
  },
  {
    id: 2,
    employeeName: "Sara Ahmed",
    department: "HR",
    date: "2025-06-10",
    clockIn: "09:30 AM",
    clockOut: "05:00 PM",
    status: "Late",
    remarks: "Arrived due to traffic.",
  },
  {
    id: 3,
    employeeName: "Ali Raza",
    department: "Finance",
    date: "2025-06-10",
    clockIn: null,
    clockOut: null,
    status: "Absent",
    remarks: "Sick, no prior notice.",
  },
  {
    id: 4,
    employeeName: "Hina Batool",
    department: "Marketing",
    date: "2025-06-10",
    clockIn: "08:55 AM",
    clockOut: "04:30 PM",
    status: "Early Out",
    remarks: "Left for a doctor's appointment.",
  },
  {
    id: 5,
    employeeName: "Usman Ghani",
    department: "Operations",
    date: "2025-06-10",
    clockIn: "09:00 AM",
    clockOut: "05:00 PM",
    status: "Present",
    remarks: "",
  },
  {
    id: 6,
    employeeName: "Fatima Zahra",
    department: "Sales",
    date: "2025-06-10",
    clockIn: null,
    clockOut: null,
    status: "On Leave",
    remarks: "Annual Leave",
  },
  {
    id: 7,
    employeeName: "Zain Ali",
    department: "Engineering",
    date: "2025-06-11", // Different Date
    clockIn: "09:05 AM",
    clockOut: "05:00 PM",
    status: "Late",
    remarks: "Public transport delay.",
  },
  {
    id: 8,
    employeeName: "Sana Malik",
    department: "HR",
    date: "2025-06-11", // Different Date
    clockIn: "09:00 AM",
    clockOut: "05:00 PM",
    status: "Present",
    remarks: "",
  },
  {
    id: 9,
    employeeName: "Kamran Khan",
    department: "Finance",
    date: "2025-06-11", // Different Date
    clockIn: null,
    clockOut: null,
    status: "Absent",
    remarks: "Uninformed absence.",
  },
];

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-06-10")); // Default to one of the dummy data dates
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Helper to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "On Leave":
        return "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200";
      case "Late":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
      case "Absent":
      case "Early Out": // Both can be considered warnings/negatives
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
      case "Holiday":
        return "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200";
      case "Weekend":
        return "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200";
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

    return allAttendanceRecords.filter((record) => {
      // Filter by selected date
      if (record.date !== formattedSelectedDate) {
        return false;
      }

      // Filter by search term (employee name)
      if (
        searchTerm &&
        !record.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full sm:w-[240px] justify-start text-left font-normal ${
                !selectedDate && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[240px]"
        />

        {/* Status Filter */}
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
            <SelectItem value="Late">Late</SelectItem>
            <SelectItem value="Early Out">Early Out</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
            <SelectItem value="Holiday">Holiday</SelectItem>
            <SelectItem value="Weekend">Weekend</SelectItem>
          </SelectContent>
        </Select>
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
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Clock In
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Clock Out
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Hours
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Status
              </TableHead>
              <TableHead className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                Remarks
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((record) => (
                <TableRow
                  key={record.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                    {record.employeeName}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {record.department}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {record.clockIn || "-"}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {record.clockOut || "-"}
                  </TableCell>
                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">
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
                  <TableCell className="text-gray-600 dark:text-gray-400 max-w-xs truncate">
                    {record.remarks || "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-gray-500 dark:text-gray-400"
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
