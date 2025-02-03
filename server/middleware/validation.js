// This module validates user information across paths

module.exports = (req, res, next) => {
    const { email, name, password } = req.body;

    let profileUpdateField, profileUpdateValue;

    if (email !== undefined) {
        profileUpdateField = 'email'
        profileUpdateValue = email;
    } else if (name !== undefined) {
        profileUpdateField = 'name'
        profileUpdateValue = name;
    } else if (password !== undefined) {
        profileUpdateField = 'password'
        profileUpdateValue = password;
    }

    if (req.path === '/update') {
        checkProfileUpdateField(profileUpdateValue, profileUpdateField)
    }

    function validEmail(userEmail) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPassword(userPassword) {
        // Check for at least one uppercase letter, one special character, and one number
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/.test(userPassword);
    }

    function checkProfileUpdateField(value, field) {
        if (field === 'name') {
            if (value.length < 3) {
                return res.status(401).json("Name must be at least three characters")
            }
        }
        else if (field === 'email') {
            if (!validEmail(value)) {
                return res.status(401).json("Invalid Email");
            }
        }
        else if (field === 'password') {
            if (!validPassword(value)) {
                return res.status(401).json("Password must contain a symbol, special character, and capital letter.");
            }
        }
    }


    if (['/register'].includes(req.path)) {
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