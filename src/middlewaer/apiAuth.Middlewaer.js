const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateAPI = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Store the authenticated user object in the request for further processing if needed
        req.user = user;

        // Call the next middleware or handler function
        next();

    } catch (error) {
        console.error('API authentication error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateAPI;