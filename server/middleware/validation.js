// This module validates user information across paths

module.exports = (req, res, next) => {
    const { email, name, password } = req.body;
    console.log(req.body)

    // Define the key and value of the request body
    // let key;
    // let value;
    // Object.entries(req.body).forEach(([field, val]) => {
    //     key = field;
    //     value = val;
    // });

    function validEmail(userEmail) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPassword(userPassword) {
        // Check for at least one uppercase letter, one special character, and one number
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/.test(userPassword);
    }

    if (req.path === '/register' || req.path === '/update') {
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        } else if (password.length < 8 || password.length > 32) {
            return res.status(401).json("Password must be between 8 and 32 characters.");
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