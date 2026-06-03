import { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    alert("Login Success");
    navigate("/dashboard");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Login failed"
    );
  }
};

  return (
  <form onSubmit={handleSubmit}>
    <h2>Login</h2>

    <input
      name="email"
      placeholder="Email"
      onChange={handleChange}
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
    />

    <button type="submit">
      Login
    </button>
    <p>
  <Link to="/forgot-password">
    Forgot Password?
  </Link>
</p>
     <p>
    Don't have an account?
    <Link to="/signup">
      Signup
    </Link>
  </p>
  </form>
  
);
}

export default Login;