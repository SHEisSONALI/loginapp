require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const departmentRoutes = require("./routes/departments");
const skillRoutes = require("./routes/skills");
const employeeRoutes = require("./routes/employees");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

/* Middlewares */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

/* Static Uploads Folder */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* Routes */

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/admin", adminRoutes);

app.use(
  "/api/departments",
  departmentRoutes
);

app.use(
  "/api/skills",
  skillRoutes
);

app.use(
  "/api/employees",
  employeeRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

/* Health Check */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Employee Management API Running"
  });
});

/* 404 Handler */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* Start Server */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});