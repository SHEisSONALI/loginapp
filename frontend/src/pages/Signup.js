import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
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
      "http://localhost:5000/api/auth/signup",
      form
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
    <h2>Sign Up</h2>

    <input
      name="name"
      placeholder="Full Name"
      onChange={handleChange}
    />

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
      Register
    </button>
    <p>
  Already have an account?
  <Link to="/">
    Login
  </Link>
</p>
  </form>
);

}

export default Signup;