const JWT = require("jsonwebtoken");

const verifyJWT = (jwt) => {
    return JWT.verify(jwt, process.env.JWT_SECRET)
}

const getUserId = (jwt) => {
    const decoded_jwt = verifyJWT(jwt);
    const { user_id } = decoded_jwt;
    return user_id;
};

module.exports = { verifyJWT, getUserId }
