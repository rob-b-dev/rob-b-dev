const express = require('express');
const router = express.Router();
const { getUserId } = require("../helpers/jwt");
const pool = require('../db');
const bcrypt = require("bcrypt");

// Middleware
const studentValidation = require("../middleware/studentValidation");

router.post("/update", studentValidation, async (req, res) => {
    try {
        const user_id = getUserId(req.cookies.jwt); // Gather user ID from JWT

        let key = Object.keys(req.body)[0];
        let value = Object.values(req.body)[0];

        console.log(req.body)

        // Fetch user
        const user = await pool.query("SELECT user_name, user_email, user_password FROM students WHERE user_id = $1", [user_id]);

        if (user.rows.length === 0) {
            return res.status(404).json("No valid user")
        }

        // Update database
        if (key === "user_password") {

            const validPassword = await bcrypt.compare(value, user.rows[0].user_password);

            if (validPassword) {
                return res.status(400).json("Password must not match original")
            }

            // Hash new password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            value = bcrypt.hash(value, salt);  // Override the value here
        }

        // Construct the SQL query safely
        const query = `UPDATE students SET ${key} = $1 WHERE user_id = $2`;
        await pool.query(query, [value, user_id]);

        res.status(200).send("Profile updated");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});

// User checked for existence before providing profile data specific to that user
router.get("/fetch", async (req, res) => {
    try {
        const user_id = getUserId(req.cookies.jwt);

        // Fetch user
        const user = await pool.query("SELECT user_name, user_email, user_password FROM students WHERE user_id = $1", [user_id]);

        if (user.rows.length === 0) {
            return res.status(404).json("No valid user");
        }

        res.json({
            user_name: user.rows[0].user_name,
            user_email: user.rows[0].user_email,
            user_password: '********'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});

module.exports = router;





