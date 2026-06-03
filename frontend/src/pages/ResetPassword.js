import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";

function ResetPassword() {

  const navigate =
    useNavigate();

  const [token, setToken] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/reset-password",
            {
              token,
              password
            }
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

        <h2>
          Reset Password
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Reset Token
            </label>

            <input
              type="text"
              placeholder="Paste token"
              value={token}
              onChange={(e) =>
                setToken(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Reset Password
          </button>

        </form>

        <p
          style={{
            marginTop: "15px"
          }}
        >
          <Link to="/">
            Back to Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default ResetPassword;