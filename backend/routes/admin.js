const express = require("express");
const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleCheck =
  require("../middleware/adminMiddleware");

/*
Admin Dashboard
*/

router.get(
  "/dashboard",
  authMiddleware,
  roleCheck("admin"),
  (req, res) => {
    res.json({
      message: "Admin Dashboard"
    });
  }
);

/*
Employees Management
Admin + HR
*/

router.get(
  "/employees",
  authMiddleware,
  roleCheck("admin", "hr"),
  (req, res) => {
    res.json({
      message: "Employees Management"
    });
  }
);

/*
Reports
Admin + Director
*/

router.get(
  "/reports",
  authMiddleware,
  roleCheck("admin", "director"),
  (req, res) => {
    res.json({
      message: "Reports"
    });
  }
);

module.exports = router;