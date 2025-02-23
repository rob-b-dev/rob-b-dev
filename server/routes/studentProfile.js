const express = require('express');
const router = express.Router();
const { verifyJWT } = require("../helpers/jwt");
const pool = require('../db');
const bcrypt = require("bcrypt");

// Middleware
const studentValidation = require("../middleware/studentValidation");

// Function to get user ID from JWT
const getUserId = async (req) => {
    const decoded_jwt = verifyJWT(req.cookies.jwt);
    const { user_id } = decoded_jwt;
    return user_id;
};

router.post("/update", studentValidation, async (req, res) => {
    try {
        const user_id = await getUserId(req); // Gather user ID from JWT

        let key = Object.keys(req.body)[0];
        let value = Object.values(req.body)[0];

        // Fetch user
        const user = await pool.query("SELECT user_name, user_email, user_password FROM students WHERE user_id = $1", [user_id]);

        if (user.rows.length === 0) {
            throw new Error("No valid user");
        }

        // Update database
        if (key === "user_password") {
            // Hash new password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            value = bcrypt.hash(value, salt);  // Override the value here
        }

        // Construct the SQL query safely
        const query = `UPDATE students SET ${key} = $1 WHERE user_id = $2`;
        await pool.query(query, [value, user_id]);

        res.status(200).send("Updating profile");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});

// User checked for existence before providing profile data specific to that user
router.get("/fetch", async (req, res) => {
    try {
        const user_id = await getUserId(req);

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





