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

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
      </Routes>
    </Router>
  );
};

export default App;
