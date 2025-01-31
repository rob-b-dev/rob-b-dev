const jwtGenerator = require("../utils/jwtGenerator");
const { verifyJWT } = require("../helpers/jwt")
require("dotenv").config(); // Access environmental variables

// This block authorizes the user based on the req body and generates a response to either grant or deny access
module.exports = async (req, res, next) => {
    try {
        // Gather JWT sent as coookie - this sends by default on every request
        verifyJWT(req.cookies.jwt) // Verifies the private or public JWT sent

    } catch (error) {
        const jwt = jwtGenerator();
        // Public cookie
        res.cookie('jwt', jwt, {
            httpOnly: true, secure: false, sameSite: 'Strict', maxAge: 3600000,
        });
        return res.status(403).json({
            message: "Invalid jwt, public access granted",
            code: "INVALID_REQUEST",
            jwt,
        });
    }

    next();



}
