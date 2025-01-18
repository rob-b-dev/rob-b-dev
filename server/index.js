const express = require("express")
const app = express()
const cors = require("cors")
const jwtAuth = require("./routes/jwtAuth");
const profile = require("./routes/profile")


// Middleware
app.use(cors()) // Allows resource sharing
app.use(express.json()) // Access to req.body on client side

// ROUTES //

// Requires routes from jwtAuth to add as an endpoint
app.use("/auth", jwtAuth)

// Profile route for when a user wants to access their profile data
app.use("/profile", profile)

// For API requests externally
// app.use("/api")

app.listen(5001, () => {
    console.log("App running on port 5001")
})