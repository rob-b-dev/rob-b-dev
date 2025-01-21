// This module decodes the JWT Token gathered from the heaer and verifies its payload
// If a user wants to access sensitive data, this module runs and stores the users id in the request object

const jwt = require("jsonwebtoken");
require("dotenv").config(); // Access environmental variables

// This block authorizes the user based on the req body and generates a response to either grant or deny access
module.exports = (req, res, next) => {
    try {

        // Gathers the token prop from the header allowing access to its value pair (the encoded token)
        const jwtToken = req.header("token")
        // If there is no JWT Token then throw an error
        if (!jwtToken) {
            return res.status(403).json("Not Authorized")
        }

        // Decodes and verifies the JWT payload (user id) as this is what is used to generate the token, along with the secret key
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        // Stores user id in the request body to be used in other routes
        req.user = payload.user

    } catch (error) {
        // If the user has an invalid JWT Token (has been tampered with), that user is unauthorized
        return res.status(403).json("Not Authorized")
    }

    // If everything completes, the next process happens which is most likely going to be in the client side unless a request has already been passed through
    next()
}