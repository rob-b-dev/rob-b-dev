import { jwtDecode } from "jwt-decode";

function decodeJWT(jwt) {
    return jwtDecode(jwt);
}

export function isLoggedIn(jwt) {
    const decoded_jwt = decodeJWT(jwt);
    return decoded_jwt.access_level === "PRIVATE";
}