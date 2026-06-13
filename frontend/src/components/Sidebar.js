import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  console.log("USER:", user);

  return (
    <div className="sidebar">
      <h2>EMS</h2>

      <Link
        className={
          location.pathname === "/dashboard"
            ? "active-link"
            : ""
        }
        to="/dashboard"
      >
        Dashboard
      </Link>

      {["admin", "hr"].includes(user?.role) && (
        <Link
          className={
            location.pathname === "/employees"
              ? "active-link"
              : ""
          }
          to="/employees"
        >
          Employees
        </Link>
      )}

      {user?.role === "admin" && (
        <Link
          className={
            location.pathname === "/departments"
              ? "active-link"
              : ""
          }
          to="/departments"
        >
          Departments
        </Link>
      )}

      {["admin", "hr"].includes(user?.role) && (
        <Link
          className={
            location.pathname === "/skills"
              ? "active-link"
              : ""
          }
          to="/skills"
        >
          Skills
        </Link>
      )}

      {[
        "admin",
        "director",
        "hr",
        "manager",
        "employee",
      ].includes(user?.role) && (
        <Link
          className={
            location.pathname === "/leave-request"
              ? "active-link"
              : ""
          }
          to="/leave-request"
        >
          Leave Request
        </Link>
      )}

      {["admin", "hr", "manager"].includes(user?.role) && (
        <Link
          className={
            location.pathname === "/leave-approvals"
              ? "active-link"
              : ""
          }
          to="/leave-approvals"
        >
          Leave Approvals
        </Link>
      )}
    </div>
  );
}

export default Sidebar;