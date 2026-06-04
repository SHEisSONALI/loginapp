import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location =
    useLocation();

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

      <Link
        className={
          location.pathname === "/create-employee"
            ? "active-link"
            : ""
        }
        to="/create-employee"
      >
        Create Employee
      </Link>

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

    </div>
  );
}

export default Sidebar;