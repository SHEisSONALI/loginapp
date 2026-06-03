const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authMiddleware =
  require("../middleware/authMiddleware");

/* Get All Skills */

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const skills =
        await pool.query(
          "SELECT * FROM skills ORDER BY id"
        );

      res.json(skills.rows);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

/* Create Skill */

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const { skill_name } = req.body;

      if (!skill_name) {
        return res.status(400).json({
          message: "Skill name is required"
        });
      }

      const existing =
        await pool.query(
          "SELECT * FROM skills WHERE skill_name = $1",
          [skill_name]
        );

      if (existing.rows.length > 0) {
        return res.status(400).json({
          message: "Skill already exists"
        });
      }

      const skill =
        await pool.query(
          `INSERT INTO skills(skill_name)
           VALUES($1)
           RETURNING *`,
          [skill_name]
        );

      res.status(201).json(
        skill.rows[0]
      );

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;