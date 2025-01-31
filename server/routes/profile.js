const router = require("express").Router();
const { verifyJWT } = require("../helpers/jwt");
// Ensures users JWT is authorized before accesing a private route with private data
const pool = require("../db");

// Middleware
// const validation = require("../middleware/validation");

// Authorization middleware means the JWT is checked here from the header across transmission.
// The JWT is decoded in the middleware and stored in the req.user object to gather user profile here:
router.get("/", async (req, res) => {
    try {
        const decoded_jwt = verifyJWT(req.cookies.jwt)
        const { user_id } = decoded_jwt;

        const user = await pool.query("SELECT user_name, user_email, user_password FROM users WHERE user_id = $1", [user_id])

        if (!user) {
            throw new Error("No valid user") // Throw error and execute catch block
        }

        res.json({
            user_name: user.rows[0].user_name,
            user_email: user.rows[0].user_email.replace(/(.{3})(.*)(?=@)/, '$1***'), // Masks everything except the first 3 characters and the domain,
            user_password: "********"
        });

    } catch (error) {
        console.error(error)
        res.status(500).json("Server Error") // Send as response on incorrect code otherwise error is thrown and that message is logged
    }
})

router.post("/update", async (req) => {
    try {
        const { Name, Email, Password } = req.body
        console.log(Name)
        console.log(Email)
        console.log(Password)


    } catch (error) {
        console.error(error.message)
    }
})


module.exports = router;