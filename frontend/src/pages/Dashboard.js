import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setUser(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-card">
      <h1>Welcome {user.name}</h1>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Verified:</strong>{" "}
            {user.verified ? "Yes" : "No"}
      </p>
      <p>
        <strong>Last Login:</strong>{" "}
        {user.last_login}
      </p>

            <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;