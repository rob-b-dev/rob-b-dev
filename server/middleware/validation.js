// This module validates user information across paths

module.exports = (req, res, next) => {
    const { email, name, password } = req.body;

    function validEmail(userEmail) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPassword(userPassword) {
        // Check for at least one uppercase letter, one special character, and one number
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/.test(userPassword);
    }

    if (req.path === '/register') {
        // Checks for empty values. If it comes back true, there are empty values
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials")
            // Checks for invalid email
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email")
        } // Checks for password length
        else if (password.length < 8 || password.length > 32) {
            return res.status(401).json("Password must be between 8 and 32 characters.");
            // Checks for password variation
        } else if (!validPassword(password)) {
            return res.status(401).json("Password must contain a symbol, special character, and capital letter.");
        }
    }

    else if (req.path === '/login') {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials")
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email")
        }
    }



    // If everything completes, the next process happens which is most likely going to be in the client side unless a request has already been passed through
    next();
}