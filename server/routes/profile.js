// Routing
const router = require("express").Router();

// Database
const pool = require("../db");

// Security
const bcrypt = require("bcrypt");

// JWT
const { gatherUserId } = require("../helpers/jwt");

// Validation
const { body, validationResult } = require("express-validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

// Function to validate and format phone numbers
const validatePhoneNumber = (parsedPhone) => {
    if (!parsedPhone) return null;
    // Remove all spaces before parsing
    const cleanedNumber = parsedPhone.replace(/\s+/g, '');
    // Try parsing with an explicit country code if needed
    const phone = parsePhoneNumberFromString(cleanedNumber);
    return phone && phone.isValid() ? phone.formatInternational() : null;
};

router.get('/gather', async (req, res) => {
    try {
        const user_id = gatherUserId(req.cookies.jwt);
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (user.rows.length === 0) {
            return res.status(404).json('No valid user');
        }
        const addressDetails = await pool.query("SELECT * FROM user_address WHERE user_id = $1", [user_id]);
        return res.json({
            fname: user.rows[0].user_fname,
            lname: user.rows[0].user_lname,
            email: user.rows[0].user_email,
            phoneNumber: user.rows[0].user_phonenumber,
            addressLine: addressDetails.rows[0]?.address_line || null,
            postcode: addressDetails.rows[0]?.address_postcode || null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
});

router.post('/update', [
    // Validation block
    body("fname").optional({ checkFalsy: true })
        .trim().matches(/^[A-Z][a-z]*$/)
        .withMessage("First name must start with a capital letter, contain only letters, and have no spaces."),
    body("lname").optional({ checkFalsy: true })
        .trim().matches(/^[A-Z][a-z]*$/)
        .withMessage("Last name must start with a capital letter, contain only letters, and have no spaces."),
    body("email").optional({ checkFalsy: true })
        .isEmail().withMessage("Invalid email"),
    body("newPassword").optional({ checkFalsy: true })
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must have at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must have at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must have at least one number")
        .matches(/\W/).withMessage("Password must have at least one special character"),
    body("phoneNumber").optional({ checkFalsy: true })
        .trim().matches(/^\+?\d[\d\s]*$/)
        .withMessage("Phone number must contain only numerical values"),
    body("addressLine").optional({ checkFalsy: true })
        .trim().isLength({ min: 5, max: 255 })
        .withMessage("Address must be between 5 and 255 characters long"),
    body("postcode").optional({ checkFalsy: true })
        .trim().matches(/^[A-Z0-9 ]{3,10}$/i)
        .withMessage("Invalid postcode format")
], async (req, res) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0] });
        }

        const updateData = req.body;
        const field = Object.keys(updateData)[0]

        const user_id = gatherUserId(req.cookies.jwt);

        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (user.rows.length === 0) {
            return res.status(404).json('No valid user');
        }

        // Check if updating the email and if the new email already exists
        if (updateData.email) {
            const emailExists = await pool.query('SELECT * FROM users WHERE user_email = $1 AND user_id != $2', [updateData.email, user_id]);
            if (emailExists.rows.length > 0) {
                return res.status(400).json('Email already in use');
            }
        }

        if (updateData.currentPassword && updateData.newPassword) {
            const validPassword = await bcrypt.compare(updateData.currentPassword, user.rows[0].user_password);
            if (!validPassword) {
                return res.status(401).json('Current password incorrect');
            }
            const samePassword = await bcrypt.compare(updateData.newPassword, user.rows[0].user_password);
            if (samePassword) {
                return res.status(401).json('New password must be different to current password');
            }
            const hashedPassword = await bcrypt.hash(updateData.newPassword, 10);
            await pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [hashedPassword, user_id]);
            return res.status(200).json('Password updated successfully');  // Return here to cancel further execution
        }

        if (updateData.addressLine || updateData.postcode) {
            const addressLine = updateData.addressLine || null;
            const postcode = updateData.postcode || null;
            await pool.query(
                `INSERT INTO user_address (user_id, address_line, address_postcode)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (user_id)
                 DO UPDATE SET 
                    address_line = COALESCE(EXCLUDED.address_line, user_address.address_line), 
                    address_postcode = COALESCE(EXCLUDED.address_postcode, user_address.address_postcode)`,
                [user_id, addressLine, postcode]
            );
            return res.status(200).json(`${updateData.addressLine !== undefined ? 'Address line' : 'Postcode'} updated successfully`);
        }

        if (updateData.phoneNumber) {
            const validNumber = validatePhoneNumber(updateData.phoneNumber);
            if (!validNumber) {
                return res.status(401).json('Invalid phone number. Ensure Country code is correct');
            }
            await pool.query(
                `UPDATE users SET user_phonenumber = $1 WHERE user_id = $2`,
                [validNumber, user_id]
            );
            return res.status(200).json('Phone number updated successfully');  // Return here to cancel further execution
        }

        await pool.query(`UPDATE users SET ${field === 'fname' ? 'user_fname' : field === 'lname' ? 'user_lname' : field === 'email' ? 'user_email' : field === 'phoneNumber' ? 'user_phonenumber' : ''} = $1 WHERE user_id = $2`, [updateData[field], user_id]);
        return res.status(200).json(`${field === 'fname' ? 'First name' : field === 'lname' ? 'Last name' : field === 'email' ? 'Email' : field === 'phoneNumber' ? 'Phone number' : ''} updated successfully`);  // Ensure response after each update
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
});

module.exports = router;
