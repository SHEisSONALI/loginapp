import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function CreateEmployee() {

  const [departments,
    setDepartments] =
    useState([]);

  const [skills,
    setSkills] =
    useState([]);

  const [images,
    setImages] =
    useState([]);

  const [form,
    setForm] =
    useState({
      department_id: "",
      phone: "",
      address: "",
      designation: "",
      salary: ""
    });

  const [selectedSkills,
    setSelectedSkills] =
    useState([]);

  const token =
    localStorage.getItem("token");
  console.log("TOKEN:", token);
  
useEffect(() => {
  const loadData = async () => {
    await fetchDepartments();
    await fetchSkills();
  };

  loadData();
}, []);

  const fetchDepartments =
    async () => {

      const res =
        await axios.get(
          "http://localhost:5000/api/departments",
          {
            headers: {
              Authorization:
                token
            }
          }
        );

      setDepartments(
        res.data
      );
    };

  const fetchSkills =
    async () => {

      const res =
        await axios.get(
          "http://localhost:5000/api/skills",
          {
            headers: {
              Authorization:
                token
            }
          }
        );

      setSkills(
        res.data
      );
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {
      console.log("Submitting Form:");
      console.log(form);
        const profile =
          await axios.post(
            "http://localhost:5000/api/employees",
            form,
            {
              headers: {
                Authorization:
                  token
              }
            }
          );

        const employeeId =
          profile.data
            .profile.id;

        await axios.post(
          `http://localhost:5000/api/employees/${employeeId}/skills`,
          {
            skills:
              selectedSkills
          },
          {
            headers: {
              Authorization:
                token
            }
          }
        );

        const imageData =
          new FormData();

        for (
          let file of images
        ) {
          imageData.append(
            "images",
            file
          );
        }

        await axios.post(
          `http://localhost:5000/api/employees/upload/${employeeId}`,
          imageData,
          {
            headers: {
              Authorization:
                token
            }
          }
        );

        alert(
          "Employee created successfully"
        );

      } catch (error) {

        console.log(
        "Backend Response:",
        error.response?.data
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
            Create Employee
          </h1>

          <form
            className="form-container"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label>
                Department
              </label>

              <select
                value={
                  form.department_id
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    department_id:
                      e.target.value
                  })
                }
              >
                <option>
                  Select
                </option>

                {departments.map(
                  (department) => (
                    <option
                      key={
                        department.id
                      }
                      value={
                        department.id
                      }
                    >
                      {
                        department.department_name
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            <input
              placeholder="Phone"
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: Number(
                    e.target.value)
                })
              }
            />

            <input
              placeholder="Address"
              onChange={(e) =>
                setForm({
                  ...form,
                  address:
                    e.target.value
                })
              }
            />

            <input
              placeholder="Designation"
              onChange={(e) =>
                setForm({
                  ...form,
                  designation:
                    e.target.value
                })
              }
            />

                <input
                  type="number"
                  placeholder="Salary"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      salary: Number(
                        e.target.value
                      )
                    })
                  }
                />

            <br />
            <br />

            <label>
              Skills
            </label>

            {skills.map(
              (skill) => (
                <div
                  key={skill.id}
                >
                  <input
                    type="checkbox"
                    value={
                      skill.id
                    }
                    onChange={(e) => {

                      if (
                        e.target.checked
                      ) {
                        setSelectedSkills(
                          [
                            ...selectedSkills,
                            Number(
                              e.target.value
                            )
                          ]
                        );
                      }

                    }}
                  />

                  {
                    skill.skill_name
                  }
                </div>
              )
            )}

            <br />

            <input
              type="file"
              multiple
              onChange={(e) =>
                setImages(
                  e.target.files
                )
              }
            />

            <br />
            <br />

            <button
              className="submit-btn"
            >
              Save Employee
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateEmployee;