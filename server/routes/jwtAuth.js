// Private routes

const router = require("express").Router(); // Building routes
const bcrypt = require("bcrypt");

// Connect to db module
const pool = require("../db");

// Require the JWT Generator
const jwtGenerator = require("../utils/jwtGenerator");

// Middleware
const validation = require("../middleware/validation");

// Called on logout press
router.post("/logout", async (req, res) => {
    try {
        console.log("called")
        // Public JWT on logout without user id - not user specific but still handling user sessions
        createJWT(res); // Response passed without user id. This is checked when signing the JWT and if no user id is passed then it signs a token with a public access level which is decoded and authorized in the frontend ot determine user authorization
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
});

router.post("/login", validation, async (req, res) => {
    try {
        // Destructure req.body
        const { email, password } = req.body;

        // Check if user doesnt exist. If user doesnt exist then error is thrown
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
            [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Email or Password is incorrect");
        }

        // Check if incoming password is the same as the database password
        // '[0]' is used to access the value of the returned object
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Email or Password is incorrect")
        }

        // Private JWT on login
        createJWT(res, user.rows[0]?.user_id);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.post("/register", validation, async (req, res) => {
    try {
        // Destructure req.body to get name, email, password
        const { name, email, password } = req.body;

        // Gather user from register email field
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        // Check for user existence. If true return error
        if (user.rows.length !== 0) {
            return res.status(401).json('User already exists');
        }

        // Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)

        // Enter new user inside database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword])

        // Private JWT on register - user id provided for this
        createJWT(res, newUser.rows[0]?.user_id);

        // Executes on code failure - therefore server code issue
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

router.get("/verify", (req, res) => {
    try {
        return res.json({
            jwt: req.cookies.jwt
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }
})

const createJWT = (res, user_id) => {
    const jwt = jwtGenerator(user_id) // Call JWT generator and offer user id as a param
    res.cookie('jwt', jwt, { httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 3600000 }); // JWT set set as cookie
    res.json({ jwt }) // JWT sent in json
}


module.exports = router;