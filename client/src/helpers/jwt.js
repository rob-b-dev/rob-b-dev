import { jwtDecode } from "jwt-decode";
// import the hook

// Decode JWT to gather the access level and define their logged in state
function decodeJWT(jwt) {
    return jwtDecode(jwt);
}

// If logged in the access level is private, if not the user is assigned a 
export function isLoggedIn(jwt) {
    const decoded_jwt = decodeJWT(jwt);
    return decoded_jwt.access_level === "PRIVATE"; // Returns bool value 
}