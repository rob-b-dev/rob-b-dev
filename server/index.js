const express = require("express")
const cors = require("cors")
const jwtAuth = require("./routes/jwtAuth");
const profile = require("./routes/profile")
const cookieParser = require("cookie-parser");
const authorization = require("./middleware/authorization");
const rateLimit = require('express-rate-limit');

const app = express()

// Configure rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `windowMs`
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    headers: true, // Adds X-RateLimit headers to responses
});

app.use(limiter);

app.use(cookieParser()); // Use cookie-parser middleware

app.use(authorization);

// Global middleware
app.use(cors()) // Allows resource sharing
app.use(express.json()) // Access to req.body on client side

// Requires routes from jwtAuth to add as an endpoint
app.use("/auth", jwtAuth)

// Profile route for when a user wants to access their profile data
app.use("/profile", profile)

app.listen(5001, () => {
    console.log("App running on port 5001")
})