const router = require("express").Router()
// Ensures users JWT is authorized before accesing a private route with private data
const pool = require("../db");

// Authorization middleware means the JWT is checked here from the header across transmission.
// The JWT is decoded in the middleware and stored in the req.user object to gather user profile here:
router.get("/", async (req, res) => {
    try {
        const id = req.user
        const user = await pool.query("SELECT user_name, user_email, user_password FROM users WHERE user_id = $1", [id])
        // Mask part of the email address
        const maskedEmail = user.rows[0].user_email.replace(/(.{3})(.*)(?=@)/, '$1***'); // Masks everything except the first 3 characters and the domain
        res.json({
            user_name: user.rows[0].user_name,
            user_email: maskedEmail,
            user_password: "********"
        });

    } catch (error) {
        console.error(error)
        res.status(500).json("Server Error")
    }
})



module.exports = router;