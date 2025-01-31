const express = require('express');
const router = express.Router();
const { verifyJWT } = require("../helpers/jwt");
const pool = require('../db'); // Ensure you have your database pool setup correctly
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
        const user_id = await getUserId(req);

        const user = await pool.query("SELECT user_name, user_email, user_password FROM users WHERE user_id = $1", [user_id]);

        if (user.rows.length === 0) {
            throw new Error("No valid user");
        }

        res.json({
            user_name: user.rows[0].user_name,
            user_email: user.rows[0].user_email, // Masks everything except the first 3 characters and the domain,
            user_password: "********"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});

// User id gathered from JWT cookie when a profile update is requested and profile is updated
router.post("/update", validation, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user_id = await getUserId(req);

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (user.rows.length === 0) {
            throw new Error("No valid user")
        }

        // Update the user details in your database
        await pool.query(
            "UPDATE users SET user_name = $1, user_email = $2, user_password = $3 WHERE user_id = $4",
            [name, email, password, user_id]
        );

        res.json("Profile updated successfully");

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});

module.exports = router;
