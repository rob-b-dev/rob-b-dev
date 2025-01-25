// This module defines the routes the backend posts across in order to store user specific data.
// Routes related to gathering external API data can be defined here too under an endpoint defined in index.js


// JWT used for building routes
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Connect to db module
const pool = require("../db");

// Require the JWT Generator
const jwtGenerator = require("../utils/jwtGenerator");

// Middleware
const validation = require("../middleware/validation");

router.post("/logout", async (req, res) => {
    try {
        createJWT(res);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
});

router.post("/patient-details", async () => {

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

        // Give user the JWT to authorize user to access routes in the app upon login
        createJWT(res, user.rows[0]?.user_id);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

// This block posts any request send to the endpoint, straight to the database - async used as these methods take time. Expression used as a route is created to register - dependent on req/res bodies not a function declaration.
router.post("/register", validation, async (req, res) => {
    try {
        // Destructure req.body to get name, email, password
        const { name, email, password } = req.body;

        // syntax used in query that replaces email as a string variable - checks if user exists.
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        // Check for user existence. If true throw error
        if (user.rows.length !== 0) {
            return res.status(401).send('User already exists');
        }

        // Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)

        // Enter new user inside database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword])

        createJWT(res, newUser.rows[0]?.user_id);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.get("/verify", (req, res) => {
    try {
        return res.json({
            jwt: req.cookies.jwt
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

const createJWT = (res, user_id) => {
    const jwt = jwtGenerator(user_id)
    res.cookie('jwt', jwt, { httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 3600000 });
    res.json({ jwt })
}


module.exports = router;