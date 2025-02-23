// This module validates user information across paths

module.exports = (req, res, next) => {
    const { email, name, password } = req.body;


    if (req.path === '/update') {
        let key = Object.keys(req.body)[0];  // Gets the first key name (e.g., "user_name")
        let value = Object.values(req.body)[0];  // Gets the corresponding value (e.g., "NewName")

        if (key === 'user_name') {
            if (!validName(value)) {
                return res.status(400).json("Name must be atleast 3 characters")
            } else if (!isFirstLetterCapital(value)) {
                return res.status(400).json("Name must begin with capital")
            }
        } else if (key === 'user_email') {
            if (!validEmail(value)) {
                return res.status(400).json("Invalid Email");
            }
        } else if (key === 'user_password') {
            if (!validPassword(value)) {
                return res.status(400).json("Password must contain a symbol, special character, and capital letter.");
            }
        }
    }

    function validName(userName) {
        return (userName.length > 2);
    }

    function isFirstLetterCapital(str) {
        return /^[A-Z]/.test(str);
    }

    function validEmail(userEmail) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPassword(userPassword) {
        // Check for at least one uppercase letter, one special character, and one number
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/.test(userPassword);
    }

    if (req.path === '/register') {
        if (!validEmail(email)) {
            return res.status(400).json("Invalid Email");
        } else if (password.length < 8 || password.length > 32) {
            return res.status(400).json("Password must be between 8 and 32 characters.");
        } else if (!validPassword(password)) {
            return res.status(400).json("Password must contain a symbol, special character, and capital letter.");
        } const name_split = name.split(" ");
        if (!name_split.every(word => word[0] === word[0]?.toUpperCase())) {
            return res.status(400).json("Ensure name(s) start with capital");
        }
    }

    else if (req.path === '/login') {
        if (![email, password].every(Boolean)) {
            return res.status(400).json("Missing Credentials")
        } else if (!validEmail(email)) {
            return res.status(400).json("Invalid Email")
        }
    }

    // If everything completes, move to endpoint in server
    next();
}
