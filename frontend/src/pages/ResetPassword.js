import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          token,
          password
        }
      );

      alert(res.data.message);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>

      <input
        type="text"
        placeholder="Reset Token"
        value={token}
        onChange={(e) =>
          setToken(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Reset Password
      </button>
    </form>
  );
}

export default ResetPassword;