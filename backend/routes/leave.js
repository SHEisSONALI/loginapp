const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/apply", (req, res) => {
  const {
    employee_id,
    leave_type,
    start_date,
    end_date,
    reason
  } = req.body;

  const sql = `
    INSERT INTO leave_requests
    (employee_id, leave_type, start_date, end_date, reason)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [employee_id, leave_type, start_date, end_date, reason],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Leave request submitted"
      });
    }
  );
});
module.exports = router;