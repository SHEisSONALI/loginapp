const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {

      const user = await pool.query(
        `SELECT
          id,
          name,
          email,
          role,
          verified,
          last_login
        FROM users
        WHERE id=$1`,
        [req.user.id]
      );

      res.json(user.rows[0]);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;