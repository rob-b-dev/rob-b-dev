const express = require('express');
const router = express.Router();
const pool = require('../db');
const { getUserId } = require("../helpers/jwt");

// Middleware
const tutorValidation = require("../middleware/tutorValidation")

router.post("/update", tutorValidation, async (req, res) => {
    try {
        const user_id = getUserId(req.cookies.jwt); // Gather user ID from JWT

        if (!user_id) return res.status(400).json("No user ID");

        const { bio, subjects, experience_years, availability, hourly_rate } = req.body // Destructure

        // Fetch user
        const user = await pool.query("SELECT * FROM students WHERE user_id = $1", [user_id]);

        const formattedBio = bio.replace(/\r\n/g, "\n"); // Normalize line breaks in Bio
        await pool.query(
            `INSERT INTO tutors (user_id, user_email, bio, subjects, experience_years, availability, hourly_rate)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (user_id) 
             DO UPDATE SET bio = EXCLUDED.bio, 
                           subjects = EXCLUDED.subjects, 
                           experience_years = EXCLUDED.experience_years, 
                           availability = EXCLUDED.availability, 
                           hourly_rate = EXCLUDED.hourly_rate
             WHERE tutors.user_id = EXCLUDED.user_id`,
            [user_id, user.rows[0].user_email, formattedBio, subjects, experience_years, availability, hourly_rate]
        );

        // Update user role
        await pool.query("UPDATE students SET roles = array_append(roles, 'tutor') WHERE user_id = $1",
            [user_id]
        )


        res.status(200).send("Profile updated")
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

router.get("/fetch", async (req, res) => {
    try {
        const user_id = getUserId(req.cookies.jwt); // Gather user ID from JWT

        // Fetch tutor profile of user
        const tutor = await pool.query("SELECT * FROM tutors WHERE user_id = $1", [user_id]);

        // Check tutor existence - tutor profile may not exist and return 409 instead of 500
        // If this is removed then it always returns a 500 when the user is logged in too
        if (tutor.rows.length === 0) {
            return res.status(404).json("No valid tutor")
        }

        // Provide details as json
        res.json({
            bio: tutor.rows[0].bio,
            subjects: tutor.rows[0].subjects,
            experience_years: tutor.rows[0].experience_years,
            availability: tutor.rows[0].availability,
            hourly_rate: tutor.rows[0].hourly_rate
        })

    } catch (error) {
        console.error(error);
        res.status(404).json("No user exists");
    }
})

// perform tutor existence check
router.get("/check", async (req, res) => {
    try {
        const user_id = getUserId(req.cookies.jwt); // Gather user ID from JWT

        // Fetch tutor profile of user
        const tutor = await pool.query("SELECT * FROM tutors WHERE user_id = $1", [user_id]);

        if (tutor.rows.length === 0) {
            return res.status(404).json("Tutor profile needs completing to access this page")
        }
        res.status(200).json("Tutor profile active")
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

module.exports = router;