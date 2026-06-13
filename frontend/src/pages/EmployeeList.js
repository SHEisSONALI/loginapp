import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeList() {

  const [employees,
    setEmployees] =
    useState([]);

  const token =
    localStorage.getItem("token");

 useEffect(() => {
  fetchEmployees();
}, [fetchEmployees]);

 const fetchEmployees = useCallback(async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/employees",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setEmployees(res.data.employees);
  } catch (error) {
    console.log(error);
  }
}, [token]);

console.log(
  "Employees State:",
  employees
);
  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Navbar />

        <div className="page">

          <h1>
            Employees
          </h1>

          <div className="card">

  <table className="employee-table">

    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Designation</th>
        <th>Salary</th>
      </tr>
    </thead>

    <tbody>
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.department_name}</td>
          <td>{employee.designation}</td>
          <td>₹ {employee.salary}</td>
        </tr>
      ))}
    </tbody>

  </table>

</div>


</div>

        </div>

      </div>

    
  );
}

export default EmployeeList;