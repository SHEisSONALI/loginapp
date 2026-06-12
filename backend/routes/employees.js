const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authMiddleware =
  require("../middleware/authMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

/*
=========================================
Create Employee Profile
POST /api/employees
=========================================
*/

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        department_id,
        phone,
        address,
        designation,
        salary
      } = req.body;

      if (
        !department_id ||
        !phone ||
        !designation ||
        !salary
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all required fields"
        });
      }

      const department =
        await pool.query(
          "SELECT * FROM departments WHERE id = $1",
          [department_id]
        );

      if (department.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Department not found"
        });
      }

      const existingProfile =
        await pool.query(
          `SELECT * FROM employee_profiles
           WHERE user_id = $1`,
          [req.user.id]
        );

      if (existingProfile.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Employee profile already exists"
        });
      }
console.log("Incoming Employee Data:");
console.log({
  user_id: req.user.id,
  department_id,
  phone,
  address,
  designation,
  salary,
  salaryType: typeof salary
});
      const profile =
        await pool.query(
          `
          INSERT INTO employee_profiles
          (
            user_id,
            department_id,
            phone,
            address,
            designation,
            salary
          )
          VALUES($1,$2,$3,$4,$5,$6)
          RETURNING *
          `,
          [
            req.user.id,
            department_id,
            phone,
            address,
            designation,
            salary
          ]
        );

      res.status(201).json({
        success: true,
        message:
          "Profile created successfully",
        profile: profile.rows[0]
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }
);

/*
=========================================
Get All Employees
GET /api/employees
=========================================
*/

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const employees =
        await pool.query(`
          SELECT
            ep.id,
            u.name,
            u.email,
            d.department_name,
            ep.phone,
            ep.address,
            ep.designation,
            ep.salary,
            ep.created_at
          FROM employee_profiles ep
          INNER JOIN users u
            ON ep.user_id = u.id
          INNER JOIN departments d
            ON ep.department_id = d.id
          ORDER BY ep.id
        `); 

      res.json({
        success: true,
        employees: employees.rows
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }
);

/*
=========================================
Upload Employee Images
POST /api/employees/upload/:employeeId
=========================================
*/

router.post(
  "/upload/:employeeId",
  authMiddleware,
  upload.array("images", 5),
  async (req, res) => {
    try {

      const employeeId =
        req.params.employeeId;

      for (const file of req.files) {

        await pool.query(
          `
          INSERT INTO employee_images
          (
            employee_id,
            image_url
          )
          VALUES($1,$2)
          `,
          [
            employeeId,
            file.filename
          ]
        );

      }

      res.json({
        success: true,
        message:
          "Images uploaded successfully",
        uploadedFiles:
          req.files.length
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }
);

/*
=========================================
Assign Skills
POST /api/employees/:employeeId/skills
=========================================
*/

router.post(
  "/:employeeId/skills",
  authMiddleware,
  async (req, res) => {

    try {

      const { skills } =
        req.body;

      const employeeId =
        req.params.employeeId;

      for (const skillId of skills) {

        await pool.query(
          `
          INSERT INTO employee_skills
          (
            employee_id,
            skill_id
          )
          VALUES($1,$2)
          `,
          [
            employeeId,
            skillId
          ]
        );

      }

      res.json({
        success: true,
        message:
          "Skills assigned successfully"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

/*
=========================================
Get Employee By ID
GET /api/employees/:id
=========================================
*/

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const employee =
        await pool.query(
          `
          SELECT
            ep.*,
            u.name,
            u.email,
            d.department_name
          FROM employee_profiles ep
          INNER JOIN users u
            ON ep.user_id = u.id
          INNER JOIN departments d
            ON ep.department_id = d.id
          WHERE ep.id = $1
          `,
          [req.params.id]
        );

      if (
        employee.rows.length === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Employee not found"
        });
      }

      res.json({
        success: true,
        employee:
          employee.rows[0]
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

/*
=========================================
Update Employee
PUT /api/employees/:id
=========================================
*/

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        department_id,
        phone,
        address,
        designation,
        salary
      } = req.body;

      const updated =
        await pool.query(
          `
          UPDATE employee_profiles
          SET
            department_id = $1,
            phone = $2,
            address = $3,
            designation = $4,
            salary = $5
          WHERE id = $6
          RETURNING *
          `,
          [
            department_id,
            phone,
            address,
            designation,
            salary,
            req.params.id
          ]
        );

      res.json({
        success: true,
        message:
          "Employee updated",
        employee:
          updated.rows[0]
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

/*
=========================================
Delete Employee
DELETE /api/employees/:id
=========================================
*/

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await pool.query(
        "DELETE FROM employee_profiles WHERE id = $1",
        [req.params.id]
      );

      res.json({
        success: true,
        message:
          "Employee deleted"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);

module.exports = router;