import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function SkillsMaster() {

  const [skillName,
    setSkillName] =
    useState("");

  const [skills,
    setSkills] =
    useState([]);

  const token =
    localStorage.getItem("token");

 useEffect(() => {
  const loadData = async () => {
    await fetchSkills();
  };

  loadData();
}, []);

  const fetchSkills =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/skills",
            {
              headers: {
                Authorization: token
              }
            }
          );

        setSkills(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "http://localhost:5000/api/skills",
          {
            skill_name:
              skillName
          },
          {
            headers: {
              Authorization:
                token
            }
          }
        );

        setSkillName("");

        fetchSkills();

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
            Skills Master
          </h1>

          <form
            className="form-container"
            onSubmit={handleSubmit}
          >

            <div className="form-group">

              <label>
                Skill Name
              </label>

              <input
                value={skillName}
                onChange={(e) =>
                  setSkillName(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              className="submit-btn"
            >
              Add Skill
            </button>

          </form>

          <div
            className="card"
            style={{
              marginTop: 20
            }}
          >

            <h2>Skills</h2>

            <br />
          <div className="skill-grid">

            {skills.map(skill => (

              <div
                key={skill.id}
                className="skill-card"
              >
                {skill.skill_name}
              </div>

            ))}

          </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SkillsMaster;