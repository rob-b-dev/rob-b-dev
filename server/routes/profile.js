const router = require("express").Router()
// Ensures users JWT Token is authorized before accesing a private route with private data
const authorization = require("../middleware/authorization")


router.use("/", authorization, async (req, res) => {
    try {
        // Gathers user id from when we generate our JWT Token, as this is being called as a function in jwtAuth and is passing a user id from a db row under a specific email address
        res.json(req.user)
    } catch (error) {
        console.error(error)
        res.status(500).json("Server Error")
    }
})



module.exports = router;