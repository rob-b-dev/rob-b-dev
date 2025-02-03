const express = require('express');
const router = express.Router();
const { verifyJWT } = require("../helpers/jwt");
const pool = require('../db');
const bcrypt = require("bcrypt");

// Middleware
const validation = require("../middleware/validation");
// const cryptography = require("../middleware/cryptography")

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
        const user_id = await getUserId(req); // Gather user id from JWT

        // All possible fields for profile update
        let originalFields = [
            { field: 'user_name', value: req.body.name },
            { field: 'user_email', value: req.body.email },
            { field: 'user_password', value: req.body.password }
        ];
        console.log('original fields', originalFields);
        console.log("");

        // Gather fields that are not undefined (have been updated)
        const updatedFields = originalFields.filter(field => field.value !== undefined);
        console.log('updated fields', updatedFields);
        console.log("");

        // If no fields have been changed, respond with error
        if (updatedFields.length === 0) {
            return res.status(400).send('No valid fields to update.');
        }

        // Gather user from user id
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (user.rows.length === 0) {
            return res.status(404).send('User not found.');
        }

        // Compare the plaintext password with the hashed password in the database only if password is provided
        if (req.body.password) {
            const validPassword = await bcrypt.compare(req.body.password, user.rows[0].user_password);

            // If the passwords match, return an error message
            if (validPassword) {
                return res.status(409).send("Password must not match previous");
            }
        }

        // Create an update query dynamically
        let query = 'UPDATE users SET ';
        const values = [];
        for (const [index, field] of updatedFields.entries()) {
            if (field.field === 'user_password') {
                // Hash the password if it's being updated
                const salt = await bcrypt.genSalt(10);
                field.value = await bcrypt.hash(field.value, salt);
            }
            query += `${field.field} = $${index + 1}`;
            values.push(field.value);
            if (index < updatedFields.length - 1) {
                query += ', ';
            }
        }
        query += ' WHERE user_id = $' + (updatedFields.length + 1);
        values.push(user_id);  // using the user ID from JWT
        console.log('query', query);
        console.log('values', values);

        await pool.query(query, values);
        res.status(200).send('Profile updated successfully.');

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal server error.');
    }
});




module.exports = router;





