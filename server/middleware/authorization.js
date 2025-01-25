const JWT = require("jsonwebtoken");
const jwtGenerator = require("../utils/jwtGenerator");
require("dotenv").config(); // Access environmental variables

// This block authorizes the user based on the req body and generates a response to either grant or deny access
module.exports = async (req, res, next) => {
    try {
        const jwt = req.cookies.jwt;

        // Decodes and verifies the JWT payload (user id) as this is what is used to generate the JWT, along with the secret key
        JWT.verify(jwt, process.env.jwtSecret);
    } catch (error) {
        const jwt = jwtGenerator();
        res.cookie('jwt', jwt, {
            httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 3600000,
        });
        return res.status(403).json({
            message: "Invalid jwt, public access granted",
            jwt,  // Send the jwt as part of the response
        });
    }

    // If everything completes, proceed to the next middleware or route handler
    next();
}
