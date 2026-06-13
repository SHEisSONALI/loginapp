const express = require("express");
const router = express.Router();

const pool =
  require("../config/db");

const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/all",
  authMiddleware,
  async (req, res) => {

    const result =
      await pool.query(`
        SELECT
          lr.*,
          ep.name AS employee_name
        FROM leave_requests lr
        JOIN employee_profiles ep
        ON lr.employee_id = ep.id
        ORDER BY applied_at DESC
      `);

    res.json(result.rows);

  }
);

router.post(
  "/apply",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        leave_type,
        start_date,
        end_date,
        reason
      } = req.body;

      await pool.query(
        `
        INSERT INTO leave_requests
        (
          employee_id,
          leave_type,
          start_date,
          end_date,
          reason
        )
        VALUES($1,$2,$3,$4,$5)
        `,
        [
          req.user.id,
          leave_type,
          start_date,
          end_date,
          reason
        ]
      );

      res.json({
        message:
          "Leave request submitted"
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  }
);
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    const { status } =
      req.body;

    await pool.query(
      `
      UPDATE leave_requests
      SET status = $1
      WHERE leave_id = $2
      `,
      [
        status,
        req.params.id
      ]
    );

    res.json({
      message:
        "Leave Updated"
    });

  }
);

module.exports = router;