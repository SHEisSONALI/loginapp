import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>EMS</h2>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/employees">
        Employees
      </Link>

      <Link to="/create-employee">
        Create Employee
      </Link>

      <Link to="/departments">
        Departments
      </Link>

      <Link to="/skills">
        Skills
      </Link>
    </div>
  );
}

export default Sidebar;