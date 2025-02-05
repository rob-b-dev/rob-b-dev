// This module validates user information across paths

module.exports = (req, res, next) => {
    const { email, name, password } = req.body;
    console.log('validation called')


    if (req.path === '/update') {
        let key;
        let value;
        Object.entries(req.body).forEach(([field, val]) => {
            key = field;
            value = val;
        });
        console.log(key)
        console.log(value)
        if (!key || value === undefined) {
            return res.status(401).json("No changes detected");
        }

        if (key === 'user_name') {
            validName(value)
        } else if (key === 'user_email') {
            if (!validEmail(value)) {
                return res.status(401).json("Invalid Email");
            }
        } else {
            if (!validPassword(password)) {
                return res.status(409).json("Password must contain a symbol, special character, and capital letter.");
            }
        }
    }

    function validName(userName) {
        if (userName.length < 3) {
            return res.status(401).json("Name must be atleast 3 characters")
        }
    }

    function validEmail(userEmail) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPassword(userPassword) {
        // Check for at least one uppercase letter, one special character, and one number
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/.test(userPassword);
    }

    if (req.path === '/register') {
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

    // If everything completes, move to endpoint in server
    next();
}