import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Employees from "./Pages/Employees/Employees";
import LeaveRequests from "./Pages/LeaveRequests/LeaveRequests";
import Payroll from "./Pages/Payroll";
import { AuthRoute, PrivateRoute } from "./components/AuthRoutes";
import Attendance from "./Pages/Attendance";
import AddEmployee from "./Pages/AddEmployee";
import EmployeeProfile from "./Pages/EmployeeProfile";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

//only for development single employee data
const defaultEmployeeData = {
  // --- General Employee Information ---
  employeeId: "EMP007",
  name: "Aliza Fatima",
  department: "Human Resources",
  position: "HR Specialist",
  status: "Active", // e.g., Active, On Leave, Terminated
  email: "aliza.fatima@example.com",
  joiningDate: "2024-03-01", // YYYY-MM-DD
  workingHours: "9:00 AM - 6:00 PM", // e.g., 9:00 AM - 6:00 PM, Full-time, Part-time

  // --- Personal Information ---
  personalInfo: {
    fatherName: "Mr. Imran Ali",
    dateOfBirth: "1995-08-15", // YYYY-MM-DD
    gender: "Female", // e.g., Male, Female, Other
    nationality: "Pakistani",
    maritalStatus: "Single", // e.g., Married, Single, Divorced, Widowed
    phoneNumber: "+92-321-7654321",
    emergencyContactName: "Sara Ali",
    emergencyContactRelationship: "Sister",
    emergencyPhoneNumber: "+92-300-1122334",
    permanentAddress: "House 45, Gulberg III, Lahore, Pakistan",
    currentAddress: "Apartment 7A, DHA Phase 6, Lahore, Pakistan",
    nationalId: "35201-9876543-2", // National Identity Card (NIC) or equivalent
    bankName: "Meezan Bank",
    bankAccountNumber: "0011223344556677",
    swiftCode: "MEZNPKKASSM", // SWIFT/BIC Code for international transactions
  },

  // --- Employment Details ---
  employmentDetails: {
    isWorkingAbroad: true, // Set to `true` to include visa information
  },

  // --- Visa Information (conditionally rendered if isWorkingAbroad is true) ---
  visaInfo: {
    visaIssueDate: "2024-05-10",
    visaExpiryDate: "2026-05-09",
    visaType: "Skilled Worker Visa", // e.g., Work Permit, Business Visa
    passportNumber: "ABC987654",
    passportIssueDate: "2020-02-20",
    passportExpiryDate: "2030-02-19",
    hostCountryOfWork: "Canada",
    hostCountryAddress:
      "Unit 201, 123 Maple Street, Toronto, ON M1B 2C3, Canada",
    hostCountryLocalPhoneNumber: "+1-416-555-1234",
    hostCountryTaxId: "123456789RT0001", // Canadian SIN or equivalent
    dateOfAssignmentStart: "2024-06-01",
    expectedDateOfAssignmentEnd: "2027-05-31",
  },

  // --- Payroll Information ---
  payroll: {
    basicSalary: "55000", // Numeric string, will be formatted as currency
    hra: "15000", // House Rent Allowance
    conveyance: "4000",
    medicalAllowance: "2500",
    pfDeduction: "3000", // Provident Fund deduction
    taxDeduction: "6000",
    loanDeduction: "1500", // If any
    status: "Processed", // e.g., Processed, Pending, On Hold
    payrollMonth: "2025-06", // YYYY-MM
    extractedFromPayment: true, // Indicates if payroll was successfully processed
  },
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes - No Header/Sidebar */}
        <Route
          path="/signin"
          element={
            <AuthRoute>
              <h1>LOG IN</h1>
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <h1>SIGN UP</h1>
            </AuthRoute>
          }
        />

        {/* Protected Routes - With Header/Sidebar */}
        <Route path="/" element={<Layout />}>
          {/* Redirect / to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="Employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
          <Route
            path="leaves-requests"
            element={
              <PrivateRoute>
                <LeaveRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="attendance"
            element={
              <PrivateRoute>
                <Attendance />
              </PrivateRoute>
            }
          />
          <Route
            path="payroll"
            element={
              <PrivateRoute>
                <Payroll />
              </PrivateRoute>
            }
          />
          <Route
            path="add-employee"
            element={
              <PrivateRoute>
                <AddEmployee />
              </PrivateRoute>
            }
          />

          {/* Fallback 404 route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
        <Route
          path="/single-employee"
          element={<EmployeeProfile employee={defaultEmployeeData} />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
