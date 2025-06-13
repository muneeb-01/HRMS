export const createEmployessSlice = (set, get) => ({
  employees: [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Ahsan Khan",
      department: "Engineering",
      position: "Frontend Developer",
      status: "Active",
      email: "ahsan@example.com",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Sara Ahmed",
      department: "HR",
      position: "HR Manager",
      status: "On Leave",
      email: "sara@example.com",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Ali Raza",
      department: "Finance",
      position: "Accountant",
      status: "Active",
      email: "ali@example.com",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Hina Batool",
      department: "Marketing",
      position: "Marketing Specialist",
      status: "Active",
      email: "hina@example.com",
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "Usman Ghani",
      department: "Operations",
      position: "Operations Lead",
      status: "On Leave",
      email: "usman@example.com",
    },
    {
      id: 6,
      employeeId: "EMP006",
      name: "Fatima Zahra",
      department: "Sales",
      position: "Sales Executive",
      status: "Active",
      email: "fatima@example.com",
    },
    {
      id: 7,
      employeeId: "EMP007",
      name: "Zain Ali",
      department: "Engineering",
      position: "Backend Developer",
      status: "Active",
      email: "zain@example.com",
    },
    {
      id: 8,
      employeeId: "EMP008",
      name: "Sana Malik",
      department: "HR",
      position: "HR Coordinator",
      status: "Active",
      email: "sana@example.com",
    },
    {
      id: 9,
      employeeId: "EMP009",
      name: "Kamran Khan",
      department: "Finance",
      position: "Financial Analyst",
      status: "Active",
      email: "kamran@example.com",
    },
    {
      id: 10,
      employeeId: "EMP010",
      name: "Sarah Khan",
      department: "HR",
      position: "HR Assistant",
      status: "Active",
      email: "sarahk@example.com",
    },
    {
      id: 11,
      employeeId: "EMP011",
      name: "Maria Ahmed",
      department: "Finance",
      position: "Junior Accountant",
      status: "Active",
      email: "maria@example.com",
    },
    {
      id: 12,
      employeeId: "EMP012",
      name: "Ahmed Malik",
      department: "Marketing",
      position: "Digital Marketer",
      status: "Active",
      email: "ahmedm@example.com",
    },
    {
      id: 13,
      employeeId: "EMP013",
      name: "Usman Ali",
      department: "Operations",
      position: "Operations Assistant",
      status: "Active",
      email: "usmana@example.com",
    },
  ],
  attendances: [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Ahsan Khan",
      department: "Engineering",
      date: "2025-06-10",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      status: "Present",
      remarks: "",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Sara Ahmed",
      department: "HR",
      date: "2025-06-10",
      clockIn: "09:30 AM",
      clockOut: "05:00 PM",
      status: "Late",
      remarks: "Arrived due to traffic.",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Ali Raza",
      department: "Finance",
      date: "2025-06-10",
      clockIn: null,
      clockOut: null,
      status: "Absent",
      remarks: "Sick, no prior notice.",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Hina Batool",
      department: "Marketing",
      date: "2025-06-10",
      clockIn: "08:55 AM",
      clockOut: "04:30 PM",
      status: "Early Out",
      remarks: "Left for a doctor's appointment.",
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "Usman Ghani",
      department: "Operations",
      date: "2025-06-10",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      status: "Present",
      remarks: "",
    },
    {
      id: 6,
      employeeId: "EMP006",
      name: "Fatima Zahra",
      department: "Sales",
      date: "2025-06-10",
      clockIn: null,
      clockOut: null,
      status: "On Leave",
      remarks: "Annual Leave",
    },
    {
      id: 7,
      employeeId: "EMP007",
      name: "Zain Ali",
      department: "Engineering",
      date: "2025-06-11",
      clockIn: "09:05 AM",
      clockOut: "05:00 PM",
      status: "Late",
      remarks: "Public transport delay.",
    },
    {
      id: 8,
      employeeId: "EMP008",
      name: "Sana Malik",
      department: "HR",
      date: "2025-06-11",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      status: "Present",
      remarks: "",
    },
    {
      id: 9,
      employeeId: "EMP009",
      name: "Kamran Khan",
      department: "Finance",
      date: "2025-06-11",
      clockIn: null,
      clockOut: null,
      status: "Absent",
      remarks: "Uninformed absence.",
    },
  ],
  payrolls: [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Ahsan Khan",
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
      extractedFromPayment: false,
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Sara Ahmed",
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
      extractedFromPayment: false,
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Ali Raza",
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
      employeeId: "EMP004",
      name: "Hina Batool",
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
      employeeId: "EMP005",
      name: "Usman Ghani",
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
      employeeId: "EMP006",
      name: "Fatima Zahra",
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
      employeeId: "EMP007",
      name: "Zain Ali",
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
      employeeId: "EMP008",
      name: "Sana Malik",
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
      employeeId: "EMP009",
      name: "Kamran Khan",
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
  ],
  leaveRequests: [
    {
      id: 1,
      employeeId: "EMP010",
      name: "Sarah Khan",
      department: "HR",
      date: "2025-06-08",
      type: "Sick Leave",
      reason: "Fever and flu, unable to come to office.",
      status: "Pending",
    },
    {
      id: 2,
      employeeId: "EMP003",
      name: "Ali Raza",
      department: "Finance",
      date: "2025-06-06",
      type: "Casual Leave",
      reason: "Attending a family wedding out of city.",
      status: "Approved",
    },
    {
      id: 3,
      employeeId: "EMP011",
      name: "Maria Ahmed",
      department: "Finance",
      date: "2025-06-08",
      type: "Annual Leave",
      reason: "Planned vacation to northern areas.",
      status: "Rejected",
    },
    {
      id: 4,
      employeeId: "EMP012",
      name: "Ahmed Malik",
      department: "Marketing",
      date: "2025-06-07",
      type: "Maternity Leave",
      reason: "Expecting child, need rest.",
      status: "Pending",
    },
    {
      id: 5,
      employeeId: "EMP006",
      name: "Fatima Zahra",
      department: "Sales",
      date: "2025-06-07",
      type: "Paternity Leave",
      reason: "To care for newborn and assist wife.",
      status: "Pending",
    },
    {
      id: 6,
      employeeId: "EMP013",
      name: "Usman Ali",
      department: "Operations",
      date: "2025-06-06",
      type: "Sick Leave",
      reason: "Food poisoning, doctor advised rest.",
      status: "Pending",
    },
  ],
  loading: {
    employees: false,
    attendances: false,
    payrolls: false,
    leaveRequests: false,
  },
  error: null,
  currentModal: null,
  editingItem: null,

  // --- Employee Actions ---
  fetchEmployees: async () => {
    set((state) => ({
      loading: { ...state.loading, employees: true },
      error: null,
    }));
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      set({
        employees: response.data,
        loading: { ...get().loading, employees: false },
      });
    } catch (err) {
      set({
        error: `Failed to fetch employees: ${err.message}`,
        loading: { ...get().loading, employees: false },
      });
      console.error("Error fetching employees:", err);
    }
  },

  addEmployee: async (newEmployee) => {
    set((state) => ({
      loading: { ...state.loading, employees: true },
      error: null,
    }));
    try {
      const response = await axios.post(
        `${API_BASE_URL}/employees`,
        newEmployee
      );
      set((state) => ({
        employees: [...state.employees, response.data],
        loading: { ...get().loading, employees: false },
        currentModal: null,
      }));
    } catch (err) {
      set({
        error: `Failed to add employee: ${err.message}`,
        loading: { ...get().loading, employees: false },
      });
      console.error("Error adding employee:", err);
    }
  },

  updateEmployee: async (updatedEmployee) => {
    set((state) => ({
      loading: { ...state.loading, employees: true },
      error: null,
    }));
    try {
      await axios.put(
        `${API_BASE_URL}/employees/${updatedEmployee._id}`,
        updatedEmployee
      );
      set((state) => ({
        employees: state.employees.map((emp) =>
          emp._id === updatedEmployee._id ? { ...emp, ...updatedEmployee } : emp
        ),
        loading: { ...get().loading, employees: false },
        currentModal: null,
        editingItem: null,
      }));
    } catch (err) {
      set({
        error: `Failed to update employee: ${err.message}`,
        loading: { ...get().loading, employees: false },
      });
      console.error("Error updating employee:", err);
    }
  },

  deleteEmployee: async (id) => {
    set((state) => ({
      loading: { ...state.loading, employees: true },
      error: null,
    }));
    try {
      await axios.delete(`${API_BASE_URL}/employees/${id}`);
      set((state) => ({
        employees: state.employees.filter((emp) => emp._id !== id),
        loading: { ...get().loading, employees: false },
      }));
    } catch (err) {
      set({
        error: `Failed to delete employee: ${err.message}`,
        loading: { ...get().loading, employees: false },
      });
      console.error("Error deleting employee:", err);
    }
  },

  // --- Attendance Actions ---
  fetchAttendances: async () => {
    set((state) => ({
      loading: { ...state.loading, attendances: true },
      error: null,
    }));
    try {
      const response = await axios.get(`${API_BASE_URL}/attendances`);
      set({
        attendances: response.data,
        loading: { ...get().loading, attendances: false },
      });
    } catch (err) {
      set({
        error: `Failed to fetch attendances: ${err.message}`,
        loading: { ...get().loading, attendances: false },
      });
      console.error("Error fetching attendances:", err);
    }
  },

  // --- Payroll Actions ---
  fetchPayrolls: async () => {
    set((state) => ({
      loading: { ...state.loading, payrolls: true },
      error: null,
    }));
    try {
      const response = await axios.get(`${API_BASE_URL}/payrolls`);
      set({
        payrolls: response.data,
        loading: { ...get().loading, payrolls: false },
      });
    } catch (err) {
      set({
        error: `Failed to fetch payrolls: ${err.message}`,
        loading: { ...get().loading, payrolls: false },
      });
      console.error("Error fetching payrolls:", err);
    }
  },

  // --- Leave Request Actions ---
  fetchLeaveRequests: async () => {
    set((state) => ({
      loading: { ...state.loading, leaveRequests: true },
      error: null,
    }));
    try {
      const response = await axios.get(`${API_BASE_URL}/leave-requests`);
      set({
        leaveRequests: response.data,
        loading: { ...get().loading, leaveRequests: false },
      });
    } catch (err) {
      set({
        error: `Failed to fetch leave requests: ${err.message}`,
        loading: { ...get().loading, leaveRequests: false },
      });
      console.error("Error fetching leave requests:", err);
    }
  },

  // --- Modal Management ---
  openModal: (modalType, item = null) =>
    set({ currentModal: modalType, editingItem: item }),

  closeModal: () => set({ currentModal: null, editingItem: null }),
});
