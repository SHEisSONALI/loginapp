const express = require("express");
const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");
const roleCheck =
  require("../middleware/adminMiddleware");

router.get(
  "/employees",
  authMiddleware,
  roleCheck("admin", "hr"),
  adminMiddleware
);

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Admin Dashboard"
    });
  }
);

module.exports = router;
