import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (
    <div className="navbar">

      <h3>
        Employee Management System
      </h3>

      <button
        onClick={logout}
        className="logout-btn"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;