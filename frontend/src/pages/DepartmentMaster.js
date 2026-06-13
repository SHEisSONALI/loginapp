import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DepartmentMaster() {

  const [departmentName,
    setDepartmentName] =
    useState("");

  const [departments,
    setDepartments] =
    useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {
  fetchDepartments();
}, [fetchDepartments]);

 useEffect(() => {
  const loadData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/departments",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  loadData();
}, [token]);

  const fetchDepartments =
    useCallback(async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/departments",
            {
              headers: {
                Authorization: token
              }
            }
          );

        setDepartments(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    }, [token]);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "http://localhost:5000/api/departments",
          {
            department_name:
              departmentName
          },
          {
            headers: {
              Authorization:
                token
            }
          }
        );

        setDepartmentName("");

        fetchDepartments();

      } catch (error) {

        alert(
          error.response?.data?.message
        );

      }
    };

  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Navbar />

        <div className="page">

          <h1>
            Department Master
          </h1>

          <form
            className="form-container"
            onSubmit={handleSubmit}
          >

            <div className="form-group">

              <label>
                Department Name
              </label>

              <input
                value={
                  departmentName
                }
                onChange={(e) =>
                  setDepartmentName(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              className="submit-btn"
            >
              Add Department
            </button>

          </form>

          <div
            className="card"
            style={{
              marginTop: 20
            }}
          >

            <h2>
              Departments
            </h2>

            <br />

           <div className="skill-grid">

  {departments.map(department => (

    <div
      key={department.id}
      className="skill-card"
    >
      {department.department_name}
    </div>

  ))}

</div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DepartmentMaster;