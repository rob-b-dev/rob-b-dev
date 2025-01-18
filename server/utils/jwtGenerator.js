// This module generates JWT tokens used for POST requests about the user - used for authorization from user specific roles
// This gets sent back to the client side. Every time a user makes a fetch request inside the app the user needs to provide this token

// Require JWT methods
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Access environmental variables

// Generate JWT token based off the user id
function jwtGenerator(user_id) {
    // Define the payload - the data encoded in the token
    const payload = {
        user: user_id, // Stores the users ID in the token 
    }
    // - `jwt.sign()` creates the token
    // - `process.env.jwtSecret` is the secret key used to sign the token (stored securely in environment variables)
    // - `{ expiresIn: "1hr" }` means the token will expire in 1 hour
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" })
}

module.exports = jwtGenerator;