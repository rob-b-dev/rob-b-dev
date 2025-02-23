// This module generates JWT's used for POST requests about the user - used for authorization from user specific roles
// This gets sent back to the client side. Every time a user makes a fetch request inside the app the user needs to provide this JWT

// Require JWT methods
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Access environmental variables

// Generate JWT
function jwtGenerator(user_id) { // User id passed is optional
    // Define the payload - the data encoded in the JWT

    // Public payload for users not authorized
    const payload = {
        access_level: "PUBLIC"
    }

    // If a user id is passed, the access level is private as the user has registered or logged in
    if (user_id) {
        payload.user_id = user_id;
        payload.access_level = "PRIVATE";
    }

    // Sign payload based on optional user id pass - either private or public from this
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
}

module.exports = jwtGenerator;