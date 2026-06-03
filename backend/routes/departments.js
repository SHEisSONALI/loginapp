const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authMiddleware =
  require("../middleware/authMiddleware");

/* Get All Departments */

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const departments =
        await pool.query(
          "SELECT * FROM departments ORDER BY id"
        );

      res.json(departments.rows);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

/* Create Department */

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const { department_name } = req.body;

      if (!department_name) {
        return res.status(400).json({
          message: "Department name is required"
        });
      }

      const existing =
        await pool.query(
          "SELECT * FROM departments WHERE department_name = $1",
          [department_name]
        );

      if (existing.rows.length > 0) {
        return res.status(400).json({
          message: "Department already exists"
        });
      }

      const department =
        await pool.query(
          `INSERT INTO departments(department_name)
           VALUES($1)
           RETURNING *`,
          [department_name]
        );

      res.status(201).json(
        department.rows[0]
      );

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;