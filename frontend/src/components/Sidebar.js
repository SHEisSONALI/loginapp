import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(
  localStorage.getItem("user")
);
console.log("USER:", user);
{user?.role === "Admin" && (
  <Link to="/departments">
    Departments
  </Link>
)}
{["Admin", "HR Manager"].includes(user?.role) && (
  <Link to="/employees">
    Employees
  </Link>
)}
{["Admin","HR Manager","Employee"].includes(user?.role) && (
  <Link to="/leave-request">
    Leave Request
  </Link>
)}

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
    </div>
  );
}

export default Sidebar;