import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
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
            "http://localhost:5000/api/auth/login",
            form
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        alert(
          "Login Successful"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Login failed"
        );

      }

    };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>EMS</h1>

        <h2>Login</h2>

        <form
          onSubmit={handleSubmit}
        >

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
            Login
          </button>

        </form>

        <p
          style={{
            marginTop: "15px"
          }}
        >
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p
          style={{
            marginTop: "10px"
          }}
        >
          Don't have an account?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;