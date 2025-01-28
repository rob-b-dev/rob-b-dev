const JWT = require("jsonwebtoken");

const verifyJWT = (jwt) => {
    return JWT.verify(jwt, process.env.JWT_SECRET)
}

module.exports = { verifyJWT }
