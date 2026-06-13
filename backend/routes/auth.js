const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

/* ==========================
   SIGNUP
========================== */

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userExist.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = await pool.query(
      `INSERT INTO users(name,email,password)
       VALUES($1,$2,$3)
       RETURNING *`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User Registered",
      user: newUser.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* ==========================
   LOGIN
========================== */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong Password"
      });
    }

    await pool.query(
      "UPDATE users SET last_login = NOW() WHERE id = $1",
      [user.rows[0].id]
    );

    const accessToken = jwt.sign(
      {
        id: user.rows[0].id,
        role: user.rows[0].role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    const refreshToken = uuidv4();

    await pool.query(
      `INSERT INTO refresh_tokens
       (user_id, token)
       VALUES($1,$2)`,
      [user.rows[0].id, refreshToken]
    );

   res.json({
  message: "Login Success",
  token: accessToken,
  refreshToken,

  user: {
    id: user.rows[0].id,
    email: user.rows[0].email,
    role: user.rows[0].role
  }
});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* ==========================
   FORGOT PASSWORD
========================== */

router.post("/forgot-password", async (req, res) => {
  try {

    const { email } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const token = uuidv4();

    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await pool.query(
      `INSERT INTO password_reset
       (user_id, token, expires_at)
       VALUES ($1,$2,$3)`,
      [
        user.rows[0].id,
        token,
        expiresAt
      ]
    );

    res.json({
      message: "Reset token generated",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* ==========================
   RESET PASSWORD
========================== */

router.post("/reset-password", async (req, res) => {
  try {

    const { token, password } = req.body;

    const resetRecord = await pool.query(
      `SELECT * FROM password_reset
       WHERE token = $1`,
      [token]
    );

    if (resetRecord.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid token"
      });
    }

    const record = resetRecord.rows[0];

    if (new Date(record.expires_at) < new Date()) {
      return res.status(400).json({
        message: "Token expired"
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    await pool.query(
      `UPDATE users
       SET password = $1
       WHERE id = $2`,
      [
        hashedPassword,
        record.user_id
      ]
    );

    res.json({
      message: "Password reset successful"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* ==========================
   EMAIL VERIFICATION
========================== */

router.post("/send-verification", async (req, res) => {
  try {

    const { email } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const token = uuidv4();

    await pool.query(
      `INSERT INTO email_verification
       (user_id, token)
       VALUES ($1,$2)`,
      [user.rows[0].id, token]
    );

    res.json({
      message: "Verification token generated",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/verify/:token", async (req, res) => {
  try {

    const { token } = req.params;

    const record = await pool.query(
      `SELECT * FROM email_verification
       WHERE token=$1`,
      [token]
    );

    if (record.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid token"
      });
    }

    await pool.query(
      `UPDATE users
       SET verified=true
       WHERE id=$1`,
      [record.rows[0].user_id]
    );

    res.json({
      message: "Account verified"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* ==========================
   REFRESH TOKEN
========================== */

router.post("/refresh-token", async (req, res) => {
  try {

    const { refreshToken } = req.body;

    const tokenRecord = await pool.query(
      `SELECT * FROM refresh_tokens
       WHERE token=$1`,
      [refreshToken]
    );

    if (tokenRecord.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid refresh token"
      });
    }

    const userId = tokenRecord.rows[0].user_id;

    const user = await pool.query(
      "SELECT role FROM users WHERE id=$1",
      [userId]
    );

    const newAccessToken = jwt.sign(
      {
        id: userId,
        role: user.rows[0].role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    res.json({
      token: newAccessToken
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* ==========================
   LOGOUT
========================== */

router.post("/logout", async (req, res) => {
  try {

    const { refreshToken } = req.body;

    await pool.query(
      `DELETE FROM refresh_tokens
       WHERE token=$1`,
      [refreshToken]
    );

    res.json({
      message: "Logged out"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;