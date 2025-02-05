const express = require('express');
const router = express.Router();
const { verifyJWT } = require("../helpers/jwt");
const pool = require('../db');
const bcrypt = require("bcrypt");

// Middleware
const validation = require("../middleware/validation");

// Function to get user ID from JWT
const getUserId = async (req) => {
    const decoded_jwt = verifyJWT(req.cookies.jwt);
    const { user_id } = decoded_jwt;
    return user_id;
};

// User checked for existence before providing profile data specific to that user
router.get("/", async (req, res) => {
    try {
        console.log('profile gather called')
        const user_id = await getUserId(req);
        const user = await pool.query("SELECT user_name, user_email, user_password FROM users WHERE user_id = $1", [user_id]);

        if (user.rows.length === 0) {
            throw new Error("No valid user");
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

router.post("/update", validation, async (req, res) => {
    try {
        const user_id = await getUserId(req); // Gather user ID from JWT

        let key;
        let value;
        Object.entries(req.body).forEach(([field, val]) => {
            key = field;
            value = val;
        });

        // Fetch user details
        const user = await pool.query(
            "SELECT user_name, user_email, user_password FROM users WHERE user_id = $1",
            [user_id]
        );

        if (user.rows.length === 0) {
            throw new Error("User not found.");
        }

        // Update database
        if (key === "user_password") {
            // Compare old and new passwords
            const validPassword = bcrypt.compare(value, user.rows[0].user_password);

            if (validPassword) {
                return res.status(409).send("No changes detected");
            }

            // Hash new password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            value = bcrypt.hash(value, salt);  // Override the value here
        }

        // Construct the SQL query safely
        const query = `UPDATE users SET ${key} = $1 WHERE user_id = $2`;
        await pool.query(query, [value, user_id]);

        res.status(200).send("Updating profile");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});


module.exports = router;





