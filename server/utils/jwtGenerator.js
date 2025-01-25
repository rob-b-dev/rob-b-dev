// This module generates JWT's used for POST requests about the user - used for authorization from user specific roles
// This gets sent back to the client side. Every time a user makes a fetch request inside the app the user needs to provide this JWT

// Require JWT methods
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Access environmental variables

// Generate JWT based off the user id
function jwtGenerator(user_id) {
    // Define the payload - the data encoded in the JWT
    const payload = {
        access_level: "PUBLIC"
    }

    if (user_id) {
        payload.user_id = user_id;
        payload.access_level = "PRIVATE";
    }

    // - `process.env.jwtSecret` is the secret key used to sign the JWT (stored securely in environment variables)
    // - `{ expiresIn: "1hr" }` means the JWT will expire in 1 hour
    return jwt.sign(payload, process.env.jwtSecret, {
        expiresIn: '1h'
    })
}

module.exports = jwtGenerator;