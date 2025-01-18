// This module checks to see if the JWT token being sent to us as a req is valid when the user accesses certain features - authorizing the user

const jwt = require("jsonwebtoken");
require("dotenv").config(); // Access environmental variables

// This block authorizes the user based on the req body and generates a response to either grant or deny access
module.exports = async (req, res, next) => {
    try {

        // Gathers the token prop from the header allowing access to its value pair (the encoded token)
        const jwtToken = req.header("token")
        // If there is no JWT Token then throw an error
        if (!jwtToken) {
            return res.status(403).json("Not Authorized")
        }

        // decodes and verifies the JWT payload as this is what is used to generate the token
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        // assigns the user id to the request body to be used in other routes
        req.user = payload.user
        console.log(req.body)

    } catch (error) {
        return res.status(403).json("Not Authorized")
    }

    // If everything completes, the next process happens which is most likely going to be in the client side unless a request has already been passed through
    next()
}