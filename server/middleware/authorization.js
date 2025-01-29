const jwtGenerator = require("../utils/jwtGenerator");
const { verifyJWT } = require("../helpers/jwt")
require("dotenv").config(); // Access environmental variables

// This block authorizes the user based on the req body and generates a response to either grant or deny access
module.exports = async (req, res, next) => {
    try {
        // Gather jwt sent as coookie - this sends by default on every req
        // Decodes and verifies the JWT payload (user id), along with the secret key - JWT would not match payload or secret if tampered with slightly
        verifyJWT(req.cookies.jwt)

    } catch (error) {
        const jwt = jwtGenerator();
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
