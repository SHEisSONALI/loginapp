import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/forgot-password",
            { email }
          );

        alert(
          res.data.message
        );

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
          Forgot Password
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(
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
            Send Reset Link
          </button>

        </form>

        <p
          style={{
            marginTop: "15px"
          }}
        >
          <Link to="/reset-password">
            Already have a reset token?
          </Link>
        </p>

        <p
          style={{
            marginTop: "10px"
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

export default ForgotPassword;