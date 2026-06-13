import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function Dashboard() {

  const [user, setUser] =
    useState(null);

  const [stats, setStats] =
    useState({
      employees: 0,
      departments: 0,
      skills: 0,
      images: 0
    });
const token = localStorage.getItem("token");

 useEffect(() => {
  const loadData = async () => {
    await fetchProfile();
    await fetchStats();
  };

  loadData();
}, []);

  const fetchProfile =
    useCallback(async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await axios.get(
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

    }, [token]);

  const fetchStats =
    useCallback(async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await axios.get(
            "http://localhost:5000/api/dashboard/stats",
            {
              headers: {
                Authorization: token
              }
            }
          );

        setStats(res.data);

      } catch (error) {

        console.log(error);

      }

    }, [token]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Navbar />

        <div className="page">

          <h1>
            Welcome, {user.name}
          </h1>

          <div className="cards">

            <StatCard
              title="Employees"
              value={stats.employees}
            />

            <StatCard
              title="Departments"
              value={stats.departments}
            />

            <StatCard
              title="Skills"
              value={stats.skills}
            />

            <StatCard
              title="Images"
              value={stats.images}
            />

          </div>

          <div
            className="card"
            style={{
              marginTop: "20px"
            }}
          >

            <h2>
              User Information
            </h2>

            <br />

            <p>
            Name:{" "}
              {user.name}
            </p>

            <br />

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <br />

            <p>
              <strong>Role:</strong>{" "}
              {user.role}
            </p>

            <br />

            <p>
              <strong>Verified:</strong>{" "}
              {
                user.verified
                  ? "Yes"
                  : "No"
              }
            </p>

            <br />

            <p>
              <strong>
                Last Login:
              </strong>{" "}
              {user.last_login}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;