import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import DepartmentMaster from "../pages/DepartmentMaster";
import SkillsMaster from "../pages/SkillsMaster";
import CreateEmployee from "../pages/CreateEmployee";
import EmployeeList from "../pages/EmployeeList";
import LeaveRequest from "../pages/LeaveRequest";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
           path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
            }
            />
          <Route path="/departments" element={<DepartmentMaster />} />
<Route path="/skills" element={<SkillsMaster />} />
<Route path="/create-employee" element={<CreateEmployee />} />
<Route path="/employees" element={<EmployeeList />} />
<Route path="/leave-request" element={<LeaveRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;