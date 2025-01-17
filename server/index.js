const express = require("express")
const app = express()
const cors = require("cors")
const jwtAuth = require("./routes/jwtAuth");

// Middleware
app.use(cors()) // Allows resource sharing
app.use(express.json()) // Access to req.body on client side

// ROUTES //

// Register and Login routes

// Requires routes from jwtAuth to add as an endpoint
app.use("/auth", jwtAuth)

app.listen(5001, () => {
    console.log("App running on port 5001")
})