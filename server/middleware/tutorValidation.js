module.exports = (req, res, next) => {
    const { bio, subjects, experience_years, availability } = req.body;

    // Validate bio (required, between 1-255 characters)
    if (!bio || typeof bio !== 'string' || bio.length < 1 || bio.length > 255) {
        return res.status(400).json("Bio must be between 1 and 255 characters.");
    }

    // Validate subjects (must be a non-empty array of strings)
    if (!Array.isArray(subjects) || subjects.length === 0 || !subjects.every(subj => typeof subj === 'string' && subj.trim() !== '')) {
        return res.status(400).json("Subjects must be a non-empty array of strings.");
    }

    // Validate experience_years (must be an integer >= 0)
    if (!Number.isInteger(experience_years) || experience_years < 0) {
        return res.status(400).json("Experience years must be a non-negative integer.");
    }

    // Validate availability (must be a non-empty array of strings)
    if (!Array.isArray(availability) || availability.length === 0 || !availability.every(slot => typeof slot === 'string' && slot.trim() !== '')) {
        return res.status(400).json("Availability must be a non-empty array of strings.");
    }

    // If everything is valid, proceed to next middleware/handler
    next();
};
