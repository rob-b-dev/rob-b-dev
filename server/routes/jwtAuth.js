// This module defines the routes my backend posts across in order to store user specific data. 

// JWT used for building routes
const router = require("express").Router()
const bcrypt = require("bcrypt")
// Connect db for user existence checking and new user addition 
const pool = require("../db")

// Registering
router.post("/register", async (req, res) => {
    try {

        // Destructure req.body to get name, email, password
        const { name, email, password } = req.body;

        // syntax used in query that replaces email as a string variable - checks if user exists, if it does then it displays the row of that user below in json format
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])
        res.json(user.rows)

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


        // generate JWT token to authorize user to access routes in the app
        res.json(newUser.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})



module.exports = router