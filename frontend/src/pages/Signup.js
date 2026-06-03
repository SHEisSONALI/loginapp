import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Signup() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/signup",
            form
          );

        alert(
          res.data.message
        );

        navigate("/");

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );

      }

    };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>EMS</h1>

        <h2>Sign Up</h2>

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              name="name"
              placeholder="Enter name"
              value={form.name}
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={
                form.password
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Register
          </button>

        </form>

        <p
          style={{
            marginTop: "15px"
          }}
        >
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;